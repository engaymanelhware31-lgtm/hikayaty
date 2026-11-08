const photoInput = document.getElementById('childPhoto');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('photoPreview');
const photoName = document.getElementById('photoName');
const createButton = document.getElementById('createButton');
const results = document.getElementById('results');
let selectedCount = 6;
let selectedPhotoUrl = null;

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
  createButton.disabled = false;
  results.hidden = true;
});

document.getElementById('removePhoto').addEventListener('click', () => {
  photoInput.value = '';
  preview.hidden = true;
  createButton.disabled = true;
  results.hidden = true;
  if (selectedPhotoUrl) URL.revokeObjectURL(selectedPhotoUrl);
  selectedPhotoUrl = null;
});

document.querySelectorAll('.count-choice').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.count-choice').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    selectedCount = Number(button.dataset.count);
  });
});

const ideas = [
  ['بطل خارق','شخصية كرتونية ملونة','🦸'],
  ['طبيب صغير','شخصية كرتونية ملونة','🩺'],
  ['رائد فضاء','شخصية كرتونية ملونة','🚀'],
  ['لاعب كرة','صفحة تلوين','⚽'],
  ['مغامر صغير','صفحة تلوين','🧭'],
  ['فنان مبدع','صفحة تلوين','🎨'],
  ['قائد طائرة','صفحة تلوين','✈️'],
  ['مستكشف الطبيعة','صفحة تلوين','🌳'],
  ['فارس شجاع','صفحة تلوين','🏰']
];

createButton.addEventListener('click', () => {
  if (!selectedPhotoUrl) return;
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';
  ideas.slice(0, selectedCount).forEach((idea, index) => {
    const card = document.createElement('article');
    card.className = 'result-card';
    const image = document.createElement('img');
    image.src = selectedPhotoUrl;
    image.alt = 'صورة الطفل المختارة';
    const title = document.createElement('strong');
    title.textContent = idea[0];
    const detail = document.createElement('small');
    detail.textContent = idea[1] + ' · فكرة رقم ' + (index + 1);
    card.append(image, title, detail);
    grid.appendChild(card);
  });
  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('printButton').addEventListener('click', () => window.print());
