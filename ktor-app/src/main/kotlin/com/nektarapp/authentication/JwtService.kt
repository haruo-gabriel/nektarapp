package com.nektarapp.authentication

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.nektarapp.data.model.User

class JwtService {
    private val issuer = "nektarapp"
    private val jwtSecret = "1004"
    private val algorithm = Algorithm.HMAC512(jwtSecret)

    val verifier:JWTVerifier = JWT
        .require(algorithm)
        .withIssuer(issuer)
        .build()

    fun generateToken(user: User): String {
        return JWT.create()
            .withSubject("Authentication")
            .withIssuer(issuer)
            .withClaim("email", user.email)
            .sign(algorithm)
    }
}