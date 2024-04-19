package com.nektarapp

abstract class MovieCollection {
    protected var movies: MutableList<Movie> = mutableListOf()

    protected fun add_movie(movie: Movie) {
        movies.add(movie)
    }

    protected fun remove_movie(movie: Movie) {
        movies.remove(movie)
    }
}

class Watchlist : MovieCollection

class Favorites : MovieCollection
