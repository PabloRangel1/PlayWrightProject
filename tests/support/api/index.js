const { expect } = require('@playwright/test')

export class Api{

    constructor(request){
        this.request = request
        this.token = undefined
    }

    async setToken(){
        const response = await this.request.post('http://localhost:3333/sessions', {
        data: {
            email:'admin@zombieplus.com',
            password: 'pwd123',
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = 'Bearer ' + body.token
    }

    async postMovie(movie){

        await this.setToken() // A função que cadastra o filme, já faz a geração do token

        const response = await this.request.post('http://localhost:3333/movies', {
            headers:{
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: 'f88bd0f6-ded8-4211-9aed-acced053647b',
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        expect(response.ok()).toBeTruthy()
    }
}
