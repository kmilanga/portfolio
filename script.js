const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const savedTheme = localStorage.getItem('theme');
let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', currentTheme);

function updateThemeLabel() {
  if (!themeToggle) return;
  themeToggle.setAttribute(
    'aria-label',
    currentTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  );
}

function closeMobileMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.style.display = 'none';
  menuToggle.setAttribute('aria-expanded', 'false');
}

updateThemeLabel();

themeToggle?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeLabel();
});

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.style.display = expanded ? 'none' : 'block';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) closeMobileMenu();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
