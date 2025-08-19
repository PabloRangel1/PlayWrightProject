const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/dataBase')
const { da } = require('@faker-js/faker')

test.beforeAll(async () =>{
    await executeSQL(`DELETE from movies`)
})

test('Deve cadastrar um novo titulo de filme', async ({ page }) => {
    // Deve estar logado
    const movie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movie.create(movie)
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)   
})

test('Deve poder remover um filme', async ({page, request}) => {
    const movie = data.to_remove
    await request.api.postMovie(movie) // pré cadastro

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movie.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')

})

test('Não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const movie = data.duplicate
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movie.create(movie)
    await page.popup.haveText(
        `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    )
})

test('Não deve cadastrar quandos os campos obrigatórios não são preenchidos', async({ page }) => {
   
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  
    await page.movie.goForm()
    await page.movie.submit()
    await page.movie.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})

test('Deve realizar busca pelo termo zumbi', async({ page, request}) => {
    const movies = data.search

    movies.data.forEach( async (m) => {
        await request.api.postMovie(m)
    })
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movie.search(movies.input)
    await page.movie.tableHave(movies.outputs)

})