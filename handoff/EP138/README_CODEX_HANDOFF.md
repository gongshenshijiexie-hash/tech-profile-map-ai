# EP138 CODEX HANDOFF V1

Project: 《科技剖面》EP138 / Spatial AI
Target branch: `ep138-codex-handoff-v1`

## Current status

The visual system in EP138 V1.2.2 is accepted and must be treated as frozen.
The next development task is limited to subtitle readability and voice-driven text emphasis.

## Development baseline

Start with:

`handoff/EP138/01_CURRENT_MASTER/EP138_CRITICAL_CODE_EXTRACT.md`

This file records the accepted V1.2.2 scene data, subtitle/title DOM, current CSS, formal-voice master-clock logic, play/seek/scene-jump synchronization, and compatibility notes.

The original standalone master is:

`EP138_H5_V1_2_2_BGM_FIX.html`

Large embedded Base64 media payloads are intentionally not duplicated into GitHub. Do not interpret this as permission to redesign or replace media.

A partial source snapshot also exists under `handoff/EP138/01_CURRENT_MASTER/parts/` for additional context, but the critical-code extract is the authoritative handoff reference for this V1.2.3 task.

## EP128 reference

Use:

`handoff/EP138/02_REFERENCE/EP128_SUBTITLE_STYLE_REFERENCE.md`

It contains the exact EP128 subtitle-deck, subtitle, title and keyword-style values needed for comparison.

EP128 is only a reference for subtitle visual scale, subtitle container capacity and emphasis intensity. Do not copy its scene layout into EP138.

## Specs

Read both before editing:

- `handoff/EP138/03_SPEC/EP138_CURRENT_STATE.md`
- `handoff/EP138/03_SPEC/EP138_V1_2_3_TASK.md`

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
