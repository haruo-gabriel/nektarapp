package com.nektarapp.repository

import com.nektarapp.data.model.Review
import com.nektarapp.data.model.User
import com.nektarapp.data.table.FavoritesTable
import com.nektarapp.data.table.ReviewTable
import com.nektarapp.data.table.UserTable
import com.nektarapp.data.table.WatchlistTable
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

    suspend fun addFavorite(email: String, movieid: Int) {
        //conferir se o filme já está na lista de favoritos
        val fav = dbQuery {
            FavoritesTable.select { (FavoritesTable.email eq email) and (FavoritesTable.movieid eq movieid) }
                .map { it[FavoritesTable.movieid] }
        }
        if (movieid in fav) {
            return
        }
        dbQuery {
            FavoritesTable.insert { ft->
                ft[FavoritesTable.email] = email
                ft[FavoritesTable.movieid] = movieid
            }
        }
    }

    suspend fun addWatchlist(email: String, movieid: Int) {
        //conferir se o filme já está na watchlist
        val watch = dbQuery {
            WatchlistTable.select { (WatchlistTable.email eq email) and (WatchlistTable.movieid eq movieid) }
                .map { it[WatchlistTable.movieid] }
        }
        if (movieid in watch) {
            return
        }
        dbQuery {
            WatchlistTable.insert { wt->
                wt[WatchlistTable.email] = email
                wt[WatchlistTable.movieid] = movieid
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
    //pega todos os filmes favoritos de um user
    suspend fun findAllUserFavorites(email: String): List<Int> = dbQuery {
        FavoritesTable.select { FavoritesTable.email.eq(email) }
            .map { it[FavoritesTable.movieid] }
    }
    //pega todos os filmes da watchlist de um user
    suspend fun findAllUserWatchlist(email: String): List<Int> = dbQuery {
        WatchlistTable.select { WatchlistTable.email.eq(email) }
            .map { it[WatchlistTable.movieid] }
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
        return User(
            email = row[UserTable.email],
            hashPassword = row[UserTable.hashPassword],
            name = row[UserTable.name]
        )
    }

    suspend fun deleteReview(review: Review): Int = dbQuery {
        ReviewTable.deleteWhere {
            (ReviewTable.email eq email) and
                    (ReviewTable.movieid eq movieid) and
                    (ReviewTable.star eq star) and
                    (ReviewTable.text eq text)
        }
    }

    suspend fun deleteFavorite(email: String, movieid: Int): Int = dbQuery {
        FavoritesTable.deleteWhere {
            (FavoritesTable.email eq email) and
                    (FavoritesTable.movieid eq movieid)
        }
    }

    suspend fun deleteWatchlist(email: String, movieid: Int): Int = dbQuery {
        WatchlistTable.deleteWhere {
            (WatchlistTable.email eq email) and
                    (WatchlistTable.movieid eq movieid)
        }
    }

    suspend fun deleteUser(email: String): Int = dbQuery {
        UserTable.deleteWhere { UserTable.email eq email }
    }
}