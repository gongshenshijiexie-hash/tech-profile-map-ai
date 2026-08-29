import './style.css';

const scenes = [
  { name: 'earth', tag: 'EARTH', title: 'MACHINE EYE', subtitle: '从地球开始理解空间', duration: 5 },
  { name: 'region', tag: 'REGION', title: 'REGION LOCK', subtitle: '从全球尺度进入区域尺度', duration: 5 },
  { name: 'city', tag: 'CITY', title: 'CITY MODEL', subtitle: '城市节点、路径与空间关系', duration: 5 },
  { name: 'ai', tag: 'AI LAYER', title: 'SEMANTIC VIEW', subtitle: '道路 · 建筑 · 水体 · 植被', duration: 5 },
  { name: 'route', tag: 'ROUTE', title: 'DATA FLOW', subtitle: '空间关系开始流动', duration: 5 },
  { name: 'end', tag: 'END', title: 'SPATIAL AI', subtitle: '把现实世界变成可计算世界', duration: 5 }
];

const total = scenes.reduce((sum, s) => sum + s.duration, 0);
const app = document.querySelector('#app');

app.innerHTML = `
  <main class="shell">
    <section id="stage" class="stage scene-earth">
      <div class="space"></div>
      <div class="earth-wrap">
        <div class="earth"></div>
        <div class="orbit orbit-a"></div>
        <div class="orbit orbit-b"></div>
      </div>
      <div class="map-grid"></div>
      <div class="route-line"><span></span></div>
      <div class="node node-a"></div>
      <div class="node node-b"></div>
      <div class="node node-c"></div>
      <div class="ai-mask ai-1"></div>
      <div class="ai-mask ai-2"></div>
      <div class="ai-mask ai-3"></div>

      <header class="hud-top">
        <div class="brand">科技剖面 · MAP ENGINE V1</div>
        <div id="tag" class="tag">EARTH</div>
      </header>

      <div class="location-card">
        <div class="eyebrow">LOCATION / COORDINATE</div>
        <div id="title" class="title">MACHINE EYE</div>
        <div id="subtitle" class="subtitle">从地球开始理解空间</div>
        <div class="coordinate">31.2304°N · 121.4737°E</div>
      </div>

      <div class="scale">SCALE 01 : 12,000,000</div>
      <div class="caption-box"><div class="caption">地图过去记录世界，AI 正在把世界变成可以计算的空间模型。</div></div>
      <div class="attribution-safe">EARTH ATTRIBUTION SAFE AREA</div>
    </section>

    <section class="controls">
      <button id="play">PLAY</button>
      <input id="seek" type="range" min="0" max="${total}" step="0.01" value="0" />
      <span id="time">00:00 / 00:${String(total).padStart(2, '0')}</span>
    </section>
  </main>
`;

const stage = document.querySelector('#stage');
const tag = document.querySelector('#tag');
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const seek = document.querySelector('#seek');
const time = document.querySelector('#time');
const play = document.querySelector('#play');

let playing = false;
let current = 0;
let raf = 0;
let last = 0;

function format(t) {
  const s = Math.max(0, Math.floor(t));
  return `00:${String(s).padStart(2, '0')}`;
}

function sceneAt(t) {
  let acc = 0;
  for (const scene of scenes) {
    if (t < acc + scene.duration) return scene;
    acc += scene.duration;
  }
  return scenes[scenes.length - 1];
}

function render() {
  const scene = sceneAt(current);
  stage.className = `stage scene-${scene.name}`;
  tag.textContent = scene.tag;
  title.textContent = scene.title;
  subtitle.textContent = scene.subtitle;
  seek.value = String(current);
  time.textContent = `${format(current)} / ${format(total)}`;
}

function tick(ts) {
  if (!playing) return;
  if (!last) last = ts;
  current += (ts - last) / 1000;
  last = ts;
  if (current >= total) {
    current = total - 0.01;
    playing = false;
    play.textContent = 'PLAY';
  }
  render();
  if (playing) raf = requestAnimationFrame(tick);
}

play.addEventListener('click', () => {
  playing = !playing;
  play.textContent = playing ? 'PAUSE' : 'PLAY';
  last = 0;
  cancelAnimationFrame(raf);
  if (playing) raf = requestAnimationFrame(tick);
});

seek.addEventListener('input', () => {
  current = Number(seek.value);
  render();
});

render();
