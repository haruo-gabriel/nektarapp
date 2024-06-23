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

export function generateReviewHTML(userName, movieTitle, text, star) {
    return `
    <div class="review">
        <div class="review-username-title-container">
            <p class="review-username">${userName}</p>
            <p class="review-title">para o filme <i>${movieTitle}</i></p>
        </div>
        <p class="review-rating">Nota: ${star} de 5</p>
        <p class="review-text">${text}</p>
    </div>
    `;
}

function generateExampleReviewsHTML(numberOfReviews) {
    let reviewsHTML = '';
    for (let i = 0; i < numberOfReviews; i++) {
        reviewsHTML += generateReviewHTML(
            'UsuarioTeste' + (i + 1), // Adjust username for uniqueness
            'FilmeTeste' + (i + 1),   // Adjust movie title for uniqueness
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin fringilla leo, non porttitor erat eleifend quis. Pellentesque erat mi, sodales eu libero sit amet, consequat hendrerit tortor. Vivamus scelerisque vel magna varius laoreet. Fusce sagittis urna urna, eu molestie lectus ultricies a. Nulla purus tortor, porttitor in iaculis quis, pretium eu diam. Duis quis molestie urna, vitae luctus ante. Mauris cursus commodo elit, nec varius nisl mattis vitae. Nam congue dui a placerat pellentesque. Proin vitae turpis quis lacus euismod gravida ut et nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer quis tempus risus. Vestibulum id dui et urna sagittis cursus.',
            Math.floor(Math.random() * 5) + 1
        );
    }
    return reviewsHTML;
}

export function populateExampleReviews() {
    const reviewsContainer = document.getElementById('reviews-list');
    reviewsContainer.innerHTML = generateExampleReviewsHTML(5);
}