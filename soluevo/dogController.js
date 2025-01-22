const { getDog } = require('./dogApi');

const express = require('express');
const router = express.Router();

router.get('/random-dog', async (req, res) => {
    console.time('Response time /random-dog');
    try {
        const dog = await getDog();
        res.json(dog);
    } catch (error) {
        console.error('Error fetching the image:', error.message);
        res.status(500).json({ error: 'Error fetching the image' });
    } finally {
        console.timeEnd('Response time /random-dog');
    }
});

module.exports = { dogRouter: router };