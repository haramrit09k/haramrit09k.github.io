export interface SocialLink {
  name: string
  url: string
  className: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export interface MainData {
  name: string
  occupation: string
  description: string
  image: string
  employer: string
  bio: string
  contactmessage: string
  email: string
  phone: string
  address: Address
  website: string
  resumedownload: string
  social: SocialLink[]
  // Extended fields
  openToWork?: boolean
  shortBio?: string
  calendlyUrl?: string
  yearsOfExperience?: number
  taglines?: string[]
}

export interface Role {
  title: string
  years: string
  description: string
  shortDescription?: string
}

export interface WorkEntry {
  company: string
  logo: string
  roles: Role[]
  shortDescription?: string
}

export interface EducationEntry {
  school: string
  degree: string
  graduated: string
  description: string
  achievements: string
  logo: string
}

export interface Skill {
  name: string
  description: string
  image: string
}

export interface ResumeSection {
  education: EducationEntry[]
  work: WorkEntry[]
  skills: Skill[]
  skillmessage: string
}

export interface Project {
  title: string
  category: string
  image: string
  url: string
  featured?: boolean
  techStack?: string[]
  metric?: string
}

export interface Testimonial {
  text: string
  user: string
}

export interface AppResumeData {
  main: MainData
  resume: ResumeSection
  portfolio: {
    projects: Project[]
  }
  testimonials: {
    testimonials: Testimonial[]
  }
}
