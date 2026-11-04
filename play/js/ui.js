// ================= HUD / overlays =================
const $=id=>document.getElementById(id);
const ICONS={
  rose:'<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="10" r="7" fill="#ff5c86"/><path d="M12 10c2-3 5-1 3 1.5S9 13 9 9.5 13 5 15 7" stroke="#c9325a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12 17v6" stroke="#7fd39a" stroke-width="2" stroke-linecap="round"/></svg>',
  flake:'<svg width="15" height="15" viewBox="0 0 24 24" stroke="#d8ecff" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2"/></svg>',
  feather:'<svg width="15" height="15" viewBox="0 0 24 24"><path d="M18 3C9 5 6 12 7 19l2-2c0-5 3-10 9-14z" fill="#f2f6ff"/><path d="M5 21L15 8" stroke="#b8c8e0" stroke-width="1.5" stroke-linecap="round"/></svg>',
  rosew:'<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="10" r="7" fill="#fff"/><path d="M12 10c2-3 5-1 3 1.5S9 13 9 9.5 13 5 15 7" stroke="#ff5c86" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12 17v6" stroke="#d9ffe6" stroke-width="2" stroke-linecap="round"/></svg>',
  bolt:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 14a5 5 0 01.6-10A6 6 0 0119 7a4 4 0 01-1 7z" fill="#fff"/><path d="M12 12l-3 6h3l-1 5 5-7h-3l2-4z" fill="#ffe27a"/></svg>',
  sun:'<svg width="16" height="16" viewBox="0 0 24 24"><g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g><circle cx="12" cy="12" r="5.5" fill="#fff"/></svg>',
  gfeather:'<svg width="15" height="15" viewBox="0 0 24 24"><path d="M18 3C9 5 6 12 7 19l2-2c0-5 3-10 9-14z" fill="#ffe08a"/><path d="M5 21L15 8" stroke="#e0a840" stroke-width="1.5" stroke-linecap="round"/></svg>',
  gift:'<svg width="16" height="16" viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2" fill="#ff8fbf"/><rect x="2" y="7" width="20" height="4" rx="1.5" fill="#ffb3d4"/><rect x="10.5" y="7" width="3" height="14" fill="#ffe27a"/><path d="M12 7C9 2 5 4 8 7M12 7c3-5 7-3 4 0" stroke="#ffe27a" stroke-width="2" fill="none"/></svg>',
  star:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="#ffe27a"/></svg>',
  daisy:'<svg width="16" height="16" viewBox="0 0 24 24"><g fill="#fff"><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(0 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(45 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(135 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(180 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(225 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(270 12 12)"/><ellipse cx="12" cy="5.5" rx="2.6" ry="5" transform="rotate(315 12 12)"/></g><circle cx="12" cy="12" r="3.4" fill="#ffd36e"/></svg>',
  key:'<svg width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="#ffd36e" stroke-width="2.4"><circle cx="7" cy="7" r="3.5"/><circle cx="17" cy="7" r="3.5"/></g><rect x="10.8" y="9" width="2.4" height="12" rx="1" fill="#ffd36e"/></svg>',
  apple:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 7c-3-2-8-1-8 5s4 10 8 9c4 1 8-3 8-9s-5-7-8-5z" fill="#ffd36e"/><path d="M12 7c0-2 1-4 3-5" stroke="#8a5a2a" stroke-width="1.6" fill="none"/><path d="M13 5c2-2 5-1 5-1s-2 3-5 1z" fill="#7fd39a"/></svg>',
  paw:'<svg width="16" height="16" viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="5.5" ry="4.5" fill="#fff"/><circle cx="5.5" cy="10" r="2.4" fill="#fff"/><circle cx="9.5" cy="6" r="2.4" fill="#fff"/><circle cx="14.5" cy="6" r="2.4" fill="#fff"/><circle cx="18.5" cy="10" r="2.4" fill="#fff"/></svg>',
  gear:'<svg width="16" height="16" viewBox="0 0 24 24"><g fill="#fff"><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(0 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(45 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(90 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(135 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(180 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(225 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(270 12 12)"/><rect x="10.5" y="1.5" width="3" height="5" rx="1" transform="rotate(315 12 12)"/></g><circle cx="12" cy="12" r="7" fill="#fff"/><circle cx="12" cy="12" r="3" fill="rgba(0,0,0,.25)"/></svg>',
  flame:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#fff"/><path d="M12 13c1 2 3 3 3 5a3 3 0 01-6 0c0-1 1-2 1.5-3 .5 1 1 1 1.5 1z" fill="#ffd36e"/></svg>',
  pointe:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 20c-2 0-3-2-2-4l5-9c1-2 4-2 5 0l2 4c1 2 0 3-1 4l-5 4c-1 1-2 1-4 1z" fill="#fff"/><path d="M10 7L6 2M13 7l3-5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
  heart:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 21s-7.6-4.6-9.6-9.3C.9 8.2 3.2 4.6 6.7 4.6c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.5 0 5.8 3.6 4.3 7.1C19.6 16.4 12 21 12 21z" fill="#fff"/></svg>',
  note:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M9 18V5l11-2v13" stroke="#fff" stroke-width="2.2" fill="none" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="3" fill="#fff"/><circle cx="17.5" cy="16" r="3" fill="#fff"/></svg>',
  crown:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 18L2 7l5.5 4L12 4l4.5 7L22 7l-1 11z" fill="#fff"/><rect x="3" y="19" width="18" height="2.5" rx="1" fill="#fff"/></svg>',
  trophy:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 3h10v6a5 5 0 01-10 0z" fill="#fff"/><path d="M7 5H3c0 4 2 6 4.5 6M17 5h4c0 4-2 6-4.5 6" stroke="#fff" stroke-width="2" fill="none"/><path d="M10 14h4v4h3v3H7v-3h3z" fill="#fff"/></svg>',
  boot:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M8 3h6v9l6 3a2 2 0 011 2v2H4v-3l2-1V5z" fill="#fff"/></svg>',
  spin:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M20 12a8 8 0 11-3-6.2" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M18 2v5h-5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  slipper:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 17c3 0 6-1 9-4 2-2 5-2 7 0l2 3v3H6l-1 3H3z" fill="#cfe8ff" stroke="#fff" stroke-width="1.2"/></svg>',
  pumpkin:'<svg width="16" height="16" viewBox="0 0 24 24"><ellipse cx="12" cy="14" rx="9" ry="7" fill="#fff3e0"/><path d="M12 7v14M7.5 8c-2 4-2 8 0 12M16.5 8c2 4 2 8 0 12" stroke="#ffb066" stroke-width="1.3" fill="none"/><path d="M12 7c0-2 1-3 3-4" stroke="#c8f0b0" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  clock:'<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fff"/><path d="M12 6v6l-3 2" stroke="#5a7ad0" stroke-width="2" stroke-linecap="round"/></svg>',
  cocoa:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M4 10h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5z" fill="#fff6ea"/><path d="M17 11h2a2.5 2.5 0 010 5h-2" stroke="#fff6ea" stroke-width="2" fill="none"/><path d="M8.5 3c-1 2 1 3 0 5M12.5 3c-1 2 1 3 0 5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
  swan:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M2.5 14.5c3 6 14 6 18.5-.5-3 1.2-6.5 1-8.5-1 1.5-3 2.6-7.2.2-9.3-2.2-1.4-4.6.8-3.4 3.1l2.1-.4c1 2.2-.3 4.6-1.6 6.6-2.6-1.4-5.4-1-7.3 1.5z" fill="#fff"/><path d="M8.6 6.9l-2.4.9" stroke="#ffb347" stroke-width="1.8" stroke-linecap="round"/></svg>',
  tree:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l6 8h-3l4 6H5l4-6H6z" fill="#effff4"/><rect x="10.5" y="16" width="3" height="5" rx="1" fill="#effff4"/><circle cx="10" cy="11" r="1" fill="#ffd36e"/><circle cx="14" cy="14" r="1" fill="#ff9ec0"/></svg>',
  owlc:'<svg width="16" height="16" viewBox="0 0 24 24"><ellipse cx="12" cy="14.5" rx="7.5" ry="7.5" fill="#fff"/><circle cx="9.2" cy="13.5" r="2.3" fill="#3a1e4f"/><circle cx="14.8" cy="13.5" r="2.3" fill="#3a1e4f"/><path d="M11 17h2l-1 1.6z" fill="#f2a64d"/><path d="M6.5 8l1.6-4.5 2.2 2.8L12 2l1.7 4.3 2.2-2.8L17.5 8z" fill="#ffd36e"/></svg>',
  truffle:'<svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="#5a2a17"/><path d="M6 11c2 1.5 4-1.5 6 0s4-1.5 6 0" stroke="#e9b77d" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
  crystal:'<svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 2l7 7-7 13-7-13z" fill="#cfc4ff"/><path d="M5 9h14M12 2v20" stroke="#fff" stroke-width="1" opacity=".7"/></svg>',
  candy:'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M5 12L1 8v8zM19 12l4-4v8z" fill="#ffd36e"/><ellipse cx="12" cy="12" rx="7.5" ry="6" fill="#b06cff"/><path d="M8 8c2 2 2 6 0 8M12 6.3c2 2.5 2 8.9 0 11.4" stroke="#e7d2ff" stroke-width="1.5" fill="none"/></svg>'
};
const HEART='<svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 21s-7.6-4.6-9.6-9.3C.9 8.2 3.2 4.6 6.7 4.6c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.5 0 5.8 3.6 4.3 7.1C19.6 16.4 12 21 12 21z" fill="F"/></svg>';
let lastHUD='';
function updateHUD(){
  {const pp=$('powPill');const on=(powT>0&&powType)||player.shield;pp.style.display=on?'flex':'none';if(on){$('powIcon').textContent=powType==='speed'?'Speed':powType==='music'?'Music':'Shield';$('powBar').style.width=(powT>0?powT/(powType==='speed'?8:10)*100:100)+'%';}}
  const tl=Math.ceil(timeLeft),key=hearts+'|'+itemCount+'|'+score+'|'+tl+'|'+LI;if(key===lastHUD)return;lastHUD=key;
  $('timerPill').style.display=L.timer?'flex':'none';$('timer').textContent=Math.floor(tl/60)+':'+String(tl%60).padStart(2,'0');$('timerPill').style.background=L.timer&&tl<=15?'rgba(210,60,90,.55)':'';
  $('hearts').innerHTML=Array.from({length:maxH()},(_,i)=>i).map(i=>HEART.replace('F',i<hearts?'#ff7aa2':'rgba(255,255,255,.2)')).join('');
  $('items').textContent=itemCount+'/'+items.length;$('score').textContent=score;
}
function setMuteIcon(){$('mute').innerHTML=muted?'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M17 9l5 6M22 9l-5 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';}
$('mute').addEventListener('click',()=>{muted=!muted;if(master)master.gain.value=muted?0:VOL;setMuteIcon();});
$('menu').addEventListener('click',()=>openMenu());
$('home').addEventListener('click',()=>{if(state==='play'||state==='pause'||state==='over'||state==='win'){if(L.custom)openMaker();else openMap();}});
setMuteIcon();
let toastTimer;
function toast(msg,ms=1800){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),ms);}
const touch=matchMedia('(pointer:coarse)').matches;
const HOW=touch?'Slide the pad to move · <b>Leap</b> to jump · <b>Spin</b> to pirouette<br>Spin to float and twirl past enemies · Leap on the beat to soar':'← → move · Space leap · X spin · Esc menu<br>Spin to float and twirl past enemies · Leap on the beat to soar';
const ROMAN=['I','II','III','IV','V','VI','VII','VIII'];
const COST={school:{tights:'#ffe1ec',suit:'#ff9ec0',tutu:'#fff0f6',tutu2:'rgba(255,158,192,.55)',h2:'#ffb3cf',head:'bow'},peter:{tights:'#f0ffe8',suit:'#5fbf6a',tutu:'#eaffe0',tutu2:'rgba(95,191,106,.55)',h2:'#9fe0a0',head:'flower'},coppelia:{tights:'#fff6e0',suit:'#e8603a',tutu:'#fff2d8',tutu2:'rgba(255,200,90,.65)',h2:'#ffd08a',head:'bow'},firebird:{tights:'#fff0e0',suit:'#ff6a3a',tutu:'#ffe08a',tutu2:'rgba(255,90,40,.6)',h2:'#ffb066',head:'tiara',tiara:'#ffd36e'},nutcracker:{tights:'#ffe1ec',suit:'#ff9ec0',tutu:'#fff0f6',tutu2:'rgba(255,158,192,.55)',h2:'#ffb3cf',head:'bow'},swan:{tights:'#f4f6fb',suit:'#ffffff',tutu:'#ffffff',tutu2:'rgba(200,215,240,.8)',h2:'#c8d7f0',head:'swan'},beauty:{tights:'#fbe6ff',suit:'#d9a6ff',tutu:'#f8ecff',tutu2:'rgba(190,140,255,.6)',h2:'#d4b0ff',head:'tiara',tiara:'#ffd36e'},cinder:{tights:'#eaf4ff',suit:'#8ec6ff',tutu:'#eef7ff',tutu2:'rgba(130,190,255,.6)',h2:'#a8d4ff',head:'tiara',tiara:'#e8f0ff'}};
const BALLETS={school:'Ballet School',nutcracker:'The Nutcracker',peter:'Peter and the Wolf',cinder:'Cinderella',coppelia:'Copp\u00e9lia',beauty:'Sleeping Beauty',swan:'Swan Lake',firebird:'The Firebird'};
const getUnlocked=b=>b==='swan'?unlockedSwan:b==='nutcracker'?unlocked:(unlX[b]||1);
const balletLevels=b=>LEVELS.map((x,i)=>[x,i]).filter(([x])=>x.ballet===b).sort((p,q)=>{const a=ORDER.indexOf(p[1]),c=ORDER.indexOf(q[1]);return (a<0?999+p[1]:a)-(c<0?999+q[1]:c);});
const kIn=i=>balletLevels(LEVELS[i].ballet).findIndex(([,j])=>j===i);
function actsList(bl){
  bl=bl||ballet;const un=getUnlocked(bl);
  return '<div class="list">'+balletLevels(bl).map(([lv,i],k)=>{
    const lock=k>=un;
    return `<button class="act" data-i="${i}" ${lock?'disabled':''} style="animation-delay:${.08*k+.15}s"><span class="num" style="background:${lv.num}">${ICONS[lv.icon]}</span><span class="t"><b>${lv.name}</b><small>${lock?lv.act+' · Finish the previous act to unlock':lv.act+' · '+lv.blurb+(best[i]?' · Best '+best[i]:'')}</small></span><span class="go">${lock?'<svg width="14" height="14" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2.5" fill="#fff"/><path d="M8 10V7a4 4 0 018 0v3" stroke="#fff" stroke-width="2" fill="none"/></svg>':'›'}</span></button>`;
  }).join('')+'</div>';
}
let tab='story',confirmDel=null;
const HERO=`<div class="hero HSW"><svg viewBox="0 0 120 150">
<ellipse cx="60" cy="143" rx="26" ry="5" fill="rgba(0,0,0,.25)"/>
<path d="M52 70 Q10 46 50 6" stroke="#f6d6c4" stroke-width="5.5" fill="none" stroke-linecap="round"/>
<path d="M68 70 Q110 46 70 6" stroke="#f6d6c4" stroke-width="5.5" fill="none" stroke-linecap="round"/>
<path d="M60 96 L60 140" stroke="var(--tights)" stroke-width="6.5" stroke-linecap="round"/>
<path d="M60 96 L76 112 L62 119" stroke="var(--tights)" stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="49" y="64" width="22" height="34" rx="10" fill="var(--suit)"/>
<ellipse cx="60" cy="97" rx="36" ry="10" fill="var(--tutu2)"/>
<ellipse cx="60" cy="94" rx="32" ry="8.5" fill="var(--tutu)"/>
<g fill="var(--tutu2)" opacity=".7"><circle cx="40" cy="96" r="1.6"/><circle cx="52" cy="99" r="1.6"/><circle cx="68" cy="99" r="1.6"/><circle cx="80" cy="96" r="1.6"/></g>
<rect x="56" y="58" width="8" height="8" fill="#f6d6c4"/>
<circle cx="60" cy="44" r="21" fill="#f6d6c4"/>
<path d="M38.5 46 Q37 21 60 21 Q83 21 81.5 46 Q78 33 66 31 Q62 36 50 34 Q42 36 38.5 46z" fill="#4a2c2c"/>
<circle cx="60" cy="17" r="10" fill="#4a2c2c"/>
<g class="hp g-bow" fill="#ff7aa8"><path d="M60 10 L48 4 L49 16z"/><path d="M60 10 L72 4 L71 16z"/><circle cx="60" cy="10" r="3.2"/></g>
<g class="hp g-flower"><path d="M38 28 Q60 12 82 28" stroke="#7fd39a" stroke-width="3" fill="none"/><g fill="#ff9ec0"><circle cx="42" cy="24" r="5"/><circle cx="60" cy="17" r="6"/><circle cx="78" cy="24" r="5"/></g><g fill="#ffe27a"><circle cx="42" cy="24" r="2"/><circle cx="60" cy="17" r="2.4"/><circle cx="78" cy="24" r="2"/></g></g>
<g class="hp g-star"><path d="M74 14l2.6 6 6.4.5-4.9 4.2 1.5 6.3-5.6-3.4-5.6 3.4 1.5-6.3-4.9-4.2 6.4-.5z" fill="#ffe27a"/></g>
<g class="hp g-bunny"><ellipse cx="48" cy="6" rx="6" ry="18" fill="#fff" transform="rotate(-12 48 6)"/><ellipse cx="72" cy="6" rx="6" ry="18" fill="#fff" transform="rotate(12 72 6)"/><ellipse cx="48" cy="6" rx="2.8" ry="12" fill="#ffb3cf" transform="rotate(-12 48 6)"/><ellipse cx="72" cy="6" rx="2.8" ry="12" fill="#ffb3cf" transform="rotate(12 72 6)"/></g>
<g class="hp g-cat"><path d="M38 30 L42 6 L56 22z M82 30 L78 6 L64 22z" fill="#4a2c2c"/><path d="M42 24 L44 12 L51 21z M78 24 L76 12 L69 21z" fill="#ffb3cf"/></g>
<g class="hp g-tiara"><path d="M45 25 L47 9 L54 18 L60 3 L66 18 L73 9 L75 25z" fill="var(--tiara)"/><circle cx="60" cy="14" r="3" fill="#ff7aa8"/></g>
<g class="hp g-swan" fill="#fff"><ellipse cx="45" cy="18" rx="10" ry="3.5" transform="rotate(-30 45 18)"/><ellipse cx="75" cy="18" rx="10" ry="3.5" transform="rotate(30 75 18)"/><ellipse cx="60" cy="8" rx="3.5" ry="8"/></g>
<circle cx="51.5" cy="47" r="3.6" fill="#2a1a2a"/><circle cx="68.5" cy="47" r="3.6" fill="#2a1a2a"/>
<circle cx="52.8" cy="45.6" r="1.3" fill="#fff"/><circle cx="69.8" cy="45.6" r="1.3" fill="#fff"/>
<path d="M55 55 Q60 60 65 55" stroke="#c2556f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<ellipse cx="45.5" cy="53" rx="4.5" ry="2.8" fill="#ff9ab7" opacity=".65"/><ellipse cx="74.5" cy="53" rx="4.5" ry="2.8" fill="#ff9ab7" opacity=".65"/>
</svg></div>`;
function heroHTML(b){const C=costumeFor(b||ballet);return HERO.replace('HSW','h-'+(C.head||'bow')+(C.rainbow?' rb':'')).replace('<svg ',`<svg style="--tights:${C.tights};--suit:${C.suit};--tutu:${C.tutu};--tutu2:${C.h2};--tiara:${C.tiara||'#ffd36e'}" `);}
(function(){const d=document.getElementById('deco');const shapes=['<svg width="S" height="S" viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="@C"/></svg>','<svg width="S" height="S" viewBox="0 0 24 24"><path d="M12 21s-7.6-4.6-9.6-9.3C.9 8.2 3.2 4.6 6.7 4.6c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.5 0 5.8 3.6 4.3 7.1C19.6 16.4 12 21 12 21z" fill="@C"/></svg>','<svg width="S" height="S" viewBox="0 0 24 24"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" fill="@C"/></svg>'];
const cols=['#ffd36e','#ff9ec0','#9fd0ff','#c9a6ff','#fff','#7fe0c0'];let h='';
for(let i=0;i<18;i++){const sz=10+Math.random()*16;h+=`<span style="left:${Math.random()*100}%;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*18}s">${shapes[i%3].replace(/S/g,sz.toFixed(0)).replace('@C',cols[i%cols.length])}</span>`;}
d.innerHTML=h;})();

