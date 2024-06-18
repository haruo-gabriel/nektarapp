import {initializeCommonHtml, validatePassword, validateUsername} from "./common.js";

window.onload = function() {
    initializeCommonHtml();

    // Add an event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        handleLogin(username, password);
    });
};

async function checkLoginAttempt(username, password) {
    fetch('v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('authToken', data.token);
        window.location.href = 'homepage.html';
    })
    .catch(error => {
        console.error('Authentication failed: ', error);
    });
}

async function handleLogin(username, password) {
    const errorDiv = document.getElementById('errorDiv');
    const errorMessage = document.getElementById('errorMessage');

    if (!validateUsername(username)) {
        errorMessage.innerText = 'Usuário inválido (mínimo de 3 caracteres)';
        errorDiv.style.display = 'flex';
        console.error('Logon failed: Invalid username (minimum of 3 characters)');
        return;
    }
    if (!validatePassword(password)) {
        errorMessage.innerText = 'Senha inválida (mínimo de 8 caracteres)';
        errorDiv.style.display = 'flex';
        console.error('Logon failed: Invalid password (minimum of 8 characters)');
        return;
    }

    // Hide the error message if all validations are successful
    errorDiv.style.display = 'none';

    // If all validations are successful, log the user in
    try {
        await checkLoginAttempt(username, password);
        console.log('Login successful');
    } catch (error) {
        console.error('Login failed');
    }
}

