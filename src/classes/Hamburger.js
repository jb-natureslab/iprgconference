import {HamburgerNavLink, TopNavLink} from './Link';

class NavMenu {
    node;
    links = [];

    constructor(menu) {
        this.node = menu;
        this.hideAll = this.hideAll.bind(this)
        this.showAll = this.showAll.bind(this)
    }

    hideAll() {
        this.links.forEach(link => link.hide());
    }

    showAll() {
        this.links.forEach(link => link.show());
    }
}

export class Hamburger extends NavMenu {
    node;
    isMobile = false;
    isHidden = true;
    links = [];

    constructor(menu) {
        super(menu);
        this.node = menu;
        for (let i = 0; i < this.node.children.length; i++) {
            const link = this.node.children[i];
            let newLink = new HamburgerNavLink(link);
            this.links = [...this.links, newLink];
        }

        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.toMobile = this.toMobile.bind(this)
        this.toDesktop = this.toDesktop.bind(this)
        this.showOne = this.showOne.bind(this);
    }

    get isMobile() {
        if (this.node.classList.contains("mobile")) {
            return true;
        }
        return false;
    }

    show() {
        this.isHidden = false;
        this.node.classList.remove("hide");
    }

    hide() {
        this.isHidden = true;
        this.node.classList.add("hide");
    }

    toMobile() {
        this.isMobile = true;
        this.node.classList.add("mobile");
        this.links.forEach(link => {
            if (link.desktopIcon) {
                link.desktopIcon.hide()
            }
            if (link.mobileIcon) {
                link.mobileIcon.show()
            }
        })
    }

    toDesktop() {
        this.isMobile = false;
        this.node.classList.remove("mobile");
        this.links.forEach(link => {
            if (link.desktopIcon) {
                link.desktopIcon.show()
            }
            if (link.mobileIcon) {
                link.mobileIcon.hide()
            }
        })
    }

    showOne() {
        for (let i = this.links.length - 1; i >= 0; i--) {
            const link = this.links[i];
            if (link.isHidden()) {
                link.show()
                break;
            }
        }
    }
}

export class TopNav extends NavMenu {
    node;
    links = [];

    constructor(menu) {
        super(menu)
        this.node = menu;
        for (let i = 0; i < this.node.children.length; i++) {
            const link = this.node.children[i];
            let newLink = new TopNavLink(link);
            this.links = [...this.links, newLink];
        }

        this.hideOne = this.hideOne.bind(this);

    }

    hideOne() {
        for (let i = this.links.length - 1; i >= 0; i--) {
            const link = this.links[i];
            if (!link.isHidden()) {
                link.hide()
                break;
            }
        }
    }

    getTotalWidth() {
        let width = 0;
        this.links.forEach(link => {
            width += link.getWidth();
        });
        return width;
    }
}