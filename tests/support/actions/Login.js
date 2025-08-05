import {expect } from '@playwright/test';

export class Login{

    constructor(page){
        this.page = page
    }

    async do(emailAdmin,passwordAdmin,username){
        await this.visit()
        await this.submitLogin(emailAdmin, passwordAdmin)
        await this.isLoggedIn(username)
    }

    async visit(){
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submitLogin(emailAdmin,passwordAdmin){
        await this.page.getByPlaceholder('E-mail').fill(emailAdmin)
        await this.page.getByPlaceholder('Senha').fill(passwordAdmin)

        await this.page.getByText('Entrar').click()
    }
    //verificação que entrou como administrador
    
    async submitLoginIncorrect(emailAdmin,passwordAdmin){
        await this.page.getByPlaceholder('E-mail').fill(emailAdmin)
        await this.page.getByPlaceholder('Senha').fill(passwordAdmin)
        

        await this.page.getByText(messageError).click()
    }

    async alertHaveText(text){
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(username) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }

}

