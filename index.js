document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado com sucesso!");

    // Elementos da pesquisa
    const searchButton = document.getElementById("search-btn");
    const searchInput = document.getElementById("search");
    const gameCards = document.querySelectorAll(".card"); // Seleciona todos os jogos
    const noResultsMessage = document.createElement("p");

    // Estilos da mensagem "Nenhum jogo encontrado"
    noResultsMessage.innerText = "Nenhum jogo encontrado";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.color = "red";
    noResultsMessage.style.fontSize = "18px";
    noResultsMessage.style.marginTop = "20px";
    document.querySelector(".jogos").appendChild(noResultsMessage);

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
