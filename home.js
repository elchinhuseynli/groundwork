document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Swiper
  const swiper = new Swiper(".hero-slider", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: false,
    allowTouchMove: false,
  });

  // Create GSAP timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=150%", // Increased to add more space for pinning
      scrub: true,
      pin: true,
    },
  });

  // Add animations to the timeline
  tl.to(".card-container", {
    rotationZ: 0,
    duration: 1,
  })
    .addLabel("afterMainRotate")
    .to(
      "#card2",
      {
        rotationZ: 15,
        duration: 1,
      },
      "afterMainRotate"
    )
    .to(
      "#card3",
      {
        rotationZ: -15,
        duration: 1,
      },
      "afterMainRotate"
    )
    .addLabel("afterCardRotate")
    .call(
      () => {
        swiper.slideTo(2);
      },
      null,
      "afterCardRotate-=0.3"
    ); // Adding a slight delay to ensure the animation completes

  // Sync Swiper with scroll progress
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress.toFixed(2);
      if (progress >= 0.2 && progress < 0.66) {
        swiper.slideTo(1);
      } else if (progress < 0.2) {
        swiper.slideTo(0);
      }
    },
  });
});
