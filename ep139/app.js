const $ = (id) => document.getElementById(id);
const voice = $('voice');
const videos = {es01:$('es01'), es02:$('es02'), es03a:$('es03a'), es03b:$('es03b'), es04:$('es04')};
const ui = {subtitle:$('subtitle'),clock:$('clock'),number:$('scene-number'),title:$('scene-title'),scan:$('scan'),reticle:$('reticle'),road:$('compare-road'),building:$('compare-building'),roadState:$('road-state'),buildingState:$('building-state'),magnifier:$('magnifier'),hypothesis:$('hypothesis'),evidence:$('evidence'),confidence:$('confidence'),svg:$('vision-svg'),legend:$('model-legend'),locator:$('locator'),hook:$('next-hook'),start:$('start-overlay'),flash:$('anchor-flash')};
const subtitles = [
[0,3.919,'上一集，AI把上海变成了一个可以计算的空间。'],[3.969,7.301,'现在，一张陆家嘴的航拍图摆在它面前。'],[7.351,14.601,'整座城市看起来很清楚，但对AI来说，一开始并没有“道路”“楼房”这些概念。'],[14.651,21.815,'它看到的，只是深浅不同的颜色、连续变化的纹理，还有一块块挤在一起的形状。'],[21.865,23.946,'接下来，它开始观察。'],[23.996,27.159,'这块灰色区域为什么一直向前延伸？上面为什么有细长的白线？'],[27.209,31.494,'为什么很多小车都沿着这里移动？'],[31.544,39.243,'而旁边另一块同样是灰色的地方，为什么边缘更整齐，形状更固定，也不会一直向远处延伸？'],[39.293,45.361,'看得多了，AI开始发现：有些地方虽然颜色很像，作用却完全不同。'],[45.411,49.3,'一条路通常会继续延伸，还会和别的路连接。'],[49.35,54.177,'一栋楼往往占据一整块固定的位置。树木的边缘更零碎。'],[54.227,59.389,'水面也是大片区域，但它的纹理、反光和周围环境又完全不同。'],[59.439,64.277,'于是，一张普通的上海航拍图，在AI眼里开始慢慢被拆开。'],[64.327,67.989,'这里是路。那里是楼。这一片是水。旁边是树。'],[68.039,71.471,'路上那些正在移动的小东西，是车。'],[71.521,77.673,'但AI做的还不只是把它们一个个认出来。它还会继续判断它们之间的关系。'],[77.723,81.211,'这条路通向哪里？哪栋楼挨着哪条路？'],[81.261,86.481,'车辆现在在哪条路上？哪些地方可以通过，哪些地方不能通过？'],[86.531,90.866,'原来混在一起的一张图片，开始变成一个有结构的空间。'],[90.916,96.952,'比如陆家嘴一个十字路口。人一眼就知道，中间那块灰色的是马路。'],[97.002,102.912,'但AI不会只因为它是灰色，就马上下结论。因为楼顶也可能是灰色。'],[102.962,108.697,'它还要继续看：这块区域是不是一直向前延伸？是不是和另一条路连在一起？'],[108.747,116.572,'有没有车辆沿着固定方向从这里经过？旁边是不是出现了清晰的建筑边界？'],[116.622,118.405,'这些线索如果都对得上，AI才会越来越确定：'],[118.455,124.389,'这里不是一块普通的灰色区域。这里是一条路。'],[124.439,131.01,'旁边那一块则不一样。它有稳定的轮廓，占据固定位置，不会随着道路继续延伸。'],[131.06,133.377,'AI于是判断：这是一栋建筑。'],[133.427,137.496,'就这样，它一边观察，一边比较，也一边修正自己的判断。'],[137.546,143.911,'最后，我们眼里那张普通的上海航拍图，在AI眼里已经变成了另一种东西。'],[143.961,145.798,'它不再只是“看见上海”。'],[145.848,154.553,'它开始知道：哪里能走，哪里是障碍，哪里是水，什么东西正在移动，哪些位置彼此相连。'],[154.603,158.613,'到了这一步，AI才真正开始理解这个空间里的“意义”。'],[158.663,162.998,'上一集，我们让AI拥有了一张可以计算的上海地图。'],[163.048,166.357,'这一集，它开始真正看懂这张地图。'],[166.407,169.226,'而下一步，还有一个更现实的问题：'],[169.276,175.16,'既然它已经知道哪里是路、哪里是房子，它怎么知道自己此刻到底在哪里？']
];

