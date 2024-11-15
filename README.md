# Sistema de Gestão de Recursos e Usuários

Este projeto é um sistema interativo desenvolvido com JavaScript , HTML e CSS , focado no gerenciamento de equipamentos , usuários e veículos . Ele conta com controle de funções baseado em perfis de usuários ( Admin , Supervisor , User ) e armazena os dados localmente no navegador utilizando o localStorage.

## 🎯 Funcionalidades:

### ⚙️ Gerenciamento de Recursos
 - Equipamentos : Tipo, Nome, Status e Detalhes.
 - Usuários : Nome, Login, Email e Perfil (Admin, Supervisor ou Usuário).
 - Veículos : Marca, Modelo, Ano e Cor.

### 🔐 Perfis de Usuário e Permissões
 - Administrador : Adicionar, Editar, Excluir e *Imprimi recursos. (Usuários com perfis 'Admin' não podem ser excluídos).
 - Supervisor : Adicionar, Editar e *Imprimi recursos.
 - Usuário : Adicionar e *Imprimi recursos.

### 💡 Recursos Interativos
 - Listagem de Itens : Cada menu exibe uma tabela com os itens cadastrados.
 - Adicionar Novos Itens : Um botão exibe um pop-up para adicionar novos recursos com validações específicas.
 - Edição de Itens : Permite alterar os detalhes de itens existentes.
 - Exclusão de Itens : Disponível apenas para o perfil Admin .

### 💻 Tecnologias Utilizadas
 - HTML : Estrutura do sistema.
 - CSS : Estilização moderna e responsiva.
 - JavaScript : Lógica e manipulação de dados.
 - localStorage : armazenamento local no navegador.

### 🚀 Demonstração, clique no link e Faça login com credenciais
  - https://evilasioferreira.github.io/projetofinal/index.html
  - admin / admin
 - supervisor/ supervisor
 - user / user

### 📋 Melhorias Futuras.
 - Adição de filtro para pesquisa, *implementar a opção de imprimir lista de itens, adição de gráficos e relatórios para visualização de dados, corrigir posicionamento dos cabeçalhos das listas.

### 📞 Contato
 - Desenvolvedor : Evilasio Ferreira
