# EP139 CODEX STARTER

## Episode
EP139｜AI到底怎么知道，哪里是路，哪里是房子？

## Master clock
`assets/audio/EP139_VOICE_MASTER.wav`

Duration: 175.31s
Canvas: 720x1280
FPS: 24
Location: Shanghai / Lujiazui

## Before opening in Codex
Copy these four files into `assets/video/`:

- ES01.mp4
- ES02.mp4
- ES03.mp4
- ES04.mp4

Do not change the audio or subtitle timing.

## Preview
Open with a local HTTP server. Example:

```bash
python3 -m http.server 4173
```

Then open:

`http://localhost:4173/`

## Non-negotiable production rules
- WAV is the only master clock.
- Subtitle timing is fixed to the supplied SRT.
- 720x1280 / 24fps.
- No bottom controls or visible playback buttons in final UI.
- Google Earth remains the continuous visual substrate.
- Do not turn the episode into a generic infographic slideshow.
- AI processing is personified: observe -> compare -> infer -> relate -> correct.
- Use minimal terminology; show mechanisms visually.
- Protect subtitle safe area at the bottom.
