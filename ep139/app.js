const voice=document.getElementById('voice');
const vids=['es01','es02','es03','es04'].map(id=>document.getElementById(id));
const subtitle=document.getElementById('subtitle');
const startOverlay=document.getElementById('start-overlay');
const scan=document.getElementById('scan-line');
const road=document.getElementById('focus-road');
const building=document.getElementById('focus-building');
const evidence=document.getElementById('evidence');
const kicker=document.getElementById('scene-kicker');
const relationSvg=document.getElementById('relation-svg');

const subs=[
[0,3.919,'上一集，AI把上海变成了一个可以计算的空间。'],
[3.969,7.301,'现在，一张陆家嘴的航拍图摆在它面前。'],
[7.351,14.601,'整座城市看起来很清楚，但对AI来说，一开始并没有“道路”“楼房”这些概念。'],
[14.651,21.815,'它看到的，只是深浅不同的颜色、连续变化的纹理，还有一块块挤在一起的形状。'],
[21.865,23.946,'接下来，它开始观察。'],
[23.996,27.159,'这块灰色区域为什么一直向前延伸？上面为什么有细长的白线？'],
[27.209,31.494,'为什么很多小车都沿着这里移动？'],
[31.544,39.243,'而旁边另一块同样是灰色的地方，为什么边缘更整齐，形状更固定，也不会一直向远处延伸？'],
[39.293,45.361,'看得多了，AI开始发现：有些地方虽然颜色很像，作用却完全不同。'],
[45.411,49.3,'一条路通常会继续延伸，还会和别的路连接。'],
[49.35,54.177,'一栋楼往往占据一整块固定的位置。树木的边缘更零碎。'],
[54.227,59.389,'水面也是大片区域，但它的纹理、反光和周围环境又完全不同。'],
[59.439,64.277,'于是，一张普通的上海航拍图，在AI眼里开始慢慢被拆开。'],
[64.327,67.989,'这里是路。那里是楼。这一片是水。旁边是树。'],
[68.039,71.471,'路上那些正在移动的小东西，是车。'],
[71.521,77.673,'但AI做的还不只是把它们一个个认出来。它还会继续判断它们之间的关系。'],
[77.723,81.211,'这条路通向哪里？哪栋楼挨着哪条路？'],
[81.261,86.481,'车辆现在在哪条路上？哪些地方可以通过，哪些地方不能通过？'],
[86.531,90.866,'原来混在一起的一张图片，开始变成一个有结构的空间。'],
[90.916,96.952,'比如陆家嘴一个十字路口。人一眼就知道，中间那块灰色的是马路。'],
[97.002,102.912,'但AI不会只因为它是灰色，就马上下结论。因为楼顶也可能是灰色。'],
[102.962,108.697,'它还要继续看：这块区域是不是一直向前延伸？是不是和另一条路连在一起？'],
[108.747,116.572,'有没有车辆沿着固定方向从这里经过？旁边是不是出现了清晰的建筑边界？'],
[116.622,118.405,'这些线索如果都对得上，AI才会越来越确定：'],
[118.455,124.389,'这里不是一块普通的灰色区域。这里是一条路。'],
[124.439,131.01,'旁边那一块则不一样。它有稳定的轮廓，占据固定位置，不会随着道路继续延伸。'],
[131.06,133.377,'AI于是判断：这是一栋建筑。'],
[133.427,137.496,'就这样，它一边观察，一边比较，也一边修正自己的判断。'],
[137.546,143.911,'最后，我们眼里那张普通的上海航拍图，在AI眼里已经变成了另一种东西。'],
[143.961,145.798,'它不再只是“看见上海”。'],
[145.848,154.553,'它开始知道：哪里能走，哪里是障碍，哪里是水，什么东西正在移动，哪些位置彼此相连。'],
[154.603,158.613,'到了这一步，AI才真正开始理解这个空间里的“意义”。'],
[158.663,162.998,'上一集，我们让AI拥有了一张可以计算的上海地图。'],
[163.048,166.357,'这一集，它开始真正看懂这张地图。'],
[166.407,169.226,'而下一步，还有一个更现实的问题：'],
[169.276,175.16,'既然它已经知道哪里是路、哪里是房子，它怎么知道自己此刻到底在哪里？']
];

