// @ts-nocheck
// js/validation.js
// Validação acessível, modular, sem TypeScript e sem dependências.

// IIFE que cria Validation no escopo global (window.Validation)
(function () {
  'use strict';

  // --- Helpers de UI ---
  function ensureErrorEl(input) {
    var parent = input.parentElement;
    var msgEl = parent ? parent.querySelector('.field-error') : null;
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'field-error';
      if (parent) parent.appendChild(msgEl);
    }
    return msgEl;
  }

  function setError(input, message) {
    var msgEl = ensureErrorEl(input);
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    msgEl.textContent = message;
    msgEl.setAttribute('role', 'alert');
  }

  function clearError(input) {
    var parent = input.parentElement;
    var msgEl = parent ? parent.querySelector('.field-error') : null;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    if (msgEl) {
      msgEl.textContent = '';
      msgEl.removeAttribute('role');
    }
  }

  // --- Validadores básicos ---
  function isEmail(v) {
    v = String(v || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function isMinLen(v, n) {
    v = String(v || '').trim();
    return v.length >= Number(n);
  }

  function isCEP(v) {
    v = String(v || '').trim();
    return /^\d{5}-?\d{3}$/.test(v);
  }

  function isPhoneBR(v) {
    v = String(v || '').trim();
    return /^(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9?\d{4})-?\d{4}$/.test(v);
  }

  function selectHasValue(el) {
    return el && el.tagName === 'SELECT' && el.value && el.value.trim() !== '';
  }

  function checkboxChecked(el) {
    return el && el.type === 'checkbox' && el.checked === true;
  }

  // --- Mensagens padrão ---
  var defaultMessages = {
    required: 'Este campo é obrigatório.',
    email: 'Informe um e-mail válido.',
    minlen: function (n) { return 'Digite pelo menos ' + n + ' caracteres.'; },
    cep: 'CEP inválido. Use 00000-000.',
    phoneBR: 'Telefone inválido. Ex.: (21) 99999-0000',
    selectRequired: 'Selecione uma opção.',
    checkboxRequired: 'Marque esta opção para continuar.'
  };

  // --- Executa regras em um input ---
  function runRulesOnInput(input, rules) {
    var value = input.value;
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];

      if (rule.name === 'required') {
        if (
          (input.type === 'checkbox' && !checkboxChecked(input)) ||
          (input.tagName === 'SELECT' && !selectHasValue(input)) ||
          String(value || '').trim() === ''
        ) {
          setError(input, rule.message || defaultMessages.required);
          return false;
        }
      } else if (rule.name === 'email') {
        if (String(value || '').trim() !== '' && !isEmail(value)) {
          setError(input, rule.message || defaultMessages.email);
          return false;
        }
      } else if (rule.name === 'minlen') {
        var n = Number(rule.param || 3);
        if (!isMinLen(value, n)) {
          var msg = rule.message || defaultMessages.minlen(n);
          setError(input, msg);
          return false;
        }
      } else if (rule.name === 'cep') {
        if (String(value || '').trim() !== '' && !isCEP(value)) {
          setError(input, rule.message || defaultMessages.cep);
          return false;
        }
      } else if (rule.name === 'phoneBR') {
        if (String(value || '').trim() !== '' && !isPhoneBR(value)) {
          setError(input, rule.message || defaultMessages.phoneBR);
          return false;
        }
      } else if (rule.name === 'selectRequired') {
        if (!selectHasValue(input)) {
          setError(input, rule.message || defaultMessages.selectRequired);
          return false;
        }
      } else if (rule.name === 'checkboxRequired') {
        if (!checkboxChecked(input)) {
          setError(input, rule.message || defaultMessages.checkboxRequired);
          return false;
        }
      }
    }
    clearError(input);
    return true;
  }

  // --- Configuração por formulário (ajuste os seletores para os seus forms) ---
  var formsConfig = [
    {
      // Contato institucional
      selector: '#form-contato, form[action*="contato"]',
      fields: [
        { selector: 'input[name="nome"]', rules: [ { name: 'required' }, { name: 'minlen', param: 3 } ] },
        { selector: 'input[name="email"]', rules: [ { name: 'required' }, { name: 'email' } ] },
        { selector: 'input[name="telefone"]', rules: [ { name: 'phoneBR' } ] },
        { selector: 'textarea[name="mensagem"]', rules: [ { name: 'required' }, { name: 'minlen', param: 10 } ] },
        { selector: 'input[name="aceiteLGPD"]', rules: [ { name: 'checkboxRequired' } ] }
      ]
    },
    {
      // Inscrição de projetos
      selector: '#form-projetos, form[action*="inscricao-projeto"]',
      fields: [
        { selector: 'input[name="nomeCompleto"]', rules: [ { name: 'required' }, { name: 'minlen', param: 3 } ] },
        { selector: 'input[name="email"]', rules: [ { name: 'required' }, { name: 'email' } ] },
        { selector: 'input[name="cep"]', rules: [ { name: 'cep' } ] },
        { selector: 'select[name="area"]', rules: [ { name: 'selectRequired' } ] }
      ]
    },
    {
      // Newsletter / doações (exemplo)
      selector: '#form-newsletter, form[action*="newsletter"]',
      fields: [
        { selector: 'input[name="email"]', rules: [ { name: 'required' }, { name: 'email' } ] }
      ]
    }
  ];

  // --- "Pluga" listeners por formulário ---
  function attachToForm(form, config) {
    var fields = [];
    for (var i = 0; i < config.fields.length; i++) {
      var f = config.fields[i];
      var el = form.querySelector(f.selector);
      if (el) fields.push({ el: el, rules: f.rules });
    }

    // Validação em tempo real
    for (var j = 0; j < fields.length; j++) {
      (function (entry) {
        function handler() { runRulesOnInput(entry.el, entry.rules); }
        entry.el.addEventListener('blur', handler);
        entry.el.addEventListener('input', function () {
          if (entry.el.classList.contains('is-invalid')) handler();
        });
        if (entry.el.tagName === 'SELECT' || entry.el.type === 'checkbox') {
          entry.el.addEventListener('change', handler);
        }
      })(fields[j]);
    }

    // Submit final
    form.addEventListener('submit', function (e) {
      var ok = true;
      for (var k = 0; k < fields.length; k++) {
        var entry = fields[k];
        var valid = runRulesOnInput(entry.el, entry.rules);
        if (!valid && ok) {
          ok = false;
          entry.el.focus();
        }
      }
      if (!ok) e.preventDefault();
    });
  }

  // --- Inicialização ---
  function init() {
    for (var i = 0; i < formsConfig.length; i++) {
      var cfg = formsConfig[i];
      var list = document.querySelectorAll(cfg.selector);
      for (var j = 0; j < list.length; j++) {
        attachToForm(list[j], cfg);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expõe publicamente
  window.Validation = { init: init };
})();