<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { onMounted, ref } from "vue";

const { onLoaded } = defineProps<{ onLoaded: () => void }>();
const preloaderImageEl = ref<HTMLDivElement | null>(null);

onMounted(() => {
    const imgEl = preloaderImageEl.value?.querySelector("img") as HTMLImageElement | null;

    const preloaderInitTimeline = gsap.timeline({
        defaults: { ease: "none" },
        onStart: () => {
            injectRandomImages();
        },
    });

    const preloaderEndTimeline = gsap.timeline({
        defaults: { ease: "none" },
    });

    SplitText.create(".preloader__text", {
        type: "words",
        wordsClass: "word",
    });

    SplitText.create(".preloader__text-lines", {
        type: "lines",
        mask: "lines",
        linesClass: "line",
    });

    function injectRandomImages() {
        const totalCycles = 30;

        const images = [
            "/images/mask-1.jpg",
            "/images/mask-2.jpg",
            "/images/mask-3.jpg",
            "/images/mask-4.jpg",
            "/images/mask-5.jpg",
            "/images/mask-6.jpg",
            "/images/mask-7.jpg",
            "/images/mask-8.jpg",
        ];

        if (!imgEl)
            return;

        for (let i = 0; i < totalCycles; i++) {
            gsap.delayedCall(i * 0.1, () => {
                const randomIndex = Math.floor(Math.random() * images.length);
                const nextImage = images[randomIndex];

                if (!nextImage)
                    return;

                if (i === totalCycles - 1) {
                    imgEl.src = "/images/mask-1.jpg";
                    gsap.to(".preloader__image", { scale: 1.5 });

                    const images = gsap.utils.toArray(".preloader__image");

                    images.forEach((img, i) => {
                        gsap.to(img, {
                            y: -(150 - 20 * i),
                            scale: 1.5 - i * 0.2,
                            duration: 1,
                            ease: "power3.inOut",
                            // delay: i * 0.04
                        });
                    });

                    preloaderEndTimeline
                        .add("start", 0)
                        .to(
                            ".preloader__text-lines .line",
                            {
                                yPercent: -100,
                                stagger: 0.06,
                                duration: 0.5,
                                ease: "power1.inOut",
                            },
                            "start+=.7",
                        )
                        .call(() => {
                            const gap = 4;

                            images.reverse().forEach((img, i) => {
                                const targetY = i * (img?.offsetHeight + gap);
                                gsap.to(img, {
                                    top: targetY,
                                    scale: 0.75,
                                    duration: 0.5,
                                    ease: "power1.inOut",
                                    delay: i * 0.05,
                                });
                            });
                        }, [], "-=0.5")
                        .to(
                            ".preloader__text-1 .word",
                            {
                                yPercent: -100,
                                duration: 0.5,
                                // ease: "power1.inOut",
                                stagger: 0.04,
                            },
                            "+=0.2",
                        )
                        .to(
                            ".preloader__text-2 .word",
                            {
                                yPercent: -100,
                                duration: 0.5,
                                // ease: "power1.inOut",
                                stagger: 0.04,
                            },
                            "<",
                        )
                        .call(
                            () => {
                                images.reverse().forEach((img, i) => {
                                    gsap.to(img, {
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: "power1.inOut",
                                        delay: i * 0.05,
                                    });
                                });
                            },
                            [],
                            "<",
                        )
                        .to(
                            ".preloader",
                            {
                                autoAlpha: 0,
                            },
                            "<",
                        )
                        .fromTo(
                            ".header",
                            {
                                yPercent: -100,
                            },
                            {
                                yPercent: 0,
                                duration: 1,
                                ease: "power3.out",
                            },
                            "<+=0.1",
                        )
                        .call(() => { onLoaded(); });
                }
                else {
                    imgEl.src = nextImage;
                }
            });
        }
    }

    preloaderInitTimeline
        .add("start", 0)
        .fromTo(
            ".preloader__text-1 .word",
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                duration: 0.5,
                // ease: "power1.inOut",
                stagger: 0.04,
            },
            0,
        )
        .fromTo(
            ".preloader__text-2 .word",
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                duration: 0.5,
                // ease: "power1.inOut",
                stagger: 0.04,
            },
            "start+=0.2",
        )
        .fromTo(
            ".preloader__image",
            {
                yPercent: 200,
                opacity: 0.2,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power1.inOut",
            },
            "start+=0.2",
        )
        .fromTo(
            ".preloader__text-lines .line",
            {
                yPercent: 100,
            },
            {
                yPercent: 0,
                stagger: 0.06,
                duration: 0.5,
                ease: "power1.inOut",
            },
            "start+=0.5",
        );
});
</script>

<template>
    <div class="preloader fixed isolate top-0 left-0 z-20 h-screen w-full bg-col-white overflow-hidden">
        <div class="absolute bottom-5 left-0 z-2 h-1/2 w-full p-[1rem] flex flex-col justify-between">
            <div class="flex justify-between">
                <p class="preloader__text preloader__text-1 text-[1.5rem] uppercase overflow-hidden">
                    The inimicable dance
                </p>
                <p class="preloader__text preloader__text-2 text-[1.5rem] uppercase overflow-hidden">
                    of forest trees
                </p>
            </div>
            <div class="flex justify-center">
                <p class="preloader__text-lines text-[1.25rem] leading-[1.45rem] text-center">
                    Only through our connection with the metaphysical <br>
                    can we truely discover and understand freedom.
                </p>
            </div>
        </div>

        <div class="absolute h-full w-full p-[1rem]">
            <div class="relative isolated h-full w-full perspective-distant">
                <div ref="preloaderImageEl" class="preloader__image absolute rounded-[.4rem] z-8 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem] transform-3d">
                    <img
                        src="/images/mask-1.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-7 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-2.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-6 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-3.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-5 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-4.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-4 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-5.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-3 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-6.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-2 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-7.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
                <div class="preloader__image absolute rounded-[.4rem] z-1 top-1/2 left-1/2 -translate-1/2 h-[10rem] w-[10rem]  transform-3d">
                    <img
                        src="/images/mask-8.jpg"
                        alt=""
                        class="h-full w-full object-cover rounded-[inherit]"
                    >
                </div>
            </div>
        </div>
    </div>
</template>
