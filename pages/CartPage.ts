import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartLink: Locator;
  private readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItem = page.locator('[data-test="inventory-item-name"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  getItemName(itemName: string): Locator {
    return this.cartItem.filter({ hasText: itemName });
  }
}