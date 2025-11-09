Projeto ONG Skate SP — Interatividade com JavaScript
Introdução
Esta terceira etapa do projeto teve como objetivo implementar funcionalidades interativas e dinâmicas ao site da ONG Skate SP, desenvolvido na disciplina de Desenvolvimento Web, no curso de Análise e Desenvolvimento de Sistemas (ADS). Após a estruturação em HTML5 e estilização com CSS3, foi criada uma nova branch dedicada exclusivamente ao JavaScript, onde foram desenvolvidos sistemas de Single Page Application (SPA), validação de formulários e interações dinâmicas.

Durante o desenvolvimento, foram aplicados conceitos avançados de JavaScript moderno, incluindo manipulação do DOM, eventos, armazenamento local, classes ES6 e modularização de código. Esta etapa permitiu transformar o site estático em uma aplicação web dinâmica e responsiva.

Estrutura do Projeto
Na branch de JavaScript, a organização dos arquivos manteve a estrutura anterior com a adição da pasta dedicada aos scripts:


AulaDesenvWebJS/
│
├── main.js          # Inicialização e componentes globais
├── projeto.js       # Funcionalidades específicas da página de projetos
├── validation.js    # Sistema de validação de formulários
├── templates.js     # Gerenciamento de templates dinâmicos
└── spa.js          # Sistema de Single Page Application

AulaDesenvWebCSS/
│
├── style.css
├── index.css
├── cadastro.css
├── projeto.css
└── components.css

AulaDesenvWebHTML/
│
├── index.html
├── projeto.html
└── cadastro.html


Funcionalidades Implementadas
Sistema SPA (Single Page Application)
Navegação sem recarregamento entre seções das páginas
Histórico de navegação com atualização de URL
Transições suaves entre conteúdos
Carregamento dinâmico de templates

Validação de Formulários
Validação em tempo real com feedback visual
Verificação de campos obrigatórios e formatos específicos
Mensagens de erro personalizadas para cada tipo de campo
Prevenção de envio com dados inválidos

Interações Dinâmicas
Menu mobile responsivo com toggle functionality
Dropdown menus com hover effects
Contador de visitas usando localStorage
Animações de cards e elementos interativos
Validação de e-mail e telefone em formulários

Tecnologias e Conceitos Aplicados
JavaScript ES6+
Classes e modularização para organização do código
Manipulação do DOM com querySelector e eventos
Arrow functions e template literals
Local Storage para persistência de dados
Promises e async/await para operações assíncronas

Arquitetura de Software
Separação de responsabilidades por funcionalidade
Código reutilizável com classes especializadas
Manipulação de eventos de forma eficiente
Validação de dados no client-side

Como Executar o Projeto
Navegue até a branch de JavaScript no repositório
Abra o projeto no VS Code ou editor preferido
Execute com Live Server no arquivo index.html

Teste as funcionalidades:
Navegue entre páginas sem recarregar (SPA)
Preencha formulários com validação
Interaja com menus dropdown
Verifique o contador de visitas no console

Aprendizados Desenvolvidos
Habilidades Técnicas
Implementação de SPA sem frameworks externos
Validação robusta de formulários complexos
Manipulação avançada do DOM e eventos
Armazenamento local de dados do usuário
Organização modular de código JavaScript

Boas Práticas
Código semântico e bem documentado
Tratamento de erros e validações
Performance na manipulação do DOM
Experiência do usuário com feedback visual
Manutenibilidade com estrutura clara


Autoria
Desenvolvido por: Carolina Fávero
Curso: Análise e Desenvolvimento de Sistemas (ADS) — 2025



   

