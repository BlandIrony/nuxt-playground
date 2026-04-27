export const useLoaderStore = defineStore("loader", {
    state: () => { return { isLoading: true }; },
    actions: {
        isLoaded() {
            this.isLoading = false;
        },
    },
});
