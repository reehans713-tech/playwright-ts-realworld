import { test, expect } from '../fixtures/test-fixtures';
//import { standardUser, invalidUser } from '../test-data/users';
import { loginMessages } from '../test-data/messages';
import { invalidUsers, validUsers } from '../test-data/users';

invalidUsers.forEach(user => {
  test(`invalid user cannot login: ${user.username}`, async ({
    page,
    loginPage,

  }) => {
    await page.goto('/');
    await loginPage.login(
      user.username,
      user.password,
    );
    await expect(loginPage.getErrorMessage()).toBeVisible();
    await expect(loginPage.getErrorMessage())
      .toContainText(user.expectedError);

    //await expect(loginPage.getErrorMessage()).toContainText(user.expectedError ?? loginMessages.invalidCredentials);

  });
});

validUsers.forEach(user => {
  test(`valid user can login: ${user.username}`, async ({
    page,
    loginPage,
    productsPage
  }) => {
    await page.goto('/');

    await loginPage.login(
      user.username,
      user.password
    );

    await expect(page).toHaveURL(/inventory/);
    expect(await productsPage.getPageTitle()).toBe('Swag Labs');
  });
});


// test('user can login successfully', async ({ page, loginPage, user }) => {
//   await page.goto('/');

//   await loginPage.login(
//     user.username,
//     user.password
//   );

//   await expect(page).toHaveURL(/inventory/);
// });

test('user cannot login with invalid password', async ({ page, loginPage, user }) => {
  await page.goto('/');

  await loginPage.login(
    user.username,
    'wrong_password'
  );

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toContainText(loginMessages.invalidCredentials);
});

// const errorMessage = await loginPage.getErrorMessage();
// expect(errorMessage).toContain(' Username and password do not match');


// const errorMessage = page.locator('[data-test="error"]');

// await expect(errorMessage).toBeVisible();
// await expect(errorMessage).toContainText(
//   'Username and password do not match'
// );


// test('user cannot login with invalid username', async ({ page, loginPage, user }) => {
//   await page.goto('/');

//   await loginPage.login(
//     'invalid_user',
//     user.password
//   );

//   await expect(loginPage.getErrorMessage()).toBeVisible();
//   await expect(loginPage.getErrorMessage()).toContainText(loginMessages.invalidCredentials);
//   // const errorMessage = await loginPage.getErrorMessage();
//   // expect(errorMessage).toContain('Username and password do not match');

//   // const errorMessage = page.locator('[data-test="error"]');

//   // await expect(errorMessage).toBeVisible();
//   // await expect(errorMessage).toContainText(
//   //   'Username and password do not match'
//   // );
// });

test('user can logout successfully', async ({ page, loginPage, user }) => {
  await page.goto('/');

  await loginPage.login(
    user.username,
    user.password
  );

  await loginPage.openMenu();

  await loginPage.logout();

  await expect(page).toHaveURL(/\/$/);

  // function checkUser(user: User) {
  //   if (user.role === 'invalid') {
  //     console.log(user.expectedError);
  //   }
  // }
});