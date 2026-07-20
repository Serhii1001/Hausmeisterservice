"use strict";

/* =========================================================
   MS HAUS & MONTAGESERVICE
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initFAQ();
    initScrollTopButton();
    initScrollReveal();
    initCurrentYear();
    initContactForm();
    initHeroParallax();
});

/* =========================================================
   1. MOBILE MENU
========================================================= */

function initMobileMenu() {
    const menuButton = document.getElementById("mobile-menu-button");
    const mobileNavigation = document.getElementById("mobile-navigation");

    if (!menuButton || !mobileNavigation) {
        return;
    }

    const openMenu = () => {
        menuButton.classList.add("active");
        mobileNavigation.classList.add("open");
        document.body.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Menü schließen");
    };

    const closeMenu = () => {
        menuButton.classList.remove("active");
        mobileNavigation.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Menü öffnen");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = mobileNavigation.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = mobileNavigation.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });
}

/* =========================================================
   2. STICKY HEADER
========================================================= */

function initStickyHeader() {
    const header = document.getElementById("site-header");

    if (!header) {
        return;
    }

    const updateHeader = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });
}

/* =========================================================
   3. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const header = document.getElementById("site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });
}

/* =========================================================
   4. FAQ ACCORDION
========================================================= */

function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach((otherItem) => {
                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherItem.classList.remove("active");

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!isActive) {
                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;
            }
        });
    });

    window.addEventListener("resize", () => {
        const activeItem =
            document.querySelector(".faq-item.active");

        if (!activeItem) {
            return;
        }

        const activeAnswer =
            activeItem.querySelector(".faq-answer");

        if (activeAnswer) {
            activeAnswer.style.maxHeight =
                `${activeAnswer.scrollHeight}px`;
        }
    });
}

/* =========================================================
   5. SCROLL TO TOP BUTTON
========================================================= */

function initScrollTopButton() {
    const scrollTopButton =
        document.getElementById("scroll-top-button");

    if (!scrollTopButton) {
        return;
    }

    const updateScrollButton = () => {
        if (window.scrollY > 600) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }
    };

    updateScrollButton();

    window.addEventListener("scroll", updateScrollButton, {
        passive: true
    });

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =========================================================
   6. SCROLL REVEAL ANIMATIONS
========================================================= */

function initScrollReveal() {
    const animatedElements = document.querySelectorAll(`
        .section-heading,
        .service-card,
        .quick-contact-card,
        .advantages-visual,
        .advantages-content,
        .advantage-item,
        .process-card,
        .project-card,
        .service-area-content,
        .service-area-map,
        .review-card,
        .faq-intro,
        .faq-item,
        .contact-content,
        .contact-form-wrapper
    `);

    if (!animatedElements.length) {
        return;
    }

    animatedElements.forEach((element, index) => {
        element.classList.add("reveal");

        const delay = (index % 4) * 70;
        element.style.transitionDelay = `${delay}ms`;
    });

    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

/* =========================================================
   7. CURRENT YEAR
========================================================= */

function initCurrentYear() {
    const yearElement =
        document.getElementById("current-year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent =
        new Date().getFullYear();
}

/* =========================================================
   8. CONTACT FORM
========================================================= */

function initContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }

    const submitButton =
        form.querySelector('button[type="submit"]');

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        const name =
            String(formData.get("name") || "").trim();

        const phone =
            String(formData.get("phone") || "").trim();

        const email =
            String(formData.get("email") || "").trim();

        const location =
            String(formData.get("location") || "").trim();

        const serviceSelect =
            form.querySelector("#service");

        const service =
            serviceSelect &&
            serviceSelect.selectedIndex >= 0
                ? serviceSelect.options[
                    serviceSelect.selectedIndex
                ].text
                : "";

        const message =
            String(formData.get("message") || "").trim();

        if (!name || !phone || !service || !message) {
            showFormMessage(
                form,
                "Bitte füllen Sie alle Pflichtfelder aus.",
                "error"
            );

            return;
        }

        if (submitButton) {
            submitButton.disabled = true;

            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Anfrage wird vorbereitet
            `;
        }

        const whatsappNumber = "491234567890";

        const whatsappMessage = [
            "Hallo, ich möchte eine Arbeit anfragen.",
            "",
            `Name: ${name}`,
            `Telefon: ${phone}`,
            email ? `E-Mail: ${email}` : "",
            location ? `Ort: ${location}` : "",
            `Leistung: ${service}`,
            "",
            "Beschreibung:",
            message
        ]
            .filter(Boolean)
            .join("\n");

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}` +
            `?text=${encodeURIComponent(whatsappMessage)}`;

        window.setTimeout(() => {
            showFormMessage(
                form,
                "WhatsApp wird geöffnet. Bitte senden Sie dort die vorbereitete Nachricht ab.",
                "success"
            );

            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

            if (submitButton) {
                submitButton.disabled = false;

                submitButton.innerHTML = `
                    Anfrage senden
                    <i class="fa-solid fa-paper-plane"></i>
                `;
            }
        }, 500);
    });
}

