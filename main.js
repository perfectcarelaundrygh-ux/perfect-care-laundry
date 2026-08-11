// ==========================================
   // AOS (Animate On Scroll)
   // ==========================================

   if (window.AOS) {
       AOS.init({
           duration: 700,
           easing: "ease-out",
           once: true
       });
   }
// ==========================================
// Perfect Care Laundry
// Main JavaScript
// ==========================================

// Activate Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close the menu automatically when a nav link is tapped
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxClose = document.getElementById("lightboxClose");
const galleryItems = document.querySelectorAll(".gallery-item");

let lastFocusedGalleryItem = null;

function openLightbox(item) {

    const img = item.querySelector("img");

    if (!img) {
        return;
    }

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    lightboxTitle.textContent = item.dataset.title || "";
    lightboxDesc.textContent = item.dataset.desc || "";

    lastFocusedGalleryItem = item;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    // Prevent the page from scrolling behind the lightbox
    document.body.style.overflow = "hidden";

    if (lightboxClose) {
        lightboxClose.focus();
    }

}

function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Return focus to whichever gallery item opened the lightbox
    if (lastFocusedGalleryItem) {
        lastFocusedGalleryItem.focus();
    }

}

if (lightbox && galleryItems.length) {

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {
            openLightbox(item);
        });

    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close when the dark backdrop itself is clicked (not the content)
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    // Close on Escape, and keep Tab focus trapped inside while it's open
    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
            return;
        }

        if (event.key === "Tab") {

            const focusable = lightbox.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable.length) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            // Focus can drift outside the trapped elements (e.g. a click on the
            // non-focusable image/caption blurs the close button to <body>) —
            // pull it back in regardless of direction.
            if (!lightbox.contains(document.activeElement)) {
                event.preventDefault();
                first.focus();
            } else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }

        }

    });

}

// ==========================================
// OUR WORK CAROUSEL (Services page)
// ==========================================

const workTrack = document.getElementById("workTrack");
const workPrev = document.getElementById("workPrev");
const workNext = document.getElementById("workNext");

if (workTrack && workPrev && workNext) {

    function scrollWorkTrack(direction) {

        const slide = workTrack.querySelector(".work-slide");
        const gap = 24;
        const step = slide ? slide.getBoundingClientRect().width + gap : workTrack.clientWidth * 0.8;

        workTrack.scrollBy({
            left: step * direction,
            behavior: "smooth"
        });

    }

    workPrev.addEventListener("click", function () {
        scrollWorkTrack(-1);
    });

    workNext.addEventListener("click", function () {
        scrollWorkTrack(1);
    });

}

// ==========================================
// BOOK PICKUP FORM
// ==========================================

const pickupButton = document.getElementById("pickupBtn");

if (pickupButton) {

    pickupButton.addEventListener("click", function () {

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const notes = document.getElementById("notes").value.trim();

        if (!name || !phone || !address) {

            alert("Please enter your Name, Phone Number and Pickup Address.");

            return;

        }

        const message = `Hello Perfect Care Laundry,

I would like to schedule a laundry pickup.

Name:
${name}

Phone Number:
${phone}

Pickup Address:
${address}

Preferred Date:
${date || "Not specified"}

Preferred Time:
${time || "Not specified"}

Special Instructions:
${notes || "None"}

Thank you.`;

        const whatsappURL =
            `https://wa.me/233598963585?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });

}