const DIFFS=['Easy','Normal','Hard'];
const BHINT={peter:'Help your animal friends and catch the wolf!',coppelia:'Ride the conveyor belts in the toy workshop',firebird:'The Firebird\u2019s feather lets you leap twice',swan:'As Odette, leap again mid-air to flap your wings',beauty:'As Aurora, steer clear of the spindles',cinder:'As Cinderella, beat the clock in the final act'};
const PCOLS=['#ff9ec0','#9fd0ff','#ffd36e','#7fe0c0','#c9a6ff','#ff9a5c'];
let newP={name:'',color:PCOLS[1]};
function pdot(pr,sz){return `<span class="pdot" style="background:${pr.color}${sz?';width:'+sz+'px;height:'+sz+'px':''}">${(pr.name||'?').trim().charAt(0).toUpperCase()||'?'}</span>`;}
function topIcons(){return `<button class="ibtn more" data-a="more" aria-label="Menu"><svg viewBox="0 0 24 24"><g fill="#fff"><circle cx="6" cy="6" r="2.2"/><circle cx="12" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="18" cy="12" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="12" cy="18" r="2.2"/><circle cx="18" cy="18" r="2.2"/></g></svg></button>`;}
function moreIcons(){return `<button class="ibtn" data-a="maker" aria-label="Level maker"><svg viewBox="0 0 24 24"><path d="M4 20l1-5L16 4l4 4L9 19z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M14 6l4 4" stroke="#fff" stroke-width="2"/></svg></button><button class="ibtn" data-a="shop" aria-label="Wardrobe"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" stroke="#fff" stroke-width="2" fill="none"/></svg></button><button class="ibtn" data-a="badges" aria-label="Badges">${ICONS.trophy.replace('width="16" height="16"','')}</button><button class="ibtn" data-a="settings" aria-label="Settings"><svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="none" stroke="#fff" stroke-width="2"/><path d="M19.4 13a7.5 7.5 0 000-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 00-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 00-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 000 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 001.7 1l.4 2.5h4l.4-2.5a7.4 7.4 0 001.7-1l2.4 1 2-3.4z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg></button>`;}
function moreHTML(){
  const it=(a,svg,label,sub,c)=>`<button class="mtile" data-a="${a}"><span class="micon" style="background:${c}">${svg}</span><b>${label}</b><small>${sub}</small></button>`;
  const ic=(a)=>{const m=moreIcons().match(new RegExp('data-a="'+a+'"[^>]*>(<svg[\\s\\S]*?</svg>)'));return m?m[1]:'';};
  return `<div class="eyebrow">${curProfile().name}</div><h1 style="font-size:44px">Menu</h1><div class="mgrid">
  ${it('shop',ic('shop'),'Wardrobe',coins+' sparkles','linear-gradient(135deg,#ffb3d0,#ff6f9f)')}
  ${it('badges',ic('badges'),'Badges',ACH.filter(a=>ach[a[0]]).length+' of '+ACH.length,'linear-gradient(135deg,#ffe27a,#f2a64d)')}
  ${it('maker',ic('maker'),'Level maker','Build your own','linear-gradient(135deg,#9fd0ff,#5a7ad0)')}
  ${it('profiles',`<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4" fill="#fff"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7z" fill="#fff"/><circle cx="17" cy="9" r="3" fill="#fff" opacity=".7"/><path d="M15 14c4 0 7 3 7 7h-5" fill="#fff" opacity=".7"/></svg>`,'Players',PROFILES.length+' dancer'+(PROFILES.length>1?'s':''),'linear-gradient(135deg,#7fe0c0,#3f9a7a)')}
  ${it('settings',ic('settings'),'Settings','Sound, controls','linear-gradient(135deg,#c9a6ff,#7a5ad0)')}
  ${window.backupTile?backupTile(it):''}
  </div><button class="cta" data-a="acts">Done</button>`;
}
let settingsBack='title';
function settingsHTML(){
  const sl=(k,label)=>`<label class="srow"><span>${label}</span><input type="range" min="0" max="1" step="0.05" value="${SET[k]}" data-set="${k}"></label>`;
  const tg=(k,label,sub)=>`<button class="srow tog ${SET[k]?'on':''}" data-tog="${k}"><span>${label}<small>${sub}</small></span><i></i></button>`;
  return `<div class="eyebrow">${curProfile().name}'s settings</div><h1 style="font-size:44px">Settings</h1><div class="slist">${sl('music','Music')}${sl('sfx','Sounds')}${sl('shake','Screen shake')}${tg('flash','Flashing lights','Lightning and hurt flashes')}<div class="srow"><span>Graphics<small>${SET.gfx==='auto'?(LOWQ?'Auto · running in speedy mode':'Auto · full detail'):SET.gfx==='low'?'Speedy mode for older devices':'Full detail'}</small></span><span class="miniseg">${['auto','high','low'].map(g=>`<button data-gfx="${g}" class="${SET.gfx===g?'on':''}">${g==='auto'?'Auto':g==='high'?'Best':'Fast'}</button>`).join('')}</span></div>${sl('csize','Button size')}${tg('cfade','Fade buttons','Buttons go see-through when you are not touching them')}${tg('easy','Easy mode','5 hearts · slower enemies · a fairy catches falls · more time')}<div class="srow"><span>Full story<small>${FULL?'Every ballet is unlocked':DEMO?'Nutcracker is free \u00b7 every ballet is in the App Store version':'Nutcracker is free \u00b7 the rest unlocks once'}</small></span>${FULL?(Store.preview?'<button class="ghost usmall" style="margin:0" data-u="relock">Lock again (testing)</button>':''):(DEMO?'':'<button class="ghost usmall" style="margin:0;opacity:.8" data-u="gate-restore">Restore</button>')}</div></div><button class="cta" data-a="setdone">Done</button>`;
}
function topRow(){const pr=curProfile();return `<div class="toprow"><button class="chip" data-a="profiles">${pdot(pr)}${pr.name}</button><span class="spacer"></span>${window.topIcons?topIcons():''}</div>`;}
function profilesHTML(){
  return `<div class="eyebrow">Who's dancing?</div><h1 style="font-size:44px">Players</h1><div class="plist">`+PROFILES.map(pr=>`<button class="prow ${pr.id===PID?'on':''}" data-pid="${pr.id}">${pdot(pr)}<span>${pr.name}<small>${pr.id===PID?'Playing now':'Tap to switch'}</small></span>${PROFILES.length>1&&pr.id!==PID?`<span class="x" data-del="${pr.id}">×</span>`:''}</button>`).join('')+`</div>`+
  (PROFILES.length<6?`<input class="field" id="pname" maxlength="14" placeholder="New player's name" value="${newP.name.replace(/"/g,'')}"><div class="swatches">${PCOLS.map(c=>`<button class="sw ${newP.color===c?'on':''}" data-col="${c}" style="background:${c}"></button>`).join('')}</div><button class="cta" data-a="addp">Add player</button>`:'')+
  `<button class="ghost" data-a="acts">Done</button>`;
}
function balletGrid(){return `<div class="bgrid">${Object.keys(BALLETS).map(k=>`<button data-b="${k}" class="${ballet===k?'on':''}">${BALLETS[k]}${paid(k)?KEYB.replace('lockb','lockb mini'):''}</button>`).join('')}</div>`;}
function danceBody(){
  return `<div class="seglabel">Song</div><div class="list" style="margin-top:6px">`+balletLevels(ballet).map(([lv,i])=>`<button class="act song ${dance.song===i?'sel':''}" data-s="${i}"><span class="num" style="background:${lv.num}">${ICONS[lv.icon]}</span><span class="t"><b>${lv.name}</b><small>${BALLETS[lv.ballet]} · ${lv.music.meter===3?'Waltz':'4/4'} · ${lv.music.bpm} bpm${dance.best[i]?' · Best '+dance.best[i]:''}</small></span><span class="go">${dance.song===i?'✓':''}</span></button>`).join('')+`</div>
  <div class="seglabel">Difficulty</div><div class="seg" id="segDiff">${DIFFS.map((d,i)=>`<button data-d="${i}" class="${dance.diff===i?'on':''}">${d}</button>`).join('')}</div>
  <div class="seglabel">Dancers</div><div class="seg" id="segPl">${[1,2].map(n=>`<button data-p="${n}" class="${dance.players===n?'on':''}">${n===1?'Solo':'2 players'}</button>`).join('')}</div>
  <button class="cta" data-a="dance">Start dancing</button>
  <div class="howto">Tap each move as its note reaches the ring${touch?'':' · D F J K or arrow keys'}.<br>Chain combos and the audience throws roses.${dance.players===2?'<br>Take turns on the same device — highest score wins.':''}</div>`;
}
function gradeOf(acc){return acc>=.95?'S':acc>=.85?'A':acc>=.7?'B':acc>=.5?'C':'D';}
function showOverlay(kind){
  const c=$('card');c.dataset.kind=kind;const nxI=nextInBallet(LI),nextLv=nxI>=0?LEVELS[nxI]:null,last=!nextLv;
  if(kind==='title')c.innerHTML=`${topRow()}${heroHTML(tab==='story'?LEVELS[ORDER[currentK()]].ballet:ballet)}<div class="eyebrow">A ballet adventure</div><h1>Prima</h1><div class="seg" id="tabs"><button data-tab="story" class="${tab==='story'?'on':''}">Story</button><button data-tab="dance" class="${tab==='dance'?'on':''}">Dance Battle</button></div>`+(tab==='story'?`<div class="progress">${ORDER.filter(done).length} of ${ORDER.length} stations · ${totalStars()} ${STAR(true,14)}</div><div class="seg" style="margin-top:14px"><button data-coop="0" class="${coop?'':'on'}">Solo</button><button data-coop="1" class="${coop?'on':''}">2 players</button></div><button class="cta" data-a="map">${ORDER.some(done)?'Continue the story':'Start the story'}</button>${coop?`<div class="howto">${touch?'Each player gets their own buttons at the bottom.':'Player 1: A D move · W leap · S spin<br>Player 2: ← → move · ↑ leap · ↓ spin'}</div>`:''}<div class="howto">Start at Ballet School, then follow the map all the way to The Firebird.</div>`:balletGrid()+danceBody());
  else if(kind==='win'&&L.custom)c.innerHTML=`<div class="eyebrow">${L.name}</div><h1>You did it!</h1><div class="stats"><div class="stat"><b>${itemCount}/${items.length}</b><span>${L.itemName}</span></div><div class="stat"><b>${score}</b><span>Grace</span></div></div><button class="cta" data-a="maker">Back to my level</button><button class="ghost" data-a="replay">Play again</button>`;
  else if(kind==='win'&&!L.custom){speak('Bravo! '+(L.finale||''));const k=ORDER.indexOf(LI),nx=ORDER[k+1],fin=k===ORDER.length-1,chap=!fin&&nx!==undefined&&LEVELS[nx].ballet!==L.ballet;
    c.innerHTML=`<div class="eyebrow">${fin?'Grand finale':chap?'Chapter complete':L.act+' complete'}</div><h1>Bravo!</h1><div class="bigstars">${[1,2,3].map(n=>STAR(lastStars>=n,38).replace('<svg ',`<svg style="animation-delay:${.25+n*.18}s" `)).join('')}</div>${fin?'<div class="sub">'+(L.finale||'')+'<br>You have danced every ballet on the map!</div>':chap?'<div class="sub">'+(L.finale||'')+'<br>Next chapter: '+BALLETS[LEVELS[nx].ballet]+'</div>':''}${lastPerfect?`<div class="perfect">${CROWN(22)} Perfect! Every ${L.itemName.toLowerCase().replace(/s$/,'')} and no bumps — a gold crown!</div>`:(crowns[LI]?'':`<div class="crownhint">${CROWN(14)} Get every ${L.itemName.toLowerCase().replace(/s$/,'')} without a bump for a gold crown</div>`)}${lastGift?`<div class="gift"><span class="swatch" style="background:linear-gradient(135deg,${lastGift[3].suit},${lastGift[3].h2})"></span><span><small>New costume unlocked</small><b>${lastGift[1]}</b></span></div>`:''}<div class="stats"><div class="stat"><b>${itemCount}/${items.length}</b><span>${L.itemName}</span></div><div class="stat"><b>${score}</b><span>Grace</span></div></div><div class="coins" style="margin-top:14px">${SPK.replace(/14/g,'18')} +${lastCoins} sparkles for the wardrobe</div>${fin?'<button class="cta" data-u="ending">Curtain call</button><button class="ghost" data-a="map">Back to the map</button>':'<button class="cta" data-a="map">Continue the journey</button>'}<button class="ghost" data-a="replay">Replay this act</button>`;}
  else if(false)c.innerHTML=`<div class="eyebrow">Finale</div><h1>Bravo!</h1><div class="sub">${L.finale||'Bravo!'}</div><div class="stats"><div class="stat"><b>${itemCount}/${items.length}</b><span>${L.itemName}</span></div><div class="stat"><b>${score}</b><span>Grace</span></div></div><button class="cta" data-a="replay">Encore</button><button class="ghost" data-a="acts">Home</button>`;
  else if(false)c.innerHTML=`<div class="eyebrow">${L.act} complete</div><h1>Bravo!</h1><div class="stats"><div class="stat"><b>${itemCount}/${items.length}</b><span>${L.itemName}</span></div><div class="stat"><b>${score}</b><span>Grace</span></div></div><button class="cta" data-a="next">Next: ${nextLv&&nextLv.name}</button><button class="ghost" data-a="replay">Replay this act</button><button class="ghost" data-a="menu" style="margin-top:6px">Home</button>`;
  else if(kind==='pause')c.innerHTML=`<div class="eyebrow">Intermission</div><h1>Paused</h1><button class="cta" data-a="resume">Resume</button><button class="ghost" data-a="settings">Settings</button><button class="ghost" data-a="replay">Restart this act</button><button class="ghost" data-a="map" style="margin-top:6px">Story map</button>`;
  else if(kind==='profiles')c.innerHTML=profilesHTML();
  else if(kind==='settings')c.innerHTML=settingsHTML();
  else if(kind==='ending')c.innerHTML=endingHTML();
  else if(kind==='unlock')c.innerHTML=unlockHTML();
  else if(kind==='gate')c.innerHTML=gateHTML();
  else if(kind==='upreview')c.innerHTML=previewHTML();
  else if(kind==='unlocked')c.innerHTML=unlockedHTML();
  else if(kind==='udemo')c.innerHTML=demoHTML();
  else if(kind==='more')c.innerHTML=moreHTML();
  else if(kind==='backup')c.innerHTML=backupHTML();
  else if(kind==='badges')c.innerHTML=badgesHTML();
  else if(kind==='shop')c.innerHTML=shopHTML();
  else if(kind==='story'){c.innerHTML=storyHTML();speak(STORY[storyB][storyPage][0]);}
  else if(kind==='dresult'){
    const R=dance.results,r=R[dance.turn-1],cnt=r.counts;
    const statsHTML=`<div class="stats"><div class="stat"><b>${r.score}</b><span>Score</span></div><div class="stat"><b>${Math.round(r.acc*100)}%</b><span>Accuracy</span></div><div class="stat"><b>${r.maxCombo}</b><span>Best combo</span></div></div><div class="howto" style="margin-top:14px">Perfect ${cnt.perfect} · Great ${cnt.great} · Good ${cnt.good} · Miss ${cnt.miss}</div>`;
    if(dance.players===1)c.innerHTML=`<div class="eyebrow">${L.name}${r.newBest?' · New best':''}</div><h1 class="grade">${r.grade}</h1>${statsHTML}<button class="cta" data-a="dance">Dance again</button><button class="ghost" data-a="menu">Menu</button>`;
    else if(dance.turn===1)c.innerHTML=`<div class="eyebrow">Player 1</div><h1 class="grade">${r.grade}</h1>${statsHTML}<div class="sub" style="margin-top:16px">Pass the device to Player 2.</div><button class="cta" data-a="p2">Player 2, your turn</button><button class="ghost" data-a="menu">Menu</button>`;
    else{
      const a=R[0],b=R[1],w=a.score===b.score?0:a.score>b.score?1:2;
      c.innerHTML=`<div class="eyebrow">Dance battle · ${L.name}</div><h1>${w?'Player '+w+' wins!':'It’s a tie!'}</h1><div class="sub">${w?'Player '+w+' is the Prima ballerina.':'Two Prima ballerinas tonight.'}</div><div class="versus">${[a,b].map((x,i)=>`<div class="${w===i+1?'win':''}"><span>Player ${i+1}</span><b>${x.score}</b><span>${x.grade} · ${Math.round(x.acc*100)}%</span></div>`).join('')}</div><button class="cta" data-a="rematch">Rematch</button><button class="ghost" data-a="menu">Menu</button>`;
    }
  }
  else c.innerHTML=`<div class="eyebrow">Intermission</div><h1>Again?</h1><div class="sub">${L.timer&&timeLeft<=0?'The clock struck midnight — try again!':'Take a breath — the stage is waiting.'}</div><button class="cta" data-a="replay">Try again</button><button class="ghost" data-a="map">Story map</button>`;
  if(kind!=='title'||!showOverlay.keep){c.style.animation='none';void c.offsetWidth;c.style.animation='';}
  showOverlay.keep=false;
  c.querySelectorAll('.act[data-i]').forEach(b=>b.addEventListener('click',()=>startLevel(+b.dataset.i)));
  c.querySelectorAll('[data-b]').forEach(b=>b.addEventListener('click',()=>{ballet=b.dataset.b;if(LEVELS[dance.song].ballet!==ballet)dance.song=balletLevels(ballet)[0][1];titleScene();showOverlay.keep=true;showOverlay('title');}));
  c.querySelectorAll('[data-pid]').forEach(b=>b.addEventListener('click',ev=>{
    const del=ev.target.closest('[data-del]');
    if(del){const id=+del.dataset.del;if(confirmDel===id){PROFILES=PROFILES.filter(x=>x.id!==id);saveProfiles();confirmDel=null;}else{confirmDel=id;del.textContent='Delete?';return;}showOverlay.keep=true;showOverlay('profiles');return;}
    PID=+b.dataset.pid;saveProfiles();loadProfileData();titleScene();showOverlay('title');}));
  c.querySelectorAll('[data-set]').forEach(r=>r.addEventListener('input',()=>{SET[r.dataset.set]=+r.value;saveSettings();if(r.dataset.set==='shake'){trauma=.6;}}));
  c.querySelectorAll('[data-gfx]').forEach(b=>b.addEventListener('click',()=>{SET.gfx=b.dataset.gfx;saveSettings();setLowQ(SET.gfx==='low');slowT=0;showOverlay.keep=true;showOverlay('settings');}));
  c.querySelectorAll('[data-tog]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.tog;SET[k]=!SET[k];saveSettings();b.classList.toggle('on',SET[k]);}));
  c.querySelectorAll('[data-coop]').forEach(b=>b.addEventListener('click',()=>{coop=b.dataset.coop==='1';showOverlay.keep=true;showOverlay('title');}));
  c.querySelectorAll('[data-stab]').forEach(b=>b.addEventListener('click',()=>{shopTab=b.dataset.stab;shopMsg='';showOverlay.keep=true;showOverlay('shop');}));
  c.querySelectorAll('[data-buy]').forEach(b=>b.addEventListener('click',()=>shopTap(b.dataset.buy)));
  c.querySelectorAll('[data-col]').forEach(b=>b.addEventListener('click',()=>{newP.color=b.dataset.col;const n=$('pname');if(n)newP.name=n.value;showOverlay.keep=true;showOverlay('profiles');}));
  {const n=$('pname');if(n)n.addEventListener('input',()=>{newP.name=n.value;});}
  c.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.tab;showOverlay.keep=true;showOverlay('title');}));
  c.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{dance.song=+b.dataset.s;showOverlay.keep=true;showOverlay('title');}));
  c.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{dance.diff=+b.dataset.d;showOverlay.keep=true;showOverlay('title');}));
  c.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('click',()=>{dance.players=+b.dataset.p;showOverlay.keep=true;showOverlay('title');}));
  bindStore(c);
  c.querySelectorAll('[data-a]').forEach(b=>b.addEventListener('click',()=>{
    const a=b.dataset.a;
    if(a==='next'){const n=nextInBallet(LI);startLevel(n>=0?n:LI);}else if(a==='replay')startLevel(LI);
    else if(a==='resume')resume();
    else if(a==='dance'||a==='rematch'){dance.turn=1;dance.results=[];startDance();}
    else if(a==='p2'){dance.turn=2;startDance();}
    else if(a==='menu')backToTitle();
    else if(a==='map'){if(L.custom)openMaker();else openMap();}
    else if(a==='maker')openMaker();
    else if(a==='more')showOverlay('more');
    else if(a==='backup'){backupMsg='';showOverlay('backup');}
    else if(a==='bcopy'){const t=$('bcode');let ok=false;try{if(navigator.clipboard){navigator.clipboard.writeText(t.value).then(()=>{backupMsg='Copied! Keep it somewhere safe, like a note or message.';showOverlay.keep=true;showOverlay('backup');},()=>{t.select();backupMsg='Select the code above and copy it.';showOverlay.keep=true;showOverlay('backup');});ok=true;}}catch(e){}if(!ok){t.removeAttribute('readonly');t.select();backupMsg='Select the code above and copy it.';}}
    else if(a==='brestore'){const v=($('bin')||{}).value||'';backupMsg=restoreCode(v)?'Restored! Welcome back.':'That code didn\u2019t work — check it was copied completely.';sfx(backupMsg.startsWith('Restored')?'chimeup':'hurt');showOverlay.keep=true;showOverlay('backup');}
    else if(a==='badges')showOverlay('badges');
    else if(a==='snext'||a==='sskip'){if(a==='snext'&&storyPage<STORY[storyB].length-1){storyPage++;sfx('item');showOverlay('story');}else{const f=storyThen;storyThen=null;if(f)f();else openMap();}}
    else if(a==='shop'){shopMsg='';showOverlay('shop');}
    else if(a==='settings'){settingsBack=state==='pause'?'pause':'title';showOverlay('settings');}
    else if(a==='setdone'){if(settingsBack==='pause'){showOverlay('pause');}else showOverlay('title');}
    else if(a==='profiles'){confirmDel=null;showOverlay('profiles');}
    else if(a==='addp'){const nm=(($('pname')||{}).value||'').trim();if(!nm){const f=$('pname');if(f){f.focus();f.style.borderColor='#ff9ec0';}return;}
      const id=Math.max(...PROFILES.map(x=>x.id))+1;PROFILES.push({id,name:nm,color:newP.color});PID=id;saveProfiles();newP={name:'',color:PCOLS[(PROFILES.length)%PCOLS.length]};loadProfileData();titleScene();showOverlay('title');}
    else backToTitle();
  }));
  $('overlay').classList.remove('hidden');
  $('hud').classList.toggle('show',mode==='story'&&kind!=='title');$('controls').classList.remove('show');$('coopctl').classList.remove('show');
  $('lanes').classList.remove('show');$('dhud').classList.remove('show');
}
function titleScene(){const lv=balletLevels(ballet);setLevel(lv[Math.min(getUnlocked(ballet),lv.length)-1][1]);resetLevel();cam=0;}

