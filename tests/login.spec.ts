import { test, expect } from '../fixtures/test-fixtures';
import { standardUser, invalidUser } from '../test-data/users';
import { loginMessages } from '../test-data/messages';

test('user can login successfully', async ({ page, loginPage }) => {
  await page.goto('/');

  await loginPage.login(
    standardUser.username,
    standardUser.password
  );

  await expect(page).toHaveURL(/inventory/);
});

test('user cannot login with invalid password', async ({ page, loginPage }) => {
  await page.goto('/');

  await loginPage.login(
    standardUser.username,
    'wrong_password'
  );

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toContainText(loginMessages.invalidCredentials);

  // const errorMessage = await loginPage.getErrorMessage();
  // expect(errorMessage).toContain(' Username and password do not match');


  // const errorMessage = page.locator('[data-test="error"]');

  // await expect(errorMessage).toBeVisible();
  // await expect(errorMessage).toContainText(
  //   'Username and password do not match'
  // );
});

test('user cannot login with invalid username', async ({ page, loginPage }) => {
  await page.goto('/');

  await loginPage.login(
    invalidUser.username,
    invalidUser.password
  );

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toContainText(loginMessages.invalidCredentials);
  // const errorMessage = await loginPage.getErrorMessage();
  // expect(errorMessage).toContain('Username and password do not match');

  // const errorMessage = page.locator('[data-test="error"]');

  // await expect(errorMessage).toBeVisible();
  // await expect(errorMessage).toContainText(
  //   'Username and password do not match'
  // );
});