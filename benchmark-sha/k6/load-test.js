import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";

const targets = [
    { name: "Rust", url: "http://localhost:8081/save" },
    { name: "Quarkus", url: "http://localhost:8082/save" },
    { name: "NodeJS", url: "http://localhost:8083/save" },
];

let requestCounter = 1_000_000;

function generateUniquePayload(size) {
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}_${requestCounter++}`;
    return { text: uniqueId+randomString(size) };
}

function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const headers = { "Content-Type": "application/json" };

const requestDurations = {};
targets.forEach((target) => {
    requestDurations[target.name] = new Trend(`http_req_duration_${target.name}`);
});

// Configurar escenarios independientes para cada servicio
export let options = {
    scenarios: {
        rust: {
            executor: 'constant-vus',
            exec: 'testRust',
            vus: 50,
            duration: '1m',
        },
        quarkus: {
            executor: 'constant-vus',
            exec: 'testQuarkus',
            vus: 50,
            duration: '1m',
            startTime: '1m10s', // 10s de margen entre pruebas
        },
        nodejs: {
            executor: 'constant-vus',
            exec: 'testNodeJS',
            vus: 50,
            duration: '1m',
            startTime: '2m20s', // 10s de margen entre pruebas
        },
    },
};

// Funciones específicas para cada servicio
export function testRust() {
    const payload = generateUniquePayload(1024*1024);
    let res = http.post(targets[0].url, JSON.stringify(payload), { headers });
    requestDurations[targets[0].name].add(res.timings.duration);
    check(res, {
        "is status 200": (r) => r.status === 200 || r.status === 201
    });
    sleep(0.01); // Reducido el tiempo de sleep para más carga
}

export function testQuarkus() {
    const payload = generateUniquePayload(1024*1024);
    let res = http.post(targets[1].url, JSON.stringify(payload), { headers });
    requestDurations[targets[1].name].add(res.timings.duration);
    check(res, {
        "is status 200": (r) => r.status === 200 || r.status === 201
    });
    sleep(0.01);
}

export function testNodeJS() {
    const payload = generateUniquePayload(1024*1024);
    let res = http.post(targets[2].url, JSON.stringify(payload), { headers });
    requestDurations[targets[2].name].add(res.timings.duration);
    check(res, {
        "is status 200": (r) => r.status === 200 || r.status === 201
    });
    sleep(0.01);
}
