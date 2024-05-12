const apiUrl = 'https://api.themoviedb.org/3'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyNjMzYmFjZjEwNTA0ODc3ZmFjNWVkNDZkMWMxNiIsInN1YiI6IjY2MDQ5OGZmZDdjZDA2MDE2NDg3YmJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOdCpu98YOj5VA2f3PLUXCwXXtVYs0w2zzLjJk3oZBQ'

window.onload = function() {
    fetchPopularMovieData();
}

async function fetchPopularMovieData(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    fetch(`${apiUrl}/movie/popular?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => {
            // Populate the background image of the paragraph container with the backdrop of the first movie
            // const firstMovie = data.results[0];
            // const backdropUrl = 'https://image.tmdb.org/t/p/original/' + firstMovie.backdrop_path;
            // const paragraphContainer = document.querySelector('.paragraph-container');
            // paragraphContainer.style.backgroundImage = `url(${backdropUrl})`;

            const firstMovie = data.results[0];
            const backdropUrl = 'https://image.tmdb.org/t/p/original/' + firstMovie.backdrop_path;
            const backgroundImageImg = document.querySelector('.background-image');
            backgroundImageImg.src = backdropUrl;

            // Populates the carousel with the posters of popular movies
            const carousel = document.getElementById('popular-movies');
            data.results.forEach(movie => {
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
                carousel.appendChild(img);
            });
        })
        .catch(err => console.error(err));
}

