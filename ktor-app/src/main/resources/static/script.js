const sliders = document.querySelector(".carouselbox")
var scrollPerClick;
var ImagePadding = 20;
const api_key = "9c12633bacf10504877fac5ed46d1c16";

// showMovieData();
window.onload = fetchPopularMovieData;

/*
async function showMovieData(){
    // const api_key = "9c12633bacf10504877fac5ed46d1c16";

    var result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_keys="+
        api_key+
        "sort_by=popularity.desc"
    );

    result = result.data.results;

    result.map(function (cur, index){
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`
        )
    })

    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}
*/

async function fetchPopularMovieData(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyNjMzYmFjZjEwNTA0ODc3ZmFjNWVkNDZkMWMxNiIsInN1YiI6IjY2MDQ5OGZmZDdjZDA2MDE2NDg3YmJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mOdCpu98YOj5VA2f3PLUXCwXXtVYs0w2zzLjJk3oZBQ'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            data.results.forEach(movie => {
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
                carousel.appendChild(img);
            });
        })
        .catch(err => console.error(err));
}
