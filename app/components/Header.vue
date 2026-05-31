<script setup>
import gsap from "gsap";
import { watch } from "vue";

import { useNavStore } from "../store/useNavStore";

const store = useNavStore();

function toggleMenu() {
    store.isOpened();
}

watch(() => store.isOpen, (newVal) => {
    // newVal ? document.querySelector(".header")

    if (newVal) {
        gsap.to(".header", { padding: "1rem 6rem" });

        gsap.to(".menu__text", { yPercent: -100, duration: 0.25, ease: "power2.inOut" });
        gsap.to(".close__text", { yPercent: -100, duration: 0.25, ease: "power2.inOut" });
    }
    else {
        gsap.to(".header", { padding: "1rem" });
        gsap.to(".menu__text", { yPercent: 0, duration: 0.25, ease: "power2.inOut", delay: 1 });
        gsap.to(".close__text", { yPercent: 0, duration: 0.25, ease: "power2.inOut", delay: 1 });
    }
});
</script>

<template>
    <nav
        class="header fixed top-0 left-0 z-15 w-full p-[1rem]"
        style="mix-blend-mode: difference;"
    >
        <div class="flex justify-between items-center">
            <NuxtLink
                to="/"
                class="inline-block  text-[1.75rem] text-col-white"
            >
                ©2026 Playground
            </NuxtLink>

            <button
                type="button"
                class="relative text-[1.75rem] tracking-tight uppercase text-col-white overflow-clip"
                @click="toggleMenu()"
            >
                (
                <span class="inline-block space-x-2 overflow-clip">
                    <span class="menu__text inline-block">
                        Menu
                    </span>
                    <span class="close__text inline-block pl-3 absolute top-full left-0">
                        Close
                    </span>
                    +
                </span>
                )
            </button>

            <NuxtLink
                to="/"
                class="inline-block  text-[1.75rem] text-col-white"
            >
                BlandIrony
            </NuxtLink>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>
