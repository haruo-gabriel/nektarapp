import {initializeCommonHtml} from "./common.js";
import {getUserDetailsByEmail, loginUser} from "./user.js";

window.onload = function() {
    initializeCommonHtml();

    // Add an event listener to the login form
    document.getElementById('loginForm').addEventListener('submit',
        async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await handleLogin(email, password);
        });
};

async function handleLogin(email, password) {
    try {
        const data = await loginUser(email, password);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        const userData = await getUserDetailsByEmail(email);
        localStorage.setItem('userName', userData.name);

        window.location.href = 'homepage.html';
    } catch (error) {
        const errorDiv = document.getElementById('errorDiv');
        const errorMessage = document.getElementById('errorMessage');
        errorDiv.style.display = 'block';
        errorMessage.innerText = 'Erro ao realizar login. Tente novamente.';
    }
}



