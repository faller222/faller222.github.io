const request = require('supertest');
const express = require('express');
const { dogRouter } = require('./dogController');
const nock = require('nock');

const app = express();
app.use('/dog', dogRouter);

describe('Dog API Endpoints', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    test('GET /dog/random-dog should return a random dog JSON', async () => {
        nock('https://dog.ceo')
            .get('/api/breeds/image/random')
            .reply(200, { status: 'success', message: 'https://example.com/dog.jpg' });

        const response = await request(app).get('/dog/random-dog');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'https://example.com/dog.jpg',
        });
    });


    test('GET /dog/random-dog should handle API errors', async () => {
        nock('https://dog.ceo')
            .get('/api/breeds/image/random')
            .reply(500, { error: 'Internal Server Error' });

        const response = await request(app).get('/dog/random-dog');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching the image' });
    });

    test('GET /dog/random-dog should handle no Success status', async () => {
        nock('https://dog.ceo')
            .get('/api/breeds/image/random')
            .reply(200, { status: 'error', message: 'Error test.' });

        const response = await request(app).get('/dog/random-dog');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching the image' });
    });
});