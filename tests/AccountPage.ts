import { Locator, Page } from '@playwright/test';

export class AccountPage {
    private readonly page: Page;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly password: string;
    private readonly confirmPassword: string;
    private readonly actionSubmit: string;
    private readonly url: string;
    public readonly passwordFillout: string;
    
    constructor(page: Page) {
      this.page = page;
      this.firstName = 'First Name';
      this.lastName = 'Last Name';
      this.email = 'id=email_address';
      this.password = 'id=password';
      this.confirmPassword = 'id=password-confirmation';
      this.actionSubmit = '.action.submit.primary';
      this.url = 'https://magento.softwaretestingboard.com/customer/account/create/'
      this.passwordFillout = 'SBTEhMelhorqueAGloboForEv3er'
    }
  
    async navigateCreatAccount() {
        await this.page.goto(this.url);
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

    async checkErrorMessage(page) {
        try {
            const errorMessageElement = await page.locator('.message-error.error.message');
            const mensagemEsperada = "Theree is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.";
            
            if (!errorMessageElement) {
                throw new Error('Elemento de mensagem de erro não encontrado');
            }

            const errorMessageText = await errorMessageElement.textContent();
            
            if (!errorMessageText.includes(mensagemEsperada)) {
                throw new Error(`Mensagem de erro incorreta. Mensagem encontrada: ${errorMessageText}`);
            }

            return true;

        } catch (error) {

            console.error('Ocorreu um erro durante a verificação da mensagem de erro:', error);
            return false;
        }
    }

    async checkSuccessMessage(page) {
        try {
            const errorMessageElement = await page.locator('.message-success.success.message');
            const mensagemEsperada = "Thank you for registering with Main Website Store.";
            
            if (!errorMessageElement) {
                throw new Error('Elemento de mensagem de sucesso não encontrado');
            }

            const errorMessageText = await errorMessageElement.textContent();
            
            if (!errorMessageText.includes(mensagemEsperada)) {
                throw new Error(`Mensagem de sucesso incorreta. Mensagem encontrada: ${errorMessageText}`);
            }

            return true;

        } catch (error) {

            console.error('Ocorreu um erro durante a verificação da mensagem de sucesso:', error);
            return false;
        }
    }
}
