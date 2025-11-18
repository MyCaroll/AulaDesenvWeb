ONG Skate SP - Plataforma Web Acessível

Sobre o Projeto

Site institucional desenvolvido para a ONG Skate SP, implementando as melhores práticas de desenvolvimento web moderno, acessibilidade e experiência do usuário. Este projeto foi criado como parte da disciplina de Desenvolvimento Web.

Status do Projeto: Concluído

Funcionalidades Principais

Sistema de Tema Claro/Escuro
- Alternância suave entre modos de cor
- Persistência de preferência do usuário
- Respeita a preferência do sistema operacional
- Transições animadas e suaves

Acessibilidade Total (WCAG 2.1 Nível AA)
- Navegação por teclado completa (Tab, Enter, Esc)
- Contraste 4.5:1 garantido em todos os elementos
- Atributos ARIA semânticos implementados
- Estrutura HTML semanticamente correta
- Focus indicators visíveis e customizados
- Suporte a leitores de tela

Design Responsivo
- Layout adaptável para mobile, tablet e desktop
- Menu hamburger otimizado para dispositivos móveis
- Grid system flexível
- Tipografia escalável

Performance Otimizada
- Arquivos CSS e JavaScript minificados
- Carregamento crítico otimizado
- Transições CSS hardware-accelerated
- Estrutura de assets organizada

Tecnologias Utilizadas

- HTML5 - Estrutura semântica e acessível
- CSS3 - Estilização com Variáveis CSS e Flexbox/Grid
- JavaScript - Interatividade e manipulação de tema
- Git - Controle de versão com GitFlow
- GitHub Pages - Deploy e hospedagem

Design System

Cores (CSS Custom Properties)
:root {
  --primary: #ff6600;
  --secondary: #4b0082;
  --bg-color: #f2f2f2;
  --text-color: #222;
  --card-bg: #fff;
}

Tipografia
- Títulos: 'Rock Salt', cursive
- Corpo: 'Roboto', sans-serif
- Hierarquia: Escala modular responsiva

Estrutura do Projeto

AulaDesenvWeb/
├── index.html
├── projeto.html
├── cadastro.html
├── AulaDesenvWebCSS/
│   ├── style.css
│   └── min.css
├── AulaDesenvWebJS/
│   ├── script.js
│   └── min.js
├── README.md
└── .gitignore

Recursos de Acessibilidade Implementados

Navegação
- Skip links para conteúdo principal
- Navegação por teclado completa
- Indicadores de foco visíveis
- Atributos aria-* semânticos

Contraste e Legibilidade
- Contraste 4.5:1 mínimo garantido
- Modo alto contraste (tema escuro)
- Tamanho de fonte escalável
- Espaçamento de texto adequado

Semântica
- Estrutura de cabeçalhos hierárquica
- Labels descritivos para todos os controles
- Textos alternativos para elementos visuais
- Landmarks ARIA apropriados

Como Executar o Projeto

Opção 1: GitHub Pages (Recomendado)
1. Acesse: https://mycaroll.github.io/AulaDesenvWeb/
2. Navegue normalmente pelo site

Opção 2: Execução Local
# Clone o repositório
git clone https://github.com/MyCaroll/AulaDesenvWeb.git
# Acesse a pasta do projeto
cd AulaDesenvWeb
# Abra o arquivo principal
open index.html

Navegação por Teclado

- Tab - Navegar entre elementos
- Shift + Tab - Navegar reversamente
- Enter - Ativar botões/links
- Espaço - Alternar checkboxes
- Esc - Fechar modais/dropdowns

Testes Realizados

Ferramentas de Validação
- Lighthouse: Performance, Acessibilidade, SEO
- WAVE: Avaliação de acessibilidade web
- Keyboard Navigation: Teste manual completo
- Color Contrast Analyzer: Verificação de contraste

Navegadores Testados
- Google Chrome (116+)
- Mozilla Firefox (115+)
- Microsoft Edge (116+)
- Safari (15+)

Métricas de Performance

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Tempo de Carregamento: < 2s
- Arquivos CSS: 2 (desenvolvimento + produção)
- Arquivos JS: 2 (desenvolvimento + produção)

Desenvolvimento

Estratégia de Versionamento
- GitFlow implementado
- Commits semânticos seguindo Conventional Commits
- Branches: main (produção) e develop (desenvolvimento)
- Tags para versionamento semântico

Padrão de Commits
feat: nova funcionalidade
fix: correção de bugs
docs: documentação
style: formatação
refactor: refatoração
test: testes

Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Desenvolvimento Web.

Contato

Desenvolvedora: MyCaroll
Repositório: https://github.com/MyCaroll/AulaDesenvWeb


Autoria
Desenvolvido por: Carolina Fávero
Curso: Análise e Desenvolvimento de Sistemas (ADS) — 2025



   

