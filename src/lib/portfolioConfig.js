import { fetchServerConfig } from './serverConfig'

// Single source of truth for portfolio configuration used by
// both API routes and server components.
// This function fetches data from MongoDB and transforms it into
// the expected object structure that all components consume.
export async function getPortfolioConfig() {
  try {
    const documents = await fetchServerConfig();

    if (!documents || documents.length === 0) {
      return getDefaultConfig();
    }

    // Transform the flat document list into the expected nested object structure
    const config = transformDocumentsToConfig(documents);
    return config;
  } catch (error) {
    console.error('Failed to get portfolio config:', error);
    return getDefaultConfig();
  }
}

/**
 * Transform the flat MongoDB document array into the nested config object
 * that all UI components expect.
 *
 * MongoDB stores data in these formats:
 * - documentType: "data" with key/value pairs for simple fields
 * - documentType: "contact" for social links (platform, url)
 * - documentType: "project" for projects array
 * - documentType: "skill" for skills array
 * - documentType: "experience" for experience array
 */
function transformDocumentsToConfig(documents) {
  // Extract simple data fields (key-value pairs with documentType: "data")
  const dataFields = documents.filter(d => d.documentType === 'data');

  const getData = (key, defaultValue = '') => {
    const doc = dataFields.find(d => d.key === key);
    return doc ? doc.value : defaultValue;
  };

  // Extract contact/social links (documentType: "contact")
  const contactDocs = documents.filter(d => d.documentType === 'contact');
  const getContactUrl = (platform) => {
    const doc = contactDocs.find(d => d.platform?.toLowerCase() === platform.toLowerCase());
    return doc?.url || '#';
  };

  // Collect array-type documents
  const skills = documents.filter(d => d.documentType === 'skill');
  const projects = documents.filter(d => d.documentType === 'project');
  const experienceDetails = documents.filter(d => d.documentType === 'experience');

  // Ensure project ids are unique and numeric for stable rendering
  const usedProjectIds = new Set();
  let nextProjectId = 1;
  const normalizeProjectId = (value) => {
    const numericId = Number(value);
    if (Number.isFinite(numericId) && !usedProjectIds.has(numericId)) {
      usedProjectIds.add(numericId);
      if (numericId >= nextProjectId) nextProjectId = numericId + 1;
      return numericId;
    }
    const assignedId = nextProjectId;
    nextProjectId += 1;
    usedProjectIds.add(assignedId);
    return assignedId;
  };

  return {
    // Simple data fields
    name: getData('name', 'Your Name'),
    title: getData('title', 'Developer'),
    bio: getData('bio', 'Your bio here'),
    tagline: getData('tagline', 'Your tagline'),
    experience: getData('experience', 0),
    experienceUnit: getData('experienceUnit', 'Years'),
    location: getData('location', 'Your Location'),
    email: getData('email', 'email@example.com'),

    // Social links from contact documents
    social: {
      github: getContactUrl('GitHub'),
      linkedin: getContactUrl('LinkedIn'),
      portfolio: getContactUrl('Portfolio'),
      twitter: getContactUrl('Twitter')
    },

    // Experience details array
    experienceDetails: experienceDetails.map(exp => ({
      company: exp.company || '',
      position: exp.position || '',
      period: exp.period || '',
      duration: exp.duration || '',
      description: exp.description || '',
      technologies: exp.technologies || []
    })),

    // Skills array
    skills: skills.map(skill => ({
      name: skill.name || '',
      category: skill.category || '',
      proficiency: skill.proficiency || 0
    })),

    // Projects array
    projects: projects.map((proj) => ({
      id: normalizeProjectId(proj.id),
      title: proj.title || '',
      description: proj.description || '',
      longDescription: proj.longDescription || proj.description || '',
      image: proj.image || '',
      technologies: proj.technologies || [],
      category: proj.category || 'Full Stack',
      featured: proj.featured || false,
      liveUrl: proj.liveUrl || '#',
      githubUrl: proj.githubUrl || '#'
    })),

    // About section (assembled from data fields)
    about: {
      story: getData('aboutStory', 'Your story here'),
      interests: getData('interests', []),
      values: getData('values', [])
    }
  };
}

/**
 * Default config when MongoDB is unavailable or empty
 */
function getDefaultConfig() {
  return {
    name: 'Yash Goswami',
    title: 'Full Stack Developer',
    bio: 'Crafting elegant solutions with modern web technologies',
    tagline: 'Building the future, one line of code at a time',
    experience: 3,
    experienceUnit: 'Years',
    location: 'India',
    email: 'yash@example.com',
    social: {
      github: '#',
      linkedin: '#',
      portfolio: '#',
      twitter: '#'
    },
    experienceDetails: [],
    skills: [],
    projects: [],
    about: {
      story: 'My story...',
      interests: [],
      values: []
    }
  };
}
