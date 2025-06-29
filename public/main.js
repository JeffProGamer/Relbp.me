// main.js for relbp.me
document.addEventListener('DOMContentLoaded', () => {
  initSPARouting();
});

/**
 * Setup single-page app routing
 */
function initSPARouting() {
  // Attach click listener to all internal links
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link && link.href.startsWith(location.origin)) {
      e.preventDefault();
      const url = new URL(link.href);
      navigateTo(url.pathname);
    }
  });

  // Handle back/forward browser buttons
  window.addEventListener('popstate', () => {
    navigateTo(location.pathname, false);
  });

  // Initial route
  if (location.pathname !== '/') {
    navigateTo(location.pathname, false);
  }
}

/**
 * Loads content via server and updates history
 * @param {string} path 
 * @param {boolean} pushState 
 */
async function navigateTo(path, pushState = true) {
  try {
    const res = await fetch(path, { headers: { 'X-Requested-With': 'relbp.me-SPA' } });
    if (!res.ok) throw new Error('Failed to load content');
    const html = await res.text();

    // Extract just the #main-content from returned HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const newContent = temp.querySelector('#main-content');
    const newTitle = temp.querySelector('title');

    if (newContent && document.getElementById('main-content')) {
      document.getElementById('main-content').innerHTML = newContent.innerHTML;
      if (newTitle) document.title = newTitle.textContent;
      if (pushState) history.pushState({}, '', path);
      window.scrollTo(0, 0);
    } else {
      // fallback to full reload if structure is missing
      window.location.href = path;
    }
  } catch (err) {
    console.error('SPA Navigation Error:', err);
    window.location.href = path;
  }
}

