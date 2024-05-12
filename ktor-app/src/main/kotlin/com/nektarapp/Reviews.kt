package com.nektarapp

class Reviews (
    val movie_id: Int,
    val id: Int,
    val page: Int,
    var results: MutableList<Review>,
    val total_pages: Int,
    val total_results: Int
) {

}