// ================= story map =================
const ORDER=[22,0,1,2,3,4,16,17,13,14,15,18,19,10,11,12,5,6,7,8,9,20,23,21];
const CHAPTERS=[['school',0,1],['nutcracker',1,6],['peter',6,8],['cinder',8,11],['coppelia',11,13],['beauty',13,16],['swan',16,21],['firebird',21,24]];
let stars=[],crowns=[],avatarK=0,lastStars=0,lastPerfect=false;
crowns=[];try{crowns=JSON.parse(LS.get('crowns'))||[];}catch(e){}try{stars=JSON.parse(LS.get('stars'))||[];const a=LS.get('avatarK');avatarK=a===null?0:+a;}catch(e){}
function loadProfileData(){
  refreshFull();
  dance.best=[];unlockedSwan=1;unlocked=1;best=[];stars=[];avatarK=0;for(const b in unlX)unlX[b]=1;
  try{dance.best=JSON.parse(LS.get('dance'))||[];}catch(e){}
  try{for(const b of ['beauty','cinder'])unlX[b]=+LS.get('unlocked.'+b)||1;}catch(e){}
  try{unlockedSwan=+LS.get('unlocked.swan')||1;unlocked=+LS.get('unlocked')||1;best=JSON.parse(LS.get('best'))||[];}catch(e){}
  crowns=[];try{crowns=JSON.parse(LS.get('crowns'))||[];}catch(e){}try{stars=JSON.parse(LS.get('stars'))||[];const a=LS.get('avatarK');avatarK=a===null?0:+a;}catch(e){}
  if(window.onProfileLoad)onProfileLoad.forEach(f=>f());
}
const done=i=>(best[i]||0)>0;
const unlockedK=k=>k===0||done(ORDER[k])||done(ORDER[k-1]);
function currentK(){for(let k=0;k<ORDER.length;k++)if(!done(ORDER[k]))return k;return ORDER.length-1;}
const starOf=i=>done(i)?Math.max(1,stars[i]||0):0;
function nextInBallet(i){const k=ORDER.indexOf(i),n=ORDER[k+1];return k>=0&&n!==undefined&&LEVELS[n].ballet===LEVELS[i].ballet?n:-1;}
const CROWN=(sz=14)=>`<svg class="gcrown" width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="M3 18L2 7l5.5 4.5L12 4l4.5 7.5L22 7l-1 11z" fill="#ffd36e" stroke="#e0a030" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="14" r="1.8" fill="#ff7aa8"/></svg>`;
const STAR=(on,sz=13)=>`<svg width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="${on?'#ffd36e':'rgba(255,255,255,.25)'}" stroke="${on?'#e0a030':'none'}" stroke-width="1"/></svg>`;
const KEYB='<span class="lockb gold"><svg viewBox="0 0 24 24"><path d="M3 18l2-10 5 5 2-7 2 7 5-5 2 10z" fill="#5a3a00"/></svg></span>';
const LOCK='<span class="lockb"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2.5" fill="#fff"/><path d="M8 10V7a4 4 0 018 0v3" stroke="#fff" stroke-width="2.4" fill="none"/></svg></span>';
function totalStars(){return ORDER.reduce((a,i)=>a+starOf(i),0);}
function mapLayout(){
  const W=innerWidth,col=Math.min(440,W-40),SP=128,CH=120,BP=170,TP=170,pos=[];
  for(let k=0;k<ORDER.length;k++){const c=CHAPTERS.findIndex(([b,s,e])=>k>=s&&k<e);pos.push({yb:BP+k*SP+c*CH,x:W/2+Math.sin(k*1.15+.5)*col*.32,c});}
  const total=pos[pos.length-1].yb+TP;pos.forEach(p=>p.y=total-p.yb);
  return{W,total,pos,SP,CH};
}
function pathD(pts){
  if(!pts.length)return'';let d=`M${pts[0].x},${pts[0].y}`;
  for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
    d+=` C${p1.x+(p2.x-p0.x)/6},${p1.y+(p2.y-p0.y)/6} ${p2.x-(p3.x-p1.x)/6},${p2.y-(p3.y-p1.y)/6} ${p2.x},${p2.y}`;}
  return d;
}
function renderMap(){
  const {W,total,pos,CH}=mapLayout(),inner=$('mapinner'),cur=currentK();
  inner.style.height=total+'px';
  let h='';
  CHAPTERS.forEach(([b,s,e],c)=>{
    const th=LEVELS[ORDER[s]].theme,lowYb=c===0?0:pos[s].yb-CH*.62,highYb=c===CHAPTERS.length-1?total:pos[e].yb-CH*.62;
    h+=`<div class="band" style="top:${total-highYb}px;height:${highYb-lowYb}px;background:linear-gradient(0deg,${th.bg[2]},${th.bg[1]} 55%,${th.bg[0]})"></div>`;
    if(c>0){const pth=LEVELS[ORDER[CHAPTERS[c-1][1]]].theme;h+=`<div class="band" style="top:${total-lowYb-90}px;height:180px;background:linear-gradient(0deg,${pth.bg[0]},${th.bg[2]})"></div>`;}
    const itm=ICONS[LEVELS[ORDER[s]].item];
    for(let d=0;d<9;d++){const yy=total-(lowYb+40+hash(c*31+d)*(highYb-lowYb-80)),xx=12+hash(c*17+d*3)*(W-50);h+=`<div class="decor" style="left:${xx}px;top:${yy}px;animation-delay:${-hash(d+c)*3}s">${itm}</div>`;}
    h+=`<div class="banner" data-b="${b}" style="top:${total-(pos[s].yb-CH*.62)}px;cursor:pointer"><small>Chapter ${c+1} · tap for story</small><b>${BALLETS[b]}</b></div>`;
  });
  h+=`<svg class="mpath" width="${W}" height="${total}"><path d="${pathD(pos)}" stroke="rgba(255,255,255,.45)" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="1 16"/><path d="${pathD(pos.slice(0,cur+1))}" stroke="#ffd1e6" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/></svg>`;
  ORDER.forEach((i,k)=>{
    const lv=LEVELS[i],un=unlockedK(k),st=starOf(i);
    h+=`<button class="node ${un?'':'locked'} ${k===cur&&!done(i)?'cur':''}" data-k="${k}" style="left:${pos[k].x}px;top:${pos[k].y}px"><span class="nd" style="background:${lv.num}">${ICONS[lv.icon]}${un?(paid(lv.ballet)?KEYB:''):LOCK}${secrets[i]?'<span class="secretdot">'+ICONS.star.replace('#ffe27a','#fff')+'</span>':''}</span><span class="nl">${lv.name}</span><span class="ns">${done(i)?STAR(st>=1)+STAR(st>=2)+STAR(st>=3)+(crowns[i]?CROWN(15):''):''}</span></button>`;
  });
  const from=Math.min(Math.max(0,avatarK),cur),fb=LEVELS[ORDER[from]].ballet;
  h+=`<div class="avatar" id="avatar" style="left:${pos[from].x}px;top:${pos[from].y-30}px">${heroHTML(fb)}</div>`;
  inner.innerHTML=h;
  inner.querySelectorAll('.node').forEach(n=>n.addEventListener('click',()=>{const k=+n.dataset.k;if(!unlockedK(k))return;const i=ORDER[k],b=LEVELS[i].ballet;if(paid(b)){askUnlock('map');return;}if(STORY[b]&&!storySeen[b]&&balletLevels(b)[0][1]===i)showStory(b,()=>startLevel(i));else startLevel(i);}));
  inner.querySelectorAll('.banner').forEach(n=>n.addEventListener('click',()=>{const b=n.dataset.b;if(STORY[b])showStory(b,()=>openMap());}));
  {const pr=curProfile();$('mapWho').innerHTML=pdot(pr,22)+' '+pr.name+"'s map";}
  $('mapStars').innerHTML=STAR(true,14)+' '+totalStars()+'/'+ORDER.length*3;
  const sc=$('mapscroll'),vh=sc.clientHeight||innerHeight;
  sc.scrollTop=pos[from].y-vh*.55;
  if(from<cur){
    const av=$('avatar');
    setTimeout(()=>{av.classList.add('walk');av.innerHTML=heroHTML(LEVELS[ORDER[cur]].ballet);av.style.left=pos[cur].x+'px';av.style.top=(pos[cur].y-30)+'px';
      try{sc.scrollTo({top:pos[cur].y-vh*.55,behavior:'smooth'});}catch(e){sc.scrollTop=pos[cur].y-vh*.55;}},500);
    setTimeout(()=>{av.classList.remove('walk');const n=inner.querySelector(`.node[data-k="${cur}"]`);if(n){n.classList.add('pop');}sfx('item');},1950);
  }
  avatarK=cur;try{LS.set('avatarK',cur);}catch(e){}
}
function openMap(){
  for(const [b] of CHAPTERS){const bl=balletLevels(b);if(bl.length&&done(bl[bl.length-1][1]))grantReward(b);}if(crowns.filter(Boolean).length>=5)grantReward('crowns5');
  grandfather();
  ensureAudio();mode='story';musicStart=0;state='map';for(const k in keys)keys[k]=false;
  $('overlay').classList.add('hidden');$('hud').classList.remove('show');$('controls').classList.remove('show');$('coopctl').classList.remove('show');
  $('lanes').classList.remove('show');$('dhud').classList.remove('show');
  $('map').classList.remove('hidden');renderMap();
}
$('mkHome').addEventListener('click',()=>{mkSave();$('maker').classList.add('hidden');backToTitle();});
$('mkPlay').addEventListener('click',playCustom);
$('mkThemeBtn').addEventListener('click',()=>{const i=MTHEMES.indexOf(mk.theme);mk.theme=MTHEMES[(i+1)%MTHEMES.length];mkSave();mkRenderUI();});
$('mkClear').addEventListener('click',()=>{if($('mkClear').dataset.sure){mk=mkNew();mkSave();mkRenderUI();$('mkClear').textContent='Clear';delete $('mkClear').dataset.sure;}else{$('mkClear').textContent='Sure?';$('mkClear').dataset.sure=1;setTimeout(()=>{$('mkClear').textContent='Clear';delete $('mkClear').dataset.sure;},2500);}});
{const mc=$('mkCanvas');mc.addEventListener('pointerdown',e=>{if(mkTool==='scroll')return;e.preventDefault();mkDown=true;mkLast=null;try{mc.setPointerCapture(e.pointerId);}catch(_){}mkPaint(e,true);});
 mc.addEventListener('pointermove',e=>{if(mkDown)mkPaint(e,false);});['pointerup','pointercancel'].forEach(ev=>mc.addEventListener(ev,()=>{mkDown=false;}));}
