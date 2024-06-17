package com.nektarapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class ReviewRequest(
    val email: String,
    val movieid: Int,
    val star: Int,
    val text: String
)
