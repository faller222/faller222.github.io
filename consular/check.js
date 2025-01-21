const url = 'https://www.exteriores.gob.es/Consulados/montevideo/es/ServiciosConsulares/Paginas/index.aspx?scca=Nacionalidad&scco=Uruguay&scd=200&scs=Nacionalidad+espa%C3%B1ola+por+la+Ley+de+Memoria+Democr%C3%A1tica';
const { exec } = require('child_process');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


function changeMacAddress(iface) {
    const randomMac = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => Math.floor(Math.random() * 16).toString(16));
    exec(`sudo ifconfig ${iface} down && sudo ifconfig ${iface} hw ether ${randomMac} && sudo ifconfig ${iface} up`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error cambiando la MAC: ${error.message}`);
            return;
        }
        console.log(`MAC cambiada a: ${randomMac}`);
    });
}

// changeMacAddress('eth0');



puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url);
        console.log('Página cargada.');

        // Buscar el enlace y hacer clic
        const linkHref = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a[title="Se abre en ventana nueva"]'));
            const link = links.find(l => l.innerText.includes('Cita Ley Memoria Democrática'));
            return link ? link.href : null;
        });

        if (!linkHref) {
            console.error('No se encontró el enlace con el texto "Cita Ley Memoria Democrática".');
            await browser.close();
            return;
        }


        const newPage = await browser.newPage();
        await newPage.setExtraHTTPHeaders({
            'Referer': url,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        });

        // Manejar el alert en la nueva página
        newPage.on('dialog', async (dialog) => {
            console.log('Se detectó un alert:', dialog.message());
            await dialog.accept();
        });

        await newPage.goto(linkHref, { waitUntil: 'domcontentloaded' });

        // Esperar un tiempo por si el contenido se carga dinámicamente
        await new Promise(resolve => setTimeout(resolve, 5000));


        // Buscar el botón "Continue / Continuar" y hacer clic
        const continueButton = await newPage.$('button');
        if (continueButton) {
            const buttonHtml = await newPage.evaluate(button => button.outerHTML, continueButton);
            console.log('HTML del botón:', buttonHtml);

            await continueButton.click();
            console.log('Hiciste clic en el botón "Continue / Continuar".');

            await new Promise(resolve => setTimeout(resolve, 10_000));

        } else {
            console.error('No se encontró el botón de "Continue / Continuar".');
            await browser.close();
            return;
        }



        // Verificar el contenido del body
        const content = await newPage.content();
        if (content.trim().length === 0) {
            console.log('La página cargada está vacía.');
        } else {
            console.log('Contenido de la página cargada:');

            await new Promise(resolve => setTimeout(resolve, 30_000));
        }
    } catch (error) {
        console.error('Error durante la ejecución:', error);
    } finally {

        console.log('Chau');
        await browser.close();
    }
})();