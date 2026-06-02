<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { onMounted, useTemplateRef } from "vue";

import { showcaseItems } from "../../lib/data";

gsap.registerPlugin(ScrollTrigger, SplitText);

const showcaseItemRef = useTemplateRef("showcaseItem");

onMounted(() => {
    function arrangeItems() {
        showcaseItemRef.value?.forEach((item, i) => {
            gsap.set(
                item,
                {
                    rotateX: i * 20,
                },
            );
        });
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

        <div class="flex justify-center pt-[16rem] perspective-distant">
            <div class="space-y-[2rem]">
                <NuxtLink
                    v-for="(item, index) in showcaseItems"
                    :key="index"
                    ref="showcaseItem"
                    to="/"
                    class="relative block w-[60rem] h-[32rem] will-change-transform origin-bottom"
                >
                    <div class="h-full w-full">
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
