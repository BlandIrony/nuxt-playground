<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { onMounted, useTemplateRef } from "vue";

import { showcaseItems } from "../../lib/data";

gsap.registerPlugin(ScrollTrigger, SplitText);

const showcaseItemRef = useTemplateRef("showcaseItem");

onMounted(() => {
    function arrangeItems() {
        const itemHeight = document.querySelector(".project")?.clientHeight;
        // console.log(itemHeight)
        if (Array.isArray(showcaseItemRef.value)) {
            showcaseItemRef.value.forEach((item, i) => {
                gsap.set(
                    item,
                    {
                        rotateX: 30,
                        y: (45 + itemHeight) * i,
                        z: -i * 100,
                    },
                );
            });
        }
    }

    arrangeItems();
});
</script>

<template>
    <section
        class="relative w-full min-h-dvh"
    >
        <div class="title__container absolute inset-0 flex items-center justify-center">
            <span class="inline-block text-col-gray text-[12rem] leading-[12rem] font-google-b tracking-tighter uppercase">
                Showcase
            </span>
        </div>

        <div class="flex justify-center ">
            <div class="space-y-[2rem] perspective-distant preserve-3d">
                <NuxtLink
                    v-for="(item, index) in showcaseItems"
                    :key="index"
                    to="/"
                    class="project absolute top-1/2 left-1/2 -translate-1/2 w-[60rem] h-[32rem] will-change-transform origin-bottom-center"
                >
                    <div
                        ref="showcaseItem"
                        class="absolute inset-0 block h-full w-full"
                    >
                        <img
                            :src="item.imageUrl"
                            :alt="item.title"
                            class="h-full w-full object-cover object-[50%_20%]"
                        >
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
