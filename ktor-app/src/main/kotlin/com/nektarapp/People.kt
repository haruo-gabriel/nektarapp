package com.nektarapp

class People (
    var biography: String,
    var birthday: String,
    var deathday: String,
    var id: Int,
    var known_for_department: String,
    var name: String,
    var place_of_birth: String,
    var profile_path: String
) {

}

class Credits (
    var movie_id: Int,
    var id: Int,
    var cast: List<People>
) {

}
