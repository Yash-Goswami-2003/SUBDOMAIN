import { z } from 'zod';

export const SocialSchema = z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url(),
    portfolio: z.string().url(),
});

export const ExperienceDetailSchema = z.object({
    company: z.string(),
    position: z.string(),
    period: z.string(),
    duration: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
});

export const SkillSchema = z.object({
    name: z.string(),
    category: z.string(),
    proficiency: z.number(),
});

export const ProjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    category: z.string(),
    featured: z.boolean(),
    liveUrl: z.string().url(),
    githubUrl: z.string().url(),
});

export const AboutSchema = z.object({
    story: z.string(),
    interests: z.array(z.string()),
    values: z.array(z.string()),
});

export const PortfolioSchema = z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    tagline: z.string(),
    experience: z.number(),
    experienceUnit: z.string(),
    location: z.string(),
    email: z.string().email(),
    social: SocialSchema,
    experienceDetails: z.array(ExperienceDetailSchema),
    skills: z.array(SkillSchema),
    projects: z.array(ProjectSchema),
    about: AboutSchema,
});

export const ApiResponseSchema = z.object({
    record: PortfolioSchema,
    metadata: z.object({
        id: z.string(),
        private: z.boolean(),
        createdAt: z.string(),
    }),
});

export type Social = z.infer<typeof SocialSchema>;
export type ExperienceDetail = z.infer<typeof ExperienceDetailSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type About = z.infer<typeof AboutSchema>;
export type PortfolioData = z.infer<typeof PortfolioSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
