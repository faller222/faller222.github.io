const axios = require('axios');

async function notify(payload) {
    const formUrl = "https://formspree.io/f/mrbbnono";

    try {
        const response = await axios.post(formUrl, payload, {
            headers: {"Content-Type": "application/json"}
        });

        console.log("Notificacion enviada correctamente.");
    } catch (error) {
        console.error("No se pudo notificar:", error.message);
    }
}

const wait = async (ms) => {
    const interval = 1000; // Intervalo de 1 segundo para la cuenta atrás
    let remainingTime = ms / 1000; // Convertir los milisegundos a segundos

    return new Promise(resolve => {
        const countdown = setInterval(() => {
            console.log(`Esperando... ${remainingTime}s`);
            remainingTime--;

            if (remainingTime <= 0) {
                clearInterval(countdown); // Detener la cuenta atrás cuando termine
                resolve();
            }
        }, interval);
    });
};

function getRdmTime() {
    return Math.floor(Math.random() * (75 - 15 + 1)) + 15;
}

module.exports = {notify, wait, getRdmTime}