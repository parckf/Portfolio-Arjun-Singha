"use strict";

/* ===============================
   LOADER
================================ */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 700);
    }
});


/* ===============================
   NAVBAR SCROLL
================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});


/* ===============================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isActive = navLinks.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    /* CLOSE MENU AFTER CLICK */
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


/* ===============================
   DARK MODE
================================ */

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;


/* CHECK SAVED THEME */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark" && themeIcon) {
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}


/* TOGGLE THEME */

if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("portfolio-theme", "dark");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            localStorage.setItem("portfolio-theme", "light");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    });
}


/* ===============================
   PROJECT SEARCH
================================ */

const searchInput = document.getElementById("projectSearch");
const techFilter = document.getElementById("techFilter");
const searchBtn = document.getElementById("searchBtn");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");


function filterProjects() {
    if (!searchInput || !techFilter || !projectCards.length) return;

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedTech = techFilter.value;
    let visibleProjects = 0;

    projectCards.forEach(card => {
        const projectName = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
        const projectDescription = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
        const technologies = card.dataset.tech ? card.dataset.tech.toLowerCase() : "";

        const matchesSearch = projectName.includes(searchValue) || projectDescription.includes(searchValue);
        const matchesTech = selectedTech === "all" || technologies.includes(selectedTech);

        if (matchesSearch && matchesTech) {
            card.style.display = "block";
            visibleProjects++;
        } else {
            card.style.display = "none";
        }
    });

    if (emptyState) {
        emptyState.style.display = visibleProjects === 0 ? "block" : "none";
    }
}

/* Attach Search Listeners only if elements exist */
if (searchBtn) {
    searchBtn.addEventListener("click", filterProjects);
    searchBtn.addEventListener("click", () => {
        setTimeout(() => {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") filterProjects();
    });
}

if (techFilter) {
    techFilter.addEventListener("change", filterProjects);
}


/* ===============================
   SCROLL TO TOP
================================ */

const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (scrollTop) {
        if (window.scrollY > 600) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }
    }
});

if (scrollTop) {
    scrollTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* ===============================
   PROJECT CARD ANIMATION
================================ */

if (projectCards.length) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.15 }
    );

    projectCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });
}


/* ===============================
   KEYBOARD SHORTCUTS (ACCESSIBILITY)
================================ */

window.addEventListener("keydown", (event) => {
    if (event.altKey && (event.key === "t" || event.key === "T")) {
        event.preventDefault();
        if (themeBtn) themeBtn.click();
    }
});


/* ===============================
   ACTIVE NAV INDICATOR (SCROLLSPY)
================================ */

const observedSections = document.querySelectorAll("section[id], aside[id]");
const headerNavLinks = document.querySelectorAll(".nav-links a[href^='#']");

function updateActiveNav() {
    const scrollPosition = window.scrollY + 180;
    observedSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            headerNavLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });


/* ===============================
   SMOOTH NAVIGATION
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
            event.preventDefault();
            const nav = document.querySelector(".navbar");
            const navHeight = nav ? nav.offsetHeight : 0;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - (navHeight + 20);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

console.log("Arjun Singha Portfolio Loaded 🚀 — B.Tech Gen AI Assessment Edition");
