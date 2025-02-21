// Definição do email do administrador principal
const ADMIN_EMAIL = "duargo17@gmail.com";

// Exibir formulário de login ou cadastro
function showRegister() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "block";
}

function showLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("register-container").style.display = "none";
}

// Função para registrar usuário
function register() {
    let name = document.getElementById("register-name").value.trim();
    let email = document.getElementById("register-email").value.trim().toLowerCase();
    let password = document.getElementById("register-password").value.trim();

    if (!name || !email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica se o email já está cadastrado
    if (users.some(user => user.email === email)) {
        alert("Este email já está cadastrado!");
        return;
    }

    let newUser = { name, email, password, isAdmin: email === ADMIN_EMAIL };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Usuário cadastrado com sucesso:", newUser); // Debug

    alert("Cadastro realizado com sucesso!");
    showLogin();
}

// Função para fazer login
function login() {
    let email = document.getElementById("login-email").value.trim().toLowerCase();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    console.log("Usuários cadastrados:", users); // Debug
    console.log("Tentativa de login:", { email, password }); // Debug

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));

        alert(`Login realizado com sucesso! Bem-vindo, ${user.name}`);

        if (user.isAdmin) {
            window.location.href = "adm.html"; // Redireciona para admin
        } else {
            window.location.href = "index.html"; // Redireciona para usuário normal
        }
    } else {
        alert("Email ou senha incorretos!");
    }
}

// Verifica se há um usuário logado
function checkLogin() {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
        alert(`Bem-vindo, ${user.name}!`);
    }
}

// Verifica login ao carregar a página
document.addEventListener("DOMContentLoaded", checkLogin);
