/* ==========================================
   LUXTIME
   SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       BUY NOW -> WHATSAPP
    ========================== */

    const phone = "917689064456";

    const buttons = document.querySelectorAll(".buy-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const product = button.dataset.name;

            const price = button.dataset.price;

            const message =
`Hello LUXTIME,

I want to order:

⌚ Product : ${product}

💰 Price : ₹${price}

Please share complete details.`;

            window.open(

                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

                "_blank"

            );

        });

    });



    /* ==========================
       BACK TO TOP
    ========================== */

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 400){

            backToTop.style.display = "flex";

        }else{

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });



    /* ==========================
       SMOOTH NAVIGATION
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });



    /* ==========================
       STICKY HEADER EFFECT
    ========================== */

    const header=document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.style.background="rgba(0,0,0,.88)";

            header.style.boxShadow="0 15px 40px rgba(0,0,0,.35)";

        }

        else{

            header.style.background="rgba(5,5,5,.65)";

            header.style.boxShadow="none";

        }

    });



    /* ==========================
       SIMPLE SCROLL ANIMATION
    ========================== */

    const items=document.querySelectorAll(

        ".product-card,.feature,.why-card,.review-card,.stat-box,.faq-item"

    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0)";

            }

        });

    },{

        threshold:.15

    });

    items.forEach(item=>{

        item.style.opacity="0";

        item.style.transform="translateY(50px)";

        item.style.transition=".7s";

        observer.observe(item);

    });

});
/* ==========================================
   NEWSLETTER
========================================== */

const newsletter = document.querySelector(".newsletter-form");

if(newsletter){

    newsletter.addEventListener("submit",function(e){

        e.preventDefault();

        const email=this.querySelector("input").value.trim();

        if(email===""){

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing to LUXTIME.");

        this.reset();

    });

}

/* ==========================================
   GALLERY IMAGE PREVIEW
========================================== */

const galleryImages=document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        const overlay=document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.left="0";
        overlay.style.top="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,.92)";
        overlay.style.display="flex";
        overlay.style.justifyContent="center";
        overlay.style.alignItems="center";
        overlay.style.zIndex="99999";
        overlay.style.cursor="zoom-out";

        const image=document.createElement("img");

        image.src=img.src;
        image.style.maxWidth="90%";
        image.style.maxHeight="90%";
        image.style.borderRadius="20px";
        image.style.boxShadow="0 20px 60px rgba(0,0,0,.5)";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.onclick=()=>{

            overlay.remove();

        };

    });

});

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll(".buy-btn,.hero-btn,.btn").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=(e.clientX-rect.left-size/2)+"px";
        ripple.style.top=(e.clientY-rect.top-size/2)+"px";

        ripple.style.position="absolute";
        ripple.style.borderRadius="50%";
        ripple.style.background="rgba(255,255,255,.4)";
        ripple.style.transform="scale(0)";
        ripple.style.animation="ripple .6s linear";

        this.style.position="relative";
        this.style.overflow="hidden";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ==========================================
   PARALLAX HERO WATCH
========================================== */

const heroWatch=document.querySelector(".watch");

if(heroWatch){

    document.addEventListener("mousemove",(e)=>{

        const x=(window.innerWidth/2-e.clientX)/40;

        const y=(window.innerHeight/2-e.clientY)/40;

        heroWatch.style.transform=

        `translate(${x}px,${y}px)`;

    });

}

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log("LUXTIME Premium Website Loaded Successfully");
/* ==========================================
   AUTO HIDE HEADER
========================================== */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const current = window.pageYOffset;

    const header = document.querySelector("header");

    if (!header) return;

    if (current > lastScroll && current > 150) {

        header.style.transform = "translateY(-100%)";

    } else {

        header.style.transform = "translateY(0)";

    }

    lastScroll = current;

});

/* ==========================================
   IMAGE LAZY EFFECT
========================================== */

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

/* ==========================================
   BUTTON HOVER SCALE
========================================== */

document.querySelectorAll("button,a").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transition = ".3s";

        btn.style.transform = "scale(1.03)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });

});

/* ==========================================
   PRODUCT CARD TILT
========================================== */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * -10;

        const rotateY = (x / rect.width - 0.5) * 10;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

/* ==========================================
   HERO WATCH GLOW
========================================== */

const watch = document.querySelector(".watch");

if (watch) {

    let glow = 0;

    setInterval(() => {

        glow++;

        watch.style.filter =
            `drop-shadow(0 0 ${20 + Math.sin(glow/10)*15}px rgba(212,175,55,.45))`;

    }, 40);

}

/* ==========================================
   RANDOM PRODUCT GLOW
========================================== */

const cards = document.querySelectorAll(".product-card");

setInterval(() => {

    cards.forEach(card => {

        card.style.boxShadow = "none";

    });

    const random = Math.floor(Math.random() * cards.length);

    if(cards[random]){

        cards[random].style.boxShadow =
        "0 0 45px rgba(212,175,55,.35)";

    }

},2500);

/* ==========================================
   PAGE LOADED
========================================== */

window.onload = () => {

    document.body.style.opacity = "1";

};

console.log("🚀 LUXTIME Ready"); 
