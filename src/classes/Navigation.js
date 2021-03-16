import { TopNavLink, HamburgerNavLink } from './Link';
import { Hamburger, TopNav } from './Hamburger';

export default class Navigation {
    fullNav = null;
    topNav = null;
    hamburger = null;
    hamburgerButton = null;
    hamburgerWrapper = null;

    constructor(nav) {
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

    getNavItems() {
        for (let i = 0; i < this.fullNav.children.length; i++) {
            const child = this.fullNav.children[i];
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

    handleResize() {
        if (document.documentElement.clientWidth <= 768) {
            this.moveAllToHamburger();
            this.hamburger.toMobile();
        }
        else {
            this.moveAllToNav();
            this.hamburger.toDesktop();
            while (this.isNavWrapped()) {
                this.moveOneToHamburger();
            }
        }
        
    }

    moveAllToHamburger() {
        this.hamburger.showAll()
        this.topNav.hideAll()
    }
    
    moveAllToNav() {
        this.hamburger.hideAll();
        this.topNav.showAll();
    }

    moveOneToHamburger() {
        if (this.hamburgerButton.classList.contains("hide")) {
            this.hamburgerButton.classList.remove("hide");
        }

        this.topNav.hideOne();
        this.hamburger.showOne();
    }

    isNavWrapped() {
        let navigationRect = this.fullNav.getBoundingClientRect();
        let navWidth = navigationRect.right - navigationRect.left;
        let linksWidth = this.topNav.getTotalWidth();

        if (linksWidth > navWidth - 50) {
            return true;
        }
        return false;
    }

    getParentIfTagMatchesNode (node, excludedTag) {
        if (node.tagName == excludedTag) {
            return node.parentElement
        } else {
            return node;
        }
    }

    handleMouseOverHamburger(link, hamburger) {
        if (link.hasChildren) {
            const linkBox = link.node.getBoundingClientRect();
            if (!this.hamburger.isMobile) {
                const width = linkBox.right - linkBox.left;
                link.childLinksNode.style.right = `${width}px`;
                link.childLinksNode.classList.remove("hide");
            }
        }
    }

    handleMouseLeaveHamburger(link, hamburger) {
        console.log(this.hamburger.isMobile);
        if (link.hasChildren) {
            link.childLinksNode.style.right = "0px";
            link.childLinksNode.classList.add("hide");
        }
    }

    handleMouseOverNav(link) {
        if (link.hasChildren) {
            const linkBox = link.node.getBoundingClientRect();
            const height = linkBox.bottom - linkBox.top;
            link.childLinksNode.style.top = `${height}px`;
            link.childLinksNode.classList.remove("hide");
        }
    }

    handleMouseLeaveNav(link) {
        if (link.hasChildren) {
            link.childLinksNode.classList.add("hide");
        }
    }

    handleHamburgerButton(hamburger) {
        if (hamburger.isHidden) {
            hamburger.show();
        } else {
            hamburger.hide();
        }
    }

    handleExpandSubMenuButton(link) {
        if (link.childLinksNode.style.maxHeight) {
            link.mobileIcon.node.classList.remove("spin");
            link.childLinksNode.style.maxHeight = null;
        } else {
            link.mobileIcon.node.classList.add("spin");
            link.childLinksNode.style.maxHeight = link.childLinksNode.scrollHeight + "px";
        }
    }

    handlePageClick(e, hamburgerWrapper, hamburger) {
        const getParents = (elem) => {
            if (elem.tagName == "HTML") {
                return [elem];
            }
            return [elem.parentElement, ...getParents(elem.parentElement)]
        }
        
        const hasParent = (elem, parent) => {
            let parents = getParents(elem);
            for (let i = 0; i < parents.length; i++) {
                const item = parents[i];
                for (let j = 0; j < item.classList.length; j++) {
                    const parentClass = item.classList[j];
                    if (parentClass == parent) {
                        return true;
                    }
                    
                }
            }
            return false;
        }

        if (!hasParent(e.target, "hamburgerWrapper")) {
            hamburger.hide();
        }

    }

    show() {
        this.fullNav.classList.add("show");
    }

    addEventListeners() {
        this.hamburger.links.forEach(link => {
            link.node.addEventListener("mouseover", () => {
                this.handleMouseOverHamburger(link, this.hamburger);
            })

            link.node.addEventListener("mouseleave", () => {
                this.handleMouseLeaveHamburger(link, this.hamburger);
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
            this.handlePageClick(e, this.hamburgerWrapper, this.hamburger);
        })
    }
}