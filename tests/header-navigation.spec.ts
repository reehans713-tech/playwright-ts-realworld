
import { test, expect } from '@playwright/test';

const homepageUrl = 'https://automationintesting.online/';

test('HNAV-002: Header links navigate to their sections', async ({ page }) => {
   await page.goto(homepageUrl, { waitUntil: 'domcontentloaded' });

    const navigation = page.getByRole('navigation');

    const destinations = [
        { name: 'Rooms', href: '/#rooms', section: page.locator('#rooms') },
        { name: 'Booking', href: '/#booking', section: page.locator('#booking') },
        { name: 'Location', href: '/#location', section: page.locator('#location') },
        { name: 'Contact', href: '/#contact', section: page.locator('#contact') },
    ];

    for (const destination of destinations) {
        const link = navigation.getByRole('link', {
            name: destination.name,
            exact: true,
        });

        await expect(link).toHaveAttribute('href', destination.href);
        await link.click();

        await expect.poll(() => new URL(page.url()).hash).toBe(
            destination.href.slice(1),
        );

        await expect(destination.section).toBeInViewport();
    }
});
