<script setup lang="ts">
import { onMounted } from "vue";

import { useLenis } from "./composables/use-lenis";
import { useLoaderStore } from "./store/useLoaderStore";

const store = useLoaderStore();

// function onLoaded() {
//     store.isLoading = false;
// }

// const scrolling = ref(false);

// async function Scroll(e: { direction: number }) {
//     if (scrolling.value)
//         return;
//     if (!document.querySelector(".header"))
//         return;

//     if (e.direction === 1) {
//         scrolling.value = true;

//         await gsap.to(".header, .header-menu", {
//             top: "-12rem",
//             ease: "power1.in",
//             duration: 0.5,
//         });

//         scrolling.value = false;
//     }
//     else {
//         scrolling.value = true;

//         await gsap.to(".header, .header-menu", {
//             top: "0rem",
//             ease: "power1.out",
//             duration: 0.5,
//         });

//         scrolling.value = false;
//     }
// }

onMounted(() => {
    const { init } = useLenis();

    init();
});
</script>

<template>
    <div class="app preloading">
        <Header />
        <Loader v-if="store.isLoading" :on-loaded="store.isLoaded" />
        <NuxtPage v-else />
    </div>
</template>
