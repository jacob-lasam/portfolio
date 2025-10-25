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
const nav = document.createElement('nav');
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"
  : "/portfolio/"; 
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
export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!Array.isArray(projects)) {
    console.error('Invalid projects data');
    return;
  }

  if (!containerElement) {
    console.error('Invalid container element');
    return;
  }

  const article = document.createElement("article");

  // Title
  const title = document.createElement("h2");
  title.textContent = project.title; // e.g., "Lorem ipsum dolor sit."

  // Image
  const img = document.createElement("img");
  img.src = project.imageUrl;
  img.alt = project.title;

  // Description
  const description = document.createElement("p");
  description.textContent = project.description;

  // Append elements to article
  article.appendChild(title);
  article.appendChild(img);
  article.appendChild(description);

  // Append article to container
  containerElement.appendChild(article);
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
