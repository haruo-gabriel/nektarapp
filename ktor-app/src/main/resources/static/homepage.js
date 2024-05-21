import { apiUrl, token, imagesBaseUrl } from "./constants.js";

loadHomePage().catch(error => console.error(error));

async function loadHomePage() {
    const popularMovies = await fetchPopularMovies();
    populatePopularMoviesHtml(popularMovies);
}

async function fetchPopularMovies(){
    const url = `${apiUrl}/movie/popular?language=pt-br&page=1`;

    // Check if the Cache API is available
    if ('caches' in window) {
        // Define a name for your cache
        const cacheName = 'popular-movies-cache';
        // Open the cache
        const cache = await caches.open(cacheName);
        // Check if the data is in the cache
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            // If the data is in the cache, use it
            const data = await cachedResponse.json();
            return data.results;
        }
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    const response = await fetch(url, options);

    // Clone the response
    const responseClone = response.clone();

    // Check if the Cache API is available
    if ('caches' in window) {
        // Define a name for your cache
        const cacheName = 'popular-movies-cache';
        // Open the cache
        const cache = await caches.open(cacheName);
        // Add the response to the cache
        await cache.put(url, responseClone);
    }

    const data = await response.json();
    return data.results;
}

function populatePopularMoviesHtml(movies){
    // Populate the background image of the paragraph container with the backdrop of the first movie
    const firstMovie = movies[0];
    const backdropUrl = imagesBaseUrl + '/original' + firstMovie.backdrop_path;
    const backdropImage = document.querySelector('.banner-backdrop');
    backdropImage.src = backdropUrl;

    // Populates the carousel with the posters of popular movies
    const carousel = document.getElementById('popular-movies');
    carousel.innerHTML = ''; // Clear the carousel before populating it
    movies.forEach(movie => {
        const img = document.createElement('img');
        img.src = imagesBaseUrl + '/w200' + movie.poster_path;
        img.addEventListener('click', () => {
            localStorage.setItem('currentMovie', JSON.stringify(movie));
            window.location.href = 'movie-details.html';
        });
        carousel.appendChild(img);
    });
}