addEventListener('resize',()=>{if(state==='maker')mkRenderUI();});
$('mapHome').addEventListener('click',()=>{$('map').classList.add('hidden');backToTitle();});
addEventListener('resize',()=>{if(state==='map')renderMap();});

function backToTitle(){
  try{speechSynthesis.cancel();}catch(e){}
  $('map').classList.add('hidden');
  mode='story';musicStart=0;state='title';
  titleScene();
  showOverlay('title');
}
function openMenu(){if(state!=='play')return;state='pause';for(const k in keys)keys[k]=false;showOverlay('pause');}
function resume(){state='play';$('overlay').classList.add('hidden');$('controls').classList.toggle('show',!coop);$('coopctl').classList.toggle('show',coop);}
function startLevel(i){
  if(LEVELS[i]&&!LEVELS[i].custom&&paid(LEVELS[i].ballet)){askUnlock(state==='map'?'map':'title');return;}
  $('map').classList.add('hidden');
  ensureAudio();setLevel(i);resetLevel();restartMusic();state='play';
  $('overlay').classList.add('hidden');$('hud').classList.add('show');$('controls').classList.toggle('show',!coop);$('coopctl').classList.toggle('show',coop);
  for(const k in keys)keys[k]=false;for(const k in keys2)keys2[k]=false;
  $('introAct').textContent=L.act;$('introName').textContent=L.name;
  const it=$('intro');it.classList.remove('play');void it.offsetWidth;it.classList.add('play');
  ballet=L.ballet;
  speak(L.act+'. '+L.name);
  if(L.hint){const lv=L;setTimeout(()=>{if(state==='play'&&L===lv){toast(L.hint,3800);speak(L.hint);}},2900);}
}

