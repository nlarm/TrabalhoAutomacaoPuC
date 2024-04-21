import { test, expect } from '@playwright/test';
import { AccountPage } from './AccountPage';

test('conferir botão shop new yoga', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  const botaoshop = await page.locator('[class="action more button"]').textContent();
  expect(botaoshop).toEqual('Shop New Yoga');
});

test('Verificar título da página', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/what-is-new.html');
  const titulo = await page.locator('h1').innerText();
  expect(titulo).toEqual('What\'s New');
});

test('Verificar título da página create account', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
  const tituloPagina = await page.locator('[class="page-title"]').innerText();
  expect(tituloPagina).toEqual('Create New Customer Account');
});

test('Creating an existing account', async ({page}) => {

    const accountPage = new AccountPage(page);

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm("Galvao","Bueno","galvaoBueno@globo.com", accountPage.passwordFillout,accountPage.passwordFillout)
    await accountPage.clickSubmit()
    
    const result = await accountPage.checkErrorMessage(page);
    expect(result).toBeTruthy();
});

test('Creating a new account', async ({page}) => {

    const accountPage = new AccountPage(page);
    const nomeDate = `Galvao_${Date.now()}`;

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(nomeDate,"Bueno",nomeDate+"Bueno@globo.com",accountPage.passwordFillout,accountPage.passwordFillout)
    await accountPage.clickSubmit()

    const result = await accountPage.checkSuccessMessage(page);
    expect(result).toBeTruthy();
});