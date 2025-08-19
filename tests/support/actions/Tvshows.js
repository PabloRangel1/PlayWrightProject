import { expect } from '@playwright/test';
import { title } from 'process';

export class Tvshows{

    constructor(page){
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href="/admin/tvshows"]').click()
       
    }

    async goTvForm(){
         await this.page.locator('a[href="/admin/tvshows/register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }


    async createTv(show){
        await this.goForm()
        await this.goTvForm()
        
        
        await this.page.locator(".fields input[name='title']").fill(show.title)
        await this.page.getByLabel('Sinopse').fill(show.overview)

        await this.page.locator('#select_company_id .react-select__indicators')
            .click()

        await this.page.locator('.react-select__option')
            .filter({hasText: show.company})
            .click()

        await this.page.locator('#select_year .react-select__indicators')
            .click()
        
        await this.page.locator('.react-select__option')
            .filter({hasText: show.release_year})
            .click()

        await this.page.locator('.seasons input[name="seasons"]').fill(show.seasons.toString())
        
        if(show.featured){
            await this.page.locator('.featured .react-switch-handle').click()
        }

        await this.submit()

    }

    async alertHaveText(text){
        await expect(this.page.locator('.alert')).toHaveText(text)
    }

    async remove(show){
        await this.page.getByRole('row', { name:show.title}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }

}