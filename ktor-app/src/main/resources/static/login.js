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

// Add an event listener to the login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace 'your-login-endpoint' with the URL of your login endpoint
    sendAuthRequest('your-login-endpoint', { username, password })
        .then(() => {
            console.log('Login successful');
        });
});
