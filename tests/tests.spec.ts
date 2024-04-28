import { test, expect } from '@playwright/test';
import { AccountPage } from './AccountPage';
import { mainPage } from './mainPage';

test('conferir botão shop new yoga', async ({ page }) => {
  const accountPage = new mainPage(page) ;
  await accountPage.abrirSite();
  const botaoshop = await page.locator('[class="action more button"]').textContent();
  expect(botaoshop).toEqual('Shop New Yoga');
});

test('Verificar título da página', async ({ page }) => {
  const accountPage = new mainPage(page) ;
  await accountPage.abrirSite();
  const titulo = await page.locator('h1').innerText();
  expect(titulo).toEqual('What\'s New');
});

test('Verificar título da página create account', async ({ page }) => {
  const accountPage = new AccountPage(page) ;
  await accountPage.navigateCreatAccount()
  
  const tituloPagina = await page.locator('[class="page-title"]').innerText();
  expect(tituloPagina).toEqual('Create New Customer Account');
});

test('Creating an existing account', async ({page}) => {

    const accountPage = new AccountPage(page);

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(accountPage.userFirstName,accountPage.userLastName,accountPage.userEmail, accountPage.passwordFillout,accountPage.passwordFillout)
    await accountPage.clickSubmit()

    const result = await accountPage.checkErrorMessage(page);
    expect(result).toBeTruthy();
});

test('Creating a new account', async ({page}) => {

    const accountPage = new AccountPage(page);
    const nomeDate = `Galvao_${Date.now()}_`;

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(nomeDate,accountPage.userLastName,nomeDate+accountPage.userEmail,accountPage.passwordFillout,accountPage.passwordFillout)
    await accountPage.clickSubmit()

    const result = await accountPage.checkSuccessMessage(page);
    expect(result).toBeTruthy();
});

test('Check password is the same', async ({page}) => {
  
    const accountPage = new AccountPage(page);
    const nomeDate = `Galvao_${Date.now()}_`;
    const wrongPassword = "MentiraAGloboEhMelhor"

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(nomeDate,accountPage.userLastName, nomeDate+accountPage.userEmail, accountPage.passwordFillout,wrongPassword)
    await accountPage.clickSubmit()

    const result = await accountPage.checkPasswordError(page);
    expect(result).toBeTruthy();
});

test('Weak password', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, accountPage.weakPassword1234, accountPage.weakPassword1234)
  await accountPage.clickSubmit();

  const result = await accountPage.checkWeakPassword(page);
  expect(result).toBeTruthy();
});
//teste daniel