package com.nektarapp

class Reviews (
    val movieId: Int,
    val id: Int,
    val page: Int,
    var results: MutableList<Review>,
    val totalPages: Int,
    val totalResults: Int
) {

}
