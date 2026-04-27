<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { nextTick, onMounted, watch } from "vue";

import { useLoaderStore } from "../../store/useLoaderStore";

gsap.registerPlugin(SplitText);

const loaderStore = useLoaderStore();

function runAnimation() {
    const heroAnimationTimeline = gsap.timeline({ defaults: { ease: "none" } });

    SplitText.create([".hero__text", ".hero__paragraph", ".hero__sidetext"], {
        type: "lines",
        mask: "lines",
        linesClass: "line",
    });

    heroAnimationTimeline
        .addLabel("start", 0)
        .fromTo(
            ".hero__text .line",
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                duration: 1.5,
                stagger: 0.06,
                ease: "power4.inOut",
            },
            "start",
        )
        .to(
            ".inline-image",
            {
                width: "9rem",
                scale: 1,
                duration: 0.75,
                stagger: 0.06,
                ease: "power3.inOut",
            },
            "start+=1.5",
        )
        .fromTo(
            ".hero__image img",
            {
                xPercent: 150,
                scale: 1.75,
            },
            {
                xPercent: 0,
                scale: 1,
                stagger: 0.06,
                duration: 1.5,
                ease: "power4.inOut",
            },
            "start+=.5",
        )
        .fromTo(
            [".hero__sidetext .line", ".hero__paragraph .line"],
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                duration: 1.5,
                stagger: 0.07,
                ease: "power4.inOut",
            },
            "start",
        )
        .fromTo(
            ".cta",
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.07,
                ease: "power4.inOut",
            },
            "start+=1",
        );
}

let hasRun = false;

watch(() => loaderStore.isLoading, async (isLoading: boolean) => {
    if (!isLoading && !hasRun) {
        await nextTick();
        hasRun = true;
        runAnimation();
    }
}, { immediate: true });

onMounted(() => {

});
</script>

<template>
    <section class="relative h-screen w-full pt-[7rem] px-[1rem]">
        <div class="h-full w-full ">
            <div class="flex justify-between">
                <h1 class="hero__text text-[5rem] tracking-tighter leading-[5rem] uppercase">
                    We walk gently
                    <span class="inline-image inline-block h-[3.65rem] w-[0rem] scale-0 origin-center">
                        <img class="h-full w-full object-cover" src="/images/mask-18.jpg" alt="">
                    </span>
                    Between worlds <br>
                    Where freedom is no longer sought, <br>
                    <span class="inline-image inline-block h-[3.65rem] w-[0rem] scale-0 origin-center">
                        <img class="h-full w-full object-cover" src="/images/mask-4.jpg" alt="">
                    </span>
                    Only understood.
                </h1>

                <div class="flex gap-4">
                    <div class="hero__image h-[18rem] w-[15rem] overflow-hidden">
                        <img class="h-full w-full object-cover" src="/images/mask-6.jpg" alt="">
                    </div>
                    <div class="hero__image h-[20rem] w-[15rem] overflow-hidden">
                        <img class="h-full w-full object-cover" src="/images/mask-12.jpg" alt="">
                    </div>
                </div>
            </div>
            <div class="mt-[14rem] w-full">
                <div class="w-full flex justify-between">
                    <div>
                        <p class="hero__sidetext text-[1.5rem] leading-[1.85rem]">
                            Not all that guides us is seen <br>
                            Not all that frees us is named
                        </p>
                    </div>
                    <div class="space-y-[5rem] max-w-[70rem]">
                        <p class="hero__paragraph text-[1.75rem] leading-[2.25rem]">
                            <span class="mr-[10rem]" />
                            There's a quiet knowing that lives beyond form, where movement becomes <br>
                            ritual and presence becomes truth. In the language of the unseen, the masquerade <br>
                            reveals what cannot be held or named. And there, in that gentle unfolding, <br> freedom is not discovered, it simply is.
                        </p>

                        <button class="cta flex items-center gap-2 px-[1.5rem] py-[.25rem] border-[.175rem] rounded-full">
                            <span class="inline-block text-[1.65rem] font-semibold uppercase">
                                Explore
                            </span>
                            <span class="inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-[1.85rem]"
                                    viewBox="0 0 512 512"
                                ><path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="square"
                                    stroke-miterlimit="10"
                                    stroke-width="48"
                                    d="m268 112l144 144l-144 144m124-144H100"
                                /></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <span class="absolute text-[1.5rem] uppercase inline-block bottom-5 left-1/2 -translate-x-1/2">
            (Scroll)
        </span>
    </section>
</template>
