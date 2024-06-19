package com.nektarapp.data.table

import org.jetbrains.exposed.sql.Table

object FavoritesTable: Table() {
    val email = varchar("email", 512)
    val movieid = integer("movieid")
}