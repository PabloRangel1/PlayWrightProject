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
    await page.toast.containText('Cadastro realizado com sucesso!')   
})

test('Não deve cadastrar quando um titulo é duplicado', async ({ page, request }) => {
    //Usando a API para precadastrar na massa de dados e validação no processo de cadastrar com um toast esperado.
    const movie = data.duplicate
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movie.create(movie)
    await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('Não deve cadastrar quandos os campos obrigatórios não são preenchidos', async({ page }) => {
   
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  
    await page.movie.goForm()
    await page.movie.submit()
    await page.movie.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})