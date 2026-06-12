<script setup lang="ts">
import { onMounted } from "vue";

type TrailConfig = {
    imageCount: number;
    imageLifeSpan: number;
    removalDelay: number;
    mouseThreshold: number;
    scrollThreshold: number;
    idleCursorInterval: number;
    inDuration: number;
    outDuration: number;
    inEasing: string;
    outEasing: string;
};

type TrailImage = {
    element: HTMLImageElement;
    rotation: number;
    removeTime: number;
};

declare global {
    type Window = {
        moveTimeout?: number;
    };
}

onMounted(() => {
    const container = document.querySelector<HTMLElement>(".trail__container");

    const config: TrailConfig = {
        imageCount: 23,
        imageLifeSpan: 750,
        removalDelay: 50,
        mouseThreshold: 100,
        scrollThreshold: 50,
        idleCursorInterval: 300,
        inDuration: 750,
        outDuration: 1000,
        inEasing: "cubic-bezier(.07,.5,.5,1)",
        outEasing: "cubic-bezier(.87,0,.13,1)",
    };

    let isMoving = false;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isCursorInContainer: boolean | undefined = false;
    let lastRemovalTime = 0;
    // const lastSteadyImageTime = 0;
    // let scrollTime = 0;
    // let isScrolling = false;
    // let scrollTicking = false;

    const trail: TrailImage[] = [];

    const images: string[] = Array.from(
        { length: config.imageCount },
        (_, i) => `/images/mask-${i + 1}.jpg`,
    );

    // console.log(images)

    function isInContainer(x: number, y: number): boolean | undefined {
        const rect = container?.getBoundingClientRect();

        if (!rect)
            return;

        return (
            x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
        );
    }

    function setInitialMousePosition(event: MouseEvent): void {
        mouseX = event.clientX;
        mouseY = event.clientY;

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        isCursorInContainer = isInContainer(mouseX, mouseY);
        document.removeEventListener("mouseover", e => setInitialMousePosition(e));
    }

    document.addEventListener("mouseover", setInitialMousePosition);

    function hasMovedFarEnough(): boolean {
        const distance = Math.sqrt((mouseX - lastMouseX) ** 2 + (mouseY - lastMouseY) ** 2);

        return distance > config.mouseThreshold;
    }

    function createImageTrail(): void {
        if (!isCursorInContainer)
            return;

        // const now = Date.now();

        if (isMoving && hasMovedFarEnough()) {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            createImage();
            // return;
        }

        // if (!isMoving && now - lastSteadyImageTime >= config.idleCursorInterval) {
        //     lastSteadyImageTime = now;
        //     createImage();
        // }
    }

    function createImage(): void {
        const img = document.createElement("img");
        img.classList.add("trail__image");
        const randomIndex = Math.floor(Math.random() * images.length);
        const rotation = (Math.random() - 0.5) * 50;

        img.src = images[randomIndex];

        const rect = container?.getBoundingClientRect();

        if (!rect)
            return;

        const relativeX = mouseX - rect.left;
        const relativeY = mouseY - rect.top;

        img.style.left = `${relativeX}px`;
        img.style.top = `${relativeY}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;

        img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

        container?.appendChild(img);

        requestAnimationFrame(() => {
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        });

        trail.push({
            element: img,
            rotation,
            removeTime: Date.now() + config.imageLifeSpan,
        });
    };

    function removeOldImages(): void {
        const now = Date.now();

        if (now - lastRemovalTime < config.removalDelay || trail.length === 0)
            return;

        const oldestImage = trail[0]!;

        if (now >= oldestImage.removeTime) {
            const imageToRemove = trail.shift()!;

            imageToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;

            imageToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imageToRemove.rotation}) scale(0)`;

            lastRemovalTime = now;

            setTimeout(() => {
                if (imageToRemove.element.parentNode) {
                    imageToRemove.element.parentNode.removeChild(imageToRemove.element);
                }
            }, config.outDuration);
        }
    }

    document.addEventListener("mousemove", (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        isCursorInContainer = isInContainer(mouseX, mouseY);

        if (!isCursorInContainer)
            return;

        isMoving = true;

        clearTimeout(window.moveTimeout);

        window.moveTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });

    function animate(): void {
        createImageTrail();
        removeOldImages();
        requestAnimationFrame(animate);
    }

    animate();
});
</script>

<template>
    <section class="trail__container h-dvh w-full relative">
        <div class="h-full w-full flex justify-center items-center">
            <h3 class="text-[10rem] leading-[10rem] tracking-tighter font-google-bl uppercase">
                <span class="inline-block">
                    Be
                </span>
                {{ " " }}
                <span class="inline-block dynamic__text">
                    Quirky
                </span>
            </h3>
        </div>
    </section>
</template>
