// Array de usuários para teste
let users = [
    { username: 'admin', password: 'admin', profile: 'Gerente' },
    { username: 'supervisor', password: 'supervisor', profile: 'Supervisor' },
    { username: 'user', password: 'user', profile: 'User' }
];

// Função para gerenciar o login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se o usuário existe
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Armazena o usuário no localStorage e redireciona para restricted.html
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'restricted.html'; // Redireciona após login
    } else {
        // Alerta se o usuário ou a senha estiverem incorretos
        alert('Usuário ou senha inválidos!');
    }
});

// Carregar informações do usuário na página restrita
if (document.getElementById('userInfo')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userInfo').innerText = `Bem-vindo, ${user.username} (Seu perfil é: ${user.profile})`;
    } else {
        // Se não houver usuário, redirecionar de volta ao login
        window.location.href = 'index.html';
    }
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    window.location.href = 'index.html'; // Redireciona para o login
});

// Exibir conteúdo com base na opção do menu
document.getElementById('equipamentos')?.addEventListener('click', function() {
    document.getElementById('contentArea').innerText = 'Aqui você pode gerenciar os equipamentos.';
});

document.getElementById('usuarios')?.addEventListener('click', function() {
    document.getElementById('contentArea').innerText = 'Aqui você pode gerenciar os usuários.';
});

document.getElementById('veiculos')?.addEventListener('click', function() {
    document.getElementById('contentArea').innerText = 'Aqui você pode gerenciar os veículos.';
});

//novo para teste

function controlPermissions() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        const profile = user.profile;
        
        // Exemplo de permissões
        if (profile === 'Gerente') {
            // Gerente pode acessar tudo
            document.getElementById('equipamentos').style.display = 'block';
            document.getElementById('usuarios').style.display = 'block';
            document.getElementById('veiculos').style.display = 'block';
        } else if (profile === 'Supervisor') {
            // Supervisor pode editar e imprimir, mas não cadastrar ou excluir usuários
            document.getElementById('usuarios').style.display = 'none'; // Exemplo de restrição
        } else if (profile === 'User') {
            // Usuário só pode ver a lista e imprimir, sem editar
            document.getElementById('equipamentos').style.display = 'none';
            document.getElementById('usuarios').style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', controlPermissions);


document.getElementById('equipmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const tipo = document.getElementById('tipo').value;
    const nome = document.getElementById('nome').value;
    const status = document.getElementById('status').value;
    const detalhes = document.getElementById('detalhes').value;

    // Cria um objeto com os dados do equipamento
    const equipamento = { tipo, nome, status, detalhes };

    // Exemplo: salva no localStorage (simulando banco de dados)
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentos.push(equipamento);
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    // Atualiza a lista de equipamentos na interface
    updateEquipmentList();
});

function updateEquipmentList() {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const listElement = document.getElementById('equipmentList');
    listElement.innerHTML = '';

    equipamentos.forEach((equipamento, index) => {
        const li = document.createElement('li');
        li.innerText = `${equipamento.nome} (${equipamento.tipo}) - ${equipamento.status}`;
        listElement.appendChild(li);
    });
}

// Chamar essa função ao carregar a página
document.addEventListener('DOMContentLoaded', updateEquipmentList);


//botão para impressão
document.getElementById('printBtn').addEventListener('click', function() {
    window.print(); // Abre o diálogo de impressão
});