/* =========================================================
   9. FORM MESSAGE
========================================================= */

function showFormMessage(form, message, type) {
    const previousMessage =
        form.querySelector(".form-status-message");

    if (previousMessage) {
        previousMessage.remove();
    }

    const statusMessage =
        document.createElement("div");

    statusMessage.className =
        `form-status-message form-status-${type}`;

    const icon =
        type === "success"
            ? "fa-circle-check"
            : "fa-circle-exclamation";

    statusMessage.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${escapeHTML(message)}</span>
    `;

    form.appendChild(statusMessage);

    statusMessage.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

    window.setTimeout(() => {
        statusMessage.classList.add("visible");
    }, 20);

    window.setTimeout(() => {
        statusMessage.classList.remove("visible");

        window.setTimeout(() => {
            statusMessage.remove();
        }, 300);
    }, 7000);
}

/* =========================================================
   10. HTML ESCAPE
========================================================= */

function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}

/* =========================================================
   11. HERO PARALLAX
========================================================= */

function initHeroParallax() {
    const heroVisual =
        document.querySelector(".hero-visual");

    const heroImage =
        document.querySelector(".hero-image-card");

    const floatingCards =
        document.querySelectorAll(".floating-card");

    if (!heroVisual || !heroImage) {
        return;
    }

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {
        return;
    }

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (!canHover) {
        return;
    }

    heroVisual.addEventListener("mousemove", (event) => {
        const bounds =
            heroVisual.getBoundingClientRect();

        const positionX =
            (event.clientX - bounds.left) /
            bounds.width -
            0.5;

        const positionY =
            (event.clientY - bounds.top) /
            bounds.height -
            0.5;

        heroImage.style.transform = `
            translate3d(
                ${positionX * 8}px,
                ${positionY * 8}px,
                0
            )
            rotateY(${positionX * 2}deg)
            rotateX(${positionY * -2}deg)
        `;

        floatingCards.forEach((card, index) => {
            const intensity = index === 0 ? 16 : 12;

            card.style.transform = `
                translate3d(
                    ${positionX * intensity}px,
                    ${positionY * intensity}px,
                    0
                )
            `;
        });
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroImage.style.transform = "";

        floatingCards.forEach((card) => {
            card.style.transform = "";
        });
    });
}

/* =========================================================
   12. ACTIVE NAVIGATION LINK
========================================================= */

const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
    '.desktop-navigation a[href^="#"], ' +
    '.mobile-navigation a[href^="#"]'
);

if (
    pageSections.length &&
    navigationLinks.length &&
    "IntersectionObserver" in window
) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    `#${entry.target.id}`;

                navigationLinks.forEach((link) => {
                    const isCurrent =
                        link.getAttribute("href") === currentId;

                    link.classList.toggle(
                        "active",
                        isCurrent
                    );
                });
            });
        },
        {
            threshold: 0.35,
            rootMargin: "-20% 0px -50% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

/* =========================================================
   13. SERVICE CARD POINTER EFFECT
========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

const precisePointer =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

if (precisePointer) {
    serviceCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const bounds =
                card.getBoundingClientRect();

            const mouseX =
                event.clientX - bounds.left;

            const mouseY =
                event.clientY - bounds.top;

            card.style.setProperty(
                "--mouse-x",
                `${mouseX}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${mouseY}px`
            );
        });
    });
}

/* =========================================================
   14. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            document.body.classList.add("page-hidden");
        } else {
            document.body.classList.remove("page-hidden");
        }
    }
);
