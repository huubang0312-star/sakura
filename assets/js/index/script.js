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
  slider();
  // getDateLightPick();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  initSwiper();
  heroCover();
  intro();
  // animationImage();
  animationText();
  animationBox();
  animationMake();
  headerMobile();
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
function headerMobile() {
  if (window.innerWidth > 768) return;
  const hamBtn = document.getElementById("ham-btn");
  const headerMenu = document.querySelector(".header-main");
  hamBtn.addEventListener("click", () => {
    hamBtn.classList.toggle("active");
    headerMenu.classList.toggle("show");
  });
  const menuSub = document.querySelectorAll("li.menu-item-has-children > a");

  console.log(menuSub);

  menuSub.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      console.log("click");

      const subMenu = this.parentElement.querySelector(".sub-menu");
      const allSubMenus = Array.from(
        document.querySelectorAll("#header .sub-menu"),
      ).filter((el) => el !== subMenu);

      allSubMenus.forEach((el) => {
        el.style.maxHeight = el.scrollHeight + "px";
        el.offsetHeight; // force reflow
        el.style.maxHeight = 0;
        el.classList.remove("open");
      });

      if (subMenu.classList.contains("open")) {
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        subMenu.offsetHeight; // force reflow
        subMenu.style.maxHeight = 0;
        subMenu.classList.remove("open");
      } else {
        subMenu.classList.add("open");
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";

        subMenu.addEventListener(
          "transitionend",
          function handler() {
            if (subMenu.classList.contains("open")) {
              subMenu.style.maxHeight = "none";
            }
            subMenu.removeEventListener("transitionend", handler);
          },
          { once: true },
        );
      }
    });
  });
}
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
// function animationImage() {
//   gsap.utils.toArray(".polygon-img-p").forEach((parent) => {
//     const container = parent.querySelector(".polygon-img");
//     if (!container) return;
//     if (parent.dataset.revealInitialized) return;
//     parent.dataset.revealInitialized = true;

//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: parent,
//           start: "top 65%",
//           toggleActions: "play none none none",
//           once: true,
//           invalidateOnRefresh: true,
//         },
//       })
//       .fromTo(
//         container,
//         { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)", scale: 1.5 },
//         {
//           clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
//           scale: 1,
//           duration: 1,
//           ease: "power1.out",
//         },
//       );
//   });
// }
function animationBox() {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  gsap.utils.toArray(".polygon-box").forEach((box) => {
    if (box.dataset.revealInitialized) return;
    box.dataset.revealInitialized = true;

    const branchCard = box.matches(".section-branch__visual")
      ? box.closest(".section-branch__card")
      : null;
    const branchTitle = branchCard?.querySelector(
      ".section-branch__content h3",
    );
    const branchButton = branchCard?.querySelector(
      ".section-branch__content .button-global",
    );
    const splitBranchTitle = branchTitle
      ? new SplitText(branchTitle, {
          type: "words, chars",
          wordsClass: "el-word",
          charsClass: "el-char",
        })
      : null;

    if (splitBranchTitle) {
      gsap.set(branchTitle, { autoAlpha: 1 });
      gsap.set(splitBranchTitle.chars, { y: 30, autoAlpha: 0 });
    }

    if (branchButton) {
      gsap.set(branchButton, { autoAlpha: 0, y: 20 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: box,
        start: "top 65%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
    });

    timeline.fromTo(
      box,
      { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        ease: "power1.out",
      },
    );

    if (splitBranchTitle) {
      timeline.to(splitBranchTitle.chars, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      });
    }

    if (branchButton) {
      timeline.to(branchButton, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    }
  });
}
function animationText() {
  document.fonts.ready.then(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    document.querySelectorAll(".el-title").forEach((headingElement) => {
      const wrapper = headingElement.parentElement;
      const logo = wrapper.querySelector(".el-logo");
      const descElement = wrapper.querySelector(".el-desc");
      const priceElement = wrapper.querySelector(".el-price");
      const button = wrapper.querySelector(".el-button");
      const fadeButtonGroup = headingElement
        .closest(".section-contact")
        ?.querySelector(".el-fade-buttons");

      gsap.set(headingElement, { autoAlpha: 1 });

      const splitHeading = new SplitText(headingElement, {
        type: "words, chars",
        wordsClass: "el-word",
        charsClass: "el-char",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingElement,
          start: "top 80%",
          // markers: true,
        },
      });

      // Logo chạy đầu tiên
      if (logo) {
        tl.from(logo, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      tl.from(
        splitHeading.chars,
        {
          y: 30,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        },
        logo ? "-=0.15" : 0,
      );

      if (descElement) {
        gsap.set(descElement, { autoAlpha: 1 }); // phòng trường hợp CSS đang ẩn

        const splitDescription = new SplitText(descElement, {
          type: "lines",
          linesClass: "el-line",
        });

        tl.from(
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
      }

      if (priceElement) {
        gsap.set(priceElement, { autoAlpha: 1 }); // phòng trường hợp CSS đang ẩn

        tl.from(
          priceElement,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.15",
        );
      }

      if (button) {
        tl.from(
          button,
          { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" },
          "-=0.15",
        );
      }

      if (fadeButtonGroup && !fadeButtonGroup.dataset.revealInitialized) {
        fadeButtonGroup.dataset.revealInitialized = true;
        const fadeButtons = fadeButtonGroup.querySelectorAll(".button-global");

        if (fadeButtons.length) {
          tl.to(
            fadeButtons,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.18,
              ease: "power2.out",
            },
            "+=0.12",
          );
        }
      }
    });

    // Button chạy riêng, không nằm trong timeline của heading
    gsap.utils.toArray(".el-button-v2").forEach((btn) => {
      if (btn.dataset.revealInitialized) return;
      btn.dataset.revealInitialized = true;

      gsap.from(btn, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: btn,
          start: "top 90%",
          once: true,
        },
      });
    });

    gsap.utils.toArray(".el-form").forEach((form) => {
      if (form.dataset.revealInitialized) return;
      form.dataset.revealInitialized = true;

      gsap.to(form, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          once: true,
        },
      });
    });

    gsap.utils.toArray(".el-fade-buttons").forEach((group) => {
      if (group.dataset.revealInitialized) return;
      group.dataset.revealInitialized = true;

      const buttons = group.querySelectorAll(".button-global");
      if (!buttons.length) return;

      gsap.to(buttons, {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: group,
          start: "top 90%",
          once: true,
        },
      });
    });
  });
}
function slider() {
  document.querySelectorAll(".explore-slider").forEach((parent) => {
    const sliderEl = parent.querySelector(".slider-global");
    if (!sliderEl || sliderEl.swiper) return;

    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: parent.querySelector(".swiper-button-next"),
        prevEl: parent.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        768: {
          slidesPerView: 3.4,
          spaceBetween: 24,
        },
      },
    });
  });
}

