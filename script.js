/*=========================================================
    LUXTIME PREMIUM WATCH WEBSITE
    JavaScript Part 1
    Core Initialization
=========================================================*/

"use strict";

/*=========================================================
    DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/*=========================================================
    GLOBAL VARIABLES
=========================================================*/

const body = document.body;

const header =
    document.querySelector("header");

const navbar =
    document.querySelector(".navbar");

const mobileMenu =
    document.querySelector(".mobile-menu");

const menuToggle =
    document.querySelector(".menu-toggle");

const menuOverlay =
    document.querySelector(".menu-overlay");

const preloader =
    document.querySelector(".preloader");

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");

const backToTop =
    document.querySelector(".back-to-top");

const whatsappButton =
    document.querySelector(".whatsapp-float");

const scrollProgress =
    document.querySelector(".progress");

const topProgress =
    document.querySelector(".scroll-progress-fill");

const modal =
    document.querySelector(".product-modal");

const modalClose =
    document.querySelector(".modal-close");

const faqItems =
    document.querySelectorAll(".faq-item");

const revealElements =
    document.querySelectorAll(

        ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate"

    );

/*=========================================================
    WEBSITE INITIALIZER
=========================================================*/

function initializeWebsite(){

    initializePreloader();

    initializeCursor();

    initializeNavigation();

    initializeScrollEvents();

    initializeRevealAnimation();

    initializeFAQ();

    initializeModal();

    initializeSmoothScroll();

}

/*=========================================================
    PRELOADER
=========================================================*/

function initializePreloader(){

    window.addEventListener("load",()=>{

        if(!preloader) return;

        preloader.classList.add("loaded");

        setTimeout(()=>{

            preloader.style.display="none";

        },700);

    });

}

/*=========================================================
    CUSTOM CURSOR
=========================================================*/

function initializeCursor(){

    if(window.innerWidth<992) return;

    if(!cursor || !cursorDot) return;

    window.addEventListener("mousemove",(e)=>{

        cursor.style.left=e.clientX+"px";

        cursor.style.top=e.clientY+"px";

        cursorDot.style.left=e.clientX+"px";

        cursorDot.style.top=e.clientY+"px";

    });

    const hoverTargets=document.querySelectorAll(

        "a, button, .card, .product-card, .gallery-item"

    );

    hoverTargets.forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            cursor.classList.add("active");

        });

        item.addEventListener("mouseleave",()=>{

            cursor.classList.remove("active");

        });

    });

}

/*=========================================================
    NAVIGATION
=========================================================*/

function initializeNavigation(){

    if(menuToggle){

        menuToggle.addEventListener("click",toggleMenu);

    }

    if(menuOverlay){

        menuOverlay.addEventListener("click",closeMenu);

    }

    const links=document.querySelectorAll(

        ".mobile-menu a"

    );

    links.forEach(link=>{

        link.addEventListener("click",closeMenu);

    });

}

/*=========================================================
    MOBILE MENU
=========================================================*/

function toggleMenu(){

    mobileMenu.classList.toggle("active");

    menuOverlay.classList.toggle("active");

    menuToggle.classList.toggle("active");

    body.classList.toggle("menu-open");

}

function closeMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    menuToggle.classList.remove("active");

    body.classList.remove("menu-open");

}

/*=========================================================
    HEADER SCROLL EFFECT
=========================================================*/

let previousScroll=0;

function initializeScrollEvents(){

    window.addEventListener(

        "scroll",

        handleScroll,

        {

            passive:true

        }

    );

}

function handleScroll(){

    const current=window.pageYOffset;

    if(header){

        if(current>80){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

        if(current>previousScroll && current>180){

            header.classList.add("hide");

        }

        else{

            header.classList.remove("hide");

        }

    }

    previousScroll=current;

    updateProgressBar();

    updateBackToTop();

}

/*=========================================================
    TOP PROGRESS BAR
=========================================================*/

function updateProgressBar(){

    const height=

        document.documentElement.scrollHeight-

        window.innerHeight;

    const progress=(window.scrollY/height)*100;

    if(topProgress){

        topProgress.style.width=progress+"%";

    }

    if(scrollProgress){

        const circumference=188;

        const offset=

            circumference-

            (progress/100)*circumference;

        scrollProgress.style.strokeDashoffset=offset;

    }

}

/*=========================================================
    BACK TO TOP
=========================================================*/

function updateBackToTop(){

    if(!backToTop) return;

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

}

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}
/*=========================================================
    SMOOTH SCROLL NAVIGATION
=========================================================*/

