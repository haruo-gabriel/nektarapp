import {imagesBaseUrl, populateExampleReviews} from "./common.js";
import {initializeCommonHtml} from "./common.js";
import {addFavorite, addReview, getFavorites, removeFavorite} from "./user.js"

window.onload = async function() {
    // Initialize the page
    initializeCommonHtml();

    // Retrieve the current movie's data from localStorage
    const currentMovieData = localStorage.getItem('currentMovie')
    if (currentMovieData) {
        const currentMovie = JSON.parse(currentMovieData);
        console.log('Current movie:', currentMovie);
        document.title = currentMovie.title;

        populateMovieDetails(currentMovie).catch(error => console.error(error));

        // populateReviews(currentMovie.id).catch(error => console.error(error));
        populateExampleReviews(5);

        // Add an event listener to the review form
        const reviewForm = document.getElementById('review-form');
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitReview();
        });
    } else {
        console.error('No movie data found in localStorage');
    }
}

async function toggleFavorite(movieId) {
    const userEmail = localStorage.getItem('userEmail');
    const favorites = await getFavorites(userEmail);
    const favoriteButton = document.getElementById('favorite-button');

    if (favorites.includes(movieId)) {
        await removeFavorite(userEmail, movieId);
        favoriteButton.classList.remove('favorited'); // Change the heart icon to black
    } else {
        await addFavorite(userEmail, movieId);
        favoriteButton.classList.add('favorited'); // Change the heart icon to red
    }
}

async function populateMovieDetails(movie) {
    const releaseDate = new Date(movie.release_date);
    const formattedReleaseDate = releaseDate.getDate() + '/' + (releaseDate.getMonth() + 1) + '/' + releaseDate.getFullYear();

    let html = `
        <img id="background-image" src="${imagesBaseUrl}/original${movie.backdrop_path}" alt="${movie.title}">
        <div class="info-container">
            <img id="poster-image" src="${imagesBaseUrl}/w300${movie.poster_path}" alt="${movie.title}">
            <div class="text-container">
                <h1 id="movie-title">${movie.title}</h1>
                <div class="general-info">
                    <button id="favorite-button" onclick="toggleFavorite(${movie.id})">&#10084</button>
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

/*
async function populateReviews(movieId) {
    // Fetch the reviews for the current movie
    const reviews = await getReviewsForMovie(movieId);

    // Create the HTML template for the reviews
    let reviewsHTML = '';
    reviews.forEach(review => {
        reviewsHTML += generateReviewHTML(review.username, review.creationDate, review.reviewText);
    });

    // Insert the new HTML into a specific container in the homepage.html page
    const container = document.querySelector('.reviews-container');
    container.innerHTML = reviewsHTML;
}
*/

function submitReview() {
    const userEmail = localStorage.getItem('userEmail');
    const movieId = JSON.parse(localStorage.getItem('currentMovie')).id;
    const star = document.getElementById('review-form-rating').value;
    const text = document.getElementById('review-form-text').value;

    addReview(userEmail, movieId, star, text)
        .then(() => {
            console.log('Review added successfully');
            // Refresh the page to show the new review
            location.reload();
        })
        .catch(error => console.error(error));
}