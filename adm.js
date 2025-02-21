const ADMIN_EMAIL = "duargo17@gmail.com";

// Verifica se o usuário é administrador
function checkAdmin() {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user || (!user.isAdmin && user.email !== ADMIN_EMAIL)) {
        alert("Acesso negado!");
        window.location.href = "index.html";
    } else {
        loadUsers();
    }
}

// Registrar um novo usuário pelo admin
function registerUser(isAdmin = false) {
    let name = document.getElementById("new-name").value.trim();
    let email = document.getElementById("new-email").value.trim();
    let password = document.getElementById("new-password").value;

    if (!name || !email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Este email já está cadastrado!");
        return;
    }

    users.push({ name, email, password, isAdmin });
    localStorage.setItem("users", JSON.stringify(users));

    alert(isAdmin ? "Administrador cadastrado com sucesso!" : "Usuário cadastrado com sucesso!");
    document.getElementById("new-name").value = "";
    document.getElementById("new-email").value = "";
    document.getElementById("new-password").value = "";
    loadUsers();
}

// Carregar a lista de usuários
function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userList = document.getElementById("user-list");
    userList.innerHTML = "";

    users.forEach((user, index) => {
        let userClass = user.isAdmin ? "admin-user" : "regular-user";
        let row = `<tr class="${userClass}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.isAdmin ? "Administrador" : "Usuário"}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">❌</button></td>
        </tr>`;
        userList.innerHTML += row;
    });
}

// Excluir usuário (somente admin)
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

// Logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

// Recuperação de senha
function recoverPassword() {
    let email = prompt("Digite seu email para recuperar a senha:");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email);

    if (user) {
        alert(`Sua senha é: ${user.password}`);
    } else {
        alert("Email não encontrado!");
    }
}
