import { Hamburger, TopNav } from './NavMenu';

export default class Navigation {
    fullNav; // HTMLElement
    topNav; // TopNav
    hamburger; // Hamburger
    hamburgerButton; // HTMLElement
    hamburgerWrapper; // HTMLElement

    constructor(nav) {
        // HTMLElement nav
        this.getNavItems = this.getNavItems.bind(this);
        this.handleResize = this.handleResize.bind(this)
        this.moveAllToHamburger = this.moveAllToHamburger.bind(this)
        this.moveAllToNav = this.moveAllToNav.bind(this)
        this.moveOneToHamburger = this.moveOneToHamburger.bind(this)
        this.isNavWrapped = this.isNavWrapped.bind(this)
        this.handleMouseOverHamburger = this.handleMouseOverHamburger.bind(this)
        this.addEventListeners = this.addEventListeners.bind(this);

        this.fullNav = nav;
        this.getNavItems();
        this.addEventListeners();
    }

    // Private Null
    getNavItems() {
        for (let i = 0; i < this.fullNav.children.length; i++) {
            const child = this.fullNav.children[i];
            // child is HTMLElement

            if (child.classList.contains("topNav")) {
                this.topNav = new TopNav(child);
            } else if (child.classList.contains("hamburgerWrapper")) {
                this.hamburgerWrapper = child;
            }
        }

        if (!this.topNav || !this.hamburgerWrapper) {
            throw new Error("Invalid Navigation Structure");
        }

        for (let i = 0; i < this.hamburgerWrapper.children.length; i++) {
            const child = this.hamburgerWrapper.children[i];
            // child is HTMLElement

            if (child.classList.contains("hamburgerButton")) {
                this.hamburgerButton = child;
            } else if (child.classList.contains("hamburger")) {
                this.hamburger = new Hamburger(child);
            }
        }

        if (!this.hamburgerButton || !this.hamburger) {
            throw new Error("Invalid Hamburger Navigation Structure");
        }
    }

    // Public Null
    handleResize() {
        // for mobile
        if (document.documentElement.clientWidth <= 768) {
            this.moveAllToHamburger();
            this.hamburger.toMobile();
        }
        // for desktop
        else {
            this.moveAllToNav();
            this.hamburger.toDesktop();
            while (this.isNavWrapped()) {
                this.moveOneToHamburger();
            }
        }
    }

    // Private Null
    moveAllToHamburger() {
        this.hamburger.showAll()
        this.topNav.hideAll()
    }
    
    // Private Null
    moveAllToNav() {
        this.hamburger.hideAll();
        this.topNav.showAll();
    }

    // Private Null
    moveOneToHamburger() {
        this.hamburgerButton.classList.remove("hide");
        this.topNav.hideOne();
        this.hamburger.showOne();
    }

    // Private Bool
    isNavWrapped() {
        let navigationRect = this.fullNav.getBoundingClientRect();
        let navWidth = navigationRect.right - navigationRect.left;
        let linksWidth = this.topNav.totalWidth;

        // 50 is icon width, refactor later to use actual icon width
        if (linksWidth > navWidth - 50) {
            return true;
        }
        return false;
    }

    // Private HTMLElement
    getParentIfTagMatchesNode (node, excludedTag) {
        // HTMLElement node, String excludedTag
        if (node.tagName == excludedTag) {
            return node.parentElement
        } else {
            return node;
        }
    }

    // Private Null
    handleMouseOverHamburger(link) {
        // Link link
        if (link.hasChildren) {
            const linkBox = link.node.getBoundingClientRect();
            if (!this.hamburger.isMobile) {
                const width = linkBox.right - linkBox.left;
                link.childLinksNode.style.right = `${width}px`;
                link.childLinksNode.classList.remove("hide");
            }
        }
    }

    // Private Null
    handleMouseLeaveHamburger(link) {
        // Link link
        if (link.hasChildren) {
            link.childLinksNode.style.right = "0px";
            link.childLinksNode.classList.add("hide");
        }
    }

    // Private Null
    handleMouseOverNav(link) {
        // Link link
        if (link.hasChildren) {
            const linkBox = link.node.getBoundingClientRect();
            const height = linkBox.bottom - linkBox.top;
            link.childLinksNode.style.top = `${height}px`;
            link.childLinksNode.classList.remove("hide");
        }
    }

    // Private Null
    handleMouseLeaveNav(link) {
        // Link link
        if (link.hasChildren) {
            link.childLinksNode.classList.add("hide");
        }
    }

    // Private Null
    handleHamburgerButton(hamburger) {
        // Hamburger hamburger
        if (hamburger.isHidden) {
            hamburger.show();
        } else {
            hamburger.hide();
        }
    }

    // Private Null
    handleExpandSubMenuButton(link) {
        // Link link
        if (link.childLinksNode.style.maxHeight) {
            link.mobileIcon.node.classList.remove("spin");
            link.childLinksNode.style.maxHeight = null;
        } else {
            link.mobileIcon.node.classList.add("spin");
            link.childLinksNode.style.maxHeight = link.childLinksNode.scrollHeight + "px";
        }
    }

    // Private Null
    handlePageClick(e, hamburger) {
        // Hamburger hamburger
        const getParents = (elem) => {
            if (elem.tagName == "HTML") {
                return [elem];
            }
            return [elem.parentElement, ...getParents(elem.parentElement)]
        }
        
        const hasParent = (elem, parentClass) => {
            let parents = getParents(elem);
            for (let i = 0; i < parents.length; i++) {
                const parent = parents[i];
                if (parent.classList.contains(parentClass)) {
                    return true;
                }
            }
            return false;
        }

        if (!hasParent(e.target, "hamburgerWrapper")) {
            hamburger.hide();
        }

    }

    // Private Null
    show() {
        this.fullNav.classList.add("show");
    }

    // Private Null
    addEventListeners() {
        this.hamburger.links.forEach(link => {
            link.node.addEventListener("mouseover", () => {
                this.handleMouseOverHamburger(link);
            })

            link.node.addEventListener("mouseleave", () => {
                this.handleMouseLeaveHamburger(link);
            })
            if (link.hasChildren) {
                link.mobileIcon.node.addEventListener("click", () => {
                    this.handleExpandSubMenuButton(link);
                })
            }
        });

        this.topNav.links.forEach(link => {
            link.node.addEventListener("mouseover", () => {
                this.handleMouseOverNav(link)
                
            })

            link.node.addEventListener("mouseleave", () => {
                this.handleMouseLeaveNav(link)
            })
        })

        this.hamburgerButton.addEventListener("click", (e) => {
            this.handleHamburgerButton(this.hamburger);
        })

        window.addEventListener("click", (e) => {
            this.handlePageClick(e, this.hamburger);
        })
    }
}