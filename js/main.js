/* ======================================================
   ⚙ MAIN.JS
   Autor: André Borges Pereira Machado
   Projeto: Plataforma ONG (Entrega II – Estilização e Leiautes)
   Descrição: Script principal do site — ativa o menu responsivo,
   dropdowns, rolagem suave e outros comportamentos interativos.
====================================================== */

/* ===== MENU HAMBÚRGUER (mobile) ===== */
(() => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar__toggle");

  if (!navbar || !toggle) return; // Evita erro se o elemento não existir

  const menu = navbar.querySelector(".navbar__menu");

  // Clique no botão abre/fecha o menu
  toggle.addEventListener("click", () => {
    const active = navbar.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(active));
    if (active) {
      menu.querySelector("a, button")?.focus(); // foco no primeiro item
    }
  });
})();

/* ===== DROPDOWN (submenu em Projetos) ===== */
(() => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((drop) => {
    const trigger = drop.querySelector(".navbar__link");
    const menu = drop.querySelector(".dropdown__menu");

    trigger.addEventListener("mouseenter", () => menu.classList.add("open"));
    trigger.addEventListener("mouseleave", () =>
      setTimeout(() => menu.classList.remove("open"), 200)
    );

    // Fecha o menu ao clicar fora (mobile)
    document.addEventListener("click", (e) => {
      if (!drop.contains(e.target)) menu.classList.remove("open");
    });
  });
})();

/* ===== ROLAGEM SUAVE PARA LINKS INTERNOS ===== */
(() => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const destino = document.querySelector(link.getAttribute("href"));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();

/* ===== ALERTA DE ACESSIBILIDADE ===== */
(() => {
  console.log(
    "%cAcessibilidade Ativa!",
    "color: green; font-weight: bold; font-size: 14px;"
  );
})();

/* ===== FILTRO DE PROJETOS (cards) ===== */
(() => {
  const grid = document.querySelector(".cards-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".card"));
  const buttons = document.querySelectorAll('[data-filter]');

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filtro = btn.getAttribute("data-filter");

      // estado visual (ativo)
      buttons.forEach(b => b.classList.remove("button--success"));
      btn.classList.add("button--success");

      // aplica filtro
      cards.forEach(card => {
        const cat = (card.getAttribute("data-categoria") || "").toLowerCase();
        const show = (filtro === "todos") || (cat === filtro.toLowerCase());
        card.style.display = show ? "" : "none";
      });
    });
  });
})();