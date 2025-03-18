document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Sua mensagem foi enviada! Entraremos em contato em breve.');
    this.reset();
});
