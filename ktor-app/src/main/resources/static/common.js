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

export function getWindowWidth() {
    return window.innerWidth;
}

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

    const token = localStorage.getItem('token');
    if (token) {
        const logoutButton = document.getElementById('logout-button');
        logoutButton.style.display = 'block';
        // Add an event listener to the logout button
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
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

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

export function validateEmail(email) {
    // A more comprehensive email validation regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function validateUsername(username) {
    // Check if the username is not empty and has at least 3 characters
    return username.trim().length >= 3;
}

export function validatePassword(password) {
    // Check if the password is not empty and has at least 8 characters
    return password.trim().length >= 8;
}

