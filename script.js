/* ===================================================
   SYSTEL GROUP - Interactive JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header shrink on scroll
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link based on section
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Back to Top ---
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // If on mobile and it's a dropdown toggle, don't close menu, just expand it
      if (window.innerWidth <= 768 && link.closest('.nav-item-dropdown')) {
        e.preventDefault();
        link.closest('.nav-item-dropdown').classList.toggle('mobile-expand');
        return;
      }

      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Mega Menu Overlay Hover ---
  const navDropdown = document.querySelector('.nav-item-dropdown');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  if (navDropdown && menuOverlay) {
    navDropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        menuOverlay.classList.add('active');
      }
    });
    
    navDropdown.addEventListener('mouseleave', () => {
      menuOverlay.classList.remove('active');
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active Nav Link on Scroll ---
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Animated Counter ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => counterObserver.observe(stat));

  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      element.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Parallax on Hero ---
  const heroBg = document.querySelector('.hero-bg img');

  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
      }
    }, { passive: true });
  }

  // --- Product Card Tilt Effect ---
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // --- Newsletter Form ---
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const email = input.value;

      if (email) {
        // Simple visual feedback
        const btn = newsletterForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        btn.style.background = '#22c55e';
        input.value = '';
        input.placeholder = 'Thank you!';

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          input.placeholder = 'Enter your email';
        }, 3000);
      }
    });
  }

  // --- Subtle glow follow cursor on hero ---
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow && window.innerWidth > 768) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const x = e.clientX - 250;
      const y = e.clientY - 250;
      heroGlow.style.left = x + 'px';
      heroGlow.style.top = y + 'px';
    });
  }

});

// --- W3Schools Slideshow ---
let slideIndex = 1;
let autoPlayTimer;

// Only initialize if there's a slideshow on the page
if (document.querySelector('.mySlides')) {
  showSlides(slideIndex);
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (!slides.length) return;
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  
  // Auto play
  clearTimeout(autoPlayTimer);
  autoPlayTimer = setTimeout(() => {
    plusSlides(1);
  }, 4000); // Change image every 4 seconds
}
