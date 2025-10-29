/* ======================================================
   ⚙ MAIN.JS
   Autor: André Borges Pereira Machado
   Projeto: Plataforma ONG (Entrega II – Estilização e Leiautes)
   Descrição: Script principal do site — ativa o menu responsivo,
   dropdowns, rolagem suave e outros comportamentos interativos.
====================================================== */

// ===== Navegação responsiva (menu hambúrguer) =====
(function(){
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (nav && toggle){
    toggle.addEventListener('click', ()=> {
      nav.classList.toggle('open');
    });
  }

  // ===== Dropdowns =====
  document.querySelectorAll('.dropdown .dropdown__toggle')?.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const dd = e.currentTarget.closest('.dropdown');
      dd?.classList.toggle('open');
    });
  });

  // Fecha dropdown ao clicar fora
  document.addEventListener('click', (e)=>{
    document.querySelectorAll('.dropdown.open').forEach(dd=>{
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
  });
})();

// ===== Toast helper =====
export function showToast(message = 'Ação realizada com sucesso!', timeout=3000){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), timeout);
}

// ===== Modal helpers =====
export function openModal(sel='.modal'){ document.querySelector(sel)?.classList.add('open') }
export function closeModal(sel='.modal'){ document.querySelector(sel)?.classList.remove('open') }

// ===== Acessibilidade: fechar modal com ESC =====
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal.open').forEach(m=> m.classList.remove('open'));
  }
});