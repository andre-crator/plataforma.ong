// js/main.js
// Entry point do projeto. Somente JS puro (sem JSX/HTML solto).

// (Opcional) Mantém a estrutura modular pedida no trabalho 3.
// Se os módulos existirem em js/modules/, os imports funcionam; se não, pode comentar.
import './modules/spa.js';
import './modules/storage.js';
import './modules/validation.js';

(() => {
  'use strict';

  const onReady = () => {
    // ===== NAV: botão hambúrguer (mobile) =====
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('navbar__menu--open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    // ===== NAV: dropdown "Projetos" no mobile =====
    const projetosLink = document.querySelector('.dropdown > a.navbar__link');
    const dropdown = document.querySelector('.dropdown__menu');

    if (projetosLink && dropdown) {
      projetosLink.addEventListener('click', (e) => {
        // No mobile, previne navegação e expande o submenu
        if (window.matchMedia('(max-width: 768px)').matches) {
          e.preventDefault();
          dropdown.classList.toggle('dropdown__menu--open');
          const expanded = projetosLink.getAttribute('aria-expanded') === 'true';
          projetosLink.setAttribute('aria-expanded', String(!expanded));
        }
      });
    }

    // ===== DebugBot simples (ative com ?debug=1 na URL) =====
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') {
      console.info('[DebugBot] Ativo');

      // Captura erros JS
      window.addEventListener('error', (ev) => {
        console.group('[DebugBot] JS Error');
        console.error(ev.message, ev.error);
        console.groupEnd();
      });

      // Marca imagens quebradas
      document.addEventListener(
        'error',
        (ev) => {
          const t = ev.target;
          if (t && t.tagName === 'IMG') {
            console.warn('[DebugBot] Imagem falhou:', t.src);
            t.alt = (t.alt || 'Imagem') + ' (erro ao carregar)';
          }
        },
        true
      );
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();