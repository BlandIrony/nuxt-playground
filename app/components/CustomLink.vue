<script setup lang="ts">
const { to, text } = defineProps<{
    to: string;
    text: string;
}>();
</script>

<template>
    <NuxtLink :to="to" class="link-arrow w-fit">
        <span class="link-arrow-bg" />

        <span class="link-arrow-inner">
            <span class="link-arrow-text">
                {{ text }}
            </span>

            <span class="link-arrow-icon" style="--index-parent: 1;">
                <span class="link-arrow-dot" style="--index: 2;" />
                <span class="link-arrow-dot" style="--index: 1;" />
                <span class="link-arrow-dot" style="--index: 0;" />
                <span class="link-arrow-dot" style="--index: 1;" />
                <span class="link-arrow-dot" style="--index: 2;" />
            </span>
        </span>
    </NuxtLink>
</template>

<style scoped>
.link-arrow {
  --elastic-ease-out: linear(
    0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%,
    1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%,
    1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%,
    1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%,
    1.0011 81.26%, 1
  );
  --smooth-ease: cubic-bezier(.32, .72, 0, 1);

  display: inline-flex;
  position: relative;
  text-decoration: none;
  transition: transform .45s var(--elastic-ease-out);
  -webkit-tap-highlight-color: transparent;
}

.link-arrow:active {
  transform: scaleX(0.955) scaleY(0.954);
}

.link-arrow-bg {
  position: absolute;
  inset: 0;
  background: var(--color-col-orange);
  border-radius: .25rem 2.5rem 2.5rem .25rem;
  transition: scale .45s var(--smooth-ease);
}

.link-arrow-inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: .875rem 1.25rem .875rem 1rem;
  z-index: 1;
}

.link-arrow-text {
  color: var(--color-col-white);
  font-size: 15px;
  white-space: nowrap;
  transition: translate .45s var(--smooth-ease);
}

.link-arrow-icon {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  width: 8px;
  align-items: flex-start;
}

.link-arrow-dot {
  position: relative;
  width: 2.5px;
  height: 2.5px;
  translate: calc((2 - var(--index)) * 2.5px) 0;
  transition: translate .45s var(--smooth-ease);
  transition-delay: calc(var(--index) * .048s);
}

.link-arrow-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.5px;
  background: var(--color-col-gray);
}

.link-arrow-dot::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.5px;
  background: var(--color-col-white);
  z-index: 1;
  transition: scale .55s var(--smooth-ease), translate .55s var(--smooth-ease);
  translate: -8px 0;
  scale: 0;
  transition-delay: calc(var(--index) * .064s);
}

@media (hover: hover) and (pointer: fine) {
  .link-arrow:is(:hover, :focus-visible) .link-arrow-bg {
    scale: 1.035 1.065;
  }
  .link-arrow:is(:hover, :focus-visible) .link-arrow-text {
    translate: .125rem 0 0;
  }
  .link-arrow:is(:hover, :focus-visible) .link-arrow-dot {
    translate: calc((2 - var(--index)) * 2.5px + 2px) 0;
  }
  .link-arrow:is(:hover, :focus-visible) .link-arrow-dot::before {
    scale: 1;
    translate: 0 0;
  }
}

@media (hover: none) or (pointer: coarse) {
  .link-arrow-dot::before {
    scale: 1;
    translate: 0 0;
  }
}
</style>
