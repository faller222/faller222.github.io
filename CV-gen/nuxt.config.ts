// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true}, app: {
        baseURL: '/L/'
    },
    css: ['@/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.min.css']
})
