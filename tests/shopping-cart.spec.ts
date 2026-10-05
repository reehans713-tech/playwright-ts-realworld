import { test, expect } from '../fixtures/test-fixtures';
import { standardUser } from '../test-data/users';

test('user can add backpack to cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage
}) => {
  await page.goto('/');

  await loginPage.login(
    standardUser.username,
    standardUser.password
  );

  await expect(page).toHaveURL(/inventory/);

  await expect (productsPage.getProductTitle()).toBeVisible();
  await productsPage.addBackpackToCart();

  // const cartItemCount = await productsPage.getCartItemCount();
  // expect(cartItemCount).toBe('1');

  await expect(productsPage.getCartItemCount()).toHaveText('1');

  await cartPage.openCart();

  await expect(page).toHaveURL(/cart/);

  // const itemName = await cartPage.getItemName();
  // expect(itemName).toBe('Sauce Labs Backpack');

  await expect(
  cartPage.getItemName('Sauce Labs Backpack')
).toHaveText('Sauce Labs Backpack');
});

test('user can remove backpack from cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage
}) => {
  await page.goto('/');

  await loginPage.login(
    standardUser.username,
    standardUser.password
  );

  await productsPage.addBackpackToCart();

  await cartPage.openCart();

  await expect(
    cartPage.getItemName('Sauce Labs Backpack')
  ).toHaveText('Sauce Labs Backpack');

  await cartPage.removeBackpack();

  await expect(
    cartPage.getItemName('Sauce Labs Backpack')
  ).toHaveCount(0);
});