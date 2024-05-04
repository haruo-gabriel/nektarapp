document.addEventListener("DOMContentLoaded", function() {
    fetchMovies();
});

function fetchMovies() {
    fetch("http://127.0.0.1:8080/movies") // Endpoint para buscar os filmes
        .then(response => response.json())
        .then(data => {
            const moviesDiv = document.getElementById("movies");
            data.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title} Poster">
                `;
                moviesDiv.appendChild(movieElement);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar filmes:", error);
        });
}