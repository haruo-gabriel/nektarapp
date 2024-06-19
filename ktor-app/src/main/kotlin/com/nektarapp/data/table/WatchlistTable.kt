package com.nektarapp.data.table

import org.jetbrains.exposed.sql.Table

object WatchlistTable: Table(){
    val email = varchar("email", 512)
    val movieid = integer("movieid")
}