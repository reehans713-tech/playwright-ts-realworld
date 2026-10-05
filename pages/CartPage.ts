import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartLink: Locator;
  private readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItem = page.locator('.inventory_item_name');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  // async getItemName(): Promise<string | null> {
  //   return await this.cartItem.textContent();

  getItemName(): Locator {
    return this.cartItem;
  }
}