/**
 * 국가공무원인재개발원 (치이카와 테마 상호작용 스크립트)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 모바일 햄버거 토글
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('.nav-pill');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. 우… 와앙! 치이카와 응원 버튼
  const cryBtn = document.getElementById('cry-sound-btn');
  const cheerMessages = [
    "「우… 와앙!(泣)」 떨리지만 오늘도 출근 완료!",
    "「어떻게든 될 거야!(なんとかなれー!)」 하치와레가 응원해요!",
    "「이야하-앗!! 우라우라!!」 우사기 파워로 규제 타파!",
    "₍ᐢ.ˬ.ᐢ₎ 오늘도 국민을 위해 힘내줘서 고마워요!"
  ];

  if (cryBtn) {
    cryBtn.addEventListener('click', () => {
      const randomMsg = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
      showToast(randomMsg);
      // 살짝 통통 튀는 애니메이션
      cryBtn.style.transform = 'scale(1.2) rotate(-5deg)';
      setTimeout(() => {
        cryBtn.style.transform = '';
      }, 300);
    });
  }

  // 3. 주요 업무 퀘스트 필터링 탭
  const questTabs = document.querySelectorAll('.quest-tab-btn');
  const dutyCards = document.querySelectorAll('.cute-duty-card');

  questTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      questTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      dutyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'cuteFade 0.3s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. 찾아오시는 길 캠퍼스 탭 전환 (진천 vs 과천)
  const campusTabs = document.querySelectorAll('.cute-tab-btn');
  const jincheonPanel = document.getElementById('jincheon-panel');
  const gwacheonPanel = document.getElementById('gwacheon-panel');

  campusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      campusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      if (target === 'jincheon') {
        if (jincheonPanel) jincheonPanel.classList.add('active');
        if (gwacheonPanel) gwacheonPanel.classList.remove('active');
      } else if (target === 'gwacheon') {
        if (gwacheonPanel) gwacheonPanel.classList.add('active');
        if (jincheonPanel) jincheonPanel.classList.remove('active');
      }
    });
  });
});

// 주소 복사 헬퍼 함수
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`₍ᐢ.ˬ.ᐢ₎ '${text}' 복사 완료! (わァ~!)`);
    if (btnElement) {
      const originalText = btnElement.innerText;
      btnElement.innerText = "복사 완료! 🌸";
      setTimeout(() => {
        btnElement.innerText = originalText;
      }, 2000);
    }
  }).catch(err => {
    // 구형 호환
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`₍ᐢ.ˬ.ᐢ₎ '${text}' 복사 완료! ✨`);
    } catch (e) {
      alert(text);
    }
    document.body.removeChild(textArea);
  });
}

// 귀여운 토스트 알림창
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
