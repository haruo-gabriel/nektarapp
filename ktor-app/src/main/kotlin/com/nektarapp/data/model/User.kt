package com.nektarapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class User (
    val email: String,
    val hashPassword: String,
    val name: String,
    val favorites: List<Int>
) {
    constructor(email: String, hashPassword: String, name: String): this(email, hashPassword, name, emptyList())
}