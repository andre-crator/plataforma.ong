/* =========================================================================
 * storage.js — Armazenamento local de campos (auto-save)
 * - Salva em localStorage conforme o usuário digita
 * - Restaura valores ao carregar a página/SPA
 * - Limpa storage do form ao enviar com sucesso
 * ========================================================================= */

(function () {
  const PREFIX = "eviva_form_"; // namespace para não colidir com outros projetos

  const fieldSelector = "input[name], textarea[name], select[name]";

  function keyFor(input) {
    // chave única por página + nome do campo
    const page = location.pathname.split("/").pop() || "index.html";
    return ${PREFIX}${page}_${input.name};
  }

  function restoreAll() {
    document.querySelectorAll(fieldSelector).forEach((el) => {
      try {
        const k = keyFor(el);
        const saved = localStorage.getItem(k);
        if (saved !== null) {
          if (el.type === "checkbox" || el.type === "radio") {
            el.checked = saved === "true";
          } else {
            el.value = saved;
          }
        }
      } catch {}
    });
  }

  function bindSave() {
    document.addEventListener("input", (e) => {
      const el = e.target;
      if (!el.matches(fieldSelector)) return;
      try {
        const k = keyFor(el);
        const v = (el.type === "checkbox" || el.type === "radio") ? String(el.checked) : el.value;
        localStorage.setItem(k, v);
      } catch {}
    });
  }

  function clearOnSubmit() {
    document.addEventListener("submit", (e) => {
      const form = e.target;
      if (!form.matches("form")) return;
      // Se passou pela validação (validation.js evita submit quando inválido)
      // então limpamos os campos deste form do localStorage
      const els = form.querySelectorAll(fieldSelector);
      els.forEach((el) => {
        try { localStorage.removeItem(keyFor(el)); } catch {}
      });
    });
  }

  // Inicializações
  document.addEventListener("DOMContentLoaded", () => {
    restoreAll();
    bindSave();
    clearOnSubmit();
  });

  // Após troca de conteúdo via SPA, restaurar novamente
  document.addEventListener("spa:content:replaced", () => {
    restoreAll();
  });
})();