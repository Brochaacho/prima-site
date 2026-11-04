// ================= update =================
function hurt(fromPit){
  const player=curP;
  if(!fromPit&&player.shield){player.shield=false;player.inv=1.3;player.vy=-380;sfx('crack');addTrauma(.3);burst(player.x+player.w/2,player.y+20,20,['#cfe8ff','#fff','#c9a6ff'],220,.7,3,150);toast('Your shield protected you!');return;}
  levelHurt=true;
  hearts--;sfx('hurt');addTrauma(.55);freeze(.08);hurtFlash=1;
  if(hearts<=0){state='over';setTimeout(()=>showOverlay('over'),500);updateHUD();return;}
  if(fromPit){resetPlayer(curP);curP.inv=1.4;}
  else{player.inv=1.6;player.vy=-420;player.vx=-player.face*220;}
  updateHUD();
}
function winLevel(){
  state='win';winT=0;score+=hearts*200;sfx('win');player.spinT=0;
  setTimeout(checkWinBadges,2400);
  if(!L.custom)best[LI]=Math.max(best[LI]||0,score);{const r=items.length?itemCount/items.length:1;lastStars=1+(r>=.5?1:0)+(r>=.9?1:0);stars[LI]=Math.max(stars[LI]||0,lastStars);try{LS.set('stars',JSON.stringify(stars));}catch(e){}}{const n=balletLevels(L.ballet).length,k=kIn(LI);if(L.ballet==='swan')unlockedSwan=Math.max(unlockedSwan,Math.min(n,k+2));else if(L.ballet!=='nutcracker')unlX[L.ballet]=Math.max(unlX[L.ballet]||1,Math.min(n,k+2));else unlocked=Math.max(unlocked,Math.min(n,k+2));}saveProgress();
  lastPerfect=false;lastGift=null;
  if(!L.custom){lastPerfect=!levelHurt&&items.length>0&&itemCount>=items.length;
    if(lastPerfect&&!crowns[LI]){crowns[LI]=1;try{LS.set('crowns',JSON.stringify(crowns));}catch(e){}if(crowns.filter(Boolean).length>=5)lastGift=grantReward('crowns5');}
    if(nextInBallet(LI)<0)lastGift=grantReward(L.ballet)||lastGift;}
  lastCoins=itemCount+lastStars*5;coins+=lastCoins;saveShop();
  burst(L.goal*T,300,40,['#fff','#ffd1e3','#ffe9a8','#ff9ab7'],260,1.2,3,150);
  setTimeout(()=>{if(state==='win')showOverlay('win');},2200);
}
function hitEnemy(e,p,pcx,prevBottom){
  const stomp=p.vy>0&&prevBottom<=e.y+(e.boss?20:14);
  if(e.boss){
    if(stomp||p.spinT>0){
      if(e.inv<=0){
        e.hp--;e.inv=1.1;score+=300;addText(e.x+e.w/2,e.y-10,'+300');sfx('boss');addTrauma(.8);freeze(.12);
        burst(e.x+e.w/2,e.y+20,18,SPARK,240,.7,3,200);
        if(e.hp<=0){e.dead=true;e.vx=(pcx<e.x+e.w/2?1:-1)*260;e.vy=-760;bossDefeated=true;score+=500;award(e.type);freeze(.22);addTrauma(1);toast(e.type==='wolf'?'You caught the wolf!':e.type==='coppelius'?'Dr. Copp\u00e9lius gives up — his secret is out!':e.type==='koschei'?'Koschei is defeated!':e.type==='stepmother'?'The stepmother runs away — happily ever after!':e.type==='king'?'The Mouse King is defeated':e.type==='carabosse'?'Carabosse is defeated — the curse is lifted':'The spell is broken',2600);sfx('win');}
        else{e.dir=pcx<e.x+e.w/2?1:-1;if(e.type==='rothbart'||e.type==='carabosse'||e.type==='koschei')e.mode='rise';if(e.type==='wolf'){e.mode='tired';e.t=1;}}
      }
      if(stomp){p.vy=-680;p.jumping=true;p.airSpin=true;p.flaps=1;}else{p.vx=(pcx<e.x+e.w/2?-1:1)*280;p.vy=-380;}
    }else if(p.inv<=0)hurt(false);
    return;
  }
  if(p.spinT>0){stats.spins++;saveStats();if(stats.spins>=10)award('spin10');e.dead=true;e.vx=(pcx<e.x+e.w/2?1:-1)*320;e.vy=-520;score+=150;freeze(.05);addTrauma(.3);addText(e.x+e.w/2,e.y-6,'+150');sfx('stomp');burst(e.x+e.w/2,e.y+e.h/2,12,SPARK,200,.6,3,200);}
  else if(stomp){stats.stomps++;saveStats();if(stats.stomps>=25)award('stomp25');e.squash=.45;freeze(.05);addTrauma(.3);setSq(1.25,.8);p.vy=K&&K.jump?-720:-480;p.jumping=true;p.airSpin=true;p.flaps=1;score+=100;addText(e.x+e.w/2,e.y-6,'+100');sfx('stomp');}
  else if(p.inv<=0)hurt(false);
}
function updatePlayer(p,dt){
  curP=p;p.corner=true;K=p===player2?keys2:keys;
  if(p.riding){p.x+=p.riding.dx;p.y+=p.riding.dy;}
  const ice=p.onGround&&p.gType===3;
  const dir=(K.right?1:0)-(K.left?1:0);
  if(dir){p.vx+=dir*(p.onGround?(ice?800:2400):1500)*dt;if(p.spinT<=0)p.face=dir;}
  else{const f=(p.onGround?(ice?260:2600):700)*dt;p.vx=Math.abs(p.vx)<=f?0:p.vx-Math.sign(p.vx)*f;}
  const maxV=(ice?300:250)*(powType==='speed'?1.45:1);p.vx=clamp(p.vx,-maxV,maxV);
  p.coyote=p.onGround?.1:p.coyote-dt;p.buffer-=dt;p.spinBuf-=dt;p.spinCD-=dt;p.inv-=dt;
  if(p.buffer>0&&p.coyote>0){
    const bp=beatPos(),fr=bp-Math.floor(bp),on=fr<.2||fr>.8||powType==='music';
    p.vy=on?-880:-760;p.jumping=true;p.coyote=0;p.buffer=0;p.onGround=false;
    setSq(.78,1.22);
    if(on){stats.streak=(stats.streak||0)+1;if(stats.streak>=10)award('beat10');}else stats.streak=0;
    if(on){score+=25;addTrauma(.12);addText(p.x+p.w/2,p.y-12,'On beat');burst(p.x+p.w/2,p.y+p.h,14,['#ffe9a8','#fff'],160,.6,2.5,0);sfx('beat');}
    else sfx('jump');
    burst(p.x+p.w/2,p.y+p.h,6,['rgba(255,255,255,.6)'],70,.4,3,0);
  }else if(p.buffer>0&&(L.ballet==='swan'||L.ballet==='firebird')&&!p.onGround&&p.coyote<=0&&p.flaps>0){
    p.vy=-650;p.flaps--;p.buffer=0;p.jumping=true;p.flapT=.4;sfx('flap');setSq(.85,1.15);
    burst(p.x+p.w/2,p.y+30,10,['#fff','#eaf2ff','#dfe9ff'],140,.7,2.6,120);
  }
  p.flapT-=dt;
  for(const d of drafts){
    const cx=p.x+p.w/2;
    if(cx>d.x&&cx<d.x+d.w&&p.y+p.h>d.top&&p.y<WORLD_H+40){p.vy-=3300*dt;if(p.vy<-400)p.vy=-400;p.airSpin=true;p.flaps=1;}
  }
  if(!K.jump&&p.vy<0&&p.jumping&&p.spinT<=0)p.vy+=G*1.6*dt;
  if(p.spinBuf>0&&p.spinCD<=0&&(p.onGround||p.airSpin)){
    p.spinT=.55;p.spinCD=.62;p.spinBuf=0;
    if(!p.onGround){p.airSpin=false;p.vy=Math.min(p.vy,-170);}
    sfx('spin');
  }
  if(p.spinT>0){p.spinT-=dt;p.spinA+=dt*24;if(Math.random()<.7)burst(p.x+p.w/2+(Math.random()-.5)*30,p.y+20+Math.random()*24,1,SPARK,40,.6,2.2,-30);}
  else p.spinA=0;
  const spinAir=p.spinT>0&&!p.onGround;
  const apex=K.jump&&p.jumping&&Math.abs(p.vy)<150&&!spinAir;p.vy+=G*(spinAir?.3:apex?.55:p.vy>0?1.12:1)*dt;p.vy=Math.min(p.vy,spinAir?110:900);
  const prevBottom=p.y+p.h,vyBefore=p.vy;p.prevBottom=prevBottom;
  const wv=(L.wind?windDir*windStr*(p.onGround?120:170):0)+(p.onGround&&(p.gType===9||p.gType===10)?(p.gType===9?100:-100):0);p.vx+=wv;moveBody(p,dt);if(!p.hitWall)p.vx-=wv;
  p.riding=null;
  if(p.vy>=0)for(const m of movers){
    if(m.under>0)continue;
    if(p.x+p.w>m.x+2&&p.x<m.x+m.w-2&&p.y+p.h>=m.y&&prevBottom<=m.y+4){p.y=m.y-p.h;p.vy=0;p.onGround=true;p.gType=2;p.riding=m;break;}
  }
  if(p.onGround&&!p.riding){
    const ty=Math.floor((p.y+p.h+1)/T);
    if(ty<ROWS)for(let tx=Math.floor(p.x/T);tx<=Math.floor((p.x+p.w-.01)/T);tx++){
      if(solidAt(tx,ty)===5&&!crumbles.some(c=>c.tx===tx&&c.ty===ty))crumbles.push({tx,ty,t:.45,phase:'shake'});
    }
  }
  if(p.onGround&&p.gType===4){
    setSq(1.3,.7);addTrauma(.15);p.vy=K.jump?-1150:-980;p.onGround=false;p.jumping=false;p.airSpin=true;p.coyote=0;
    gum={tx:p.gTx,ty:p.gTy,t:.35};sfx('boing');
    burst(p.x+p.w/2,p.y+p.h,10,['#fff','#ffd36e','#ff7fb0','#7fe0c0'],150,.6,3,200);
  }
  if(L.theme.liquid){const wl=L.theme.liquidY||424;if(prevBottom<wl&&p.y+p.h>=wl){sfx('splash');burst(p.x+p.w/2,wl,14,['#fff',L.theme.liquidTop],180,.6,2.6,500);}}
  {const bx0=Math.floor(p.x/T),bx1=Math.floor((p.x+p.w-.01)/T),by0=Math.max(0,Math.floor(p.y/T)),by1=Math.min(ROWS-1,Math.floor((p.y+p.h-.01)/T));
   let thorn=false;for(let ty=by0;ty<=by1&&!thorn;ty++)for(let tx=bx0;tx<=bx1;tx++)if(solidAt(tx,ty)===6&&p.y+p.h>ty*T+16){thorn=true;break;}
   if(thorn&&p.inv<=0){hurt(false);if(state!=='play')return false;p.vy=-560;burst(p.x+p.w/2,p.y+p.h,8,['#8a5a9e','#fff'],120,.5,2.5,200);}}
  if(p.onGround&&!p.wasGround&&vyBefore>250){const f=Math.min(1,(vyBefore-250)/650);setSq(1+.3*f,1-.28*f);if(f>.6)addTrauma(.1);burst(p.x+p.w/2,p.y+p.h,Math.round(4+f*8),['rgba(255,255,255,.55)'],60+f*90,.35,2.6,60);}
  if(p.onGround){p.airSpin=true;p.jumping=false;p.flaps=1;if(!p.wasGround)burst(p.x+p.w/2,p.y+p.h,5,[L.theme.kind==='snow'?'#fff':'rgba(255,255,255,.5)'],60,.35,2.5,0);}
  if(ice&&Math.abs(p.vx)>120&&Math.random()<.3)burst(p.x+p.w/2,p.y+p.h,1,['#cfeaff'],30,.4,1.8,0);
  p.wasGround=p.onGround;
  p.anim+=dt*Math.abs(p.vx)*.05;emitTrail(p,dt);
  for(let i=cp+1;i<L.cps.length;i++)if(p.x>L.cps[i]*T){cp=i;fairyWake[i]=time;sfx('chimeup');const fy=fairyPos(i);burst(fy.x,fy.y,26,['#fff','#ffe9a8','#ffd1e6','#cfe8ff'],170,1,2.8,-40);toast('A fairy will save your place!');}
  if(powT>0){powT-=dt;if(powType==='speed'&&Math.random()<.5)parts.push({x:p.x+p.w/2-p.face*10,y:p.y+14+Math.random()*24,vx:-p.vx*.5,vy:0,life:.3,max:.3,c:'rgba(255,233,168,.8)',s:2,g:0,spark:false});
    if(powType==='music'&&Math.random()<.15)parts.push({x:p.x+p.w/2+(Math.random()-.5)*30,y:p.y,vx:(Math.random()-.5)*30,vy:-60,life:1.2,max:1.2,c:'#ffe27a',s:5,g:-10,spark:false,shape:'note'});
    if(powT<=0){powType=null;toast('Power-up faded');}}
  for(const u of pickups){if(u.got)continue;if(Math.abs(u.x-(p.x+p.w/2))<26&&Math.abs(u.y-(p.y+p.h/2))<36){u.got=true;sfx('chimeup');freeze(.06);addTrauma(.2);burst(u.x,u.y,24,['#fff','#ffe27a','#9fd0ff','#ff9ec0'],220,.8,3,100);
    if(u.type==='shield'){p.shield=true;toast('Fairy wand shield! It blocks one bump');speak('Fairy wand shield!');}else{powType=u.type;powT=u.type==='speed'?8:10;speak(u.type==='speed'?'Magic slippers! Super speed!':'Music box! Every leap is on the beat!');toast(u.type==='speed'?'Magic slippers — super speed!':'Music box — every leap is on the beat!');}}}
  if(secret&&!secret.got&&Math.abs(secret.x-(p.x+p.w/2))<28&&Math.abs(secret.y-(p.y+p.h/2))<38){secret.got=true;score+=250;freeze(.12);addTrauma(.4);sfx('win');burst(secret.x,secret.y,40,['#ffe27a','#fff','#ffb347'],260,1.1,3.4,120);addText(secret.x,secret.y-14,'Secret!');toast('You found the secret golden star!',2400);speak('You found the secret golden star!');
    secrets[LI]=1;LS.set('secrets',JSON.stringify(secrets));if(secrets.filter(Boolean).length>=5)award('secret5');}
  if(p.onGround&&!p.riding&&isSolid(solidAt(Math.floor((p.x+2)/T),Math.floor((p.y+p.h+2)/T)))&&isSolid(solidAt(Math.floor((p.x+p.w-2)/T),Math.floor((p.y+p.h+2)/T))))p.safe={x:p.x,y:p.y};
  if(p.y>WORLD_H+80){
    if(SET.easy&&p.safe){p.x=p.safe.x;p.y=p.safe.y-4;p.vx=0;p.vy=0;p.inv=1.3;p.riding=null;sfx('item');burst(p.x+p.w/2,p.y+20,22,['#fff','#ffd1e6','#ffe9a8'],180,.9,3,-60);toast('A fairy caught you!');speak('A fairy caught you!');}
    else{hurt(true);return state==='play';}
  }
  const pcx=p.x+p.w/2,pcy=p.y+p.h/2;
  for(const r of items){if(r.got)continue;
    if(Math.abs(r.x-pcx)<24&&Math.abs(r.y-pcy)<34){r.got=true;itemCount++;score+=50;sfx('item');burst(r.x,r.y,10,ITEMFX[L.item],140,.7,3,250);}}
  return true;
}
function update(dt){
  if(mode==='dance'){if(state==='dance'||state==='dresult')updateDance(dt);return;}
  if(state==='win'){
    winT+=dt;for(const p of activePlayers()){p.vx*=.9;p.spinA+=dt*14;p.vy+=G*dt;moveBody(p,dt);
    if(Math.random()<.5)burst(p.x+p.w/2,p.y+10,1,SPARK,90,1,2.5,-40);}
    return;
  }
  if(state!=='play')return;
  lt+=dt;
  for(const m of movers){
    let nx,ny;
    if(m.kind==='pad'){
      if(m.under>0){m.under-=dt;m.sink=Math.min(26,m.sink+dt*20);}
      else if(activePlayers().some(q=>q.riding===m)){m.sink+=dt*9;if(m.sink>=14){m.under=1.6;sfx('splash');burst(m.x+m.w/2,m.y,12,['#dfe9ff','#7fa6d6','#fff'],140,.6,2.5,400);}}
      else m.sink=Math.max(0,m.sink-dt*14);
      nx=m.x0;ny=m.y0+Math.sin(lt*2+m.ph)*1.5+m.sink;
    }else{
      const k=.5-.5*Math.cos(lt*2*Math.PI/m.period);
      nx=m.axis==='h'?m.x0+m.range*k:m.x0;ny=m.axis==='v'?m.y0-m.range*k:m.y0;
    }
    m.dx=nx-m.x;m.dy=ny-m.y;m.x=nx;m.y=ny;
  }
  for(let i=crumbles.length-1;i>=0;i--){
    const c=crumbles[i];c.t-=dt;
    if(c.phase==='shake'&&c.t<=0){grid[c.ty][c.tx]=0;c.phase='gone';c.t=3;sfx('crack');burst(c.tx*T+T/2,c.ty*T+6,10,['#e9e2ff','#a99bff','#fff'],120,.8,3,500);}
    else if(c.phase==='gone'&&c.t<=0){
      const over=activePlayers().some(p=>p.x+p.w>c.tx*T&&p.x<c.tx*T+T&&p.y+p.h>c.ty*T&&p.y<c.ty*T+T);
      if(!over){grid[c.ty][c.tx]=5;crumbles.splice(i,1);}
    }
  }
  if(L.wind){
    const cyc=7,wt=lt%cyc,wd=Math.floor(lt/cyc)%2?-1:1;
    windStr=wt>3.5&&wt<6.3?Math.sin((wt-3.5)/2.8*Math.PI):0;
    windWarn=wt>2.6&&wt<=3.5?1:0;
    windV=wd*windStr*(player.onGround?120:170);windDir=wd;
  }else{windV=0;windStr=0;windWarn=0;}
  if(L.lightning&&lt>nextBolt){flash=1;bolt={sx:40+Math.random()*(viewW-80),life:.3,seed:Math.random()*99};nextBolt=lt+4+Math.random()*5;setTimeout(()=>sfx('thunder'),280);}
  if(L.timer){const before=Math.ceil(timeLeft);timeLeft-=dt;
    if(timeLeft<=10&&Math.ceil(timeLeft)!==before&&timeLeft>0)sfx('tick');
    if(timeLeft<=0){timeLeft=0;hearts=0;state='over';sfx('chime');toast('The clock struck twelve!',2600);updateHUD();setTimeout(()=>showOverlay('over'),1200);return;}}
  for(const p of activePlayers()){if(!updatePlayer(p,dt))return;}
  const p=player;
  for(const e of enemies){
    if(e.gone)continue;
    if(!e.active){if(e.x<cam+viewW+80)e.active=true;else continue;}
    if(e.dead){e.vy+=G*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;e.rot+=dt*12*Math.sign(e.vx||1);if(e.y>WORLD_H+300)e.gone=true;continue;}
    if(e.squash>0){e.squash-=dt;if(e.squash<=0){e.gone=true;burst(e.x+e.w/2,e.y+e.h,8,['#ffe9a8','#fff'],100,.5,2.5,100);}continue;}
    if(e.type==='owl'||e.type==='raven'||e.type==='imp'){
      e.x+=e.dir*e.sp*dt;if(Math.abs(e.x-e.x0)>100)e.dir=Math.sign(e.x0-e.x);
      e.y=e.y0+Math.sin(time*2.2+e.ph)*26;
    }else if(e.type==='rothbart'||e.type==='carabosse'||e.type==='koschei'){
      e.inv-=dt;e.t-=dt;
      const ax0=L.arena[0]*T,ax1=L.arena[1]*T,sp=e.sp+(3-e.hp)*40;
      if(e.mode==='hover'){
        e.x+=e.dir*sp*dt;if(e.x<ax0){e.x=ax0;e.dir=1;}if(e.x+e.w>ax1){e.x=ax1-e.w;e.dir=-1;}
        e.y+=(110+Math.sin(time*2)*18-e.y)*Math.min(1,dt*3);
        if(e.t<=0){const tp=nearestPlayer(e);e.mode='dive';e.tx=clamp(tp.x+tp.w/2-e.w/2,ax0,ax1-e.w);sfx('swoop');}
      }else if(e.mode==='dive'){
        const gy=400-e.h,dx=e.tx-e.x,dy=gy-e.y,dd=Math.hypot(dx,dy),v=(440+(3-e.hp)*80)*dt;
        e.dir=dx>=0?1:-1;
        if(dd<=v){e.x=e.tx;e.y=gy;e.mode='low';e.t=1.4-(3-e.hp)*.2;addTrauma(.45);burst(e.x+e.w/2,400,12,['rgba(255,255,255,.6)','#c9a6ff'],160,.5,3,0);}
        else{e.x+=dx/dd*v;e.y+=dy/dd*v;}
      }else if(e.mode==='low'){
        {const tp=nearestPlayer(e);e.x+=Math.sign(tp.x-e.x)*60*dt;e.dir=tp.x>e.x?1:-1;}e.y=400-e.h;if(e.t<=0)e.mode='rise';
      }else{e.y-=320*dt;if(e.y<=110){e.mode='hover';e.t=Math.max(.9,1.6+Math.random()*1.4-(3-e.hp)*.35);}}
    }else if(e.type==='wolf'){
      e.inv-=dt;e.t-=dt;const ax0=L.arena[0]*T,ax1=L.arena[1]*T,tp=nearestPlayer(e);
      if(e.mode==='crouch'){e.vx=0;if(e.t<=0){e.mode='dash';e.t=.85;e.dir=tp.x<e.x?-1:1;sfx('swoop');}}
      else if(e.mode==='dash'){e.vx=(360+(3-e.hp)*50)*e.dir;if(Math.random()<.5)burst(e.x+e.w/2,e.y+e.h,1,['rgba(255,255,255,.5)'],40,.4,3,0);if(e.t<=0||e.x<ax0||e.x+e.w>ax1){e.mode='tired';e.t=1.5-(3-e.hp)*.2;}}
      else if(e.mode==='tired'){e.vx=0;if(e.t<=0){e.mode='walk';e.t=1.6+Math.random();}}
      else{e.vx=(e.sp+(3-e.hp)*20)*e.dir;if(e.x<ax0)e.dir=1;if(e.x+e.w>ax1)e.dir=-1;if(e.t<=0){e.mode='crouch';e.t=.6;e.dir=tp.x<e.x?-1:1;}}
      e.vy+=G*dt;moveBody(e,dt);if(e.hitWall&&e.mode!=='dash')e.dir*=-1;if(e.x<ax0){e.x=ax0;}if(e.x+e.w>ax1){e.x=ax1-e.w;}
    }else if(e.type==='stepmother'||e.type==='coppelius'){
      e.inv-=dt;e.hopT-=dt;if(e.stun>0){e.stun-=dt;e.vy+=G*dt;e.vx=0;moveBody(e,dt);}else{
      e.vx=(e.sp+(3-e.hp)*25)*e.dir;e.vy+=G*dt;moveBody(e,dt);if(e.hitWall)e.dir*=-1;
      if(e.x<L.arena[0]*T)e.dir=1;if(e.x+e.w>L.arena[1]*T)e.dir=-1;
      const mt=e.type==='coppelius'?'soldier':'broom';if(e.hopT<=0&&enemies.filter(q=>q.type===mt&&!q.gone&&!q.dead).length<3){e.hopT=2.4-(3-e.hp)*.35;const d=nearestPlayer(e).x<e.x?-1:1;e.dir=d;
        const bd=DIMS[mt];enemies.push({type:mt,x:e.x+e.w/2-bd.w/2,y:e.y+e.h-bd.h-30,w:bd.w,h:bd.h,sp:(bd.sp+50)*(SET.easy?.65:1),vx:0,vy:-420,dir:d,anim:0,dead:false,squash:0,rot:0,active:true,gone:false,hp:1,boss:false,inv:0,hopT:2,mode:'',t:0,x0:0,y0:0,ph:0});
        sfx('swoop');addText(e.x+e.w/2,e.y-10,mt==='soldier'?'Wind-up toys!':'Brooms!');}}
    }else if(e.type==='king'){
      e.inv-=dt;e.hopT-=dt;if(e.stun>0){e.stun-=dt;e.vx=0;e.vy+=G*dt;moveBody(e,dt);e.anim+=dt*2;continue;}
      e.vx=(e.sp+(3-e.hp)*35)*e.dir;e.vy+=G*dt;moveBody(e,dt);
      if(e.hitWall)e.dir*=-1;
      if(e.x<L.arena[0]*T)e.dir=1;if(e.x+e.w>L.arena[1]*T)e.dir=-1;
      if(e.onGround&&e.hopT<=0){e.vy=-560-(3-e.hp)*80;e.hopT=1.3+Math.random()*1.4;}
      if(e.onGround&&e.wasAir){addTrauma(.35);burst(e.x+e.w/2,e.y+e.h,8,['rgba(255,255,255,.6)'],120,.4,3,0);}
      e.wasAir=!e.onGround;
    }else{
      e.vx=e.sp*e.dir;e.vy+=G*dt;moveBody(e,dt);if(e.hitWall)e.dir*=-1;
      if(e.onGround){const fx=e.dir>0?e.x+e.w+2:e.x-2;if(!solidAt(Math.floor(fx/T),Math.floor((e.y+e.h+4)/T)))e.dir*=-1;}
    }
    e.anim+=dt*(e.type==='mouse'?12:e.type==='owl'?11:(e.type==='rothbart'||e.type==='carabosse')?(e.mode==='low'?5:10):(e.type==='raven'||e.type==='imp')?13:e.type==='koschei'?(e.mode==='low'?5:10):8);if(e.y>WORLD_H+100)e.gone=true;
  }
  for(const q of activePlayers()){curP=q;K=q===player2?keys2:keys;
    for(const e of enemies){if(e.gone||e.dead||e.squash>0||!e.active)continue;
      if(q.x+q.w-3>e.x&&q.x+3<e.x+e.w&&q.y+q.h>e.y+4&&q.y<e.y+e.h){hitEnemy(e,q,q.x+q.w/2,q.prevBottom);if(state!=='play')return;}}}
  curP=player;K=keys;
  if(boss&&boss.type==='king'&&boss.active&&!bossDefeated){
    if(!prince)prince={x:boss.x-200,y:400-44,t:4,slash:0,face:1};
    const tx=clamp(p.x-60,L.arena[0]*T+10,L.arena[1]*T-40);prince.x+=(tx-prince.x)*Math.min(1,dt*2.5);prince.face=boss.x>prince.x?1:-1;
    prince.t-=dt;prince.slash=Math.max(0,prince.slash-dt);
    if(prince.t<=0){prince.t=6.5;prince.slash=.5;waves.push({x:prince.x+14*prince.face,y:400-26,vx:420*prince.face,life:2.2});sfx('spin');addText(prince.x,prince.y-14,'For Clara!');}
  }
  for(const w of waves){w.x+=w.vx*dt;w.life-=dt;if(Math.random()<.6)parts.push({x:w.x,y:w.y+(Math.random()-.5)*26,vx:-w.vx*.1,vy:(Math.random()-.5)*30,life:.4,max:.4,c:'#ffe9a8',s:2.4,g:0,spark:true});
    if(boss&&!boss.dead&&w.life>0&&Math.abs(w.x-(boss.x+boss.w/2))<boss.w/2+8&&w.y>boss.y-10&&w.y<boss.y+boss.h+10){w.life=0;boss.stun=1.8;sfx('stomp');addTrauma(.3);burst(w.x,w.y,18,['#ffe9a8','#fff'],200,.6,3,100);addText(boss.x+boss.w/2,boss.y-18,'Stunned!');}}
  waves=waves.filter(w=>w.life>0);
  if(bossDefeated)goalA=Math.min(1,goalA+dt*1.5);
  if(bossDefeated&&activePlayers().some(q=>q.x+q.w>L.goal*T-6))winLevel();
  if(coop){const lead=player.x>player2.x?player:player2,lag=lead===player?player2:player;if(lead.x-lag.x>viewW*.8){lag.x=lead.x-40;lag.y=lead.y-40;lag.vx=0;lag.vy=0;lag.riding=null;burst(lag.x+lag.w/2,lag.y+20,18,['#fff','#ffe9a8','#7fe0c0'],160,.7,3,-30);}}
  updateHUD();
}
function updateFx(dt){
  for(const q of parts){q.life-=dt;q.vy+=q.g*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.98;}
  parts=parts.filter(q=>q.life>0);
  for(const t of texts){t.life-=dt*.9;t.y-=dt*70*t.life*t.life;}
  texts=texts.filter(t=>t.life>0);
  for(const r of items)r.t+=dt;
  if(gum){gum.t-=dt;if(gum.t<=0)gum=null;}
  if(mode==='story')for(const d of drafts){if(d.x+d.w<cam||d.x>cam+viewW)continue;if(Math.random()<dt*14)parts.push({x:d.x+Math.random()*d.w,y:470,vx:(Math.random()-.5)*20,vy:-140-Math.random()*120,life:2.4,max:2.4,c:'rgba(220,255,230,.7)',s:1.5+Math.random()*2,g:0,spark:false});}
  trauma=Math.max(0,trauma-1.3*dt);hurtFlash=Math.max(0,hurtFlash-dt*3);if(player.sq){player.sq.t+=dt;if(player.sq.t>=.22)player.sq=null;}flash=Math.max(0,flash-dt*2.2);if(bolt){bolt.life-=dt;if(bolt.life<=0)bolt=null;}
  if(mode==='dance'){cam+=dt*25;if(cam>COLS*T-viewW)cam=0;return;}
  if(state==='title'){cam+=dt*30;if(cam>COLS*T-viewW)cam=0;return;}
  // camera: look-ahead in the facing direction, frame-rate independent smoothing
  const fx=coop?(player.x+player2.x)/2+player.w/2:player.x+player.w/2;
  const leadT=coop?0:(Math.abs(player.vx)>60?Math.sign(player.vx):player.face)*Math.min(70,viewW*.07);
  camLead+=(leadT-camLead)*(1-Math.exp(-2.2*dt));
  const target=clamp(fx+camLead-viewW*(coop?.5:.42),0,Math.max(0,COLS*T-viewW));
  cam+=(target-cam)*(1-Math.exp(-7*dt));
  // vertical: on small screens the top of the level is hidden; slide up when the dancer climbs
  const hidden=Math.max(0,-offY/scale);
  if(hidden>0){const topP=coop?Math.min(player.y,player2.y):player.y;const grounded=coop?(player.onGround&&player2.onGround):player.onGround;
    let ty=clamp(hidden-(topP-120),0,hidden);if(!grounded&&ty<camY&&topP<WORLD_H-150)ty=camY;
    camY+=(ty-camY)*(1-Math.exp(-(grounded?4:2.5)*dt));}else camY=0;
}

