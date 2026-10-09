import { test, expect } from '../fixtures/test-fixtures';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { checkoutUser } from '../test-data/users';
import { loginUser } from '../helpers/auth.helper';
import { log } from 'node:console';

interface SortingOption {
  value: string;
  expectedText: string;
  order: 'asc' | 'desc';
}

const sortingOptions: SortingOption[] = [
  {
    value: 'lohi',
    expectedText: 'Price (low to high)',
    order: 'asc',
  },
  {
    value: 'hilo',
    expectedText: 'Price (high to low)',
    order: 'desc',
  },
];

test('user can add backpack to cart', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  user
}) => {
  await loginUser(page, loginPage, user);

  // await page.goto('/');

  // await loginPage.login(
  //   user.username,
  //   user.password
  // );

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
  cartPage,
  user
}) => {

  await loginUser(page, loginPage, user);

  // await page.goto('/');

  // await loginPage.login(
  //   user.username,
  //   user.password
  // );

  await productsPage.addBackpackToCart();

  await cartPage.openCart();

  await expect(
    cartPage.getItemName('Sauce Labs Backpack')
  ).toHaveText('Sauce Labs Backpack');

  await cartPage.removeBackpack();
  expect(await cartPage.isCartEmpty()).toBe(true);

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
  checkoutPage,
  user

}) => {

  await loginUser(page, loginPage, user);

  // await page.goto('/');
  // await loginPage.login(
  //   user.username,
  //   user.password,
  // );
  await productsPage.addBackpackToCart();
  await cartPage.openCart();
  await checkoutPage.clickCheckout();


  await checkoutPage.FillCustomerInformation(
    checkoutUser.firstName,
    checkoutUser.lastName,
    checkoutUser.postalCode
  );

  await checkoutPage.continueCheckout();

  await checkoutPage.finishCheckOut();
  await expect(checkoutPage.getConfirmationMessage()).toHaveText('Thank you for your order!');

  await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
});

// test('user can sort products by price low to high', async ({
//   page,
//   loginPage,
//   productsPage
// }) => {
//   await page.goto('/');
//   await loginPage.login(
//     standardUser.username,
//     standardUser.password,
//   );

//   await productsPage.sortProducts('lohi');
//   const prices = await productsPage.getProductPricesAsNumbers();

//   expect(prices).toEqual(
//     [...prices].sort((a, b) => a - b)
//   );
//   // const prices = await productsPage.getProductsPrices().allTextContents();
//   // const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
//   // expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));

//   await expect(productsPage.getSelectedSort())
//     .toHaveText('Price (low to high)');
// });

sortingOptions.forEach(({ value, expectedText, order }) => {
  test(`user can sort products: ${expectedText}`, async ({
    page,
    loginPage,
    productsPage,
    user
  }) => {
    await loginUser(page, loginPage, user);

    // await page.goto('/');

    // await loginPage.login(
    //   user.username,
    //   user.password
    // );

    await productsPage.sortProducts(value);
    const prices = await productsPage.getProductPricesAsNumbers();
    const sortedPrices = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );
    expect(prices).toEqual(sortedPrices);

    await expect(productsPage.getSelectedSort())
      .toHaveText(expectedText);
  });
});