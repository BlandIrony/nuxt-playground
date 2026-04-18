import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
    const init = () => {
        if (lenisInstance)
            return lenisInstance;

        const lenis = new Lenis({
            lerp: 0.1,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        lenisInstance = lenis;

        return lenis;
    };

    const get = () => {
        if (!lenisInstance) {
            throw new Error("Lenis not initialized. Call init() first.");
        }
        return lenisInstance;
    };

    return {
        init,
        get,
    };
}
