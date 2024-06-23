import {getUserDetailsByEmail, removeReview} from "./user.js";

export const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyNjMzYmFjZjEwNTA0ODc3ZmFjNWVkNDZkMWMxNiIsInN1YiI6IjY2MDQ5OGZmZDdjZDA2MDE2NDg3YmJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOdCpu98YOj5VA2f3PLUXCwXXtVYs0w2zzLjJk3oZBQ';
export const TmdbGetOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
};
export const apiUrl = 'https://api.themoviedb.org/3';
export const imagesBaseUrl = 'https://image.tmdb.org/t/p';
export const queryOptions = '&include_adult=false&language=pt-BR';

export function initializeCommonHtml() {
    generateNavbar();
    generateFooter();
}

function generateNavbar() {
    document.getElementById('navbar-container').innerHTML =  `
    <nav>
        <div id="navbar-left">
            <b><a id="logo-name" href="homepage.html">NektarApp</a></b>
        </div>
        <div id="navbar-right">
            <a id="login-button" href="login.html">Entrar</a>
            <a id="logout-button">Sair</a>
            <a id="profile-button" href="profile.html">Perfil</a>
            <form action="search.html" method="get">
                <input type="search" name="q" placeholder="Pesquisar...">
                <input type="submit" value="Ir">
            </form>
        </div>
    </nav>
    `;

    // Add an event listener to the search form
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.querySelector('input[type="search"]').value;
        window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`
    });

    const token = localStorage.getItem('isLoggedIn');
    if (token) {
        const logoutButton = document.getElementById('logout-button');
        logoutButton.style.display = 'block';
        // Add an event listener to the logout button
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'homepage.html';
        });

        const loginButton = document.getElementById('login-button');
        loginButton.style.display = 'none';

        const profileButton = document.getElementById('profile-button');
        profileButton.style.display = 'block';

    } else {
        const loginButton = document.getElementById('login-button');
        loginButton.style.display = 'block';

        const logoutButton = document.getElementById('logout-button');
        logoutButton.style.display = 'none';

        const profileButton = document.getElementById('profile-button');
        profileButton.style.display = 'none';
    }
}

function generateFooter() {
    document.getElementById('footer-container').innerHTML = `
    <footer>
        <p>2024 NektarApp</p>
    </footer>
    `;
}

export function populateCarousel(movies, carouselId){
    console.log('Populating carousel with movies:', movies);
    const carousel = document.getElementById(carouselId);
    carousel.innerHTML = '';
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

export async function getMoviesFromMovieIds(movieIds) {
    const movies = [];
    for (let movieId of movieIds) {
        const movieData = await getMovieById(movieId);
        movies.push(movieData);
    }
    return movies;
}

function getMovieById(movieId) {
    return fetch(`${apiUrl}/movie/${movieId}?language=pt-BR`, TmdbGetOptions)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export async function getMovieTitleById(movieId) {
    const movie = await getMovieById(movieId);
    return movie.title;
}

// REVIEW

export async function generateReviewHTML(userEmail, movieId, text, star) {
    const userName = (await getUserDetailsByEmail(userEmail)).name;
    const movieTitle = await getMovieTitleById(movieId);

    return  `
    <div class="review"
    data-userEmail="${userEmail}"
    data-movieId="${movieId}"
    data-star="${star}"
    data-text="${text}">
        <div class="review-username-title-container">
            <p class="review-username">${userName}</p>
            <p class="review-title">para o filme <i>${movieTitle}</i></p>
            <button class="delete-review-button">&#128465;</button>
        </div>
        <p class="review-rating">Nota: ${star} de 5</p>
        <p class="review-text">${text}</p>
    </div>
    `;
}

/*
async function clickDeleteReviewButton(container, userEmail, movieId, star, text) {
    console.log('Delete review button clicked:', userEmail, movieId, star, text);
    try {
        await removeReview(userEmail, movieId, star, text);
        // Remove the review from the HTML
    } catch (error) {
        console.error('Error while removing the review:', error);
    }
}
*/


export function populateExampleReviews(container, numberOfReviews) {
    for (let i = 0; i < numberOfReviews; i++) {
        const userName = 'UsuarioTeste' + (i + 1);
        const movieTitle = 'FilmeTeste';
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin fringilla leo, non porttitor erat eleifend quis. Pellentesque erat mi, sodales eu libero sit amet, consequat hendrerit tortor. Vivamus scelerisque vel magna varius laoreet. Fusce sagittis urna urna, eu molestie lectus ultricies a. Nulla purus tortor, porttitor in iaculis quis, pretium eu diam. Duis quis molestie urna, vitae luctus ante. Mauris cursus commodo elit, nec varius nisl mattis vitae. Nam congue dui a placerat pellentesque. Proin vitae turpis quis lacus euismod gravida ut et nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer quis tempus risus. Vestibulum id dui et urna sagittis cursus.';
        const star = Math.floor(Math.random() * 5) + 1;
        container.innerHTML += `
        <div class="review">
            <div class="review-username-title-container">
                <p class="review-username">${userName}</p>
                <p class="review-title">para o filme <i>${movieTitle}</i></p>
                <button class="delete-review-button">&#128465;</button>
            </div>
            <p class="review-rating">Nota: ${star} de 5</p>
            <p class="review-text">${text}</p>
        </div>
        `;
    }
}