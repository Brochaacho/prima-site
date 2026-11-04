// ================= setup =================
if(!CanvasRenderingContext2D.prototype.roundRect){CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){r=Math.min(r,w/2,h/2);this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();}}
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const T=40,WORLD_H=480,COLS=172,ROWS=12,G=2000;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hash=i=>{const s=Math.sin(i*127.1+11.7)*43758.5453;return s-Math.floor(s);};
let W,H,DPR,scale,offY,viewW;
var LOWQ=false;
function resize(){
  DPR=Math.min(window.devicePixelRatio||1,LOWQ?1:2);W=innerWidth;H=innerHeight;
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  const coarse=matchMedia('(pointer:coarse)').matches;
  const avail=H-((coarse&&H>W)?180:0);
  if(coarse)scale=H>W?Math.min(avail/WORLD_H,W/330):Math.min(avail/420,W/520);
  else scale=Math.min(avail/WORLD_H,W/460);
  viewW=W/scale;offY=avail-WORLD_H*scale;
}
addEventListener('resize',resize);resize();
document.addEventListener('gesturestart',e=>e.preventDefault());
const isSolid=s=>s===1||s===3||s===4||s===9||s===10;

