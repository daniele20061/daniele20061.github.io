export function initTypewriter(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const titles = ['Psicologa del lavoro', 'Psicologa dello sport', 'Formatrice', 'Mental Trainer'];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIdx];
    el.textContent = isDeleting
      ? currentTitle.substring(0, charIdx--)
      : currentTitle.substring(0, charIdx++);

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx > currentTitle.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      typeSpeed = 100;
    }
    setTimeout(type, typeSpeed);
  }

  type();
}
