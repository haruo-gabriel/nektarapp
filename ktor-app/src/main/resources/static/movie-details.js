import { imagesBaseUrl } from "./constants.js";

window.onload = function() {
    // Retrieve the current movie's data from localStorage
    const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
    // Populate the page with the movie details
    populateMovieDetails(currentMovie).catch(error => console.error(error));
}

/*
async function populateMovieDetails(movie) {
    // Fetch the HTML template
    const templateResponse = await fetch('./movie-details-template.html');
    let html = await templateResponse.text();

    // Create a Date object from the release_date string
    const releaseDate = new Date(movie.release_date);
    // Format the release date as dd/mm/yyyy
    const formattedReleaseDate = releaseDate.getDate() + '/' + (releaseDate.getMonth() + 1) + '/' + releaseDate.getFullYear();

    // Replace all occurrences of the placeholders with the actual movie details
    html = html.replace(/{title}/g, movie.title)
        .replace(/{backdrop_path}/g, imagesBaseUrl + '/original' + movie.backdrop_path)
        .replace(/{overview}/g, movie.overview)
        .replace(/{poster_path}/g, imagesBaseUrl + '/w300' + movie.poster_path)
        .replace(/{release_date}/g, formattedReleaseDate)
        .replace(/{vote_average}/g, movie.vote_average);

    // Insert the new HTML into a specific container in the index.html page
    const container = document.querySelector('.movie-details.all-container');
    container.innerHTML = html;
}
*/

async function populateMovieDetails(movie) {
    // Create a Date object from the release_date string
    const releaseDate = new Date(movie.release_date);
    // Format the release date as dd/mm/yyyy
    const formattedReleaseDate = releaseDate.getDate() + '/' + (releaseDate.getMonth() + 1) + '/' + releaseDate.getFullYear();

    // Create the HTML template
    let html = `
        <div class="movie-details backdrop-image">
            <img src="${imagesBaseUrl}/original${movie.backdrop_path}" alt="${movie.title}">
        </div>
        <div class="movie-details info-container">
            <div class="movie-details poster-image">
                <img src="${imagesBaseUrl}/w300${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-details text-container">
                <h1>${movie.title}</h1>
                <p>Data de lançamento: ${formattedReleaseDate}</p>
                <p>Média dos votos: ${movie.vote_average}</p>
                <h2>Sinopse</h2>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    // Insert the new HTML into a specific container in the index.html page
    const container = document.querySelector('.movie-details.all-container');
    container.innerHTML = html;
}