// ================= effects =================
function burst(x,y,n,colors,spd=180,life=.7,size=3,grav=300){
  if(LOWQ)n=Math.ceil(n/2);if(parts.length>400)return;
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=spd*(.4+Math.random()*.8);
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-spd*.3,life,max:life,c:colors[i%colors.length],s:size*(.6+Math.random()*.8),g:grav,spark:Math.random()<.5});}
}
function addText(x,y,t){texts.push({x,y,t,life:1});}
const SPARK=['#fff','#ffd1e3','#ffe9a8'];
const ITEMFX={daisy:['#fff','#ffd36e','#bff0a8'],key:['#ffd36e','#fff','#e8a040'],apple:['#ffd36e','#ff8a3a','#fff'],gift:['#ff8fbf','#ffe27a','#fff'],star:['#ffe27a','#fff','#ffb347'],slipper:['#cfe8ff','#fff','#9fd0ff'],gfeather:['#ffe08a','#fff','#ffb347'],feather:['#fff','#dfe9ff','#b8c8e0'],rose:['#ff5c86','#ff9ab7','#fff'],flake:['#fff','#cfe8ff','#9fd0ff'],candy:['#b06cff','#ffd36e','#fff'],truffle:['#e9b77d','#8a4a2c','#fff'],crystal:['#e9e2ff','#a99bff','#fff']};

// ================= costume shop =================
const SHOP={
 tutu:[
  ['def','Ballet costume',0,null],
  ['rose','Rose Pink',25,{tights:'#ffe1ec',suit:'#ff7aa8',tutu:'#ffd6e8',tutu2:'rgba(255,122,168,.6)',h2:'#ff9ec0'}],
  ['sky','Sky Blue',25,{tights:'#eaf4ff',suit:'#6ab4ff',tutu:'#dff0ff',tutu2:'rgba(106,180,255,.6)',h2:'#9fd0ff'}],
  ['mint','Mint Swirl',25,{tights:'#eafff6',suit:'#4fd6a8',tutu:'#dcfff2',tutu2:'rgba(79,214,168,.6)',h2:'#7fe0c0'}],
  ['sun','Sunshine',25,{tights:'#fff8e0',suit:'#ffc23c',tutu:'#fff2c8',tutu2:'rgba(255,194,60,.6)',h2:'#ffd36e'}],
  ['lav','Lavender',25,{tights:'#f6eaff',suit:'#a57aff',tutu:'#efe4ff',tutu2:'rgba(165,122,255,.6)',h2:'#c9a6ff'}],
  ['coral','Coral Reef',30,{tights:'#fff0ea',suit:'#ff7a5c',tutu:'#ffe2d8',tutu2:'rgba(255,122,92,.6)',h2:'#ff9a7c'}],
  ['night','Starry Night',45,{tights:'#d8dcff',suit:'#2e3a8a',tutu:'#4a58b8',tutu2:'rgba(30,40,110,.8)',h2:'#3a48a0'}],
  ['rainbow','Rainbow',80,{tights:'#fff',suit:'#ff7aa8',tutu:'#fff2a8',tutu2:'rgba(120,200,255,.75)',h2:'#9fd0ff',rainbow:true}],
  ['gala','Golden Gala',120,{tights:'#fff6dc',suit:'#e0a030',tutu:'#ffe9a8',tutu2:'rgba(255,211,110,.75)',h2:'#ffd36e'}],
  ['midnight','Midnight Sparkle',150,{tights:'#e6e0ff',suit:'#3a2a7a',tutu:'#6a58c8',tutu2:'rgba(200,190,255,.55)',h2:'#c9a6ff'}],
  ['sugar','Sugar Plum',0,{tights:'#f6eaff',suit:'#b05ad8',tutu:'#f2dcff',tutu2:'rgba(216,168,255,.65)',h2:'#d8a8ff'},'nutcracker'],
  ['bird','Meadow Bird',0,{tights:'#eafaff',suit:'#4fb8e8',tutu:'#dff4ff',tutu2:'rgba(79,184,232,.6)',h2:'#9fdcff'},'peter'],
  ['glass','Glass Slipper',0,{tights:'#f0f8ff',suit:'#8fc8ff',tutu:'#eef6ff',tutu2:'rgba(200,230,255,.8)',h2:'#cfe8ff'},'cinder'],
  ['doll','Wind-up Doll',0,{tights:'#fff',suit:'#e8483a',tutu:'#fff0ea',tutu2:'rgba(232,72,58,.55)',h2:'#ff8a7a'},'coppelia'],
  ['briar','Briar Rose',0,{tights:'#fff0f4',suit:'#ff6f9f',tutu:'#ffe0ea',tutu2:'rgba(255,211,110,.6)',h2:'#ffd36e'},'beauty'],
  ['swanq','Swan Queen',0,{tights:'#ffffff',suit:'#f4f6ff',tutu:'#ffffff',tutu2:'rgba(207,216,255,.8)',h2:'#cfd8ff'},'swan'],
  ['fire','Firebird',0,{tights:'#fff0e0',suit:'#ff5a2a',tutu:'#ffb066',tutu2:'rgba(255,211,110,.7)',h2:'#ffd36e'},'firebird'],
  ['black','Black Swan',0,{tights:'#d8d0e8',suit:'#1a1424',tutu:'#2a2236',tutu2:'rgba(80,60,110,.8)',h2:'#3a2e4e'},'crowns5']],
 head:[
  ['def','Ballet headpiece',0,null],
  ['bow','Pink Bow',20,'bow'],
  ['flower','Flower Crown',35,'flower'],
  ['star','Star Clip',35,'star'],
  ['gold','Golden Tiara',50,'tiara'],
  ['bunny','Bunny Ears',40,'bunny'],
  ['cat','Kitty Ears',40,'cat'],
  ['swanf','Swan Feathers',45,'swan']],
 trail:[
  ['none','No trail',0,null],
  ['hearts','Heart Trail',50,'heart'],
  ['stars','Star Trail',50,'star'],
  ['bubbles','Bubble Trail',50,'bubble'],
  ['rainbowt','Rainbow Trail',80,'rainbow']]
};
let coins=0,owned={},outfit={tutu:'def',head:'def',trail:'none'},shopTab='tutu',lastCoins=0,shopMsg='';
function loadSecrets(){secrets=[];try{secrets=JSON.parse(LS.get('secrets'))||[];}catch(e){}}
onProfileLoad.push(loadSecrets);
function loadShop(){coins=0;owned={};outfit={tutu:'def',head:'def',trail:'none'};
  try{const c=LS.get('coins');coins=c===null?30:+c;owned=JSON.parse(LS.get('owned'))||{};Object.assign(outfit,JSON.parse(LS.get('outfit'))||{});}catch(e){}}
