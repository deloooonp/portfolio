// SKILLS
document.addEventListener("alpine:init", () => {
  Alpine.data("skills", () => ({
    items: [
      { name: "Laravel", img: "laravel.svg" },
      { name: "CodeIgniter", img: "codeigniter.svg" },
      { name: "Bootstrap", img: "bootstrap.svg" },
      { name: "TailwindCSS", img: "tailwindcss.svg" },
      { name: "JavaScript", img: "javascript.svg" },
      { name: "Alpine.js", img: "alpinejs.svg" },
      { name: "GSAP", img: "gsap.svg" },
      { name: "PHP", img: "php.svg" },
      { name: "MySQL", img: "mysql.svg" },
      { name: "SQL", img: "sql.svg" },
      { name: "Git", img: "git.svg" },
      { name: "Figma", img: "figma.svg" },
    ],
  }));
});

// EXPERIENCES
document.addEventListener("alpine:init", () => {
  Alpine.data("experiences", () => ({
    items: [
      {
        name: "Web Development Projects",
        date: "2023 - 2024",
        desc: "During my college studies, I worked on several web development projects that showcase my skills in front-end and back-end development.",
      },
    ],
  }));
});
