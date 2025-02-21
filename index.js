document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado com sucesso!");
    const adminEmail = "duargo17@gmail.com"; // Defina o e-mail do administrador
    const usuarioAtual = localStorage.getItem("usuarioEmail"); // Pegue o e-mail do usuário logado


    // Elementos da pesquisa
    const searchButton = document.getElementById("search-btn");
    const searchInput = document.getElementById("search");
    const gameCards = document.querySelectorAll(".card"); // Seleciona todos os jogos
    const noResultsMessage = document.createElement("p");

    // Função de pesquisa
    function executeSearch() {
        let query = searchInput.value.trim().toLowerCase();

        // Se a barra estiver vazia, recarrega a página
        if (query === "") {
            location.reload();
            return;
        }

        let found = false;
        gameCards.forEach(card => {
            let gameTitle = card.querySelector("h3").innerText.toLowerCase();
            if (gameTitle.includes(query)) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        // Exibir mensagem de "Nenhum jogo encontrado"
        noResultsMessage.style.display = found ? "none" : "block";
    }

    // Clique no botão de pesquisa
    if (searchButton) {
        searchButton.addEventListener("click", executeSearch);
    }

    // Pressionar Enter para pesquisar
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                executeSearch();
            }
        });
    }

    // Efeito de clique nos botões
    document.querySelectorAll(".btn, .btn-jogar").forEach(button => {
        button.addEventListener("click", function () {
            button.classList.add("clicked");
            setTimeout(() => button.classList.remove("clicked"), 300);
        });
    });
});

// Função para assistir vídeos (abre em nova aba)
function assistirVideo(url) {
    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-btn");
    const cards = document.querySelectorAll(".card");

    // Oculta todos os doramas ao carregar a página
    cards.forEach(card => {
        card.style.display = "none";
    });

    function pesquisar() {
        const termo = searchInput.value.toLowerCase().trim();
        let encontrou = false; // Verifica se encontrou algum resultado

        cards.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase();

            if (titulo.includes(termo) && termo !== "") {
                card.style.display = "block"; // Mostra o dorama pesquisado
                encontrou = true;
            } else {
                card.style.display = "none"; // Oculta se não for pesquisado
            }
        });

        // Exibe uma mensagem se nada for encontrado
        const mensagem = document.getElementById("mensagem-erro");
        if (!encontrou && termo !== "") {
            if (!mensagem) {
                const novoAviso = document.createElement("p");
                novoAviso.id = "mensagem-erro";
                novoAviso.textContent = "Nenhum dorama encontrado.";
                novoAviso.style.textAlign = "center";
                novoAviso.style.color = "red";
                novoAviso.style.fontWeight = "bold";
                document.querySelector(".jogos").appendChild(novoAviso);
            }
        } else {
            if (mensagem) mensagem.remove();
        }
    }

    // Filtra automaticamente ao digitar
    searchInput.addEventListener("input", pesquisar);

    // Filtra ao clicar no botão buscar
    searchButton.addEventListener("click", pesquisar);
});

