
import { APIRequestContext, APIResponse } from '@playwright/test';
import { z } from 'zod';

export const PostSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

// export interface Post {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }

export class PostApi {
    constructor(private request: APIRequestContext) { }

    async getPost(id: number): Promise<APIResponse> {
        return this.request.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
    }

    async createPost(data: Omit<Post, 'id'>): Promise<APIResponse> {
        return this.request.post(
            'https://jsonplaceholder.typicode.com/posts',
            { data }
        );
    }

    async updatePost(id: number, data: Post): Promise<APIResponse> {
        return this.request.put(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            { data }
        );
    }

    async patchPost(
        id: number,
        data: Partial<Omit<Post, 'id'>>
    ): Promise<APIResponse> {
        return this.request.patch(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            { data }
        );
    }

    async deletePost(id: number): Promise<APIResponse> {
        return this.request.delete(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
    }

    // async parsePost(response: APIResponse): Promise<Post> {
    //     return response.json() as Promise<Post>;
    // }

    async parsePost(response: APIResponse): Promise<Post> {
        const data: unknown = await response.json();
        return PostSchema.parse(data);
    }

}


