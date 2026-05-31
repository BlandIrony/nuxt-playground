export const useNavStore = defineStore("nav", {
    state: () => { return { isOpen: false }; },
    actions: {
        isOpened() {
            this.isOpen = !this.isOpen;
        },
    },
});
