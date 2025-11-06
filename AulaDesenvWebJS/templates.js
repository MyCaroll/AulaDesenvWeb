// templates.js - SEU CÓDIGO ORIGINAL (mantenha como está)
export function loadTemplate(templateId, containerId) {
    const templateElement = document.getElementById(templateId);
    const containerElement = document.getElementById(containerId);

    if (!templateElement) {
        console.error(`Template com ID "${templateId}" não encontrado.`);
        return;
    }

    if (!containerElement) {
        console.error(`Container com ID "${containerId}" não encontrado.`);
        return;
    }

    const templateHTML = templateElement.innerHTML;
    containerElement.innerHTML = templateHTML;

    containerElement.classList.add('fade-in');
    setTimeout(() => {
        containerElement.classList.add('visible');
    }, 50);

    setTimeout(() => {
        containerElement.classList.remove('fade-in', 'visible');
    }, 550);
}