package com.nektarapp.routes

import com.nektarapp.authentication.JwtService
import com.nektarapp.data.model.LoginRequest
import com.nektarapp.data.model.RegisterRequest
import com.nektarapp.data.model.SimpleResponse
import com.nektarapp.data.model.User
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

fun Route.UserRoutes(
    db: repo,
    jwtService: JwtService,
    hashFunction: (String) -> String
){
    post (REGISTER_REQUEST){
        val user = try{
            call.receive<User>()

        } catch (e: Exception){
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }
        try{
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
}












