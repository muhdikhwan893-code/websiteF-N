const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const navLinks = document.querySelectorAll('.nav-menu a:not(.btn)');
const sections = ['home', 'about', 'products', 'promotions', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const PRODUCTS = {
  '100plus': {
    title: '100PLUS',
    category: 'Isotonic',
    image: 'assets/product-100plus.png',
    description: "Malaysia's favourite isotonic beverage, crafted to replenish fluids, glucose and electrolytes so you can keep moving.",
    details: [
      'Isotonic hydration support',
      'Glucose and electrolyte replenishment',
      'Available in original, lemon lime, active and zero variants',
      'Great for active days, sports and busy routines'
    ]
  },
  'seasons': {
    title: 'F&N SEASONS',
    category: 'Tea & Wellness',
    image: 'assets/product-seasons.png',
    description: 'Naturally inspired tea and wellness drinks for a lighter, refreshing everyday moment.',
    details: [
      'Tea-based refreshment',
      'Fruit-forward flavours',
      'Suitable for everyday sipping',
      'A lighter choice for mindful moments'
    ]
  },
  'fun-flavours': {
    title: 'F&N Fun Flavours',
    category: 'Sparkling',
    image: 'assets/product-fun-flavours.png',
    description: 'A bold lineup of fruit-forward carbonated drinks, cordials and sparkling favourites.',
    details: [
      'Multiple fruit flavours',
      'Carbonated soft drink range',
      'Cordial and sparkling options',
      'Perfect for parties, meals and cravings'
    ]
  },
  'ice-cream-soda': {
    title: 'F&N Ice Cream Soda',
    category: 'Sparkling',
    image: 'assets/product-ice-cream-soda.png',
    description: 'Creamy, frothy soda flavour with a smooth vanilla finish.',
    details: [
      'Rich ice cream soda flavour',
      'Smooth and creamy taste profile',
      'Great with desserts or as a treat',
      'Available in convenient bottle sizes'
    ]
  },
  'sarsi': {
    title: 'F&N Sarsi',
    category: 'Sparkling',
    image: 'assets/product-sarsi.png',
    description: 'Classic sarsaparilla-inspired soda with a uniquely bold, earthy taste.',
    details: [
      'Bold sarsaparilla character',
      'Classic heritage flavour',
      'Fizzy and satisfying',
      'A must-try for flavour explorers'
    ]
  },
  'orange': {
    title: 'F&N Orange',
    category: 'Sparkling',
    image: 'assets/product-orange.png',
    description: 'Zesty orange soda bursting with citrus brightness.',
    details: [
      'Fresh orange flavour',
      'Bright citrus aroma',
      'Fizzy and easy to enjoy',
      'Great with meals and gatherings'
    ]
  },
  'grape': {
    title: 'F&N Grape',
    category: 'Sparkling',
    image: 'assets/product-grape.png',
    description: 'Sweet and juicy grape soda with a playful purple punch.',
    details: [
      'Juicy grape flavour',
      'Sweet and refreshing finish',
      'Bold colour and fun personality',
      'Ideal for dessert moments'
    ]
  },
  'strawberry': {
    title: 'F&N Strawberry',
    category: 'Sparkling',
    image: 'assets/product-strawberry.png',
    description: 'Ripe strawberry soda with a sweet, fragrant finish.',
    details: [
      'Ripe strawberry flavour',
      'Sweet fragrant aroma',
      'Smooth sparkling refreshment',
      'Perfect for sunny-day cravings'
    ]
  }
};

function onScroll() {
  const currentY = window.scrollY;
  header.classList.toggle('scrolled', currentY > 20);
  backToTop.classList.toggle('show', currentY > 600);

  let currentSection = 'home';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (currentY >= sectionTop && currentY < sectionBottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

function closeMobileMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function openProductModal(productKey) {
  const product = PRODUCTS[productKey];
  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = `${product.title} product image`;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalDetails.innerHTML = product.details.map((item) => `<li>${item}</li>`).join('');

  productModal.classList.add('open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });

  productCards.forEach((card) => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !matches);
  });
}

function validateField(input) {
  const error = document.querySelector(`[data-error-for="${input.id}"]`);
  let message = '';

  if (input.id === 'name' && input.value.trim().length < 2) {
    message = 'Please enter your name.';
  }

  if (input.id === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim()) {
      message = 'Please enter your email address.';
    } else if (!emailPattern.test(input.value.trim())) {
      message = 'Please enter a valid email address.';
    }
  }

  if (input.id === 'message' && input.value.trim().length < 10) {
    message = 'Please enter a message with at least 10 characters.';
  }

  if (error) error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return !message;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

document.querySelectorAll('[data-view-product]').forEach((button) => {
  button.addEventListener('click', () => openProductModal(button.dataset.viewProduct));
});

document.querySelectorAll('[data-footer-product]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => openProductModal(link.dataset.footerProduct), 550);
  });
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeProductModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal.classList.contains('open')) {
    closeProductModal();
  }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      window.setTimeout(() => entry.target.classList.add('visible'), index * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = 'Please complete the highlighted fields.';
    formStatus.className = 'form-status error';
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    contactForm.reset();
    fields.forEach((field) => {
      field.setAttribute('aria-invalid', 'false');
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      if (error) error.textContent = '';
    });
    formStatus.textContent = 'Thank you! Your message has been received.';
    formStatus.className = 'form-status success';
  }, 900);
});

contactForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('blur', () => validateField(field));
});

document.getElementById('year').textContent = new Date().getFullYear();
