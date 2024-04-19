package com.nektarapp

class Review (
    var author: Int, // Id of User
    var content: String,
    var created_at: String,
    var id: Int,
    var movie_id: Int,
    var rating: Int
) {

}

class Reviews (
    var movie_id: Int,
    var id: Int,
    var page: Int,
    var results: List<Review>,
    var total_pages: Int,
    var total_results: Int
) {

}