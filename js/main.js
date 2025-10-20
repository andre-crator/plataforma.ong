/* main.js — Script principal com interações básicas e componentes. Comentários leves ao longo do código. */

/* =========================================================================
  main.js
  - Carrega header/footer
  - Roteamento simples (se você já tinha, mantenha)
  - Máscaras e validações (CPF, telefone, CEP)
  - Lazy-loading de imagens (já via atributo)
=========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1) Inject de header/footer se existir
  includePartials();

  // 2) Aplica máscaras de CPF, telefone e CEP nos formulários
  applyInputMasks();

  // 3) Validação HTML5 - exibe mensagens amigáveis
  setupNiceValidationMessages();
});

/* --------------------------
   Carrega header/footer da pasta partials
--------------------------- */
function includePartials() {
  const headerEl = document.querySelector('header[data-include="header"]');
  const footerEl = document.querySelector('footer[data-include="footer"]');

  if (headerEl) {
    fetch('./partials/header.html')
      .then(res => res.text())
      .then(html => { headerEl.innerHTML = html; })
      .catch(() => { headerEl.innerHTML = '<div class="container"><p>Header</p></div>'; });
  }

  if (footerEl) {
    fetch('./partials/footer.html')
      .then(res => res.text())
      .then(html => { footerEl.innerHTML = html; })
      .catch(() => { footerEl.innerHTML = '<div class="container"><p>Footer</p></div>'; });
  }
}

/* --------------------------
   Máscaras simples (sem libs) — boas o suficiente pra Entrega I
   - Não substituem validação real no back-end, mas ajudam UX.
--------------------------- */
function applyInputMasks() {
  // CPF: 000.000.000-00
  document.querySelectorAll('input[data-mask="cpf"]').forEach(input => {
    input.setAttribute('maxlength', '14'); // 11 números + pontuação
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      // monta: xxx.xxx.xxx-xx
      let out = '';
      if (v.length > 9) out = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
      else if (v.length > 6) out = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
      else if (v.length > 3) out = v.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
      else out = v;
      input.value = out;
    });
  });

  // Telefone BR: (00) 00000-0000 (aceita 8 ou 9 dígitos no final)
  document.querySelectorAll('input[data-mask="phone"]').forEach(input => {
    input.setAttribute('maxlength', '15');
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        input.value = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      } else if (v.length > 6) {
        input.value = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (v.length > 2) {
        input.value = v.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
      } else {
        input.value = v;
      }
    });
  });

  // CEP: 00000-000
  document.querySelectorAll('input[data-mask="cep"]').forEach(input => {
    input.setAttribute('maxlength', '9');
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '');
      if (v.length > 8) v = v.slice(0, 8);
      if (v.length > 5) {
        input.value = v.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
      } else {
        input.value = v;
      }
    });
  });
}

/* --------------------------
   Validação amigável
--------------------------- */
function setupNiceValidationMessages() {
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        // força nativo mostrar bolha em cada inválido
        form.querySelectorAll(':invalid')[0]?.reportValidity();
      }
    });

    // feedback instantâneo ao digitar
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => el.setCustomValidity(''));
      el.addEventListener('invalid', () => {
        // Mensagens simples — pode customizar se quiser por 'name'
        if (el.validity.valueMissing) el.setCustomValidity('Este campo é obrigatório.');
        else if (el.validity.typeMismatch) el.setCustomValidity('Formato inválido.');
        else if (el.validity.patternMismatch) el.setCustomValidity('Formato inválido para este campo.');
        else el.setCustomValidity('');
      });
    });
  });
}