import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../test-data/users';

export async function loginUser(
    page: Page,
    loginPage: LoginPage,
    user: User
): Promise<void> {
    await page.goto('/');
    await loginPage.login(user.username, user.password);
}