export function initAccordion() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
