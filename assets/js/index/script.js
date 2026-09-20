"use strict";
import {
  customDropdown,
  createFilterTab,
  getDateLightPick,
  contact,
} from "../../main/js/global.min.js";

const $ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

function initParallaxSwiper(swiperEl, options = {}) {
  const interleaveOffset = 0.85;

  return new Swiper(swiperEl, {
    slidesPerView: 1,
    loop: true,
    speed: 1500,
    watchSlidesProgress: true,
    grabCursor: true,
    ...options,
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const slideProgress = slide.progress || 0;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;

          if (!isNaN(innerTranslate)) {
            const image = slide.querySelector(".image");
            if (image) {
              image.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          }
        });
      },
      touchStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.style.transition = "";
        });
      },
      setTransition(swiper, speed) {
        const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach((slide) => {
          slide.style.transition = `${speed}ms ${easing}`;
          const image = slide.querySelector(".image");
          if (image) image.style.transition = `${speed}ms ${easing}`;
        });
      },
      ...(options.on || {}),
    },
  });
}

function initSwiper() {
  const containerSwiperEl = document.querySelector(".container-swiper");
  if (!containerSwiperEl) return;

  const swiperEl = containerSwiperEl.querySelector(".swiper-el-parallax");
  if (!swiperEl) return;

  const swiperParallax = initParallaxSwiper(swiperEl, {
    navigation: {
      nextEl: containerSwiperEl.querySelector(".swiper-button-next"),
      prevEl: containerSwiperEl.querySelector(".swiper-button-prev"),
    },
  });
}
function heroCover() {
  const cover = document.querySelector(".hero-cover");
  const hero = document.querySelector(".hero-container");
  if (!cover || !hero) return;

  let blindsCount;
  const screenWidth = window.innerWidth;

  if (screenWidth <= 767) {
    blindsCount = 25;
  } else if (screenWidth <= 1024) {
    blindsCount = 35;
  } else {
    blindsCount = 52;
  }

  const heroWidth = hero.clientWidth;
  const stripWidth = heroWidth / blindsCount;

  cover.innerHTML = "";

  for (let i = 0; i < blindsCount; i++) {
    const strip = document.createElement("div");
    strip.classList.add("blind-strip-v");
    strip.style.left = i * stripWidth - 0.5 + "px";
    strip.style.width = stripWidth + 1 + "px";
    strip.style.top = 0;
    strip.style.height = "100%";
    strip.style.background = "#B69F64";
    strip.style.transformOrigin = "left center";
    strip.style.transform = "rotateY(-90deg)";
    strip.style.position = "absolute";
    strip.style.transformStyle = "preserve-3d";
    cover.appendChild(strip);
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    const tween = gsap.to(".blind-strip-v", {
      rotationY: 0,
      stagger: 0.005,
      ease: "power3.out",
      scrollTrigger: {
        trigger: hero,
        start: "top+=10% top",
        end: "+=125%",
        scrub: true,
      },
    });

    return () => tween.kill();
  });

  mm.add("(max-width: 1024px)", () => {
    const tween = gsap.to(".blind-strip-v", {
      rotationY: 0,
      stagger: 0.005,
      ease: "power3.out",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
    });

    return () => tween.kill();
  });
}

function init() {
  gsap.registerPlugin(ScrollTrigger);
  contact();
  customDropdown();
  createFilterTab();
  // getDateLightPick();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  initSwiper();
  heroCover();
  intro();
  animationImage();
  animationText();
});

let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});
function intro() {
  if (!document.querySelector(".intro")) return;
  if (window.innerWidth > 1024) {
    const radiusSection = document.querySelector(".intro");

    gsap.to(radiusSection, {
      borderTopLeftRadius: "100px",
      borderTopRightRadius: "100px",
      scrollTrigger: {
        trigger: radiusSection,
        start: "top 95%",
        end: "+=600",
        scrub: true,
        markers: false,
      },
    });
  }
}
function animationImage() {
  gsap.utils.toArray(".polygon-img-p").forEach((parent) => {
    const container = parent.querySelector(".polygon-img");
    if (!container) return;
    if (parent.dataset.revealInitialized) return;
    parent.dataset.revealInitialized = true;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        container,
        { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)", scale: 1.5 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1,
          ease: "power1.out",
        },
      );
  });
}
function animationText() {
  document.fonts.ready.then(() => {
    gsap.registerPlugin(SplitText);

    const animHeadingPara = document.querySelectorAll(".el-title");

    animHeadingPara.forEach((headingElement, index) => {
      const splitHeading = new SplitText(headingElement, {
        type: "words, chars",
        wordsClass: "el-word",
        charsClass: "el-char",
      });

      const descElement = document.querySelectorAll(".el-desc")[index];
      const splitDescription = new SplitText(descElement, {
        type: "lines",
        linesClass: "el-line",
      });

      const button = headingElement.parentElement.querySelector(".el-button");

      const headingParaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingElement,
          scroller: "body",
          start: "top 80%",
          // markers: true,
        },
      });

      headingParaTimeline.from(splitHeading.chars, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      });

      headingParaTimeline.from(
        splitDescription.lines,
        {
          y: 20,
          opacity: 0,
          duration: 0.35,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.15",
      );

      if (button) {
        headingParaTimeline.from(
          button,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.15",
        );
      }
    });
  });
}
