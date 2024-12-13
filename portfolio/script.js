const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.forEach(i => {
      i.classList.remove('fw-bold');
      i.textContent = i.textContent.replace(/_$/, '');
    });

    item.classList.add('fw-bold');
    item.textContent += '_';
  });
});

function toggleMenu() {
  const links = document.querySelector('.mobile-links');
  const icon = document.querySelector('.mobile-icon');
  const menu = document.querySelector('.mobile-menu');

  links.classList.toggle('open');
  icon.classList.toggle('open');
  menu.classList.toggle('open');
}
