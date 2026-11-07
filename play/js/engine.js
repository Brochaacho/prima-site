// ================= state =================
let LI=0,L=LEVELS[0];
let windDir=1,timeLeft=0,windV=0,windStr=0,windWarn=0,flash=0,bolt=null,nextBolt=4,prince=null,waves=[],pickups=[],secret=null,fairyWake=[],powT=0,powType=null,secrets=[],drafts=[],grid,items,enemies,spawns,boss=null,bossDefeated=true,goalA=0,gum=null,movers=[],crumbles=[],lt=0;
let mode='story',dfx=[];
const dance={song:0,diff:1,players:1,turn:1,results:[],notes:[],totalBeats:0,best:[],score:0,combo:0,maxCombo:0,accSum:0,counts:null,pose:'idle',poseT:0,judge:null,flash:[0,0,0,0],over:true,fallback:0,lastSec:0,firstSec:0};
let PROFILES=[],PID=0;
try{PROFILES=JSON.parse(localStorage.getItem('prima.profiles'))||[];PID=+localStorage.getItem('prima.activeProfile')||0;}catch(e){}
if(!PROFILES.length)PROFILES=[{id:0,name:'Player 1',color:'#ff9ec0'}];
if(!PROFILES.some(x=>x.id===PID))PID=PROFILES[0].id;
function saveProfiles(){try{localStorage.setItem('prima.profiles',JSON.stringify(PROFILES));localStorage.setItem('prima.activeProfile',PID);}catch(e){}markDirty();}
const PK=k=>PID===0?'prima.'+k:'prima.p'+PID+'.'+k;
const LS={get(k){try{return localStorage.getItem(PK(k));}catch(e){return null;}},set(k,v){try{localStorage.setItem(PK(k),v);}catch(e){}markDirty();}};
var onProfileLoad=[];
const SET_DEF={gfx:'auto',music:.8,sfx:.9,shake:1,flash:true,easy:false,voice:true,csize:.35,cfade:false};
let voicePick=null,voicePrimed=false;
function pickVoice(){try{const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));const pref=['Samantha','Karen','Moira','Tessa','Google US English','Microsoft Aria','Microsoft Jenny','Female'];
  for(const n of pref){const v=vs.find(x=>x.name.includes(n));if(v)return v;}return vs[0]||null;}catch(e){return null;}}
try{if(window.speechSynthesis)speechSynthesis.onvoiceschanged=()=>{voicePick=pickVoice();};}catch(e){}
function speak(text,force){return;
  if(!text||!window.speechSynthesis||(!SET.voice&&!force)||muted)return;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.replace(/[\u2014\u00b7]/g,', '));if(!voicePick)voicePick=pickVoice();if(voicePick)u.voice=voicePick;u.rate=.95;u.pitch=1.15;u.volume=Math.max(.3,SET.sfx);speechSynthesis.speak(u);}catch(e){}
}
let SET=Object.assign({},SET_DEF);
function loadSettings(){SET=Object.assign({},SET_DEF);try{Object.assign(SET,JSON.parse(LS.get('settings'))||{});}catch(e){}applyVolumes&&applyVolumes();applyControls();}
function saveSettings(){LS.set('settings',JSON.stringify(SET));applyVolumes();applyControls();}
function applyControls(){const fit=innerWidth>innerHeight?2:(innerWidth-40)/320;document.documentElement.style.setProperty('--cs',Math.min(.8+SET.csize*.6,fit).toFixed(2));}
addEventListener('resize',()=>applyControls());
var applyVolumes=()=>{};
onProfileLoad.push(loadSettings);
const maxH=()=>SET.easy?5:3;
const curProfile=()=>PROFILES.find(x=>x.id===PID)||PROFILES[0];
try{dance.best=JSON.parse(LS.get('dance'))||[];}catch(e){}
let camY=0,camLead=0;let state='title',time=0,cam=0,score=0,hearts=3,cp=0,itemCount=0,winT=0,parts=[],texts=[],shake=0,trauma=0,hitStop=0,hurtFlash=0;
const addTrauma=a=>{trauma=Math.min(1,trauma+a);};
const freeze=d=>{hitStop=Math.max(hitStop,d);};
const easeOutBack=k=>{const c1=1.70158,c3=c1+1,m=k-1;return 1+c3*m*m*m+c1*m*m;};
const setSq=(x,y)=>{curP.sq={x,y,t:0};};
let unlocked=1,best=[0,0,0];
let unlockedSwan=1,ballet='nutcracker';const unlX={};
try{for(const b of ['beauty','cinder'])unlX[b]=+LS.get('unlocked.'+b)||1;}catch(e){}
try{unlockedSwan=+LS.get('unlocked.swan')||1;const bb=JSON.parse(LS.get('best'))||[];if(bb[7]>0)unlockedSwan=Math.max(unlockedSwan,4);}catch(e){}
try{unlocked=+LS.get('unlocked')||1;best=JSON.parse(LS.get('best'))||best;}catch(e){}
function saveProgress(){try{for(const b in unlX)LS.set('unlocked.'+b,unlX[b]);LS.set('unlocked.swan',unlockedSwan);LS.set('unlocked',unlocked);LS.set('best',JSON.stringify(best));}catch(e){}}
const DIMS={coppelius:{w:40,h:66,sp:65},wolf:{w:58,h:40,sp:95},koschei:{w:60,h:62,sp:110},imp:{w:28,h:24,sp:60},stepmother:{w:44,h:70,sp:70},raven:{w:30,h:24,sp:60},broom:{w:26,h:40,sp:60},carabosse:{w:60,h:60,sp:110},owl:{w:30,h:26,sp:50},rothbart:{w:64,h:56,sp:110},soldier:{w:24,h:40,sp:55},mouse:{w:28,h:24,sp:75},king:{w:50,h:62,sp:85}};
const player={w:22,h:46,id:1},player2={w:22,h:46,id:2,alt:true};
let coop=false,curP=player,K=null;
const keys2={left:false,right:false,jump:false,spin:false};
const activePlayers=()=>coop?[player,player2]:[player];
function nearestPlayer(e){let b=player,bd=1e9;for(const q of activePlayers()){const d=Math.abs(q.x-e.x);if(d<bd){bd=d;b=q;}}return b;}