onProfileLoad.push(loadShop);
function saveShop(){LS.set('coins',coins);LS.set('owned',JSON.stringify(owned));LS.set('outfit',JSON.stringify(outfit));}
const shopItem=(cat,id)=>SHOP[cat].find(x=>x[0]===id);
function costumeFor(b){
  const base=Object.assign({},COST[b]||COST.nutcracker);
  const t=shopItem('tutu',outfit.tutu);if(t&&t[3])Object.assign(base,t[3]);
  const h=shopItem('head',outfit.head);if(h&&h[3]){base.head=h[3];if(h[3]==='tiara')base.tiara='#ffd36e';}
  return base;
}
const SPK='<svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="#ffe27a"/></svg>';
function shopHTML(){
  const cats=[['tutu','Tutus'],['head','Crowns'],['trail','Trails']];
  const prevB=LEVELS[ORDER[currentK()]].ballet;
  return `<div class="eyebrow">${curProfile().name}'s wardrobe</div><div class="shophero">${heroHTML(prevB)}</div><div class="coins">${SPK.replace(/14/g,'20')} ${coins} sparkles</div>
  <div class="seg">${cats.map(([k,n])=>`<button data-stab="${k}" class="${shopTab===k?'on':''}">${n}</button>`).join('')}</div>
  <div class="shopgrid">`+SHOP[shopTab].map(([id,nm,price,val])=>{
    const own=(price===0&&!SHOP[shopTab].find(x=>x[0]===id)[4])||owned[shopTab+':'+id],wear=outfit[shopTab]===id;
    let sw='';
    if(shopTab==='tutu'){const v=val||COST[prevB];sw=`<span class="swatch" style="background:${val&&val.rainbow?'linear-gradient(135deg,#ff7aa8,#ffd36e,#7fe0c0,#9fd0ff,#c9a6ff)':`linear-gradient(135deg,${v.suit},${v.h2})`}"></span>`;}
    else if(shopTab==='head')sw=`<span class="swatch hs">${headIcon(val||(COST[prevB].head))}</span>`;
    else sw=`<span class="swatch hs">${trailIcon(val)}</span>`;
    const rq=SHOP[shopTab].find(x=>x[0]===id)[4],locked=rq&&!own;
    return `<button class="sitem ${wear?'wear':''} ${locked?'reward':''}" data-buy="${id}">${sw}<b>${nm}</b><small>${wear?'Wearing':own?'Tap to wear':locked?(rq==='crowns5'?CROWN(11)+' Win 5 gold crowns':'Finish '+BALLETS[rq]):SPK+' '+price}</small></button>`;}).join('')+
  `</div><div class="shopmsg">${shopMsg}</div><button class="cta" data-a="acts">Done</button>`;
}
function headIcon(h){
  const m={bow:'<path d="M12 12L3 7v10zM12 12l9-5v10z" fill="#ff7aa8"/><circle cx="12" cy="12" r="2.5" fill="#ff5c86"/>',
    flower:'<g fill="#ff9ec0"><circle cx="5" cy="14" r="3"/><circle cx="12" cy="10" r="3"/><circle cx="19" cy="14" r="3"/></g><g fill="#ffe27a"><circle cx="5" cy="14" r="1.2"/><circle cx="12" cy="10" r="1.2"/><circle cx="19" cy="14" r="1.2"/></g><path d="M2 17q10-6 20 0" stroke="#7fd39a" stroke-width="2" fill="none"/>',
    star:'<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="#ffe27a"/>',
    tiara:'<path d="M3 18L2 8l5 4 5-8 5 8 5-4-1 10z" fill="#ffd36e"/><circle cx="12" cy="13" r="2" fill="#ff7aa8"/>',
    bunny:'<ellipse cx="8" cy="10" rx="3" ry="8" fill="#fff"/><ellipse cx="16" cy="10" rx="3" ry="8" fill="#fff"/><ellipse cx="8" cy="10" rx="1.4" ry="5.5" fill="#ffb3cf"/><ellipse cx="16" cy="10" rx="1.4" ry="5.5" fill="#ffb3cf"/>',
    cat:'<path d="M3 20L6 4l7 9zM21 20L18 4l-7 9z" fill="#4a2c2c"/><path d="M6 16l1.2-7 3.5 4.5zM18 16l-1.2-7-3.5 4.5z" fill="#ffb3cf"/>',
    swan:'<ellipse cx="6" cy="12" rx="5" ry="2" transform="rotate(-30 6 12)" fill="#fff"/><ellipse cx="18" cy="12" rx="5" ry="2" transform="rotate(30 18 12)" fill="#fff"/><ellipse cx="12" cy="7" rx="2" ry="5" fill="#fff"/>'};
  return `<svg viewBox="0 0 24 24">${m[h]||m.bow}</svg>`;
}
function trailIcon(t){
  const m={heart:'<path d="M12 21s-7.6-4.6-9.6-9.3C.9 8.2 3.2 4.6 6.7 4.6c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.5 0 5.8 3.6 4.3 7.1C19.6 16.4 12 21 12 21z" fill="#ff7aa8"/>',
    star:'<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" fill="#ffe27a"/>',
    bubble:'<circle cx="9" cy="13" r="6" fill="rgba(160,210,255,.3)" stroke="#cfe8ff" stroke-width="1.5"/><circle cx="17" cy="7" r="3.5" fill="rgba(160,210,255,.3)" stroke="#cfe8ff" stroke-width="1.5"/>',
    rainbow:'<path d="M3 18a9 9 0 0118 0" stroke="#ff7aa8" stroke-width="2.4" fill="none"/><path d="M6 18a6 6 0 0112 0" stroke="#ffd36e" stroke-width="2.4" fill="none"/><path d="M9 18a3 3 0 016 0" stroke="#7fe0c0" stroke-width="2.4" fill="none"/>'};
  return `<svg viewBox="0 0 24 24">${m[t]||'<circle cx="12" cy="12" r="7" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2" stroke-dasharray="3 3"/>'}</svg>`;
}
let lastGift=null;
function grantReward(req){const it=SHOP.tutu.find(x=>x[4]===req);if(!it||owned['tutu:'+it[0]])return null;owned['tutu:'+it[0]]=1;saveShop();return it;}
function shopTap(id){
  const it=shopItem(shopTab,id),key=shopTab+':'+id,own=(it[2]===0&&!it[4])||owned[key];
  if(!own&&it[4]){shopMsg=it[4]==='crowns5'?'Win 5 gold crowns to unlock the Black Swan!':`Finish ${BALLETS[it[4]]} on the story map to unlock it!`;sfx('tick');}
  else if(own){outfit[shopTab]=id;shopMsg='';sfx('item');}
  else if(coins>=it[2]){coins-=it[2];owned[key]=1;outfit[shopTab]=id;shopMsg=`You got the ${it[1]}!`;sfx('chimeup');}
  else{shopMsg=`You need ${it[2]-coins} more sparkles — collect more in the story!`;sfx('hurt');}
  saveShop();showOverlay.keep=true;showOverlay('shop');
}
let trailT=0;
function emitTrail(p,dt){
  const tr=shopItem('trail',outfit.trail);if(!tr||!tr[3])return;
  if(Math.abs(p.vx)<40&&p.onGround)return;
  trailT-=dt;if(trailT>0)return;trailT=.06;
  const shape=tr[3],hue=(time*240)%360;
  parts.push({x:p.x+p.w/2+(Math.random()-.5)*10,y:p.y+p.h-10+(Math.random()-.5)*10,vx:-p.vx*.1+(Math.random()-.5)*20,vy:-20-Math.random()*30,life:.9,max:.9,
    c:shape==='heart'?'#ff7aa8':shape==='star'?'#ffe27a':shape==='bubble'?'#cfe8ff':`hsl(${hue},90%,72%)`,s:shape==='bubble'?4+Math.random()*3:3.2,g:-20,spark:false,shape:shape==='rainbow'?'dot':shape});
}

// ================= story pages =================
const STORY={
 school:[['Welcome to the Ballet School! Every great ballerina starts right here.','pointe'],['Your fairy teacher will show you how to leap, spin and stomp. Then the big stage awaits!','star']],
 peter:[['Peter lives by a big green meadow with his friends the bird, the duck and the cat.','daisy'],['Grandfather warns him: never go into the meadow alone — the wolf might come!','paw'],['Dance across the meadow, help your friends, and catch the wolf!','tree']],
 coppelia:[['In a little village, old Dr. Coppélius builds amazing wind-up dolls.','key'],['His favourite, Coppélia, sits so still in the window that everyone thinks she is real!','gear'],['Sneak through the toy workshop and up to the attic to discover his secret!','crown']],
 firebird:[['In an enchanted garden grows a tree of golden apples, guarded by the magical Firebird.','apple'],['The Firebird gives you a glowing feather — it lets you leap twice, as if you could fly!','flame'],['Use it to defeat the wicked sorcerer Koschei and free his castle!','owlc']],
 nutcracker:[['On Christmas Eve, Clara is given a wooden Nutcracker doll.','rosew'],['At midnight the toys come alive — and the Mouse King’s army marches in!','crown'],['Dance through the party, the snowy forest and the Land of Sweets to save the Nutcracker Prince!','candy']],
 cinder:[['Cinderella works all day in the kitchen while her stepsisters get ready for the royal ball.','star'],['Her Fairy Godmother waves her wand — and a pumpkin becomes a carriage!','pumpkin'],['But the magic ends at midnight. Dance fast — and watch out for the wicked stepmother!','clock']],
 beauty:[['At Princess Aurora’s christening, the good fairies bring wonderful gifts.','gift'],['But the wicked fairy Carabosse casts a curse: one prick from a spindle and Aurora will sleep for 100 years.','owlc'],['Dance past the spindles, through the thorny forest, and break the curse!','rosew']],
 swan:[['By a moonlit lake, Prince Siegfried meets Odette — a princess turned into a swan.','swan'],['The sorcerer Von Rothbart cast the spell, and only true love can break it.','owlc'],['Spread your wings, brave the storm, and dance until the sun rises!','sun']]
};
let storyB=null,storyPage=0,storyThen=null,storySeen={};
function loadStory(){storySeen={};try{storySeen=JSON.parse(LS.get('story'))||{};}catch(e){}}
onProfileLoad.push(loadStory);
function showStory(b,then){storyB=b;storyPage=0;storyThen=then;storySeen[b]=1;LS.set('story',JSON.stringify(storySeen));
  $('map').classList.add('hidden');state='story';showOverlay('story');}
