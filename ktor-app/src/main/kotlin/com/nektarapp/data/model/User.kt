package com.nektarapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class User (
    val email: String,
    val hashPassword: String,
    val name: String
)