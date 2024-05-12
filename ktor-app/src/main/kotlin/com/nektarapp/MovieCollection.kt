package com.nektarapp

abstract class MovieCollection {
    private var movies: MutableList<Movie> = mutableListOf()

    internal fun showMovies() {
        movies.forEach { println(it) }
    }

    internal fun addMovie(movie: Movie) {
        movies.add(movie)
    }

    internal fun removeMovie(movie: Movie) {
        movies.remove(movie)
    }
}

class Watchlist : MovieCollection()

class Favorites : MovieCollection()
