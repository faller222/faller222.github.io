const express = require('express');
const axios = require('axios');

const app = express();

app.get('/random-dog', async (req, res) => {
    console.time('Response time /random-dog');
    try {
        const response = await axios({
            method: 'get',
            url: 'https://dog.ceo/api/breeds/image/random',
            responseType: 'stream',
        });

        res.set('Content-Type', response.headers['content-type']);
        res.set('Content-Length', response.headers['content-length']);

        // Pipe the response stream directly to the client
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching the image:', error.message);
        res.status(500).json({ error: 'Error fetching the image' });
    } finally {
        console.timeEnd('Response time /random-dog');
    }
});

const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});