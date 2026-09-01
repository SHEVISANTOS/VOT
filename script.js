/* =========================================================
   VOT — Volunteers of Tanzania
   Cleaned and updated JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavToggle();
  initScrollReveal();
  initTestimonialCarousel();
  initContactForm();
  initHeaderScroll();
  initActiveNav();
  initStatCounters();
});

/* Footer year */
function setYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

/* Mobile nav */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!toggle || !nav) return;
  if (toggle.dataset.navBound === "true") return;
  toggle.dataset.navBound = "true";

  toggle.setAttribute("type", "button");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");

  if (!toggle.innerHTML.trim()) {
    toggle.innerHTML = `
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    `;
  }

  const relatedNavs = [nav, document.querySelector(".nav")].filter(Boolean);

  function syncNavVisibility() {
    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;

    if (!isMobile) {
      relatedNavs.forEach((menu) => {
        menu.classList.add("is-visible");
        menu.classList.remove("is-open", "open");
        menu.setAttribute("aria-hidden", "false");
      });
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
      return;
    }

    relatedNavs.forEach((menu) => {
      const isOpen = menu.classList.contains("is-open");
      menu.classList.toggle("is-visible", isOpen);
      menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
  }

  function setNavState(isOpen) {
    relatedNavs.forEach((menu) => {
      menu.classList.toggle("is-open", isOpen);
      menu.classList.toggle("open", isOpen);
      menu.classList.toggle("is-visible", isOpen);
      menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeNav() {
    setNavState(false);
  }

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    if (!isMobile) return;
    setNavState(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("is-open") &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
    }
  });

  window.addEventListener("resize", syncNavVisibility);
  syncNavVisibility();
}

/* Reveal-on-scroll for elements marked .reveal */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  items.forEach((el) => observer.observe(el));
}

/* Testimonial carousel */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonial-dots button");

  if (!slides.length || !dots.length) return;

  let current = 0;
  let timer = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function showSlide(index) {
    if (slides[current]) {
      slides[current].classList.remove("is-active");
    }

    if (dots[current]) {
      dots[current].classList.remove("is-active");
    }

    current = (index + slides.length) % slides.length;

    if (slides[current]) {
      slides[current].classList.add("is-active");
    }

    if (dots[current]) {
      dots[current].classList.add("is-active");
    }
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      restartTimer();
    });
  });

  function restartTimer() {
    if (prefersReducedMotion) return;

    clearInterval(timer);
    timer = setInterval(() => {
      showSlide(current + 1);
    }, 6000);
  }

  restartTimer();
}

/* Contact form */
function initContactForm() {
  const form = document.getElementById("contact-form");

  if (!form) return;

  const note = document.getElementById("form-note");

  form.addEventListener("submit", handleSubmit);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!note) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const honeypot = form.elements["_gotcha"];

    const firstNameField = form.elements["first-name"];
    const lastNameField = form.elements["last-name"];
    const emailField = form.elements["email"];

    const firstName = firstNameField ? firstNameField.value.trim() : "";
    const lastName = lastNameField ? lastNameField.value.trim() : "";
    const email = emailField ? emailField.value.trim() : "";

    note.textContent = "";
    note.classList.remove("is-success", "is-error");

    /* Spam honeypot */
    if (honeypot && honeypot.value) {
      form.reset();
      note.textContent = "Thank you.";
      note.classList.add("is-success");
      return;
    }

    /* Basic validation */
    if (!firstName || !lastName || !email) {
      note.textContent = "Please fill in your name and email before submitting.";
      note.classList.add("is-error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      note.classList.add("is-error");
      return;
    }

    /*
      IMPORTANT:
      Replace YOUR_FORM_ID in index.html with your real Formspree form ID.
      Example:
      https://formspree.io/f/abcdwxyz
    */
    const formAction = form.getAttribute("action") || "";

    if (formAction.includes("YOUR_FORM_ID")) {
      note.textContent =
        "The form is not connected yet. Replace YOUR_FORM_ID in index.html with your Formspree form ID.";
      note.classList.add("is-error");
      return;
    }

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.classList.add("is-loading");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        note.textContent = `Thanks, ${firstName}! Your application has been sent. We will reply soon.`;
        note.classList.add("is-success");

        appendWhatsAppFollowUp(note, firstName, lastName);

        form.reset();
      } else {
        let errorMessage =
          "Sorry, something went wrong. Please try again or contact us on WhatsApp.";

        try {
          const data = await response.json();

          if (data && data.errors) {
            const messages = data.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(", ");

            if (messages) {
              errorMessage = messages;
            }
          }
        } catch (parseError) {
          /* Keep default error message */
        }

        note.textContent = errorMessage;
        note.classList.add("is-error");
      }
    } catch (error) {
      note.textContent =
        "Sorry, we could not submit the form right now. Please try again or contact us on WhatsApp.";
      note.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove("is-loading");
    }
  }

  function appendWhatsAppFollowUp(noteElement, firstName, lastName) {
    const fullName = `${firstName} ${lastName}`.trim();
    const message = `Hello VOT, my name is ${fullName}. I just submitted the volunteer application form.`;
    const whatsappUrl = `https://wa.me/255765883202?text=${encodeURIComponent(message)}`;

    const lineBreak = document.createElement("br");

    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappUrl;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.textContent = "Continue on WhatsApp";

    noteElement.appendChild(lineBreak);
    noteElement.appendChild(whatsappLink);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof TomSelect !== 'undefined' && document.querySelector("#country-code")) {
        new TomSelect("#country-code", {
            create: false,
            searchField: ["text", "value"],
            maxOptions: null,
            placeholder: "Search country...",
            allowEmptyOption: false,
            closeAfterSelect: true,
            sortField: {
                field: "text",
                direction: "asc"
            }
        });
    }
});

