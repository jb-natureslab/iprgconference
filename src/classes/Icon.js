export default class Icon {
    node;

    constructor(icon) {
        this.node = icon;
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    show() {
        if (this.node.classList.contains("hide")) {
            this.node.classList.remove("hide");
        }
    }

    hide() {
        console.log("hide!")
        if (!this.node.classList.contains("hide")) {
            this.node.classList.add("hide");
        }
    }
}