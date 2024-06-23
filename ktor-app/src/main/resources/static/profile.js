import {
    generateReviewHTML,
    getMoviesFromMovieIds,
    getMovieTitleById,
    initializeCommonHtml,
    populateCarousel,
    populateExampleReviews
} from "./common.js";
import {getFavorites, getReviewsFromUser, getUserDetailsByEmail, getWatchlist, removeReview} from "./user.js";

window.onload = async function () {
    initializeCommonHtml();
    setPageTitle();
    setUsernameHTML();

    const userEmail = localStorage.getItem('userEmail');

    populateUserFavorites().catch(error => console.error(error));
    populateUserWatchlist().catch(error => console.error(error));

    const reviews = await getReviewsFromUser(userEmail);
    populateUserReviews(reviews).catch(error => console.error(error));
    // populateExampleReviews();
};

function setPageTitle() {
    document.title = localStorage.getItem('userName') + ' - NektarApp';
}

function setUsernameHTML() {
    const usernameHTML = document.getElementById('username');
    usernameHTML.innerText = '@' + localStorage.getItem('userName');
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

async function populateUserReviews(reviews) {
    try {
        const reviewsContainer = document.getElementById('reviews-list');
        reviewsContainer.innerHTML = '';
        for (const review of reviews) {
            reviewsContainer.innerHTML += await generateReviewHTML(review.email, review.movieid, review.text, review.star);

            // Add an event listener to each delete button
            // deleteButton.addEventListener('click', async function () {
            //     await removeReview(review.email, review.movieid);
            // });
        }
    } catch (error) {
        console.error('Error while fetching the reviews:', error);
        throw error;
    }
}

