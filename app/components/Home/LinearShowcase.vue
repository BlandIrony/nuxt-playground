<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { onMounted } from "vue";

import { linearShowcaseItems } from "../../lib/data";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    const sectionContainer: HTMLElement | null = document.querySelector(".showcase__container");
    const projectTitlesContainer: HTMLElement | null = document.querySelector(".project__names__container");
    // const projectImagesContainer: HTMLElement | null = document.querySelector(".project__images__container");
    // const projectNames: HTMLElement | null = document.querySelectorAll(".project__name");
    // const totalProjectsCount = linearShowcaseItems.length;

    const sectionHeight = sectionContainer?.offsetHeight;
    const sectionPadding = Number.parseFloat(getComputedStyle(sectionContainer!).padding);
    const titleContainerHeight = projectTitlesContainer?.offsetHeight;
    const titleContainerPadding = Number.parseFloat(getComputedStyle(projectTitlesContainer!).padding);
    // const imagesContainerHeight = projectImagesContainer?.offsetHeight;
    // const imageContainerPadding = Number.parseFloat(getComputedStyle(projectImagesContainer!).padding);
    // const activationThreshold = window.innerHeight / 2;

    const moveTitleDistance = sectionHeight! - sectionPadding * 2 - titleContainerHeight! - titleContainerPadding;

    console.warn(moveTitleDistance, titleContainerHeight, sectionHeight);
    // const moveImagesDistance = window.innerHeight - imagesContainerHeight! - (imageContainerPadding - 5);

    gsap.set([".project__location", ".project__date"], { xPercent: -100 });

    ScrollTrigger.create({
        trigger: ".showcase__container",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: () => {
            // const progress = self.progress;
            // const currentIndex = Math.min(Math.floor(progress * totalProjectsCount) + 1, totalProjectsCount)

            // gsap.set(
            //     projectTitlesContainer,
            //     {
            //         y: progress * moveTitleDistance
            //     }
            // );

            // gsap.set(
            //     projectImagesContainer,
            //     {
            //         y: progress * moveImagesDistance
            //     }
            // )
        },
    });
});
</script>

<template>
    <section class="showcase__container h-screen w-full px-[1rem] overflow-hidden">
        <div class="h-full w-full flex gap-[3rem]">
            <div class="w-1/2 relative h-full w-full">
                <div class="project__names__container pt-[50svh] space-y-3">
                    <div
                        v-for="project in linearShowcaseItems"
                        :key="project.title"
                        class="project__name flex gap-4 items-center"
                    >
                        <p class="text-[3rem] leading-[3rem] tracking-tight font-google-m">
                            {{ project.title }}
                        </p>
                        <div class="flex flex-col overflow-hidden">
                            <span class="project__location inline-block text-[1.15rem] leading-[1.25rem] uppercase">
                                {{ project.location }}
                            </span>
                            <span class="project__date inline-block text-[1.15rem] leading-[1.25rem]">
                                {{ project.date }}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-0"
                    style="
                    background: linear-gradient(
                        to bottom,
                        var(--color-col-white) 0%,
                        var(--color-col-white) calc(50% - 5px),

                        transparent calc(50% - 40px),
                        transparent calc(50% + 35px),

                        rgb(from var(--color-col-white) r g b / 0.9) calc(50% + 10px),
                        rgb(from var(--color-col-white) r g b / 0.9) 100%
                    );
                "
                />
            </div>
            <div class="w-1/2 h-full w-full">
                <div class="relative top-1/2 project__images__container space-y-6">
                    <div
                        v-for="project in linearShowcaseItems"
                        :key="project.title"
                        class="w-[60rem] h-[32rem]"
                    >
                        <img
                            :src="project.image"
                            :alt="project.title"
                            class="h-full w-full object-cover object-[50%_20%]"
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
