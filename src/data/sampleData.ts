import { CVData, SectionConfig } from '../types/cv';

export const DEFAULT_SECTION_ORDER: SectionConfig[] = [
  { key: 'summary', label: 'Professional Summary', enabled: true },
  { key: 'experience', label: 'Work Experience', enabled: true },
  { key: 'education', label: 'Education & Academics', enabled: true },
  { key: 'skills', label: 'Skills & Competencies', enabled: true },
  { key: 'projects', label: 'Key Projects', enabled: true },
  { key: 'certifications', label: 'Certifications & Accreditations', enabled: true },
  { key: 'languages', label: 'Languages', enabled: true },
];

export const EMPTY_CV: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skillCategories: [
    { id: 'skills-1', name: 'Technical Skills', skills: [] },
    { id: 'skills-2', name: 'Tools & Platforms', skills: [] },
  ],
  languages: [],
  projects: [],
  certifications: [],
  customSections: [],
  design: {
    template: 'modern_executive',
    colorTheme: 'navy',
    fontTheme: 'sans',
    spacing: 'standard',
    showPhoto: false,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  },
};

export const SAMPLE_CV: CVData = {
  personalInfo: {
    fullName: 'Brian Charles',
    jobTitle: 'Senior Software Engineer & Cloud Architect',
    email: 'brian.charles@example.com',
    phone: '+263 77 123 4567',
    location: 'Harare, Zimbabwe',
    website: 'https://briancharles.dev',
    linkedin: 'linkedin.com/in/brian-charles',
    github: 'github.com/briancharles',
    photoUrl: '',
  },
  summary:
    'Zimbabwean software and cloud engineering leader with 10+ years of experience building reliable platforms for telecommunications, financial services, and enterprise customers. Skilled in distributed systems, cloud infrastructure, and mobile payment integrations, with a record of improving service availability, speeding up delivery, and mentoring engineering teams in Harare.',
  experience: [
    {
      id: 'exp-1',
      company: 'Econet Wireless Zimbabwe',
      role: 'Senior Software Engineer & Cloud Architect',
      location: 'Harare, Zimbabwe',
      startDate: '2021',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Lead the design and operation of cloud services supporting high-volume telecommunications and mobile financial products.',
        'Improved release reliability by introducing automated testing, deployment checks, and service monitoring across Kubernetes workloads.',
        'Reduced recurring infrastructure costs by 25% through right-sizing, capacity reviews, and improved resource scheduling.',
        'Mentor a team of engineers and work with product, security, and network teams to deliver dependable services for customers across Zimbabwe.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Liquid Intelligent Technologies Zimbabwe',
      role: 'Systems Engineer',
      location: 'Harare, Zimbabwe',
      startDate: '2017',
      endDate: '2021',
      isCurrent: false,
      bullets: [
        'Maintained Linux and cloud infrastructure for enterprise connectivity and managed services customers.',
        'Automated routine provisioning and health checks, reducing manual support work and improving incident response times.',
        'Collaborated with network operations and customer teams to troubleshoot service issues and deliver infrastructure upgrades.',
      ],
    },
    {
      id: 'exp-3',
      company: 'ZimSwitch Technologies',
      role: 'Software Engineer',
      location: 'Harare, Zimbabwe',
      startDate: '2015',
      endDate: '2017',
      isCurrent: false,
      bullets: [
        'Developed and supported transaction processing services used by banks and payment providers in Zimbabwe.',
        'Improved application logging and operational runbooks to help the team diagnose production issues more quickly.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of Zimbabwe',
      qualification: 'Bachelor of Science Honours in Computer Science',
      location: 'Harare, Zimbabwe',
      startDate: '2011',
      endDate: '2015',
      gpa: 'Upper Second Class',
      highlights: [
        'Focused on software engineering, databases, computer networks, and information systems',
        'Final-year project: A web-based inventory and reporting system for small businesses',
      ],
    },
    {
      id: 'edu-2',
      institution: 'Harare Institute of Technology',
      qualification: 'Postgraduate Diploma in Information Technology',
      location: 'Harare, Zimbabwe',
      startDate: '2016',
      endDate: '2017',
      gpa: '',
      highlights: ['Advanced study in enterprise systems, IT service management, and project delivery'],
    },
  ],
  skillCategories: [
    {
      id: 'skills-1',
      name: 'Software Engineering',
      skills: ['Java', 'TypeScript', 'Python', 'Go', 'SQL', 'REST APIs', 'Microservices', 'Linux'],
    },
    {
      id: 'skills-2',
      name: 'Cloud, Infrastructure & Payments',
      skills: ['Kubernetes', 'AWS', 'Docker', 'Terraform', 'PostgreSQL', 'Redis', 'CI/CD', 'Mobile payments'],
    },
    {
      id: 'skills-3',
      name: 'Leadership & Operations',
      skills: ['System design', 'Technical mentoring', 'Incident response', 'Capacity planning', 'Agile delivery'],
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Shona', proficiency: 'Native' },
    { id: 'lang-3', language: 'Ndebele', proficiency: 'Intermediate' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'LocalPay: Payment Reconciliation Toolkit',
      role: 'Developer',
      link: 'https://github.com/briancharles/localpay',
      technologies: 'Python, PostgreSQL, FastAPI',
      description:
        'A prototype toolkit that imports payment settlement reports, flags reconciliation differences, and produces clear daily summaries for small finance teams.',
      bullets: [
        'Added validation and duplicate detection to reduce manual review during reconciliation.',
        'Built configurable CSV imports to support common bank and mobile money statement formats.',
      ],
    },
    {
      id: 'proj-2',
      title: 'Community Services Directory',
      role: 'Full-Stack Developer',
      technologies: 'TypeScript, React, Node.js',
      description:
        'A responsive directory prototype helping local organisations publish contact details and service information for residents.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAA-BC-2023',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation & CNCF',
      date: '2024',
      credentialId: 'CKA-BC-2024',
    },
  ],
  customSections: [],
  design: {
    template: 'modern_executive',
    colorTheme: 'navy',
    fontTheme: 'sans',
    spacing: 'standard',
    showPhoto: false,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  },
};
