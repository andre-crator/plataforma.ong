
# 🌿 Plataforma ONG – Esperança Viva
![Banner do projeto](Plataforma.png)

Site institucional desenvolvido em *HTML5, **CSS3* e *JavaScript*, aplicando fundamentos de semântica, formulários interativos, multimídia e gráficos em \<canvas>.

## 🗂 Estrutura de Pastas

plataforma-ong/ │ ├── index.html                # Página inicial ├── sobre.html                # Informações institucionais (vídeo + áudio) ├── projetos.html             # Formulário de inscrição em projetos ├── voluntariado.html         # Cadastro e informações de voluntários ├── doacoes.html              # Página de doações + newsletter ├── transparencia.html        # Gráficos e indicadores sociais ├── contato.html              # Formulário institucional com anexos ├── blog.html                 # Notícias e atualizações │ ├── css/ │   ├── reset.css             # Reset global │   ├── style.css             # Estilos principais │   └── main.scss             # Fonte SCSS (não compilada no GitHub Pages) │ ├── js/ │   ├── main.js               # Scripts gerais (menus, interações) │   ├── gallery.js            # Galeria de imagens (lazy loading) │   ├── charts.js             # Gráficos de transparência (canvas) │   └── cep.js                # Integração API ViaCEP (endereços automáticos) │ ├── assets/ │   ├── imagens/              # Galeria e imagens do site │   ├── videos/               # Vídeo institucional e outros │   │   ├── institucional.mp4 │   │   └── institucional.vtt │   ├── audios/               # Depoimentos e trilhas sonoras │   │   └── depoimento.mp3 │   └── fontes/               # Fontes web (opcional) │ ├── data/ │   ├── projetos.json         # Dados dos projetos (simulação) │   └── voluntarios.json      # Banco local de voluntários │ ├── .github/ │   └── workflows/ │       └── pages.yml         # Configuração do GitHub Pages │ ├── .nojekyll                 # Desativa processamento Jekyll └── README.md                 # Documentação técnica final

## ✅ Requisitos Atendidos
- Estrutura semântica HTML5 completa  
- Hierarquia correta de títulos  
- Oito páginas interligadas e comentadas  
- Quatro formulários funcionais e validados  
- Máscaras e integração com API ViaCEP  
- Galeria de imagens responsiva com \<picture>/  
- Vídeo institucional e áudio de depoimentos  
- Três gráficos interativos com \<canvas>/  
- Acessibilidade e responsividade aplicadas


---

## ⚙ Execução Local  

⿡ Abra o projeto no *VS Code*  
⿢ Inicie o servidor com *Live Server*  
⿣ Acesse http://localhost:5500 para visualizar o site  

---

## 👨‍💻 Autor  

*André Borges Pereira Machado*  
Curso: Desenvolvimento Front-End para Web  
Instituição: Faculdade Cruzeiro do Sul  
Ano: 2025  
---

# 🌍 Plataforma ONG – Projeto Interativo e Acessível (Entrega IV)

## 📌 Informações Gerais
*Disciplina:* Desenvolvimento Front-End para Web  
*Aluno:* André Borges Pereira Machado  
*Turma:* ADS – Cruzeiro do Sul Virtual  
*Professor(a):* [Nome do Professor(a)]  
*Entrega:* IV – Versionamento, Acessibilidade e Deploy  
*Versão:* v1.2.0  

---

## 🎯 Objetivo do Projeto
Desenvolver uma *plataforma web institucional de ONG* com foco em *interatividade, acessibilidade e versionamento profissional*, simulando uma aplicação web real em ambiente de produção.  
Esta entrega consolida as práticas aprendidas durante o semestre, implementando:

- Single Page Application (SPA) com JavaScript modular;
- Sistema de templates e rotas dinâmicas;
- Validação e persistência de formulários;
- Acessibilidade WCAG 2.1 Nível AA;
- Versionamento GitFlow e releases semânticos;
- Deploy público via GitHub Pages.

---

## 🧭 Estrutura do Projeto

plataforma-ong/ ├── index.html ├── sobre.html ├── projetos.html ├── contato.html ├── blog.html │ ├── css/ │   ├── style.css │   ├── dark-mode.css │   └── high-contrast.css │ ├── js/ │   ├── main.js │   ├── spa.js │   ├── storage.js │   ├── validation.js │ ├── assets/ │   ├── img/ │   ├── icons/ │   └── logo.png │ └── README.md

