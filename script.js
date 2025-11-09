// Smooth Scrolling and Active Section Highlight
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });

    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getAttribute('id') === 'home' ? section.offsetTop : section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      section.classList.add('visible');
      current = section.getAttribute('id');
    } else {
      section.classList.remove('visible');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  // Progress Bar
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// Back to Top
document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Star Rating
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    stars.forEach(s => {
      s.classList.remove('filled');
      if (parseInt(s.getAttribute('data-value')) <= selectedRating) {
        s.classList.add('filled');
      }
    });
    document.getElementById('rating').value = selectedRating;
  });
});

// Newsletter Form
document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for subscribing!');
  document.getElementById('email').value = '';
});

// Search Functionality
document.getElementById('searchInput').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  sections.forEach(section => {
    const text = section.textContent.toLowerCase();
    section.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// Chart.js for Emissions Data
const ctx = document.getElementById('emissionsChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Energy', 'Transportation', 'Industry', 'Deforestation'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: ['#4CAF50', '#2E8B57', '#8c8b8b', '#45a049']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  }
});

// Dark Mode Toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }
}

document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

// Initialize visibility for the home section
document.getElementById('home').classList.add('visible');