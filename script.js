

// 1. HAMBURGER MENU (Mobile Nav Toggle)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Nav links close karo click karne par (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// 2. VOTER SEARCH FUNCTION
function searchVoter() {
  const query = document.getElementById('voterSearch').value.trim().toLowerCase();
  const result = document.getElementById('searchResult');

  if (!query) {
    result.textContent = '⚠️ कृपया नाम दर्ज करें।';
    result.style.color = 'orange';
    return;
  }

  const voterList = [
    { name: 'राजेन्द्र कुमार', id: 'RJ001', district: 'जयपुर' },
    { name: 'सुरेश शर्मा',     id: 'RJ002', district: 'जोधपुर' },
    { name: 'मोहन लाल',       id: 'RJ003', district: 'उदयपुर' },
    // ---- Aur naam yahan likhte jao ----
  ];

  // Search logic
  const found = voterList.filter(v => v.name.toLowerCase().includes(query));

  if (found.length > 0) {
    result.innerHTML = found.map(v =>
      `✅ <strong>${v.name}</strong> — ID: ${v.id} | जिला: ${v.district}`
    ).join('<br/>');
    result.style.color = 'green';
  } else {
    result.textContent = `❌ "${query}" नाम मतदाता सूची में नहीं मिला।`;
    result.style.color = 'red';
  }
}

// search by enter key
document.getElementById('voterSearch').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchVoter();
});


// 3. CAROUSEL SLIDER
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
const totalSlides = slides.length;
const dotsContainer = document.getElementById('carouselDots');

// dot container
if (dotsContainer && totalSlides > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

// Slide change function
function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  // Slide position update
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Dots update
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Auto-slide every 4 seconds
if (totalSlides > 0) {
  setInterval(() => changeSlide(1), 4000);
}


// 4. SMOOTH SCROLL (already handled by CSS scroll-behavior)
// Extra: Navbar link active state on scroll
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#c9972b'; 
    }
  });
});


// 5. SCROLL REVEAL ANIMATION
// Cards and sections appear  on scroll
const revealElements = document.querySelectorAll(
  '.sankalp-card, .contact-card, .sangharsh-grid img, .parichay'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});