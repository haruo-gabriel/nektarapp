export function initializeCommonHtml() {
    document.getElementById('navbar-container').innerHTML = generateNavbar();
    document.getElementById('footer-container').innerHTML = generateFooter();

    // Add an event listener to the search form
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.querySelector('input[type="search"]').value;
        window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`
    });
}

function generateNavbar() {
    return `
    <nav>
        <div id="navbar-left">
            <b><a id="logo-name" href="homepage.html">NektarApp</a></b>
        </div>
        <div id="navbar-right">
            <a href="login.html">Entrar</a>
            <a href="profile.html">Perfil</a>
            <form action="search.html" method="get">
                <input type="search" name="q" placeholder="Pesquisar...">
                <input type="submit" value="Ir">
            </form>
        </div>
    </nav>
    `;
}

function generateFooter() {
    return `
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