// function animationMake() {
//   document.querySelectorAll(".make").forEach((section) => {
//     if (section.dataset.revealInitialized) return;
//     section.dataset.revealInitialized = true;

//     const items = section.querySelectorAll(".make-item");
//     if (!items.length) return;

//     const tl = gsap.timeline({
//       defaults: { ease: "none" },
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: () => "+=" + section.offsetHeight * 2,
//         pin: true,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         // markers: true,
//       },
//     });

//     items.forEach((item, i) => {
//       tl.to(
//         item,
//         {
//           // chạy lên đến khi item ra khỏi mép trên của section
//           y: () => -(item.offsetTop + item.offsetHeight),
//           duration: 1,
//         },
//         i * 0.15, // item sau bắt đầu trễ hơn một chút
//       );
//     });
//   });
// }
function animationMake() {
  document.querySelectorAll(".make").forEach((section) => {
    if (section.dataset.revealInitialized) return;
    section.dataset.revealInitialized = true;

    const items = section.querySelectorAll(".make-item");
    const flowers = section.querySelectorAll(".flower-item");
    if (!items.length) return;

    items.forEach((item, i) => item.style.setProperty("--i", i));

    const getMaxTravel = () =>
      Math.max(...[...items].map((it) => it.offsetTop + it.offsetHeight));

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + getMaxTravel(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    tl.to(
      items,
      {
        y: () => -getMaxTravel(),
        duration: 1,
      },
      0,
    );

    const flowerScale = [1.4, 1.6, 1.3];
    const flowerBlur = [6, 10, 4];

    flowers.forEach((flower, i) => {
      tl.fromTo(
        flower,
        {
          scale: flowerScale[i] ?? 1.4,
          filter: `blur(${flowerBlur[i] ?? 6}px)`,
        },
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          transformOrigin: "50% 50%",
        },
        0,
      );
    });
    makeMouseParallax(section, items);
  });
}
function makeMouseParallax(section, items) {
  const mm = gsap.matchMedia();

  mm.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const maxMove = 4;
      const depths = [...items].map((_, i) => 0.6 + (i % 3) * 0.4);

      const setters = [...items].map((item) => ({
        x: gsap.quickTo(item, "xPercent", {
          duration: 0.8,
          ease: "power3.out",
        }),
        y: gsap.quickTo(item, "yPercent", {
          duration: 0.8,
          ease: "power3.out",
        }),
      }));

      const onMove = (e) => {
        const rect = section.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        setters.forEach((s, i) => {
          s.x(-nx * 2 * maxMove * depths[i]);
          s.y(-ny * 2 * maxMove * depths[i]);
        });
      };

      const onLeave = () =>
        setters.forEach((s) => {
          s.x(0);
          s.y(0);
        });

      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);

      return () => {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
        gsap.set(items, { xPercent: 0, yPercent: 0 });
      };
    },
  );
}
