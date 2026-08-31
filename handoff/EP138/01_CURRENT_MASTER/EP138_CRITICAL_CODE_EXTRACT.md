# EP138 V1.2.2 CRITICAL CODE EXTRACT

This is an exact handoff extract from the accepted `EP138_H5_V1_2_2_BGM_FIX.html` source, with large embedded media payloads omitted. Use it to inspect the subtitle/timeline implementation before editing.

## Current scene/timeline data

```js
const scenes = [
  {id:"S01",start:0,end:6.05,kicker:"CHAPTER 04",title:"空间智能",titleEn:"SPATIAL AI",caption:"当 AI 开始理解真实世界，它首先需要回答一个问题。",mode:"earth"},
  {id:"S02",start:6.05,end:14.116,kicker:"EARTH",title:"从地球，进入区域",titleEn:"EAST ASIA / REGION",caption:"它看到的卫星影像，如何一步步变成可以被机器理解的信息？",mode:"earth"},
  {id:"S03",start:14.116,end:25.585,kicker:"TARGET AREA",title:"AI 如何把真实世界",titleEn:"INTO A COMPUTABLE SPATIAL MODEL",caption:"AI 如何把真实世界，变成可计算的空间模型？",mode:"map"},
  {id:"S04",start:26.038,end:31.767,kicker:"EP138 / TITLE",title:"卫星拍下来的，\n为什么不是一张普通照片？",titleEn:"SATELLITE IMAGE ≠ PHOTO",caption:"这一集，我们从一张卫星影像开始，拆开机器理解空间的过程。",mode:"map"},
  {id:"S05",start:32.201,end:40.934,kicker:"EARTH STUDIO / SHANGHAI",title:"上海 · 城市区域",titleEn:"EARTH OBSERVATION",caption:"卫星从高空记录城市，但影像本身，还不是机器能够直接理解的空间。",mode:"earth"},
  {id:"S06",start:41.418,end:57.56,kicker:"SATELLITE DATA",title:"一张影像，多种数据",titleEn:"VISIBLE / RGB · MULTISPECTRAL · RADAR · POSITION · ELEVATION · TIME",caption:"可见光、多光谱、雷达、位置、高程和时间，共同构成机器读取空间的原始数据。",mode:"map"},
  {id:"S07",start:58.032,end:69.772,kicker:"PIXEL + SEMANTIC",title:"像素，开始拥有语义",titleEn:"AI SCAN · ROAD · BUILDING · WATER · VEGETATION",caption:"卫星影像被切成像素网格，AI 扫描每一个区域，识别道路、建筑、水体和植被。",mode:"semantic"},
  {id:"S08",start:70.189,end:84.609,kicker:"LAYER STACK / 04",title:"识别结果，被分成图层",titleEn:"ROAD · BUILDING · WATER · VEGETATION",caption:"道路层、建筑层、水体层和植被层被分别提取，再按照空间位置重新叠加。",mode:"stack"},
  {id:"S09",start:85.021,end:93.005,kicker:"MODEL SCENE",title:"真实世界，变成结构化空间",titleEn:"REAL WORLD → STRUCTURED SPACE → MACHINE-READABLE MODEL",caption:"真实世界经过识别和分层，最终形成机器可读取、可计算的空间模型。",mode:"model"},
  {id:"S10",start:93.468,end:99.48,kicker:"NEXT / EP139",title:"AI 到底怎么知道，",titleEn:"哪里是路，哪里是房子？",caption:"下一集，我们继续往下拆：\nAI 到底怎么知道，哪里是路，哪里是房子？",mode:"next"}
];
const total = 99.48;
```

## Current subtitle / title DOM

```html
<div class="copy">
  <p id="kicker"></p>
  <h1 id="title"></h1>
  <h2 id="titleEn"></h2>
</div>
<footer>
  <div class="caption" id="caption"></div>
  <div class="progress"><i id="progress"></i></div>
  <span id="timecode"></span>
</footer>
<audio id="voice" ...></audio>
<audio id="bgm" ... loop></audio>
```

## Current CSS values

