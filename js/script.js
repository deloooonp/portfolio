// Light and Dark Mode

const /** {NodeElement} */ $themeBtn =
    document.querySelector("[data-theme-btn]");
const /** {NodeElement} */ $HTML = document.documentElement;
let /** {Boolean | String} */ isDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {
  $HTML.dataset.theme =
    sessionStorage.getItem("theme") == "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

$themeBtn.addEventListener("click", changeTheme);

// Tab Switch Function

const /** {NodeList} */ $tabBtn = document.querySelectorAll("[data-tab-btn");
let /** {NodeElement */ [lastActiveTab] =
    document.querySelectorAll("[data-tab-content]");
let /** {NodeElement} */ [lastActiveTabBtn] = $tabBtn;
`1`;
$tabBtn.forEach((item) => {
  item.addEventListener("click", function () {
    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const /** {NodeElement} */ $tabContent = document.querySelector(
        `[data-tab-content="${item.dataset.tabBtn}"]`
      );
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  });
});

// Web Loader

document.addEventListener("DOMContentLoaded", function () {
  const counter3 = document.querySelector(".counter-3");
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.className = "num";
      div.textContent = j;
      counter3.appendChild(div);
    }
  }

  const finalDiv = document.createElement("div");
  finalDiv.className = "num";
  finalDiv.textContent = "0";
  counter3.appendChild(finalDiv);

  function animate(counter, duration, delay = 0) {
    const numHeight = counter.querySelector(".num").clientHeight;
    const totalDistance =
      (counter.querySelectorAll(".num").length - 1) * numHeight;

    gsap.to(counter, {
      y: -totalDistance,
      duration: duration,
      delay: delay,
      ease: "power2.inOut",
    });
  }

  animate(counter3, 5);
  animate(document.querySelector(".counter-2"), 6);
  animate(document.querySelector(".counter-1"), 2, 4);
});

gsap.from(".loader-1", {
  width: 0,
  duration: 3,
  ease: "power2.inOut",
});

gsap.from(".loader-2", {
  width: 0,
  delay: 0,
  duration: 2,
  ease: "power2.inOut",
});

gsap.to(".loader", {
  background: "none",
  delay: 3,
  duration: 0.1,
});

gsap.to(".loader-1", {
  rotate: 90,
  y: -50,
  duration: 0.5,
  delay: 3.5,
});

gsap.to(
  ".loader-2",
  {
    x: -75,
    y: 75,
    duration: 0.5,
  },
  "<"
);

gsap.to(".loader", {
  scale: 40,
  duration: 1,
  delay: 4.25,
  ease: "power2.inOut",
});

gsap.to(".loader", {
  rotate: 45,
  y: 500,
  x: 2000,
  duration: 1,
  delay: 4.25,
  ease: "power2.inOut",
});

gsap.to(".loading-screen", {
  opacity: 0,
  duration: 0.25,
  delay: 4.75,
  ease: "power1.inOut",
});

// Email JS
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_jbyjsvc",
      "template_bwplhpy",
      "#contact-form",
      "UDsMXVhauNgA51Xqm"
    )
    .then(
      () => {
        // Show Sent Message
        contactMessage.textContent = "Message sent successfully ✅";
        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 3000);
        // Clear input fields
        contactForm.reset();
      },
      () => {
        // Show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

// Typed JS
var typed = new Typed(".auto-type", {
  strings: ["Frontend", "Backend"],
  typeSpeed: 160,
  backSpeed: 120,
  loop: true,
});
