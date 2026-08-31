# EP138 CODEX HANDOFF V1

Project: 《科技剖面》EP138 / Spatial AI
Target branch: `ep138-codex-handoff-v1`

## Current status

The visual system in EP138 V1.2.2 is accepted and must be treated as frozen.
The next development task is limited to subtitle readability and voice-driven text emphasis.

## Development baseline

Use only the EP138 source snapshot under:

`handoff/EP138/01_CURRENT_MASTER/parts/`

Reconstruct with the parts in lexical order if a single inspection file is needed.

The original standalone master is:

`EP138_H5_V1_2_2_BGM_FIX.html`

The GitHub source snapshot preserves the DOM/CSS/JS structure but replaces large embedded Base64 media payloads with explicit placeholder tokens so Codex can inspect and patch the program safely in GitHub.
Do not treat those placeholder tokens as missing design decisions and do not redesign media sections because of them.

## Reference

Use the EP128 reference snapshot under:

`handoff/EP138/02_REFERENCE/parts/`

EP128 is only a reference for subtitle visual scale, subtitle container capacity, and emphasis intensity. Do not copy its scene layout into EP138.

## Frozen items

Do not modify:

- Earth Studio video logic
- Shanghai real-map continuity
- S06-S09 map continuity
- segmentation overlays and semantic layers
- map crop and position
- S01-S10 scene boundaries
- voice master timing
- BGM timing/entry logic
- EP138 / EP139 numbering
- accepted composition and visual assets

## Next target

Create only after analysis is approved:

`EP138_H5_V1_2_3_SUBTITLE_EMPHASIS_FIX.html`

Read `handoff/EP138/03_SPEC/EP138_V1_2_3_TASK.md` before editing.

## First Codex action

Do not edit immediately. First report:

1. current EP138 subtitle CSS parameters
2. EP128 reference subtitle CSS parameters
3. subtitle DOM/rendering mechanism
4. voice audio element/variable
5. master timeline mechanism
6. scene switching mechanism
7. seek refresh mechanism
8. proposed voice-time -> emphasis-cue -> DOM-class implementation
9. frozen code regions that will remain untouched

Stop after the report and wait for approval.
