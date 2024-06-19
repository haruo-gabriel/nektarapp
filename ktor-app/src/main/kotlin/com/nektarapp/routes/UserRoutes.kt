package com.nektarapp.routes

import com.nektarapp.authentication.JwtService
import com.nektarapp.data.model.*
import com.nektarapp.repository.repo
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*

const val API_VERSION = "/v1"
const val USERS = "$API_VERSION/users"
const val REGISTER_REQUEST = "$USERS/register"
const val LOGIN_REQUEST = "$USERS/login"
const val FAVORITES = "$USERS/favorites"
const val WATCHLIST = "$USERS/watchlist"


fun Route.UserRoutes(
    db: repo,
    jwtService: JwtService,
    hashFunction: (String) -> String
){
    post (FAVORITES){
        val favoritesRequest = try{
            call.receive<ListRequest>()
        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }
        try{
            db.addFavorite(favoritesRequest.email, favoritesRequest.id)
            call.respond(HttpStatusCode.OK, SimpleResponse(true, "Movie added to favorites"))
        } catch (e: Exception){
            call.respond(HttpStatusCode.Conflict, SimpleResponse(false, e.message ?: "Some error occurred"))
        }
    }

    post (WATCHLIST){
        val watchlistRequest = try{
            call.receive<ListRequest>()
        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }
        try{
            db.addWatchlist(watchlistRequest.email, watchlistRequest.id)
            call.respond(HttpStatusCode.OK, SimpleResponse(true, "Movie added to watchlist"))
        } catch (e: Exception){
            call.respond(HttpStatusCode.Conflict, SimpleResponse(false, e.message ?: "Some error occurred"))
        }
    }

    post (REGISTER_REQUEST){
        val registerRequest = try{
            call.receive<RegisterRequest>()

        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }
        try{
            val user = User(
                email = registerRequest.email,
                hashPassword = hashFunction(registerRequest.password),
                name = registerRequest.name
            )
            db.addUser(user)
            call.respond(HttpStatusCode.OK, SimpleResponse(true, jwtService.generateToken(user)))
        } catch (e: Exception){
            call.respond(HttpStatusCode.Conflict, SimpleResponse(false, e.message ?: "Some error occurred"))
            return@post
        }
    }

    post (LOGIN_REQUEST){
        val loginRequest = try{
            call.receive<LoginRequest>()
        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }

        try {
            val user = db.findUserByEmail(loginRequest.email)
            if (user == null){
                call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Wrong email"))
            } else {
                if (user.hashPassword == hashFunction(loginRequest.password)){
                    call.respond(HttpStatusCode.OK, SimpleResponse(true, jwtService.generateToken(user)))
                } else {
                    call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Wrong password"))
                }
            }
        } catch (e: Exception){
            call.respond(HttpStatusCode.Conflict, SimpleResponse(false, e.message ?: "Some error occurred"))
        }
    }

    delete("/userDelete/{email}"){
        val email = call.parameters["email"]
        if (email != null){
            try{
                db.deleteUser(email)
                call.respondText("User deleted successfully", status = HttpStatusCode.OK)
            } catch (e: Exception){
                call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
            }
        } else {
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
        }
    }

    delete("/favoritesDelete/{email}/{id}"){
        val email = call.parameters["email"]
        val id = call.parameters["id"]
        if (email != null && id != null){
            try{
                db.deleteFavorite(email, id.toInt())
                call.respondText("Favorite deleted successfully", status = HttpStatusCode.OK)
            } catch (e: Exception){
                call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
            }
        } else {
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
        }
    }

    delete("/watchlistDelete/{email}/{id}"){
        val email = call.parameters["email"]
        val id = call.parameters["id"]
        if (email != null && id != null){
            try{
                db.deleteWatchlist(email, id.toInt())
                call.respondText("Watchlist deleted successfully", status = HttpStatusCode.OK)
            } catch (e: Exception){
                call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
            }
        } else {
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
        }
    }

    get("/user/{email}") {
        val email = call.parameters["email"]
        if (email != null) {
            val user = db.findUserByEmail(email)
            if (user != null) {
                call.respond(user)
            } else {
                call.respondText("User not found", status = HttpStatusCode.NotFound)
            }
        } else {
            call.respondText("Missing or malformed email", status = HttpStatusCode.BadRequest)
        }
    }

    get("/user/{email}/favorites") {
        val email = call.parameters["email"]
        if (email != null) {
            val favorites = db.findAllUserFavorites(email)
            if (favorites.isNotEmpty()) {
                call.respond(favorites)
            } else {
                call.respondText("User not found", status = HttpStatusCode.NotFound)
            }
        } else {
            call.respondText("Missing or malformed email", status = HttpStatusCode.BadRequest)
        }
    }

    get("/user/{email}/watchlist") {
        val email = call.parameters["email"]
        if (email != null) {
            val watchlist = db.findAllUserWatchlist(email)
            if (watchlist.isNotEmpty()) {
                call.respond(watchlist)
            } else {
                call.respondText("User not found", status = HttpStatusCode.NotFound)
            }
        } else {
            call.respondText("Missing or malformed email", status = HttpStatusCode.BadRequest)
        }
    }

}












