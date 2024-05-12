const apiUrl = 'https://api.themoviedb.org/3'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyNjMzYmFjZjEwNTA0ODc3ZmFjNWVkNDZkMWMxNiIsInN1YiI6IjY2MDQ5OGZmZDdjZDA2MDE2NDg3YmJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOdCpu98YOj5VA2f3PLUXCwXXtVYs0w2zzLjJk3oZBQ'

window.onload = fetchPopularMovieData;

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
            const carousel = document.getElementById('popular-movies');
            data.results.forEach(movie => {
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
                carousel.appendChild(img);
            });
        })
        .catch(err => console.error(err));
}
