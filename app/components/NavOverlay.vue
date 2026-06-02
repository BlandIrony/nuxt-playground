<script setup lang="ts">
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { onMounted, ref, useTemplateRef, watch } from "vue";

import { navLinks } from "../lib/data";
import { useNavStore } from "../store/useNavStore";

gsap.registerPlugin(SplitText);

const route = useRoute();
const store = useNavStore();

const gap = ref(10);

const linkRefs = useTemplateRef<HTMLElement[]>("linkRef");

const overlayTl = ref<gsap.core.Timeline | null>(null);

onMounted(() => {
    const firstLink = document?.querySelectorAll(".nav__link")[0] as HTMLElement;
    const isHovering = ref(false);

    SplitText.create([".nav__link", ".contact__link", ".contact__links__header", ".caption"], { type: "lines", linesClass: "line", mask: "lines" });

    gsap.set(".nav__link .line, .contact__link .line, .contact__links__header .line, .caption .line", {
        yPercent: 110,
    });

    gsap.set(".indicator", {
        left: -60,
        opacity: 0,
        y: firstLink.offsetHeight / 2 - 13,
    });

    gsap.set(".overlay__image", { opacity: 0 });

    overlayTl.value = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            gsap.to(firstLink, { x: 0 });
        },
    })
        .set(".indicator", {
            left: -60,
            opacity: 0,
            y: firstLink.offsetHeight / 2 - 13,
        })
        .add("start", 0)
        .to(
            ".overlay__wrapper",
            {
                duration: 0.75,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power2.inOut",
            },
            "start",
        )
        .to(
            ".nav__link .line",
            {
                yPercent: 0,
                duration: 0.75,
                stagger: 0.04,
                ease: "power4.out",
            },
            "start+=.15",
        )
        .to(
            ".contact__links__header .line",
            {
                yPercent: 0,
                duration: 0.75,
                ease: "power4.out",
            },
            "<+=0.3",
        )
        .to(
            ".contact__link .line",
            {
                yPercent: 0,
                duration: 0.75,
                stagger: 0.04,
                ease: "power4.out",
            },
            "<",
        )
        .to(
            ".overlay__image",
            {
                opacity: 1,
                duration: 0.5,
                ease: "power2.in",
            },
            "<+=0.25",
        )
        .to(
            ".caption .line",
            {
                yPercent: 0,
                duration: 0.75,
                stagger: 0.04,
                ease: "power4.out",
            },
            "<",
        )
        .set(".indicator", {
            opacity: 0,
        })
        .call(() => {
            linkRefs.value?.forEach((link: HTMLElement) => {
                const actualLink = link.querySelector("a");

                if (route.path === actualLink?.getAttribute("href")) {
                    gsap.to(".indicator", {
                        opacity: 1,
                        left: 0,
                        ease: "elastic.out(1, 0.85)",
                        duration: 0.75,
                        delay: 0.25,
                    });
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
        }, [], "<");

    // function setIndicator() {

    // }

    // setIndicator();

    function mouseEnter(el: HTMLElement) {
        const linkHeight = el.offsetHeight;
        const actualLink = el.querySelector("a");
        const indicator = document.querySelector(".indicator");

        isHovering.value = true;

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
                top: linkHeight / 2 + el.offsetTop - 26,
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

    function mouseLeave(el: HTMLElement) {
        isHovering.value = false;
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
                top: firstLink.offsetHeight / 2 - 13 - 10,
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
            if (!isHovering.value) {
                mouseEnter(el);
            }
        });
    });

    linkRefs.value?.forEach((el: HTMLElement) => {
        el.addEventListener("mouseleave", () => {
            if (isHovering.value) {
                mouseLeave(el);
            }
        });
    });
});

watch(() => store.isOpen, (newVal) => {
    if (newVal) {
        overlayTl.value?.play();
    }
    else {
        overlayTl.value?.reverse();
    }
});
</script>

<template>
    <div
        class="overlay__wrapper fixed inset-0 z-14 bg-black/90 backdrop-blur-2xl px-[6rem] py-[10rem] text-col-white"
        style="clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    >
        <div class="flex gap-[4rem]">
            <div class="relative w-1/2 flex justify-between">
                <div
                    class="indicator absolute top-0 left-0 size-[2.5rem] bg-col-orange"
                />
                <ul
                    class="grid"
                    :style="{ rowGap: `${gap}px` }"
                >
                    <li
                        v-for="link in navLinks"
                        :key="link.title"
                        ref="linkRef"
                        class="nav__link w-fit"
                    >
                        <NuxtLink
                            :to="link.href"
                            :style="{
                                color: route.path === link.href ? 'var(--color-col-orange)' : 'var(--color-col-white)',
                                // transform: route.path === link.href ? 'translateX(64px)' : 'none',
                            }"
                            class="font-google-m text-[5rem] leading-[5rem] tracking-tighter hover:text-col-orange!"
                            @click="store.isOpened"
                        >
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>

                <div class="space-y-[.75rem]">
                    <span class="contact__links__header inline-block text-col-gray text-[1.25rem] uppercase">
                        Contact
                    </span>

                    <ul class="space-y-[.75rem]">
                        <li class="contact__link">
                            <a
                                href="mailto:blandirony@gmail.com?body=Hi!%20I'd%20love%20to%20work%20with%20you."
                                class="text-[1.5rem]"
                            >
                                blandirony@gmail.com
                            </a>
                        </li>
                        <li class="contact__link">
                            <a
                                href="https://www.instagram.com/blandirony/"
                                target="_blank"
                                class="text-[1.5rem]"
                            >
                                Instagram: @blandirony
                            </a>
                        </li>
                        <li class="contact__link">
                            <a
                                href="https://www.github.com/blandirony/"
                                target="_blank"
                                class="text-[1.5rem]"
                            >
                                GitHub: @blandirony
                            </a>
                        </li>
                        <li class="contact__link">
                            <a
                                href="https://x.com/BlandIrony"
                                target="_blank"
                                class="text-[1.5rem]"
                            >
                                X (fka Twitter): @blandirony
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-1/2 text-right">
                <img
                    src="/images/blandirony.jpeg"
                    alt="My display card"
                    class="overlay__image w-full mb-4"
                    loading="lazy"
                >

                <span class="caption inline-block text-[1.25rem] uppercase tracking-tight">
                    A Little About You Know Who 😉
                </span>
            </div>
        </div>
    </div>
</template>
