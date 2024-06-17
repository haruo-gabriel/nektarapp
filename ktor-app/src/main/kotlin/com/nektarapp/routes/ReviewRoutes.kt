package com.nektarapp.routes

import com.nektarapp.data.model.Review
import com.nektarapp.data.model.ReviewRequest
import com.nektarapp.data.model.SimpleResponse
import com.nektarapp.repository.repo
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

const val REVIEWS = "$API_VERSION/reviews"
const val ADD_REVIEW = "$REVIEWS/addReview"
const val GET_REVIEWS = "$REVIEWS/getReviews/{email}"

fun Route.ReviewRoutes(
    db: repo
) {
    post (ADD_REVIEW) {
        val reviewRequest = try {
            call.receive<ReviewRequest>()
        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, SimpleResponse(false, "Missing some fields"))
            return@post
        }

        try {
            val review = Review(
                email = reviewRequest.email,
                movieid = reviewRequest.movieid,
                star = reviewRequest.star,
                text = reviewRequest.text
            )
            db.addReview(review)
            call.respond(HttpStatusCode.OK, SimpleResponse(true, "Review added"))
        } catch (e: Exception) {
            call.respond(HttpStatusCode.Conflict, SimpleResponse(false, e.message ?: "Some error occurred"))
            return@post
        }
    }

    get (GET_REVIEWS) {
        val email = call.parameters["email"]
        if (email != null) {
            val reviews = db.findAllUserReviews(email)
            if (reviews.isNotEmpty()) {
                call.respond(reviews)
            } else {
                call.respondText("Review não encontrada", status = HttpStatusCode.NotFound)
            }
        } else {
            call.respondText("Missing or malformed email", status = HttpStatusCode.BadRequest)
        }
    }
}