function storyHTML(){
  const pages=STORY[storyB],[txt,ic]=pages[storyPage],lvls=balletLevels(storyB),th=lvls[Math.min(storyPage,lvls.length-1)][0].theme,last=storyPage===pages.length-1;
  return `<div class="eyebrow">${BALLETS[storyB]} · Page ${storyPage+1}</div>
  <div class="storyart" style="background:linear-gradient(180deg,${th.bg[0]},${th.bg[1]} 60%,${th.bg[2]})">
    ${[0,1,2,3,4,5].map(k=>`<span class="sfl" style="left:${8+k*16}%;top:${15+(k%3)*22}%;animation-delay:${-k*.7}s">${ICONS[LEVELS[lvls[0][1]].item]}</span>`).join('')}
    <div class="sicon">${ICONS[ic]}</div><div class="shero">${heroHTML(storyB)}</div>
  </div>
  <p class="stxt">${txt}</p>
  <div class="sdots">${pages.map((_,i)=>`<i class="${i===storyPage?'on':''}"></i>`).join('')}</div>
  <button class="cta" data-a="snext">${last?'Let’s dance!':'Next'}</button>${last?'':'<button class="ghost" data-a="sskip">Skip</button>'}`;
}

// ================= level maker =================
const MCOLS=80,MTHEMES=[0,1,2,3,4,5,10,13,15,16,18,20];
const MTOOLS=[['scroll','Move','#9fd0ff'],[1,'Ground','#8a6a5a'],[2,'Platform','#ffd1e3'],[4,'Bouncy','#7fe0c0'],[3,'Ice','#a8e4ff'],[5,'Glass','#c9a6ff'],[9,'Belt','#ffd36e'],[6,'Thorns','#8a5a9e'],['item','Item','#ffe27a'],['enemy','Enemy','#ff7aa8'],['start','Start','#ffffff'],['goal','Goal','#ffe9a8'],[0,'Erase','#555']];
let mk=null,mkSlot=0,mkTool=1,mkDown=false,mkCS=32,customIdx=-1,mkLast=null;
function mkNew(){const g=[];for(let y=0;y<ROWS;y++)g.push(Array(MCOLS).fill(y>=10?1:0));return{theme:0,grid:g,items:[[6,9],[7,9],[8,9]],enemies:[[20,10]],start:2,goal:76};}
function mkLoad(slot){try{const d=JSON.parse(LS.get('mylevel'+slot));if(d&&d.grid)return d;}catch(e){}return mkNew();}
function mkSave(){LS.set('mylevel'+mkSlot,JSON.stringify(mk));}
function openMaker(slot){
  if(slot!==undefined)mkSlot=slot;mk=mkLoad(mkSlot);
  ensureAudio();musicStart=0;mode='story';state='maker';
  $('overlay').classList.add('hidden');$('hud').classList.remove('show');$('controls').classList.remove('show');$('coopctl').classList.remove('show');$('map').classList.add('hidden');
  $('maker').classList.remove('hidden');mkRenderUI();requestAnimationFrame(mkDraw);
}
function mkRenderUI(){
  $('mkSlots').innerHTML=[0,1,2].map(i=>`<button class="${i===mkSlot?'on':''}" data-slot="${i}">Level ${i+1}</button>`).join('');
  $('mkTheme').textContent=LEVELS[mk.theme].name;
  $('mkTools').innerHTML=MTOOLS.map(([id,nm,c])=>`<button class="mtool ${mkTool===id?'on':''}" data-tool="${id}"><i style="background:${c}"></i>${nm}</button>`).join('');
  $('mkSlots').querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{mkSave();openMaker(+b.dataset.slot);});
  $('mkTools').querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{const t=b.dataset.tool;mkTool=isNaN(+t)?t:+t;mkRenderUI();});
  const cv2=$('mkCanvas'),wrap=$('mkWrap');
  mkCS=Math.max(22,Math.min(54,Math.floor((wrap.clientHeight||300)/ROWS)));
  cv2.width=MCOLS*mkCS*DPR;cv2.height=ROWS*mkCS*DPR;cv2.style.width=MCOLS*mkCS+'px';cv2.style.height=ROWS*mkCS+'px';
  cv2.style.touchAction=mkTool==='scroll'?'pan-x':'none';
  mkDraw();
}
function mkDraw(){
  if(!mk)return;const c=$('mkCanvas').getContext('2d'),cs=mkCS,th=LEVELS[mk.theme].theme;
  c.setTransform(DPR,0,0,DPR,0,0);
  const g=c.createLinearGradient(0,0,0,ROWS*cs);g.addColorStop(0,th.bg[0]);g.addColorStop(.6,th.bg[1]);g.addColorStop(1,th.bg[2]);c.fillStyle=g;c.fillRect(0,0,MCOLS*cs,ROWS*cs);
  c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=1;
  for(let x=0;x<=MCOLS;x++){c.beginPath();c.moveTo(x*cs+.5,0);c.lineTo(x*cs+.5,ROWS*cs);c.stroke();}
  for(let y=0;y<=ROWS;y++){c.beginPath();c.moveTo(0,y*cs+.5);c.lineTo(MCOLS*cs,y*cs+.5);c.stroke();}
  const col={1:th.body,2:th.oneway,3:'#a8e4ff',4:'#7fe0c0',5:'#c9a6ff',6:'#8a5a9e',9:'#ffd36e'};
  for(let y=0;y<ROWS;y++)for(let x=0;x<MCOLS;x++){const v=mk.grid[y][x];if(!v)continue;c.fillStyle=col[v]||'#888';
    if(v===2||v===5){c.beginPath();c.roundRect(x*cs+1,y*cs+1,cs-2,cs*.3,cs*.15);c.fill();}
    else if(v===4){c.beginPath();c.roundRect(x*cs+3,y*cs+4,cs-6,cs-4,[cs*.4,cs*.4,3,3]);c.fill();}
    else if(v===6){c.beginPath();for(let k=0;k<3;k++){c.moveTo(x*cs+k*cs/3,y*cs+cs);c.lineTo(x*cs+k*cs/3+cs/6,y*cs+cs*.35);c.lineTo(x*cs+(k+1)*cs/3,y*cs+cs);}c.fill();}
    else{c.fillRect(x*cs,y*cs,cs,cs);if(!y||mk.grid[y-1][x]!==v){c.fillStyle=v===1?th.top:'rgba(255,255,255,.6)';c.fillRect(x*cs,y*cs,cs,cs*.14);}if(v===9){c.fillStyle='#5a5a6a';c.fillRect(x*cs,y*cs+cs*.3,cs,cs*.2);}}}
  const icon=(svg,x,y,sz)=>{const im=new Image();im.onload=()=>c.drawImage(im,x,y,sz,sz);im.src='data:image/svg+xml;utf8,'+encodeURIComponent(svg.replace(/width="\d+" height="\d+"/,'width="24" height="24"'));};
  for(const [x,y] of mk.items){const cx=x*cs+cs/2,cy=y*cs+cs/2;c.fillStyle='rgba(255,227,122,.3)';c.beginPath();c.arc(cx,cy,cs*.42,0,7);c.fill();c.fillStyle='#ffe27a';c.strokeStyle='#fff';c.lineWidth=1.2;c.beginPath();for(let k=0;k<10;k++){const r=(k%2?.16:.34)*cs,a=k*Math.PI/5-Math.PI/2;c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);}c.closePath();c.fill();c.stroke();}
  for(const [x,y] of mk.enemies){c.fillStyle='#ff7aa8';c.beginPath();c.roundRect(x*cs+cs*.15,(y-1)*cs+cs*.25,cs*.7,cs*.7,cs*.2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x*cs+cs*.38,(y-1)*cs+cs*.5,cs*.08,0,7);c.arc(x*cs+cs*.62,(y-1)*cs+cs*.5,cs*.08,0,7);c.fill();}
  const flag=(x,clr,txt)=>{c.fillStyle=clr;c.fillRect(x*cs+cs*.45,6*cs,3,4*cs);c.beginPath();c.moveTo(x*cs+cs*.45+3,6*cs);c.lineTo(x*cs+cs*1.3,6*cs+cs*.4);c.lineTo(x*cs+cs*.45+3,6*cs+cs*.8);c.fill();c.font=`700 ${Math.round(cs*.36)}px Fredoka, sans-serif`;c.fillStyle='#fff';c.textAlign='center';c.fillText(txt,x*cs+cs*.5,6*cs-6);};
  flag(mk.start,'#ff9ec0','START');flag(mk.goal,'#ffd36e','GOAL');
}
function mkCell(e){const r=$('mkCanvas').getBoundingClientRect();return[Math.floor((e.clientX-r.left)/mkCS),Math.floor((e.clientY-r.top)/mkCS)];}
function mkPaint(e,first){
  if(mkTool==='scroll')return;const[x,y]=mkCell(e);if(x<0||y<0||x>=MCOLS||y>=ROWS)return;
  const key=x+','+y+','+mkTool;if(!first&&key===mkLast)return;mkLast=key;
  const rm=arr=>{const i=arr.findIndex(q=>q[0]===x&&q[1]===y);if(i>=0){arr.splice(i,1);return true;}return false;};
  if(typeof mkTool==='number'){if(mkTool===0){if(!rm(mk.items)&&!rm(mk.enemies))mk.grid[y][x]=0;}else mk.grid[y][x]=mkTool;}
  else if(!first)return;
  else if(mkTool==='item'){if(!rm(mk.items))mk.items.push([x,y]);}
  else if(mkTool==='enemy'){if(!rm(mk.enemies))mk.enemies.push([x,Math.min(ROWS-1,y+1)]);}
  else if(mkTool==='start')mk.start=x;else if(mkTool==='goal')mk.goal=Math.max(x,4);
  sfx('tick');mkSave();mkDraw();
}
function playCustom(){
  mkSave();const base=LEVELS[mk.theme],d=JSON.parse(JSON.stringify(mk));
  const lv=Object.assign({},base,{ballet:'custom',custom:true,act:'My level',name:curProfile().name+'’s Level '+(mkSlot+1),friends:null,arena:null,timer:0,hint:'',finale:'',goal:d.goal,cps:[d.start],wind:false,lightning:false,
    build({fill,item,en}){for(let y=0;y<ROWS;y++)for(let x=0;x<MCOLS;x++)if(d.grid[y][x])fill(x,x,y,y,d.grid[y][x]);for(const[x,y]of d.items)item(x,y);for(const[x,y]of d.enemies)en(x,y);}});
  if(customIdx<0){customIdx=LEVELS.length;LEVELS.push(lv);}else LEVELS[customIdx]=lv;
  $('maker').classList.add('hidden');startLevel(customIdx);
}

