import {initializeCommonHtml} from "./common.js";

window.onload = function() {
    initializeCommonHtml();
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
        window.location.href = 'homepage.html';
    } else {
        console.error('Authentication failed');
    }
}

// Add an event listener to the logon form
document.getElementById('logonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    handleLogon(email, username, password);
});

function handleLogon(email, username, password) {
    // Validate the email
    if (!validateEmail(email)) {
        console.error('Email inválido');
        return;
    }
    // Validate the username
    if (!validateUsername(username)) {
        console.error('Nome de usuário inválido (mínimo de 3 caracteres)');
        return;
    }
    // Validate the password
    if (!validatePassword(password)) {
        console.error('Senha inválida (mínimo de 8 caracteres)');
        return;
    }

    // If all validations are successful, log the user in
    sendAuthRequest('your-logon-endpoint', {email, username, password})
        .then(() => {
            console.log('Logon successful');
        })
}

function validateEmail(email) {
    // A more comprehensive email validation regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validateUsername(username) {
    // Check if the username is not empty and has at least 3 characters
    return username.trim().length >= 3;
}

function validatePassword(password) {
    // Check if the password is not empty and has at least 8 characters
    return password.trim().length >= 8;
}