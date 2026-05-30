<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref, useTemplateRef } from "vue";

import { navLinks } from "../lib/data";

const route = useRoute();

const gap = ref(10);

const linkRefs = useTemplateRef<HTMLElement[]>("linkRef");

onMounted(() => {
    const firstLink = document?.querySelectorAll(".link")[0] as HTMLElement;

    function setIndicator() {
        linkRefs.value?.forEach((link: HTMLElement) => {
            const linkHeight = link.offsetHeight;
            const actualLink = link.querySelector("a");
            const indicator = document.querySelector(".indicator");

            if (route.path === actualLink?.getAttribute("href")) {
                gsap.to(
                    indicator,
                    {
                        y: linkHeight / 2 - 16,
                    },
                );

                gsap.to(
                    link,
                    {
                        x: 64,
                        duration: 0.5,
                        ease: "power4.inOut",
                    },
                );
            }
        });
    }

    function mouseEnter(el: HTMLElement) {
        const linkHeight = el.offsetHeight;
        const actualLink = el.querySelector("a");
        const indicator = document.querySelector(".indicator");

        if (el !== firstLink) {
            gsap.to(
                firstLink,
                {
                    x: 0,
                    duration: 0.5,
                    ease: "power4.inOut",
                },
            );
        }

        gsap.to(
            indicator,
            {
                top: linkHeight / 2 + el.offsetTop - 29.5,
                rotate: route.path === actualLink?.getAttribute("href") ? 0 : "+=90",
                duration: 1,
                delay: 0.15,
                ease: "elastic.out(1, 0.85)",
            },
        );

        gsap.to(
            el,
            {
                x: 64,
                duration: 0.5,
                ease: "power4.inOut",
            },
        );
    }

    setIndicator();

    function mouseLeave(el: HTMLElement) {
        // gsap.killTweensOf('.indicator');
        // gsap.set('.indicator', {
        //     rotate: 0,
        // });
        gsap.to(
            el,
            {
                x: route.path === el?.querySelector("a")?.getAttribute("href") ? 64 : 0,
                // x: 0,
                duration: 0.5,
                ease: "power4.inOut",
            },
        );
        gsap.to(
            ".indicator",
            {
                top: firstLink.offsetHeight / 2 - 16 - 15,
                rotate: 0,
                duration: 1,
                delay: 0.15,
                ease: "elastic.out(1, 0.85)",
            },
        );
        gsap.to(
            firstLink,
            {
                x: 64,
                duration: 0.5,
                ease: "power4.inOut",
            },
        );
    }

    linkRefs.value?.forEach((el: HTMLElement) => {
        el.addEventListener("mouseenter", () => {
            mouseEnter(el);
        });
    });

    linkRefs.value?.forEach((el: HTMLElement) => {
        el.addEventListener("mouseleave", () => {
            mouseLeave(el);
        });
    });
});
</script>

<template>
    <div class="fixed inset-0 z-14 bg-col-black/90 backdrop-blur-2xl px-[6rem] py-[10rem] text-col-white">
        <div class="flex gap-[2rem]">
            <div class="relative w-1/2">
                <div
                    class="indicator absolute top-0 left-0 size-[3rem] bg-col-orange"
                />
                <ul
                    class="grid"
                    :style="{ rowGap: `${gap}px` }"
                >
                    <li
                        v-for="link in navLinks"
                        :key="link.title"
                        ref="linkRef"
                        class="link w-fit"
                    >
                        <NuxtLink
                            :to="link.href"
                            :style="{
                                color: route.path === link.href ? 'var(--color-col-orange)' : 'var(--color-col-white)',
                                // transform: route.path === link.href ? 'translateX(64px)' : 'none',
                            }"
                            class="font-google-m text-[6rem] leading-[6rem] tracking-tighter hover:text-col-orange!"
                        >
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="w-1/2" />
        </div>
    </div>
</template>
