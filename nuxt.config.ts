// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxt/image", "@pinia/nuxt"],
    css: ["./app/assets/css/index.css"],
    eslint: {
        config: {
            standalone: false,
        },
    },
    vite: {
        optimizeDeps: {
            include: [
                "@vue/devtools-core",
                "@vue/devtools-kit",
                "gsap",
                "gsap/ScrollTrigger",
                "lenis",
            ],
        },
        plugins: [
            tailwindcss(),
        ],
    },
});
