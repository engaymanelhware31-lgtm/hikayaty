const photoInput = document.getElementById('childPhoto');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('photoPreview');
const photoName = document.getElementById('photoName');
const createButton = document.getElementById('createButton');
const results = document.getElementById('results');
const shapePicker = document.getElementById('shapePicker');
const selectionCount = document.getElementById('selectionCount');
const pickerHint = document.getElementById('pickerHint');

const MAX_SHAPES = 8;
const DEFAULT_HINT = 'اختر حتى 8 أشكال من 20 شكلًا. سيصبح كل شكل صفحة في الكتاب.';
let selectedPhotoUrl = null;

const svg = (inner) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#34314c" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${inner}</g>
  </svg>`;

// ... (نفس مصفوفة SHAPES التي لديك، لا داعي لتغييرها) ...
const SHAPES = [
  { id: 'hero', name: 'البطل الخارق', svg: svg(`<path d="M25 60 Q10 110 20 165 L45 155 Q35 110 48 70 Z" fill="#fff"/><path d="M175 60 Q190 110 180 165 L155 155 Q165 110 152 70 Z" fill="#fff"/><path d="M100 5 L107 22 L125 24 L111 36 L115 54 L100 45 L85 54 L89 36 L75 24 L93 22 Z" fill="#fff"/><path d="M40 155 L56 155 L46 175 L58 175 L36 198 L44 178 L32 178 Z" fill="#fff"/><path d="M160 155 L144 155 L154 175 L142 175 L164 198 L156 178 L168 178 Z" fill="#fff"/>`)},
  { id: 'doctor', name: 'الطبيب الصغير', svg: svg(`<path d="M10 30 L26 30 L26 20 L34 20 L34 30 L50 30 L50 38 L34 38 L34 48 L26 48 L26 38 L10 38 Z" fill="#fff"/><path d="M158 145 Q158 130 168 130 Q178 130 178 145 Q178 160 168 175 Q158 185 148 178 Q143 175 143 168" fill="none" stroke-width="2.5"/><circle cx="143" cy="165" r="4" fill="#fff"/><circle cx="168" cy="130" r="3" fill="#fff"/>`)},
  { id: 'astronaut', name: 'رائد الفضاء', svg: svg(`<circle cx="100" cy="100" r="72" fill="none" stroke-dasharray="4 4" stroke-width="1"/><path d="M25 30 L29 40 L39 40 L31 46 L34 56 L25 50 L16 56 L19 46 L11 40 L21 40 Z" fill="#fff" stroke-width="1.5"/><path d="M170 150 L173 158 L181 158 L175 163 L177 171 L170 166 L163 171 L165 163 L159 158 L167 158 Z" fill="#fff" stroke-width="1.5"/><circle cx="175" cy="35" r="10" fill="#fff"/><circle cx="172" cy="32" r="2" fill="#34314c" stroke="none"/><circle cx="30" cy="170" r="8" fill="#fff"/><circle cx="27" cy="167" r="1.5" fill="#34314c" stroke="none"/>`)},
  { id: 'footballer', name: 'لاعب الكرة', svg: svg(`<path d="M10 20 L10 60 M190 20 L190 60 M10 20 L190 20" fill="none" stroke-width="2.5"/><circle cx="172" cy="172" r="16" fill="#fff"/><path d="M172 160 L178 166 L176 174 L168 174 L166 166 Z" fill="#34314c"/><circle cx="28" cy="172" r="12" fill="#fff"/><path d="M20 172 L28 164 L36 172 L28 180 Z" fill="#34314c"/>`)},
  { id: 'explorer', name: 'المغامر', svg: svg(`<circle cx="168" cy="165" r="20" fill="#fff"/><circle cx="168" cy="165" r="3" fill="#34314c"/><path d="M168 148 L173 165 L168 182 L163 165 Z" fill="#fff"/><path d="M10 40 Q30 30 50 40 Q70 50 80 40" fill="none" stroke-dasharray="3 3" stroke-width="1.5"/><path d="M10 55 Q30 45 50 55 Q70 65 80 55" fill="none" stroke-dasharray="3 3" stroke-width="1.5"/><path d="M15 25 L25 25 L25 15" fill="none"/>`)},
  { id: 'artist', name: 'الفنان', svg: svg(`<path d="M20 40 Q10 50 15 65 Q20 80 40 80 Q55 80 60 70 Q55 65 60 60 Q65 50 55 45 Q40 35 30 40 Q25 42 20 40 Z" fill="#fff"/><circle cx="30" cy="50" r="3" fill="#34314c"/><circle cx="45" cy="48" r="3" fill="#34314c"/><circle cx="55" cy="55" r="3" fill="#34314c"/><circle cx="25" cy="65" r="3" fill="#34314c"/><path d="M160 30 L175 50 L172 53 L157 33 Z" fill="#fff"/><path d="M175 50 L180 55 L177 58 L172 53 Z" fill="#34314c"/>`)},
  { id: 'pilot', name: 'قائد الطائرة', svg: svg(`<path d="M100 15 L110 35 L130 35 L115 45 L120 65 L100 55 L80 65 L85 45 L70 35 L90 35 Z" fill="#fff"/><path d="M40 170 Q30 165 30 155 Q30 145 40 145 Q45 145 50 148 Q55 140 65 140 Q75 140 80 150 Q85 145 90 148 Q100 148 100 158 Q100 168 90 170 Z" fill="#fff"/><path d="M140 175 Q135 170 140 165 Q145 160 155 160 Q160 155 170 155 Q180 155 182 165 Q185 175 175 175 Z" fill="#fff"/>`)},
  { id: 'nature', name: 'مستكشف الطبيعة', svg: svg(`<path d="M25 180 L25 140" fill="none" stroke-width="2.5"/><circle cx="25" cy="122" r="22" fill="#fff"/><path d="M175 180 L175 140" fill="none" stroke-width="2.5"/><circle cx="175" cy="122" r="22" fill="#fff"/><circle cx="100" cy="186" r="4" fill="#fff"/><circle cx="108" cy="183" r="3" fill="#fff"/><circle cx="92" cy="183" r="3" fill="#fff"/>`)},
  { id: 'knight', name: 'الفارس', svg: svg(`<path d="M10 30 L10 60 L20 60 L20 50 L30 50 L30 60 L40 60 L40 30 L30 30 L30 40 L20 40 L20 30 Z" fill="#fff"/><path d="M160 30 L160 60 L170 60 L170 50 L180 50 L180 60 L190 60 L190 30 L180 30 L180 40 L170 40 L170 30 Z" fill="#fff"/><path d="M90 185 L100 165 L110 185 Z" fill="#fff"/><path d="M100 165 L100 155 M95 158 L105 158" fill="none"/>`)},
  { id: 'prince', name: 'الأمير والأميرة', svg: svg(`<path d="M70 40 L80 30 L90 42 L100 25 L110 42 L120 30 L130 40 L125 55 L75 55 Z" fill="#fff"/><circle cx="80" cy="28" r="3" fill="#fff"/><circle cx="100" cy="23" r="3" fill="#fff"/><circle cx="120" cy="28" r="3" fill="#fff"/><circle cx="175" cy="175" r="6" fill="#fff"/><circle cx="30" cy="175" r="6" fill="#fff"/>`)},
  { id: 'fisherman', name: 'الصياد', svg: svg(`<path d="M0 165 Q15 155 30 165 Q45 175 60 165 Q75 155 90 165 Q105 175 120 165 Q135 155 150 165 Q165 175 180 165 Q195 155 200 165" fill="none" stroke-width="2.5"/><path d="M0 180 Q15 170 30 180 Q45 190 60 180 Q75 170 90 180 Q105 190 120 180 Q135 170 150 180 Q165 190 180 180 Q195 170 200 180" fill="none" stroke-width="2.5"/><path d="M150 40 Q160 30 175 35 Q185 40 175 50 Q165 55 155 50 L150 45 L140 38 L142 48 Z" fill="#fff"/><circle cx="168" cy="40" r="1.5" fill="#34314c" stroke="none"/>`)},
  { id: 'chef', name: 'الطباخ', svg: svg(`<path d="M70 50 Q65 35 75 28 Q85 22 90 30 Q100 22 110 30 Q115 22 125 28 Q135 35 130 50 Q125 55 120 50 L80 50 Q75 55 70 50 Z" fill="#fff"/><path d="M80 55 L80 65 L120 65 L120 55" fill="none"/><path d="M20 165 L50 165 M30 155 L30 175 M40 155 L40 175" fill="none" stroke-width="2.5"/><path d="M170 155 Q180 150 185 160 Q185 175 175 175 Q165 175 165 165 Q165 155 170 155 Z" fill="#fff"/>`)},
  { id: 'teacher', name: 'المعلم', svg: svg(`<path d="M140 150 L175 150 L175 185 L140 185 Z" fill="#fff"/><path d="M157 150 L157 185" fill="none"/><path d="M145 160 L155 160 M145 168 L155 168 M160 160 L172 160 M160 168 L172 168 M145 176 L155 176" stroke-width="1.5" fill="none"/><path d="M25 30 L35 30 L35 180 L25 180 Z" fill="#fff"/><path d="M25 30 L30 20 L35 30 Z" fill="#fff"/>`)},
  { id: 'engineer', name: 'المهندس', svg: svg(`<circle cx="30" cy="40" r="15" fill="#fff"/><circle cx="30" cy="40" r="6" fill="none"/><path d="M30 20 L30 25 M30 55 L30 60 M10 40 L15 40 M45 40 L50 40 M16 26 L20 30 M40 50 L44 54 M16 54 L20 50 M40 30 L44 26" stroke-width="2.5" fill="none"/><circle cx="170" cy="160" r="12" fill="#fff"/><circle cx="170" cy="160" r="5" fill="none"/><path d="M170 145 L170 148 M170 172 L170 175 M155 160 L158 160 M182 160 L185 160" stroke-width="2.5" fill="none"/><path d="M165 175 L155 185 M175 175 L185 185" fill="none"/>`)},
  { id: 'firefighter', name: 'رجل الإطفاء', svg: svg(`<path d="M10 130 L70 130 L70 175 L10 175 Z" fill="#fff"/><path d="M70 145 L100 145 L100 175 L70 175 Z" fill="#fff"/><path d="M75 150 L95 150 L95 165 L75 165 Z" fill="#fff"/><circle cx="25" cy="178" r="8" fill="#fff"/><circle cx="55" cy="178" r="8" fill="#fff"/><circle cx="88" cy="178" r="8" fill="#fff"/><path d="M130 130 L130 175 M120 140 L140 140 M120 155 L140 155" fill="none" stroke-width="2.5"/><path d="M170 130 Q165 140 175 145 Q165 150 170 165 Q180 155 175 145 Q185 140 170 130 Z" fill="#fff"/>`)},
  { id: 'police', name: 'الشرطي', svg: svg(`<path d="M160 30 L165 45 L180 45 L168 55 L172 70 L160 60 L148 70 L152 55 L140 45 L155 45 Z" fill="#fff"/><circle cx="160" cy="50" r="5" fill="#fff"/><path d="M30 170 L40 160 L50 170 L40 180 Z" fill="#fff"/><path d="M40 160 L40 155" fill="none"/>`)},
  { id: 'farmer', name: 'المزارع', svg: svg(`<circle cx="30" cy="30" r="18" fill="#fff"/><path d="M30 5 L30 10 M30 50 L30 55 M5 30 L10 30 M50 30 L55 30 M13 13 L17 17 M43 43 L47 47 M13 47 L17 43 M43 17 L47 13" fill="none" stroke-width="2.5"/><path d="M170 180 L170 150" fill="none" stroke-width="2.5"/><path d="M170 160 L160 150 M170 165 L180 155 M170 170 L160 165" fill="none" stroke-width="2.5"/><path d="M170 140 Q165 135 170 130 Q175 135 170 140 Z" fill="#fff"/>`)},
  { id: 'scientist', name: 'العالم', svg: svg(`<circle cx="30" cy="40" r="6" fill="#fff"/><ellipse cx="30" cy="40" rx="22" ry="10" fill="none"/><ellipse cx="30" cy="40" rx="22" ry="10" fill="none" transform="rotate(60 30 40)"/><ellipse cx="30" cy="40" rx="22" ry="10" fill="none" transform="rotate(-60 30 40)"/><path d="M165 155 L155 185 L175 185 Z" fill="#fff"/><path d="M162 175 L168 175" fill="none"/><circle cx="170" cy="160" r="3" fill="#34314c" stroke="none"/><path d="M155 155 L155 145 L170 145 L170 155" fill="none"/>`)},
  { id: 'musician', name: 'الموسيقي', svg: svg(`<ellipse cx="30" cy="75" rx="10" ry="7" fill="#fff"/><path d="M40 75 L40 30 L55 25 L55 70" fill="none" stroke-width="2.5"/><ellipse cx="45" cy="70" rx="10" ry="7" fill="#fff"/><ellipse cx="160" cy="165" rx="10" ry="7" fill="#fff"/><path d="M170 165 L170 120 L185 115 L185 160" fill="none" stroke-width="2.5"/><ellipse cx="175" cy="160" rx="10" ry="7" fill="#fff"/>`)},
  { id: 'sailor', name: 'البحّار', svg: svg(`<path d="M10 160 L190 160 L175 185 L25 185 Z" fill="#fff"/><path d="M100 60 L100 160 M100 80 L140 130 L100 130 M100 80 L60 130 L100 130" fill="none" stroke-width="2.5"/><path d="M100 60 L115 50 L115 60 Z" fill="#fff"/><path d="M155 30 L155 60 M155 30 Q165 35 165 50 L165 55" fill="none" stroke-width="2.5"/><path d="M145 45 L165 45" fill="none"/><circle cx="155" cy="30" r="3" fill="none"/>`)}
];

const selectedShapes = new Set();

shapePicker.innerHTML = SHAPES.map(shape => `
  <button type="button" class="shape-item" data-id="${shape.id}" title="${shape.name}">
    <div class="shape-preview">
      ${shape.svg}
      <div class="shape-photo-fake"></div>
    </div>
    <span class="shape-name">${shape.name}</span>
  </button>
