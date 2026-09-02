const $ = (id) => document.getElementById(id);
const voice = $('voice');
const videos = ['es01', 'es02', 'es03', 'es04'].map($);
const ui = {subtitle:$('subtitle'), clock:$('clock'), number:$('scene-number'), title:$('scene-title'), scan:$('scan'), reticle:$('reticle'), road:$('compare-road'), building:$('compare-building'), roadState:$('road-state'), buildingState:$('building-state'), magnifier:$('magnifier'), hypothesis:$('hypothesis'), evidence:$('evidence'), confidence:$('confidence'), svg:$('vision-svg'), legend:$('model-legend'), locator:$('locator'), hook:$('next-hook'), start:$('start-overlay')};

const subtitles = [
[0,3.919,'上一集，AI把上海变成了一个可以计算的空间。'],[3.969,7.301,'现在，一张陆家嘴的航拍图摆在它面前。'],[7.351,14.601,'整座城市看起来很清楚，但对AI来说，一开始并没有“道路”“楼房”这些概念。'],[14.651,21.815,'它看到的，只是深浅不同的颜色、连续变化的纹理，还有一块块挤在一起的形状。'],[21.865,23.946,'接下来，它开始观察。'],[23.996,27.159,'这块灰色区域为什么一直向前延伸？上面为什么有细长的白线？'],[27.209,31.494,'为什么很多小车都沿着这里移动？'],[31.544,39.243,'而旁边另一块同样是灰色的地方，为什么边缘更整齐，形状更固定，也不会一直向远处延伸？'],[39.293,45.361,'看得多了，AI开始发现：有些地方虽然颜色很像，作用却完全不同。'],[45.411,49.3,'一条路通常会继续延伸，还会和别的路连接。'],[49.35,54.177,'一栋楼往往占据一整块固定的位置。树木的边缘更零碎。'],[54.227,59.389,'水面也是大片区域，但它的纹理、反光和周围环境又完全不同。'],[59.439,64.277,'于是，一张普通的上海航拍图，在AI眼里开始慢慢被拆开。'],[64.327,67.989,'这里是路。那里是楼。这一片是水。旁边是树。'],[68.039,71.471,'路上那些正在移动的小东西，是车。'],[71.521,77.673,'但AI做的还不只是把它们一个个认出来。它还会继续判断它们之间的关系。'],[77.723,81.211,'这条路通向哪里？哪栋楼挨着哪条路？'],[81.261,86.481,'车辆现在在哪条路上？哪些地方可以通过，哪些地方不能通过？'],[86.531,90.866,'原来混在一起的一张图片，开始变成一个有结构的空间。'],[90.916,96.952,'比如陆家嘴一个十字路口。人一眼就知道，中间那块灰色的是马路。'],[97.002,102.912,'但AI不会只因为它是灰色，就马上下结论。因为楼顶也可能是灰色。'],[102.962,108.697,'它还要继续看：这块区域是不是一直向前延伸？是不是和另一条路连在一起？'],[108.747,116.572,'有没有车辆沿着固定方向从这里经过？旁边是不是出现了清晰的建筑边界？'],[116.622,118.405,'这些线索如果都对得上，AI才会越来越确定：'],[118.455,124.389,'这里不是一块普通的灰色区域。这里是一条路。'],[124.439,131.01,'旁边那一块则不一样。它有稳定的轮廓，占据固定位置，不会随着道路继续延伸。'],[131.06,133.377,'AI于是判断：这是一栋建筑。'],[133.427,137.496,'就这样，它一边观察，一边比较，也一边修正自己的判断。'],[137.546,143.911,'最后，我们眼里那张普通的上海航拍图，在AI眼里已经变成了另一种东西。'],[143.961,145.798,'它不再只是“看见上海”。'],[145.848,154.553,'它开始知道：哪里能走，哪里是障碍，哪里是水，什么东西正在移动，哪些位置彼此相连。'],[154.603,158.613,'到了这一步，AI才真正开始理解这个空间里的“意义”。'],[158.663,162.998,'上一集，我们让AI拥有了一张可以计算的上海地图。'],[163.048,166.357,'这一集，它开始真正看懂这张地图。'],[166.407,169.226,'而下一步，还有一个更现实的问题：'],[169.276,175.16,'既然它已经知道哪里是路、哪里是房子，它怎么知道自己此刻到底在哪里？']
];
const scenes = [[0,14.65,'上海进入 AI 视野'],[14.65,31.54,'观察颜色、纹理与形状'],[31.54,45.41,'两个灰色区域'],[45.41,59.44,'寻找可重复的规律'],[59.44,71.52,'重新整理上海'],[71.52,90.92,'建立对象之间的关系'],[90.92,108.75,'灰色，不等于道路'],[108.75,133.43,'逐条验证，修正判断'],[133.43,158.66,'形成结构化空间'],[158.66,175.31,'理解地图，然后定位自己']];
const evidenceSets = [
['颜色深浅','连续纹理','形状边缘'],['延伸方向','白色车道线','车辆运动轨迹'],['外观相似','延伸 vs 固定','运动只发生在 A'],['道路持续延伸','道路彼此连接','建筑边界固定','树木边缘碎片','水面纹理 / 反光'],['ROAD','BUILDING','WATER','TREE','MOVING CAR'],['ROAD → ROAD','BUILDING ↔ ROAD','CAR ∈ ROAD','可通行 / 障碍'],['灰色 = ROAD','颜色证据不足','暂不分类'],['是否向前延伸 ✓','是否连接道路 ✓','白色车道线 ✓','车辆定向运动 ✓','固定建筑边界 ✓'],['可通行区域','固定障碍','水体边界','移动对象','空间连接']
];
const svg = {
  observe:`<path class="trace" d="M210 790 C285 705 310 535 376 360"/><path class="trace" d="M190 805 C270 730 335 700 560 718"/><circle class="motion" cx="318" cy="604" r="5"><animate attributeName="cy" values="690;420;690" dur="3s" repeatCount="indefinite"/></circle>`,
  compare:`<path class="boundary" d="M210 810 L270 400 L420 330 L400 790 Z"/><path class="boundary" d="M430 260 L625 220 L650 500 L438 535 Z"/><path class="trace" d="M270 800 C310 640 330 515 386 355"/>`,
  relation:`<path class="trace" d="M105 690 L350 610 L635 680"/><path class="trace" d="M350 610 L400 350"/><path class="blocked" d="M465 335 L610 300 L630 490 L480 525 Z"/><circle class="node" cx="350" cy="610" r="7"/><circle class="node" cx="105" cy="690" r="7"/><circle class="node" cx="635" cy="680" r="7"/><circle class="motion" r="6"><animateMotion dur="3s" repeatCount="indefinite" path="M120 686 L350 610 L610 675"/></circle>`,
  model:`<path class="boundary" d="M75 810 L245 560 L365 610 L520 370 L650 430 L515 715 L260 760 Z"/><path class="trace" d="M60 835 L248 575 L360 620 L520 390 L665 430"/><path class="trace" d="M160 480 L360 620 L585 780"/><path class="blocked" d="M92 325 L230 292 L270 485 L130 510 Z"/><path class="blocked" d="M470 690 L626 645 L658 820 L500 850 Z"/><circle class="node" cx="360" cy="620" r="8"/><circle class="motion" r="6"><animateMotion dur="4s" repeatCount="indefinite" path="M80 815 L250 575 L360 620 L520 390"/></circle>`
};

