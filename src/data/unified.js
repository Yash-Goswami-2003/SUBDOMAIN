const singleSourceOfTruth = {
    name: "SingleSourceOfTruth",
    description: "This JSON is a single source of truth for everything that is displayed on the UI.",
    data: [
        // ROUTES
        { documentType: "route", name: "Home", path: "/", icon: "HomeIcon" },
        { documentType: "route", name: "About", path: "/about", icon: "UserIcon" },
        { documentType: "route", name: "Projects", path: "/projects", icon: "BriefcaseIcon" },
        { documentType: "route", name: "Contact", path: "/contact", icon: "EnvelopeIcon" },
        { documentType: "route", name: "Blogs", path: "/blogs", icon: "BookOpenIcon" },

        // PERSONAL DATA
        { documentType: "data", key: "name", value: "Yash Goswami" },
        { documentType: "data", key: "title", value: "Associate Software Engineer" },
        { documentType: "data", key: "bio", value: "Experienced developer specializing in building scalable web applications and AI-powered tools." },
        { documentType: "data", key: "tagline", value: "Bridging the gap between hardware and software through innovation" },
        { documentType: "data", key: "experience", value: 3 },
        { documentType: "data", key: "experienceUnit", value: "Years" },
        { documentType: "data", key: "location", value: "India" },
        { documentType: "data", key: "email", value: "yashgoswamiyg2003@gmail.com" },
        { documentType: "data", key: "aboutStory", value: "I am a graduate in Electronics and Communication Engineering from Birla Institute of Applied Sciences (2025). My passion lies in software development and bridging hardware with modern web technologies. From optimizing core system modules to building AI-driven presentation tools, I focus on efficiency, stability, and user experience." },
        { documentType: "data", key: "interests", value: ["Artificial Intelligence", "Hardware Interfacing", "Digital Circuits", "Collaborative Learning"] },
        { documentType: "data", key: "values", value: ["Excellence", "Stability", "Innovation", "Efficiency"] },

        // EXPERIENCE
        {
            documentType: "experience",
            company: "Thoughts2Binary",
            position: "Associate Software Engineer",
            period: "March 2025 - Present",
            duration: "Current",
            description: "Optimized and debugged the core module App Builder, increasing efficiency by 25%. Implemented 25+ new features for configuration-driven development. Collaborated with mobile teams to resolve critical bugs and improve platform stability.",
            technologies: ["React", "Next.js", "Node.js", "App Builder"]
        },
        {
            documentType: "experience",
            company: "Techitute",
            position: "Full Stack Intern",
            period: "March 2019 - January 2021",
            duration: "22 Months",
            description: "Developed and launched an Employee Portal using the MERN stack in 3 weeks. Implemented secure authentication and user management modules, reducing manual paperwork by 50%.",
            technologies: ["MERN Stack", "JavaScript", "HTML/CSS", "Authentication"]
        },

        // SKILLS
        { documentType: "skill", name: "React", category: "Frontend", proficiency: 90 },
        { documentType: "skill", name: "Next.js", category: "Framework", proficiency: 85 },
        { documentType: "skill", name: "Node.js", category: "Backend", proficiency: 85 },
        { documentType: "skill", name: "MERN Stack", category: "Full Stack", proficiency: 90 },
        { documentType: "skill", name: "Arduino Mega", category: "Hardware", proficiency: 80 },
        { documentType: "skill", name: "JavaScript", category: "Language", proficiency: 95 },
        { documentType: "skill", name: "GenAI", category: "AI", proficiency: 55 },

        // PROJECTS
        {
            documentType: "project",
            id: 1,
            title: "SlideCraft AI Presentation Maker",
            description: "An AI-powered presentation maker that generates customizable slide decks from user prompts.",
            longDescription: "Designed and developed an AI-powered presentation maker that enables real-time editing of content, layout, and design elements. Integrated GenAI to produce JSON configurations for live slide rendering, reducing manual creation time by over 70%.",
            image: "/project-slidecraft.jpg",
            technologies: ["GenAI", "JSON", "React", "Next.js"],
            category: "AI / Full Stack",
            featured: true,
            liveUrl: "https://slidecraft-demo.example.com",
            githubUrl: "https://github.com/yash-goswami-hsr/slidecraft"
        },
        {
            documentType: "project",
            id: 2,
            title: "Web-Controlled Mechanical Arm",
            description: "Built a web-controlled mechanical arm using Arduino Mega and four servos.",
            longDescription: "Enables directional commands and automated movement sequences via a web interface. Facilitates Arduino communication through serial connections for seamless control.",
            image: "/project-arm.jpg",
            technologies: ["Arduino Mega", "Servos", "Serial Comm", "Web Tech"],
            category: "Hardware / Web",
            featured: false,
            liveUrl: "https://arm-demo.example.com",
            githubUrl: "https://github.com/yash-goswami-hsr/mechanical-arm"
        },
        {
            documentType: "project",
            id: 3,
            title: "Digital Logic Simulator",
            description: "A real-time digital circuit simulator with drag-and-drop design.",
            longDescription: "Allows users to create circuits within minutes using an intuitive interface. Enables collaborative learning by allowing students to share components, overcoming resource limitations.",
            image: "/project-simulator.jpg",
            technologies: ["JavaScript", "HTML5 Canvas", "Drag-and-Drop", "Collaboration"],
            category: "Software",
            featured: false,
            liveUrl: "https://simulator-demo.example.com",
            githubUrl: "https://github.com/yash-goswami-hsr/logic-simulator"
        },

        // BLOGS
        {
            documentType: "blog",
            id: '1',
            title: 'The Future of Web Development',
            excerpt: 'Exploring the latest trends in Next.js and React.',
            content: 'Web development is evolving faster than ever. From Server Components to AI-powered coding assistants, the landscape is changing...',
            author: 'Yash Goswami',
            date: '2026-01-29',
            readTime: '5 min'
        },
        {
            documentType: "blog",
            id: '2',
            title: 'Mastering MVVM in React',
            excerpt: 'How to structure your applications for better maintainability.',
            content: 'MVVM (Model-View-ViewModel) is a powerful pattern that helps separate concerns in your frontend applications...',
            author: 'Admin',
            date: '2026-01-28',
            readTime: '8 min'
        },

        // CONTACTS
        { documentType: "contact", platform: "GitHub", url: "https://github.com/yash-goswami-2003", icon: "GithubIcon" },
        { documentType: "contact", platform: "LinkedIn", url: "https://linkedin.com/in/Yash-Goswami-hsr", icon: "LinkedinIcon" },
        { documentType: "contact", platform: "Portfolio", url: "https://yashgoswami.com", icon: "GlobeIcon" },

        // THEMES
        {
            documentType: "theme",
            id: 'grayscale',
            name: 'Grayscale',
            description: 'Clean and minimal monochrome design',
            colors: {
                bg: '#ffffff',
                surface: '#f9f9f9',
                border: '#e0e0e0',
                textPrimary: '#1a1a1a',
                textSecondary: '#5a5a5a',
                accent: '#000000',
                accentHover: '#333333'
            },
            darkColors: {
                bg: '#0a0a0a',
                surface: '#1a1a1a',
                border: '#2a2a2a',
                textPrimary: '#f5f5f5',
                textSecondary: '#a0a0a0',
                accent: '#ffffff',
                accentHover: '#e0e0e0'
            }
        },
        {
            documentType: "theme",
            id: 'midnight',
            name: 'Midnight',
            description: 'Deep blue and navy aesthetic',
            colors: {
                bg: '#ffffff',
                surface: '#f0f4f8',
                border: '#d1d9e6',
                textPrimary: '#1a202c',
                textSecondary: '#4a5568',
                accent: '#2b6cb0',
                accentHover: '#2c5282'
            },
            darkColors: {
                bg: '#0f172a',
                surface: '#1e293b',
                border: '#334155',
                textPrimary: '#f8fafc',
                textSecondary: '#94a3b8',
                accent: '#38bdf8',
                accentHover: '#7dd3fc'
            }
        },
        {
            documentType: "theme",
            id: 'forest',
            name: 'Forest',
            description: 'Natural green and earthy tones',
            colors: {
                bg: '#ffffff',
                surface: '#f3f4f1',
                border: '#d8dbd2',
                textPrimary: '#1f291f',
                textSecondary: '#4a554a',
                accent: '#2d5a27',
                accentHover: '#1e3a1a'
            },
            darkColors: {
                bg: '#0a0f0a',
                surface: '#141a14',
                border: '#242a24',
                textPrimary: '#f0f5f0',
                textSecondary: '#a0b0a0',
                accent: '#4ade80',
                accentHover: '#86efac'
            }
        }
    ]
}

export default singleSourceOfTruth;