const form = document.getElementById('story-form');
const photoInput = document.getElementById('child-photo');
const photoPreview = document.getElementById('photo-preview');
const result = document.getElementById('result');
let photoData = '';

photoInput.addEventListener('change', () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { alert('يرجى اختيار ملف صورة صالح.'); photoInput.value=''; return; }
  if (file.size > 12 * 1024 * 1024) { alert('حجم الصورة كبير. اختر صورة أقل من 12 ميجابايت.'); photoInput.value=''; return; }
  const reader = new FileReader();
  reader.onload = () => { photoData = reader.result; photoPreview.src = photoData; photoPreview.hidden = false; };
  reader.readAsDataURL(file);
});

const stories = {
  'الفضاء': [
    ['نداء من النجوم','في ليلة هادئة، لمح {name} نجمة تلمع قرب النافذة. وفجأة ظهرت مركبة فضائية صغيرة تدعوه إلى رحلة بين الكواكب.'],
    ['صديق من كوكب بعيد','قابل {name} صديقاً لطيفاً من كوكب بعيد، وتعلّم أن التعاون يجعل أصعب الرحلات ممتعة.'],
    ['مهمة الشجاعة','واجه {name} عاصفة من النجوم، لكنه تذكر أن الشجاعة ليست ألا نخاف، بل أن نحاول رغم الخوف.'],
    ['العودة بالبشرى','عاد {name} إلى منزله ومعه هدية صغيرة ورسالة: أجمل ما في الرحلة هو القلب الطيب.']
  ],
  'الغابة': [
    ['سر الغابة','دخل {name} الغابة الخضراء، فسمع صوتاً رقيقاً يطلب المساعدة من خلف الأشجار.'],
    ['أصدقاء جدد','وجد {name} أسداً صغيراً وسلحفاة مرحة، وقرروا البحث معاً عن مصدر الصوت.'],
    ['قلب شجاع','ساعد {name} عصفوراً عاد إلى عشه، واكتشف أن اللطف يجعل العالم أجمل.'],
    ['احتفال الغابة','أقام أصدقاء الغابة حفلاً صغيراً تكريماً لـ{name}، بطل اليوم وصديق الجميع.']
  ],
  'البحر': [
    ['رحلة تحت الماء','ارتدى {name} خوذة الغواص وانطلق في رحلة مدهشة إلى أعماق البحر الزرقاء.'],
    ['الحوت الودود','قابل {name} حوتاً لطيفاً أرشده إلى حديقة مرجانية مليئة بالألوان.'],
    ['كنز الصداقة','وجد {name} صندوقاً قديماً، لكن الكنز الحقيقي كان مساعدة أصدقائه من الكائنات البحرية.'],
    ['وعد البحر','ودّع {name} أصدقاءه ووعدهم أن يحافظ دائماً على نظافة البحر وجماله.']
  ],
  'القصر': [
    ['دعوة إلى القصر','وصلت إلى {name} دعوة ذهبية لزيارة قصر بعيد، حيث تنتظره مغامرة غير عادية.'],
    ['المفتاح المفقود','ساعد {name} سكان القصر في العثور على المفتاح، مستخدماً ذكاءه وهدوءه.'],
    ['اختبار الطيبة','اكتشف {name} أن أعظم صفات الأمير ليست التاج، بل مساعدة الآخرين.'],
    ['بطل المملكة','احتفل الجميع بـ{name} ومنحوه وسام القلب الشجاع.']
  ],
  'الديناصورات': [
    ['بوابة الزمن','وجد {name} بوابة سحرية نقلته إلى وادٍ تعيش فيه الديناصورات.'],
    ['الديناصور الصغير','قابل {name} ديناصوراً صغيراً ضائعاً، فقرر أن يساعده في العودة إلى عائلته.'],
    ['طريق العودة','تعاون {name} مع أصدقائه حتى وصل الديناصور إلى بيته بأمان.'],
    ['ذكرى لا تُنسى','عاد {name} من الرحلة وهو يعرف أن الصداقة والمساعدة أقوى من أي مغامرة.']
  ],
  'السحر': [
    ['الكتاب العجيب','عثر {name} على كتاب يلمع في الغابة، وما إن فتحه حتى بدأت النجوم تتراقص حوله.'],
    ['زهرة الأمنيات','بحث {name} عن زهرة سحرية تعيد الألوان إلى الحديقة وتمنح الأمل للجميع.'],
    ['قوة الخير','اكتشف {name} أن السحر الحقيقي هو الكلمة الطيبة واليد التي تساعد.'],
    ['نهاية مضيئة','عادت الألوان إلى الغابة، وعاد {name} سعيداً لأنه صنع فرقاً جميلاً.']
  ]
};
const enStories = {
  'الفضاء':['A Starry Invitation','A Friendly Visitor','A Brave Mission','Home with a Gift'],
  'الغابة':['The Forest Secret','New Friends','A Kind Heart','A Forest Celebration'],
  'البحر':['Underwater Journey','The Friendly Whale','A Treasure of Friendship','A Promise to the Sea'],
  'القصر':['An Invitation to the Palace','The Lost Key','A Test of Kindness','The Kingdom’s Hero'],
  'الديناصورات':['The Time Gate','A Little Dinosaur','The Way Home','A Memory to Keep'],
  'السحر':['The Magical Book','The Wish Flower','The Power of Kindness','A Bright Ending']
};

