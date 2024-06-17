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
const val ADD_FAVORITE = "$USERS/addFavorite"



fun Route.UserRoutes(
    db: repo,
    jwtService: JwtService,
    hashFunction: (String) -> String
){
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
    post(ADD_FAVORITE){
        val favoritesRequest = try{
            call.receive<FavoritesRequest>()
        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }

        try{
            val user = db.findUserByEmail(favoritesRequest.email)
            if (user != null) {
                //adiciona o favorito
                val novaLista = user.favorites + favoritesRequest.id
                db.addFavorite(favoritesRequest.email, novaLista)
                call.respond(HttpStatusCode.OK, SimpleResponse(true, "Favorite added"))
            } else {
                call.respond(HttpStatusCode.OK, SimpleResponse(true, "Wrong email"))
            }
        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Something went wrong"))
            return@post
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

}