// ================= cloud save + backup =================
const cloud={ref:null,status:'off',pushT:null,pushing:false,last:0};
function collectStore(){const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('prima.')&&k!=='prima.savedAt')o[k]=localStorage.getItem(k);}}catch(e){}return o;}
function markDirty(){try{localStorage.setItem('prima.savedAt',String(Date.now()));}catch(e){}if(window.PrimaNative)PrimaNative.saveMirror(collectStore());if(cloud.ref){clearTimeout(cloud.pushT);cloud.pushT=setTimeout(pushCloud,4000);}}
async function pushCloud(){
  if(!cloud.ref)return;if(cloud.pushing){clearTimeout(cloud.pushT);cloud.pushT=setTimeout(pushCloud,2000);return;}
  cloud.pushing=true;try{const savedAt=+(localStorage.getItem('prima.savedAt')||Date.now());await cloud.ref.set({savedAt,store:collectStore()});cloud.status='on';cloud.last=Date.now();}
  catch(e){cloud.status=(e&&e.code==='unavailable')?'retry':'error';if(e&&e.code==='unavailable'){clearTimeout(cloud.pushT);cloud.pushT=setTimeout(pushCloud,8000);}}
  cloud.pushing=false;
}
function applyStore(store,savedAt){
  try{for(const k of Object.keys(collectStore()))if(!(k in store))localStorage.removeItem(k);for(const k in store)localStorage.setItem(k,store[k]);if(savedAt)localStorage.setItem('prima.savedAt',String(savedAt));}catch(e){}
  try{PROFILES=JSON.parse(localStorage.getItem('prima.profiles'))||PROFILES;PID=+localStorage.getItem('prima.activeProfile')||0;if(!PROFILES.some(x=>x.id===PID))PID=PROFILES[0].id;}catch(e){}
  loadProfileData();if(state==='title'){titleScene();showOverlay.keep=true;showOverlay('title');}
}
async function initCloud(){
  try{
    if(!window.claude||typeof claude.use!=='function')return;
    const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);if(!db||!user)return;
    const id=await user.id();if(!id)return;
    const ref=db.doc('data/users/'+id+'/prima');cloud.status='syncing';
    const snap=await ref.get();cloud.ref=ref;
    const local=+(localStorage.getItem('prima.savedAt')||0);
    if(snap.exists){const d=snap.data()||{};
      if((d.savedAt||0)>local&&d.store){applyStore(d.store,d.savedAt);toast('Your progress was loaded from the cloud',2400);}
      else if(local>(d.savedAt||0))pushCloud();}
    else pushCloud();
    cloud.status='on';
  }catch(e){cloud.status='off';}
}
function backupCode(){const json=JSON.stringify({v:1,store:collectStore()});return 'PRIMA-'+btoa(unescape(encodeURIComponent(json)));}
function restoreCode(code){
  try{const raw=code.trim().replace(/^PRIMA-/,'');const d=JSON.parse(decodeURIComponent(escape(atob(raw))));if(!d||!d.store)throw 0;applyStore(d.store,Date.now());markDirty();return true;}catch(e){return false;}
}
function backupTile(it){return it('backup','<svg viewBox="0 0 24 24"><path d="M7 18a5 5 0 01-.5-10A6 6 0 0118 9a4 4 0 01-1 9z" fill="#fff"/><path d="M12 16V10m-3 3l3-3 3 3" stroke="#5a7ad0" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>','Saves',cloud.ref?'Cloud save on':'This device only','linear-gradient(135deg,#bfe6ff,#6a9ad0)');}
let backupMsg='';
function backupHTML(){
  const st=cloud.ref?(cloud.status==='error'?'<b style="color:#ffb3b3">Cloud save had a problem</b> — your progress is still saved on this device.':'<b>Cloud save is on.</b> Progress for every player is saved to your Claude account and follows you to any device where you open Prima.'):'<b>Cloud save is off here</b> — progress is saved on this device only. Use a backup code to move it.';
  return `<div class="eyebrow">Keep your progress safe</div><h1 style="font-size:44px">Saves</h1>
  <div class="sub" style="margin-top:12px;text-align:left;font-size:14px">${st}${cloud.last?'<br><small style="opacity:.6">Last saved '+new Date(cloud.last).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})+'</small>':''}</div>
  <div class="seglabel">Backup code</div><textarea class="field codebox" id="bcode" rows="3" readonly>${backupCode()}</textarea>
  <button class="cta" data-a="bcopy" style="margin-top:12px">Copy backup code</button>
  <div class="seglabel">Restore from a code</div><textarea class="field codebox" id="bin" rows="3" placeholder="Paste a backup code here"></textarea>
  <button class="ghost" data-a="brestore" style="font-weight:600;opacity:.9">Restore this code</button>
  <div class="shopmsg">${backupMsg}</div><button class="ghost" data-a="acts">Done</button>`;
}

// ================= achievements =================
const ACH=[
 ['first','First Curtsy','Finish your very first act','rosew','#ff9ec0,#ff5c86'],
 ['nohurt','Not a Scratch','Finish an act without getting hurt','heart','#ff9ab7,#d24a62'],
 ['allitems','Treasure Keeper','Collect every item in an act','gift','#ffd36e,#ff8f5c'],
 ['stars3','Shining Star','Earn 3 stars on an act','star','#ffe27a,#f2a64d'],
 ['beat10','Perfect Rhythm','10 on-beat leaps in a row','note','#c9a6ff,#7a5ad0'],
 ['stomp25','Tiptoe Stomper','Stomp 25 enemies','boot','#9fd0ff,#5a7ad0'],
 ['spin10','Twirl Away','Spin 10 enemies off the stage','spin','#7fe0c0,#3f9a7a'],
 ['king','Nutcracker Hero','Defeat the Mouse King','crown','#ffd36e,#b8235a'],
 ['carabosse','Curse Breaker','Defeat Carabosse','crystal','#9fe0a0,#2e5a3e'],
 ['rothbart','Swan Queen','Defeat Von Rothbart','swan','#eaf2ff,#5a7ab0'],
 ['stepmother','Happily Ever After','Outsmart the wicked stepmother','slipper','#cfe8ff,#7a5ad0'],
 ['midnight','Before Midnight','Finish the Midnight Ball with 30 seconds to spare','clock','#cfe8ff,#5a7ad0'],
 ['ch_nutcracker','Nutcracker Star','Finish every Nutcracker act','rosew','#ff9ec0,#7d3f80'],
 ['ch_cinder','Glass Slipper','Finish every Cinderella act','slipper','#cfe8ff,#4a5aa0'],
 ['ch_beauty','Wide Awake','Finish every Sleeping Beauty act','gift','#d9a6ff,#5a2f5a'],
 ['ch_school','Graduate','Finish your first ballet class','pointe','#ffd6e6,#ff9ec0'],
 ['ch_peter','Wolf Catcher','Finish Peter and the Wolf','paw','#bff0a8,#3f9a5c'],
 ['ch_coppelia','Toymaker\u2019s Friend','Finish every Copp\u00e9lia act','key','#ffd08a,#b8603a'],
 ['ch_firebird','Phoenix Dancer','Finish The Firebird','flame','#ffd08a,#d8402a'],
 ['wolf','Brave as Peter','Catch the wolf','paw','#a8c890,#2e4a3e'],
 ['coppelius','Secret Solver','Outsmart Dr. Copp\u00e9lius','gear','#d8b8a0,#4a3848'],
 ['koschei','Firebird\u2019s Friend','Defeat Koschei','flame','#8affb0,#d8402a'],
 ['ch_swan','Lake Legend','Finish every Swan Lake act','tree','#cfe8d4,#2c5a3c'],
 ['collector','Collector','Collect 500 items in total','trophy','#ffe27a,#c0703a'],
 ['danceS','Prima Ballerina','Get an S grade in Dance Battle','note','#ffb3d0,#ff6f9f'],
 ['duel','Dance-Off','Finish a 2-player Dance Battle','heart','#ffd36e,#c9a6ff'],
 ['secret5','Secret Seeker','Find 5 secret golden stars','star','#ffe27a,#b8860b'],
 ['allstars','Superstar','Earn every star on the map','star','#ffe27a,#ff6f9f'],
];
let ach={},stats={items:0,stomps:0,spins:0,streak:0},levelHurt=false;
function loadAch(){ach={};stats={items:0,stomps:0,spins:0,streak:0};try{ach=JSON.parse(LS.get('ach'))||{};Object.assign(stats,JSON.parse(LS.get('stats'))||{});}catch(e){}}
onProfileLoad.push(loadAch);
const saveStats=()=>LS.set('stats',JSON.stringify(stats));
const badgeQ=[];let badgeBusy=false;
function award(id){
  if(ach[id])return;const a=ACH.find(x=>x[0]===id);if(!a)return;
  ach[id]=Date.now();LS.set('ach',JSON.stringify(ach));badgeQ.push(a);if(!badgeBusy)nextBadge();
}
function nextBadge(){
  const a=badgeQ.shift();if(!a){badgeBusy=false;return;}badgeBusy=true;
  speak('Badge unlocked! '+a[1]);
  const el=$('badgeToast');if(!el){badgeBusy=false;return;}const[c1,c2]=a[4].split(',');
  el.innerHTML=`<span class="bicon" style="background:linear-gradient(135deg,${c1},${c2})">${ICONS[a[3]]}</span><span><small>Badge unlocked!</small><b>${a[1]}</b></span>`;
  el.classList.remove('show');void el.offsetWidth;el.classList.add('show');sfx('chimeup');
  setTimeout(()=>{el.classList.remove('show');setTimeout(nextBadge,450);},2600);
}
function checkWinBadges(){
  award('first');if(!levelHurt)award('nohurt');if(items.length&&itemCount>=items.length)award('allitems');if(lastStars>=3)award('stars3');
  if(L.timer&&timeLeft>=30)award('midnight');
  stats.items+=itemCount;saveStats();if(stats.items>=500)award('collector');
  for(const b of Object.keys(BALLETS))if(balletLevels(b).every(([,i])=>done(i)))award('ch_'+b);
  if(totalStars()>=ORDER.length*3)award('allstars');
}
function badgesHTML(){
  const n=ACH.filter(a=>ach[a[0]]).length;
  return `<div class="eyebrow">${curProfile().name}'s badges</div><h1 style="font-size:44px">Badges</h1><div class="progress">${n} of ${ACH.length} earned</div><div class="bgrid2">`+
    ACH.map(([id,nm,ds,ic,cc],i)=>{const[c1,c2]=cc.split(','),got=ach[id];return `<div class="badge ${got?'got':''}" style="animation-delay:${i*.03}s"><span class="bicon" style="background:${got?`linear-gradient(135deg,${c1},${c2})`:'rgba(255,255,255,.1)'}">${ICONS[ic]}</span><b>${nm}</b><small>${ds}</small></div>`;}).join('')+
    `</div><button class="cta" data-a="acts">Done</button>`;
}


// ================= curtain call (ending) =================
let endPage=0;
const ENDING=[
  ['The Firebird spreads her glowing wings, and Koschei\u2019s spell is broken at last.','firebird'],
  ['One by one, everyone you danced with arrives at the grand theatre.','all'],
  ['The curtain rises one last time. The whole audience stands and cheers: Bravo, Prima!','bow']];
function endingHTML(){
  const [txt,kind]=ENDING[endPage],last=endPage===ENDING.length-1,th=LEVELS[21].theme;
  const heroes=['nutcracker','peter','cinder','coppelia','beauty','swan','firebird'];
  let art='';
  if(kind==='firebird')art=`<div class="shero">${heroHTML('firebird')}</div>`;
  else art=`<div class="ehero">${heroes.map((b,i)=>`<span style="animation-delay:${.12*i}s">${heroHTML(b)}</span>`).join('')}</div>`;
  const st=totalStars(),cr=crowns.filter(Boolean).length;
  return `<div class="eyebrow">Curtain call · ${endPage+1} of ${ENDING.length}</div>
  <div class="storyart ${kind==='bow'?'curtain':''}" style="background:linear-gradient(180deg,${kind==='firebird'?th.bg[0]:'#2a0e2e'},${kind==='firebird'?th.bg[2]:'#6a1e3a'})">
    ${[0,1,2,3,4,5,6,7].map(k=>`<span class="sfl" style="left:${6+k*12}%;top:${10+(k%3)*20}%;animation-delay:${-k*.6}s">${ICONS.star}</span>`).join('')}${art}
  </div>
  <div class="sub" style="margin-top:16px">${txt}</div>
  ${last?`<h1 style="font-size:40px;margin-top:8px">The End</h1><div class="stats"><div class="stat"><b>${st}</b><span>Stars</span></div><div class="stat"><b>${cr}</b><span>Gold crowns</span></div></div>${cr<ORDER.length?`<div class="crownhint">${CROWN(14)} Can you win a gold crown on every station?</div>`:''}`:''}
  <button class="cta" data-u="${last?'endmap':'endnext'}">${last?'Back to the map':'Next'}</button>`;
}
function showEnding(){endPage=0;$('map').classList.add('hidden');state='story';showOverlay('ending');sfx('chimeup');}