*Organização modular:*
- main.js: controle de tema, menu e eventos;
- spa.js: sistema de rotas e carregamento dinâmico;
- storage.js: persistência via localStorage;
- validation.js: verificação e feedback de formulários;
- style.css: base visual e responsividade;
- dark-mode.css: modo escuro;
- high-contrast.css: versão de alto contraste acessível.

---

## 🧩 Funcionalidades Implementadas

| Recurso | Descrição |
|----------|------------|
| 🧠 *SPA Dinâmico* | Carrega o conteúdo das páginas sem recarregar o site, via spa.js. |
| 🧾 *Validação de Formulários* | Exibe mensagens amigáveis de erro/sucesso em tempo real. |
| 💾 *Armazenamento Local* | Campos de formulários são salvos automaticamente com localStorage. |
| 🌗 *Modo Escuro e Alto Contraste* | Alternância via botão acessível e persistência da preferência. |
| ♿ *Acessibilidade (WCAG 2.1 AA)* | Suporte completo a teclado, leitores de tela e contraste 4.5:1. |
| 🔄 *Responsividade Completa* | Design fluido adaptável a dispositivos móveis e desktop. |
| 🚀 *Versionamento GitFlow* | Branches main e develop, commits semânticos e releases (v1.2.0). |
| 🌐 *Deploy Público* | Projeto hospedado via *GitHub Pages*. |

---

## ♿ Acessibilidade (WCAG 2.1 – Nível AA)

### Estrutura e Navegação
- Uso semântico de elementos (header, main, section, footer);
- Navegação por *TAB* funcional em todos os elementos interativos;
- skip-link adicionado para salto direto ao conteúdo principal;
- Aria labels (aria-label, role) aplicadas conforme necessidade.

### Contraste e Visual
- *Contraste mínimo 4.5:1* garantido para textos;
- *Modo Escuro* e *Alto Contraste* ativados por toggle acessível;
- Preferência salva no localStorage do usuário.

### Leitores de Tela
- Imagens com alt descritivo;
- Links e botões possuem contexto claro.

---

## ⚙ Versionamento e Deploy

### Estrutura GitFlow
- main: versão estável e pronta para produção;
- develop: branch de desenvolvimento ativo;
- Commits seguem padrão *Conventional Commits* (feat:, fix:, docs:, refactor: etc.);
- Tags e releases seguem *versionamento semântico*:
  - v0.2-entrega-ii
  - safety-before-rollback-20251030-205526
  - v1.2.0 ← *versão final*

### Deploy
O site está publicado via *GitHub Pages*:  
🔗 [https://github.com/andrebrgesp/plataforma-ong](https://github.com/andrebrgesp/plataforma-ong)  
🌍 *Acesso direto:* [https://andrebrgesp.github.io/plataforma-ong/](https://andrebrgesp.github.io/plataforma-ong/)

---

## 🧪 Testes Realizados

| Teste | Resultado |
|--------|------------|
| Navegação SPA | ✅ Carrega seções sem recarregar a página |
| Validação de formulário | ✅ Exibe mensagens e impede envio incorreto |
| Modo Escuro/Contraste | ✅ Funciona e salva preferência |
| Acessibilidade (Lighthouse) | ✅ 100% de pontuação |
| Responsividade | ✅ OK em mobile, tablet e desktop |
| Teclado / Screen Reader | ✅ Compatível com NVDA e ChromeVox |

---

## 🧰 Ferramentas Utilizadas
- *HTML5* + *CSS3* + *JavaScript ES6*
- *Git* + *GitHub* (GitFlow, Tags, Releases)
- *Visual Studio Code*
- *PowerShell / Git Bash*
- *Lighthouse / Axe DevTools* para testes de acessibilidade
- *TinyPNG* para compressão de imagens

---

## 📜 Licença
Este projeto foi desenvolvido para fins acadêmicos e educativos, sob orientação da disciplina Desenvolvimento Front-End para Web.  
O código pode ser reutilizado com atribuição ao autor original.

---

## 👨‍💻 Autor
*André Borges Pereira Machado*  
📍 Petrópolis – RJ  
✉ [andrebrgesp@gmail.com](mailto:andrebrgesp@gmail.com)  
🌐 [GitHub: andrebrgesp](https://github.com/andrebrgesp)

---

🗓 *Versão Final:* v1.2.0  
📦 *Status:* ✅ Entregue e Estável


---

---

## 📄 Observação Final  

*🧾 Trabalho Acadêmico – Entrega I: Fundamentos e Estruturação*  
Projeto desenvolvido conforme os requisitos da disciplina, demonstrando domínio de *HTML5 semântico, **formulários, **recursos multimídia* e *gráficos interativos*.


---
