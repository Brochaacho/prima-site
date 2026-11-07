// ================= dance battle =================
const LANEC=['#ff9ec0','#9fd0ff','#ffd36e','#c9a6ff'],POSES=['plie','arabesque','jete','pirouette'];
function makeChart(M,diff,song){
  const mt=M.meter,bars=M.ch.length,totalBars=mt===3?32:24,notes=[];let prev=-1;
  for(let bi=mt*2;bi<totalBars*mt;bi++){
    const bar=Math.floor(bi/mt)%bars,b=bi%mt,h=hash(bi+song*97);let m=M.mel[bar*mt+b];
    const m0=m;m=Array.isArray(m0)?m0[0]:m0;
    const take=diff===0?(b===0||(mt===4&&b===2&&m)):diff===1?(m&&(b===0||h>.3)):(m||b===0);
    if(!take)continue;
    let lane=m?((m%4)+4)%4:Math.floor(h*4);
    if(lane===prev&&hash(bi*3+song)>.5)lane=(lane+1)%4;
    notes.push({beat:bi,lane,j:null});prev=lane;
    if(diff===2&&m&&b!==mt-1&&hash(bi*7+song)>.62)notes.push({beat:bi+.5,lane:(lane+2)%4,j:null});
  }
  notes.push({beat:totalBars*mt,lane:3,j:null});
  return{notes,totalBeats:totalBars*mt+mt};
}
function startDance(){
  if(paid(LEVELS[dance.song].ballet)){askUnlock('title');return;}
  ensureAudio();mode='dance';setLevel(dance.song);
  const ch=makeChart(L.music,dance.diff,dance.song);
  Object.assign(dance,{notes:ch.notes,totalBeats:ch.totalBeats,score:0,combo:0,maxCombo:0,accSum:0,counts:{perfect:0,great:0,good:0,miss:0},pose:'idle',poseT:0,judge:null,flash:[0,0,0,0],over:false});
  dance.firstSec=ch.notes[0].beat*BEAT;dance.lastSec=ch.notes[ch.notes.length-1].beat*BEAT;
  restartMusic();dance.fallback=time+.2;
  state='dance';dfx=[];
  $('overlay').classList.add('hidden');$('hud').classList.remove('show');$('controls').classList.remove('show');
  $('lanes').classList.add('show');$('dhud').classList.add('show');
  $('dplayer').textContent=dance.players===2?'Player '+dance.turn:L.name;$('dscore').textContent='0';
}
function dNow(){return actx&&musicStart?actx.currentTime-musicStart:time-dance.fallback;}
function laneRects(){return [...document.querySelectorAll('.lane')].map(e=>e.getBoundingClientRect());}
function hitLane(l){
  if(state!=='dance')return;
  dance.pose=POSES[l];dance.poseT=.55;dance.flash[l]=1;
  const now=dNow();let best=null,bd=1;
  for(const n of dance.notes){if(n.j||n.lane!==l)continue;const d=Math.abs(now-n.beat*BEAT);if(d<bd){bd=d;best=n;}}
  if(!best||bd>.2)return;
  const j=bd<=.07?'perfect':bd<=.13?'great':'good';
  best.j=j;dance.combo++;dance.maxCombo=Math.max(dance.maxCombo,dance.combo);dance.counts[j]++;
  const mult=1+Math.min(3,Math.floor(dance.combo/10));
  dance.score+={perfect:300,great:200,good:100}[j]*mult;dance.accSum+={perfect:1,great:.7,good:.4}[j];
  dance.judge={t:j==='perfect'?'Perfect':j==='great'?'Great':'Good',life:.7,c:LANEC[l]};
  $('dscore').textContent=dance.score;
  const r=laneRects()[l],cx=r.left+r.width/2,hy=r.top-40;
  for(let i=0;i<(j==='perfect'?16:9);i++){const a=Math.random()*Math.PI*2,sp=80+Math.random()*180;dfx.push({x:cx,y:hy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-60,life:.6,max:.6,c:i%3?LANEC[l]:'#fff',s:2+Math.random()*3,g:300});}
  if(dance.combo%10===0){
    sfx('beat');
    for(let i=0;i<22;i++)dfx.push({rose:true,x:Math.random()*W,y:-20-Math.random()*120,vx:(Math.random()-.5)*60,vy:120+Math.random()*160,life:3.5,max:3.5,rot:Math.random()*6,vr:(Math.random()-.5)*6,g:60});
  }
}
function updateDance(dt){
  const now=dNow();
  for(const n of dance.notes){
    if(!n.j&&now-n.beat*BEAT>.2){n.j='miss';dance.combo=0;dance.counts.miss++;dance.judge={t:'Miss',life:.6,c:'rgba(255,255,255,.6)'};}
  }
  dance.poseT-=dt;if(dance.poseT<=0)dance.pose='idle';
  for(let i=0;i<4;i++)dance.flash[i]=Math.max(0,dance.flash[i]-dt*4);
  if(dance.judge){dance.judge.life-=dt;if(dance.judge.life<=0)dance.judge=null;}
  for(const q of dfx){q.life-=dt;q.vy+=q.g*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.rose)q.rot+=q.vr*dt;}
  dfx=dfx.filter(q=>q.life>0);
  if(!dance.over&&now>dance.lastSec+1.8){
    dance.over=true;state='dresult';
    const acc=dance.accSum/dance.notes.length,r={score:dance.score,acc,maxCombo:dance.maxCombo,grade:gradeOf(acc),counts:dance.counts};
    if(dance.players===1&&dance.score>(dance.best[dance.song]||0)){dance.best[dance.song]=dance.score;r.newBest=true;try{LS.set('dance',JSON.stringify(dance.best));}catch(e){}}
    dance.results[dance.turn-1]=r;sfx('win');
    if(r.grade==='S')setTimeout(()=>award('danceS'),900);if(dance.players===2&&dance.turn===2)setTimeout(()=>award('duel'),900);
    setTimeout(()=>showOverlay('dresult'),500);
  }
}
document.querySelectorAll('.lane').forEach(b=>{
  const l=+b.dataset.l;
  b.addEventListener('pointerdown',e=>{e.preventDefault();b.classList.add('on');hitLane(l);});
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>b.classList.remove('on')));
});
$('dquit').addEventListener('click',()=>backToTitle());
// ---- pause: freezing the audio clock freezes the whole dance, so notes resume exactly where they were ----
function pauseDance(){
  if(state!=='dance'||dance.over)return;
  state='dpause';dance.pausedAt=time;for(const k in keys)keys[k]=false;
  if(actx&&actx.state==='running')actx.suspend().catch(()=>{});
  showOverlay('dpause');
}
function resumeDance(){
  if(state!=='dpause')return;
  dance.fallback+=time-dance.pausedAt;state='dance';$('overlay').classList.add('hidden');$('lanes').classList.add('show');$('dhud').classList.add('show');
  if(actx)actx.resume().catch(()=>{});
}
$('dpause').addEventListener('click',e=>{e.stopPropagation();pauseDance();});