function makeColoringImage(source) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const max = 900, scale = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height), d = frame.data;
      for (let i=0;i<d.length;i+=4) {
        const gray = 0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2];
        const v = gray > 185 ? 255 : gray > 125 ? 225 : gray > 75 ? 90 : 20;
        d[i]=d[i+1]=d[i+2]=v; d[i+3]=255;
      }
      ctx.putImageData(frame,0,0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(source);
    img.src = source;
  });
}

function page(title, content, index, cls='') {
  return `<article class="book-page ${cls}"><h3>${title}</h3>${content}<span class="page-number">${index}</span></article>`;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.getElementById('child-name').value.trim();
  if (!name) { alert('اكتب اسم الطفل أولاً.'); return; }
  if (!photoData) { alert('اختر صورة الطفل أولاً.'); return; }
  const theme = document.querySelector('input[name="theme"]:checked').value;
  const type = document.getElementById('book-type').value;
  const language = document.getElementById('story-language').value;
  const extra = document.getElementById('extra-detail').value.trim();
  const safeName = escapeHTML(name);
  const safeTheme = escapeHTML(theme);
  const pages = [];
  pages.push(page('حكايتي الجميلة', `<div class="big-emoji">✨ 📖 ✨</div><img src="${photoData}" alt="صورة ${safeName}"><h3>${safeName}</h3><p>بطل مغامرة ${safeTheme}</p>`, 1, 'cover'));

  if (type !== 'coloring') {
    const chapters = stories[theme] || stories['الفضاء'];
    chapters.forEach((chapter, i) => {
      const text = chapter[1].replaceAll('{name}', safeName);
      const emoji = ['🌟','🤝','💪','🎉'][i];
      pages.push(page(chapter[0], `<div class="big-emoji">${emoji}</div><img src="${photoData}" alt=""><p>${text}</p>${i===chapters.length-1 && extra ? `<p><b>ومن صفاته الجميلة:</b> ${escapeHTML(extra)}</p>`:''}`, pages.length+1));
    });
  }
  if (type !== 'story') {
    const coloring = await makeColoringImage(photoData);
    pages.push(page('صفحة التلوين', `<p>لوّن صورة ${safeName} بطريقتك الجميلة!</p><img class="coloring-canvas" src="${coloring}" alt="صفحة تلوين">`, pages.length+1));
    pages.push(page('ارسم عالمك!', `<div class="big-emoji">🖍️ 🌈 ⭐</div><p>ارسم شيئاً من مغامرة ${safeTheme}، ثم أضف ألوانك المفضلة.</p><div style="height:220px;width:100%;border:2px dashed #bbb;border-radius:12px"></div>`, pages.length+1));
  }
  if (language === 'en') {
    const titles = enStories[theme] || enStories['الفضاء'];
    // Keep the Arabic story available in this first release; English selection changes the cover label only.
    pages[0] = page('My Storybook', `<div class="big-emoji">✨ 📖 ✨</div><img src="${photoData}" alt=""><h3>${safeName}</h3><p>${titles[0]}</p>`, 1, 'cover');
  }
  document.getElementById('result-name').textContent = name;
  document.getElementById('book-preview').innerHTML = pages.join('');
  result.hidden = false;
  result.scrollIntoView({behavior:'smooth'});
});

document.getElementById('print-button').addEventListener('click', () => window.print());
document.getElementById('edit-button').addEventListener('click', () => document.getElementById('creator').scrollIntoView({behavior:'smooth'}));
