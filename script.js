/*=========================================================
    LUXTIME PREMIUM WATCH WEBSITE
    SCRIPT.JS (PRODUCTION READY - FULL FIX)
=========================================================*/

"use strict";

/*=========================================================
    GLOBAL CONSTANTS & DOM ELEMENTS
=========================================================*/

const body = document.body;
const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");
const preloader = document.getElementById("preloader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".mobile-overlay");
const cursor = document.querySelector(".cursor-outline");
const cursorDot = document.querySelector(".cursor-dot");
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.querySelector(".progress");
const topProgress = document.querySelector(".scroll-progress-fill");
const faqItems = document.querySelectorAll(".faq-item");
const revealItems = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate"
);
const modal = document.querySelector(".product-modal");
const modalClose = document.querySelector(".modal-close");
const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-watch img");
const floatingCards = document.querySelectorAll(".floating-card");
const productCards = document.querySelectorAll(".product-card");
const counters = document.querySelectorAll("[data-count]");
const statsSection = document.querySelector(".hero-stats");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const newsletterForm = document.querySelector(".newsletter-form");
const contactForm = document.querySelector(".contact-form");
const fadeItems = document.querySelectorAll(".fade-scroll");

let previousScroll = 0;
let ticking = false;
let counterStarted = false;

/*=========================================================
    PRELOADER SAFE FALLBACK (Prevents Infinite Loading)
=========================================================*/

setTimeout(() => {
    if (preloader && !preloader.classList.contains("loaded")) {
        preloader.classList.add("loaded");
        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    }
}, 3000);

/*=========================================================
    PRODUCT DATABASE
=========================================================*/

const products = {
    royalBlue: {
        title: "Royal Blue Chronograph",
        price: "₹2,999",
        image: "images/blue-watch.png",
        rating: "★★★★★",
        description: "Luxury stainless steel chronograph with sapphire inspired crystal."
    },
    peachGold: {
        title: "Peach Gold Classic",
        price: "₹2,999",
        image: "images/peach-watch.png",
        rating: "★★★★★",
        description: "Premium peach gold luxury watch with silicone strap."
    },
    obsidian: {
        title: "Obsidian Black Edition",
        price: "₹2,999",
        image: "images/hero-main.jpg",
        rating: "★★★★★",
        description: "Elegant black luxury watch with premium finishing."
    },
    limited: {
        title: "Limited Signature Edition",
        price: "₹2,999",
        image: "images/hero-banner.jpg",
        rating: "★★★★★",
        description: "Exclusive signature edition for collectors."
    }
};

/*=========================================================
    INITIALIZATION & EVENT LISTENERS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
    initializeWebsite();
});

function initializeWebsite() {
    initializePreloader();
    initializeCursor();
    initializeNavigation();
    initializeScrollEvents();
    initializeRevealAnimation();
    initializeFAQ();
    initializeModal();
    initializeSmoothScroll();
    initializeImageLazyLoading();
    initializeProductHoverEffect();
    initializeButtonRipples();
    initializeGalleryLightbox();
    initializeCounterObserver();
    initializeHeroInteractions();
    initializeFloatingCards();
    initializeFadeScroll();
    initializeForms();
    initializeWhatsAppButtons();
    initializeGlobalAccessibility();
    initializeImageProtection();
    initializeExternalLinks();
}

/*=========================================================
    PRELOADER
=========================================================*/

function initializePreloader() {
    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add("loaded");
        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    };

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, { once: true });
    }
}

/*=========================================================
    CUSTOM CURSOR
=========================================================*/