function beatPhase(){const b=beatPos()/2;return ((b%2)+2)%2;}
function beatOn(s){const ph=beatPhase();return s===7?ph<1:ph>=1;}
function solidAt(tx,ty){if(tx<0||tx>=COLS)return 1;if(ty<0||ty>=ROWS)return 0;return grid[ty][tx];}
function buildLevel(){
  grid=Array.from({length:ROWS},()=>new Uint8Array(COLS));items=[];spawns=[];movers=[];crumbles=[];drafts=[];lt=0;timeLeft=(L.timer||0)+(L.timer&&SET.easy?60:0);windV=0;windStr=0;windWarn=0;flash=0;bolt=null;nextBolt=4;
  L.build({
    pad:x=>movers.push({kind:'pad',x0:x*T+5,y0:410,w:70,h:10,x:x*T+5,y:410,dx:0,dy:0,sink:0,under:0,ph:Math.random()*6}),
    draft:(x0,x1,top)=>drafts.push({x:x0*T,w:(x1-x0+1)*T,top}),
    rothbart:x=>spawns.push({x,row:4,type:'rothbart'}),
    carabosse:x=>spawns.push({x,row:4,type:'carabosse'}),
    stepmother:x=>spawns.push({x,row:10,type:'stepmother'}),
    coppelius:x=>spawns.push({x,row:10,type:'coppelius'}),
    wolf:x=>spawns.push({x,row:10,type:'wolf'}),
    koschei:x=>spawns.push({x,row:4,type:'koschei'}),
    mover:(x,y,w,axis,range,period)=>movers.push({x0:x*T,y0:y*T,w:w*T,h:12,axis,range:range*T,period,x:x*T,y:y*T,dx:0,dy:0}),
    fill:(x0,x1,y0,y1,v=1)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)grid[y][x]=v;},
    item:(x,y)=>items.push({x:x*T+T/2,y:y*T+T/2,got:false,t:Math.random()*6}),
    en:(x,row)=>spawns.push({x,row,type:L.enemy}),
    king:x=>spawns.push({x,row:10,type:'king'})
  });
  // power-ups above two items
  pickups=[];const PT=['speed','shield','music'];
  [.3,.66].forEach((f,k)=>{const it=items[Math.floor(items.length*f)];if(it)pickups.push({x:it.x,y:it.y-46,type:PT[(LI+k)%3],got:false,t:k*2});});
  // secret golden star above the highest platform
  let best_=null;for(let y=0;y<9;y++){for(let x=4;x<COLS-10;x++){const v=grid[y][x];if((v===1||v===2||v===5)&&(y===0||!grid[y-1][x])){best_={x,y};break;}}if(best_)break;}
  secret=L.custom?null:best_?{x:best_.x*T+T/2,y:Math.max(72,best_.y*T-112),got:false}:null;
  fairyWake=L.cps.map(()=>0);
}
function resetPlayer(pp){
  for(const q of pp?[pp]:activePlayers()){
  const partner=coop&&pp?(q===player?player2:player):null;
  Object.assign(q,{riding:null,shield:q.shield&&!!pp,safe:null,flaps:1,flapT:0,x:L.cps[cp]*T+(q.alt?30:0),y:10*T-46,vx:0,vy:0,face:1,onGround:true,gType:1,coyote:0,buffer:0,spinBuf:0,spinT:0,spinCD:0,spinA:0,airSpin:true,jumping:false,inv:0,anim:0,wasGround:true});
  if(partner&&partner.y<WORLD_H){q.x=partner.x;q.y=partner.y-70;q.onGround=false;}
  }
  if(!pp){cam=clamp(player.x-viewW*.42,0,COLS*T-viewW);camY=0;camLead=0;}
}
function resetLevel(){
  if(L.friends)L.friends.forEach(f=>f.spoken=false);
  prince=null;waves=[];
  levelHurt=false;powT=0;powType=null;player.shield=false;
  buildLevel();cp=0;score=0;hearts=maxH();itemCount=0;winT=0;parts=[];texts=[];gum=null;goalA=0;
  enemies=spawns.map(s=>{const d=DIMS[s.type];return{type:s.type,x:s.x*T+(T-d.w)/2,y:s.row*T-d.h,w:d.w,h:d.h,sp:d.sp*(SET.easy?.65:1),vx:0,vy:0,dir:-1,anim:Math.random()*6,dead:false,squash:0,rot:0,active:false,gone:false,hp:['king','rothbart','carabosse','stepmother','coppelius','wolf','koschei'].includes(s.type)?(SET.easy?2:3):1,boss:['king','rothbart','carabosse','stepmother','coppelius','wolf','koschei'].includes(s.type),inv:0,hopT:2,mode:s.type==='wolf'?'walk':'hover',t:s.type==='wolf'?2:2.5,x0:s.x*T,y0:s.row*T-d.h,ph:Math.random()*6};});
  boss=enemies.find(e=>e.boss)||null;bossDefeated=!boss;
  resetPlayer();lastHUD='';updateHUD();
}
function setLevel(i){LI=i;L=LEVELS[i];BEAT=60/L.music.bpm;$('itemIcon').innerHTML=ICONS[L.item];}

