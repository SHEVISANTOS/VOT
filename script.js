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

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
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