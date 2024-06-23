// USER REGISTRATION AND LOGIN

export function validateEmail(email) {
    // A more comprehensive email validation regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function validateUsername(username) {
    // Check if the username is not empty and has at least 3 characters
    return username.trim().length >= 3;
}

export function validatePassword(password) {
    // Check if the password is not empty and has at least 8 characters
    return password.trim().length >= 3;
}

export async function registerUser(email, password, name) {
    try {
        const response = await fetch('http://localhost:8080/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })

        console.log('Registration response: ', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Registration successful: ', data);
        return data;
    } catch (error) {
        console.error('Registration failed: ', error);
        throw error;
    }
}

export async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:8080/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        console.log('Login response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function getUserDetailsByEmail(email) {
    try {
        const response = await fetch(`http://localhost:8080/user/${email}`, {
            method: 'GET'
        });

        console.log('User details response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('User details data:', data);
        return data;
    } catch (error) {
        console.error('Error while fetching the user details:', error);
        throw error;
    }
}

// ADD TO FAVORITES, WATCHLIST AND REVIEWS

export async function addFavorite(userEmail, movieId) {
    try {
        const response = await fetch(`http://localhost:8080/v1/users/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                id: movieId
            })
        });
        console.log('Add favorite response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Favorite added:', data);
        return data;
    } catch (error) {
        console.error('Error while adding the favorite:', error);
        throw error;
    }
}

export async function addWatchlist(userEmail, movieId) {
    try {
        const response = await fetch(`http://localhost:8080/v1/users/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                id: movieId
            })
        });
        console.log('Add watchlist response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Watchlist added:', data);
        return data;
    } catch (error) {
        console.error('Error while adding the watchlist:', error);
        throw error;
    }
}

// REMOVE FROM FAVORITES, WATCHLIST AND REVIEWS

export async function removeFavorite(email, movieId) {
    try {
        const response = await fetch(`http://localhost:8080/favoritesDelete/${email}/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, movieId})
        });
        console.log('Remove favorite response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Favorite removed:', data);
        return data;
    } catch (error) {
        console.error('Error while removing the favorite:', error);
        throw error;
    }

}

export async function addReview(email, movieId, star, text) {
    try {
        const response = await fetch(`http://localhost:8080/v1/reviews/addReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, movieId, star, text})
        });
        console.log('Add review response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Review added:', data);
        return data;
    } catch (error) {
        console.error('Error while adding the review:', error);
        throw error;
    }
}

// GET FAVORITES, WATCHLIST AND REVIEWS

export async function getFavorites(email) {
    try {
        const response = await fetch(`http://localhost:8080/user/${email}/favorites`, {
            method: 'GET'
        });

        console.log('Favorites response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Favorites data:', data);
        return data;
    } catch (error) {
        console.error('Error while fetching the favorites:', error);
        throw error;
    }
}

export async function getWatchlist(email) {
    try {
        const response = await fetch(`http://localhost:8080/user/${email}/watchlist`, {
            method: 'GET'
        });

        console.log('Watchlist response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Watchlist data:', data);
        return data;
    } catch (error) {
        console.error('Error while fetching the watchlist:', error);
        throw error;
    }
}

export async function getReviewsFromUser(email) {
    try {
        const response = await fetch(`http://localhost:8080/v1/reviews/getReviews/${email}`, {
            method: 'GET'
        });

        console.log('Reviews response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Reviews data:', data);
        return data;
    } catch (error) {
        console.error('Error while fetching the reviews:', error);
        throw error;
    }
}