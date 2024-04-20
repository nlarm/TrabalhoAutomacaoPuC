import { Locator, Page } from '@playwright/test';

export class AccountPage {
    private readonly page: Page;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly password: string;
    private readonly confirmPassword: string;
    private readonly actionSubmit: string;
    
    constructor(page: Page) {
      this.page = page;
      this.firstName = 'First Name';
      this.lastName = 'Last Name';
      this.email = 'id=email_address';
      this.password = 'id=password';
      this.confirmPassword = 'id=password-confirmation';
      this.actionSubmit = '.action.submit.primary';
    }
  
    async navigate(url: string) {
        await this.page.goto(url);
    }
  
    async fillOutForm(name: string, lastName: string, email: string, password: string, confirmPassword: string) {
        await this.page.getByLabel(this.firstName).fill(name);
        await this.page.getByLabel(this.lastName).fill(lastName);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.confirmPassword).fill(confirmPassword);
    }
  
    async clickSubmit() {
        const button = await this.page.locator(this.actionSubmit);
        await button.click();
    }

    async checkErrorMessage() {
        try {
            const element = await this.page.locator('.message-error.error.message');
            return !!element;
        } catch (error) {
            console.error('Ocorreu um erro durante a localização do elemento:', error);
            return false;
        }
    }
  }


