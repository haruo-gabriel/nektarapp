import com.nektarapp.data.model.Review
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import com.nektarapp.repository.repo
import com.nektarapp.data.model.User
import com.nektarapp.repository.DatabaseFactory
import kotlinx.coroutines.runBlocking

// classe que testa todas as funções de back end
class Test {

    // teste que cria um usuario e verifica se ele foi criado
    @Test
    fun `test user`() {
        DatabaseFactory.init()
        val db = repo()
        val user = User(
            email = "teste@mail.com",
            hashPassword = "123456",
            name = "teste"
        )
        runBlocking { db.addUser(user) }
        val result = runBlocking { db.findUserByEmail("teste@mail.com")}
        assertEquals("teste@mail.com", result?.email)
        assertEquals("123456", result?.hashPassword)
        assertEquals("teste", result?.name)
    }

    // teste que adiciona um filme na lista de favoritos e verifica se ele foi adicionado


    // teste que adiciona uma review e verifica se ela foi adicionada
    @Test
    fun `test review`() {
        val db = repo()
        val review = Review(
            email = "teste@mail.com",
            movieid = 1,
            star = 5,
            text = "muito bom"
        )
        runBlocking { db.addReview(review) }
        val result = runBlocking { db.findAllUserReviews("teste@mail.com") }
        assertEquals("teste@mail.com", result[0].email)
        assertEquals(1, result[0].movieid)
        assertEquals(5, result[0].star)
        assertEquals("muito bom", result[0].text)
    }
    // teste que deleta uma review e verifica se ela foi deletada
    @Test
    fun `test delete review`() {
        val db = repo()
        val review = Review(
            email = "teste@mail.com",
            movieid = 1,
            star = 5,
            text = "muito bom"
        )
        runBlocking { db.deleteReview(review) }
        val result = runBlocking { db.findAllUserReviews("teste@gmail.com") }
        assertEquals(0, result.size)
    }
    // teste que adiciona um filme na watchlist e verifica se ele foi adicionado
    @Test
    fun `test watchlist`() {
        val db = repo()
        runBlocking { db.addWatchlist("teste@gmail.com", 1) }
        val result = runBlocking { db.findAllUserWatchlist("teste@gmail.com") }
        assertEquals(1, result[0])
    }
    // teste que deleta um filme da watchlist e verifica se ele foi deletado
    @Test
    fun `test delete watchlist`() {
        val db = repo()
        runBlocking { db.deleteWatchlist("teste@gmail.com", 1) }
        val result = runBlocking { db.findAllUserWatchlist("teste@gmail.com") }
        assertEquals(0, result.size)
    }
    // teste que adiciona um filme na lista de favoritos e verifica se ele foi adicionado
    @Test
    fun `test favorites`() {
        val db = repo()
        runBlocking { db.addFavorite("teste@gmail.com", 1) }
        val result = runBlocking { db.findAllUserFavorites("teste@gmail.com") }
        assertEquals(1, result[0])
    }
    // teste que deleta um filme da lista de favoritos e verifica se ele foi deletado
    @Test
    fun `test delete favorites`() {
        val db = repo()
        runBlocking { db.deleteFavorite("teste@gmail.com", 1) }
        val result = runBlocking { db.findAllUserFavorites("teste@gmail.com") }
        assertEquals(0, result.size)
    }
    // teste que deleta um usuario e verifica se ele foi deletado
    @Test
    fun `test delete user`() {
        val db = repo()
        runBlocking { db.deleteUser("teste@mail.com") }
        val result = runBlocking { db.findUserByEmail("teste@mail.com") }
        assertEquals(null, result)
    }
}