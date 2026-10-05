import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly addBackpackButton: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.title');
        this.addBackpackButton = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    // async verifyProductsPage(): Promise<void> {
    //     await this.productTitle.waitFor();

    getProductTitle(): Locator {
        return this.productTitle;
    }

    async addBackpackToCart(): Promise<void> {
        await this.addBackpackButton.click();


    }

    // async getCartItemCount(): Promise<string | null> {
    //     return await this.cartBadge.textContent();

    getCartItemCount(): Locator {
        return this.cartBadge;
    }
}