function initializeSmoothScroll(){

    const navLinks=document.querySelectorAll(

        'a[href^="#"]'

    );

    navLinks.forEach(link=>{

        link.addEventListener("click",(e)=>{

            const targetId=

                link.getAttribute("href");

            if(

                !targetId ||

                targetId==="#"

            ) return;

            const target=

                document.querySelector(targetId);

            if(!target) return;

            e.preventDefault();

            const offset=90;

            const position=

                target.getBoundingClientRect().top+

                window.pageYOffset-

                offset;

            window.scrollTo({

                top:position,

                behavior:"smooth"

            });

        });

    });

}


/*=========================================================
    SCROLL REVEAL
=========================================================*/

function initializeRevealAnimation(){

    if(!("IntersectionObserver" in window)){

        revealElements.forEach(el=>{

            el.classList.add("reveal-active");

        });

        return;

    }

    const observer=

        new IntersectionObserver(

            (entries)=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add(

                            "reveal-active"

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:.15,

                rootMargin:"0px 0px -60px 0px"

            }

        );

    revealElements.forEach(item=>{

        observer.observe(item);

    });

}


/*=========================================================
    FAQ ACCORDION
=========================================================*/

function initializeFAQ(){

    if(!faqItems.length) return;

    faqItems.forEach(item=>{

        const question=

            item.querySelector(

                ".faq-question"

            );

        question.addEventListener(

            "click",

            ()=>{

                const opened=

                    item.classList.contains(

                        "active"

                    );

                faqItems.forEach(card=>{

                    card.classList.remove(

                        "active"

                    );

                });

                if(!opened){

                    item.classList.add(

                        "active"

                    );

                }

            }

        );

    });

}


/*=========================================================
    PRODUCT MODAL
=========================================================*/

function initializeModal(){

    if(!modal) return;

    const triggers=

        document.querySelectorAll(

            "[data-product]"

        );

    triggers.forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                openModal(button);

            }

        );

    });

    if(modalClose){

        modalClose.addEventListener(

            "click",

            closeModal

        );

    }

    modal.addEventListener(

        "click",

        (e)=>{

            if(

                e.target===modal

            ){

                closeModal();

            }

        }

    );

    document.addEventListener(

        "keydown",

        (e)=>{

            if(

                e.key==="Escape"

            ){

                closeModal();

            }

        }

    );

}


/*=========================================================
    OPEN MODAL
=========================================================*/

function openModal(button){

    if(!modal) return;

    const title=

        button.dataset.product ||

        "Luxury Watch";

    const price=

        button.dataset.price ||

        "₹2999";

    const image=

        button.dataset.image ||

        "images/blue-watch.png";

    const modalTitle=

        modal.querySelector(

            ".modal-title"

        );

    const modalPrice=

        modal.querySelector(

            ".modal-price"

        );

    const modalImage=

        modal.querySelector(

            ".modal-image img"

        );

    if(modalTitle){

        modalTitle.textContent=

            title;

    }

    if(modalPrice){

        modalPrice.textContent=

            price;

    }

    if(modalImage){

        modalImage.src=image;

        modalImage.alt=title;

    }

    modal.classList.add(

        "active"

    );

    body.classList.add(

        "modal-open"

    );

}


/*=========================================================
    CLOSE MODAL
=========================================================*/

function closeModal(){

    if(!modal) return;

    modal.classList.remove(

        "active"

    );

    body.classList.remove(

        "modal-open"

    );

}


/*=========================================================
    MODAL ANIMATION
=========================================================*/

if(modal){

    modal.addEventListener(

        "transitionend",

        ()=>{

            if(

                !modal.classList.contains(

                    "active"

                )

            ){

                const img=

                    modal.querySelector(

                        ".modal-image img"

                    );

                if(img){

                    img.loading="lazy";

                }

            }

        }

    );

}
/*=========================================================
    PRODUCT DATABASE
=========================================================*/

