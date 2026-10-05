import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartLink: Locator;
  private readonly cartItem: Locator;
  private readonly removeBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItem = page.locator('[data-test="inventory-item-name"]');
    this.removeBackpackButton = page.locator(
  '[data-test="remove-sauce-labs-backpack"]'
);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async removeBackpack(): Promise<void> {
  await this.removeBackpackButton.click();
}

  getItemName(itemName: string): Locator {
    return this.cartItem.filter({ hasText: itemName });
  }
}