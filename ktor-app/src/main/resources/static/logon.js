import {initializeCommonHtml, validateEmail, validateUsername, validatePassword} from "./common.js";

window.onload = function() {
    initializeCommonHtml();

    // Add an event listener to the logon form
    document.getElementById('logonForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        handleLogon(email, username, password);
    });
};


async function sendAuthRequest(url, userData) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        // Save username and email in local storage
        localStorage.setItem('username', userData.username);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'homepage.html';
    } else {
        console.error('Authentication failed');
    }
}

async function handleLogon(email, username, password) {
    const errorDiv = document.getElementById('errorDiv');
    const errorMessage = document.getElementById('errorMessage');

    if (!validateEmail(email)) {
        errorMessage.innerText = 'Email inválido';
        errorDiv.style.display = 'flex';
        console.error('Logon failed: Invalid email');
        return;
    }
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
        await sendAuthRequest('your-logon-endpoint', {email, username, password});
        console.log('Logon successful');
    } catch (error) {
        console.error('Logon failed');
    }
}