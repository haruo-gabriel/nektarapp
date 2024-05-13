package com.nektarapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class FavoritesRequest(
    val email: String,
    val id: Int
)
