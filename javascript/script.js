function locomotion() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotion();

const menu_bar = document.querySelector(".menu_bar");
const menuIcone = document.querySelector("#menuIcone");
const button = document.querySelector(".button button");

menuIcone.addEventListener("click", () => {
  menu_bar.classList.toggle("showMenu");
  menuIcone.classList.toggle("open");
  button.classList.toggle("remove");
});

function sir() {
  let clutter = "";

  let text = document.querySelector(".section_two p");

  text.textContent.split(" ").forEach((el) => {
    clutter += `<span> ${el} </span>`;

    document.querySelector(".section_two p").innerHTML = clutter;
  });

  gsap.to(".section_two p span", {
    scrollTrigger: {
      trigger: `.section_two p span`,
      start: `top bottom`,
      end: `bottom top`,
      scroller: `#main`,
      scrub: 0.5,
    },
    stagger: 0.2,
    color: `#ffffff`,
  });
}
sir();

function sirTwo() {
  let clutter = "";

  let text = document.querySelector(".section_fover p");

  text.textContent.split(" ").forEach((el) => {
    clutter += `<span> ${el} </span>`;

    document.querySelector(".section_fover p").innerHTML = clutter;
  });

  gsap.to(".section_fover p span", {
    scrollTrigger: {
      trigger: `.section_fover p span`,
      start: `top bottom`,
      end: `bottom top`,
      scroller: `#main`,
      scrub: 0.5,
    },
    stagger: 0.2,
    color: `#ffffff`,
  });
}
sirTwo();

// Frist Canvas
function canvasOne() {
  const canvas = document.querySelector(".section_three > canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    /images/t1.png
    /images/t2.png
    /images/t3.png
    /images/t4.png
    /images/t5.png
    /images/t6.png
    /images/t7.png
    /images/t8.png
    /images/t9.png
    /images/t10.png
    /images/t11.png
    /images/t12.png
    /images/t13.png
    /images/t14.png
    /images/t15.png
    /images/t16.png
    /images/t17.png
    /images/t18.png
    /images/t19.png
    /images/t20.png
    /images/t21.png
    /images/t22.png
    /images/t23.png
    /images/t24.png
    /images/t25.png
    /images/t26.png
    /images/t27.png
    /images/t29.png
    /images/t30.png
    /images/t31.png
    /images/t32.png
    /images/t33.png
    /images/t34.png
    /images/t35.png
    /images/t36.png
    /images/t37.png
    /images/t38.png
    /images/t39.png
    /images/t40.png
    /images/t41.png
    /images/t42.png
    /images/t43.png
    /images/t44.png
    /images/t45.png
    /images/t46.png
    /images/t47.png
    /images/t48.png
    /images/t49.png
    /images/t50.png
    /images/t51.png
    /images/t52.png
    /images/t53.png
    /images/t54.png
    /images/t56.png
    /images/t57.png
    /images/t58.png
    /images/t59.png
    /images/t60.png
    /images/t61.png
    /images/t62.png
    /images/t63.png
    /images/t64.png
    `;
    return data.split("\n")[index];
  }

  const frameCount = 63;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `.section_three`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: ".section_three",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvasOne();

// second Canvas
function canvasTwo() {
  const canvas = document.querySelector(".section_five > canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    /images/1.png
    /images/2.png
    /images/3.png
    /images/4.png
    /images/5.png
    /images/6.png
    /images/7.png
    /images/8.png
    /images/9.png
    /images/10.png
    /images/11.png
    /images/12.png
    /images/13.png
    /images/14.png
    /images/15.png
    /images/16.png
    /images/17.png
    /images/18.png
    /images/19.png
    /images/20.png
    /images/21.png
    /images/22.png
    /images/23.png
    /images/24.png
    /images/25.png
    /images/26.png
    /images/27.png
    /images/29.png
    /images/30.png
    /images/31.png
    /images/32.png
    /images/33.png
    /images/34.png
    /images/35.png
    /images/36.png
    /images/37.png
    /images/38.png
    /images/39.png
    /images/40.png
    /images/41.png
    /images/42.png
    /images/43.png
    /images/44.png
    /images/45.png
    /images/46.png
    /images/47.png
    /images/48.png
    /images/49.png
    /images/50.png
    /images/51.png
    /images/52.png
    /images/53.png
    /images/54.png
    /images/55.png
    `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `.section_five`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: ".section_five",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvasTwo();


