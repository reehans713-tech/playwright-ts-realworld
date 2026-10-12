
import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com';

export class AuthApi {
    constructor(private request: APIRequestContext) { }

    async login(): Promise<string> {
        const response = await this.request.post(
            `${BASE_URL}/auth/login`,
            {
                data: {
                    username: 'emilys',
                    password: 'emilyspass',
                    expiresInMins: 30,
                },
            }
        );

        if (!response.ok()) {
            throw new Error(`Login failed: ${response.status()}`);
        }

        // const body = await response.json();
        // return body.accessToken as string;

        const data: unknown = await response.json();
        const body = LoginResponseSchema.parse(data);

        return body.accessToken;
    }
    async getAuthenticatedUser() {
        const token = await this.login();

        return this.request.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}



import { z } from 'zod';

const LoginResponseSchema = z.object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    username: z.string(),
});