function initializeCursor() {
    if (window.innerWidth < 992 || !cursor || !cursorDot) return;

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    }, { passive: true });

    const interactiveElements = document.querySelectorAll("a, button, .btn, .card, .product-card, .gallery-item");
    interactiveElements.forEach((item) => {
        item.addEventListener("mouseenter", () => cursor.classList.add("active"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
}

/*=========================================================
    NAVIGATION & MOBILE MENU
=========================================================*/

function initializeNavigation() {
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    document.querySelectorAll(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    }, { passive: true });
}

function toggleMenu() {
    mobileMenu?.classList.toggle("active");
    menuOverlay?.classList.toggle("active");
    menuToggle?.classList.toggle("active");
    body.classList.toggle("menu-open");
}

function closeMenu() {
    mobileMenu?.classList.remove("active");
    menuOverlay?.classList.remove("active");
    menuToggle?.classList.remove("active");
    body.classList.remove("menu-open");
}

/*=========================================================
    SCROLL HANDLING & PERFORMANCE OPTIMIZATION
=========================================================*/

function initializeScrollEvents() {
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function handleScroll() {
    const current = window.pageYOffset;

    if (header) {
        if (current > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (current > previousScroll && current > 180) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
    }

    previousScroll = current;

    updateProgressBar();
    updateBackToTop();
    updateActiveNav();
    updateHeroParallax(current);
}

/*=========================================================
    PROGRESS BAR & BACK TO TOP
=========================================================*/

function updateProgressBar() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height <= 0) return;

    const progress = (window.scrollY / height) * 100;

    if (topProgress) {
        topProgress.style.width = `${progress}%`;
    }

    if (scrollProgress) {
        const circumference = 188;
        const offset = circumference - (progress / 100) * circumference;
        scrollProgress.style.strokeDashoffset = offset;
    }
}

function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/*=========================================================
    SMOOTH SCROLL & ACTIVE NAVIGATION
=========================================================*/

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 90,
                behavior: "smooth"
            });
        });
    });
}

function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.pageYOffset >= top && window.pageYOffset < top + height) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

/*=========================================================
    SCROLL REVEAL ANIMATION
=========================================================*/

function initializeRevealAnimation() {
    if (!revealItems.length) return;

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("reveal-active"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
}

/*=========================================================
    FAQ ACCORDION
=========================================================*/

function initializeFAQ() {
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        if (!question) return;

        question.addEventListener("click", () => {
            const active = item.classList.contains("active");

            faqItems.forEach((card) => card.classList.remove("active"));

            if (!active) {
                item.classList.add("active");
            }
        });
    });
}

/*=========================================================
    PRODUCT MODAL
=========================================================*/

function initializeModal() {
    if (!modal) return;

    const buttons = document.querySelectorAll("[data-product]");
    buttons.forEach((button) => {
        button.addEventListener("click", () => openModal(button));
    });

    modalClose?.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    if (modal) {
        modal.addEventListener("transitionend", () => {
            if (!modal.classList.contains("active")) {
                const img = modal.querySelector(".modal-image img");
                if (img) img.loading = "lazy";
            }
        });
    }
}

function openModal(button) {
    if (!modal) return;

    const id = button.dataset.product;
    const product = products[id];
    if (!product) return;

    const titleEl = modal.querySelector(".modal-title");
    const priceEl = modal.querySelector(".modal-price");
    const ratingEl = modal.querySelector(".modal-rating");
    const descEl = modal.querySelector(".modal-description");
    const imageEl = modal.querySelector(".modal-image img");

    if (titleEl) titleEl.textContent = product.title;
    if (priceEl) priceEl.textContent = product.price;
    if (ratingEl) ratingEl.innerHTML = product.rating;
    if (descEl) descEl.textContent = product.description;
    if (imageEl) {
        imageEl.src = product.image;
        imageEl.alt = product.title;
    }

    modal.classList.add("active");
    body.classList.add("modal-open");
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    body.classList.remove("modal-open");
}

/*=========================================================
    GALLERY LIGHTBOX
=========================================================*/

function initializeGalleryLightbox() {
    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach((image) => {
        image.addEventListener("click", () => openLightbox(image));
    });
}

