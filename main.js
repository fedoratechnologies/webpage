document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.addEventListener("click", (event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (anchor && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const currentTarget = event.currentTarget;
      if (!(currentTarget instanceof HTMLAnchorElement)) return;
      const href = currentTarget.getAttribute("href");
      if (!href) return;
      const targetId = href.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      const headerOffset = 76;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const offsetTop = rect.top + scrollTop - headerOffset;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        "Thanks for reaching out to Fedora Technologies.\n\nThis is a static demo form. Update main.js or the form action to connect it to your CRM, ticketing system, or email."
      );
    });
  }
});
