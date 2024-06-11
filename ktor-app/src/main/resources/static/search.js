import {apiUrl, GetOptions, imagesBaseUrl} from "./constants.js";
import {initializeCommonHtml} from "./common.js";

console.log('Search page loaded');

window.onload = function() {
    initializeCommonHtml();

    // Retrieve the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    console.log('Query: ' + query);

    // Substitute the heading to display the search query
    document.getElementById('query-heading').innerHTML = `Resultados para: <em>${query}</em>`;

    // Fetch and display the search results
    fetchSearchResults(query)
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(err => console.error(err));
};

function fetchSearchResults(query) {
    // Make a fetch request to the TMDB API with the search query
    return fetch(`${apiUrl}/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`, GetOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return response;
        });
}

function displaySearchResults(movies) {
    const container = document.querySelector('.search-results-container');

    movies.forEach(movie => {
        const resultHTML = generateResultContainer(movie);

        // Create a new div element
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-container');

        // Set the innerHTML of the new div
        resultElement.innerHTML = resultHTML;

        // Append the new div to the container
        container.appendChild(resultElement);

        // Add the event listener to the result element
        resultElement.addEventListener('click', function(event) {
            localStorage.setItem('currentMovie', JSON.stringify(movie));
            window.location.href = 'movie-details.html';
        });
    });
}

function generateResultContainer(result) {
    const releaseYear = result.release_date.split('-')[0];
    return `
    <a href="movie-details.html?id=${result.id}" style="text-decoration: none; color: inherit;">
        <div class="result-overlay">
            <img src="${imagesBaseUrl}/w300${result.poster_path}" alt="${result.title}">
            <div class="result-text-container">
                <h3>${result.title} (${releaseYear})</h3>
                <h4>Sinopse</h4>
                <p id="result-overview">${result.overview}</p>
            </div>
        </div>
    </a>
    `;
}