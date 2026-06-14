<script setup lang="ts">
import gsap from "gsap";
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

const words: string[] = ["Quirky", "whimsical", "Curious", "Offbeat", "Mysterious"];

onMounted(() => {
    const container = document.querySelector<HTMLElement>(".trail__container");
    const dynamicTextContainer = document.querySelector(".dynamic__text__container");
    const gap = 4;

    function injectText() {
        for (let i = 0; i < words.length; i++) {
            const textField = document.createElement("p");
            textField.classList.add("dynamic__text");
            textField.innerHTML = words[i];

            dynamicTextContainer?.appendChild(textField);
        }
    }

    injectText();

    function animateTextBlock() {
        const dynamicTexts = document.querySelectorAll(".dynamic__text");
        const textHeight = dynamicTexts[0]?.clientHeight;

        if (!textHeight)
            return;

        gsap.to(".dynamic__text__container", {
            y: -(textHeight + gap),
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",

            onComplete() {
                const firstText = document.querySelector(".dynamic__text");

                if (firstText) {
                    firstText.parentElement?.appendChild(firstText);
                }

                gsap.set(".dynamic__text__container", {
                    y: 0,
                });

                gsap.delayedCall(1, animateTextBlock);
            },
        });
    }

    animateTextBlock();

    // setInterval(() => {
    //     animateTextBlock();
    // }, 1500);

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
    <section class="trail__container h-dvh w-full relative bg-col-black overflow-hidden">
        <div class="h-full w-full flex justify-center items-center">
            <div class="flex items-center gap-8">
                <div class="">
                    <p class="-mt-4 text-[9rem] leading-[9rem] text-col-white font-gloock uppercase">
                        Stay
                    </p>
                </div>
                <div class="relative h-[29rem] overflow-hidden">
                    <div class="dynamic__text__container flex flex-col gap-y-[.5rem]  text-[9rem] leading-[9rem] font-gloock text-col-white uppercase">
                        <!-- <p class="inline-block dynamic__text">
                            Quirky
                        </p>
                        <p class="inline-block dynamic__text">
                            Whimsical
                        </p>
                        <p class="inline-block dynamic__text">
                            Offbeat
                        </p>
                        <p class="inline-block dynamic__text">
                            Mysterious
                        </p> -->
                    </div>

                    <div class="absolute top-0 left-0 z-[1] h-full w-full bg-[linear-gradient(180deg,var(--color-col-black)_5%,transparent_38%,#0000_62%,var(--color-col-black)_95%)]" />
                </div>
            </div>
        </div>
    </section>
</template>
