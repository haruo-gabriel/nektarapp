package com.nektarapp

abstract class MovieCollection {
    private var movies: MutableList<Movie> = mutableListOf()

    protected fun addMovie(movie: Movie) {
        movies.add(movie)
    }

    protected fun removeMovie(movie: Movie) {
        movies.remove(movie)
    }
}

class Watchlist : MovieCollection()

class Favorites : MovieCollection()
