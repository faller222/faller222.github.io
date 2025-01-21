// https://chatgpt.com/c/678f029a-a670-8005-99f1-60dae0ac9473

const puppeteer = require('puppeteer');
const {notify, wait, getRdmTime} = require('./utils');
require('./env').config();

async function automateLogin() {

    const {SMB_USER, SMB_PASS, SMB_URL} = process.env;

    if (!SMB_USER || !SMB_PASS || !SMB_URL) {
        throw new Error('Faltan variables de entorno SMB_USER, SMB_PASS o SMB_URL en el archivo .env');
    }

    notify({message: "Inicio Automatico"});
    let i = 1;
    try {
        const browser = await puppeteer.launch({headless: true}); // Cambia a true para modo headless
        //const page = await browser.newPage();
        const page = (await browser.pages())[0];


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
        await wait(1_000);
        await page.waitForNavigation({waitUntil: 'networkidle2'});
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

        notify({error: JSON.stringify(errorDetails), times: i});
        console.error('Error durante la automatización:', error);
    } finally {
        await browser.close();
    }
}

automateLogin();