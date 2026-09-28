"""Real live-site captures, 2026-09-27. Requires Pillow and ffmpeg."""
from pathlib import Path
from PIL import Image
import tempfile, subprocess
base=Path(__file__).resolve().parent
names=['01-hero.png','02-preview.png','06-work.png','03-projects.png','04-ace.png','05-homeos.png']
scenes=[Image.open(base/'captures'/name).convert('RGB').resize((960,540),Image.Resampling.LANCZOS) for name in names]
scenes[0].save(base/'portfolio-overview-poster.jpg',quality=95)
with tempfile.TemporaryDirectory(prefix='portfolio-social-') as temp:
    idx=0
    for i,scene in enumerate(scenes):
        for _ in range(24):
            scene.save(Path(temp)/f'{idx:04}.png');idx+=1
        for step in range(1,5):
            Image.blend(scene,scenes[(i+1)%len(scenes)],step/4).save(Path(temp)/f'{idx:04}.png');idx+=1
    subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','8','-i',f'{temp}/%04d.png','-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(base/'portfolio-overview.mp4')],check=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(base/'portfolio-overview.mp4'),'-filter_complex','split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer','-loop','0',str(base/'portfolio-overview.gif')],check=True)
