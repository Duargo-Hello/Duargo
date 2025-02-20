// Usuário admin (pode ser armazenado no servidor em produção)
const ADMIN_EMAIL = "duargo17@gmial.com";

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
    let email = document.getElementById("register-email").value.trim();
    let password = document.getElementById("register-password").value;

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

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    showLogin();
}

// Função para fazer login
function login() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "index.html"; // Redireciona para a página protegida
    } else {
        alert("Email ou senha incorretos!");
    }
    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "adm.html"; // Redireciona para a página protegida
    } else {
        alert("Email ou senha incorretos!");
    }
}