function openLightbox(image) {
    const overlay = document.createElement("div");
    overlay.className = "gallery-lightbox";
    overlay.innerHTML = `
        <div class="gallery-lightbox-content">
            <img src="${image.src}" alt="${image.alt}">
            <button class="gallery-close" aria-label="Close Lightbox">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target.closest(".gallery-close")) {
            overlay.classList.remove("active");
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    });
}

/*=========================================================
    3D HOVER EFFECT & RIPPLE ANIMATION
=========================================================*/

function initializeProductHoverEffect() {
    productCards.forEach((card) => {
        const image = card.querySelector("img");
        if (!image) return;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 16;
            const rotateX = ((y / rect.height) - 0.5) * -16;

            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        card.addEventListener("mouseleave", () => {
            image.style.transform = "";
        });
    });
}

function initializeButtonRipples() {
    document.querySelectorAll(".btn").forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/*=========================================================
    IMAGE LAZY LOADING & PROTECTION
=========================================================*/

function initializeImageLazyLoading() {
    document.querySelectorAll("img").forEach((img) => {
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;
    });
}

function initializeImageProtection() {
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("dragstart", (e) => e.preventDefault());
    });
}

/*=========================================================
    HERO SECTION ANIMATIONS & PARALLAX
=========================================================*/

function initializeHeroInteractions() {
    if (!hero || !heroImage) return;

    hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 18;
        const rotateX = (y - 0.5) * -18;

        heroImage.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    hero.addEventListener("mouseleave", () => {
        heroImage.style.transform = "";
    });
}

function updateHeroParallax(offset) {
    if (!heroImage) return;

    if (offset < 900) {
        heroImage.style.transform = `translateY(${offset * 0.18}px) scale(1.02)`;
    }
}

function initializeFloatingCards() {
    if (!floatingCards.length) return;

    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 12;
            card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    }, { passive: true });
}

/*=========================================================
    HERO COUNTERS
=========================================================*/

function initializeCounterObserver() {
    if (statsSection && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    initializeCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.40
        });

        statsObserver.observe(statsSection);
    }
}

function initializeCounters() {
    if (counterStarted || !counters.length) return;
    counterStarted = true;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.count);
        if (!isNaN(target)) {
            animateCounter(counter, target);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 1800;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, 16);
}

/*=========================================================
    FADE SCROLL ANIMATION
=========================================================*/

function initializeFadeScroll() {
    if (!fadeItems.length) return;

    const reveal = () => {
        const trigger = window.innerHeight * 0.90;
        fadeItems.forEach((item) => {
            if (item.getBoundingClientRect().top < trigger) {
                item.classList.add("visible");
            }
        });
    };

    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
}

/*=========================================================
    FORMS & VALIDATION
=========================================================*/

function initializeForms() {
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", handleNewsletter);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleContactForm);
    }
}

function handleNewsletter(e) {
    e.preventDefault();

    const input = newsletterForm.querySelector('input[type="email"]');
    if (!input) return;

    const value = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        showToast("Please enter a valid email.", "error");
        input.focus();
        return;
    }

    showToast("Thank you for subscribing!", "success");
    newsletterForm.reset();
}

function handleContactForm(e) {
    e.preventDefault();

    let valid = true;
    const required = contactForm.querySelectorAll("[required]");

    required.forEach((field) => {
        if (field.value.trim() === "") {
            valid = false;
            field.classList.add("error");
        } else {
            field.classList.remove("error");
        }
    });

    if (!valid) {
        showToast("Please complete all required fields.", "error");
        return;
    }

    showToast("Message sent successfully!", "success");
    contactForm.reset();
}

/*=========================================================
    WHATSAPP INTEGRATION
=========================================================*/

function initializeWhatsAppButtons() {
    document.querySelectorAll(".buy-now").forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.dataset.product || "Luxury Watch";
            const price = button.dataset.price || "₹2,999";

            const text = `Hello LUXTIME,\n\nI want to order\n\n${product}\n\nPrice : ${price}\n\nPlease share payment details.`;

            window.open(
                `https://wa.me/917689064456?text=${encodeURIComponent(text)}`,
                "_blank"
            );
        });
    });
}

/*=========================================================
    TOAST NOTIFICATION SYSTEM
=========================================================*/

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

/*=========================================================
    ACCESSIBILITY & UTILITIES
=========================================================*/

function initializeGlobalAccessibility() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
            closeModal();
        }
    });
}

function initializeExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        if (!link.rel.includes("noopener")) {
            link.rel += " noopener noreferrer";
        }
    });
}

/*=========================================================
    PAGE LOAD & CLEANUP HANDLERS
=========================================================*/

window.addEventListener("load", () => {
    updateProgressBar();
    updateBackToTop();
    updateActiveNav();
    initializeCounters();
});

window.addEventListener("beforeunload", () => {
    closeMenu();
    closeModal();
});

/*=========================================================
    CONSOLE SIGNATURE
=========================================================*/

console.log(
    "%cLUXTIME Premium Website Loaded",
    "color:#D4AF37;font-size:16px;font-weight:bold;"
);
console.log("Version 2.0 | Syntax Errors Cleaned & Preloader Fixed");
