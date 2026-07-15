const revealElements = document.querySelectorAll('.reveal');

if (!('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => observer.observe(element));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    siteNav.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

const profileFields = [
  ['faculty', '所属学部'],
  ['school', '出身校'],
  ['cramSchool', '利用した塾'],
  ['subjects', '対応科目'],
  ['consultation', '得意な相談'],
  ['teachingStyle', '指導スタイル'],
];

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const renderTutors = (tutors) => {
  const grid = document.querySelector('#tutor-grid');
  if (!grid) return;

  grid.innerHTML = tutors.map((tutor, index) => {
    const nickname = tutor.nickname?.trim() || '講師';
    const fields = profileFields.map(([key, label]) => {
      const value = tutor[key]?.trim();
      return `<div><dt>${label}</dt><dd${value ? '' : ' class="pending"'}>${escapeHtml(value || '情報更新予定')}</dd></div>`;
    }).join('');
    const introduction = tutor.introduction?.trim();

    return `<div class="tutor-card-wrap"><article class="tutor-card reveal visible">
      <div class="avatar avatar-${(index % 3) + 1}" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false"><circle cx="24" cy="12" r="8.5"></circle><path d="M8 44v-5c0-11.8 5.7-18 16-18s16 6.2 16 18v5H8z"></path></svg>
      </div>
      <div><p class="tutor-label">現役東大生講師</p><h3>${escapeHtml(nickname)}先生</h3>
        <dl class="profile-list">${fields}</dl>
        <p class="profile-intro"><b>紹介文</b><span${introduction ? '' : ' class="pending"'}>${escapeHtml(introduction || '現在準備中です')}</span></p>
      </div>
    </article><span class="tutor-paperclip" aria-hidden="true"></span></div>`;
  }).join('');
};

fetch('data/tutors.json')
  .then((response) => {
    if (!response.ok) throw new Error(`講師情報の取得に失敗しました: ${response.status}`);
    return response.json();
  })
  .then(renderTutors)
  .catch((error) => {
    console.error(error);
    const grid = document.querySelector('#tutor-grid');
    if (grid) grid.innerHTML = '<p class="tutor-loading">講師情報は現在準備中です。</p>';
  });
