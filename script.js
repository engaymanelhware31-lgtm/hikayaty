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

// 20 شخصية كرتونية واضحة
const SHAPES = [
  { id: 'hero', name: 'البطل الخارق', emoji: '🦸‍♂️' },
  { id: 'princess', name: 'الأميرة', emoji: '👸' },
  { id: 'astronaut', name: 'رائد الفضاء', emoji: '🧑‍🚀' },
  { id: 'doctor', name: 'الطبيب', emoji: '🧑‍⚕️' },
  { id: 'chef', name: 'الطباخ', emoji: '🧑‍🍳' },
  { id: 'pirate', name: 'القرصان', emoji: '🏴‍☠️' },
  { id: 'wizard', name: 'الساحر', emoji: '🧙‍♂️' },
  { id: 'fairy', name: 'الجنية', emoji: '🧚‍♀️' },
  { id: 'firefighter', name: 'رجل الإطفاء', emoji: '🧑‍🚒' },
  { id: 'pilot', name: 'الطيار', emoji: '🧑‍✈️' },
  { id: 'police', name: 'الشرطي', emoji: '👮' },
  { id: 'farmer', name: 'المزارع', emoji: '🧑‍🌾' },
  { id: 'robot', name: 'الروبوت', emoji: '🤖' },
  { id: 'lion', name: 'الأسد', emoji: '🦁' },
  { id: 'panda', name: 'الباندا', emoji: '🐼' },
  { id: 'rabbit', name: 'الأرنب', emoji: '🐰' },
  { id: 'artist', name: 'الفنان', emoji: '🎨' },
  { id: 'footballer', name: 'لاعب الكرة', emoji: '⚽' },
  { id: 'king', name: 'الملك', emoji: '👑' },
  { id: 'mermaid', name: 'حورية البحر', emoji: '🧜‍♀️' }
];

const selectedShapes = new Set();

// بناء شبكة الأشكال
shapePicker.innerHTML = SHAPES.map(shape => `
  <button type="button" class="shape-item" data-id="${shape.id}" title="${shape.name}">
    <div class="shape-preview">
      <div class="emoji-shape">${shape.emoji}</div>
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

// دالة تحويل الصورة إلى رسم تخطيطي (أبيض وأسود) باستخدام Canvas
function convertToSketch(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
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
      
      // فلتر يحول الصورة لتبدو كرسم رصاص
      ctx.filter = 'grayscale(100%) contrast(300%) brightness(120%)';
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = src;
  });
}

createButton.addEventListener('click', async () => {
  if (!selectedPhotoUrl || selectedShapes.size === 0) return;
  
  const originalText = createButton.textContent;
  createButton.textContent = '⏳ جاري تجهيز كتابك...';
  createButton.disabled = true;

  // تحويل الصورة لرسم تخطيطي
  const sketchDataUrl = await convertToSketch(selectedPhotoUrl);

  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';

  [...selectedShapes].forEach((id, index) => {
    const shape = SHAPES.find(s => s.id === id);
    if (!shape) return;

    const page = document.createElement('article');
    page.className = 'book-page';
    
    page.innerHTML = `
      <div class="page-canvas">
        <div class="page-scene">
          <div class="emoji-shape">${shape.emoji}</div>
        </div>
        <img class="page-photo" src="${sketchDataUrl}" alt="صورة الطفل - ${shape.name}">
      </div>
      <div class="page-footer">
        <span class="page-num">صفحة ${index + 1}</span>
        <span class="page-title">${shape.name}</span>
      </div>
    `;
    grid.appendChild(page);
  });

  createButton.textContent = originalText;
  createButton.disabled = false;

  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('printButton').addEventListener('click', () => window.print());

updatePickerUI();
