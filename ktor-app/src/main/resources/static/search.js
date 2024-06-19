import {apiUrl, TmdbGetOptions, imagesBaseUrl, queryOptions} from "./common.js";
import {initializeCommonHtml} from "./common.js";

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
        .catch(error => console.error(error));
};

function fetchSearchResults(query) {
    // Make a fetch request to the TMDB API with the search query
    return fetch(`${apiUrl}/search/movie?query=${query}${queryOptions}&page=1`, TmdbGetOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.error('An error occurred while fetching the search results:', error);
            throw error; // Re-throw the error to allow further chaining
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

export async function getMovieIdByName(movieName) {
    fetchSearchResults(movieName)
        .then(data => {
            return data.results[0].id;
        })
        .catch(error => console.error(error));
}
