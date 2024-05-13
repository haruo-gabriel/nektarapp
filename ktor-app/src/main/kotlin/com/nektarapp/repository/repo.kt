package com.nektarapp.repository

import com.nektarapp.data.model.User
import com.nektarapp.data.table.UserTable
import org.jetbrains.exposed.sql.insert
import com.nektarapp.repository.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.update

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
    suspend fun findUserByEmail(email: String) = dbQuery {
        UserTable.select {UserTable.email.eq(email)}
            .map{rowToUser(it)}
            .singleOrNull()
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
        dbQuery {
            UserTable.update({ UserTable.email.eq(email)}) {
                it[UserTable.favorites] = newFavorites.joinToString { it.toString() }
            }
        }
    }
}