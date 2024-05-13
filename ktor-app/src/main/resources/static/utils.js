function generateNavbar() {
    return `
    <nav>
        <ul>
            <li id="logo-name"><b><a href="index.html">NektarApp</a></b></li>
            <li><a href="index.html">Home</a></li>
            <li><a href="login.html">Entrar</a></li>
        </ul>
        <form action="search.html" method="get">
            <input type="search" name="q" placeholder="Search...">
                <input type="submit" value="Go">
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

document.getElementById('navbar-container').innerHTML = generateNavbar();
document.getElementById('footer-container').innerHTML = generateFooter();