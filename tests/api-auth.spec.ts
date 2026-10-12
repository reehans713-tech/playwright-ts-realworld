
import { test, expect } from '@playwright/test';
import { AuthApi } from '../helpers/auth-api.helper';

test('login returns an access token', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/auth/login',
        {
            data: {
                username: 'emilys',
                password: 'emilyspass',
                expiresInMins: 30,
            },
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.username).toBe('emilys');
    expect(body.accessToken).toBeTruthy();
    expect(body.refreshToken).toBeTruthy();
});


// test('access token allows authenticated user request', async ({ request }) => {
//     const loginResponse = await request.post(
//         'https://dummyjson.com/auth/login',
//         {
//             data: {
//                 username: 'emilys',
//                 password: 'emilyspass',
//                 expiresInMins: 30,
//             },
//         }
//     );

//     expect(loginResponse.status()).toBe(200);

//     const loginData = await loginResponse.json();
//     const token = loginData.accessToken;

//     const response = await request.get(
//         'https://dummyjson.com/auth/me',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     expect(response.status()).toBe(200);

//     const user = await response.json();
//     expect(user.username).toBe('emilys');
// });


// test('access token allows authenticated user request', async ({ request }) => {
//     const authApi = new AuthApi(request);
//     const token = await authApi.login();

//     const response = await request.get(
//         'https://dummyjson.com/auth/me',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     expect(response.status()).toBe(200);

//     const user = await response.json();
//     expect(user.username).toBe('emilys');
// });


test('access token allows authenticated user request', async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.getAuthenticatedUser();

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.username).toBe('emilys');
});




test('request without token is rejected', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/auth/me'
    );

    expect(response.status()).toBe(401);
});


test('request with invalid token is rejected', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: 'Bearer invalid-token-123',
            },
        }
    );

    expect(response.status()).toBe(401);
});



