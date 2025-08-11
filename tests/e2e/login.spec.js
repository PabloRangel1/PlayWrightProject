const { test} = require('../support')


test('deve rodar como administrador', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('admin@zombieplus.com','pwd123')
    await page.login.isLoggedIn('Admin')
})   

test('Não deve rodar como senha incorreta', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('admin@zombieplus.com','incorreta123')

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.popup.haveText(message)
})

test('Não deve logar quando o email é invalido', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('www.teste.com.br','incorreta123')

    await page.login.alertHaveText('Email incorreto')
})

test('Não deve logar quando o email não é preenchido', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('','incorreta123')

    await page.login.alertHaveText('Campo obrigatório')
}) 

test('Não deve logar quando a senha não preenchida', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('email123@gmail.com','')

    await page.login.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando nenhum campo é preenchido ', async({ page }) => {
    await page.login.visit()
    await page.login.submitLogin('','')

    await page.login.alertHaveText(['Campo obrigatório','Campo obrigatório',])
})