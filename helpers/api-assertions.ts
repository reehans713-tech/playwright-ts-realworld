import { expect, type APIResponse } from '@playwright/test';

export function expectJsonResponse(
    response: APIResponse,
    expectedStatus: number
): void {
    expect(response.status()).toBe(expectedStatus);
    expect(response.headers()['content-type']).toContain('application/json');
}