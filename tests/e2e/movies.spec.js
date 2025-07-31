const { test } = require('../support')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/dataBase')

test('deve cadastrar um novo filme', async ({ page }) => {
    // // Deve estar logado
    const movie = data.create

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';'`)

    await page.login.visit()
    await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
    await page.movie.isLoggedIn()

    await page.movie.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')

})