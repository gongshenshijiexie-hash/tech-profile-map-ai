# EP128 SUBTITLE / TITLE STYLE REFERENCE

Reference source: `EP128_H5_V1_2_UI_MOTION_SYSTEM_REBUILD.html`

Use this file only to align EP138 subtitle readability and emphasis intensity. Do not copy the EP128 scene layout into EP138.

## Subtitle container

```css
#subtitleDeck{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  z-index:70;
  height:184px;
  padding:20px 42px 26px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  background:linear-gradient(180deg,rgba(1,7,12,0),rgba(1,7,12,.82) 22%,rgba(0,4,8,.98) 100%);
  border-top:1px solid rgba(111,225,255,.13);
}
#subMeta{
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:9px;
  font-size:18px;
  font-weight:900;
  letter-spacing:1.5px;
  color:var(--amber);
}
#subtitle{
  font-size:42px;
  line-height:1.22;
  font-weight:920;
  letter-spacing:-.5px;
  text-shadow:0 3px 15px rgba(0,0,0,.94);
}
#subtitle em{
  font-style:normal;
  color:var(--cyan);
}
#subtitle em.warn{color:#ff816d}
#subtitle em.warm{color:var(--amber)}
.subIn{
  animation:subLift .32s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes subLift{
  from{opacity:.15;transform:translateY(14px);filter:blur(3px)}
  to{opacity:1;transform:none;filter:none}
}
#progress{
  position:absolute;
  left:42px;
  right:42px;
  bottom:184px;
  z-index:71;
  height:3px;
}
```

## Title reference

```css
#headline{
  max-width:630px;
  font-size:64px;
  line-height:1.04;
  font-weight:950;
  letter-spacing:-2.4px;
  text-shadow:0 8px 34px rgba(0,0,0,.94);
  white-space:normal;
}
#headline .accent{
  color:var(--cyan);
  text-shadow:0 0 26px rgba(79,214,255,.28),0 7px 28px #000;
}
```

## Key comparison for EP138

Current EP138 subtitle:

- font-size: 18px
- line-height: 1.55
- font-weight: 700
- min-height: 76px
- left/right: 7%
- bottom: 4%
- padding-left: 13px

EP128 reference subtitle:

- font-size: 42px
- line-height: 1.22
- font-weight: 920
- deck height: 184px
- horizontal padding: 42px
- bottom: 0
- keyword color states already exist through `em`

Codex should not blindly copy 42px and the entire deck into EP138. First report the difference, then propose the smallest safe patch that achieves the same phone-reading strength without covering EP138 map content.
