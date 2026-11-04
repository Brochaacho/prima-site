// ================= full game unlock =================
// Free: Ballet Class + The Nutcracker. Everything else is unlocked once, behind a grown-up gate.
// The App Store build swaps Store.purchase/restore for real in-app purchase calls.
const FREE_B=new Set(['school','nutcracker']);
const PRICE='$4.99';
// Web demo (prima-site/play): the full game is sold on the App Store instead of unlocking here.
const DEMO=!!window.PRIMA_WEB_DEMO,APP_STORE_URL=window.PRIMA_APP_STORE_URL||'';
let FULL=false,unlockFrom='title',gateIntent='buy',gateQ=null,gateIn='',gateMsg='',unlockMsg='';
function refreshFull(){try{FULL=localStorage.getItem('prima.fullgame')==='1';}catch(e){}}
function setFull(v){FULL=!!v;try{localStorage.setItem('prima.fullgame',v?'1':'0');}catch(e){}markDirty();}
const paid=b=>!FULL&&!FREE_B.has(b);
// players who were already past the Nutcracker before the store existed keep everything
function grandfather(){if(FULL||DEMO)return;try{if(LEVELS.some((lv,i)=>!FREE_B.has(lv.ballet)&&done(i)))setFull(true);}catch(e){}}
refreshFull();

// In the App Store build, js/native.js provides window.PrimaNative (StoreKit via Capacitor).
const Store={
  get preview(){return !(window.PrimaNative&&PrimaNative.native);},
  async purchase(){if(this.preview)return 'preview';return await PrimaNative.buy();},
  async restore(){if(this.preview)return FULL;return await PrimaNative.restore();},
  priceLabel(){if(this.preview)return PRICE;return PrimaNative.price();}
};

