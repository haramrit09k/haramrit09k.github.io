import BentoTile from '../layout/BentoTile'
import CountUpNumber from '../shared/CountUpNumber'

interface ExperienceTileProps {
  yearsOfExperience: number
}

export default function ExperienceTile({ yearsOfExperience }: ExperienceTileProps) {
  return (
    <BentoTile
      areaClass="tile-expstat"
      className="p-5 flex flex-col justify-center items-center text-center min-h-[110px]"
    >
      <CountUpNumber
        target={yearsOfExperience}
        suffix="+"
        className="text-5xl font-black text-[#11ABB0] leading-none"
      />
      <p className="mt-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
        Years Experience
      </p>
    </BentoTile>
  )
}
