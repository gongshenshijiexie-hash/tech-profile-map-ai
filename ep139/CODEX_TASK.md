# EP139｜CODEX H5 V1 DEVELOPMENT TASK

Build the formal H5 for EP139 based on the supplied starter project.

## Core narrative
This episode is not a semantic-segmentation lecture. It follows an AI "looking at" the same Shanghai / Lujiazui scene and gradually learning what is road, building, water, vegetation, and moving vehicle.

The audience should feel that the AI is:

**observing -> comparing -> finding patterns -> separating -> relating -> doubting -> verifying -> correcting -> understanding**

## Master clock
Use `assets/audio/EP139_VOICE_MASTER.wav` as the ONLY master clock.
Do not move subtitle timing to fit animation.
Do not alter audio duration.

## Earth Studio media
Use:
- `assets/video/ES01.mp4`
- `assets/video/ES02.mp4`
- `assets/video/ES03.mp4`
- `assets/video/ES04.mp4`

Suggested use:
- ES01: opening Shanghai -> Lujiazui continuity
- ES02: approach to observation area
- ES03: main observation plate; it may freeze/hold after its motion completes while H5 overlays continue
- ES04: final descent for the EP140 localization hook

Do not continuously fly the map. Scene 03 onward should mainly work on the same Lujiazui observation plate.

## Scene design
Follow `docs/EP139_SCENE_TIMELINE_V1.md` exactly.

### Scene 01 / 00:00-00:14.60
Real Shanghai first. Minimal HUD. Let the city be readable.

### Scene 02 / 00:14.65-00:31.49
AI begins observing gray regions, lane-like lines and vehicle motion. Use scan windows, local magnification and restrained trace lines.

### Scene 03 / 00:31.54-00:45.36
Put gray road and gray rooftop in visual competition. Do NOT reveal the answer immediately.

### Scene 04 / 00:45.41-00:59.39
Show the AI finding repeatable clues: continuation, connectivity, fixed footprint, fragmented edges, reflective texture.

### Scene 05 / 00:59.44-00:71.47
Gradually separate road/building/water/tree/car layers while keeping the real Shanghai image visible beneath. Avoid rainbow classroom segmentation.

### Scene 06 / 00:71.52-00:90.87
Show relations, not labels alone: road connects to road; building borders road; car sits/moves on road; traversable vs blocked path.

### Scene 07 / 00:90.92-00:108.70
Return to the gray-road-vs-gray-rooftop case. AI doubts the easy color-based answer.

### Scene 08 / 00:108.75-00:133.38
Visual climax. Verify clues one by one. Confidence rises. Road and building are confirmed only after multiple clues agree.

### Scene 09 / 00:133.43-00:158.61
Recompose the city into a structured spatial model: traversable area, obstacles, water, moving objects and connections.

### Scene 10 / 00:158.66-00:175.16
Use ES04. Add a localization point that drifts / has not locked. End on: "它怎么知道自己此刻到底在哪里？"

## Visual language
- Blue/white technology palette over the real Google Earth footage.
- Thin vector outlines, scan lines, tracking dots, path traces and restrained glow.
- Keep background geography visible and recognizable.
- Mobile-first typography.
- Subtitle block: bottom safe area, left aligned inside a centered wide subtitle panel, white text, semi-transparent blue background.
- Avoid tiny labels. Any emphasized keywords must be large enough for phone viewing.
- Main overlays must stay above subtitle area.

## Motion principles
Do not use template-like repeated entrances.
Every effect should represent an AI action:
- observe = scan / focus
- compare = paired focus frames
- infer = evidence accumulation
- relate = connection lines
- correct = rejected hypothesis fades / redraws
- understand = multiple layers lock into one spatial structure

## Media behavior
- No native `<video controls>`.
- No bottom playback bar.
- Earth Studio videos are muted; WAV provides master audio.
- H5 state must seek correctly from master audio time.
- When ES03 motion ends, holding its last frame is preferred to obvious looping.

## Deliverables
1. `EP139_H5_V1_REVIEW.html` (standalone where practical)
2. Source files
3. Mobile-safe preview
4. No MP4 export yet until visual review is approved.
