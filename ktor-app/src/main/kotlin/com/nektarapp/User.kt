package com.nektarapp

class User (
    private var id: Int,
    private var name: String,
    private var username: String,
    private var emailAddress: String,
    private var password: String,
    private var watchlist: Watchlist,
    private var favorites: Favorites
) {
    fun showUserInfo() {
        println("Name: $name")
        println("Username: $username")
        println("Email Address: $emailAddress")
    }

    fun changeEmailAddress(newEmailAddress: String) {
        emailAddress = newEmailAddress
    }

    fun changePassword(newPassword: String) {
        password = newPassword
    }

    fun showWatchlist() {
        watchlist.showMovies()
    }

    fun addToWatchlist(movie: Movie) {
        watchlist.addMovie(movie)
    }

    fun removeFromWatchlist(movie: Movie) {
        watchlist.removeMovie(movie)
    }

    fun showFavorites() {
        favorites.showMovies()
    }

    fun addToFavorites(movie: Movie) {
        favorites.addMovie(movie)
    }

    fun removeFromFavorites(movie: Movie) {
        favorites.removeMovie(movie)
    }
}