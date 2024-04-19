package com.nektarapp

import com.nektarapp.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    // embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
//    embeddedServer(Netty, port = 8080, host = "127.0.0.1", module = Application::module) // forward to WSL2
//        .start(wait = true)
    embeddedServer(
        Netty,
        port = 8080, // This is the port on which Ktor is listening
        host = "127.0.0.1",
        module = Application::module
    ).start(wait = true)
}

fun Application.module() {
    configureRouting()
}