let activeVideo = -1, lastScene = -1, lastSubtitle = -1, lastSecond = -1;
function setClass(node, on){node.classList.toggle('on', on)}
function renderEvidence(items, rejectedFirst=false){ui.evidence.innerHTML=items.map((x,i)=>`<div class="evidence-item ${rejectedFirst&&i===0?'reject':'done'}" style="animation-delay:${i*.07}s">${x}</div>`).join('')}
function renderLegend(){ui.legend.innerHTML=[['可通行','PASSABLE'],['障碍','OBSTACLE'],['水体','WATER'],['移动中','MOVING'],['已连接','CONNECTED']].map(x=>`<div class="legend-row">${x[0]}<b>${x[1]}</b></div>`).join('')}
function updateScene(t){
  const found=scenes.findIndex(s=>t>=s[0]&&t<s[1]); const index=found<0?scenes.length-1:found; if(index===lastScene)return; lastScene=index;
  ui.number.textContent=`SCENE ${String(index+1).padStart(2,'0')} / 10`; ui.title.textContent=scenes[index][2];
  setClass(ui.scan,index>=1&&index<=4); setClass(ui.reticle,index===1); setClass(ui.magnifier,index===1);
  setClass(ui.road,index>=2&&index<=8); setClass(ui.building,index>=2&&index<=8); setClass(ui.hypothesis,index===6);
  setClass(ui.confidence,index===7); setClass(ui.legend,index===8); setClass(ui.locator,index===9); setClass(ui.hook,index===9);
  ui.road.classList.toggle('confirmed',index===7||index===8); ui.building.classList.toggle('confirmed',index===7||index===8);
  ui.roadState.textContent=index>=7?'ROAD ✓':'ROAD ?'; ui.buildingState.textContent=index>=7?'BUILDING ✓':'BUILDING ?';
  ui.evidence.style.top=index===7?'14%':index===8?'16%':'15%';
  renderEvidence(index===0?[]:evidenceSets[Math.min(index-1,evidenceSets.length-1)],index===6);
  ui.svg.innerHTML=index===1?svg.observe:index===2||index===3||index===4||index===6||index===7?svg.compare:index===5?svg.relation:index===8?svg.model:'';
}
function updateDynamic(t){
  if(lastScene===7){const marks=[108.75,112,116,118.455,124.439,131.06];const n=marks.filter(x=>t>=x).length;const pct=[24,38,53,67,88,96][Math.max(0,n-1)];ui.confidence.querySelector('i').style.width=`${pct}%`;ui.confidence.querySelector('b').textContent=`${pct}%`;}
  const second=Math.floor(t);if(second!==lastSecond){lastSecond=second;ui.clock.textContent=new Date(t*1000).toISOString().slice(14,22).replace('.',':');}
}
function updateSubtitle(t){const i=subtitles.findIndex(s=>t>=s[0]&&t<s[1]);if(i!==lastSubtitle){lastSubtitle=i;ui.subtitle.textContent=i<0?'':subtitles[i][2];ui.subtitle.style.visibility=i<0?'hidden':'visible'}}
function videoPlan(t){if(t<14.65)return [0,t/14.65];if(t<31.54)return [1,(t-14.65)/(31.54-14.65)];if(t<158.66)return [2,Math.min((t-31.54)/12,1)];return [3,(t-158.66)/(175.31-158.66)]}
function syncVideo(t,force=false){
  const [index,p]=videoPlan(t);if(index!==activeVideo){activeVideo=index;videos.forEach((v,i)=>{v.classList.toggle('active',i===index);if(i!==index)v.pause()})}
  const v=videos[index];if(!Number.isFinite(v.duration))return;const target=Math.min(Math.max(p*v.duration,0),Math.max(v.duration-.05,0));
  const isHold=index===2&&p>=1;if(force||Math.abs(v.currentTime-target)>.45)v.currentTime=target;
  if(!voice.paused&&!isHold)v.play().catch(()=>{});else if(isHold)v.pause();
}
function frame(){const t=voice.currentTime;updateSubtitle(t);updateScene(t);updateDynamic(t);syncVideo(t);requestAnimationFrame(frame)}
function start(){ui.start.classList.add('hidden');voice.play().catch(()=>{});syncVideo(voice.currentTime,true)}
ui.start.addEventListener('click',start);ui.start.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();start()}});
voice.addEventListener('pause',()=>videos.forEach(v=>v.pause()));voice.addEventListener('seeked',()=>syncVideo(voice.currentTime,true));voice.addEventListener('ended',()=>videos.forEach(v=>v.pause()));
window.addEventListener('keydown',e=>{if(e.code==='Space'&&ui.start.classList.contains('hidden')){e.preventDefault();voice.paused?start():voice.pause()}if(e.key==='ArrowRight'){voice.currentTime=Math.min(voice.duration||175.31,voice.currentTime+5)}if(e.key==='ArrowLeft'){voice.currentTime=Math.max(0,voice.currentTime-5)}});
renderLegend();requestAnimationFrame(frame);
