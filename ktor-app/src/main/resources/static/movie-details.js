import { imagesBaseUrl } from "./constants.js";

window.onload = function() {
    // Retrieve the current movie's data from localStorage
    const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
    // Populate the page with the movie details
    populateMovieDetails(currentMovie).catch(error => console.error(error));
    // Populate the page with the reviews for the current movie
    populateReviews(currentMovie.id).catch(error => console.error(error));
}

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

async function populateReviews(movieId) {
    // Fetch the reviews for the current movie
    const response = await fetch(`/api/movies/${movieId}/reviews`);
    const reviews = await response.json();

    // Create the HTML template for the reviews
    let reviewsHTML = '';
    reviews.forEach(review => {
        reviewsHTML += generateReviewHTML(review.username, review.creationDate, review.reviewText);
    });

    // Insert the new HTML into a specific container in the index.html page
    const container = document.querySelector('.movie-details.reviews-container');
    container.innerHTML = reviewsHTML;
}