function togglePassword(button) {
    const input = button.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Alternar o ícone
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Adicionar log para verificar se o arquivo está sendo carregado
console.log('Arquivo cadastro.js carregado');

function processarCadastro() {
    console.log('Função processarCadastro chamada');
    
    // Obter os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    console.log('Valores obtidos:', { nome, email, senha, confirmarSenha });

    // Validar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Validar o tamanho mínimo da senha
    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres!');
        return;
    }

    // Validar se a senha contém letras e números
    if (!/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
        alert('A senha deve conter letras e números!');
        return;
    }

    // Criar objeto com os dados do usuário
    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        // Obter usuários existentes do localStorage
        let usuarios = [];
        const usuariosSalvos = localStorage.getItem('usuarios');
        
        if (usuariosSalvos) {
            usuarios = JSON.parse(usuariosSalvos);
            // Garantir que usuarios seja um array
            if (!Array.isArray(usuarios)) {
                usuarios = [];
            }
        }

        // Verificar se o email já está cadastrado
        if (usuarios.some(u => u.email === email)) {
            alert('Este email já está cadastrado!');
            return;
        }

        // Adicionar novo usuário
        usuarios.push(usuario);

        // Salvar no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar mensagem de sucesso
        alert('Cadastro realizado com sucesso!');

        // Redirecionar para a página de login
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao processar cadastro:', error);
        alert('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
    }
} 