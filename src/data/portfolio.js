export const portfolioData = {
  name: "Yash Goswami",
  title: "Full Stack Developer",
  bio: "Crafting elegant solutions with modern web technologies",
  tagline: "Building the future, one line of code at a time",
  experience: 11,
  experienceUnit: "Months",
  location: "India",
  email: "yash@example.com",

  // Social Links
  social: {
    github: "https://github.com/yashgoswami",
    linkedin: "https://linkedin.com/in/yashgoswami",
    twitter: "https://twitter.com/yashgoswami",
    portfolio: "https://yashgoswami.dev"
  },

  // Experience Details
  experienceDetails: [
    {
      company: "Thoughts2Binary",
      position: "Associate Software Engineer",
      period: "March 2025 - Present",
      duration: "Current",
      description: "Building scalable web applications and leading frontend development initiatives.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB"]
    },
    {
      company: "Techitute",
      position: "Full Stack Developer Intern",
      period: "June 2024 - February 2025",
      duration: "9 Months",
      description: "Developed full-stack features for enterprise applications, focusing on performance optimization and user experience.",
      technologies: ["JavaScript", "React", "Express", "PostgreSQL"]
    }
  ],

  // Skills
  skills: [
    { name: "JavaScript", category: "Language", proficiency: 90 },
    { name: "ReactJS", category: "Frontend", proficiency: 85 },
    { name: "Next.js", category: "Framework", proficiency: 80 },
    { name: "NodeJS", category: "Backend", proficiency: 85 },
    { name: "ExpressJS", category: "Backend", proficiency: 80 },
    { name: "MongoDB", category: "Database", proficiency: 80 },
    { name: "HTML", category: "Markup", proficiency: 95 },
    { name: "CSS", category: "Styling", proficiency: 90 },
    { name: "Git", category: "Tools", proficiency: 85 },
    { name: "GitHub", category: "Tools", proficiency: 85 }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Multi-Tenant SadwaS Platform",
      description: "A scalable multi-tenant application with subdomain routing and dynamic theming",
      longDescription: "Built a comprehensive multi-tenant SaaS platform that allows organizations to create their own branded subdomains. Features include dynamic configuration, role-based access control, and real-time collaboration.",
      image: "/project-1.jpg",
      technologies: ["Next.js", "MongoDB", "Node.js", "TailwindCSS"],
      category: "Full Stack",
      featured: true,
      liveUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Admin dashboard for managing products, orders, and customer analytics",
      longDescription: "Developed a comprehensive admin dashboard with advanced analytics, inventory management, and customer insights. Includes real-time order tracking and automated reporting.",
      image: "/project-2.jpg",
      technologies: ["React", "Express", "PostgreSQL", "Chart.js"],
      category: "Frontend",
      featured: true,
      liveUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Collaborative task management with real-time updates and team features",
      longDescription: "Created a real-time task management system with drag-and-drop functionality, team collaboration features, and progress tracking. Integrated with popular calendar apps.",
      image: "/project-3.jpg",
      technologies: ["React", "Firebase", "Material-UI"],
      category: "Full Stack",
      featured: false,
      liveUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/project"
    },
    {
      id: 4,
      title: "Portfolio Builder",
      description: "No-code portfolio builder with customizable templates and themes",
      longDescription: "Designed and built a no-code portfolio builder that allows users to create professional portfolios without writing code. Features drag-and-drop editor and export functionality.",
      image: "/project-4.jpg",
      technologies: ["Next.js", "MongoDB", "Styled Components"],
      category: "Full Stack",
      featured: false,
      liveUrl: "https://demo.example.com",
      githubUrl: "https://github.com/example/project"
    }
  ],

  // About Me
  about: {
    story: "I'm a passionate full stack developer with a keen eye for design and a love for creating seamless user experiences. My journey in web development started with curiosity and has evolved into a career building modern, scalable applications.",
    interests: ["Web Development", "UI/UX Design", "Open Source", "Tech Blogging"],
    values: ["Clean Code", "User-Centric Design", "Continuous Learning", "Collaboration"]
  }
};