const scenes=[
[0,14.6,'上海已经进入AI视野'],[14.65,31.49,'AI开始观察'],[31.54,45.36,'两个灰色区域'],
[45.41,59.39,'AI开始找到规律'],[59.44,71.47,'上海被一层层拆开'],[71.52,90.87,'标签开始建立关系'],
[90.92,108.7,'灰色不等于道路'],[108.75,133.38,'一条线索一条线索确认'],[133.43,158.61,'AI眼里的上海已经变了'],
[158.66,175.16,'看懂地图之后，它自己在哪？']
];

function setActiveVideo(index){vids.forEach((v,i)=>v.classList.toggle('active',i===index));}
function safeSeek(v,t){if(Number.isFinite(v.duration)&&Math.abs(v.currentTime-t)>.25){v.currentTime=Math.min(Math.max(t,0),Math.max(v.duration-.08,0));}}

function syncEarth(t){
  if(t<12){setActiveVideo(0); safeSeek(vids[0],t); if(!voice.paused) vids[0].play().catch(()=>{});}
  else if(t<30){setActiveVideo(1); safeSeek(vids[1],t-12); if(!voice.paused) vids[1].play().catch(()=>{});}
  else if(t<158.66){
    setActiveVideo(2);
    const local=Math.min(Math.max(t-30,0),11.9);
    safeSeek(vids[2],local);
    if(t<42&&!voice.paused) vids[2].play().catch(()=>{}); else vids[2].pause();
  } else {
    setActiveVideo(3); const local=Math.min(Math.max(t-158.66,0),14.9); safeSeek(vids[3],local); if(!voice.paused) vids[3].play().catch(()=>{});
  }
}

function setEvidence(items){evidence.innerHTML=items.map(x=>`<div class="evidence-item">${x}</div>`).join('');}
function clearRelations(){relationSvg.innerHTML='';}
function line(x1,y1,x2,y2){relationSvg.insertAdjacentHTML('beforeend',`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(133,222,255,.9)" stroke-width="3" stroke-linecap="round" stroke-dasharray="10 10"/>`)}

function updateVisual(t){
  scan.classList.toggle('on',t>=14.65&&t<71.47);
  road.classList.toggle('on',t>=23.9&&t<137.5);
  building.classList.toggle('on',t>=31.5&&t<137.5);
  road.classList.toggle('confirmed',t>=118.45);
  building.classList.toggle('confirmed',t>=131.06);

  const scene=scenes.find(s=>t>=s[0]&&t<s[1]); kicker.textContent=scene?scene[2]:'';
  clearRelations();
  if(t<45.4) setEvidence([]);
  else if(t<59.4) setEvidence(['继续延伸','彼此连接','固定轮廓','边缘更零碎','纹理与反光不同']);
  else if(t<71.5) setEvidence(['ROAD','BUILDING','WATER','TREE','CAR']);
  else if(t<90.9){setEvidence(['道路 → 道路','建筑 ↔ 道路','车辆 → 道路','可通过 / 不可通过']); line(155,470,525,610); line(480,300,420,580);}
  else if(t<108.75) setEvidence(['灰色 ≠ 道路','先不下结论']);
  else if(t<118.45) setEvidence(['是否延伸？ ✓','是否连接？ ✓','车辆是否沿此经过？ ✓','是否存在建筑边界？ ✓']);
  else if(t<133.38) setEvidence(t<131.06?['ROAD ✓','多条线索同时成立']:['ROAD ✓','BUILDING ✓']);
  else if(t<158.66){setEvidence(['可走区域','障碍','水体','移动物体','连接关系']); line(110,690,610,520); line(180,430,530,760);}
  else setEvidence(['POSITION ?','正在定位…']);
}

function updateSubtitle(t){const s=subs.find(x=>t>=x[0]&&t<x[1]);subtitle.textContent=s?s[2]:'';}
function tick(){const t=voice.currentTime;updateSubtitle(t);updateVisual(t);syncEarth(t);requestAnimationFrame(tick)}

function start(){startOverlay.classList.add('hidden'); voice.play().catch(()=>{}); vids.forEach(v=>{v.controls=false;});}
startOverlay.addEventListener('click',start);
voice.addEventListener('play',()=>startOverlay.classList.add('hidden'));
voice.addEventListener('pause',()=>vids.forEach(v=>v.pause()));
voice.addEventListener('seeked',()=>syncEarth(voice.currentTime));
window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault(); voice.paused?start():voice.pause();}});
requestAnimationFrame(tick);
