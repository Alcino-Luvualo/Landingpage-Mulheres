// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const loginButton = document.getElementById('loginButton');
    
    if (usuarioLogado) {
        // Usuário está logado
        loginButton.innerHTML = `
            <span>Olá, ${usuarioLogado.nome}</span>
            <button onclick="fazerLogout()" class="btn-logout">Sair</button>
        `;
    } else {
        // Usuário não está logado
        loginButton.innerHTML = `
            <a href="login.html" class="btn-login">Login</a>
        `;
    }
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// Função para verificar se o usuário está logado antes de acessar uma página protegida
function verificarAcesso() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        window.location.href = 'login.html';
    }
}

// Verificar login quando a página carregar
window.addEventListener('load', verificarLogin); 