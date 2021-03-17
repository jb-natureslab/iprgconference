import Icon from './Icon';

class Link {
    node; // HTMLElement

    constructor(link) {
        this.node = link;
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
        this.isHidden = this.isHidden.bind(this)
    }

    // Public Null
    hide() {
        if (!this.node.classList.contains("hide")) {
            this.node.classList.add("hide");
        }
    }

    // Public Null
    show() {
        if (this.node.classList.contains("hide")) {
            this.node.classList.remove("hide");
        }
    }

    // Public Bool
    isHidden() {
        if (this.node.classList.contains("hide")) {
            return true;
        }
        return false;
    }
}

export class TopNavLink extends Link {
    node; // HTMLElement
    link; // HTMLElement
    hasChildren = false; // Bool
    icon; // Icon
    childLinksNode; // HTMLElement
    childLinks = []; // Array<HTMLElement>

    constructor(link) {
        super(link);
        this.node = link;
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            // child is HTMLElement

            if (child.classList.contains("navLink")) {
                this.link = child;
                for (let j = 0; j < child.children.length; j++) {
                    const subChild = child.children[j];
                    if (subChild.classList.contains("linkIcon")) {
                        this.hasChildren = true;
                        this.icon = new Icon(subChild);
                    }
                }
            } else if (child.classList.contains("navChildItems")) {
                this.childLinksNode = child;
            }
        }

        if (this.hasChildren) {
            for (let i = 0; i < this.childLinksNode.children.length; i++) {
                const link = this.childLinksNode.children[i];
                this.childLinks = [...this.childLinks, link];
            }
        }

        this.getWidth = this.getWidth.bind(this);
    }

    // Public Int
    getWidth() {
        const linkRect = this.node.getBoundingClientRect();
        return linkRect.right - linkRect.left;
    }
}

export class HamburgerNavLink extends Link {
    node; // HTMLElement
    link; // HTMLElement
    hasChildren = false; // Bool
    desktopIcon; // Icon
    mobileIcon; // Icon
    childLinksNode; // HTMLElement
    childLinks = []; // Array<HTMLElement>

    constructor(link) {
        super(link);
        this.node = link;
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            if (child.classList.contains("hamburgerLink")) {
                this.link = child;
                for (let j = 0; j < child.children.length; j++) {
                    const subChild = child.children[j];
                    if (subChild.classList.contains("linkIcon")) {
                        this.hasChildren = true;
                        this.desktopIcon = new Icon(subChild);
                    }
                }
            } else if (child.classList.contains("hamburgerChildItems")) {
                this.childLinksNode = child;
            } else if (child.classList.contains("linkIcon")) {
                this.mobileIcon = new Icon(child);
                this.mobileIcon.hide()
            }
        }

        if (this.hasChildren) {
            for (let i = 0; i < this.childLinksNode.children.length; i++) {
                const link = this.childLinksNode.children[i];
                this.childLinks = [...this.childLinks, link];
            }
        }
    }
}