// Fast video loading optimization
        function playVideo(videoId) {
            const videos = document.querySelectorAll('.video-thumbnail video');
            videos.forEach(video => {
                if (video.closest('.video-thumbnail').onclick.toString().includes(videoId)) {
                    video.play();
                    video.parentElement.classList.add('playing');
                } else {
                    video.pause();
                    video.parentElement.classList.remove('playing');
                }
            });
        }

        // Lazy load videos when they come into viewport
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                        videoObserver.unobserve(video);
                    }
                }
            });
        }, observerOptions);

        // Observe all videos with data-src
        document.querySelectorAll('video[data-src]').forEach(video => {
            videoObserver.observe(video);
        });

        // Pause videos when not visible to save bandwidth
        document.querySelectorAll('.video-thumbnail video').forEach(video => {
            video.addEventListener('mouseenter', () => video.play());
            video.addEventListener('mouseleave', () => video.pause());
        });

 // script.js - JavaScript for Safari page

// Pause/play videos on hover for better performance
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        
        // Pause video on mouse leave to save bandwidth
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        
        // Play video on mouse enter
        card.addEventListener('mouseenter', () => {
            video.play();
        });
        
        // Play video on click
        card.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});

// Smooth scroll for back link
const backLink = document.querySelector('.back-link');
if (backLink) {
    backLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Redirect after smooth scroll
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('is-active');
      if (current && link.getAttribute('href').substring(1) === current) {
        link.classList.add('is-active');
      }
    });
  });
}

