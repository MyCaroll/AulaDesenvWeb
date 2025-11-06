document.addEventListener('DOMContentLoaded', function () {
    console.log('Página de Projetos carregada!');

    // Contador de visitas específico para a página de projetos
    let visitasProjeto = localStorage.getItem('visitas_projeto') || 0;
    visitasProjeto++;
    localStorage.setItem('visitas_projeto', visitasProjeto);
    console.log('Página de projetos carregada', visitasProjeto, 'vezes');

    // Interação com os cards de projetos
    document.querySelectorAll('.projeto-card').forEach(card => {
        card.addEventListener('click', function () {
            const titulo = this.querySelector('h2').textContent;
            console.log('Projeto clicado:', titulo);
            this.style.transform = 'scale(0.98)';
            setTimeout(() => (this.style.transform = 'scale(1)'), 150);
        });
    });

    // Interação com estatísticas
    document.querySelectorAll('.estatisticas-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelectorAll('.numero-grande').forEach(n => (n.style.color = '#ff6600'));
        });
        card.addEventListener('mouseleave', () => {
            card.querySelectorAll('.numero-grande').forEach(n => (n.style.color = ''));
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animação de contagem dos números
    setTimeout(() => {
        document.querySelectorAll('.numero-grande').forEach(numero => {
            const final = parseInt(numero.textContent.replace(/\D/g, ''));
            let atual = 0;
            const incremento = Math.ceil(final / 50);
            const timer = setInterval(() => {
                atual += incremento;
                if (atual >= final) {
                    atual = final;
                    clearInterval(timer);
                }
                numero.textContent = atual.toLocaleString('pt-BR');
            }, 30);
        });
    }, 500);
});
