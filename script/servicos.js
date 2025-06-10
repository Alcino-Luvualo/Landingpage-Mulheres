// Função para avançar o carrossel
function advanceCarousel() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
}

// Faz o carrossel avançar automaticamente a cada 3 segundos
setInterval(advanceCarousel, 4000);
