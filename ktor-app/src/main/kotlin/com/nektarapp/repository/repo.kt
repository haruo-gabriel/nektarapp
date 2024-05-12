package com.nektarapp.repository

import com.nektarapp.data.model.User
import com.nektarapp.data.table.UserTable
import org.jetbrains.exposed.sql.insert
import com.nektarapp.repository.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.ResultRow

class repo {
    suspend fun addUser(user: User) {
        println(user.email)
        dbQuery {
            UserTable.insert { ut->
                ut[UserTable.email] = user.email
                ut[UserTable.hashPassword] = user.hashPassword
                ut[UserTable.name] = user.name
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
        return User(
            email = row[UserTable.email],
            hashPassword = row[UserTable.hashPassword],
            name = row[UserTable.name]
        )
    }
}