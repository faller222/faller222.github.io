import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";

const targets = [
    { name: "Rust", url: "http://localhost:8081/save" },
    //{ name: "Quarkus", url: "http://localhost:8082/save" },
    // { name: "NodeJS", url: "http://localhost:8083/save" },
];

const payloads = {
    small: () => randomString(100),
    // large: () => randomString(1024 * 1024),
};

function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const headers = { "Content-Type": "application/json" };

const requestDurations = {};
targets.forEach((target) => {
    requestDurations[target.name] = new Trend(`http_req_duration_${target.name}`);
});

export let options = {
    scenarios: {
        rust: { executor: "constant-vus", vus: 100, duration: "30s" },
        // node: { executor: "constant-vus", startTime: "0s", vus: 100, duration: "30s" },
    },
};

export default function () {
    for (const size in payloads) {
        const text = payloads[size]();
        for (const target of targets) {
            let res = http.post(target.url, JSON.stringify({ text }), { headers });

            // 🔹 **Registrar la métrica personalizada**
            requestDurations[target.name].add(res.timings.duration);

            check(res, { "is status 200": (r) => r.status === 200 });

            sleep(0.1);
        }
    }
}

// 🔹 **Generar reporte separado por servicio**
export function handleSummary(data) {
    const summary = targets.map((target) => {
        const metricName = `http_req_duration_${target.name}`;
        const group = data.metrics[metricName]?.values;

        return `
📝 **Resultados para ${target.name}**
----------------------------------
📌 Tiempo Máximo:   ${group?.max?.toFixed(2)} ms
📌 Tiempo Mínimo:   ${group?.min?.toFixed(2)} ms
📌 Promedio:        ${group?.avg?.toFixed(2)} ms
📌 Percentil 90:    ${group?.["p(90)"]?.toFixed(2)} ms
📌 Requests Totales: ${data.metrics.iterations.count}
`;
    }).join("\n");

    //console.log(summary);
    return { stdout: summary };
}
