import { imagesBaseUrl } from "./constants.js";
import { initializeCommonHtml } from "./common.js";

window.onload = async function() {
    // Initialize the page
    initializeCommonHtml();
    // Retrieve the current movie's data from localStorage
    const currentMovieData = localStorage.getItem('currentMovie')
    if (currentMovieData) {
        const currentMovie = JSON.parse(currentMovieData);
        console.log(currentMovie);
        // Set the page title to the movie's title
        document.title = currentMovie.title;
        // Populate the page with the movie details
        populateMovieDetails(currentMovie).catch(error => console.error(error));
        // Populate the page with the reviews for the movie
        populateReviews(currentMovie.id).catch(error => console.error(error));
    } else {
        console.error('No movie data found in localStorage');
    }
}

async function populateMovieDetails(movie) {
    // Create a Date object from the release_date string
    const releaseDate = new Date(movie.release_date);
    // Format the release date as dd/mm/yyyy
    const formattedReleaseDate = releaseDate.getDate() + '/' + (releaseDate.getMonth() + 1) + '/' + releaseDate.getFullYear();

    // Create the HTML template
    let html = `
        <img id="background-image" src="${imagesBaseUrl}/original${movie.backdrop_path}" alt="${movie.title}">
        <div class="info-container">
            <img id="poster-image" src="${imagesBaseUrl}/w300${movie.poster_path}" alt="${movie.title}">
            <div class="text-container">
                <h1 id="movie-title">${movie.title}</h1>
                <div class="general-info">
                    <p>Data de lançamento: ${formattedReleaseDate}</p>
                    <p>Média dos votos (TMDB): ${movie.vote_average} (${movie.vote_count} votos)</p>
                </div>
                <h2>Sinopse</h2>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    // Insert the new HTML into a specific container in the homepage.html page
    const container = document.querySelector('.movie-details-container');
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

    // Insert the new HTML into a specific container in the homepage.html page
    const container = document.querySelector('.reviews-container');
    container.innerHTML = reviewsHTML;
}