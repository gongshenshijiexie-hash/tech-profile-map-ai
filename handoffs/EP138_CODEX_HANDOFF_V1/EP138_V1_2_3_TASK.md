# EP138 H5 V1.2.3 | SUBTITLE + EMPHASIS FIX

## Objective

Modify only typography readability and narration-synchronized emphasis. Preserve the accepted visual build.

## 1. Subtitle sizing

Use EP128 reference as the mobile subtitle visual standard.

- Increase subtitle font size, line height, and caption safe-area height as needed.
- Keep bottom-left alignment.
- Avoid overly fragmented line breaks.
- Do not cover key visual information.
- Do not change caption wording or timing unless a clear existing timing defect is found.

## 2. Narration-synchronized emphasis

When narration reaches key concepts, corresponding words in subtitles and on-screen titles/labels should briefly become more prominent.

Preferred behavior:
- scale roughly 1.04-1.10
- fast 0.2-0.5 s attack
- short brightness/glow increase
- return cleanly to baseline
- no bounce
- no random flashing
- no whole-sentence flashing when one keyword is enough

Priority concepts:
- 真实世界
- 卫星影像
- 空间模型
- 像素
- 语义
- 道路
- 建筑
- 水体
- 植被
- 图层
- 结构化空间
- 机器可读取

## 3. Hard constraints

Do not modify:
- Earth Studio video behavior
- map crop/position
- map continuity logic
- S01-S10 scene structure
- voice track
- BGM logic or volume
- scene start/end times
- accepted title placement
- accepted visual assets

## 4. Required workflow

`IMPORT CURRENT MASTER -> VERIFY -> COMMIT BASELINE -> DEVELOP V1.2.3`

Before editing, report:
1. current subtitle CSS parameters
2. current title CSS parameters
3. how captions are rendered/updated
4. how the timeline drives scenes
5. where narration-linked emphasis should be implemented
