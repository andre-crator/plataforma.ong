---

🧭 README.md — Plataforma ONG

# 🌿 Plataforma ONG

## 🧩 Descrição Geral
---
  A *Plataforma ONG* é um site institucional desenvolvido como parte da disciplina *Desenvolvimento Front-End para Web, com o objetivo de aplicar os fundamentos de **HTML5, CSS3 e JavaScript* em um projeto completo e semântico.

  O site representa uma *organização sem fins lucrativos* dedicada ao acolhimento, restauração e reintegração social de pessoas em situação de vulnerabilidade, demonstrando boas práticas de acessibilidade, estruturação e integração multimídia.

---

## 🎯 Objetivos da Entrega I
- Aplicar *semântica HTML5* de forma correta e consistente.
- Criar *páginas interligadas* com conteúdo estruturado.
- Implementar *formulários interativos e validados nativamente*.
- Utilizar *recursos multimídia* (vídeo, áudio e galeria de imagens).
- Incluir *gráficos vetoriais (canvas)* e *integrações básicas com API (CEP)*.
- Garantir *acessibilidade, responsividade e organização de código.*

---

## 🗂 Estrutura de Pastas

plataforma-ong/
│
├── index.html                # Página inicial
├── sobre.html                # Informações institucionais (vídeo + áudio)
├── projetos.html             # Formulário de inscrição em projetos
├── voluntariado.html         # Cadastro e informações de voluntários
├── doacoes.html              # Página de doações + newsletter
├── transparencia.html        # Gráficos e indicadores sociais
├── contato.html              # Formulário institucional com anexos
├── blog.html                 # Notícias e atualizações
│
├── css/
│   ├── reset.css             # Reset global
│   ├── style.css             # Estilos principais
│   └── main.scss             # Fonte SCSS (não compilada no GitHub Pages)
│
├── js/
│   ├── main.js               # Scripts gerais (menus, interações)
│   ├── gallery.js            # Galeria de imagens (lazy loading)
│   ├── charts.js             # Gráficos de transparência (canvas)
│   └── cep.js                # Integração API ViaCEP (endereços automáticos)
│
├── assets/
│   ├── imagens/              # Galeria e imagens do site
│   ├── videos/               # Vídeo institucional e outros
│   │   ├── institucional.mp4
│   │   └── institucional.vtt
│   ├── audios/               # Depoimentos e trilhas sonoras
│   │   └── depoimento.mp3
│   └── fontes/               # Fontes web (opcional)
│
├── data/
│   ├── projetos.json         # Dados dos projetos (simulação)
│   └── voluntarios.json      # Banco local de voluntários
│
├── .github/
│   └── workflows/
│       └── pages.yml         # Configuração do GitHub Pages
│
├── .nojekyll                 # Desativa processamento Jekyll
└── README.md                 # Documentação e relatório técnico final

---

## 🧠 Funcionalidades Principais

| Tipo | Descrição |
|------|------------|
| 🏠 *Página Inicial* | Galeria de imagens responsiva e apresentação da ONG |
| 🧾 *Projetos* | Formulário de inscrição com validação e armazenamento simulado |
| 🙌 *Voluntariado* | Cadastro de voluntários com máscaras e validação de CPF/telefone |
| 💌 *Doações* | Formulário com máscara monetária e simulação de pagamento (PIX, Cartão, Boleto) |
| 📊 *Transparência* | Gráficos de pizza, linha e barra criados com <canvas> |
| 📧 *Contato* | Formulário com envio de mensagens e anexos |
| 📰 *Blog* | Lista de notícias com busca e paginação simples |
| 📹 *Sobre* | Integração de vídeo institucional e áudio de depoimento |

---

## 🔍 Tecnologias Utilizadas
- *HTML5* (semântica, formulários, multimídia)
- *CSS3* (reset, responsividade, organização modular)
- *JavaScript ES6* (interatividade, validações e integração com APIs)
- *Canvas API* (gráficos interativos)
- *Fetch API / ViaCEP* (busca automática de endereço)
- *Git + GitHub Pages* (versionamento e hospedagem)

---

## 🧾 Relatório de Validação W3C
- Todos os arquivos HTML validados com [W3C Validator](https://validator.w3.org/).
- Erros resolvidos:
  - Fechamento incorreto de tags <fieldset> e <form>.
  - Uso incorreto de id duplicado (corrigido).
  - Ajustes de acessibilidade (aria-label, alt, legend).

---

## 📈 Entrega Técnica

| Item | Situação |
|------|-----------|
| Estrutura semântica HTML5 | ✅ Concluído |
| Hierarquia de títulos | ✅ Correta |
| Formulários com validação | ✅ 4 implementados |
| Máscaras e validação extra | ✅ JS personalizado |
| Recursos multimídia (foto, vídeo, áudio) | ✅ Incluídos |
| Galeria de imagens responsiva | ✅ Implementada |
| Gráficos com <canvas> | ✅ 3 tipos funcionais |
| API pública (CEP) | ✅ Integração testada |
| Responsividade e acessibilidade | ✅ Testadas |
| Organização de pastas e comentários | ✅ Revisada |

---

## 👩‍💻 Autor
*André Borges Pereira Machado*  
Disciplina: Desenvolvimento Front-End para Web  
Professor(a): Kati Alves Bezerra/Vagner da Silva
Instituição: Cruzeiro do Sul Virtual  
Ano: 2025  

---

## 🚀 Publicação
> Projeto hospedado no *GitHub Pages*  
> 🔗 [https://andre-crator.github.io/plataforma.ong](https://andre-crator.github.io/plataforma.ong)


---