export function getUsernameByEmail(email) {
    fetch(`http://localhost:8080/user/${email}`, {
        method: 'GET'
    })
        .then(response => {
            console.log('Response: ', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data: ', data);
            return data.name;
        })
        .catch(error => {
            console.error('An error occurred while fetching the username:', error);
            throw error;
        });
}