// ================= physics =================
function moveBody(b,dt){
  b.onGround=false;b.hitWall=false;
  b.x+=b.vx*dt;
  let x0=Math.floor(b.x/T),x1=Math.floor((b.x+b.w-.01)/T),y0=Math.floor(b.y/T),y1=Math.floor((b.y+b.h-.01)/T);
  for(let ty=y0;ty<=y1;ty++){
    if(b.vx>0&&isSolid(solidAt(x1,ty))){b.x=x1*T-b.w;b.vx=0;b.hitWall=true;break;}
    if(b.vx<0&&isSolid(solidAt(x0,ty))){b.x=(x0+1)*T;b.vx=0;b.hitWall=true;break;}
  }
  const prevBottom=b.y+b.h;
  b.y+=b.vy*dt;
  x0=Math.floor(b.x/T);x1=Math.floor((b.x+b.w-.01)/T);
  if(b.vy>0){
    const ty=Math.floor((b.y+b.h)/T);
    let hit=0,htx=0;
    for(let tx=x0;tx<=x1;tx++){const s=solidAt(tx,ty);if(isSolid(s)||((s===2||s===5||((s===7||s===8)&&beatOn(s)))&&prevBottom<=ty*T+1)){if(!hit||s===4){hit=s;htx=tx;}}}
    if(hit){b.y=ty*T-b.h;b.vy=0;b.onGround=true;b.gType=hit;b.gTx=htx;b.gTy=ty;}
  }else if(b.vy<0){
    const ty=Math.floor(b.y/T);
    let hl=isSolid(solidAt(x0,ty)),hr=x1!==x0&&isSolid(solidAt(x1,ty));
    if(b.corner&&(hl!==hr)){ // corner correction: slide past a ledge we only clipped
      const nx=hl?(x0+1)*T:x1*T-b.w,dx=nx-b.x;
      if(Math.abs(dx)<=10&&!isSolid(solidAt(Math.floor(nx/T),ty))&&!isSolid(solidAt(Math.floor((nx+b.w-.01)/T),ty))){b.x=nx;hl=hr=false;}
    }
    if(hl||hr||(()=>{for(let tx=x0+1;tx<x1;tx++)if(isSolid(solidAt(tx,ty)))return true;return false;})()){b.y=(ty+1)*T;b.vy=0;}
  }
}

