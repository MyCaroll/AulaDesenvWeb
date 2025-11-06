// main.js - VERSÃO CORRIGIDA SEM SPA

document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ ONG Skate SP - JavaScript inicializado');

    // Inicializa todos os componentes
    initializeAllComponents();
});

// === FUNÇÃO PRINCIPAL ===
function initializeAllComponents() {
    console.log('🔄 Inicializando componentes...');

    // Componentes que existem em TODAS as páginas
    initializeMobileMenu();
    initializeDropdownMenus();
    initializeHoverEffects();

    // Componentes específicos por página
    initializePageSpecificComponents();
}

// === MENU MOBILE ===
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuCheckbox = document.getElementById('menu-checkbox');

    if (menuToggle && menuCheckbox) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            menuCheckbox.checked = !menuCheckbox.checked;

            // Atualiza visualmente o menu
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.display = menuCheckbox.checked ? 'block' : 'none';
            }
        });

        // Fecha menu ao clicar em um link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function () {
                menuCheckbox.checked = false;
                const nav = document.querySelector('nav');
                if (nav) nav.style.display = 'none';
            });
        });
    }
}

// === DROPDOWN MENUS ===
function initializeDropdownMenus() {
    const dropdownItems = document.querySelectorAll('.nav-item');

    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) dropdown.style.display = 'block';
        });

        item.addEventListener('mouseleave', function () {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) dropdown.style.display = 'none';
        });
    });
}

// === COMPONENTES ESPECÍFICOS POR PÁGINA ===
function initializePageSpecificComponents() {
    const bodyClass = document.body.className;

    if (bodyClass.includes('pagina-cadastro')) {
        initializeCadastroPage();
    } else if (bodyClass.includes('pagina-projetos')) {
        initializeProjetoPage();
    } else {
        initializeHomePage();
    }
}

// === PÁGINA DE CADASTRO ===
function initializeCadastroPage() {
    console.log('📝 Inicializando página de cadastro');

    // Validação básica de formulários
    const forms = ['form-voluntario', 'form-aluno', 'form-doador'];

    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Formulário enviado com sucesso!');
                this.reset();
            });
        }
    });
}

// === PÁGINA DE PROJETOS ===
function initializeProjetoPage() {
    console.log('🛹 Inicializando página de projetos');
    // Efeitos específicos podem ser adicionados aqui
}

// === PÁGINA INICIAL ===
function initializeHomePage() {
    console.log('🏠 Inicializando página inicial');
    // Efeitos específicos podem ser adicionados aqui
}

// === EFEITOS HOVER ===
function initializeHoverEffects() {
    // Os efeitos já estão no CSS, esta função é para futuras expansões
    console.log('🎨 Efeitos hover inicializados');
}

// === UTILITÁRIOS ===
function showLoading() {
    console.log('⏳ Carregando...');
}

function hideLoading() {
    console.log('✅ Carregamento completo');
}