function drawDancer(x,y,s,pose,k){
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();ctx.ellipse(0,0,16*s,3.5*s,0,0,7);ctx.fill();
  let lift=0,sx=1,tilt=0,dy=0;
  if(pose==='jete')lift=Math.sin(Math.min(1,k)*Math.PI)*34;
  if(pose==='pirouette'){sx=Math.cos(k*Math.PI*4);if(Math.abs(sx)<.18)sx=.18*(sx<0?-1:1);}
  if(pose==='arabesque')tilt=.18*Math.sin(Math.min(1,k*2)*Math.PI/2);
  if(pose==='plie')dy=5*Math.sin(Math.min(1,k*1.6)*Math.PI/2);
  if(pose==='idle')dy=Math.sin(time*2)*.6;
  ctx.scale(s*sx,s);ctx.translate(0,-lift);
  const C=costumeFor(L.ballet),tights=C.tights,suit=C.rainbow?`hsl(${(time*90)%360},85%,70%)`:C.suit,tutu=C.tutu,skin='#f3d2bf',hair='#3b2629';
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=tights;ctx.lineWidth=3.6;
  const hip=-23+dy;
  const leg=(...pts)=>{ctx.beginPath();ctx.moveTo(0,hip);pts.forEach(([a,b])=>ctx.lineTo(a,b));const c0=ctx.strokeStyle,w0=ctx.lineWidth;ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=w0+2;ctx.stroke();ctx.strokeStyle=c0;ctx.lineWidth=w0;ctx.stroke();};
  if(pose==='plie'){leg([-8,hip+9],[-4,0]);leg([8,hip+9],[4,0]);}
  else if(pose==='arabesque'){leg([0,0]);leg([-12,hip-6],[-24,hip-12]);}
  else if(pose==='jete'){leg([10,-17],[21,-22]);leg([-10,-15],[-21,-13]);}
  else if(pose==='pirouette'){leg([0,0]);leg([9,-13],[1,-8]);}
  else{leg([-3,0]);leg([3,0]);}
  ctx.save();ctx.translate(0,hip);ctx.rotate(tilt);ctx.translate(0,-hip);ctx.translate(0,dy);
  ctx.fillStyle=suit;ctx.beginPath();ctx.roundRect(-5,-40,10,18,4);ctx.fill();
  ctx.fillStyle=C.tutu2;ctx.beginPath();ctx.ellipse(0,-22,17,4.5,0,0,7);ctx.fill();
  ctx.fillStyle=tutu;ctx.beginPath();ctx.ellipse(0,-23.5,15.5,4,0,0,7);ctx.fill();
  ctx.strokeStyle=skin;ctx.lineWidth=2.6;
  const arm=(cx,cy,ax,ay)=>{ctx.beginPath();ctx.moveTo(0,-37);ctx.quadraticCurveTo(cx,cy,ax,ay);const c0=ctx.strokeStyle,w0=ctx.lineWidth;ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=w0+1.8;ctx.stroke();ctx.strokeStyle=c0;ctx.lineWidth=w0;ctx.stroke();};
  if(pose==='plie'){arm(12,-36,18,-32);arm(-12,-36,-18,-32);}
  else if(pose==='arabesque'){arm(12,-46,20,-56);arm(-10,-38,-19,-36);}
  else if(pose==='jete'){arm(16,-58,4,-70);arm(-15,-58,-5,-70);}
  else if(pose==='pirouette'){arm(12,-36,3,-30);arm(-12,-36,-3,-30);}
  else{arm(9,-34,6,-26);arm(-9,-34,-6,-26);}
  drawHead(C,pose==='pirouette');
  ctx.restore();ctx.restore();
}
function drawDance(){
  ctx.setTransform(1,0,0,1,0,0);
  const bgc=L.theme.bg,bg=ctx.createLinearGradient(0,0,0,cv.height);
  bg.addColorStop(0,bgc[0]);bg.addColorStop(.6,bgc[1]);bg.addColorStop(1,bgc[2]);
  ctx.fillStyle=bg;ctx.fillRect(0,0,cv.width,cv.height);
  ctx.setTransform(DPR*scale,0,0,DPR*scale,0,DPR*offY);
  const topW=-offY/scale,botW=(H-offY)/scale,now=dNow(),bp=now/BEAT,pulse=Math.exp(-(((bp%1)+1)%1)*5);
  backdrop(topW,botW,pulse);weather(topW,botW);
  ctx.fillStyle='#3d0f26';ctx.fillRect(-20,topW,viewW+40,16);
  ctx.beginPath();for(let x=0;x<viewW+60;x+=56){ctx.moveTo(x+56,topW+16);ctx.arc(x+28,topW+16,28,0,Math.PI);}ctx.fill();
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.fillStyle='rgba(8,5,16,.25)';ctx.fillRect(0,0,W,H);
  const R=laneRects();if(!R[0].width)return;
  const wide=W/H>1.2,hitY=R[0].top-40,top=wide?Math.max(70,H*.16):H*.44;
  const lx0=R[0].left,lx1=R[3].right;
  // dancer
  const dx=wide?lx0/2:W/2,dyy=wide?H*.8:H*.39,ds=wide?H*.0058:Math.min(H*.0042,W*.009);
  const sp=ctx.createLinearGradient(0,0,0,dyy);sp.addColorStop(0,'rgba(255,240,220,0)');sp.addColorStop(1,`rgba(255,236,214,${.14+.08*pulse})`);
  ctx.fillStyle=sp;ctx.beginPath();ctx.moveTo(dx-10,0);ctx.lineTo(dx+10,0);ctx.lineTo(dx+30*ds,dyy);ctx.lineTo(dx-30*ds,dyy);ctx.fill();
  ctx.fillStyle=`rgba(255,236,214,${.16+.1*pulse})`;ctx.beginPath();ctx.ellipse(dx,dyy,30*ds,6*ds,0,0,7);ctx.fill();
  drawDancer(dx,dyy,ds,dance.pose,1-dance.poseT/.55);
  // highway
  const lead=1.5,r=Math.min(22,R[0].width*.28);
  R.forEach((rc,i)=>{
    const cx=rc.left+rc.width/2;
    const tg=ctx.createLinearGradient(0,top,0,hitY);tg.addColorStop(0,'rgba(255,255,255,0)');tg.addColorStop(1,'rgba(255,255,255,.07)');
    ctx.fillStyle=tg;ctx.beginPath();ctx.roundRect(cx-r-4,top,2*r+8,hitY-top+r+4,r+4);ctx.fill();
    ctx.strokeStyle=`rgba(255,255,255,${.3+.2*pulse})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,hitY,r+2,0,7);ctx.stroke();
    if(dance.flash[i]>0){ctx.globalAlpha=dance.flash[i]*.6;ctx.fillStyle=LANEC[i];ctx.beginPath();ctx.arc(cx,hitY,r+2+(1-dance.flash[i])*14,0,7);ctx.fill();ctx.globalAlpha=1;}
  });
  for(const n of dance.notes){
    if(n.j&&n.j!=='miss')continue;
    const t=n.beat*BEAT-now;if(t>lead||t<-.5)continue;
    const rc=R[n.lane],cx=rc.left+rc.width/2,y=hitY-(t/lead)*(hitY-top);
    const fade=Math.min(1,(lead-t)/.3)*(n.j==='miss'?Math.max(0,1+t*2.5)*.5:1);
    ctx.globalAlpha=fade;
    const g=ctx.createRadialGradient(cx,y,0,cx,y,r*1.9);g.addColorStop(0,LANEC[n.lane]+'88');g.addColorStop(1,LANEC[n.lane]+'00');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,y,r*1.9,0,7);ctx.fill();
    ctx.fillStyle=LANEC[n.lane];ctx.beginPath();ctx.arc(cx,y,r*.78,0,7);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(cx-r*.22,y-r*.22,r*.22,0,7);ctx.fill();
  }
  ctx.globalAlpha=1;
  // particles
  for(const q of dfx){
    ctx.globalAlpha=Math.min(1,q.life/q.max*2);
    if(q.rose){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot);ctx.strokeStyle='#7fd39a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,4);ctx.lineTo(0,14);ctx.stroke();ctx.fillStyle='#ff5c86';ctx.beginPath();ctx.arc(0,0,6,0,7);ctx.fill();ctx.strokeStyle='#c9325a';ctx.lineWidth=1.3;ctx.beginPath();ctx.arc(0,0,2.8,0,4.6);ctx.stroke();ctx.restore();}
    else{ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,q.s,0,7);ctx.fill();}
  }
  ctx.globalAlpha=1;
  // text
  const tx=(lx0+lx1)/2;ctx.textAlign='center';
  if(state==='dance'&&now<dance.firstSec+.6){
    const left=(dance.firstSec-now)/BEAT;
    const txt=now<0?'Ready':left>4?'Ready':left>0?String(Math.ceil(left)):'Dance!';
    ctx.font='700 40px Fredoka, Inter, system-ui, sans-serif';ctx.fillStyle='#fff';ctx.globalAlpha=.9;ctx.fillText(txt,tx,top+(hitY-top)*.45);ctx.globalAlpha=1;
  }
  if(dance.judge){
    const j=dance.judge,sc=1+Math.max(0,j.life-.5)*1.2;
    ctx.save();ctx.translate(tx,top+(hitY-top)*.3);ctx.scale(sc,sc);ctx.globalAlpha=Math.min(1,j.life*2.5);
    ctx.font='700 24px Fredoka, Inter, system-ui, sans-serif';ctx.fillStyle=j.c;ctx.fillText(j.t,0,0);ctx.restore();ctx.globalAlpha=1;
  }
  if(dance.combo>=3){
    ctx.font='600 13px Fredoka, Inter, system-ui, sans-serif';ctx.fillStyle='rgba(255,255,255,.75)';
    const m=1+Math.min(3,Math.floor(dance.combo/10));
    ctx.fillText(dance.combo+' combo'+(m>1?'  ·  ×'+m:''),tx,top+(hitY-top)*.3+24);
  }
  // progress
  const prog=clamp(now/(dance.lastSec||1),0,1);
  ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(lx0,hitY+r+14,lx1-lx0,3);
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(lx0,hitY+r+14,(lx1-lx0)*prog,3);
  $('beat').style.opacity=.3+.7*pulse;
}