// ================= audio =================
let actx=null,master=null,musicStart=0,nextNote=0,beatIdx=0,muted=false,BEAT=60/132;
const VOL=.9;let silentEl=null;
function silentUrl(){
  const n=4000,buf=new ArrayBuffer(44+n*2),v=new DataView(buf),w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,8000,true);v.setUint32(28,16000,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  return URL.createObjectURL(new Blob([buf],{type:'audio/wav'}));
}
function ensureAudio(){
  setTimeout(()=>{try{loadTitleSong();}catch(e){}},0);
  if(false){voicePrimed=true;try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(e){}}
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
  try{
    if(!silentEl){silentEl=new Audio(silentUrl());silentEl.loop=true;silentEl.setAttribute('playsinline','');}
    if(silentEl.paused){const pr=silentEl.play();if(pr&&pr.catch)pr.catch(()=>{});}
  }catch(e){}
  try{
    if(!actx){
      actx=new (window.AudioContext||window.webkitAudioContext)();
      const comp=actx.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=6;comp.attack.value=.003;comp.release.value=.2;comp.connect(actx.destination);
      master=actx.createGain();master.gain.value=muted?0:VOL;master.connect(comp);
      musicBus=actx.createGain();duckBus=actx.createGain();sfxBus=actx.createGain();musicBus.connect(duckBus);duckBus.connect(master);sfxBus.connect(master);applyVolumes();
      noiseBuf=actx.createBuffer(1,actx.sampleRate*.5,actx.sampleRate);{const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
    }
    if(actx.state!=='running'&&state!=='dpause'){
      const pr=actx.resume();if(pr&&pr.catch)pr.catch(()=>{});
      const b=actx.createBuffer(1,1,22050),s=actx.createBufferSource();s.buffer=b;s.connect(actx.destination);s.start(0);
    }
  }catch(e){actx=null}
}
['pointerdown','touchend','keydown','click'].forEach(ev=>addEventListener(ev,()=>{if(actx&&actx.state==='running'&&silentEl&&!silentEl.paused)return;ensureAudio();},{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){if(state==='play')openMenu();else if(state==='dance')pauseDance();return;}
  if(state!=='dpause'&&actx&&actx.state!=='running'){const pr=actx.resume();if(pr&&pr.catch)pr.catch(()=>{});}});
function restartMusic(){if(!actx)return;musicStart=actx.currentTime+.2;nextNote=musicStart;beatIdx=0;}
let musicBus=null,sfxBus=null,duckBus=null,curBus=null,noiseBuf=null,sfxVary=1,itemChain=0,itemChainT=0;
applyVolumes=()=>{if(musicBus){musicBus.gain.value=SET.music*SET.music;sfxBus.gain.value=SET.sfx*SET.sfx;}};
function note(m,t,dur,gain,type='sine'){
  const o=actx.createOscillator(),g=actx.createGain();o.type=type;o.frequency.value=440*Math.pow(2,(m-69)/12)*(curBus?1:sfxVary);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(curBus||sfxBus||master);o.start(t);o.stop(t+dur+.05);
}
function sweep(f0,f1,dur,gain,type='sine'){
  const t=actx.currentTime,o=actx.createOscillator(),g=actx.createGain();o.type=type;
  o.frequency.setValueAtTime(f0*sfxVary,t);o.frequency.exponentialRampToValueAtTime(f1*sfxVary,t+dur);
  g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(sfxBus||master);o.start(t);o.stop(t+dur+.03);
}
// ---- title song: a real recording that loops on the home screen ----
let titleBuf=null,titleSrc=null,titleGain=null,titleLoading=false,titleLoop=[0,0];
// download the song as soon as the page opens, so it's ready the moment sound is allowed
const titleBytes=fetch('audio/title.mp3').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer();}).catch(()=>null);
function loadTitleSong(){
  if(titleBuf||titleLoading||!actx)return;titleLoading=true;
  titleBytes.then(a=>{if(!a)throw 0;return new Promise((ok,no)=>actx.decodeAudioData(a.slice(0),ok,no));}).then(b=>{
    // trim the silent padding at both ends so the loop is seamless
    const d=b.getChannelData(0),th=.007;let s0=0,s1=d.length-1;
    while(s0<d.length&&Math.abs(d[s0])<th)s0++;while(s1>s0&&Math.abs(d[s1])<th)s1--;
    titleLoop=[s0/b.sampleRate,(s1+1)/b.sampleRate];titleBuf=b;
  }).catch(()=>{titleLoading=false;});
}
function titleSongTick(){
  const want=state==='title'&&mode!=='dance'&&!!titleBuf;
  if(want&&!titleSrc){
    const t=actx.currentTime;titleGain=actx.createGain();titleGain.gain.setValueAtTime(0,t);titleGain.gain.linearRampToValueAtTime(.6,t+1.2);
    titleSrc=actx.createBufferSource();titleSrc.buffer=titleBuf;titleSrc.loop=true;titleSrc.loopStart=titleLoop[0];titleSrc.loopEnd=titleLoop[1];
    titleSrc.connect(titleGain);titleGain.connect(musicBus);titleSrc.start(t,titleLoop[0]);
  }else if(!want&&titleSrc){
    const t=actx.currentTime,src=titleSrc,g=titleGain;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.5);
    try{src.stop(t+.55);}catch(e){}titleSrc=null;titleGain=null;
  }
  return want;
}
function scheduleMusic(){
  if(!actx)return;
  if(titleSongTick())return;
  if(!musicStart)return;
  const M=L.music,now=actx.currentTime,mt=M.meter,bars=M.ch.length;
  if(nextNote<now-.05){const k=Math.ceil((now-nextNote)/BEAT);nextNote+=k*BEAT;beatIdx+=k;}
  curBus=musicBus;
  while(nextNote<now+.15){
    if(mode==='dance'&&beatIdx>=dance.totalBeats){nextNote=Infinity;break;}
    const bar=Math.floor(beatIdx/mt)%bars,b=beatIdx%mt,m=M.mel[bar*mt+b],t=nextNote;
    const play1=(mm,tt)=>{note(mm,tt,M.dur,M.wave?.22:.2,M.wave||'sine');note(mm+12,tt,.45,M.shimmer||.025);};
    if(Array.isArray(m)){play1(m[0],t);play1(m[1],t+BEAT/2);}else if(m)play1(m,t);
    if(mode!=='dance'&&state==='play'){const fight=boss&&boss.active&&!bossDefeated,hurry=L.timer&&timeLeft<30;
      if(fight){if(b===0)hit(t,.18,.35,140,.8);if(mt!==3&&b===2)hit(t,.12,.2,1800,1.2);hit(t+BEAT/2,.05,.05,7000);}
      else if(hurry)hit(t,.05,.06,7000);}
    if(M.arp){if(b===0){note(M.bass[bar],t,2.2,.15);note(M.bass[bar]+12,t,1,.06,'triangle');}note(M.ch[bar][b%3]+12,t,1.2,.045);nextNote+=BEAT;beatIdx++;continue;}
    if(mt===3){if(b===0){note(M.bass[bar],t,1,.16);note(M.bass[bar]+12,t,.6,.07,'triangle');}else M.ch[bar].forEach(c=>note(c,t,.22,.03,'triangle'));}
    else{if(b===0)note(M.bass[bar],t,.5,.17);else if(b===2)note(M.bass[bar]+7,t,.5,.13);else M.ch[bar].forEach(c=>note(c,t,.16,.035,'triangle'));}
    nextNote+=BEAT;beatIdx++;
  }
  curBus=null;
}
function duck(depth,hold){ // dip the music under an important sound, then recover
  if(!duckBus)return;const t=actx.currentTime,g=duckBus.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);
  g.linearRampToValueAtTime(depth,t+.05);g.setValueAtTime(depth,t+.05+hold);g.linearRampToValueAtTime(1,t+.5+hold);
}
function hit(t,dur,gain,freq,q){ // filtered noise for soft drums
  if(!noiseBuf)return;const s=actx.createBufferSource(),f=actx.createBiquadFilter(),g=actx.createGain();s.buffer=noiseBuf;
  f.type=freq>2000?'highpass':'bandpass';f.frequency.value=freq;f.Q.value=q||1;
  g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(g);g.connect(curBus||sfxBus);s.start(t);s.stop(t+dur+.02);
}
const VARY={jump:1,stomp:1,spin:1,flap:1,boing:1,splash:1,hurt:1};
function sfx(k){
  if(window.PrimaNative)PrimaNative.haptic(k);
  if(!actx)return;const t=actx.currentTime;
  sfxVary=VARY[k]?Math.pow(2,(Math.random()*2-1)/12):1;
  if(k==='item'){const now=performance.now();itemChain=now-itemChainT<700?Math.min(itemChain+1,7):0;itemChainT=now;sfxVary=Math.pow(2,[0,2,4,5,7,9,11,12][itemChain]/12);}
  if(k==='hurt')duck(.35,.25);else if(k==='win'||k==='chimeup')duck(.3,.9);else if(k==='boss')duck(.5,.2);
  if(k==='jump')sweep(520,900,.13,.06);
  else if(k==='beat'){note(88,t,.6,.07);note(95,t+.07,.7,.06);}
  else if(k==='item'){note(91,t,.35,.06);note(96,t+.06,.45,.05);}
  else if(k==='stomp')sweep(320,110,.14,.12,'triangle');
  else if(k==='spin')sweep(500,1300,.3,.035);
  else if(k==='boing')sweep(180,620,.22,.13,'sine');
  else if(k==='hurt')sweep(330,90,.32,.09,'triangle');
  else if(k==='crack'){note(100,t,.25,.04);note(96,t+.04,.3,.035);}
  else if(k==='chimeup'){[84,88,91,96].forEach((m,i)=>note(m,t+i*.07,.6,.06));}
  else if(k==='tick')note(96,t,.08,.05,'triangle');
  else if(k==='chime'){for(let i=0;i<4;i++)note(72,t+i*.5,1.2,.12);}
  else if(k==='thunder'){sweep(140,38,1.4,.22,'sawtooth');sweep(90,30,1.8,.18,'triangle');}
  else if(k==='flap')sweep(260,720,.2,.09,'triangle');
  else if(k==='swoop')sweep(900,200,.5,.07,'sawtooth');
  else if(k==='splash')sweep(1200,300,.25,.05,'triangle');
  else if(k==='boss')sweep(200,60,.4,.16,'triangle');
  else if(k==='win')[72,76,79,84,88].forEach((m,i)=>note(m,t+i*.09,1.2,.08));
}
function beatPos(){return actx&&musicStart?(actx.currentTime-musicStart)/BEAT:time/BEAT;}

