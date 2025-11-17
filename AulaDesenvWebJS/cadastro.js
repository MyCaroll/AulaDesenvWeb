// AulaDesenvWebJS/cadastro.js - Validação e Lógica da Página de Cadastro

document.addEventListener('DOMContentLoaded', function () {
    console.log('📝 Lógica de validação do Cadastro carregada!');

    // Seleciona todos os formulários da página
    const formVoluntario = document.getElementById('form-voluntario');
    const formAluno = document.getElementById('form-aluno');
    const formDoador = document.getElementById('form-doador');

    // Mapeia os formulários e suas validações específicas
    const forms = [
        { id: 'form-voluntario', element: formVoluntario, type: 'Voluntário', minAge: 18 },
        { id: 'form-aluno', element: formAluno, type: 'Aluno', minAge: 6 },
        { id: 'form-doador', element: formDoador, type: 'Doador', minAge: 0 } // Doador não tem restrição de idade
    ];


    // Adiciona o listener de submissão para cada formulário
    forms.forEach(f => {
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


    // =======================================================
    // FUNÇÃO PRINCIPAL DE VALIDAÇÃO
    // =======================================================

    function validarFormulario(event, config) {
        event.preventDefault();

        const form = config.element;
        let isValid = true;

        // Remove todos os erros anteriores para começar limpo
        form.querySelectorAll('.erro-feedback').forEach(el => el.remove());
        form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

        // 1. Validações Comuns (presentes em todos os formulários)
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
            exibirErro(telefoneInput, 'O telefone deve estar no formato (99) 99999-9999.');
            isValid = false;
        }

        // 2. Validações Específicas

        if (config.id === 'form-voluntario') {
            const cpfInput = document.getElementById('cpfVoluntario');
            const dataNascInput = document.getElementById('dataNascVoluntario');

            if (cpfInput && !validarCPF(cpfInput.value)) {
                exibirErro(cpfInput, 'CPF inválido. Use o formato 000.000.000-00.');
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

        // 3. Validação de Campos Obrigatórios Padrão (Fallback)
        // Isso checa se algum campo 'required' que o JS ignorou está vazio.
        form.querySelectorAll('[required]').forEach(input => {
            if (input.type === 'text' && input.value.trim() === '') {
                exibirErro(input, 'Este campo é obrigatório.');
                isValid = false;
            } else if (input.type === 'email' && input.value.trim() === '') {
                exibirErro(input, 'Este campo é obrigatório.');
                isValid = false;
            } else if (input.tagName === 'SELECT' && input.value === '') {
                exibirErro(input, 'Este campo é obrigatório.');
                isValid = false;
            }
            // Adicione mais tipos se necessário (ex: password, checkbox, etc.)
        });


        // 4. Se tudo estiver OK, simula o envio
        if (isValid) {
            console.log(`✅ Formulário de ${config.type} validado! Simulação de envio...`);
            // Aqui você faria o FETCH ou AJAX real para enviar os dados
            alert(`✅ Cadastro de ${config.type} enviado com sucesso! Entraremos em contato.`);
            form.reset();
        } else {
            console.log('❌ Erros de validação encontrados.');
            // Rola para o primeiro erro se houver
            form.querySelector('.input-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }


    // =======================================================
    // FUNÇÕES DE UTILIDADE (HELPER FUNCTIONS)
    // =======================================================

    // Valida formato de e-mail (Regex simples)
    function validarEmailFormato(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Valida formato de telefone (ajustável ao seu pattern no HTML)
    function validarTelefoneFormato(telefone) {
        // Remove caracteres não-numéricos para checagem simples
        const limpo = telefone.replace(/\D/g, '');
        return limpo.length >= 10 && limpo.length <= 11; // Mínimo 10 (c/ DDD) e máximo 11 (c/ 9 extra)
    }

    // Valida CPF (implementação básica)
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não-numéricos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica 11 dígitos e CPFs repetidos
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

    // Valida idade mínima
    function validarIdadeMinima(dataNascimento, idadeMinima) {
        if (!dataNascimento) return false;
        const hoje = new Date();
        const dataNasc = new Date(dataNascimento);
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();

        // Ajusta a idade se ainda não fez aniversário este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        return idade >= idadeMinima;
    }


    // Cria e exibe uma mensagem de erro abaixo do campo
    function exibirErro(inputElement, mensagem) {
        // Verifica se o erro já existe para evitar duplicação
        if (inputElement.parentNode.querySelector('.erro-feedback')) return;

        const erroSpan = document.createElement('span');
        erroSpan.className = 'erro-feedback';
        erroSpan.textContent = mensagem;

        // Estilização direta, mas é ideal que isso esteja no CSS
        erroSpan.style.color = 'var(--primary)';
        erroSpan.style.fontSize = '0.85rem';
        erroSpan.style.marginTop = '5px';
        erroSpan.style.display = 'block';
        erroSpan.style.fontWeight = 'bold';

        // Insere a mensagem logo após o campo de input
        inputElement.parentNode.insertBefore(erroSpan, inputElement.nextSibling);
        inputElement.classList.add('input-error'); // Classe para estilizar a borda do input
    }

    // Remove a mensagem de erro e a classe de erro do input
    function removerErro(inputElement) {
        inputElement.classList.remove('input-error');
        const erroExistente = inputElement.parentNode.querySelector('.erro-feedback');
        if (erroExistente) {
            erroExistente.remove();
        }
    }
});