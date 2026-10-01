export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  degree?: string; // legacy fallback
  fieldOfStudy?: string; // legacy fallback
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  link?: string;
  technologies?: string;
  description: string;
  bullets?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | string; // for custom sections

export interface SectionConfig {
  key: SectionKey;
  label: string;
  enabled: boolean;
  isCustom?: boolean;
}

export type TemplateId =
  | 'modern_executive'
  | 'oxford_classic'
  | 'creative_sidebar'
  | 'tech_minimalist'
  | 'nordic_clean'
  | 'compact_ats';

export type ColorTheme =
  | 'slate'
  | 'navy'
  | 'emerald'
  | 'burgundy'
  | 'indigo'
  | 'teal'
  | 'charcoal'
  | 'cobalt';

export type FontTheme = 'sans' | 'serif' | 'display' | 'classic' | 'mono';

export type SpacingScale = 'compact' | 'standard' | 'generous';

export interface CVDesignSettings {
  template: TemplateId;
  colorTheme: ColorTheme;
  fontTheme: FontTheme;
  spacing: SpacingScale;
  showPhoto: boolean;
  sectionOrder: SectionConfig[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  customSections: CustomSection[];
  design: CVDesignSettings;
}

export type WizardStepId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'sections'
  | 'design_export';
