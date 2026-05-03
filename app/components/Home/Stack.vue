<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    const cards = gsap.utils.toArray(".card") as HTMLElement[];

    // const cardsLength = cards.length;
    // const segmentProgress = 1 / cardsLength;

    cards.forEach((card) => {
        gsap.set(card, { yPercent: 250 });
    });
});
</script>

<template>
    <section class="cards__section h-screen w-full">
        <div class="cards relative isolate h-full w-full perspective-distant">
            <div class="card absolute top-0 left-0 z-4 h-full w-full p-[1rem] origin-bottom transform-3d bg-amber-200">
                <div class="h-full w-full flex flex-col justify-between">
                    <div class="flex justify-between">
                        <h2 class="text-[14rem] leading-[14rem] font-google-b tracking-tight">
                            Imitation
                        </h2>
                        <span />
                    </div>
                    <div class="w-full flex items-end justify-between">
                        <div>
                            <p class="text-[1.75rem] leading-[2rem]">
                                It echoes in repetition,<br>
                                where meaning dissolves into noise,<br>
                                and the absence of truth begins to imitate it.
                            </p>
                        </div>
                        <div class="flex gap-6">
                            <span class="inline-block text-[14rem] font-google-b leading-[14rem]">
                                (01)
                            </span>
                            <div class="h-[40rem] w-[35rem]">
                                <img
                                    src="/images/mask-11.jpg"
                                    class="h-full w-full object-cover object-top"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card absolute top-0 left-0 z-3 h-full w-full p-[1rem] origin-bottom transform-3d bg-amber-200">
                <div class="h-full w-full flex flex-col justify-between">
                    <div class="flex justify-between">
                        <h2 class="text-[14rem] leading-[14rem] font-google-b tracking-tight">
                            Projection
                        </h2>
                        <span />
                    </div>
                    <div class="w-full flex items-end justify-between">
                        <div>
                            <p class="text-[1.75rem] leading-[2rem]">
                                It breeds restless interpretations,<br>
                                where certainty is fabricated,<br>
                                and the unknown is forced into familiar shapes.
                            </p>
                        </div>
                        <div class="flex gap-6">
                            <span class="inline-block text-[14rem] font-google-b leading-[14rem]">
                                (02)
                            </span>
                            <div class="h-[40rem] w-[35rem]">
                                <img
                                    src="/images/mask-13.jpg"
                                    class="h-full w-full object-cover object-top"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card absolute top-0 left-0 z-2 h-full w-full p-[1rem] origin-bottom transform-3d bg-amber-200">
                <div class="h-full w-full flex flex-col justify-between">
                    <div class="flex justify-between">
                        <h2 class="text-[14rem] leading-[14rem] font-google-b tracking-tight">
                            Fragmentation
                        </h2>
                        <span />
                    </div>
                    <div class="w-full flex items-end justify-between">
                        <div>
                            <p class="text-[1.75rem] leading-[2rem]">
                                It fractures into borrowed voices,<br>
                                each one reaching for form,<br>
                                yet none able to hold what was never theirs.
                            </p>
                        </div>
                        <div class="flex gap-6">
                            <span class="inline-block text-[14rem] font-google-b leading-[14rem]">
                                (03)
                            </span>
                            <div class="h-[40rem] w-[35rem]">
                                <img
                                    src="/images/mask-15.jpg"
                                    class="h-full w-full object-cover object-top"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card absolute top-0 left-0 z-1 h-full w-full p-[1rem] origin-bottom transform-3d bg-amber-200">
                <div class="h-full w-full flex flex-col justify-between">
                    <div class="flex justify-between">
                        <h2 class="text-[14rem] leading-[14rem] font-google-b tracking-tight">
                            Illusion
                        </h2>
                        <span />
                    </div>
                    <div class="w-full flex items-end justify-between">
                        <div>
                            <p class="text-[1.75rem] leading-[2rem]">
                                It fills itself with movement,<br>
                                mistaking motion for meaning,<br>
                                and presence for truth.
                            </p>
                        </div>
                        <div class="flex gap-6">
                            <span class="inline-block text-[14rem] font-google-b leading-[14rem]">
                                (04)
                            </span>
                            <div class="h-[40rem] w-[35rem]">
                                <img
                                    src="/images/mask-17.jpg"
                                    class="h-full w-full object-cover object-top"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