function askUnlock(from){
  unlockFrom=from||'title';unlockMsg='';
  $('map').classList.add('hidden');state='title';mode='story';musicStart=0;
  try{titleScene();}catch(e){}
  showOverlay('unlock');sfx('chimeup');
}
function paidBallets(){return [...new Set(LEVELS.map(l=>l.ballet))].filter(b=>!FREE_B.has(b)&&BALLETS[b]);}
function unlockHTML(){
  const bs=paidBallets(),n=ORDER.filter(i=>!FREE_B.has(LEVELS[i].ballet)).length;
  const chips=bs.map((b,j)=>{const lv=LEVELS[balletLevels(b)[0][1]];const th=lv.theme;
    return `<div class="uchip" style="animation-delay:${.08*j}s;background:linear-gradient(135deg,${th.bg[0]},${th.bg[2]})"><span class="ui">${ICONS[lv.item]||''}</span>${BALLETS[b]}</div>`;}).join('');
  return `<div class="eyebrow">The full story</div><h1 style="font-size:40px">Unlock every ballet</h1>
  <div class="sub">${n} more stations, boss battles and Dance Battle songs are waiting after the Nutcracker.</div>
  <div class="ugrid">${chips}</div>
  <button class="cta" data-u="gate-buy">${DEMO?'Get the full game':'Ask a grown-up'}</button>
  <div class="uprice">${DEMO?'Free to try here · the full story is on the App Store · No ads, ever':'One-time purchase'+(Store.priceLabel()?' · '+Store.priceLabel():'')+' · No ads, ever'}</div>
  ${unlockMsg?`<div class="umsg">${unlockMsg}</div>`:''}
  <button class="ghost" data-u="notnow">Not now</button>
  ${DEMO?'':'<button class="ghost usmall" data-u="gate-restore">Restore purchase</button>'}`;
}
function newGateQ(){const a=6+Math.floor(Math.random()*4),b=3+Math.floor(Math.random()*7);gateQ={a,b,ans:a*b};gateIn='';}
function gateHTML(){
  const keys=[1,2,3,4,5,6,7,8,9,'',0,'del'].map(k=>k===''?'<span></span>':`<button class="gk" data-gk="${k}">${k==='del'?'<svg width="22" height="22" viewBox="0 0 24 24"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>':k}</button>`).join('');
  return `<div class="eyebrow">Grown-ups only</div><h1 style="font-size:34px">Ask a grown-up</h1>
  <div class="sub">To continue, type the answer</div>
  <div class="gq">${gateQ.a} × ${gateQ.b} = <span class="gin ${gateMsg?'bad':''}">${gateIn||'?'}</span></div>
  <div class="gpad">${keys}</div>
  <button class="ghost" data-u="back">Back</button>`;
}
function previewHTML(){
  return `<div class="eyebrow">Preview version</div><h1 style="font-size:34px">Unlock the full story</h1>
  <div class="sub">In the App Store version, Apple’s payment sheet opens here for ${PRICE}. In this preview it’s free.</div>
  <button class="cta" data-u="preview-unlock">Unlock (free in preview)</button>
  <button class="ghost" data-u="back">Cancel</button>`;
}
function busyHTML(){return `<div class="eyebrow">One moment</div><h1 style="font-size:32px">Talking to the App Store\u2026</h1><div class="sub">Follow the steps on the screen to finish.</div>`;}
function unlockedHTML(){
  return `<div class="eyebrow">Thank you</div><h1>Unlocked!</h1><div class="ugrid">${paidBallets().map((b,j)=>`<div class="uchip pop" style="animation-delay:${.1*j}s">${BALLETS[b]}</div>`).join('')}</div>
  <div class="sub">Every ballet is now open on the story map.</div>
  <button class="cta" data-u="go">Continue the story</button>`;
}
function celebrate(){
  sfx('win');addTrauma(.3);
  const box=document.createElement('div');box.className='uconf';
  const cols=['#ffd36e','#ff9ec0','#9fd0ff','#c9a6ff','#7fe0c0','#fff'];
  for(let i=0;i<60;i++){const s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.background=cols[i%cols.length];
    s.style.animationDelay=(Math.random()*.4)+'s';s.style.animationDuration=(1.6+Math.random()*1.2)+'s';s.style.transform=`rotate(${Math.random()*360}deg)`;box.appendChild(s);}
  document.body.appendChild(box);setTimeout(()=>box.remove(),3400);
}
function finishUnlock(){setFull(true);showOverlay('unlocked');celebrate();}
function demoHTML(){
  return APP_STORE_URL?`<div class="eyebrow">For grown-ups</div><h1 style="font-size:34px">Get Prima on the App Store</h1>
  <div class="sub">The App Store version has every ballet. The Nutcracker stays free, and the rest unlocks with one purchase.</div>
  <a class="cta" href="${APP_STORE_URL}" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">Open the App Store</a>
  <button class="ghost" data-u="notnow">Keep playing the free demo</button>`
  :`<div class="eyebrow">Coming soon</div><h1 style="font-size:34px">Prima is coming to the App Store</h1>
  <div class="sub">The full game with every ballet will be on iPhone and iPad very soon. Until then, enjoy Ballet Class and The Nutcracker here for free!</div>
  <button class="cta" data-u="notnow">Keep playing</button>`;
}
async function gatePassed(){
  if(DEMO){sfx('chimeup');showOverlay('udemo');return;}
  sfx('chimeup');if(!Store.preview){$('card').innerHTML=busyHTML();}
  if(gateIntent==='restore'){const ok=await Store.restore();if(ok){finishUnlock();return;}unlockMsg='No purchase found to restore.';showOverlay('unlock');return;}
  const r=await Store.purchase();
  if(r==='preview'){showOverlay('upreview');return;}
  if(r){finishUnlock();return;}
  unlockMsg='The purchase didn’t go through. Nothing was charged.';showOverlay('unlock');
}
function bindStore(c){
  c.querySelectorAll('[data-u]').forEach(b=>b.addEventListener('click',()=>{
    const a=b.dataset.u;
    if(a==='gate-buy'||a==='gate-restore'){gateIntent=a==='gate-buy'?'buy':'restore';gateMsg='';newGateQ();showOverlay('gate');}
    else if(a==='notnow'){if(unlockFrom==='map')openMap();else backToTitle();}
    else if(a==='back'){showOverlay('unlock');}
    else if(a==='preview-unlock')finishUnlock();
    else if(a==='go')openMap();
    else if(a==='ending')showEnding();
    else if(a==='endnext'){endPage++;sfx('item');showOverlay('ending');if(endPage===ENDING.length-1)setTimeout(celebrate,300);}
    else if(a==='endmap')openMap();
    else if(a==='relock'){setFull(false);showOverlay.keep=true;showOverlay('settings');}
  }));
  c.querySelectorAll('[data-gk]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.gk;gateMsg='';
    if(k==='del')gateIn=gateIn.slice(0,-1);else if(gateIn.length<3)gateIn+=k;
    sfx('tick');
    const want=String(gateQ.ans);
    if(gateIn.length>=want.length){
      if(gateIn===want){gatePassed();return;}
      gateMsg='bad';sfx('hurt');showOverlay.keep=true;showOverlay('gate');
      setTimeout(()=>{gateMsg='';newGateQ();showOverlay.keep=true;showOverlay('gate');},650);return;
    }
    showOverlay.keep=true;showOverlay('gate');
  }));
}
