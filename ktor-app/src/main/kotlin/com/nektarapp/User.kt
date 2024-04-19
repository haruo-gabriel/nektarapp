package com.nektarapp

class User (
    // var avatar: ,
    var id: Int,
    var name: String,
    var username: String,
    var email_address: String,
    var password: String,
    var watchlist: Watchlist,
    var favorites: Favorites
) {
    fun show_user_info() {
        println("Name: $name")
        println("Username: $username")
        println("Email Address: $email_address")
    }
}