// projeto.js - FUNCIONALIDADES ESPECÍFICAS DA PÁGINA DE PROJETOS
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎯 Página de Projetos carregada!');

    // Contador de visitas específico para a página de projetos
    let visitasProjeto = localStorage.getItem('visitas_projeto') || 0;
    visitasProjeto++;
    localStorage.setItem('visitas_projeto', visitasProjeto);
    console.log('📊 Página de projetos carregada', visitasProjeto, 'vezes');

    // Interação com os cards de projetos - APENAS NA PÁGINA PRINCIPAL
    document.querySelectorAll('#projetos .projeto-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            const titulo = this.querySelector('h2').textContent;
            console.log('🛹 Projeto clicado:', titulo);

            // Efeito visual temporário
            this.style.transform = 'scale(0.98)';
            setTimeout(() => (this.style.transform = 'scale(1)'), 150);

            // Navegação automática baseada no card clicado
            let targetHash = '';
            if (titulo.includes('Todos')) targetHash = '#skate-todos';
            else if (titulo.includes('Elas')) targetHash = '#skate-elas';
            else if (titulo.includes('Verde')) targetHash = '#skate-verde';

            if (targetHash && window.spaRouter) {
                window.spaRouter.handleAnchorNavigation(targetHash);
            }
        });
    });

    // Interação com estatísticas - APENAS QUANDO EXISTIR
    document.querySelectorAll('.estatisticas-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelectorAll('.numero-grande').forEach(n => {
                n.style.color = 'var(--secondary)';
                n.style.transform = 'scale(1.1)';
            });
        });

        card.addEventListener('mouseleave', () => {
            card.querySelectorAll('.numero-grande').forEach(n => {
                n.style.color = '';
                n.style.transform = 'scale(1)';
            });
        });
    });

    // Animação de contagem dos números - SE HOUVER ELEMENTOS
    const iniciarContagem = () => {
        const numeros = document.querySelectorAll('.numero-grande');
        if (numeros.length > 0) {
            setTimeout(() => {
                numeros.forEach(numero => {
                    const textoOriginal = numero.textContent;
                    const final = parseInt(textoOriginal.replace(/\D/g, '')) || 1000;
                    let atual = 0;
                    const incremento = Math.ceil(final / 50);
                    const timer = setInterval(() => {
                        atual += incremento;
                        if (atual >= final) {
                            atual = final;
                            clearInterval(timer);
                            numero.textContent = textoOriginal; // Volta ao texto original
                        } else {
                            numero.textContent = atual.toLocaleString('pt-BR');
                        }
                    }, 30);
                });
            }, 1000);
        }
    };

    // Inicia contagem quando a página de projetos estiver ativa
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.id === 'projetos' && target.classList.contains('active')) {
                    iniciarContagem();
                }
            }
        });
    });

    // Observa mudanças na página de projetos
    const projetosPage = document.getElementById('projetos');
    if (projetosPage) {
        observer.observe(projetosPage, { attributes: true });

        // Inicia contagem se já estiver ativa
        if (projetosPage.classList.contains('active')) {
            iniciarContagem();
        }
    }

    // Adiciona conteúdo dinâmico às subpáginas se estiverem vazias
    const preencherSubpaginas = () => {
        const subpaginas = [
            { id: 'skate-todos', titulo: 'Skate Para Todos', cor: 'var(--primary)' },
            { id: 'skate-elas', titulo: 'Skate Para Elas', cor: 'var(--secondary)' },
            { id: 'skate-verde', titulo: 'Skate Verde', cor: 'var(--success)' }
        ];

        subpaginas.forEach(pagina => {
            const elemento = document.getElementById(pagina.id);
            if (elemento && elemento.querySelector('.card.grande').children.length <= 1) {
                const card = elemento.querySelector('.card.grande');
                card.innerHTML = `
                    <h1 style="color: ${pagina.cor}; margin-bottom: 20px;">${pagina.titulo}</h1>
                    <div class="projeto-detalhes">
                        <h3>🎯 Objetivo Principal</h3>
                        <p>Promover a inclusão social através do skate, oferecendo aulas gratuitas e atividades recreativas para toda a comunidade.</p>
                        
                        <h3>📅 Horários das Atividades</h3>
                        <ul>
                            <li>Segunda a Sexta: 9h-11h e 14h-16h</li>
                            <li>Sábados: 8h-12h (eventos especiais)</li>
                        </ul>
                        
                        <h3>👥 Público Alvo</h3>
                        <p>Crianças e jovens de 6 a 18 anos, de todas as comunidades.</p>
                        
                        <h3>✅ Benefícios</h3>
                        <div class="beneficios-grid">
                            <span class="beneficio-tag">Desenvolvimento Motor</span>
                            <span class="beneficio-tag">Socialização</span>
                            <span class="beneficio-tag">Autoestima</span>
                            <span class="beneficio-tag">Disciplina</span>
                        </div>
                        
                        <div class="text-center mt-4">
                            <a href="#projetos" class="btn-voltar">← Voltar para Todos os Projetos</a>
                        </div>
                    </div>
                `;
            }
        });
    };

    // Executa quando o DOM estiver pronto
    preencherSubpaginas();
});

// Adiciona estilos dinâmicos para as subpáginas
const projetoStyles = `
    .projeto-detalhes {
        line-height: 1.6;
    }
    
    .projeto-detalhes h3 {
        color: var(--dark);
        margin: 25px 0 15px 0;
        font-size: 1.3rem;
        border-left: 4px solid var(--primary);
        padding-left: 12px;
    }
    
    .projeto-detalhes ul {
        margin: 15px 0;
        padding-left: 25px;
    }
    
    .projeto-detalhes li {
        margin-bottom: 8px;
        position: relative;
    }
    
    .projeto-detalhes li:before {
        content: "🛹";
        position: absolute;
        left: -25px;
    }
    
    .beneficios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        margin: 20px 0;
    }
    
    .beneficio-tag {
        background: var(--light);
        padding: 8px 12px;
        border-radius: 20px;
        text-align: center;
        font-size: 0.9rem;
        border: 1px solid #ddd;
    }
    
    .btn-voltar {
        display: inline-block;
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
    }
    
    .btn-voltar:hover {
        background: var(--secondary);
        transform: translateY(-2px);
    }
    
    /* Melhoria nos cards de projeto */
    #projetos .projeto-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    #projetos .projeto-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    
    /* Estilo para números animados */
    .numero-grande {
        transition: all 0.3s ease;
    }
`;

// Adiciona os estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = projetoStyles;
document.head.appendChild(styleSheet);