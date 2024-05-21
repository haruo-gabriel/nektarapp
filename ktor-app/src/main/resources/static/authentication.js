document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);
});

document.getElementById('logonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    handleLogon(email, username, password);
});

function handleLogon(email, username, password) {
    // Validate the email
    if (!validateEmail(email)) {
        console.error('Invalid email');
        return;
    }

    // Validate the username
    if (!validateUsername(username)) {
        console.error('Invalid username');
        return;
    }

    // Validate the password
    if (!validatePassword(password)) {
        console.error('Invalid password');
        return;
    }

    // If all validations are successful, log the user in
    console.log('Logon successful');
}

function validateEmail(email) {
    // A simple email validation regex
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

function validateUsername(username) {
    // Check if the username is not empty
    return username.trim() !== '';
}

function validatePassword(password) {
    // Check if the password is not empty
    return password.trim() !== '';
}