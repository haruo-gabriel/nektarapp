import { apiUrl, imagesBaseUrl, TmdbGetOptions } from "./common.js";
import {initializeCommonHtml, populateCarousel} from "./common.js";

initializeCommonHtml();
loadHomePage().catch(error => console.error(error));

window.onload = function() {
}

async function loadHomePage() {
    const popularMovies = await fetchMovies('popular');
    const upcomingMovies = await fetchMovies('upcoming');
    populateBannerImage(popularMovies);
    populateCarousel(popularMovies, 'popular-movies');
    populateCarousel(upcomingMovies, 'upcoming-movies');
}

async function fetchMovies(id){
    const url = `${apiUrl}/movie/${id}?language=pt-br&page=1`;

    // Check if the Cache API is available
    if ('caches' in window) {
        // Define a name for your cache
        const cacheName = `${id}-movies-cache`;
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

    // Fetch the data from the API
    const response= await fetch(url, TmdbGetOptions);
    // Clone the response
    const responseClone = response.clone();

    // Check if the Cache API is available
    if ('caches' in window) {
        // Define a name for your cache
        const cacheName = `${id}-movies-cache`;
        // Open the cache
        const cache = await caches.open(cacheName);
        // Add the response to the cache
        await cache.put(url, responseClone);
    }

    const data = await response.json();
    return data.results;
}

function populateBannerImage(movies){
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    const backdropUrl = imagesBaseUrl + '/original' + randomMovie.backdrop_path;
    const bannerImage = document.getElementById('banner-backdrop');
    bannerImage.src = backdropUrl;
}
