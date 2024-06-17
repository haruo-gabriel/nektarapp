package com.nektarapp.plugins

import com.nektarapp.data.model.User
import com.nektarapp.authentication.JwtService
import com.nektarapp.authentication.hash
import com.nektarapp.data.model.SimpleResponse
import com.nektarapp.repository.repo
import com.nektarapp.routes.REGISTER_REQUEST
import com.nektarapp.routes.ReviewRoutes
import com.nektarapp.routes.UserRoutes
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(){
    routing {
        get("/") {
            call.respondText("Hello, world!")
        }
        val db = repo()
        val jwtService = JwtService()
        val hashFunction = { s: String -> hash(s) }

        UserRoutes(db, JwtService(), hashFunction)
        ReviewRoutes(db)

    }
}

//