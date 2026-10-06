import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;
    private readonly checkoutButton: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly confirmationMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('.complete-header');

    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async FillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string,
    ): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

        async continueCheckout(): Promise<void> {
            await this.continueButton.click();
        }

        async finishCheckOut(): Promise<void> {
            await this.finishButton.click();
        }

        getConfirmationMessage(): Locator {
            return this.confirmationMessage;
        }

    }
