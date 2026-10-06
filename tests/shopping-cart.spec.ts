import { test, expect } from '../fixtures/test-fixtures';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { standardUser, checkoutUser } from '../test-data/users';

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

  await expect(productsPage.getProductTitle()).toBeVisible();
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

  await expect(productsPage.getCartItemCount()).toHaveCount(0);
});

test('user can proceed to check out', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  CheckoutPage

}) => {
  await page.goto('/');
  await loginPage.login(
    standardUser.username,
    standardUser.password,
  );
  await productsPage.addBackpackToCart();
  await cartPage.openCart();
  await CheckoutPage.clickCheckout();


  await CheckoutPage.FillCustomerInformation(
    checkoutUser.firstName,
    checkoutUser.lastName,
    checkoutUser.postalCode
  );

  await CheckoutPage.continueCheckout();

  await CheckoutPage.finishCheckOut();
  await expect(CheckoutPage.getConfirmationMessage()).toHaveText('Thank you for your order!');

  await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
});
