"""Build an interface tour from real ace-interview.app screenshots.

Requires Pillow and ffmpeg. Capture date: 2026-09-27.
Only working UI screens are shown. Live question generation and revision
summary returned server errors; this is not an end-to-end AI feedback demo.
Run: python scripts/generate-ace-preview.py
"""
from pathlib import Path
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public/media'
SOURCES = ROOT / 'scripts/assets/ace-preview'
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'
BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
STEPS = [
    ('01-skills.png', 'Choose a skill.', ['Build a practice list around', 'the topics you want to improve.']),
    ('02-session.png', 'Pick your difficulty.', ['AI generates questions for your skill', 'at the difficulty level you choose.']),
    ('03-custom.png', 'Practice your questions.', ['Add specific questions you have seen', 'in interviews or elsewhere, along with', 'an ideal answer to practice against.']),
]

def scene(index):
    filename, title, lines = STEPS[index]
    canvas = Image.new('RGB', (1280, 720), '#10151f')
    draw = ImageDraw.Draw(canvas)
    def text(x, y, value, size, color, bold=False):
        draw.text((x, y), value, font=ImageFont.truetype(BOLD if bold else FONT, size), fill=color)
    text(70, 60, 'ACE / INTERVIEW PREP', 20, '#afa5ff', True)
    text(70, 200, title, 48, '#f2f3f7', True)
    for j, line in enumerate(lines):
        text(70, 280 + j * 35, line, 25, '#aeb8c9')
    text(70, 440, 'INTERFACE PREVIEW', 15, '#8894aa')
    for j in range(3):
        x = 70 + j * 62
        draw.rounded_rectangle((x, 490, x + 46, 494), radius=2, fill='#9b8aff' if j == index else '#30384a')
    text(70, 625, 'ace-interview.app', 20, '#d1d8e6')
    screenshot = Image.open(SOURCES / filename).convert('RGB')
    screenshot.thumbnail((405, 640), Image.Resampling.LANCZOS)
    x, y = 825 + (405 - screenshot.width) // 2, (720 - screenshot.height) // 2
    canvas.paste(screenshot, (x, y))
    return canvas

MEDIA.mkdir(exist_ok=True)
scenes = [scene(i) for i in range(3)]
scenes[1].save(MEDIA / 'ace-interview-demo-poster.jpg', quality=92)
with tempfile.TemporaryDirectory(prefix='ace-preview-') as folder:
    frame_id = 0
    for i, current in enumerate(scenes):
        for _ in range(60):
            current.save(Path(folder) / f'{frame_id:04}.png')
            frame_id += 1
        for j in range(1, 9):
            Image.blend(current, scenes[(i + 1) % 3], j / 8).save(Path(folder) / f'{frame_id:04}.png')
            frame_id += 1
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '15', '-i', f'{folder}/%04d.png',
                    '-c:v', 'libx264', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                    str(MEDIA / 'ace-interview-demo.mp4')], check=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(MEDIA / 'ace-interview-demo.mp4'),
                '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', str(MEDIA / 'ace-interview-demo.webm')], check=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(MEDIA / 'ace-interview-demo.mp4'),
                '-filter_complex', 'fps=8,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse',
                '-loop', '0', str(MEDIA / 'ace-interview-demo.gif')], check=True)
