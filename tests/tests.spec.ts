import { test, expect } from '@playwright/test';

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