/* =========================================================================
 * optimize.js — melhorias de performance e acessibilidade em runtime
 * - Nenhuma dependência externa
 * - Compatível com checagem TS do VS Code (sem JSX/TS)
 * - Seguro para ser incluído em TODAS as páginas
 * ========================================================================= */

(function () {
  'use strict';

  // Util: rodar quando o DOM estiver pronto
  function ready(fn) {
    if (document.readyState !== 'loading') {
      try { fn(); } catch (e) { console.error('[optimize] ready error:', e); }
    } else {
      document.addEventListener('DOMContentLoaded', function onReady() {
        document.removeEventListener('DOMContentLoaded', onReady);
        try { fn(); } catch (e) { console.error('[optimize] ready error:', e); }
      });
    }
  }

  // 1) Imagens: lazy + decoding assíncrono + prioridade adequada
  function lazyLoadImages() {
    try {
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        // Heurística simples: primeira imagem visível ganha prioridade alta
        if (i === 0 && !img.hasAttribute('fetchpriority')) {
          img.setAttribute('fetchpriority', 'high');
        } else if (!img.hasAttribute('fetchpriority')) {
          img.setAttribute('fetchpriority', 'low');
        }
      }
    } catch (e) {
      console.warn('[optimize] lazyLoadImages:', e);
    }
  }

  // 2) Links externos: segurança com noopener/noreferrer
  function secureExternalLinks() {
    try {
      var links = document.querySelectorAll('a[target="_blank"]');
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        var rel = (a.getAttribute('rel') || '').toLowerCase();
        if (rel.indexOf('noopener') === -1) rel = (rel + ' noopener').trim();
        if (rel.indexOf('noreferrer') === -1) rel = (rel + ' noreferrer').trim();
        a.setAttribute('rel', rel);
      }
    } catch (e) {
      console.warn('[optimize] secureExternalLinks:', e);
    }
  }

  // 3) Preferência do usuário: reduzir movimento
  function applyReducedMotionClass() {
    try {
      var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq && mq.matches) {
        document.documentElement.classList.add('prm'); // você pode usar .prm no CSS para desativar animações
      }
    } catch (e) {
      console.warn('[optimize] applyReducedMotionClass:', e);
    }
  }

  // 4) Acessibilidade: reforçar atributos ARIA do menu hamburguer sem conflitar com main.js
  function enhanceNavbarToggle() {
    try {
      var toggle = document.querySelector('.navbar__toggle');
      var menu = document.querySelector('.navbar__menu');
      if (!toggle || !menu) return;

      // Garantir roles/aria
      if (toggle.getAttribute('role') !== 'button') toggle.setAttribute('role', 'button');
      if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
      if (!menu.hasAttribute('aria-hidden')) menu.setAttribute('aria-hidden', 'true');

      // Não duplica listeners: usamos um dataset de guarda
      if (toggle.dataset.optimizeBound === '1') return;
      toggle.dataset.optimizeBound = '1';

      toggle.addEventListener('click', function () {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
          menu.classList.add('navbar__menu--open');
          menu.setAttribute('aria-hidden', 'false');
        } else {
          menu.classList.remove('navbar__menu--open');
          menu.setAttribute('aria-hidden', 'true');
        }
      }, { passive: true });
    } catch (e) {
      console.warn('[optimize] enhanceNavbarToggle:', e);
    }
  }

  // 5) Teclado first: permitir fechar dropdown com Esc (se existir)
  function enhanceDropdownEsc() {
    try {
      var dropdowns = document.querySelectorAll('.dropdown');
      if (!dropdowns || dropdowns.length === 0) return;

      document.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Escape') return;
        for (var i = 0; i < dropdowns.length; i++) {
          var dd = dropdowns[i];
          var menu = dd.querySelector('.dropdown__menu');
          if (menu && menu.classList && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            var trigger = dd.querySelector('[aria-haspopup="true"]');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
          }
        }
      });
    } catch (e) {
      console.warn('[optimize] enhanceDropdownEsc:', e);
    }
  }

  // 6) SW opcional (só registra se existir /sw.js no deploy)
  function registerServiceWorkerIfAvailable() {
    try {
      if (!('serviceWorker' in navigator)) return;
      // Não quebra em dev/local caso não exista
      fetch('/sw.js', { method: 'HEAD' })
        .then(function (res) {
          if (res && (res.ok || res.status === 304)) {
            return navigator.serviceWorker.register('/sw.js');
          }
          return null;
        })
        .then(function (reg) {
          if (reg) {
            console.log('[optimize] SW registrado:', reg.scope);
          }
        })
        .catch(function () {
          // silencioso em ambiente sem SW
        });
    } catch (e) {
      console.warn('[optimize] registerServiceWorkerIfAvailable:', e);
    }
  }

  // 7) Passive listeners para rolagem/toque (melhora scroll em mobile)
  function setupPassiveScrollListeners() {
    try {
      window.addEventListener('scroll', function () { /* noop */ }, { passive: true });
      window.addEventListener('touchstart', function () { /* noop */ }, { passive: true });
      window.addEventListener('touchmove', function () { /* noop */ }, { passive: true });
    } catch (e) {
      // browsers antigos ignoram options; tudo bem
    }
  }

  // 8) Melhorias simples de foco para acessibilidade
  function ensureFocusOutline() {
    try {
      // Se o usuário navega por teclado (Tab), adiciona classe para mostrar outlines no CSS
      var hadKeyboardEvent = false;
      function onFirstTab(e) {
        if (e.key === 'Tab') {
          hadKeyboardEvent = true;
          document.documentElement.classList.add('using-keyboard');
          window.removeEventListener('keydown', onFirstTab, true);
          window.addEventListener('mousedown', onMouseDownOnce, true);
        }
      }
      function onMouseDownOnce() {
        if (hadKeyboardEvent) {
          document.documentElement.classList.remove('using-keyboard');
          hadKeyboardEvent = false;
          window.removeEventListener('mousedown', onMouseDownOnce, true);
          window.addEventListener('keydown', onFirstTab, true);
        }
      }
      window.addEventListener('keydown', onFirstTab, true);
    } catch (e) {
      console.warn('[optimize] ensureFocusOutline:', e);
    }
  }

  // 9) Expor API para debug (opcional)
  function exposeAPI() {
    try {
      window.Optimize = {
        lazyLoadImages: lazyLoadImages,
        secureExternalLinks: secureExternalLinks,
        applyReducedMotionClass: applyReducedMotionClass,
        enhanceNavbarToggle: enhanceNavbarToggle,
        enhanceDropdownEsc: enhanceDropdownEsc,
        registerServiceWorkerIfAvailable: registerServiceWorkerIfAvailable,
        setupPassiveScrollListeners: setupPassiveScrollListeners,
        ensureFocusOutline: ensureFocusOutline,
        runAll: runAll
      };
    } catch (e) {
      console.warn('[optimize] exposeAPI:', e);
    }
  }

  // 10) Rodar tudo
  function runAll() {
    lazyLoadImages();
    secureExternalLinks();
    applyReducedMotionClass();
    enhanceNavbarToggle();
    enhanceDropdownEsc();
    registerServiceWorkerIfAvailable();
    setupPassiveScrollListeners();
    ensureFocusOutline();
  }

  // Boot
  ready(function () {
    exposeAPI();
    runAll();
    console.log('[optimize] pronto ✅');
  });

})();