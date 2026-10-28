import { test, expect } from '@playwright/test';

const homepageUrl = 'https://automationintesting.online/';

test('TC-SM-009: Hero Book Now navigates to booking section', async ({ page }) => {
    await page.goto(homepageUrl);

    const booking = page.locator('#booking');
    const bookNow = page.getByRole('link', {
        name: 'Book Now',
        exact: true,
    });

    await expect(bookNow).toHaveAttribute('href', '#booking');
    await bookNow.click();

    await expect(page).toHaveURL(/#booking$/);
    await expect(booking).toBeInViewport();
});

// test('TC-SM-010: In-page navigation links have matching targets', async ({ page }) => {
//     await page.goto(homepageUrl);

//     //   const navigation = page.getByRole('navigation');
//     //   const inPageLinks = navigation.locator('a[href^="/#"]');
//     const inPageLinks = page.locator('nav a[href^="/#"]');
//     const linkCount = await inPageLinks.count();


//     expect(linkCount).toBeGreaterThan(0);

//     for (let index = 0; index < linkCount; index += 1) {
//         const link = inPageLinks.nth(index);
//         const href = await link.getAttribute('href');

//         expect(href, 'In-page navigation link should have an href').toBeTruthy();

//         const targetId = new URL(href!, page.url()).hash.slice(1);
//         const targetExists = await page.locator('[id]').evaluateAll(
//             (elements, id) => elements.some((element) => element.id === id),
//             targetId,
//         );

//         expect(
//             targetExists,
//             `Navigation link "${await link.innerText()}" should target an existing element with id="${targetId}"`,
//         ).toBe(true);
//     }
// });


test('TC-SM-010: In-page navigation links have matching targets', async ({ page }) => {
    await page.goto(homepageUrl);

    const inPageLinks = page.locator('nav a[href^="/#"]');

    await expect(inPageLinks).toHaveCount(5);

    for (let index = 0; index < 5; index += 1) {
        const link = inPageLinks.nth(index);
        const href = await link.getAttribute('href');

        expect(href).toBeTruthy();

        const targetId = new URL(href!, page.url()).hash.slice(1);
        const targetExists = await page.locator(`[id="${targetId}"]`).count();

        expect(
            targetExists,
            `Navigation link "${await link.innerText()}" should target an existing element with id="${targetId}"`,
        ).toBeGreaterThan(0);
    }
});


test('TC-SM-011: Check In calendar advances month without changing date', async ({
    page,
}) => {
    await page.goto(homepageUrl);

    const booking = page.locator('#booking');
    const checkIn = booking.locator('input[type="text"]').first();
    const originalCheckInValue = await checkIn.inputValue();

    await checkIn.click();

    const calendar = page.getByRole('dialog', { name: 'Choose Date' });
    await expect(calendar).toBeVisible();

    const monthHeading = calendar.getByRole('heading', { level: 2 });
    const displayedMonth = (await monthHeading.innerText()).trim();
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const [monthName, yearText] = displayedMonth.split(' ');
    const monthIndex = monthNames.indexOf(monthName);
    const year = Number(yearText);

    expect(monthIndex, `Unexpected calendar month: "${displayedMonth}"`).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(year), `Unexpected calendar year: "${displayedMonth}"`).toBe(true);

    const nextMonthIndex = (monthIndex + 1) % monthNames.length;
    const nextMonthYear = year + (monthIndex === monthNames.length - 1 ? 1 : 0);
    const expectedNextMonth = `${monthNames[nextMonthIndex]} ${nextMonthYear}`;

    await calendar.getByRole('button', { name: 'Next Month', exact: true }).click();

    await expect(monthHeading).toHaveText(expectedNextMonth);
    await expect(checkIn).toHaveValue(originalCheckInValue);
});