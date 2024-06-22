import {
    getMoviesFromMovieIds,
    getMovieTitleById,
    initializeCommonHtml,
    populateCarousel,
    populateExampleReviews
} from "./common.js";
import {getFavorites, getReviewsFromUser, getWatchlist} from "./user.js";

window.onload = function() {
    initializeCommonHtml();
    setPageTitle();
    setUsernameHTML();
    // populateUserFavorites();
    // populateUserWatchlist();
    // populateReviews();
    populateExampleReviews();
};

function setPageTitle() {
    document.title = localStorage.getItem('userName') + ' - NektarApp';
}

function setUsernameHTML() {
    const usernameHTML = document.getElementById('username');
    usernameHTML.innerText = '@' + localStorage.getItem('userName');
    // usernameHTML.innerText = '@' + 'usuarioTeste';
}

async function populateUserFavorites() {
    const userEmail = localStorage.getItem('userEmail');
    try {
        const favoritesIds = await getFavorites(userEmail);
        const favorites = await getMoviesFromMovieIds(favoritesIds);
        populateCarousel(favorites, 'favorites-carousel');
    } catch (error) {
        console.error('Error while fetching the favorites:', error);
        throw error;
    }
}

async function populateUserWatchlist() {
    const userEmail = localStorage.getItem('userEmail');
    try {
        const watchlistIds = await getWatchlist(userEmail);
        const watchlist = await getMoviesFromMovieIds(watchlistIds);
        populateCarousel(watchlist, 'watchlist-carousel');
    } catch (error) {
        console.error('Error while fetching the watchlist:', error);
        throw error;
    }
}

async function populateReviews() {
    const userEmail = localStorage.getItem('userEmail');
    try {
        const reviews = await getReviewsFromUser(userEmail);
        const reviewsContainer = document.getElementById('reviews-list');
        reviewsContainer.innerHTML = '';
        for (const review of reviews) {
            const movieTitle = await getMovieTitleById(review.movieid);
            const reviewHTML = generateReviewHTML(movieTitle, review.text, review.star);
            reviewsContainer.innerHTML += reviewHTML;
        }
    } catch (error) {
        console.error('Error while fetching the reviews:', error);
        throw error;
    }
}

