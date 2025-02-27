import {generateReviewHTML, imagesBaseUrl, populateExampleReviews} from "./common.js";
import {initializeCommonHtml} from "./common.js";
import {
    addFavorite,
    addReview,
    addWatchlist,
    getFavorites, getReviewsFromMovieId,
    getWatchlist,
    removeFavorite,
    removeWatchlist
} from "./user.js"

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

        const reviewsContainer = document.getElementById('reviews-list');
        // populateReviews(reviewsContainer, currentMovie.id).catch(error => console.error(error));
        populateExampleReviews(reviewsContainer, 5);

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
                    <button id="favorite-button"">&#10084</button>
                    <button id="watchlist-button">&#9673</button>
                    <p>Data de lançamento: ${formattedReleaseDate}</p>
                    <p>Média dos votos (TMDB): ${movie.vote_average} (${movie.vote_count} votos)</p>
                </div>
                <h2>Sinopse</h2>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    const container = document.querySelector('.movie-details-container');
    container.innerHTML = html;

    const userEmail = localStorage.getItem('userEmail');

    // Initialize the color of the favorite button
    const favoriteButton = document.getElementById('favorite-button');
    const favorites = await getFavorites(userEmail);
    if (favorites.includes(movie.id)) {
        favoriteButton.classList.add('favorited');
    } else {
        favoriteButton.classList.remove('favorited');
    }

    // Initialize the color of the watchlist button
    const watchlistButton = document.getElementById('watchlist-button');
    const watchlist = await getWatchlist(userEmail);
    if (watchlist.includes(movie.id)) {
        watchlistButton.classList.add('watchlisted');
    } else {
        watchlistButton.classList.remove('watchlisted');
    }

    // Add event listeners to the favorite and watchlist buttons
    favoriteButton.addEventListener('click', async function () {
        await toggleFavorite(userEmail, movie.id, favoriteButton);
    });
    watchlistButton.addEventListener('click', async function () {
        await toggleWatchlist(userEmail, movie.id, watchlistButton);
    });
}

async function toggleFavorite(userEmail, movieId, favoriteButton) {
    const favorites = await getFavorites(userEmail);

    if (favorites.includes(movieId)) {
        await removeFavorite(userEmail, movieId);
        favoriteButton.classList.remove('favorited'); // Change the heart icon to black
    } else {
        await addFavorite(userEmail, movieId);
        favoriteButton.classList.add('favorited'); // Change the heart icon to red
    }
}

async function toggleWatchlist(userEmail, movieId, watchlistButton) {
    const watchlist = await getWatchlist(userEmail);

    if (watchlist.includes(movieId)) {
        await removeWatchlist(userEmail, movieId);
        watchlistButton.classList.remove('watchlisted'); // Change the heart icon to black
    } else {
        await addWatchlist(userEmail, movieId);
        watchlistButton.classList.add('watchlisted'); // Change the heart icon to red
    }
}

/*
async function populateReviews(container, movieId) {
    const reviews = await getReviewsFromMovieId(movieId);

    reviews.forEach(review => {
        container.innerHTML += generateReviewHTML(review.email, review.movieid, review.text, review.star);

        // Add an event listener to each delete button
    });
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