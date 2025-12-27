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

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("is-open")) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (navMenu.contains(target) || navToggle.contains(target)) return;
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
    const hrefFile = href.split("/").pop()?.toLowerCase();
    if (!hrefFile) return;
    if (hrefFile === currentFile) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

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
      const mailto = contactForm.dataset.mailto;
      if (!mailto) {
        alert(
          "Thanks for reaching out to Fedora Technologies.\n\nThis site is static. Add a form provider or set data-mailto on the form to send via email."
        );
        return;
      }

      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const company = String(data.get("company") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subjectParts = ["Fedora Technologies Inquiry"];
      if (company) subjectParts.push(company);
      const subject = subjectParts.join(" — ");

      const bodyLines = [
        "Hello Fedora Technologies,",
        "",
        "I'm reaching out via your website contact form.",
        "",
        `Name: ${name || "-"}`,
        `Company: ${company || "-"}`,
        `Email: ${email || "-"}`,
        `Phone: ${phone || "-"}`,
        "",
        "Message:",
        message || "-",
        "",
      ];

      const body = bodyLines.join("\n");
      const url = `mailto:${encodeURIComponent(mailto)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    });
  }
});
