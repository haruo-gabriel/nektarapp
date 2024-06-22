import {initializeCommonHtml} from "./common.js";
import {registerUser, validateEmail, validateUsername, validatePassword} from "./user.js";

window.onload = function() {
    initializeCommonHtml();

    // Add an event listener to the logon form
    document.getElementById('logonForm').addEventListener('submit',
        async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            await handleLogon(email, username, password);
        });
};

async function handleLogon(email, username, password) {
    try {
        if (!validateEmail(email)) {
            console.error('Logon failed: Invalid email');
            throw new Error('Email inválido');
        }
        if (!validateUsername(username)) {
            console.error('Logon failed: Invalid username (minimum of 3 characters)');
            throw new Error('Usuário inválido (mínimo de 3 caracteres)');
        }
        if (!validatePassword(password)) {
            console.error('Logon failed: Invalid password (minimum of 8 characters)');
            throw new Error('Senha inválida (mínimo de 3 caracteres)');
        }

        const data = await registerUser(email, password, username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', username);

        window.location.href = 'homepage.html';
    } catch (error) {
        const errorDiv = document.getElementById('errorDiv');
        const errorMessage = document.getElementById('errorMessage');
        errorDiv.style.display = 'block';
        errorMessage.innerText = error.message;
    }
}