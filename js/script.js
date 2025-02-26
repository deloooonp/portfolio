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
  `1`
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

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue + "%";

    let delay = Math.floor(Math.random() * 125) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();

gsap.to(".counter", 0.25, {
  delay: 3,
  opacity: 0,
});

gsap.to(".counter", {
  duration: 3,
});

gsap.to(".bar", 1.5, {
  delay: 3,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.from(".hero, .hero-content", 1.5, {
    delay: 3.3,
    y: -400,
    ease: "power4.inOut",
    stagger: {
      amount: 0.25,
    },
});

gsap.from(".about-card", 1.5, {
    delay: 3.4,
    x: -900,
    ease: "power4.inOut"
});

// Email JS
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_jbyjsvc','template_bwplhpy','#contact-form','UDsMXVhauNgA51Xqm')
    .then(()=>{
        // Show Sent Message
        contactMessage.textContent='Message sent successfully ✅'
        // Remove message after five seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 3000)
        // Clear input fields
        contactForm.reset()
    }, () =>{
        // Show error message
         contactMessage.textContent='Message not sent (service error) ❌'
    })
}

contactForm.addEventListener('submit', sendEmail)

// Typed JS
var typed = new Typed(".auto-type", {
  strings: ["Frontend", "Backend"],
  typeSpeed: 160,
  backSpeed: 120,
  loop: true,
});