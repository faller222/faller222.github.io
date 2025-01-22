const axios = require('axios');

async function getDog() {
    const response = await axios({
        method: 'get',
        url: 'https://dog.ceo/api/breeds/image/random',
    });

    if (response.data.status !== "success") {
        throw Error("Unexpected call status: " + response.data.status);
    }

    return response.data;
}

module.exports = { getDog };