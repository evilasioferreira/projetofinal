document.addEventListener("DOMContentLoaded", function () {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user ? user.profile : null;

    if (user) {
        document.getElementById('userInfo').innerText = `Bem-vindo, ${user.nome} (Seu perfil é: ${user.profile})`;
    } else {
        window.location.href = 'index.html';
    }

    // Função para exibir itens de acordo com o menu selecionado
    function displayMenu(menu) {
        document.getElementById('contentArea').innerHTML = '';

        if (menu === 'equipamentos') displayEquipamentos();
        else if (menu === 'usuarios') displayUsuarios();
        else if (menu === 'veiculos') displayVeiculos();
    }

    // Exibição e funcionalidade para o menu de Equipamentos
    function displayEquipamentos() {
        document.getElementById('contentArea').innerHTML = `
            <h2>Equipamentos</h2>
            ${userRole === 'Admin' || userRole === 'Supervisor' || userRole === 'User' ? '<button onclick="openAddPopup(\'equipamento\')">Adicionar Equipamento</button>' : ''}
            <div class="reader">
                   <table>
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Status</th>
                <th>Detalhes</th>
                <th>Ações</th>
            </tr>
        </thead>
    </table>

            </div>
        `;

        equipamentos.forEach((equip, index) => {
            document.getElementById('contentArea').innerHTML += `
                <div class="item">
                    <p>${equip.tipo}</p>
                    <p>${equip.nome}</p>
                    <p>${equip.status}</p>
                    <p>${equip.detalhes}</p>
                    <p>
                        ${userRole !== 'User' ? `<button onclick="editEquipamento(${index})">Editar</button>` : ''}
                        ${userRole === 'Admin' ? `<button onclick="deleteEquipamento(${index})">Excluir</button>` : ''}
                    </p>
                </div>
            `;
        });
    }

    // Exibição e funcionalidade para o menu de Usuários
    function displayUsuarios() {
        document.getElementById('contentArea').innerHTML = `
            <h2>Usuários</h2>
            ${userRole === 'Admin' ? '<button onclick="openAddPopup(\'usuario\')">Adicionar Usuário</button>' : ''}
            <div class="header">
     <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Login</th>
                <th>Email</th>
                <th>Perfil</th>
                
            </tr>
        </thead>
    </table>
</div>
            </div>
        `;

        usuarios.forEach((user, index) => {
            document.getElementById('contentArea').innerHTML += `
                <div class="item">
                    <p>${user.nome}</p>
                    <p>${user.username}</p>
                    <p>${user.email}</p>
                    <p>${user.profile}</p>
                    <p>
                        
                        ${userRole === 'Admin' ? `<button onclick="deleteUsuario(${index})">Excluir</button>` : ''}
                        
                    </p>
                </div>
            `;
        });
    }

    // Exibição e funcionalidade para o menu de Veículos
    function displayVeiculos() {
        document.getElementById('contentArea').innerHTML = `
            <h2>Veículos</h2>
            ${userRole === 'Admin' || userRole === 'Supervisor' || userRole === 'User' ? '<button onclick="openAddPopup(\'veiculo\')">Adicionar Veículo</button>' : ''}
            <div class="header">
                
                     <table>
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Cor</th>
                
            </tr>
        </thead>
    </table>
</div>
            </div>
        `;

        veiculos.forEach((veic, index) => {
            document.getElementById('contentArea').innerHTML += `
                <div class="item">
                    <p>${veic.marca}</p>
                    <p>${veic.modelo}</p>
                    <p>${veic.ano}</p>
                    <p>${veic.cor}</p>
                    <p>
                        ${userRole !== 'User' ? `<button onclick="editVeiculo(${index})">Editar</button>` : ''}
                        ${userRole === 'Admin' ? `<button onclick="deleteVeiculo(${index})">Excluir</button>` : ''}
                    </p>
                </div>
            `;
        });
    }

    // Funções para adicionar novos itens com popup
    // Função para abrir o popup de adição
window.openAddPopup = function(type) {
    const popupContent = {
        equipamento: `
            <h3>Adicionar Equipamento</h3>
            <label>Tipo: <input type="text" id="equipamentoTipo" required></label><br><br>
            <label>Nome: <input type="text" id="equipamentoNome" required></label><br><br>
            <label>Status: <select id="equipamentoStatus"><option value="Ativo">Ativo</option><option value="Inativo">Inativo</option></select></label><br><br>
            <label>Detalhes: <textarea id="equipamentoDetalhes" required></textarea></label><br><br>
            <button onclick="addEquipamento()">Salvar</button>
        `,
        usuario: `
            <h3>Adicionar Usuário</h3>
            <label>Nome: <input type="text" id="usuarioNome" required></label><br><br>
            <label>Login: <input type="text" id="usuarioLogin" required></label>
            <label>Email: <input type="email" id="usuarioEmail" required></label><br><br>
            <label>Perfil: <select id="usuarioPerfil"><option value="Admin">Admin</option><option value="Supervisor">Supervisor</option><option value="User">User</option></select></label>
            <label>Senha: <input type="password" id="usuarioSenha" required></label>
            <label>Confirmação de Senha: <input type="password" id="usuarioSenhaConfirm" required></label><br>
            <button onclick="addUsuario()">Salvar</button>
        `,
        veiculo: `
            <h3>Adicionar Veículo</h3>
            <label>Marca: <input type="text" id="veiculoMarca" required></label><br><br>
            <label>Modelo: <input type="text" id="veiculoModelo" required></label><br><br>
            <label>Ano: <input type="number" id="veiculoAno" required></label><br><br>
            <label>Cor: <input type="text" id="veiculoCor" required></label><br><br>
            <button onclick="addVeiculo()">Salvar</button>
        `
    };

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = popupContent[type] + `<button onclick="closePopup()">Fechar</button>`;
    document.body.appendChild(popup);
};

// Função para fechar o popup
window.closePopup = function() {
    const popup = document.querySelector('.popup');
    if (popup) popup.remove();
};

// Funções para adicionar novos itens aos arrays e ao localStorage
window.addEquipamento = function() {
    const tipo = document.getElementById('equipamentoTipo').value;
    const nome = document.getElementById('equipamentoNome').value;
    const status = document.getElementById('equipamentoStatus').value;
    const detalhes = document.getElementById('equipamentoDetalhes').value;
    
    // Adiciona o novo equipamento ao array
    equipamentos.push({ tipo, nome, status, detalhes });
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    closePopup();  // Fecha o popup
    displayEquipamentos();  // Atualiza a exibição
};

/*
window.addUsuario = function() {
    const nome = document.getElementById('usuarioNome').value;
    const login = document.getElementById('usuarioLogin').value;
    const email = document.getElementById('usuarioEmail').value;
    const perfil = document.getElementById('usuarioPerfil').value;
    const senha = document.getElementById('usuarioSenha').value;
    const senhaConfirm = document.getElementById('usuarioSenhaConfirm').value;
    
    if (senha === senhaConfirm) {
        usuarios.push({ nome, login, email, perfil });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        closePopup();
        displayUsuarios();
    } else {
        alert("As senhas não correspondem.");
    }
};

*/
window.addUsuario = function() {
    const nome = document.getElementById('usuarioNome').value;
    const login = document.getElementById('usuarioLogin').value;
    const email = document.getElementById('usuarioEmail').value;
    const perfil = document.getElementById('usuarioPerfil').value;
    const senha = document.getElementById('usuarioSenha').value;
    const senhaConfirm = document.getElementById('usuarioSenhaConfirm').value;

    // Verificação se as senhas coincidem
    if (senha === senhaConfirm) {
        const newUser = {
            username: login,
            password: senha,
            profile: perfil,
            nome: nome,
            email: email
        };

        // Verificar o conteúdo de users antes de adicionar
        console.log('Usuários antes de adicionar:', users);

        // Adicionar o novo usuário
        users.push(newUser);

        // Atualizar o localStorage com os novos dados
        localStorage.setItem('usuarios', JSON.stringify(users));

        // Fechar o popup e atualizar a interface de usuários
        closePopup();
        displayUsuarios();
    } else {
        alert("As senhas não coincidem.");
    }
};

window.addVeiculo = function() {
    const marca = document.getElementById('veiculoMarca').value;
    const modelo = document.getElementById('veiculoModelo').value;
    const ano = document.getElementById('veiculoAno').value;
    const cor = document.getElementById('veiculoCor').value;

    veiculos.push({ marca, modelo, ano, cor });
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
    closePopup();
    displayVeiculos();
};


    
// Funções de edição e exclusão Equipamentos
    window.editEquipamento = function(index) {
        const equip = equipamentos[index];
        openAddPopup('equipamento');
        document.getElementById('equipamentoTipo').value = equip.tipo;
        document.getElementById('equipamentoNome').value = equip.nome;
        document.getElementById('equipamentoStatus').value = equip.status;
        document.getElementById('equipamentoDetalhes').value = equip.detalhes;

        document.querySelector('.popup button').onclick = function() {
            equipamentos[index] = {
                tipo: document.getElementById('equipamentoTipo').value,
                nome: document.getElementById('equipamentoNome').value,
                status: document.getElementById('equipamentoStatus').value,
                detalhes: document.getElementById('equipamentoDetalhes').value,
            };
            localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
            closePopup();
            displayEquipamentos();
        };
    }

    window.deleteEquipamento = function(index) {
        equipamentos.splice(index, 1);
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
        displayEquipamentos();
    }

    // Funções de edição e exclusão Veiculos
    window.editVeiculo = function(index) {
        const equip = veiculos[index];
        openAddPopup('veiculo');
        document.getElementById('veiculoMarca').value = equip.marca;
        document.getElementById('veiculoModelo').value = equip.modelo;
        document.getElementById('veiculoAno').value = equip.ano;
        document.getElementById('veiculoCor').value = equip.cor;

        document.querySelector('.popup button').onclick = function() {
            veiculos[index] = {
                marca: document.getElementById('veiculoMarca').value,
                modelo: document.getElementById('veiculoModelo').value,
                ano: document.getElementById('veiculoAno').value,
                cor: document.getElementById('veiculoCor').value,
            };
            localStorage.setItem('veiculos', JSON.stringify(veiculos));
            closePopup();
            displayVeiculos();
        };
    }

    window.deleteVeiculo = function(index) {
        veiculos.splice(index, 1);
        localStorage.setItem('veiculos', JSON.stringify(veiculos));
        displayVeiculos();
    }

    // Funções de exclusão Usuários
    window.deleteUsuario = function(index) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        displayUsuários();
    }

    // Inicialização dos links para os menus
    document.getElementById('equipamentosLink').addEventListener('click', () => displayMenu('equipamentos'));
    document.getElementById('usuariosLink').addEventListener('click', () => displayMenu('usuarios'));
    document.getElementById('veiculosLink').addEventListener('click', () => displayMenu('veiculos'));
});

document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    window.location.href = 'index.html'; // Redireciona para o login
});

