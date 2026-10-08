import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly addBackpackButton: Locator;
    private readonly cartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly selectedSort: Locator;
    private readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.title');
        this.addBackpackButton = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.selectedSort = page.locator('.active_option');
        this.productPrices = page.locator(
            '[data-test="inventory-item-price"]'
        );
    }

    // async verifyProductsPage(): Promise<void> {
    //     await this.productTitle.waitFor();

    getProductTitle(): Locator {
        return this.productTitle;
    }

    async addBackpackToCart(): Promise<void> {
        await this.addBackpackButton.click();


    }

    async sortProducts(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }
    async getProductPricesAsNumbers(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();

        return prices.map(
            price => parseFloat(price.replace('$', ''))
        );
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }


    getSelectedSort(): Locator {
        return this.selectedSort;
    }

    getProductsPrices(): Locator {
        return this.productPrices;
    }

    // async getCartItemCount(): Promise<string | null> {
    //     return await this.cartBadge.textContent();

    getCartItemCount(): Locator {
        return this.cartBadge;
    }
}

