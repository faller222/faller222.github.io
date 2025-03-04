
(async () => {
    while (true) {
        // Haz scroll hacia abajo para cargar más contenido
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Espera un segundo para que cargue el contenido

        // Obtén todos los SPANs con la clase "artdeco-button__text" y texto "Conectar"
        const connectSpans = Array.from(document.querySelectorAll('span.artdeco-button__text'))
            .filter(span => span.textContent.trim() === 'Conectar');

        // Itera de forma secuencial sobre los botones "Conectar"
        for (const span of connectSpans) {
            span.click(); // Click en "Conectar"
            await new Promise(resolve => setTimeout(resolve, 700)); // Espera 700ms

            // Busca el SPAN con texto "Enviar sin nota" y hazle click
            const sendSpan = Array.from(document.querySelectorAll('span.artdeco-button__text'))
                .find(s => s.textContent.trim() === 'Enviar');
            if (sendSpan) {
                sendSpan.click(); // Click en "Enviar sin nota"
                await new Promise(resolve => setTimeout(resolve, 700)); // Espera otros 700ms
            }
        }

        // Después de terminar el bucle, busca y clickea el botón "Siguiente"
        const nextButton = Array.from(document.querySelectorAll('span.artdeco-button__text'))
            .find(span => span.textContent.trim() === 'Siguiente');
        if (nextButton) {
            nextButton.click(); // Click en "Siguiente"
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera un segundo después de avanzar
        } else {
            console.log('No se encontró el botón "Siguiente". Realizando scroll y continuando...');
        }
    }
})();