function initStatCounters() {
  const stats = document.querySelectorAll('.stat dt');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const finalValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(finalValue)) return;
        
        let startValue = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(easeProgress * finalValue);
          
          target.textContent = currentValue + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = finalValue + suffix;
          }
        }
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* MAIL SERVICES  */
function sendEmail(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const program = document.getElementById('program').value;
  const message = document.getElementById('message').value;
  
  const subject = `New Volunteer Application - ${firstName} ${lastName}`;
  const body = `Name: ${firstName} ${lastName}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AProgram: ${program}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  
  // Open email client
  window.location.href = `mailto:shevijeremiah@proton.me,shevijeremiah@gmail.com?subject=${subject}&body=${body}`;
  
  // Show success message
  document.getElementById('form-note').textContent = 'Opening your email client...';
  document.getElementById('form-note').className = 'form-note is-success';
}

/* =========================================================
   VOT — Volunteers of Tanzania
   Professional JavaScript with Performance Optimizations
   ========================================================= */

(function() {
  'use strict';

  // Cache DOM elements for performance
  const DOM = {
    navToggle: document.querySelector('.nav-toggle'),
    primaryNav: document.querySelector('#primary-nav'),
    revealElements: document.querySelectorAll('.reveal'),
    yearSpan: document.getElementById('year'),
    header: document.querySelector('.site-header'),
    smoothLinks: document.querySelectorAll('a[href^="#"]')
  };

  // Utility: Debounce function for performance
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Utility: Throttle function for scroll events
  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  const initMobileNav = () => {
    if (!DOM.navToggle || !DOM.primaryNav) return;
    if (DOM.navToggle.dataset.navBound === 'true') return;
    DOM.navToggle.dataset.navBound = 'true';

    DOM.navToggle.setAttribute('type', 'button');
    DOM.navToggle.setAttribute('aria-expanded', 'false');
    DOM.navToggle.setAttribute('aria-label', 'Open menu');

    if (!DOM.navToggle.innerHTML.trim()) {
      DOM.navToggle.innerHTML = `
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      `;
    }

    const relatedNavs = [DOM.primaryNav, document.querySelector('.nav')].filter(Boolean);

    const syncNavVisibility = () => {
      const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

      if (!isMobile) {
        relatedNavs.forEach((menu) => {
          menu.classList.add('is-visible');
          menu.classList.remove('is-open', 'open');
          menu.setAttribute('aria-hidden', 'false');
        });
        DOM.navToggle.classList.remove('is-active');
        DOM.navToggle.setAttribute('aria-expanded', 'false');
        DOM.navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
        return;
      }

      relatedNavs.forEach((menu) => {
        const isOpen = menu.classList.contains('is-open');
        menu.classList.toggle('is-visible', isOpen);
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });
    };

    const setNavState = (isOpen) => {
      relatedNavs.forEach((menu) => {
        menu.classList.toggle('is-open', isOpen);
        menu.classList.toggle('open', isOpen);
        menu.classList.toggle('is-visible', isOpen);
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });
      DOM.navToggle.setAttribute('aria-expanded', String(isOpen));
      DOM.navToggle.classList.toggle('is-active', isOpen);
      DOM.navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const toggleNav = () => {
      if (!window.matchMedia('(max-width: 767.98px)').matches) return;
      const isExpanded = DOM.navToggle.getAttribute('aria-expanded') === 'true';
      setNavState(!isExpanded);
    };

    // Close menu when clicking outside
    const closeMenuOnOutsideClick = (e) => {
      if (!relatedNavs.some((menu) => menu.contains(e.target)) && !DOM.navToggle.contains(e.target)) {
        setNavState(false);
      }
    };

    // Close menu on escape key
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && relatedNavs.some((menu) => menu.classList.contains('is-open'))) {
        setNavState(false);
        DOM.navToggle.focus();
      }
    };

    // Close menu when clicking on a link
    const closeMenuOnLinkClick = (e) => {
      if (e.target.tagName === 'A' && !e.target.getAttribute('href')?.startsWith('#')) {
        setNavState(false);
      }
    };

    DOM.navToggle.addEventListener('click', toggleNav);
    document.addEventListener('click', closeMenuOnOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    DOM.primaryNav.addEventListener('click', closeMenuOnLinkClick);
    window.addEventListener('resize', syncNavVisibility);
    syncNavVisibility();
  };

  /* =========================================================
     SCROLL REVEAL ANIMATION
     ========================================================= */
  const initScrollReveal = () => {
    if (!DOM.revealElements.length) return;

    const revealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on element index
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('reveal');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    DOM.revealElements.forEach((element) => {
      observer.observe(element);
    });

    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
      const revealOnScroll = throttle(() => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        DOM.revealElements.forEach((element, index) => {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < windowHeight - elementVisible) {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
              element.classList.add('is-visible');
              element.classList.remove('reveal');
            }, delay);
          }
        });
      }, 100);

      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll(); // Trigger once on load
    }
  };

  /* =========================================================
     DYNAMIC YEAR IN FOOTER
     ========================================================= */
  const initDynamicYear = () => {
    if (DOM.yearSpan) {
      DOM.yearSpan.textContent = new Date().getFullYear();
    }
  };

  /* =========================================================
     HEADER SCROLL EFFECT
     ========================================================= */
  const initHeaderScroll = () => {
    if (!DOM.header) return;

    const handleScroll = throttle(() => {
      if (window.scrollY > 100) {
        DOM.header.classList.add('is-scrolled');
      } else {
        DOM.header.classList.remove('is-scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
  };

  /* =========================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================= */
  const initSmoothScroll = () => {
    DOM.smoothLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without page jump
          history.pushState(null, '', href);
          
          // Close mobile menu if open
          if (DOM.navToggle && DOM.primaryNav) {
            DOM.navToggle.setAttribute('aria-expanded', 'false');
            DOM.navToggle.classList.remove('is-active');
            DOM.primaryNav.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        }
      });
    });
  };

  /* =========================================================
     ACTIVE NAV LINK HIGHLIGHTING
     ========================================================= */
  const initActiveNavHighlight = () => {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    if (!navLinks.length) return;

    const sections = Array.from(navLinks).map((link) => {
      const href = link.getAttribute('href');
      return document.querySelector(href);
    }).filter(Boolean);

    const highlightNav = throttle(() => {
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const navLink = navLinks[index];

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove('is-active'));
          navLink.classList.add('is-active');
        }
      });
    }, 100);

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Check on load
  };

  /* =========================================================
     FORM VALIDATION & SUBMISSION
     ========================================================= */
  const initFormValidation = () => {
    const form = document.querySelector('form');
    if (!form) return;

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const validatePhone = (phone) => {
      const re = /^[\d\s\-\+\(\)]{10,}$/;
      return re.test(phone);
    };

    const showError = (input, message) => {
      const field = input.closest('.field');
      if (!field) return;
      
      let errorElement = field.querySelector('.field-error');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: var(--error); font-size: var(--step-1); margin-top: 0.5rem;';
        field.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.style.borderColor = 'var(--error)';
    };

    const clearError = (input) => {
      const field = input.closest('.field');
      if (!field) return;
      
      const errorElement = field.querySelector('.field-error');
      if (errorElement) {
        errorElement.remove();
      }
      input.setAttribute('aria-invalid', 'false');
      input.style.borderColor = '';
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          showError(field, 'This field is required');
          isValid = false;
        } else {
          clearError(field);
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          if (!validateEmail(field.value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
          }
        }

        // Phone validation
        if (field.name === 'phone' && field.value.trim()) {
          if (!validatePhone(field.value)) {
            showError(field, 'Please enter a valid phone number');
            isValid = false;
          }
        }
      });

      if (isValid) {
        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          submitBtn.classList.add('is-loading');

          // Simulate form submission (replace with actual AJAX call)
          setTimeout(() => {
            submitBtn.textContent = 'Application Sent Successfully!';
            submitBtn.style.background = 'var(--acacia)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
              submitBtn.classList.remove('is-loading');
              submitBtn.style.background = '';
            }, 3000);
          }, 1500);
        }
      } else {
        // Focus first invalid field
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => clearError(field));
    });
  };

  /* =========================================================
     LAZY LOADING IMAGES
     ========================================================= */
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  };

  /* =========================================================
     PROGRESS / SKILL BARS
     ========================================================= */
  const initProgressBars = () => {
    const barContainers = document.querySelectorAll(
      '.progress-bar, .skill-bar, .meter, [data-progress], .bar-fill, .progress-fill, .meter-fill'
    );

    if (!barContainers.length) return;

    barContainers.forEach((bar) => {
      const fill = bar.querySelector('.fill, .bar-fill, .progress-fill, .meter-fill') || bar;
      const rawValue =
        bar.dataset.progress ||
        bar.dataset.width ||
        bar.getAttribute('aria-valuenow') ||
        bar.style.getPropertyValue('--progress') ||
        fill.dataset.progress ||
        fill.dataset.width;

      const value = Number.parseFloat(rawValue);
      if (!Number.isFinite(value)) return;

      const width = Math.min(Math.max(value, 0), 100);
      requestAnimationFrame(() => {
        fill.style.width = `${width}%`;
        fill.style.maxWidth = `${width}%`;
        fill.style.opacity = '1';
        fill.classList.add('is-visible');
        bar.classList.add('is-visible');
      });
    });
  };

  /* =========================================================
     INITIALIZE ALL FUNCTIONS
     ========================================================= */
  const init = () => {
    initMobileNav();
    initScrollReveal();
    initDynamicYear();
    initHeaderScroll();
    initSmoothScroll();
    initActiveNavHighlight();
    initFormValidation();
    initLazyLoading();
    initProgressBars();
    
    console.log('✅ VOT Website initialized successfully');
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ================= IMAGE CAROUSEL LOGIC =================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (!slides.length) return; // Exit if carousel isn't on this page

  let currentIndex = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('is-active'));
    dots.forEach(dot => dot.classList.remove('is-active'));
    
    // Handle wrapping around
    currentIndex = (index + slides.length) % slides.length;
    
    // Add active class to current
    slides[currentIndex].classList.add('is-active');
    dots[currentIndex].classList.add('is-active');
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000); // Rotates every 4 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event Listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        showSlide(index);
        startAutoPlay();
      });
    });

    // Pause on hover for better UX
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Start the rotation
    startAutoPlay();
  }
});

// Mini Carousel Auto-Rotation
document.addEventListener('DOMContentLoaded', () => {
  const miniSlides = document.querySelectorAll('.mini-slide');
  
  if (miniSlides.length > 0) {
    let currentMiniIndex = 0;
    
    setInterval(() => {
      miniSlides[currentMiniIndex].classList.remove('is-active');
      currentMiniIndex = (currentMiniIndex + 1) % miniSlides.length;
      miniSlides[currentMiniIndex].classList.add('is-active');
    }, 1000); // Changes every 1 second
  }
});

// ================= TESTIMONIALS SLIDER LOGIC =================
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-nav.prev');
  const nextBtn = document.querySelector('.testimonial-nav.next');
  const track = document.querySelector('.testimonial-track');
  
  if (cards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    let autoPlayInterval;

    function showCard(index) {
      // Remove active class from all cards
      cards.forEach(card => card.classList.remove('is-active'));
      
      // Handle wrapping around (infinite loop)
      currentIndex = (index + cards.length) % cards.length;
      
      // Add active class to the current card
      cards[currentIndex].classList.add('is-active');
    }

    function nextCard() {
      showCard(currentIndex + 1);
    }

    function prevCard() {
      showCard(currentIndex - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextCard, 5000); // Changes every 5 seconds
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextCard();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevCard();
      startAutoPlay();
    });

    // Pause auto-play when hovering over the slider for better UX
    if (track) {
      track.addEventListener('mouseenter', stopAutoPlay);
      track.addEventListener('mouseleave', startAutoPlay);
    }

    // Start the auto-rotation
    startAutoPlay();
  }
});

// ================= ACCOMMODATION REVIEWS SLIDER =================
document.addEventListener('DOMContentLoaded', () => {
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewDots = document.querySelectorAll('.review-dots .dot');
  const prevReviewBtn = document.querySelector('.review-nav.prev');
  const nextReviewBtn = document.querySelector('.review-nav.next');
  const reviewsTrack = document.querySelector('.reviews-track');
  
  if (reviewCards.length > 0 && prevReviewBtn && nextReviewBtn) {
    let currentReviewIndex = 0;
    let reviewAutoPlayInterval;

    function showReview(index) {
      // Remove active class from all cards and dots
      reviewCards.forEach(card => card.classList.remove('is-active'));
      reviewDots.forEach(dot => dot.classList.remove('is-active'));
      
      // Handle wrapping
      currentReviewIndex = (index + reviewCards.length) % reviewCards.length;
      
      // Add active class
      reviewCards[currentReviewIndex].classList.add('is-active');
      if (reviewDots[currentReviewIndex]) {
        reviewDots[currentReviewIndex].classList.add('is-active');
      }
    }

    function nextReview() {
      showReview(currentReviewIndex + 1);
    }

    function prevReview() {
      showReview(currentReviewIndex - 1);
    }

    function startReviewAutoPlay() {
      reviewAutoPlayInterval = setInterval(nextReview, 4500); // Changes every 4.5 seconds
    }

    function stopReviewAutoPlay() {
      clearInterval(reviewAutoPlayInterval);
    }

    // Button clicks
    nextReviewBtn.addEventListener('click', () => {
      stopReviewAutoPlay();
      nextReview();
      startReviewAutoPlay();
    });

    prevReviewBtn.addEventListener('click', () => {
      stopReviewAutoPlay();
      prevReview();
      startReviewAutoPlay();
    });

    // Dot clicks
    reviewDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopReviewAutoPlay();
        showReview(index);
        startReviewAutoPlay();
      });
    });

    // Pause on hover
    if (reviewsTrack) {
      reviewsTrack.addEventListener('mouseenter', stopReviewAutoPlay);
      reviewsTrack.addEventListener('mouseleave', startReviewAutoPlay);
    }

    // Start auto-rotation
    startReviewAutoPlay();
  }
});
