// main.js - VERSÃO COM TEMA E CADASTRO INTEGRADOS

document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ ONG Skate SP - JavaScript inicializado');

    // Inicializa todos os componentes
    initializeAllComponents();
});

// === FUNÇÃO PRINCIPAL ===
function initializeAllComponents() {
    console.log('🔄 Inicializando componentes...');

    // Componentes que existem em TODAS as páginas (Global)
    initializeMobileMenu();
    initializeDropdownMenus();
    initializeHoverEffects();
    initializeThemeToggle(); // NOVO: Inicialização do Tema

    // Componentes específicos por página
    initializePageSpecificComponents();
}

// === TEMA CLARO/ESCURO ===
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.icon');

    // Função para aplicar o tema e atualizar o ícone
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Verificar preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Listener para alternar o tema ao clicar
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
}

// === MENU MOBILE ===
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuCheckbox = document.getElementById('menu-checkbox');

    if (menuToggle && menuCheckbox) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            menuCheckbox.checked = !menuCheckbox.checked;

            const nav = document.querySelector('nav');
            if (nav) {
                // Alternar a visibilidade baseada no estado do checkbox
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
    // Mantendo a lógica de hover existente
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

    // Adicionando a lógica de acessibilidade com foco (tab)
    const projetosDropdownLink = document.getElementById('projetos-dropdown-link');
    if (projetosDropdownLink) {
        projetosDropdownLink.addEventListener('focus', function () {
            this.setAttribute('aria-expanded', 'true');
        });
        projetosDropdownLink.addEventListener('blur', function () {
            setTimeout(() => {
                if (!this.parentElement.querySelector('.dropdown-menu:focus-within')) {
                    this.setAttribute('aria-expanded', 'false');
                }
            }, 100);
        });
    }
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

// === PÁGINA DE CADASTRO (LÓGICA AVANÇADA INTEGRADA) ===
function initializeCadastroPage() {
    console.log('📝 Inicializando página de cadastro com validação avançada');

    const formVoluntario = document.getElementById('form-voluntario');
    const formAluno = document.getElementById('form-aluno');
    const formDoador = document.getElementById('form-doador');

    // Mapeia os formulários e suas validações específicas
    const formsConfig = [
        { id: 'form-voluntario', element: formVoluntario, type: 'Voluntário', minAge: 18 },
        { id: 'form-aluno', element: formAluno, type: 'Aluno', minAge: 6 },
        { id: 'form-doador', element: formDoador, type: 'Doador', minAge: 0 }
    ];

    // Adiciona o listener de submissão para cada formulário
    formsConfig.forEach(f => {
        if (f.element) {
            f.element.addEventListener('submit', (e) => validarFormulario(e, f));
            // Adiciona listener para remover erro ao digitar
            f.element.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('input', () => {
                    removerErro(input);
                });
            });
        }
    });

    // === LÓGICA DE VALIDAÇÃO (Importada do antigo cadastro.js) ===
    function validarFormulario(event, config) {
        event.preventDefault();
        const form = config.element;
        let isValid = true;

        // Limpeza inicial
        form.querySelectorAll('.erro-feedback').forEach(el => el.remove());
        form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

        // Campos Comuns (Nome, Email, Telefone)
        const nomeInput = form.querySelector(`input[name="nome"]`);
        const emailInput = form.querySelector(`input[name="email"]`);
        const telefoneInput = form.querySelector(`input[name="telefone"]`);

        if (nomeInput && nomeInput.value.trim().length < 3) {
            exibirErro(nomeInput, 'O nome deve ter pelo menos 3 caracteres.');
            isValid = false;
        }

        if (emailInput && !validarEmailFormato(emailInput.value)) {
            exibirErro(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        if (telefoneInput && !validarTelefoneFormato(telefoneInput.value)) {
            // Esta validação pode ser mais simples se você confiar no 'pattern' do HTML,
            // mas mantive a checagem por segurança.
            isValid = false;
        }

        // Validações Específicas
        if (config.id === 'form-voluntario') {
            const cpfInput = document.getElementById('cpfVoluntario');
            const dataNascInput = document.getElementById('dataNascVoluntario');

            if (cpfInput && !validarCPF(cpfInput.value)) {
                exibirErro(cpfInput, 'CPF inválido ou no formato errado (000.000.000-00).');
                isValid = false;
            }

            if (dataNascInput && !validarIdadeMinima(dataNascInput.value, config.minAge)) {
                exibirErro(dataNascInput, `É necessário ter no mínimo ${config.minAge} anos para ser Voluntário.`);
                isValid = false;
            }
        }

        if (config.id === 'form-aluno') {
            const dataNascInput = document.getElementById('dataNascAluno');
            const nivelSelect = document.getElementById('nivelAluno');

            if (dataNascInput && !validarIdadeMinima(dataNascInput.value, config.minAge)) {
                exibirErro(dataNascInput, `É necessário ter no mínimo ${config.minAge} anos para ser Aluno.`);
                isValid = false;
            }

            if (nivelSelect && nivelSelect.value === '') {
                exibirErro(nivelSelect, 'Por favor, selecione seu Nível de Habilidade.');
                isValid = false;
            }
        }

        // Validação de Campos Obrigatórios (checa o que o HTML required não pegaria facilmente)
        form.querySelectorAll('[required]').forEach(input => {
            if ((input.type !== 'email' && input.value.trim() === '') || (input.tagName === 'SELECT' && input.value === '')) {
                exibirErro(input, 'Este campo é obrigatório.');
                isValid = false;
            }
        });


        // Se a validação passar
        if (isValid) {
            console.log(`✅ Formulário de ${config.type} validado! Simulação de envio...`);
            alert(`✅ Cadastro de ${config.type} enviado com sucesso! Entraremos em contato.`);
            form.reset();
        } else {
            console.log('❌ Erros de validação encontrados.');
            form.querySelector('.input-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // === FUNÇÕES DE UTILIDADE (HELPER FUNCTIONS) ===
    function validarEmailFormato(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarTelefoneFormato(telefone) {
        const limpo = telefone.replace(/\D/g, '');
        return limpo.length >= 10 && limpo.length <= 11;
    }

    // Função de Validação de CPF (Mantida a lógica anterior)
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        return resto === parseInt(cpf.substring(10, 11));
    }

    // Função de Validação de Idade Mínima
    function validarIdadeMinima(dataNascimento, idadeMinima) {
        if (!dataNascimento) return false;
        const hoje = new Date();
        const dataNasc = new Date(dataNascimento);
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        return idade >= idadeMinima;
    }


    // Funções de Feedback Visual
    function exibirErro(inputElement, mensagem) {
        if (inputElement.parentNode.querySelector('.erro-feedback')) return;

        const erroSpan = document.createElement('span');
        erroSpan.className = 'erro-feedback';
        erroSpan.textContent = mensagem;
        erroSpan.style.color = 'var(--primary)';
        erroSpan.style.fontSize = '0.85rem';
        erroSpan.style.marginTop = '5px';
        erroSpan.style.display = 'block';
        erroSpan.style.fontWeight = 'bold';

        inputElement.parentNode.insertBefore(erroSpan, inputElement.nextSibling);
        inputElement.classList.add('input-error');
    }

    function removerErro(inputElement) {
        inputElement.classList.remove('input-error');
        const erroExistente = inputElement.parentNode.querySelector('.erro-feedback');
        if (erroExistente) {
            erroExistente.remove();
        }
    }
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
    console.log('🎨 Efeitos hover inicializados');
}

// === UTILITÁRIOS ===
function showLoading() {
    console.log('⏳ Carregando...');
}

function hideLoading() {
    console.log('✅ Carregamento completo');
}