const products={

    royalBlue:{

        title:"Royal Blue Chronograph",

        price:"₹2999",

        image:"images/blue-watch.png",

        rating:"★★★★★",

        description:

        "Luxury stainless steel chronograph with premium sapphire-inspired crystal, luminous hands, water resistant body and elegant royal blue dial."

    },

    peachGold:{

        title:"Peach Gold Classic",

        price:"₹2999",

        image:"images/peach-watch.png",

        rating:"★★★★★",

        description:

        "Elegant premium watch featuring a peach gold finish, polished bezel and ultra-comfort silicone strap designed for everyday luxury."

    },

    obsidian:{

        title:"Obsidian Black Edition",

        price:"₹2999",

        image:"images/hero-main.jpg",

        rating:"★★★★★",

        description:

        "Minimal luxury design inspired by modern Swiss craftsmanship with premium finishing and exceptional wrist comfort."

    },

    limited:{

        title:"Limited Signature Edition",

        price:"₹2999",

        image:"images/hero-banner.jpg",

        rating:"★★★★★",

        description:

        "Exclusive premium edition with luxury finishing, high precision movement and timeless design."

    }

};


/*=========================================================
    DYNAMIC PRODUCT DETAILS
=========================================================*/

function loadProductData(id){

    if(!products[id]) return;

    const product=products[id];

    const title=

        document.querySelector(".modal-title");

    const price=

        document.querySelector(".modal-price");

    const image=

        document.querySelector(".modal-image img");

    const description=

        document.querySelector(".modal-description");

    const rating=

        document.querySelector(".modal-rating");

    if(title){

        title.textContent=

            product.title;

    }

    if(price){

        price.textContent=

            product.price;

    }

    if(image){

        image.src=

            product.image;

        image.alt=

            product.title;

    }

    if(description){

        description.textContent=

            product.description;

    }

    if(rating){

        rating.innerHTML=

            product.rating;

    }

}


/*=========================================================
    PRODUCT BUTTONS
=========================================================*/

document

.querySelectorAll("[data-product]")

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const id=

                button.dataset.product;

            loadProductData(id);

        }

    );

});


/*=========================================================
    GALLERY LIGHTBOX
=========================================================*/

const galleryItems=

document.querySelectorAll(

".gallery-item img"

);

galleryItems.forEach(image=>{

    image.addEventListener(

        "click",

        ()=>{

            openLightbox(image);

        }

    );

});


function openLightbox(image){

    const overlay=

    document.createElement("div");

    overlay.className=

    "gallery-lightbox";

    overlay.innerHTML=`

        <div class="gallery-lightbox-content">

            <img src="${image.src}"

            alt="${image.alt}">

            <button class="gallery-close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>

    `;

    document.body.appendChild(

        overlay

    );

    requestAnimationFrame(()=>{

        overlay.classList.add(

            "active"

        );

    });

    overlay.addEventListener(

        "click",

        e=>{

            if(

                e.target===overlay ||

                e.target.closest(

                    ".gallery-close"

                )

            ){

                overlay.classList.remove(

                    "active"

                );

                setTimeout(()=>{

                    overlay.remove();

                },300);

            }

        }

    );

}


/*=========================================================
    PRODUCT IMAGE HOVER
=========================================================*/

const productCards=

document.querySelectorAll(

".product-card"

);

