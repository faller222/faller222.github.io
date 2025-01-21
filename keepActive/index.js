const puppeteer = require('puppeteer');
const {notify, wait, getRdmTime} = require('./utils');
require('./env').config();
const path = require('path');
const fs = require('fs');

console.log("Current working directory:", process.cwd());
console.log("Dirname:", __dirname);

async function automateLogin() {

    const {SMB_USER, SMB_PASS, SMB_URL} = process.env;

    if (!SMB_USER || !SMB_PASS || !SMB_URL) {
        throw new Error('Faltan variables de entorno SMB_USER, SMB_PASS o SMB_URL en el archivo .env');
    }

    notify({message: "Inicio Automatico"});
    let i = 1;
    const browser = await puppeteer.launch({
        executablePath: 'C:\\progra~2\\Google\\Chrome\\Application\\chrome.exe',
        headless: true
    });
    //const page = await browser.newPage();
    const page = (await browser.pages())[0];
    try {


        // Navega a la URL de login
        await page.goto(SMB_URL, {waitUntil: 'networkidle2'});

        // Espera que aparezca el banner de cookies
        const acceptButtonSelector = '.disclamer .agree';
        await page.waitForSelector(acceptButtonSelector);

        // Haz clic en "Acepto"
        await page.click(acceptButtonSelector);
        console.log('Banner de cookies aceptado.');

        await new Promise(resolve => setTimeout(resolve, 1_000));

        // Selectores del formulario
        const userSelector = 'input[name="vb_login_username"]';
        const passSelector = 'input[name="vb_login_password"]';
        const submitSelector = 'button[type="submit"]';

        await page.waitForSelector(userSelector);
        await page.waitForSelector(passSelector);
        await page.waitForSelector(submitSelector);

        // Completa los campos del formulario
        await page.type(userSelector, SMB_USER);
        await page.type(passSelector, SMB_PASS);

        // Enviar el formulario
        await page.click(submitSelector);

        // Espera a la redirección después del login
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await wait(10_000);
        //await page.waitForNavigation({waitUntil: 'networkidle2'});
        console.log('Inicio de sesión completado con éxito.');


        while (true) {
            console.log('KeepAlive....');
            await wait(getRdmTime() * 1000);
            await page.goto(SMB_URL, {waitUntil: 'networkidle2'});
            i++
        }

    } catch (error) {
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            name: error.name,
        };
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const evidenceDir = path.join(__dirname, 'evidence');
        const screenshotPath = path.join(evidenceDir, `error-screenshot-${timestamp}.png`);

        notify({error: JSON.stringify(errorDetails), times: i, screenshotPath});
        console.error('Error durante la automatización:', error);


        await page.screenshot({path: screenshotPath});
        console.log(`Screenshot guardado: ${screenshotPath}`);

    } finally {
        await browser.close();
    }
}

automateLogin();
