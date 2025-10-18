console.log("IT’S ALIVE!");
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
const pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'Resume' }
];
const BASE_PATH = "/portfolio/";
const nav = document.createElement('nav');
document.body.prepend(nav);
for (let p of pages) {
  let url = p.url.startsWith('http') ? p.url : BASE_PATH + p.url;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = p.title;
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );
  nav.append(a);
}
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select id="theme-select">
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);
const select = document.querySelector('#theme-select');
function setColor(scheme){
  document.documentElement.style.setProperty('color-scheme',scheme)
}

if ('colorScheme' in localStorage){
  const savedScheme = localStorage.colorScheme;
  setColor(savedScheme);
  select.value = savedScheme;
} else{
  setColor('light dark')
  select.value =  'light dark'
}

select.addEventListener('input', (event) => {
  const scheme = event.target.value;
  document.documentElement.style.setProperty('color-scheme', scheme);
  console.log('Color scheme changed to:', scheme);
  localStorage.colorScheme = event.target.value
});