const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');

const app = new Koa();
const router = new Router();

router.get('/random-dog', async (ctx) => {
    console.time('Response time /random-dog');
    try {
        const response = await axios({
            method: 'get',
            url: 'https://dog.ceo/api/breeds/image/random',
            responseType: 'stream',
        });

        ctx.set('Content-Type', response.headers['content-type']);
        ctx.set('Content-Length', response.headers['content-length']);

        ctx.body = response.data;
    } catch (error) {
        console.error('Error fetching the image:', error.message);
        ctx.status = 500;
        ctx.body = { error: 'Error fetching the image' };
    } finally {
        console.timeEnd('Response time /random-dog');
    }
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Koa server running at http://localhost:${PORT}`);
});