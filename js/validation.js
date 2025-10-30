/* =========================================================================
 * validation.js — Validação de formulários
 * - Regras genéricas (required, e-mail, min/max length)
 * - Regras específicas: CPF, CEP, telefone (básicas)
 * - Realce visual (classes .is-invalid / .is-valid) + mensagens
 * - Bloqueia envio se houver erros e foca no primeiro inválido
 * ========================================================================= */

(function () {
  // ---- Helpers simples de validação ----
  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const onlyDigits = (v) => (v || "").replace(/\D+/g, "");
  const isCPF = (v) => {
    // Validação básica (tamanho e repetição) — suficiente para front
    const d = onlyDigits(v);
    if (d.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(d)) return false;
    // Cálculo DV simples
    const dv = (nums, factor) => {
      let t = 0;
      for (let i = 0; i < nums.length; i++) t += parseInt(nums[i], 10) * (factor - i);
      const r = t % 11;
      return r < 2 ? 0 : 11 - r;
    };
    const dig1 = dv(d.slice(0, 9), 10);
    const dig2 = dv(d.slice(0, 10), 11);
    return dig1 === parseInt(d[9], 10) && dig2 === parseInt(d[10], 10);
  };
  const isCEP = (v) => onlyDigits(v).length === 8;
  const isPhone = (v) => {
    const d = onlyDigits(v);
    return d.length >= 10 && d.length <= 11;
  };

  // ---- Render de mensagens ----
  function showError(input, msg) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    let box = input.parentElement.querySelector(".field-error");
    if (!box) {
      box = document.createElement("small");
      box.className = "field-error";
      input.parentElement.appendChild(box);
    }
    box.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    const box = input.parentElement.querySelector(".field-error");
    if (box) box.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  // ---- Validação por regras declarativas (data-*) ----
  function validateInput(input) {
    const v = (input.value || "").trim();
    const label = input.getAttribute("aria-label") || input.name || "Campo";

    if (input.hasAttribute("required") && !v) {
      showError(input, ${label}: preenchimento obrigatório.);
      return false;
    }

    // Tipos comuns
    if (input.type === "email" && v && !isEmail(v)) {
      showError(input, ${label}: e-mail inválido.);
      return false;
    }

    // Regras customizadas
    const rule = input.dataset.validate; // ex.: data-validate="cpf|cep|phone"
    if (rule && v) {
      const parts = rule.split("|");
      for (const r of parts) {
        if (r === "cpf" && !isCPF(v)) {
          showError(input, ${label}: CPF inválido.);
          return false;
        }
        if (r === "cep" && !isCEP(v)) {
          showError(input, ${label}: CEP inválido (formato 00000-000).);
          return false;
        }
        if (r === "phone" && !isPhone(v)) {
          showError(input, ${label}: telefone inválido.);
          return false;
        }
      }
    }

    // Tamanhos mínimos/máximos (opcionais)
    const min = input.getAttribute("minlength");
    if (min && v && v.length < parseInt(min, 10)) {
      showError(input, ${label}: mínimo de ${min} caracteres.);
      return false;
    }
    const max = input.getAttribute("maxlength");
    if (max && v && v.length > parseInt(max, 10)) {
      showError(input, ${label}: máximo de ${max} caracteres.);
      return false;
    }

    clearError(input);
    return true;
  }

  // ---- Bind global de eventos ----
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.matches("input, textarea")) {
      // Validação em tempo real (leve)
      if (t.hasAttribute("required") || t.dataset.validate) {
        validateInput(t);
      }
    }
  });

  document.addEventListener("blur", (e) => {
    const t = e.target;
    if (t.matches("input, textarea")) {
      if (t.hasAttribute("required") || t.dataset.validate) {
        validateInput(t);
      }
    }
  }, true);

  // ---- Intercepta SUBMIT de qualquer <form> ----
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!form.matches("form")) return;

    const fields = form.querySelectorAll("input, textarea, select");
    let firstInvalid = null;
    let ok = true;

    fields.forEach((el) => {
      // valida apenas os que têm regra (required ou data-validate ou tipos comuns)
      const needs =
        el.hasAttribute("required") ||
        el.dataset.validate ||
        ["email"].includes(el.type);
      if (needs) {
        const pass = validateInput(el);
        if (!pass) {
          ok = false;
          if (!firstInvalid) firstInvalid = el;
        }
      }
    });

    if (!ok) {
      e.preventDefault();
      firstInvalid?.focus();
      alert("⚠ Revise os campos destacados antes de enviar.");
    }
  });

  // Re-binds após navegação SPA
  document.addEventListener("spa:content:replaced", () => {
    // Nada extra a fazer aqui porque usamos delegação de eventos (document)
  });
})();