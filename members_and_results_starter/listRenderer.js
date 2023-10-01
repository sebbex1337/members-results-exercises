export function construct(list, container, itemRenderer) {
    const ListRenderer = {
        list: list,
        container: document.querySelector(container),
        itemRenderer: itemRenderer,
        sortBy: undefined,
        sortDir: "asc",
        render() {
            this.container.innerHTML = "";
            for (const item of this.list) {
                const html = this.itemRenderer.render(item);
                this.container.insertAdjacentHTML("beforeend", html);
            }
        },
        sort(sortBy, sortDir) {
            this.sortBy = sortBy;
            console.log(`Sorting by ${this.sortBy} in ${this.sortDir} order`);
            if (this.sortDir === "asc") {
                this.list.sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
                this.sortDir = "desc";
            } else {
                this.list.sort((a, b) => (a[this.sortBy] < b[this.sortBy] ? 1 : -1));
                this.sortDir = "asc";
            }
            console.log(this.sortDir);
            this.render();
        },
    };
    return ListRenderer;
}
