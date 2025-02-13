// SKILLS
document.addEventListener("alpine:init", () => {
  Alpine.data("skills", () => ({
    items: [
      { id: 1, name: "Laravel", img: "laravel.svg" },
      { id: 2, name: "CodeIgniter", img: "codeigniter.svg" },
      { id: 3, name: "Bootstrap", img: "bootstrap.svg" },
      { id: 4, name: "JavaScript", img: "javascript.svg" },
      { id: 5, name: "PHP", img: "php.svg" },
      { id: 6, name: "SQL", img: "sql.svg" },
      { id: 7, name: "Git", img: "git.svg" },
      { id: 8, name: "GitHub", img: "github.svg" },
      { id: 9, name: "Figma", img: "figma.svg" },
    ],
  }));
});

// EXPERIENCES
document.addEventListener("alpine:init", () => {
  Alpine.data("experiences", () => ({
    items: [
      {
        id: 1,
        name: "Web Development Projects",
        date: "2023 - 2024",
        desc: "During my college studies, I worked on several web development projects that showcase my skills in front-end and back-end development.",
      },
    ],
  }));
});
