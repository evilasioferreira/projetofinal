
//Carregar os usuários do localStorage, ou definir um array padrão
let users = JSON.parse(localStorage.getItem('usuarios'));

// Se não houver dados no localStorage, inicialize com um array padrão
if (!Array.isArray(users)) {
    users = [
        { username: 'admin', password: 'admin', profile: 'Admin', nome: 'Evilasio' , email: 'evilasio@teste.com'},
        { username: 'supervisor', password: 'supervisor', profile: 'Supervisor', nome: 'Ferreira' , email: 'supervisor@teste.com'},
        { username: 'user', password: 'user', profile: 'User', nome: 'Silva', email: 'user@teste.com' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(users)); // Inicializar no localStorage
}
console.log(localStorage.getItem('usuarios'));
/*
// Inicialização de users no escopo global
let users = JSON.parse(localStorage.getItem('usuarios')) || [
    { username: 'admin', password: 'admin', profile: 'Admin', nome: 'Evilasio' },
    { username: 'supervisor', password: 'supervisor', profile: 'Supervisor', nome: 'Ferreira' },
    { username: 'user', password: 'user', profile: 'User', nome: 'Silva' }
];
*/
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




