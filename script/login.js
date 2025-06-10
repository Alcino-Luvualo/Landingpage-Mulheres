let isCadastro = false;

function alternarCadastro() {
    window.location.href = 'cadastro.html';
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarSenha(senha) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(senha);
}

function togglePassword(button) {
    const input = button.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Alternar o ícone
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

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

function processar() {
    // Obter os valores dos campos
    const email = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    // Obter usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procurar usuário com email e senha correspondentes
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        // Salvar informações do usuário logado
        localStorage.setItem('usuarioLogado', JSON.stringify({
            nome: usuario.nome,
            email: usuario.email
        }));

        // Mostrar mensagem de sucesso
        alert('Login realizado com sucesso!');

        // Redirecionar para a página principal
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}

document.getElementById('username').addEventListener('input', function(e) {
    const email = e.target.value.trim();
    if (email && !validarEmail(email)) {
        e.target.setCustomValidity('Por favor, insira um email válido.');
    } else {
        e.target.setCustomValidity('');
    }
});

document.getElementById('password').addEventListener('input', function(e) {
    const senha = e.target.value.trim();
    if (senha && !validarSenha(senha)) {
        e.target.setCustomValidity('A senha deve ter no mínimo 6 caracteres, incluindo letras e números.');
        } else {
        e.target.setCustomValidity('');
    }
});

// Verificar login quando a página carregar
window.addEventListener('load', verificarLogin);
