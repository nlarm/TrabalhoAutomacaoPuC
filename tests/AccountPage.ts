import { Locator, Page } from '@playwright/test';

export class AccountPage {
    public readonly userFirstName: string;
    public readonly userLastName: string;
    public readonly userEmail: string;
    public readonly passwordFillout: string;
    public readonly weakPassword1234: string;


    private readonly page: Page;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly password: string;
    private readonly confirmPassword: string;
    private readonly actionSubmit: string;
    private readonly urlCreateAccount: string;
    private readonly errorMessage: string;
    private readonly successMessage: string;
    private readonly passwordErrorConfimation: string;
    private readonly messageAccountExist: string;
    private readonly messageNewAccount: string;
    private readonly messageSamePassowrd: string;
    private readonly idPasswordError: string;
    private readonly messageWeakPassword: string;
    
    constructor(page: Page) {
      this.page = page;
      this.firstName = 'First Name';
      this.lastName = 'Last Name';
      this.email = 'id=email_address';
      this.password = 'id=password';
      this.confirmPassword = 'id=password-confirmation';
      this.idPasswordError = 'id=password-error'
      this.actionSubmit = '.action.submit.primary';
      this.urlCreateAccount = 'https://magento.softwaretestingboard.com/customer/account/create/';
      this.passwordFillout = 'SBTEhMelhorqueAGloboForEv3er';
      this.errorMessage = ".message-error.error.message";
      this.successMessage = ".message-success.success.message";
      this.passwordErrorConfimation = "#password-confirmation-error";
      this.messageAccountExist = "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.";
      this.messageNewAccount = "Thank you for registering with Main Website Store.";
      this.messageSamePassowrd = "Please enter the same value again.";
      this.messageWeakPassword = "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.";
      this.userFirstName = "Galvao"
      this.userLastName =  "Bueno"
      this.userEmail =  ""+this.userFirstName+""+this.userLastName+"@globo.com"
      this.weakPassword1234 = "12345678"
    }
  
    async navigateCreatAccount() {
        await this.page.goto(this.urlCreateAccount);
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
        return await this.validMessage(page, this.errorMessage, this.messageAccountExist)
    }

    async checkSuccessMessage(page) {
        return await this.validMessage(page, this.successMessage, this.messageNewAccount)  
    }

    async checkPasswordError(page) {
        return await this.validMessage(page, this.passwordErrorConfimation, this.messageSamePassowrd)
    }

    async checkWeakPassword (page) {
        return await this.validMessage(page, this.idPasswordError, this.messageWeakPassword)
    }

    private async validMessage(page, messageElementIn: string, mensagemEsperadaIn: string) {
        try {
            const messageElement = await page.locator(messageElementIn);
            const mensagemEsperada = mensagemEsperadaIn;
            
            if (!messageElement) {
                throw new Error('Elemento não encontrado');
            }

            const messageText = await messageElement.textContent();
            
            if (!messageText.includes(mensagemEsperada)) {
                throw new Error(`Mensagem incorreta. Mensagem encontrada: ${messageText}`);
            }

            return true

        } catch (error) {
            console.error('Ocorreu um erro durante a verificação de elemento e mensagem:', error);
            return false;
        }
    }
}

function expect(errorMessageText: any) {
    throw new Error('Function not implemented.');
}

