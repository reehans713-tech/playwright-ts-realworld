
import { test, expect } from '@playwright/test';

const homepageUrl = 'https://automationintesting.online/';

test('HNAV-003: Brand and Admin links navigate to their destinations', async ({ page }) => {
    await page.goto(`${homepageUrl}#rooms`, { waitUntil: 'domcontentloaded' });

    const navigation = page.getByRole('navigation');
    const brandLink = navigation.getByRole('link', {
        name: 'Shady Meadows B&B',
        exact: true,
    });

    await expect(brandLink).toHaveAttribute('href', '/');
    await brandLink.click();
    await expect(page).toHaveURL(homepageUrl);

    const adminLink = page.getByRole('navigation').getByRole('link', {
        name: 'Admin',
        exact: true,
    });

    await expect(adminLink).toHaveAttribute('href', '/admin');
    await adminLink.click();

    await expect(page).toHaveURL(new URL('/admin', homepageUrl).toString());
    await expect(
        page.getByRole('heading', { name: 'Login', exact: true }),
    ).toBeVisible();
});