// ================= input =================
const keys={left:false,right:false,jump:false,spin:false};
function press(k,who){
  if(state!=='play')return;
  const pl=who===2?player2:player,ks=who===2?keys2:keys;
  ks[k]=true;
  if(k==='jump')pl.buffer=.13;
  if(k==='spin')pl.spinBuf=.12;
}
const JUMPK=['Space','ArrowUp','KeyW','KeyZ'],SPINK=['KeyX','KeyJ','KeyK','ShiftLeft','ShiftRight'];
const LANEK={KeyD:0,ArrowLeft:0,KeyF:1,ArrowDown:1,KeyJ:2,ArrowUp:2,KeyK:3,ArrowRight:3};
addEventListener('keydown',e=>{
  const c=e.code;
  if(mode==='dance'){
    if(c in LANEK){e.preventDefault();if(!e.repeat)hitLane(LANEK[c]);}
    else if(c==='Escape'&&state==='dance')pauseDance();
    else if(c==='Escape'&&state==='dpause')resumeDance();
    return;
  }
  if(coop&&state==='play'){
    const m={KeyA:[1,'left'],KeyD:[1,'right'],KeyW:[1,'jump'],KeyS:[1,'spin'],ArrowLeft:[2,'left'],ArrowRight:[2,'right'],ArrowUp:[2,'jump'],ArrowDown:[2,'spin']}[c];
    if(m){e.preventDefault();if(!e.repeat)press(m[1],m[0]);return;}
  }
  if(c==='ArrowLeft'||c==='KeyA')keys.left=true;
  else if(c==='ArrowRight'||c==='KeyD')keys.right=true;
  else if(JUMPK.includes(c)){e.preventDefault();if(!e.repeat)press('jump');}
  else if(SPINK.includes(c)){if(!e.repeat)press('spin');}
  else if(c==='Escape'&&state==='play')openMenu();
});
addEventListener('keyup',e=>{
  const c=e.code;
  if(coop){const m={KeyA:[1,'left'],KeyD:[1,'right'],KeyW:[1,'jump'],KeyS:[1,'spin'],ArrowLeft:[2,'left'],ArrowRight:[2,'right'],ArrowUp:[2,'jump'],ArrowDown:[2,'spin']}[c];if(m){(m[0]===2?keys2:keys)[m[1]]=false;return;}}
  if(c==='ArrowLeft'||c==='KeyA')keys.left=false;
  else if(c==='ArrowRight'||c==='KeyD')keys.right=false;
  else if(JUMPK.includes(c))keys.jump=false;
  else if(SPINK.includes(c))keys.spin=false;
});
document.querySelectorAll('[data-k]').forEach(b=>{
  const k=b.dataset.k;
  b.addEventListener('pointerdown',e=>{e.preventDefault();try{b.setPointerCapture(e.pointerId)}catch(_){}b.classList.add('on');press(k);});
  const up=()=>{b.classList.remove('on');keys[k]=false;};
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,up));
});
const dpad=document.getElementById('dpad'),dpL=dpad.querySelector('.l'),dpR=dpad.querySelector('.r'),dp={};
function dpUpdate(){
  // the most recent finger wins, so a stuck touch can never cancel the other direction
  const r=dpad.getBoundingClientRect();let l=false,rt=false,best=-1;
  for(const id in dp){const q=dp[id];if(q.t>best){best=q.t;l=q.x<r.left+r.width/2;rt=!l;}}
  keys.left=l;keys.right=rt;dpL.classList.toggle('on',l);dpR.classList.toggle('on',rt);
}
let dpSeq=0;
dpad.addEventListener('pointerdown',e=>{e.preventDefault();try{dpad.setPointerCapture(e.pointerId)}catch(_){}dp[e.pointerId]={x:e.clientX,t:++dpSeq};dpUpdate();});
dpad.addEventListener('pointermove',e=>{if(e.pointerId in dp){dp[e.pointerId].x=e.clientX;dpUpdate();}});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>dpad.addEventListener(ev,e=>{delete dp[e.pointerId];dpUpdate();}));
function releaseAllControls(){for(const id in dp)delete dp[id];dpUpdate();
  document.querySelectorAll('#controls .btn.on').forEach(b=>b.classList.remove('on'));keys.jump=false;keys.spin=false;
  if(typeof keys2!=='undefined')for(const k in keys2)keys2[k]=false;if(coop)for(const k in keys)keys[k]=false;document.querySelectorAll('#coopctl .on').forEach(b=>b.classList.remove('on'));}
// safety net: when no fingers remain on the screen, nothing can still be held
['touchend','touchcancel'].forEach(ev=>document.addEventListener(ev,e=>{if(e.touches.length===0)releaseAllControls();},{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAllControls();});
addEventListener('blur',releaseAllControls);
document.addEventListener('contextmenu',e=>e.preventDefault());
document.querySelectorAll('.cl').forEach(cl=>{
  const who=+cl.dataset.who,ks=who===2?keys2:keys;
  cl.querySelectorAll('[data-dir]').forEach(d=>{const k=d.dataset.dir;
    d.addEventListener('pointerdown',e=>{e.preventDefault();try{d.setPointerCapture(e.pointerId)}catch(_){}d.classList.add('on');ks[k]=true;});
    ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>d.addEventListener(ev,()=>{d.classList.remove('on');ks[k]=false;}));});
  cl.querySelectorAll('[data-ck]').forEach(d=>{const k=d.dataset.ck;
    d.addEventListener('pointerdown',e=>{e.preventDefault();try{d.setPointerCapture(e.pointerId)}catch(_){}d.classList.add('on');press(k,who);});
    ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>d.addEventListener(ev,()=>{d.classList.remove('on');ks[k]=false;}));});
});

