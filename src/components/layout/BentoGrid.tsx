import { AppResumeData } from '../../types/resume'
import HeroTile from '../tiles/HeroTile'
import StatusTile from '../tiles/StatusTile'
import LocationTile from '../tiles/LocationTile'
import ExperienceTile from '../tiles/ExperienceTile'
import GitHubTile from '../tiles/GitHubTile'
import SkillsTile from '../tiles/SkillsTile'
import ExperienceTimelineTile from '../tiles/ExperienceTimelineTile'
import ProjectsTile from '../tiles/ProjectsTile'
import AboutTile from '../tiles/AboutTile'
import ContactTile from '../tiles/ContactTile'

interface BentoGridProps {
  data: AppResumeData
}

export default function BentoGrid({ data }: BentoGridProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-8">
      <div className="bento-grid">
        <HeroTile main={data.main} />
        <StatusTile openToWork={data.main.openToWork ?? true} />
        <LocationTile address={data.main.address} />
        <ExperienceTile yearsOfExperience={data.main.yearsOfExperience ?? 7} />
        <GitHubTile username="haramrit09k" />
        <SkillsTile skills={data.resume.skills} />
        <ExperienceTimelineTile work={data.resume.work} education={data.resume.education} />
        <ProjectsTile projects={data.portfolio.projects} />
        <AboutTile main={data.main} />
        <ContactTile main={data.main} />
      </div>
      <p className="text-center text-xs text-slate-700 py-6">
        Haramrit Singh Khurana © {new Date().getFullYear()}
      </p>
    </div>
  )
}
