// spa.js - SISTEMA SINGLE PAGE APPLICATION
// CÓDIGO DE INICIALIZAÇÃO PARA GARANTIR QUE A PÁGINA PADRÃO APAREÇA E O DESTAQUE
document.addEventListener('DOMContentLoaded', () => {
    // 1. Garante que todas as páginas estejam ocultas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 2. Força a exibição da página principal #projetos
    const paginaPrincipal = document.getElementById('projetos');
    if (paginaPrincipal) {
        paginaPrincipal.classList.add('active');
    }

    // 3. Garante que o link 'Projetos' seja destacado (corrigido o loop forEach)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('data-page') === 'projetos') {
            link.classList.add('nav-active');
        }
    });

    console.log('SPA Projetos: Inicialização Forçada para #projetos');
});
// =========================================================================

// SPA SIMPLES (CÓDIGO EXISTENTE - sem alterações necessárias, mas verifique o fechamento)
document.querySelectorAll('.nav-link').forEach(link => {
    // ...
    // Seu código existente aqui
    // ...
});

class SPARouter {
    constructor() {
        this.routes = {
            '/': 'home-content',
            '/index.html': 'home-content',
            '/cadastro': 'cadastro-content',
            '/projetos': 'projetos-content',
            '/contato': 'contato-content'
        };
        this.init();
    }

    init() {
        console.log('🔄 SPA Inicializado');

        // Intercepta clicks em links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });

        // Gerencia histórico do navegador
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });

        // Carrega página inicial
        this.loadPage(window.location.pathname);
    }

    navigate(path) {
        console.log('🧭 Navegando para:', path);
        window.history.pushState({}, '', path);
        this.loadPage(path);
    }

    async loadPage(path) {
        const page = this.routes[path] || 'home-content';

        try {
            // Mostra loading
            this.showLoading();

            // Simula carregamento (em projeto real seria fetch())
            setTimeout(() => {
                this.renderPage(page);
                this.hideLoading();

                // Re-inicializa componentes da nova página
                if (typeof initializePageSpecificComponents === 'function') {
                    initializePageSpecificComponents();
                }
            }, 300);

        } catch (error) {
            console.error('❌ Erro ao carregar página:', error);
            this.hideLoading();
        }
    }

    renderPage(pageId) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error('❌ Elemento #main-content não encontrado');
            return;
        }

        // Esconde todos os conteúdos
        document.querySelectorAll('[data-page]').forEach(section => {
            section.style.display = 'none';
        });

        // Mostra apenas o conteúdo da página atual
        const currentPage = document.getElementById(pageId);
        if (currentPage) {
            currentPage.style.display = 'block';
            currentPage.classList.add('fade-in');

            // Remove animação após execução
            setTimeout(() => {
                currentPage.classList.remove('fade-in');
            }, 500);

            console.log('✅ Página carregada:', pageId);
        } else {
            console.error('❌ Página não encontrada:', pageId);
            mainContent.innerHTML = `
                <div class="error-page">
                    <h2>Página não encontrada</h2>
                    <p>A página solicitada não existe.</p>
                    <button onclick="spaRouter.navigate('/')">Voltar para Home</button>
                </div>
            `;
        }
    }

    showLoading() {
        let loader = document.getElementById('spa-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'spa-loader';
            loader.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Carregando...</p>
                </div>
            `;
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
    }

    hideLoading() {
        const loader = document.getElementById('spa-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// CSS para o loader (adicione no seu CSS)
const spaStyles = `
    #spa-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        flex-direction: column;
    }
    
    .loading-spinner .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff6600;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .error-page {
        text-align: center;
        padding: 50px 20px;
    }
    
    .error-page button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }
`;

// Adiciona os estilos do SPA
const styleSheet = document.createElement('style');
styleSheet.textContent = spaStyles;
document.head.appendChild(styleSheet);

// Variável global para acesso externo
let spaRouter;

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    spaRouter = new SPARouter();
});