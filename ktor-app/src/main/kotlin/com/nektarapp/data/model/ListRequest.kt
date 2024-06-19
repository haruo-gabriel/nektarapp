package com.nektarapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class ListRequest(
    val email: String,
    val id: Int
)
