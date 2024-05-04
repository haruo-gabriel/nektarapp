val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project

plugins {
    kotlin("jvm") version "1.9.20"
    id("io.ktor.plugin") version "2.3.9"
}

group = "com.nektarapp"

version = "0.0.1"

application {
    mainClass.set("com.nektarapp.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-html-jvm")
    //implementation("org.jetbrains.kotlinx:kotlinx-html-js")
    //implementation("org.jetbrains.kotlinx:kotlinx-html")
    implementation("com.github.kittinunf.fuel:fuel:2.3.1")
    implementation("org.json:json:20210307")
    //implementation("io.ktor:ktor-html")
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-netty-jvm")
    implementation("io.ktor:ktor-server-html-builder-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}