productCards.forEach(card=>{

    const image=

    card.querySelector("img");

    if(!image) return;

    card.addEventListener(

        "mousemove",

        e=>{

            const rect=

            card.getBoundingClientRect();

            const x=

            e.clientX-

            rect.left;

            const y=

            e.clientY-

            rect.top;

            const rotateY=

            ((x/rect.width)-0.5)*14;

            const rotateX=

            ((y/rect.height)-0.5)*-14;

            image.style.transform=

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.08)`;

        }

    );

    card.addEventListener(

        "mouseleave",

        ()=>{

            image.style.transform=

            "";

        }

    );

});


/*=========================================================
    BUTTON RIPPLE EFFECT
=========================================================*/

document

.querySelectorAll(

".btn"

)

.forEach(button=>{

    button.addEventListener(

        "click",

        function(e){

            const ripple=

            document.createElement(

                "span"

            );

            ripple.className=

            "ripple";

            const rect=

            this.getBoundingClientRect();

            ripple.style.left=

            (e.clientX-rect.left)+"px";

            ripple.style.top=

            (e.clientY-rect.top)+"px";

            this.appendChild(

                ripple

            );

            setTimeout(()=>{

                ripple.remove();

            },600);

        }

    );

});


/*=========================================================
    IMAGE LAZY LOADING
=========================================================*/

document

.querySelectorAll("img")

.forEach(img=>{

    img.loading="lazy";

    img.decoding="async";

});


/*=========================================================
    PERFORMANCE
=========================================================*/

window.addEventListener(

    "pageshow",

    ()=>{

        document

        .querySelectorAll("img")

        .forEach(img=>{

            img.draggable=false;

        });

    }

);
/*=========================================================
    HERO COUNTER ANIMATION
=========================================================*/

const counters=document.querySelectorAll(

    "[data-count]"

);

let counterStarted=false;

function initializeCounters(){

    if(counterStarted) return;

    counterStarted=true;

    counters.forEach(counter=>{

        const target=

            Number(

                counter.dataset.count

            );

        animateCounter(

            counter,

            target

        );

    });

}

function animateCounter(

    element,

    target

){

    let current=0;

    const duration=1800;

    const step=

        Math.max(

            1,

            Math.ceil(

                target/

                (duration/16)

            )

        );

    const timer=setInterval(()=>{

        current+=step;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        element.textContent=

            current.toLocaleString();

    },16);

}


/*=========================================================
    COUNTER OBSERVER
=========================================================*/

const statsSection=

document.querySelector(

".hero-stats"

);

if(

    statsSection &&

    "IntersectionObserver" in window

){

    const statsObserver=

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(

                    entry.isIntersecting

                ){

                    initializeCounters();

                    statsObserver.unobserve(

                        entry.target

                    );

                }

            });

        },

        {

            threshold:.4

        }

    );

    statsObserver.observe(

        statsSection

    );

}


/*=========================================================
    ACTIVE NAVIGATION LINK
=========================================================*/

const sections=

document.querySelectorAll(

"section[id]"

);

const navLinks=

document.querySelectorAll(

'.nav-links a[href^="#"]'

);

window.addEventListener(

    "scroll",

    updateActiveNav,

    {

        passive:true

    }

);

function updateActiveNav(){

    let current="";

    sections.forEach(section=>{

        const top=

            section.offsetTop-120;

        const height=

            section.offsetHeight;

        if(

            pageYOffset>=top &&

            pageYOffset<top+height

        ){

            current=

                section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove(

            "active"

        );

        if(

            link.getAttribute(

                "href"

            )===`#${current}`

        ){

            link.classList.add(

                "active"

            );

        }

    });

}


/*=========================================================
    HERO PARALLAX
=========================================================*/

const hero=

document.querySelector(

".hero"

);

const heroImage=

document.querySelector(

".hero-watch img"

);

window.addEventListener(

    "scroll",

    ()=>{

        if(

            !hero ||

            !heroImage

        ) return;

        const offset=

            window.pageYOffset;

        if(offset<900){

            heroImage.style.transform=

            `translateY(${offset*0.18}px)
             scale(1.02)`;

        }

    },

    {

        passive:true

    }

);


/*=========================================================
    FLOATING CARDS
=========================================================*/

const floatingCards=

document.querySelectorAll(

".floating-card"

);

window.addEventListener(

    "mousemove",

    e=>{

        const x=

        (e.clientX/

        window.innerWidth)-0.5;

        const y=

        (e.clientY/

        window.innerHeight)-0.5;

        floatingCards.forEach(

            (card,index)=>{

                const speed=

                (index+1)*12;

                card.style.transform=

                `translate(
                    ${x*speed}px,
                    ${y*speed}px
                )`;

            }

        );

    }

);


/*=========================================================
    HERO IMAGE TILT
=========================================================*/