```css
.copy{
  position:absolute;
  z-index:50;
  left:7%;
  right:10%;
  top:20%;
  transition:top .6s,opacity .5s;
}
.copy p{
  font:700 12px Space Mono;
  letter-spacing:.18em;
  color:var(--cyan);
  margin:0 0 11px;
}
.copy h1{
  white-space:pre-line;
  font-size:36px;
  line-height:1.16;
  letter-spacing:-.055em;
  margin:0;
  font-weight:900;
  max-width:94%;
  text-wrap:balance;
}
.copy h2{
  font:700 13px Space Mono;
  line-height:1.5;
  letter-spacing:.1em;
  margin:12px 0;
  color:#b7d1cf;
  max-width:92%;
}
footer{
  position:absolute;
  z-index:60;
  left:7%;
  right:7%;
  bottom:4%;
  padding-top:10px;
  background:linear-gradient(transparent,#061012 18%);
}
.caption{
  min-height:76px;
  white-space:pre-line;
  border-left:3px solid var(--cyan);
  padding-left:13px;
  font-size:18px;
  line-height:1.55;
  font-weight:700;
  text-shadow:0 2px 10px #000;
}
```

## Current master-time rendering mechanism

The accepted build uses the formal voice `currentTime` as the preferred master clock while playing.

```js
const voice = document.querySelector("#voice");
const bgm = document.querySelector("#bgm");
let t = Math.max(0, Math.min(total, Number(params.get("t") || 0)));
let playing = false;

function renderState(){
  const {scene,index}=sceneAt(t);
  stage.className=`stage mode-${scene.mode} scene-${scene.id.toLowerCase()} ${t<=40.934?"earth-footage-active":"earth-footage-ended"}`;
  stage.dataset.phase=String(scenePhase(scene));
  document.querySelector("#sceneId").textContent=scene.id;
  document.querySelector("#kicker").textContent=scene.kicker;
  document.querySelector("#title").textContent=scene.title;
  document.querySelector("#titleEn").textContent=dynamicLabel(scene);
  document.querySelector("#dataLabel").textContent=dynamicLabel(scene);
  document.querySelector("#caption").textContent=scene.caption;
  document.querySelector("#timecode").textContent=formatTime(t,true);
  document.querySelector("#progress").style.width=`${t/total*100}%`;
  seek.value=String(t);
  stage.style.setProperty("--scene-progress",String(Math.max(0,Math.min(1,(t-scene.start)/(scene.end-scene.start)))));
  syncEarthVideo();
  syncBgm();
}

function tick(ts){
  if(playing){
    if(!lastTs) lastTs=ts;
    t = voice && Number.isFinite(voice.currentTime)
      ? voice.currentTime
      : t + (ts-lastTs)/1000;
    lastTs=ts;
    if(t>=total){ t=total-.001; setPlaying(false); }
    renderState();
    if(playing) raf=requestAnimationFrame(tick);
  }
}
```

## Current play / seek / scene-jump synchronization

```js
function setPlaying(next=!playing){
  playing=next;
  playButton.textContent=next?"Ⅱ":"▶";
  lastTs=0;
  if(voice){
    voice.currentTime=t;
    next ? voice.play().catch(()=>{}) : voice.pause();
  }
  if(bgm){
    bgm.currentTime=t;
    next ? bgm.play().catch(()=>{}) : bgm.pause();
  }
  cancelAnimationFrame(raf);
  if(next) raf=requestAnimationFrame(tick);
}

seek.addEventListener("input",()=>{
  t=Number(seek.value);
  if(voice) voice.currentTime=t;
  if(bgm) bgm.currentTime=t;
  renderState();
});

document.querySelectorAll("[data-scene]").forEach(button=>button.addEventListener("click",()=>{
  t=scenes[Number(button.dataset.scene)].start;
  if(voice) voice.currentTime=t;
  if(bgm) bgm.currentTime=t;
  renderState();
}));
```

## Important compatibility note

The accepted standalone still contains internal compatibility references named `window.EP134_CONFIG`. Do not rename them in V1.2.3 if they are functioning; this handoff task is a patch, not a refactor.
