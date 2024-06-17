package com.nektarapp.data.table

import com.nektarapp.data.table.UserTable.integer
import com.nektarapp.data.table.UserTable.nullable
import com.nektarapp.data.table.UserTable.text
import com.nektarapp.data.table.UserTable.varchar
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.Table.PrimaryKey

// ReviewTable is a table that stores reviews of movies
object ReviewTable:Table() {
    val email = varchar("email", 512)
    val movieid = integer("movieid")
    val star = integer("star").nullable()
    val text = text("text").nullable()

    //override val primaryKey: PrimaryKey = PrimaryKey(email)
}