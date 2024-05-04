package com.nektarapp

import com.nektarapp.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import org.json.JSONArray

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

    val apiKey = "9c12633bacf10504877fac5ed46d1c16"
    val url = "https://api.themoviedb.org/3/movie/popular?api_key=$apiKey"
    val response = url.httpGet().responseString()
    if (response.second.statusCode == 200) {
        val moviesArray = JSONArray(response.third.component1())
        val moviesList = mutableListOf<Movie>()

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
        println("Filmes recuperados:")
        for (movie in moviesList) {
            println("${movie.id}: ${movie.title}")
        }
    } else {
        println("Erro ao recuperar os filmes. Código do erro: ${response.second.statusCode}")
    }
    configureRouting()
}
