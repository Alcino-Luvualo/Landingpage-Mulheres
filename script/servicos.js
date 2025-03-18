const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
    const width = carouselItems[0].clientWidth;
    carouselContainer.style.transform = `translateX(-${currentIndex * width}px)`;
}

function startCarousel() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }, 3000); // Troca a cada 3 segundos
}

window.addEventListener('resize', updateCarousel);
startCarousel();

