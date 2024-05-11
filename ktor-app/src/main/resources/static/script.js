const sliders = document.querySelector(".carouselbox")
var scrollPerClick;
var ImagePadding = 20;

showMovieData();

async function showMovieData(){
    const api_key = "9c12633bacf10504877fac5ed46d1c16";

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

