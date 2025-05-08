// Array de cores femininas disponíveis
const messageColors = [
    '#ffd1dc', // Rosa claro
    '#e6e6fa', // Lavanda
    '#b5d8eb', // Azul claro
    '#d8bfd8', // Lilás
    '#f0e6ef', // Rosa pálido
    '#e0f7fa', // Azul água
    '#f3e5f5', // Roxo claro
    '#e8f5e9'  // Verde menta
];

// Objeto para armazenar as cores dos usuários
const userColors = {};

// Elementos do DOM
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const loginRequired = document.getElementById('loginRequired');
const chatContent = document.getElementById('chatContent');

// Função para inicializar o chat
function inicializarChat() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (usuarioLogado) {
        // Usuário está logado
        loginRequired.style.display = 'none';
        chatContent.style.display = 'block';
        inicializarMensagens();
    } else {
        // Usuário não está logado
        loginRequired.style.display = 'block';
        chatContent.style.display = 'none';
    }
}

// Função para inicializar as mensagens
function inicializarMensagens() {
    // Carregar mensagens salvas
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.forEach(msg => adicionarMensagem(msg));

    // Adicionar evento de envio de mensagem
    sendButton.addEventListener('click', enviarMensagem);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });
}

// Função para enviar mensagem
function enviarMensagem() {
    const mensagem = messageInput.value.trim();
    
    if (mensagem) {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
            window.location.href = 'login.html';
            return;
        }

        const novaMensagem = {
            texto: mensagem,
            usuario: usuarioLogado.nome,
            data: new Date().toISOString()
        };

        // Salvar mensagem
        const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
        mensagens.push(novaMensagem);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));

        // Adicionar mensagem ao chat
        adicionarMensagem(novaMensagem);

        // Limpar input
        messageInput.value = '';
    }
}

// Função para adicionar mensagem ao chat
function adicionarMensagem(mensagem) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    // Gerar cor de fundo baseada no nome do usuário
    const cor = gerarCorUsuario(mensagem.usuario);
    
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-user" style="background-color: ${cor}">${mensagem.usuario}</span>
            <span class="message-time">${formatarData(mensagem.data)}</span>
        </div>
        <div class="message-content">${mensagem.texto}</div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para gerar cor baseada no nome do usuário
function gerarCorUsuario(nome) {
    if (!userColors[nome]) {
        const colorIndex = Object.keys(userColors).length % messageColors.length;
        userColors[nome] = messageColors[colorIndex];
    }
    return userColors[nome];
}

// Função para formatar data
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Inicializar chat quando a página carregar
window.addEventListener('load', inicializarChat);

// Carregar mensagens do localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        addMessageToChat(message.text, message.user, message.color, message.isCurrentUser);
    });
}

// Salvar mensagens no localStorage
function saveMessages() {
    const messages = Array.from(chatMessages.children).map(messageDiv => ({
        text: messageDiv.querySelector('.message-text').textContent,
        user: messageDiv.querySelector('.message-user').textContent,
        color: messageDiv.getAttribute('data-color'),
        isCurrentUser: messageDiv.classList.contains('sent')
    }));
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Obter cor para um usuário
function getUserColor(userName) {
    if (!userColors[userName]) {
        const colorIndex = Object.keys(userColors).length % messageColors.length;
        userColors[userName] = colorIndex + 1; // +1 porque os índices começam em 0
    }
    return userColors[userName];
}

// Adicionar mensagem ao chat
function addMessageToChat(text, userName, colorIndex, isCurrentUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isCurrentUser ? 'sent' : 'received'}`;
    messageDiv.setAttribute('data-color', colorIndex);

    const userSpan = document.createElement('div');
    userSpan.className = 'message-user';
    userSpan.textContent = userName;

    const textSpan = document.createElement('div');
    textSpan.className = 'message-text';
    textSpan.textContent = text;

    messageDiv.appendChild(userSpan);
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);

    // Rolar para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const text = messageInput.value.trim();
    const currentUser = getCurrentUser();

    if (text) {
        const colorIndex = getUserColor(currentUser.username);
        addMessageToChat(text, currentUser.username, colorIndex, true);
        saveMessages();
        messageInput.value = '';
    }
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 