const scenes=[[0,14.65,'上海进入 AI 视野'],[14.65,31.54,'锁定陆家嘴观察区'],[31.54,45.41,'比较两个灰色区域'],[45.41,59.44,'沿道路寻找连续性'],[59.44,71.52,'逐层拆解真实上海'],[71.52,90.92,'理解对象之间的关系'],[90.92,108.75,'同色，不等于同类'],[108.75,133.43,'逐条验证，修正判断'],[133.43,158.66,'重组为结构化空间'],[158.66,175.31,'从理解空间到定位自己']];
/* Coordinates are calibrated in the 720×1280 ES03 frame after each camera transform. */
const observationScenes={
  2:{anchor:.10,camera:[1.08,-12,8],road:[216,424,190,330,5],building:[430,270,188,205,-3],evidence:[38,190],focus:[324,545],path:'M235 790 C268 675 292 535 350 360',kind:'compare'},
  3:{anchor:.32,camera:[1.16,-26,-18],road:[185,390,230,375,7],building:[445,250,174,200,-2],evidence:[38,184],focus:[305,520],path:'M205 805 C252 672 278 510 374 322 M310 520 C410 555 505 610 635 655',kind:'continuity'},
  4:{anchor:.52,camera:[1.06,8,4],road:[205,420,205,350,5],building:[445,270,176,205,-3],evidence:[38,178],focus:[360,540],path:'M220 810 C270 675 305 510 370 350',kind:'classify'},
  5:{anchor:.68,camera:[1.14,18,-26],road:[170,415,235,370,7],building:[450,252,175,210,-2],evidence:[38,180],focus:[350,610],path:'M80 760 L350 610 L645 690 M350 610 L410 335',kind:'relation'},
  6:{anchor:.18,camera:[1.22,-38,-34],road:[188,406,230,370,6],building:[444,245,184,215,-3],evidence:[38,185],focus:[335,525],path:'M210 810 C255 670 292 505 370 330',kind:'conflict'},
  7:{anchor:.38,camera:[1.25,-48,-42],road:[175,392,245,390,7],building:[448,238,184,220,-2],evidence:[38,175],focus:[330,520],path:'M195 820 C245 675 275 500 374 315 M290 540 C410 568 520 622 665 690',kind:'verify'},
  8:{anchor:.82,camera:[1.04,4,5],road:[205,430,205,345,5],building:[447,280,175,195,-3],evidence:[38,190],focus:[360,600],path:'M55 820 L245 575 L360 620 L525 390 L680 435 M150 470 L360 620 L610 790',kind:'model'}
};
const evidenceTimeline={
  2:[[31.54,'GRAY A / ROAD ?'],[35.2,'GRAY B / BUILDING ?'],[39.293,'外观相似 · 作用未知']],
  3:[[45.411,'ROAD CONTINUITY'],[49.35,'CONNECTED'],[54.227,'REFLECTION / TEXTURE']],
  4:[[59.439,'寻找对象…'],[64.327,'ROAD'],[65.05,'BUILDING'],[65.8,'TREE'],[66.55,'WATER'],[68.039,'MOVING CAR']],
  5:[[71.521,'从识别进入关系'],[77.723,'ROAD → ROAD'],[79.2,'BUILDING = OBSTACLE'],[81.261,'CAR ∈ ROAD'],[83.4,'ROAD = PASSABLE'],[86.531,'CONNECTED SPACE']],
  6:[[90.916,'ROAD ?'],[97.002,'COLOR MATCH'],[99.2,'同色 = 同类？'],[102.1,'REJECTED']],
  7:[[108.75,'EXTENSION ✓'],[112,'CONNECTED ✓'],[116,'LANE MARK ✓'],[118.455,'VEHICLE MOTION ✓'],[124.439,'FIXED BOUNDARY ✓'],[131.06,'BUILDING ✓']],
  8:[[133.43,'撤去临时观察框'],[137.546,'PASSABLE NETWORK'],[143.961,'OBSTACLE BOUNDARY'],[145.848,'WATER / MOVING OBJECT'],[151.2,'SPATIAL CONNECTIONS']]
};
const confidenceSteps=[[108.75,24],[112,38],[116,53],[118.455,67],[124.439,88],[131.06,96]];
let sceneIndex=-1,subtitleIndex=-1,activePlate='es01',anchorScene=-1,lastClock=-1;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function setOn(el,on){el.classList.toggle('on',on)}
function sceneAt(t){const i=scenes.findIndex(s=>t>=s[0]&&t<s[1]);return i<0?9:i}
function renderEvidence(index,t){const rows=(evidenceTimeline[index]||[]).filter(x=>t>=x[0]);ui.evidence.innerHTML=rows.map((x,i)=>`<div class="evidence-item ${x[1]==='REJECTED'?'reject':'done'}" style="animation-delay:${i*.06}s">${x[1]}</div>`).join('')}
function applyObservation(index){
  const c=observationScenes[index];if(!c)return;
  document.documentElement.style.setProperty('--cam-scale',c.camera[0]);document.documentElement.style.setProperty('--cam-x',`${c.camera[1]}px`);document.documentElement.style.setProperty('--cam-y',`${c.camera[2]}px`);
  [[ui.road,c.road],[ui.building,c.building]].forEach(([el,r])=>{el.style.cssText=`left:${r[0]/7.2}%;top:${r[1]/12.8}%;width:${r[2]/7.2}%;height:${r[3]/12.8}%;transform:rotate(${r[4]}deg)`});
  ui.evidence.style.left=`${c.evidence[0]/7.2}%`;ui.evidence.style.top=`${c.evidence[1]/12.8}%`;ui.reticle.style.left=`${(c.focus[0]-53)/7.2}%`;ui.reticle.style.top=`${(c.focus[1]-53)/12.8}%`;
  ui.svg.innerHTML=buildSvg(c,index);crossfadeAnchor(c.anchor,index);
}
function buildSvg(c,index){
  const base=`<path class="trace draw" d="${c.path}"/>`;
  if(index===2||index===6||index===7)return `${base}<path class="boundary draw" d="M445 270 L618 238 L640 460 L458 485 Z"/><circle class="motion"><animateMotion dur="3.8s" repeatCount="indefinite" path="M220 800 C260 650 295 490 370 330"/></circle>`;
  if(index===5)return `${base}<path class="blocked draw" d="M450 250 L620 225 L642 476 L465 502 Z"/><circle class="node" cx="350" cy="610" r="7"/><circle class="motion"><animateMotion dur="3.4s" repeatCount="indefinite" path="M95 752 L350 610 L625 683"/></circle>`;
  if(index===8)return `${base}<path class="blocked draw" d="M92 325 L230 292 L270 485 L130 510 Z"/><path class="boundary water draw" d="M510 720 C580 680 645 700 700 750 L700 900 L515 870 Z"/><circle class="node" cx="360" cy="620" r="8"/>`;
  return base;
}
function crossfadeAnchor(progress,index){
  const incoming=index%2?'es03b':'es03a',outgoing=incoming==='es03a'?'es03b':'es03a',v=videos[incoming];
  activePlate=incoming;Object.entries(videos).forEach(([k,node])=>node.classList.toggle('active',k===incoming));
  videos[outgoing].classList.remove('active');if(Number.isFinite(v.duration))v.currentTime=clamp(progress*v.duration,0,v.duration-.08);v.pause();ui.flash.classList.remove('pulse');void ui.flash.offsetWidth;ui.flash.classList.add('pulse');
}
function enterScene(index){
  sceneIndex=index;ui.number.textContent=`SCENE ${String(index+1).padStart(2,'0')} / 10`;ui.title.textContent=scenes[index][2];
  const observing=index>=2&&index<=8;setOn(ui.scan,index>=1&&index<=8);setOn(ui.reticle,index>=1&&index<=7);setOn(ui.magnifier,index===1||index===3||index===7);setOn(ui.road,observing&&index!==8);setOn(ui.building,observing&&index!==8);setOn(ui.hypothesis,index===6);setOn(ui.confidence,index===7);setOn(ui.legend,index===8);setOn(ui.locator,index===9);setOn(ui.hook,index===9);
  ui.road.classList.toggle('confirmed',index===7);ui.building.classList.toggle('confirmed',index===7);ui.roadState.textContent=index===7?'ROAD ✓':'ROAD ?';ui.buildingState.textContent=index===7?'BUILDING ✓':'BUILDING ?';
  if(observing)applyObservation(index);else{ui.svg.innerHTML='';document.documentElement.style.setProperty('--cam-scale',1);document.documentElement.style.setProperty('--cam-x','0px');document.documentElement.style.setProperty('--cam-y','0px')}
  if(index===9){Object.values(videos).forEach(v=>v.classList.remove('active'));videos.es04.classList.add('active');activePlate='es04'}
}
function updateCameraMotion(t){
  if(sceneIndex<2||sceneIndex>8)return;const c=observationScenes[sceneIndex],s=scenes[sceneIndex],p=clamp((t-s[0])/(s[1]-s[0]),0,1);const breathe=Math.sin(p*Math.PI*2)*2;
  document.documentElement.style.setProperty('--live-scale',1+p*.025);document.documentElement.style.setProperty('--live-x',`${breathe+p*4}px`);document.documentElement.style.setProperty('--live-y',`${-p*5}px`);
  ui.reticle.style.translate=`${Math.sin(p*7)*5}px ${Math.cos(p*5)*4}px`;ui.magnifier.style.translate=`${p*18}px ${Math.sin(p*5)*7}px`;
}
function syncPrimaryVideo(t,force=false){
  if(sceneIndex>=2&&sceneIndex<=8)return;
  let key,start,end;if(sceneIndex===0){key='es01';start=0;end=14.65}else if(sceneIndex===1){key='es02';start=14.65;end=31.54}else{key='es04';start=158.66;end=175.31}
  const v=videos[key],p=clamp((t-start)/(end-start),0,1);if(activePlate!==key){Object.values(videos).forEach(x=>x.classList.remove('active'));v.classList.add('active');activePlate=key}
  if(Number.isFinite(v.duration)){const target=p*Math.max(0,v.duration-.08);if(force||Math.abs(v.currentTime-target)>.45)v.currentTime=target;if(!voice.paused)v.play().catch(()=>{})}
}
function update(t){const next=sceneAt(t);if(next!==sceneIndex)enterScene(next);renderEvidence(next,t);updateCameraMotion(t);syncPrimaryVideo(t);const si=subtitles.findIndex(s=>t>=s[0]&&t<s[1]);if(si!==subtitleIndex){subtitleIndex=si;ui.subtitle.textContent=si<0?'':subtitles[si][2];ui.subtitle.style.visibility=si<0?'hidden':'visible'}
  if(sceneIndex===7){const pct=(confidenceSteps.filter(x=>t>=x[0]).at(-1)||[0,24])[1];ui.confidence.querySelector('i').style.width=`${pct}%`;ui.confidence.querySelector('b').textContent=`${pct}%`;if(t>=118.455)ui.roadState.textContent='ROAD ✓';if(t>=131.06)ui.buildingState.textContent='BUILDING ✓'}
  const sec=Math.floor(t);if(sec!==lastClock){lastClock=sec;ui.clock.textContent=new Date(t*1000).toISOString().slice(14,22).replace('.',':')}
}
function frame(){update(voice.currentTime);requestAnimationFrame(frame)}
function start(){ui.start.classList.add('hidden');voice.play().catch(()=>{});syncPrimaryVideo(voice.currentTime,true)}
ui.start.addEventListener('click',start);ui.start.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();start()}});voice.addEventListener('pause',()=>Object.values(videos).forEach(v=>v.pause()));voice.addEventListener('seeked',()=>{sceneIndex=-1;update(voice.currentTime);syncPrimaryVideo(voice.currentTime,true)});
requestAnimationFrame(frame);
