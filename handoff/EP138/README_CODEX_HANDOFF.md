# EP138 CODEX HANDOFF V1

Project: 《科技剖面》EP138 / Spatial AI
Target branch: `ep138-codex-handoff-v1`

## Current status

EP138 V1.2.2 visual composition is accepted and frozen.
The next task is limited to subtitle readability and voice-driven text emphasis.

## Important correction after the first Codex inspection

The first Codex report correctly stopped because it could not find the full standalone HTML files by their original names.

The original standalone EP138 file is about 43 MB because it embeds Earth Studio video, voice, BGM and image layers as Base64. Duplicating that media-heavy standalone into GitHub is unnecessary for the V1.2.3 code patch.

A **complete program-source representation** is now available in the repository through the restore package. It preserves the entire HTML/DOM/CSS/JS program and replaces only the large embedded Base64 media payloads with explicit placeholder tokens.

This source-only master is authoritative for code inspection and PATCH development. The media payloads remain frozen and will be rehydrated into the accepted standalone after the code patch is approved.

## Restore the complete source-only files first

From the repository root run:

```bash
bash handoff/EP138/05_RESTORE/restore_sources.sh
```

The script reconstructs and SHA-256 verifies:

```text
handoff/EP138/01_CURRENT_MASTER/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html
handoff/EP138/02_REFERENCE/EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD_SOURCE_ONLY.html
```

Expected hashes:

```text
EP138 source-only master
sha256 a21766449ab4a065abe4aa2bf72c02752685d62f5021d6f22e1a2ebbcf398040

EP128 source-only reference
sha256 21e54911536c795772812389e1ccb587a9c16012552fcb16e5dc15bf607b0ee4
```

If either hash fails, stop.

## Development baseline

Use this restored file as the V1.2.2 code MASTER:

```text
handoff/EP138/01_CURRENT_MASTER/EP138_H5_V1_2_2_BGM_FIX_SOURCE_ONLY.html
```

It is the full accepted program source with only these payload classes omitted:

- embedded Earth Studio MP4 bytes
- embedded voice WAV bytes
- embedded BGM MP3 bytes
- embedded real-map / segmentation image bytes

The corresponding tags, CSS variables, URLs, timing logic, selectors, scene structures and media synchronization code remain present.

Do **not** redesign media sections because the payload strings are placeholders.

For compatibility/context also read:

```text
handoff/EP138/01_CURRENT_MASTER/EP138_CRITICAL_CODE_EXTRACT.md
handoff/EP138/03_SPEC/EP138_CURRENT_STATE.md
handoff/EP138/04_MANIFEST/MEDIA_MANIFEST.md
```

## EP128 reference

Use the restored source:

```text
handoff/EP138/02_REFERENCE/EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD_SOURCE_ONLY.html
```

and the condensed parameter reference:

```text
handoff/EP138/02_REFERENCE/EP128_SUBTITLE_STYLE_REFERENCE.md
```

EP128 is only a reference for subtitle visual scale, subtitle container capacity and emphasis intensity. Do not copy its scene layout into EP138.

## Specs

Read before editing:

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
- working legacy compatibility names such as `window.EP134_CONFIG`

## Patch boundary

PATCH the source-only HTML. Do not attempt to regenerate, replace or inline new media Base64.

The approved code delta will later be applied back to the original media-complete standalone master.

## Next target

After analysis is approved, create:

```text
EP138_H5_V1_2_3_SUBTITLE_EMPHASIS_FIX_SOURCE_ONLY.html
```

Do not present it as a media-complete standalone. It is the code-patch candidate.

## First Codex action after this correction

1. Run `bash handoff/EP138/05_RESTORE/restore_sources.sh`.
2. Verify both hashes.
3. Inspect the restored EP138 and EP128 files.
4. Repeat the baseline report using the restored files.
5. Do not edit yet.

Report:

1. current EP138 subtitle CSS parameters
2. EP128 reference subtitle CSS parameters
3. subtitle DOM/rendering mechanism
4. voice audio element/variable
5. master timeline mechanism
6. scene switching mechanism
7. seek refresh mechanism
8. proposed voice-time -> emphasis-cue -> DOM-class implementation
9. all real selectors available for title / caption / data / legend / layer / model labels
10. frozen code regions that will remain untouched

Stop after the report and wait for approval.
