package com.nektarapp

import com.nektarapp.authentication.JwtService
import com.nektarapp.authentication.hash
import com.nektarapp.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.nektarapp.repository.DatabaseFactory
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import com.nektarapp.repository.repo
import io.ktor.server.locations.*
import kotlinx.serialization.json.*
import java.net.Authenticator


fun main() {
    embeddedServer(
        Netty,
        port = 8080, // This is the port on which Ktor is listening
        host = "127.0.0.1",
        module = Application::module
    ).start(wait = true)

}

fun Application.module() {
    DatabaseFactory.init()
    install(ContentNegotiation){
        json(Json {
            prettyPrint = true
            isLenient = true
        })
    }
    configureRouting()
}
