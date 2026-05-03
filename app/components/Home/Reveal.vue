<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { onMounted } from "vue";

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lines = gsap.utils.toArray(".reveal__line") as HTMLElement[];

    const splitLines = new SplitText(lines, {
        type: "lines",
        linesClass: "reveal__line-inner",
        mask: "lines",
    });

    const revealTextSplitLines = new SplitText(".reveal__text p", {
        type: "lines",
        linesClass: "reveal__text-inner",
        mask: "lines",
    });

    gsap.set(splitLines.lines, { yPercent: -110 });
    gsap.set(revealTextSplitLines.lines, { yPercent: 110 });
    gsap.set(".reveal__box", { rotate: -40, yPercent: -100 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".reveal__container",
            start: "top 90%",
            end: "top 20%",
            scrub: 1,
            // markers: true,
        },
    });

    tl.to(".reveal__box", {
        rotate: 0,
        yPercent: 0,
        duration: 2,
        // ease: "power1.out",
    })
        .to(
            splitLines.lines,
            {
                yPercent: 0,
                duration: 2,
                stagger: 0.06,
            },
            "<-=0.5",
        );

    gsap.to(revealTextSplitLines.lines, {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: {
            trigger: ".reveal__text",
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1,
            // markers: true,

        },
    });
});
</script>

<template>
    <section class="reveal__container relative isolate min-h-screen w-full py-[7rem] px-[1rem]">
        <div class="py-[5rem] w-full border-t border-t-col-black overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div class="reveal__box w-[50rem] h-[42rem] bg-col-black space-y-8 rounded-[1.5rem] p-[4rem]">
                    <p class="reveal__line text-[3.15rem] leading-[3rem] font-google-m text-col-white">
                        We could have spoken sooner.
                    </p>
                    <p class="reveal__line text-[3.15rem] leading-[3rem] font-google-m text-col-white">
                        But what mattered lived beyond words.
                    </p>
                    <p class="reveal__line text-[3.15rem] leading-[3rem] font-google-m text-col-white">
                        We kept only what endured.
                    </p>
                    <p class="reveal__line text-[3.15rem] leading-[3rem] font-google-m text-col-white">
                        So what remains now…
                        is what was never lost.
                    </p>
                </div>

                <div class="reveal__text py-[15rem]">
                    <p class="text-[3rem] font-google-m leading-[3rem] tracking-tight text-center">
                        But, there's a mindless chaos that ensues <br>
                        to fill the vaccuum left by silence. <br>
                        It presents itself as a respite from the void. <br>
                        but it's only a distraction.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
