package com.nektarapp

import com.nektarapp.plugins.*
import io.ktor.server.application.*
import kotlinx.coroutines.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import io.ktor.server.html.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.response.*
import org.json.JSONArray
import org.json.JSONObject
import kotlinx.html.*


fun main() {
    // embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
//    embeddedServer(Netty,  port = 8080, host = "127.0.0.1", module = Application::module) // forward to WSL2
//        .start(wait = true)
    embeddedServer(
        Netty,
        port = 8080, // This is the port on which Ktor is listening
        host = "127.0.0.1",
        module = Application::module
    ).start(wait = true)

}

fun Application.module() {
    val apiKey = "9c12633bacf10504877fac5ed46d1c16"
    val url = "https://api.themoviedb.org/3/movie/popular?api_key=$apiKey"
    val response = url.httpGet().responseString()

    val moviesList = mutableListOf<Movie>()
    if (response.second.statusCode == 200) {
        val responseObject = JSONObject(response.third.component1()) // Converter a string JSON em um objeto JSON
        val moviesArray = responseObject.getJSONArray("results")

        for (i in 0 until moviesArray.length()) {
            val movieObject = moviesArray.getJSONObject(i)
            val movie = Movie(
                backdropPath = movieObject.getString("backdrop_path"),
                id = movieObject.getInt("id"),
                originalLanguage = movieObject.getString("original_language"),
                originalTitle = movieObject.getString("original_title"),
                overview = movieObject.getString("overview"),
                posterPath = movieObject.getString("poster_path"),
                title = movieObject.getString("title"),
                reviewsId = 0,
                creditsId = 0
            )
            moviesList.add(movie)
        }
    } else {
        println("Erro ao recuperar os filmes. Código do erro: ${response.second.statusCode}")

    }
    routing {
        get("/") {
            call.respondHtml {
                val imgPath = "https://image.tmdb.org/t/p/original"
                val movies = moviesList // Recupere a lista de filmes (implementação depende do seu código)
                // Renderize o template principal e adicione o catálogo de filmes
                val htmlResponse = javaClass.classLoader.getResource("templates/main.html").readText()
                val finalHtml = buildString {
                    append(htmlResponse)
                    append("<div id='content'>")
                    append("<h1>Filmes Populares</h1>")
                    append("<div id='movies'>")
                    movies.forEach { movie ->
                        append("<div class='movie'>")
                        val sup = imgPath+movie.posterPath
                        append("<img src='${sup}' alt='${movie.title}' style='width: 200px; height: auto;'>")
                        append("<p>${movie.title}</p>")
                        append("</div>")
                    }
                    append("</div>")
                    append("</div>")
                }
                launch{
                    call.respondText(finalHtml, contentType = ContentType.Text.Html)
                }
            }
        }
    }


    //configureRouting()
}
