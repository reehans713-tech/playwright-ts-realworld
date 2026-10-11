
import { test, expect } from '@playwright/test';
import { Post, PostApi, PostSchema } from '../helpers/post-api.helper';

// interface Post {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }

test('GET post returns the expected data', async ({ request }) => {
    const postApi = new PostApi(request);
    const response = await postApi.getPost(1);

    expect(response.status()).toBe(200);

    // const post: Post = await response.json();
    const post = await postApi.parsePost(response);

    expect(post.userId).toBe(1);
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
});


test('GET non-existent post returns 404', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/999999'
    );

    expect(response.status()).toBe(404);
});


test('POST creates a new post', async ({ request }) => {
    const postApi = new PostApi(request);

    const response = await postApi.createPost({
        title: 'Playwright API Testing',
        body: 'Learning POST requests with TypeScript',
        userId: 1,
    });

    expect(response.status()).toBe(201);

    const post = await response.json();

    expect(post.title).toBe('Playwright API Testing');
    expect(post.body).toBe('Learning POST requests with TypeScript');
    expect(post.userId).toBe(1);
    expect(post.id).toBeTruthy();
});


test('PUT updates an existing post', async ({ request }) => {
    const postApi = new PostApi(request);

    const response = await postApi.updatePost(1, {
        id: 1,
        title: 'Updated Playwright Post',
        body: 'Testing PUT with TypeScript',
        userId: 1,
    });


    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.id).toBe(1);
    expect(post.title).toBe('Updated Playwright Post');
    expect(post.body).toBe('Testing PUT with TypeScript');
    expect(post.userId).toBe(1);
});

test('PATCH updates only selected post fields', async ({ request }) => {
    const postApi = new PostApi(request);
    const response = await postApi.patchPost(1, {
        title: 'Patched Playwright Post',
    });

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title).toBe('Patched Playwright Post');
});

test('DELETE removes a post', async ({ request }) => {
    const postApi = new PostApi(request);

    const response = await postApi.deletePost(1);
    expect(response.status()).toBe(200);
});

test('Zod rejects invalid post data', () => {
    const invalidPost = {
        userId: 'one',
        id: 1,
        title: 'Test post',
        body: 'Test body',
    };

    const result = PostSchema.safeParse(invalidPost);

    expect(result.success).toBe(false);
});