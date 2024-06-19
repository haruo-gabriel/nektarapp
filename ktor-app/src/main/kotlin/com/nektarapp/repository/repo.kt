package com.nektarapp.repository

import com.nektarapp.data.model.Review
import com.nektarapp.data.model.User
import com.nektarapp.data.table.ReviewTable
import com.nektarapp.data.table.UserTable
import com.nektarapp.repository.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class repo {
    suspend fun addUser(user: User) {
        dbQuery {
            UserTable.insert { ut->
                ut[UserTable.email] = user.email
                ut[UserTable.hashPassword] = user.hashPassword
                ut[UserTable.name] = user.name
                ut[UserTable.favorites] = user.favorites.joinToString { it.toString() }
            }
        }
    }

    suspend fun addReview(review: Review) {
        dbQuery {
            ReviewTable.insert { rt->
                rt[ReviewTable.email] = review.email
                rt[ReviewTable.movieid] = review.movieid
                rt[ReviewTable.star] = review.star
                rt[ReviewTable.text] = review.text
            }
        }
    }


    suspend fun findUserByEmail(email: String) = dbQuery {
        UserTable.select {UserTable.email.eq(email)}
            .map{rowToUser(it)}
            .singleOrNull()
    }

    //pega todas as reviews de um user
    suspend fun findAllUserReviews(email: String): List<Review> = dbQuery {
        ReviewTable.select { ReviewTable.email.eq(email) }
            .map { rowToReview(it) }
            .filterNotNull()
    }

    private fun rowToReview(row: ResultRow?): Review? {
        if (row == null) {
            return null
        }
        return Review(
            email = row[ReviewTable.email],
            movieid = row[ReviewTable.movieid],
            star = row[ReviewTable.star]!!,
            text = row[ReviewTable.text]!!
        )
    }

    private fun rowToUser(row:ResultRow?): User? {
        if (row == null) {
            return null
        }
        val favoritesString = row[UserTable.favorites]
        val favoritesList = if (!favoritesString.isNullOrEmpty()) {
            favoritesString.split(",").map { it.toInt() }
        } else {
            emptyList()
        }
        return User(
            email = row[UserTable.email],
            hashPassword = row[UserTable.hashPassword],
            name = row[UserTable.name],
            favorites = favoritesList
        )
    }

    suspend fun addFavorite(email: String, newFavorites: List<Int>) {
        //println("addFavorite: $email, $newFavorites")
        dbQuery {
            UserTable.update({ UserTable.email.eq(email)}) {
                it[UserTable.favorites] = newFavorites.joinToString { it.toString() }
            }
        }
    }

    suspend fun deleteReview(email: String, movieid: Int, star: Int, text: String): Int = dbQuery {
        ReviewTable.deleteWhere {
            (ReviewTable.email eq email) and
                    (ReviewTable.movieid eq movieid) and
                    (ReviewTable.star eq star) and
                    (ReviewTable.text eq text)
        }
    }

    suspend fun deleteUser(email: String): Int = dbQuery {
        UserTable.deleteWhere { UserTable.email eq email }
    }
}