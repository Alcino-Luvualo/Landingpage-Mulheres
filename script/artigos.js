let next = document.querySelector('.next');
        let prev = document.querySelector('.prev');

        next.addEventListener('click', function() {
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').appendChild(items[0]);
        });

        prev.addEventListener('click', function() {
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').prepend(items[items.length - 1]);
        });

// Função para animar as publicações quando entrarem na tela
function animarPublicacoes() {
    const publicacoes = document.querySelectorAll('.publicacao');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    publicacoes.forEach(publicacao => {
        publicacao.style.opacity = '0';
        publicacao.style.transform = 'translateY(20px)';
        observer.observe(publicacao);
    });
}

// Inicializar animações quando a página carregar
window.addEventListener('load', animarPublicacoes);