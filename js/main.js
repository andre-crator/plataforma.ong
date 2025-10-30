/* ======================================================
   ⚙ MAIN.JS
   Autor: André Borges Pereira Machado
   Projeto: Plataforma ONG (Entrega II – Estilização e Leiautes)
   Descrição: Script principal do site — ativa o menu responsivo,
   dropdowns, rolagem suave e outros comportamentos interativos.
====================================================== */

// ===== Navegação responsiva (menu hambúrguer) =====
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      menu.classList.toggle("navbar__menu--open");
    });
  }
});