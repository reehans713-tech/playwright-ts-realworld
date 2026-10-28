import { test, expect } from '@playwright/test';

test('TC-SM-001: Homepage Booking Controls and Room Options', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  const booking = page.locator('#booking');

  await expect(
    booking.getByRole('heading', {
      name: 'Check Availability & Book Your Stay',
      exact: true,
    }),
  ).toBeVisible();

  await expect(booking.getByText('Check In', { exact: true })).toBeVisible();
  await expect(booking.getByText('Check Out', { exact: true })).toBeVisible();

  // The date inputs are unlabeled in the inspected DOM, so verify their
  // visibility and count within the booking section.
  const dateInputs = booking.locator('input[type="text"]');
  await expect(dateInputs).toHaveCount(2);
  await expect(dateInputs.nth(0)).toBeVisible();
  await expect(dateInputs.nth(1)).toBeVisible();

  await expect(
    booking.getByRole('button', { name: 'Check Availability', exact: true }),
  ).toBeVisible();

  const rooms = page.locator('#rooms .room-card');
  const expectedRooms = [
    { name: 'Single', price: '£100 per night' },
    { name: 'Double', price: '£150 per night' },
    { name: 'Suite', price: '£225 per night' },
  ];

  await expect(rooms).toHaveCount(expectedRooms.length);

  for (const expected of expectedRooms) {
    const room = rooms.filter({
      has: page.getByRole('heading', { name: expected.name, exact: true }),
    });

    await expect(room).toHaveCount(1);
    await expect(room).toContainText(expected.price);

    const bookNow = room.getByRole('link', { name: 'Book now', exact: true });
    await expect(bookNow).toBeVisible();

    const href = await bookNow.getAttribute('href');
    expect(href).toBeTruthy();

    const reservationUrl = new URL(href!, page.url());
    expect(reservationUrl.origin).toBe(new URL(page.url()).origin);
    expect(reservationUrl.pathname).toMatch(/^\/reservation\/\d+$/);
    expect(reservationUrl.searchParams.get('checkin')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(reservationUrl.searchParams.get('checkout')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});