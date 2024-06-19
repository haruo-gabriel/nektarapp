import {initializeCommonHtml} from "./common.js";
import {getUsernameByEmail} from "./user.js";

window.onload = function() {
    initializeCommonHtml();

    // Add an event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        handleLogin(email, password)
            .then()
            .catch(error => console.error(error));

    });
};

async function handleLogin(email, password) {
    const errorDiv = document.getElementById('errorDiv');
    const errorMessage = document.getElementById('errorMessage');

    console.log(JSON.stringify({email, password}));

    fetch('http://localhost:8080/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(response => {
            console.log('Login response: ', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Authentication successful: ', data);
            localStorage.setItem('token', 'true');
            localStorage.setItem('userEmail', email);
        })
        .then(() => {
            errorDiv.style.display = 'none';
            //     window.location.href = 'homepage.html';
        })
        .catch(error => {
            console.error('Authentication failed: ', error);
            errorDiv.style.display = 'block';
            errorMessage.innerText = 'Email ou senha inválidos. Tente novamente.';
        });
}

