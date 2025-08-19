const { test, expect } = require('../support')

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/dataBase')
const { da } = require('@faker-js/faker')

test.beforeAll(async () =>{
    await executeSQL(`DELETE from tvshows`)
})

test('Deve ser possível cadastrar uma nova série.', async({page}) => {
    const show = data.create2
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tv.goForm()
    await page.tv.createTv(show)
    await page.popup.haveText(`A série '${show.title}' foi adicionada ao catálogo.`)  
})

test('Deve ser possível remover uma nova série', async({ page, request}) => {
    
    const show = data.to_remove2;
    await request.api.postTv(show);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tv.goForm()
    await page.tv.remove(show)
    await page.popup.haveText('Série removida com sucesso.')

}) 

test('Não deve cadastrar quando o título da serie é duplicado', async ({ page, request }) => {
    const show = data.duplicate77
    await request.api.postTv(show)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tv.goForm()
    await page.tv.createTv(show)
    await page.popup.haveText(`O título '${show.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
    
})

test('Não deve cadastrar quando nenhum dos campo é preenchido', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tv.goForm()
    await page.tv.goTvForm()
    await page.tv.submit()

    await page.tv.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
})