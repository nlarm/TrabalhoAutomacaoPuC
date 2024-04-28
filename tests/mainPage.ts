import { Locator, Page } from '@playwright/test';

export class mainPage {
    private readonly page: Page;
    private readonly urlPrincipal: string;

    constructor(page: Page) { 
        this.urlPrincipal = 'https://magento.softwaretestingboard.com/';
    }

    async abrirSite() {
        await this.page.goto(this.urlPrincipal);
    }

}