const photoInput = document.getElementById('childPhoto');
const photoPreview = document.getElementById('photoPreview');
const uploadBox = document.getElementById('uploadBox');
let photoUrl = '';

photoInput.addEventListener('change', () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    alert('يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP.');
    photoInput.value = '';
    return;
  }
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = URL.createObjectURL(file);
  photoPreview.src = photoUrl;
  photoPreview.style.display = 'block';
  uploadBox.querySelector('.upload-icon').textContent = '✓';
  uploadBox.querySelector('strong').textContent = 'تم اختيار الصورة — اضغط للتغيير';
});

document.getElementById('storyForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('childName').value.trim();
  const theme = document.getElementById('storyTheme').value;
  const pages = Number(document.getElementById('pageCount').value);
  if (!name) return alert('اكتب اسم الطفل أولاً.');
  if (!photoInput.files.length) return alert('اختر صورة الطفل أولاً.');

  document.getElementById('previewTitle').textContent = `حكاية ${name}`;
  document.getElementById('previewDescription').textContent =
    `موضوع المغامرة: ${theme} — عدد الصفحات: ${pages}.`;
  document.getElementById('coverName').textContent = name;
  document.getElementById('coverTheme').textContent = theme;
  document.getElementById('coverPhoto').src = photoUrl;

  const outline = document.getElementById('pageOutline');
  const pageNames = [
    'الغلاف: تقديم بطل الحكاية',
    'بداية المغامرة والتعرف على المكان',
    'ظهور التحدي أو المشكلة',
    'محاولة البطل إيجاد الحل',
    'مساعدة صديق أو اكتشاف جديد',
    'النهاية السعيدة والعبرة'
  ];
  outline.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const li = document.createElement('li');
    li.textContent = pageNames[i] || `مشهد إضافي من مغامرة ${name}`;
    outline.appendChild(li);
  }
  const preview = document.getElementById('preview');
  preview.hidden = false;
  preview.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();