if(hero){

    hero.addEventListener(

        "mousemove",

        e=>{

            if(!heroImage) return;

            const rect=

            hero.getBoundingClientRect();

            const x=

            (e.clientX-

            rect.left)/

            rect.width;

            const y=

            (e.clientY-

            rect.top)/

            rect.height;

            const rotateY=

            (x-.5)*18;

            const rotateX=

            (y-.5)*-18;

            heroImage.style.transform=

            `perspective(1400px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

        }

    );

    hero.addEventListener(

        "mouseleave",

        ()=>{

            heroImage.style.transform="";

        }

    );

}


/*=========================================================
    SCROLL FADE EFFECT
=========================================================*/

const fadeItems=

document.querySelectorAll(

".fade-scroll"

);

window.addEventListener(

    "scroll",

    ()=>{

        const trigger=

        window.innerHeight*.9;

        fadeItems.forEach(item=>{

            const top=

            item.getBoundingClientRect().top;

            if(top<trigger){

                item.classList.add(

                    "visible"

                );

            }

        });

    },

    {

        passive:true

    }

);


/*=========================================================
    RAF OPTIMIZATION
=========================================================*/

let ticking=false;

window.addEventListener(

    "scroll",

    ()=>{

        if(!ticking){

            requestAnimationFrame(()=>{

                updateProgressBar();

                updateBackToTop();

                ticking=false;

            });

            ticking=true;

        }

    },

    {

        passive:true

    }

);


/*=========================================================
    WINDOW RESIZE
=========================================================*/

window.addEventListener(

    "resize",

    ()=>{

        closeMenu();

    }

);


/*=========================================================
    END OF PART 4
=========================================================*/
/*=========================================================
    NEWSLETTER FORM
=========================================================*/

const newsletterForm =
document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener(
        "submit",
        handleNewsletter
    );

}

function handleNewsletter(e){

    e.preventDefault();

    const email =
    newsletterForm.querySelector(
        'input[type="email"]'
    );

    if(!email) return;

    const value =
    email.value.trim();

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!pattern.test(value)){

        showToast(
            "Please enter a valid email address.",
            "error"
        );

        email.focus();

        return;

    }

    showToast(
        "Thank you for subscribing!",
        "success"
    );

    newsletterForm.reset();

}


/*=========================================================
    CONTACT FORM
=========================================================*/

const contactForm =
document.querySelector(".contact-form");

if(contactForm){

    contactForm.addEventListener(
        "submit",
        handleContactForm
    );

}

function handleContactForm(e){

    e.preventDefault();

    const required =
    contactForm.querySelectorAll(
        "[required]"
    );

    let valid = true;

    required.forEach(field=>{

        if(field.value.trim()===""){

            valid=false;

            field.classList.add("error");

        }

        else{

            field.classList.remove("error");

        }

    });

    if(!valid){

        showToast(
            "Please complete all required fields.",
            "error"
        );

        return;

    }

    showToast(
        "Message sent successfully!",
        "success"
    );

    contactForm.reset();

}


/*=========================================================
    WHATSAPP PURCHASE
=========================================================*/

document

.querySelectorAll(".buy-now")

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const product =

            button.dataset.product ||

            "Luxury Watch";

            const price =

            button.dataset.price ||

            "₹2999";

            const message =

`Hello LUXTIME,

I want to order:

${product}

Price: ${price}

Please share payment details.`;

            const url =

`https://wa.me/917689064456?text=${encodeURIComponent(message)}`;

            window.open(

                url,

                "_blank"

            );

        }

    );

});


/*=========================================================
    KEYBOARD ACCESSIBILITY
=========================================================*/

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.key==="Escape"

        ){

            closeMenu();

            closeModal();

        }

    }

);


/*=========================================================
    SIMPLE TOAST
=========================================================*/

function showToast(

    message,

    type="success"

){

    const toast =

    document.createElement("div");

    toast.className =

    `toast ${type}`;

    toast.innerHTML =

    `<span>${message}</span>`;

    document.body.appendChild(

        toast

    );

    requestAnimationFrame(()=>{

        toast.classList.add(

            "show"

        );

    });

    setTimeout(()=>{

        toast.classList.remove(

            "show"

        );

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}


/*=========================================================
    PREVENT IMAGE DRAG
=========================================================*/

document

.querySelectorAll("img")

.forEach(img=>{

    img.addEventListener(

        "dragstart",

        e=>{

            e.preventDefault();

        }

    );

});


/*=========================================================
    EXTERNAL LINKS
=========================================================*/

document

.querySelectorAll(

'a[target="_blank"]'

)

.forEach(link=>{

    if(

        !link.rel.includes(

            "noopener"

        )

    ){

        link.rel +=

        " noopener noreferrer";

    }

});


/*=========================================================
    FINAL INITIALIZATION
=========================================================*/

window.addEventListener(

    "load",

    ()=>{

        updateProgressBar();

        updateBackToTop();

        updateActiveNav();

        initializeCounters();

    }

);


/*=========================================================
    PERFORMANCE CLEANUP
=========================================================*/

window.addEventListener(

    "beforeunload",

    ()=>{

        closeMenu();

        closeModal();

    }

);

console.log(

"%cLUXTIME Premium Website Loaded",

"color:#D4AF37;font-size:16px;font-weight:bold;"

);

console.log(

"Version 1.0 | Vanilla JavaScript"

);


/*=========================================================
    END OF SCRIPT
=========================================================*/

/*

██████████████████████████████████████████████

        LUXTIME PREMIUM WATCH WEBSITE

              JAVASCRIPT ✔

        HTML ✔
        CSS ✔
        JS ✔

    Apple × Rolex × Hublot Inspired

    Fully Responsive

    Luxury UI

    Vanilla JavaScript

██████████████████████████████████████████████

*/
