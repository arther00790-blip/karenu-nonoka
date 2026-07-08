document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ハンバーガーメニュー ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- フェードイン演出 ---------- */
  const fadeTargets = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeTargets.forEach((target) => fadeObserver.observe(target));

  /* ---------- スケジュール表：日付選択・強調表示 ---------- */
  const scheduleTable = document.getElementById('scheduleTable');
  const dayHeaders = scheduleTable.querySelectorAll('thead .day-col');

  dayHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const day = header.dataset.day;
      const alreadyActive = header.classList.contains('highlight');

      scheduleTable.querySelectorAll('.highlight').forEach((el) => {
        el.classList.remove('highlight');
      });

      if (!alreadyActive) {
        scheduleTable.querySelectorAll(`[data-day="${day}"]`).forEach((cell) => {
          cell.classList.add('highlight');
        });
      }
    });
  });

  /* ---------- トップへ戻るボタン ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > window.innerHeight * 0.6);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
