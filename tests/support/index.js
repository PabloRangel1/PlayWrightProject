const { test: base, expect } = require('@playwright/test')

const {LandingPage} = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviePage } = require('../pages/MoviePage')
// injetando os page objects dentro da camada nativa do playwirght
const test = base.extend({
    page: async({page}, use) => {
        await use({
            ...page, //Diz que vamos usar o page do proprio playwright porem vamos add novas instancias
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movie: new MoviePage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }