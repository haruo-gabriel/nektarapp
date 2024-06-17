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
        <ul>
            <li id="logo-name"><b><a href="index.html">NektarApp</a></b></li>
            <li><a href="profile.html">Perfil</a></li>
            <li><a href="login.html">Entrar</a></li>
        </ul>
        <form action="search.html" method="get">
            <input type="search" name="q" placeholder="Pesquisar...">
            <input type="submit" value="Ir">
        </form>
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