document.addEventListener("DOMContentLoaded", function () {
    let selectedStars = 0;

    // Função para selecionar estrelas
    document.querySelectorAll(".star-rating span").forEach(star => {
        star.addEventListener("click", function () {
            selectedStars = this.getAttribute("data-star");
            document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("active"));
            for (let i = 0; i < selectedStars; i++) {
                document.querySelectorAll(".star-rating span")[i].classList.add("active");
            }
        });
    });

    // Função para salvar resenha
    document.getElementById("submit-review").addEventListener("click", function () {
        let reviewText = document.getElementById("review-text").value.trim();
        if (selectedStars === 0 || reviewText === "") {
            alert("Dê uma nota e escreva um comentário!");
            return;
        }

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push({ id: Date.now(), stars: selectedStars, text: reviewText, likes: 0, dislikes: 0 });
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Limpar os campos de entrada
        document.getElementById("review-text").value = "";
        selectedStars = 0;
        document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("active"));

        carregarResenhas(); // Carregar as resenhas após salvar

    });

    // Função para carregar resenhas e calcular média
    function carregarResenhas() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        let reviewsList = document.getElementById("reviews-list");
        reviewsList.innerHTML = "";

        if (reviews.length === 0) {
            reviewsList.innerHTML = "<p>Seja o primeiro a avaliar!</p>";
        } else {
            let totalStars = 0;
            reviews.forEach(review => {
                totalStars += parseInt(review.stars);

                let reviewItem = document.createElement("div");
                reviewItem.classList.add("review-item");

                reviewItem.innerHTML = `
                    <strong>${review.stars}⭐</strong> - ${review.text}
                    <div>
                        <button class="like-btn" data-id="${review.id}">👍 ${review.likes}</button>
                        <button class="dislike-btn" data-id="${review.id}">👎 ${review.dislikes}</button>
                        <button class="delete-btn" data-id="${review.id}">❌</button>
                    </div>
                `;

                reviewsList.appendChild(reviewItem);
            });

            let avgRating = (totalStars / reviews.length).toFixed(1);
            document.getElementById("avg-rating").textContent = avgRating;

            // Adicionando eventos para botões de like, dislike e deletar
            document.querySelectorAll(".like-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let id = this.getAttribute("data-id");
                    adicionarLike(id);
                });
            });

            document.querySelectorAll(".dislike-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let id = this.getAttribute("data-id");
                    adicionarDislike(id);
                });
            });

            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let id = this.getAttribute("data-id");
                    excluirResenha(id);
                });
            });
        }
    }

    // Função para adicionar like
    function adicionarLike(id) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        let reviewIndex = reviews.findIndex(review => review.id == id);

        // Verificando se o usuário já deu like ou dislike
        let userLikes = JSON.parse(localStorage.getItem("userLikes")) || [];
        let userDislikes = JSON.parse(localStorage.getItem("userDislikes")) || [];

        if (userLikes.includes(id)) {
            alert("Você já deu like nessa resenha!");
            return;
        }

        if (userDislikes.includes(id)) {
            alert("Você não pode dar dislike e like na mesma resenha!");
            return;
        }

        if (reviewIndex !== -1) {
            reviews[reviewIndex].likes += 1;
            localStorage.setItem("reviews", JSON.stringify(reviews));

            // Salva o ID da resenha que o usuário curtiu
            userLikes.push(id);
            localStorage.setItem("userLikes", JSON.stringify(userLikes));

            carregarResenhas();
        }
    }

    // Função para adicionar dislike
    function adicionarDislike(id) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        let reviewIndex = reviews.findIndex(review => review.id == id);

        // Verificando se o usuário já deu like ou dislike
        let userLikes = JSON.parse(localStorage.getItem("userLikes")) || [];
        let userDislikes = JSON.parse(localStorage.getItem("userDislikes")) || [];

        if (userDislikes.includes(id)) {
            alert("Você já deu dislike nessa resenha!");
            return;
        }

        if (userLikes.includes(id)) {
            alert("Você não pode dar like e dislike na mesma resenha!");
            return;
        }

        if (reviewIndex !== -1) {
            reviews[reviewIndex].dislikes += 1;
            localStorage.setItem("reviews", JSON.stringify(reviews));

            // Salva o ID da resenha que o usuário descurtiu
            userDislikes.push(id);
            localStorage.setItem("userDislikes", JSON.stringify(userDislikes));

            carregarResenhas();
        }
    }

    // Função para excluir resenha
    function excluirResenha(id) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews = reviews.filter(review => review.id != id);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        carregarResenhas();
    }

    carregarResenhas();
});
function login(email) {
    localStorage.setItem("usuarioEmail", email);
}

document.querySelectorAll(".btn-jogar").forEach(button => {
    button.addEventListener("click", function () {
        let videoUrl = this.getAttribute("data-video");
        document.getElementById("videoFrame").src = videoUrl;
        document.getElementById("videoModal").style.display = "flex";
    });
});

// função botão de sair
document.getElementById("logout-btn").addEventListener("click", function() {
    // Remove os dados de login do usuário (exemplo: localStorage)
    localStorage.removeItem("userLoggedIn");

    // Redireciona para a página de login
    window.location.href = "login.html";
});
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Simula um login bem-sucedido
    localStorage.setItem("userLoggedIn", "true");

    // Redireciona para a página principal
    window.location.href = "index.html";
});
// Verifica se o usuário está logado
if (!localStorage.getItem("userLoggedIn")) {
    window.location.href = "login.html"; // Redireciona para login se não estiver logado
}
function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("active");
}