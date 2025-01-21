const path = require('path');
const fs = require('fs');

function config() {

    function checkOrCreateEnv() {
        const envPath = path.resolve(__dirname, '.env');

        if (fs.existsSync(envPath)) {
            console.log('.env file already exists.');
            return;
        }

        const envTemplate = `
SMB_USER='awesome_user'
SMB_PASS='secret_password'
SMB_URL='https://someURL.com'
        `.trim();

        fs.writeFileSync(envPath, envTemplate);
        console.log('.env file created with default template.');
        throw new Error('You must update the .env file with your actual credentials before proceeding.');
    }

    function loadEnv() {
        const dotenv = require("dotenv");

        const envPath = path.resolve(__dirname, ".env");
        dotenv.config({ path: envPath });

        console.log('Environment variables loaded.');
        console.log('User:', process.env.SMB_USER);
    }

    checkOrCreateEnv();
    loadEnv();
}

module.exports = {config};
