export function attachFormValidator(formId) {
    // Aumente o timeout para garantir que o CSS separado carregou
    setTimeout(() => {
        const form = document.getElementById(formId);

        if (!form) {
            console.error(`❌ CRÍTICO: Formulário "${formId}" não encontrado após CSS carregar`);

            // Tenta encontrar novamente após mais tempo
            setTimeout(() => {
                const formRetry = document.getElementById(formId);
                if (formRetry) {
                    console.log(`✅ Formulário ${formId} encontrado na segunda tentativa`);
                    initializeFormValidation(formRetry, formId);
                }
            }, 500);
            return;
        }

        initializeFormValidation(form, formId);
    }, 300);
}

function initializeFormValidation(form, formId) {
    console.log(`🎯 Inicializando validação para: ${formId}`);

    const inputs = form.querySelectorAll('input, textarea, select');
    console.log(`📝 Campos encontrados: ${inputs.length}`);

    // Validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => validateInput(input), 500);
            });
        }
    });

    // Validação final no Submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(`📤 Submit no formulário: ${formId}`);

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            alert('Formulário enviado com sucesso!');
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        } else {
            alert('Por favor, corrija os erros destacados em vermelho.');
        }
    });
}