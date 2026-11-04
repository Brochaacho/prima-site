// ================= loop =================
let fpsEma=16,slowT=0,fastT=0;
function setLowQ(v){if(LOWQ===v)return;LOWQ=v;resize();if(state==='maker')mkRenderUI();}
function perfTick(dt){
  if(document.hidden||dt<=0)return;fpsEma=fpsEma*.95+dt*1000*.05;
  if(SET.gfx==='low'){setLowQ(true);return;}if(SET.gfx==='high'){setLowQ(false);return;}
  if(state!=='play'&&state!=='dance')return;
  if(fpsEma>24){slowT+=dt;fastT=0;if(slowT>2.5)setLowQ(true);}else if(fpsEma<14){fastT+=dt;slowT=0;}else{slowT=0;}
}
let last=performance.now(),lastTouch=performance.now(),ctlIdle=false;
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,()=>{lastTouch=performance.now();},{capture:true,passive:true}));
function loop(now){
  const dt=Math.min(.033,(now-last)/1000);last=now;time+=dt;
  scheduleMusic();
  perfTick(dt);
  const sdt=hitStop>0?dt*.06:dt;hitStop=Math.max(0,hitStop-dt);
  for(let i=0;i<2;i++)update(sdt/2);
  if(state!=='map'&&state!=='maker'){updateFx(dt);draw();}
  {const idle=SET.cfade&&state==='play'&&performance.now()-lastTouch>2500;if(idle!==ctlIdle){ctlIdle=idle;$('controls').classList.toggle('idle',idle);$('coopctl').classList.toggle('idle',idle);}}
  requestAnimationFrame(loop);
}
(async()=>{
if(window.PrimaNative&&await PrimaNative.restoreIfEmpty()){location.reload();return;}
initCloud();
loadSettings();if(SET.gfx==='low')setLowQ(true);loadAch();loadShop();loadSecrets();loadStory();
setLevel(Math.min(unlocked,LEVELS.length)-1);resetLevel();cam=0;
showOverlay('title');
requestAnimationFrame(loop);
if(window.PrimaNative)PrimaNative.start();
})();