`).join('');

shapePicker.addEventListener('click', (e) => {
  const btn = e.target.closest('.shape-item');
  if (!btn) return;
  toggleShape(btn.dataset.id);
});

function toggleShape(id) {
  if (selectedShapes.has(id)) {
    selectedShapes.delete(id);
  } else {
    if (selectedShapes.size >= MAX_SHAPES) {
      pickerHint.textContent = 'وصلت للحد الأقصى (8 أشكال). أزل شكلًا لإضافة آخر.';
      pickerHint.classList.add('warn');
      clearTimeout(toggleShape._t);
      toggleShape._t = setTimeout(() => {
        pickerHint.textContent = DEFAULT_HINT;
        pickerHint.classList.remove('warn');
      }, 2200);
      return;
    }
    selectedShapes.add(id);
  }
  updatePickerUI();
}

function updatePickerUI() {
  shapePicker.querySelectorAll('.shape-item').forEach(btn => {
    btn.classList.toggle('selected', selectedShapes.has(btn.dataset.id));
  });
  selectionCount.textContent = `${selectedShapes.size} / ${MAX_SHAPES}`;
  updateCreateButton();
}

function updateCreateButton() {
  createButton.disabled = !selectedPhotoUrl || selectedShapes.size === 0;
}

photoInput.addEventListener('change', () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('من فضلك اختر ملف صورة صالحاً.');
    photoInput.value = '';
    return;
  }
  if (selectedPhotoUrl) URL.revokeObjectURL(selectedPhotoUrl);
  selectedPhotoUrl = URL.createObjectURL(file);
  previewImage.src = selectedPhotoUrl;
  photoName.textContent = file.name;
  preview.hidden = false;
  results.hidden = true;
  updateCreateButton();
});

document.getElementById('removePhoto').addEventListener('click', () => {
  photoInput.value = '';
  preview.hidden = true;
  results.hidden = true;
  if (selectedPhotoUrl) URL.revokeObjectURL(selectedPhotoUrl);
  selectedPhotoUrl = null;
  updateCreateButton();
});

// دالة تحويل الصورة إلى رسم تخطيطي (Sketch) باستخدام Canvas
function convertToSketch(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // تصغير الصورة لتسريع المعالجة
      const MAX_SIZE = 500;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
      } else {
        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // فلتر يجعل الصورة تبدو كرسم رصاص (Grayscale + High Contrast)
      ctx.filter = 'grayscale(100%) contrast(250%) brightness(120%)';
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = src;
  });
}

createButton.addEventListener('click', async () => {
  if (!selectedPhotoUrl || selectedShapes.size === 0) return;
  
  // تغيير نص الزر لإعلام المستخدم بالمعالجة
  const originalText = createButton.textContent;
  createButton.textContent = '⏳ جاري تحويل الصورة...';
  createButton.disabled = true;

  // 1. تحويل الصورة إلى رسم
  const sketchDataUrl = await convertToSketch(selectedPhotoUrl);

  // 2. بناء صفحات الكتاب
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';

  [...selectedShapes].forEach((id, index) => {
    const shape = SHAPES.find(s => s.id === id);
    if (!shape) return;

    const page = document.createElement('article');
    page.className = 'book-page';
    
    // استخدام الصورة المحولة (sketchDataUrl) بدلاً من الصورة الأصلية
    page.innerHTML = `
      <div class="page-canvas">
        <div class="page-scene">${shape.svg}</div>
        <img class="page-photo" src="${sketchDataUrl}" alt="صورة الطفل - ${shape.name}">
      </div>
      <div class="page-footer">
        <span class="page-num">صفحة ${index + 1}</span>
        <span class="page-title">${shape.name}</span>
      </div>
    `;
    grid.appendChild(page);
  });

  // إرجاع الزر لحالته الطبيعية
  createButton.textContent = originalText;
  createButton.disabled = false;

  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('printButton').addEventListener('click', () => window.print());

updatePickerUI();
