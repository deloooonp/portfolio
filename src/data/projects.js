export const PROJECTS = [
  {
    id: 1,
    name: "iPhone 15 Pro — Motion-Driven Landing Page",
    type: "Frontend",
    summary:
      "Scroll-driven animated landing page with immersive 3D product reveal.",
    description: [
      "An interactive landing page inspired by the iPhone 15 Pro, focused on motion, depth, and visual storytelling.",
      "The experience is driven by smooth scroll-based animations and subtle 3D elements to highlight the product's materials and details.",
      "Rather than static sections, the page uses motion to guide attention and create a sense of progression.",
      "Built with React, GSAP, and Three.js to deliver high-performance animations with a polished, modern feel.",
    ],
    tags: ["React", "GSAP", "Three.js"],
    year: "2024",
    thumbnail: "/images/project-1.png",
    liveUrl: "https://iphone15-deloooonp.vercel.app/",
    githubUrl: "https://github.com/deloooonp/iPhone-15-Pro-Website-Clone",
    desktopPosition: "top-12 left-12",
    windowPosition: "top-[10vh] left-10",
  },
  {
    id: 2,
    name: "ECOVEST Digital Waste Bank",
    type: "Frontend",
    summary:
      "Community waste management platform built for a national competition — 2nd place.",
    description: [
      "Ecovest is a digital waste bank platform designed to support community-based waste management in Indonesia.",
      "The platform helps users record waste deposits, track balances, and understand the value of recyclable materials through a clear interface.",
      "This project was developed for a national competition and achieved 2nd place, highlighting its real-world relevance and execution.",
      "Built using Next.js and Tailwind CSS, with a focus on performance, responsiveness, and accessibility.",
    ],
    tags: ["Next.js", "Tailwind CSS"],
    year: "2025",
    thumbnail: "/images/project-2.png",
    liveUrl: "https://ecovest-bank-sampah.vercel.app/",
    githubUrl:
      "https://github.com/deloooonp/webdesign_RaxiemStudio_technoversary25",
    desktopPosition: "top-56 left-48",
    windowPosition: "top-[15vh] left-45",
  },
  {
    id: 3,
    name: "Private Chat App",
    type: "Fullstack",
    summary:
      "Ephemeral 2-person chat rooms with self-destructing messages and bot protection.",
    description: [
      "Private Chat is a secure, self-destructing chat room application built with Next.js and ElysiaJS.",
      "Each room supports a maximum of 2 users, is ephemeral by design, and includes bot protection with anonymized identities.",
      "Powered by Upstash Redis for real-time state, with Tailwind CSS v4 and React Query on the frontend.",
    ],
    tags: ["Next.js", "ElysiaJS", "Upstash Redis", "Tailwind CSS"],
    year: "2025",
    thumbnail: "/images/project-3.png",
    liveUrl: "https://privatechat-next.vercel.app/",
    githubUrl: "https://github.com/deloooonp/nextjs-chat-app",
    desktopPosition: "top-32 right-24",
    windowPosition: "top-[25vh] left-10",
  },
  {
    id: 4,
    name: "Wedding Invitation",
    type: "Frontend",
    summary:
      "An interactive wedding invitation web app with gallery, and music features.",
    description: [
      "A fully interactive wedding invitation built with React and TypeScript.",
      "Features include a photo gallery and background music — designed to deliver an elegant digital experience for guests.",
      "Focused on smooth UI, mobile responsiveness, and a warm, personalized aesthetic.",
    ],
    tags: ["React", "TypeScript"],
    year: "2026",
    thumbnail: "/images/project-4.png",
    liveUrl: "https://michel-runa.vercel.app/",
    // githubUrl: "https://github.com/deloooonp/michel-runa",
    desktopPosition: "bottom-32 right-29",
    windowPosition: "top-[28vh] left-54",
  },
];

export const PROJECT_TYPES = [...new Set(PROJECTS.map((p) => p.type))];
