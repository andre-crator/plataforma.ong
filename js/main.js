/* =========================================================================
 * main.js — Comportamentos globais do site
 * - Botão hambúrguer (mobile) com aria-expanded
 * - Dropdown "Projetos" acessível (hover/foco)
 * - Suporte a teclado (Esc fecha menus)
 * - Utilitários: scroll suave e focagem
 * ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ----- Menu mobile (hambúrguer) -----
  const toggleBtn = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("navbar__menu--open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Fecha menu ao clicar fora (mobile)
  document.addEventListener("click", (e) => {
    if (!menu || !toggleBtn) return;
    const clickOutside = !menu.contains(e.target) && !toggleBtn.contains(e.target);
    if (clickOutside && menu.classList.contains("navbar__menu--open")) {
      menu.classList.remove("navbar__menu--open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // ----- Dropdown Projetos (acessível) -----
  const dropdown = document.querySelector(".dropdown");
  const dropdownToggle = dropdown ? dropdown.querySelector("a[aria-haspopup='true']") : null;
  const dropdownMenu = dropdown ? dropdown.querySelector(".dropdown__menu") : null;

  if (dropdown && dropdownToggle && dropdownMenu) {
    // Abre/fecha no hover (desktop)
    dropdown.addEventListener("mouseenter", () => {
      dropdownMenu.classList.add("is-open");
      dropdownToggle.setAttribute("aria-expanded", "true");
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdownMenu.classList.remove("is-open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    });

    // Teclado: Enter/Espaço abre; Esc fecha
    dropdownToggle.addEventListener("keydown", (e) => {
      if (["Enter", " "].includes(e.key)) {
        e.preventDefault();
        const open = dropdownMenu.classList.toggle("is-open");
        dropdownToggle.setAttribute("aria-expanded", String(open));
        if (open) dropdownMenu.querySelector("a")?.focus();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dropdownMenu.classList.contains("is-open")) {
        dropdownMenu.classList.remove("is-open");
        dropdownToggle.setAttribute("aria-expanded", "false");
        dropdownToggle.focus();
      }
    });
  }

  // ----- Scroll suave para âncoras internas -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1"); // acessibilidade pós-scroll
        target.focus({ preventScroll: true });
      }
    });
  });
});