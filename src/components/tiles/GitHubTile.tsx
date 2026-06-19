import { useState } from 'react'
import BentoTile from '../layout/BentoTile'

interface GitHubTileProps {
  username: string
}

export default function GitHubTile({ username }: GitHubTileProps) {
  const [imgError, setImgError] = useState(false)

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=11ABB0&icon_color=11ABB0&text_color=94a3b8&count_private=true&rank_icon=github`

  return (
    <BentoTile
      areaClass="tile-github"
      className="p-4 flex flex-col justify-center items-center min-h-[110px]"
    >
      {imgError ? (
        <div className="text-center">
          <p className="text-slate-600 text-xs mb-1">GitHub</p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#11ABB0] text-sm font-semibold hover:underline"
          >
            @{username}
          </a>
        </div>
      ) : (
        <img
          src={statsUrl}
          alt="GitHub Stats"
          className="w-full max-w-[220px] object-contain"
          onError={() => setImgError(true)}
        />
      )}
    </BentoTile>
  )
}
