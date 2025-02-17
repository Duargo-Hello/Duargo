function searchVideos() {
    let input = document.getElementById('search').value.trim().toLowerCase();
    let videos = document.querySelectorAll('.video-item');

    videos.forEach(video => {
        let title = video.getAttribute('data-title').toLowerCase();
        
        if (title.includes(input) && input !== "") {
            video.classList.add('show');   // Mostra vídeos pesquisados
            video.classList.remove('hidden');
        } else {
            video.classList.remove('show');
            video.classList.add('hidden');  // Esconde os não pesquisados
        }
    });
}
