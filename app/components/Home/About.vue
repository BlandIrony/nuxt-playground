<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { onMounted } from "vue";

import { useLenis } from "../../composables/use-lenis";
import { clamp, map } from "../../utils/funcs";

onMounted(() => {
    const lenis = useLenis();
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const splitLines = new SplitText(".about__text", {
        type: "lines",
        linesClass: "line",
        mask: "lines",
    });

    const images = gsap.utils.toArray(".about__image") as HTMLElement[];
    const speeds = [0.2, 0.3, 0.15, 0.3];

    const scroll = { current: 0, cache: 0 };

    lenis.get().on(
        "scroll",
        (obj) => {
            scroll.current = obj.scroll;
            const distance = scroll.current - scroll.cache;
            scroll.cache = scroll.current;
            const skewValue = clamp(map(distance, -50, 50, -15, 15), -15, 15);

            images.forEach((el, i) => {
                const speed = speeds[i] || 0.2;

                const parallaxY = scroll.current * speed;
                const lift = map(Math.abs(skewValue), 0, 15, 0, 20);

                gsap.to(el, {
                    y: -(parallaxY - lift),
                    skewY: skewValue,
                    duration: 0.6,
                });
            });
        },
    );

    gsap.fromTo(
        splitLines.lines,
        {
            yPercent: 110,

        },
        {
            yPercent: 0,
            duration: 1.5,
            stagger: 0.06,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".about__text",
                start: "top 90%",
                end: "bottom 40%",
                scrub: 1,
            },
        },
    );
});
</script>

<template>
    <section class="relative isolate min-h-screen w-full pt-[7rem] px-[1rem]">
        <!-- <span class="inline-block text-[1.25rem] font-google-m">
            Curious?
        </span> -->
        <div class="h-full w-[80%] py-[3rem] text-center mx-auto">
            <p class="about__text uppercase text-[11rem] tracking-tighter leading-[90%] font-google-bl">
                And so we never <br>
                named the mystery, <br>
                and it remained <br>
                whole.
            </p>
        </div>

        <div class="about__image absolute top-30 left-20 h-[18rem] w-[28rem]">
            <img
                src="/images/mask-1.jpg"
                alt=""
                class="h-full w-full object-cover mix-blend-overlay"
            >
        </div>
        <div class="about__image absolute top-55 right-20 h-[18rem] w-[28rem]">
            <img
                src="/images/mask-7.jpg"
                alt=""
                class="h-full w-full object-cover rounded-[inherit] mix-blend-overlay"
            >
        </div>
        <div class="about__image absolute top-[40rem] left-20 h-[18rem] w-[28rem]">
            <img
                src="/images/mask-22.jpg"
                alt=""
                class="h-full w-full object-cover object-top rounded-[inherit] mix-blend-overlay"
            >
        </div>
        <div class="about__image absolute top-[50rem] right-20 h-[18rem] w-[28rem]">
            <img
                src="/images/mask-16.jpg"
                alt=""
                class="h-full w-full object-cover rounded-[inherit] mix-blend-overlay"
            >
        </div>

        <div class="h-[15rem]" />
    </section>
</template>
