import Icon from './Icon';

class Link {
    node;

    constructor(link) {
        this.node = link;
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
        this.isHidden = this.isHidden.bind(this)
    }

    hide() {
        if (!this.node.classList.contains("hide")) {
            this.node.classList.add("hide");
        }
    }

    show() {
        if (this.node.classList.contains("hide")) {
            this.node.classList.remove("hide");
        }
    }

    isHidden() {
        if (this.node.classList.contains("hide")) {
            return true;
        }
        return false;
    }
}

export class TopNavLink extends Link {
    node;
    link;
    hasChildren = false;
    icon;
    childLinksNode;
    childLinks = [];

    constructor(link) {
        super(link);
        this.node = link;
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
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

    getWidth() {
        const linkRect = this.node.getBoundingClientRect();
        return linkRect.right - linkRect.left;
    }
}

export class HamburgerNavLink extends Link {
    node;
    link;
    hasChildren = false;
    desktopIcon;
    mobileIcon;
    childLinksNode;
    childLinks = [];

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
                        console.log("desktop:")
                        console.log(this.desktopIcon.node)
                    }
                }
            } else if (child.classList.contains("hamburgerChildItems")) {
                this.childLinksNode = child;
            } else if (child.classList.contains("linkIcon")) {
                this.mobileIcon = new Icon(child);
                console.log("mobile:")
                console.log(this.mobileIcon.node)
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