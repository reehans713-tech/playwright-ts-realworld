import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly logoutButton: Locator;
    private readonly menuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
        this.menuButton = page.locator('#react-burger-menu-btn');

    }
    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    

    // async getErrorMessage(): Promise<string | null> {
    //     return await this.errorMessage.textContent();

    getErrorMessage(): Locator {
        return this.errorMessage;
    }
}

