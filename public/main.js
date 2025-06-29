// main.js

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

// Optional: Close sidebar when clicking outside
document.addEventListener('click', (event) => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar.contains(event.target) && !event.target.matches('.sidebar-toggle')) {
    sidebar.classList.remove('active');
  }
});

