# EP138 V1.2.3 TASK

Target output:

`EP138_H5_V1_2_3_SUBTITLE_EMPHASIS_FIX.html`

## Scope A - Subtitle size alignment with EP128

Compare EP138 and EP128 for:

- font-size
- font-weight
- line-height
- letter-spacing
- subtitle width/max-width
- container height/min-height
- padding
- bottom offset
- wrapping behavior

Then adjust EP138 so the mobile subtitle visual scale is approximately aligned with EP128.

Requirements:

- clearly larger than EP138 V1.2.2
- readable on a 720x1280 phone-first canvas
- no clipping
- no overflow outside safe canvas
- no compressed letter spacing to force text into the box
- natural wrapping preferred
- do not fragment sentences excessively
- do not change subtitle timing
- preserve current subtitle placement system unless a small safety adjustment is necessary

## Scope B - Voice-driven text emphasis

Create precise emphasis cues synchronized to the formal master timeline.

Potential emphasis effects:

- scale 1.04-1.10
- brightness increase
- short glow
- opacity/font-weight increase
- return to normal state after the spoken concept passes

Avoid:

- bounce
- continuous flashing
- random animation
- whole-screen pulse
- long persistent glow
- layout-shifting dynamic font-size changes

Prefer transform/filter/text-shadow/opacity so text layout stays stable.

## Priority concepts

Use the actual spoken line to decide whether a cue is needed. Candidate terms include:

- 真实世界
- 卫星影像
- 空间
- 空间模型
- 像素
- 语义
- AI
- 道路
- 建筑
- 水体
- 植被
- 图层
- 结构化
- 结构化空间
- 机器读取 / 机器可读取

Do not mechanically highlight every occurrence.

## Synchronization requirements

Emphasis must be driven from the existing master time source, preferably the formal voice `currentTime` or the existing unified timeline.

It must remain correct after:

- seek
- pause
- replay
- scene jump

Do not create an independent timer that can drift from voice/subtitles/scenes.

A compact cue structure is recommended, for example:

```js
const emphasisCues = [
  { start: 12.34, end: 13.10, targets: ['...'] }
]
```

Use the existing code architecture where possible.

## Patch, do not rebuild

Prefer:

- CSS overrides
- small classes
- data attributes
- a compact cue table
- minimal JS additions

Do not rebuild the H5.
Do not refactor frozen scene systems.
Do not rename compatibility variables merely because they contain older EP numbers if they are currently functional.

## Mandatory first pass

Before editing, report the following and stop:

1. EP138 master path found
2. EP128 reference path found
3. EP138 subtitle CSS values
4. EP128 subtitle CSS values
5. EP138 subtitle DOM/render logic
6. voice audio element id/variable
7. master timeline mechanism
8. scene switching logic
9. seek refresh logic
10. proposed voice-time -> emphasis-cue -> DOM-class design
11. frozen code regions that will not be changed
