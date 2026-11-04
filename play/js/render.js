// ================= render: backdrops =================
const bokeh=Array.from({length:46},()=>({star:Math.random()<.55,x:Math.random()*2000,y:-260+Math.random()*560,r:2+Math.random()*12,a:.04+Math.random()*.12,ph:Math.random()*6}));
const flakes=Array.from({length:110},()=>({x:Math.random()*2000,y:Math.random(),r:.8+Math.random()*2.4,s:.05+Math.random()*.1,d:.2+Math.random()*.6,ph:Math.random()*6}));
function drawBokeh(color,f){
  if(LOWQ)return;
  ctx.fillStyle=color;
  for(const b of bokeh){
    const x=((b.x-cam*f)%2000+2000)%2000;if(x>viewW+20)continue;
    const tw=.6+.4*Math.sin(time*2+b.ph);
    if(b.star){ctx.globalAlpha=Math.min(.9,b.a*4)*tw;const r=(b.r*.5+3)*tw;ctx.beginPath();for(let k=0;k<10;k++){const rr=k%2?r*.42:r,a=k*Math.PI/5-Math.PI/2;ctx.lineTo(x+Math.cos(a)*rr,b.y+Math.sin(a)*rr);}ctx.fill();}
    else{ctx.globalAlpha=b.a*(.7+.3*Math.sin(time*.8+b.ph));ctx.beginPath();ctx.arc(x,b.y,b.r,0,7);ctx.fill();}
  }
  ctx.globalAlpha=1;
}
function layer(spacing,f,fn){
  const pc=cam*f,s0=Math.floor(pc/spacing)-1;
  for(let i=s0;i<s0+Math.ceil(viewW/spacing)+3;i++)fn(i*spacing-pc,i);
}
function pine(x,base,h,col,cap){
  const tiers=3;
  for(let k=0;k<tiers;k++){
    const top=base-h+k*h*.25,bot=base-h*.35+k*h*.3,w=h*(.22+k*.1);
    ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x+w,bot);ctx.lineTo(x-w,bot);ctx.fill();
    if(cap){ctx.fillStyle=cap;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x+w*.35,top+(bot-top)*.35);ctx.lineTo(x-w*.35,top+(bot-top)*.35);ctx.fill();}
  }
  ctx.fillStyle=col;ctx.fillRect(x-4,base-h*.1,8,h*.1+2);
}
function clouds(col,a,f,yb=40){
  layer(560,f,(x,i)=>{
    const y=yb+hash(i+40)*110,s=.8+hash(i+41)*.6;ctx.globalAlpha=a;ctx.fillStyle=col;
    ctx.beginPath();ctx.arc(x,y,22*s,0,7);ctx.arc(x+28*s,y-12*s,30*s,0,7);ctx.arc(x+60*s,y-2*s,24*s,0,7);ctx.arc(x+84*s,y+6*s,16*s,0,7);ctx.fill();
    ctx.beginPath();ctx.roundRect(x-18*s,y,118*s,22*s,11*s);ctx.fill();ctx.globalAlpha=1;
  });
}
function moonFace(x,y,r){
  ctx.strokeStyle='rgba(90,90,140,.55)';ctx.lineWidth=r*.07;ctx.lineCap='round';
  ctx.beginPath();ctx.arc(x-r*.32,y-r*.08,r*.14,Math.PI*1.1,Math.PI*1.9);ctx.stroke();
  ctx.beginPath();ctx.arc(x+r*.32,y-r*.08,r*.14,Math.PI*1.1,Math.PI*1.9);ctx.stroke();
  ctx.beginPath();ctx.arc(x,y+r*.18,r*.22,.2,Math.PI-.2);ctx.stroke();
  ctx.fillStyle='rgba(255,160,190,.45)';ctx.beginPath();ctx.ellipse(x-r*.52,y+r*.2,r*.15,r*.09,0,0,7);ctx.ellipse(x+r*.52,y+r*.2,r*.15,r*.09,0,0,7);ctx.fill();
}
function backdrop(topY,botY,pulse){
  const k=L.theme.kind;
  if(k==='stage'){
    drawBokeh('#ffd6e7',.15);
    ctx.strokeStyle='rgba(255,255,255,.045)';ctx.lineWidth=12;
    layer(360,.4,x=>{ctx.fillStyle='rgba(255,255,255,.035)';ctx.fillRect(x-13,150,26,250);ctx.beginPath();ctx.arc(x+180,160,167,Math.PI,0);ctx.stroke();});
    layer(1080,.4,(x,i)=>{
      const tx=x+540,h=230;
      ctx.fillStyle='rgba(20,60,50,.35)';
      for(let t=0;t<4;t++){const top=400-h+t*45,w=30+t*22;ctx.beginPath();ctx.moveTo(tx,top);ctx.lineTo(tx+w,top+80);ctx.lineTo(tx-w,top+80);ctx.fill();}
      ctx.fillStyle='rgba(255,233,168,.7)';ctx.beginPath();ctx.arc(tx,400-h-4,5,0,7);ctx.fill();
      const cols=['#ff7aa2','#ffe9a8','#9fd0ff','#b8f0c8'];
      for(let j=0;j<18;j++){const hy=hash(j+i*31),yy=400-h+30+hy*200,ww=(yy-(400-h))*.33;
        ctx.globalAlpha=.35+.55*(j%2?pulse:1-pulse);ctx.fillStyle=cols[j%4];ctx.beginPath();ctx.arc(tx+(hash(j*7+i)-.5)*2*ww,yy,2.4,0,7);ctx.fill();}
      ctx.globalAlpha=1;
    });
  }else if(k==='snow'){
    const mx=viewW*.78-cam*.02;
    const mg=ctx.createRadialGradient(mx,70,0,mx,70,120);mg.addColorStop(0,'rgba(230,240,255,.35)');mg.addColorStop(1,'rgba(230,240,255,0)');
    ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,70,120,0,7);ctx.fill();
    ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(mx,70,30,0,7);ctx.fill();moonFace(mx,70,30);
    drawBokeh('#ffffff',.06);clouds('#dfe9ff',.13,.12);
    layer(110,.22,(x,i)=>pine(x,400,110+hash(i)*90,'rgba(150,180,240,.09)'));
    layer(190,.5,(x,i)=>pine(x+hash(i+5)*60,410,170+hash(i+3)*110,'rgba(8,14,34,.6)','rgba(235,243,255,.22)'));
  }else if(k==='lake'){
    const mx=viewW*.72-cam*.02;
    const mg=ctx.createRadialGradient(mx,90,0,mx,90,150);mg.addColorStop(0,'rgba(234,242,255,.35)');mg.addColorStop(1,'rgba(234,242,255,0)');
    ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,90,150,0,7);ctx.fill();
    ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(mx,90,34,0,7);ctx.fill();moonFace(mx,90,34);clouds('#e6eeff',.12,.1,30);
    drawBokeh('#dfe9ff',.08);
    layer(1100,.15,(x,i)=>{
      ctx.fillStyle='rgba(12,22,44,.55)';const bx=x+300;
      ctx.fillRect(bx,250,220,150);ctx.fillRect(bx-30,200,40,200);ctx.fillRect(bx+90,170,36,230);ctx.fillRect(bx+200,215,34,185);
      [[bx-10,200],[bx+108,170],[bx+217,215]].forEach(([tx,ty])=>{ctx.beginPath();ctx.moveTo(tx-24,ty);ctx.lineTo(tx,ty-46);ctx.lineTo(tx+24,ty);ctx.fill();});
      ctx.fillStyle='rgba(255,225,160,.35)';ctx.fillRect(bx+102,210,6,12);ctx.fillRect(bx+40,290,6,10);
    });
    const mist=ctx.createLinearGradient(0,320,0,420);mist.addColorStop(0,'rgba(200,220,255,0)');mist.addColorStop(1,'rgba(200,220,255,.12)');
    ctx.fillStyle=mist;ctx.fillRect(0,320,viewW,100);
    layer(520,.3,(x,i)=>{
      const sx=x+((time*8+hash(i)*200)%300),sy=392;
      ctx.fillStyle='rgba(245,248,255,.55)';ctx.beginPath();ctx.ellipse(sx,sy,13,5,0,0,7);ctx.fill();
      ctx.strokeStyle='rgba(245,248,255,.55)';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(sx+8,sy-2);ctx.quadraticCurveTo(sx+14,sy-10,sx+10,sy-16);ctx.quadraticCurveTo(sx+12,sy-19,sx+15,sy-17);ctx.stroke();
    });
    layer(46,.75,(x,i)=>{if(hash(i)<.55)return;ctx.strokeStyle='rgba(10,24,30,.7)';ctx.lineWidth=2;const h=40+hash(i+1)*50;ctx.beginPath();ctx.moveTo(x,440);ctx.quadraticCurveTo(x+4,440-h/2,x+(hash(i+2)-.5)*16,440-h);ctx.stroke();});
  }else if(k==='studio'){
    layer(900,.15,(x,i)=>{const wx=x+300;ctx.fillStyle='rgba(255,240,220,.25)';ctx.beginPath();ctx.roundRect(wx,60,110,220,[55,55,6,6]);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(wx+55,60);ctx.lineTo(wx+55,280);ctx.moveTo(wx,170);ctx.lineTo(wx+110,170);ctx.stroke();
      const g=ctx.createLinearGradient(wx,80,wx+260,420);g.addColorStop(0,'rgba(255,240,200,.25)');g.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(wx,80);ctx.lineTo(wx+110,80);ctx.lineTo(wx+320,420);ctx.lineTo(wx+150,420);ctx.fill();});
    layer(260,.4,(x,i)=>{ctx.fillStyle='rgba(220,235,255,.18)';ctx.fillRect(x+10,150,220,250);ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.strokeRect(x+10,150,220,250);
      ctx.fillStyle='rgba(255,255,255,.15)';ctx.beginPath();ctx.moveTo(x+40,150);ctx.lineTo(x+80,150);ctx.lineTo(x+20,240);ctx.lineTo(x+10,240);ctx.lineTo(x+10,195);ctx.fill();});
    layer(260,.55,(x,i)=>{ctx.fillStyle='rgba(120,70,40,.9)';ctx.fillRect(x,318,260,7);ctx.fillRect(x+30,318,5,40);ctx.fillRect(x+220,318,5,40);});
    drawBokeh('#fff0f6',.08);
  }else if(k==='meadow'){
    const sx=viewW*.8,sy=78;ctx.save();ctx.translate(sx,sy);ctx.rotate(time*.15);ctx.fillStyle='rgba(255,243,196,.3)';for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(0,-140);ctx.lineTo(9,0);ctx.fill();}ctx.restore();
    ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(sx,sy,32,0,7);ctx.fill();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(sx-10,sy-4,2.6,0,7);ctx.arc(sx+10,sy-4,2.6,0,7);ctx.fill();ctx.strokeStyle='#c2556f';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx,sy+5,8,.2,Math.PI-.2);ctx.stroke();
    clouds('#ffffff',.9,.1,30);
    layer(620,.2,(x,i)=>{ctx.fillStyle='rgba(120,200,110,.8)';ctx.beginPath();ctx.ellipse(x+310,410,380,110,0,Math.PI,0);ctx.fill();});
    layer(1300,.3,(x,i)=>{const hx=x+500;ctx.fillStyle='#fff0e0';ctx.fillRect(hx,300,90,70);ctx.fillStyle='#e8603a';ctx.beginPath();ctx.moveTo(hx-12,300);ctx.lineTo(hx+45,255);ctx.lineTo(hx+102,300);ctx.fill();ctx.fillStyle='#8a5a3a';ctx.fillRect(hx+36,330,18,40);ctx.fillStyle='#9fd0ff';ctx.fillRect(hx+10,315,16,14);ctx.fillRect(hx+64,315,16,14);
      ctx.strokeStyle='#fff';ctx.lineWidth=3;for(let k=0;k<9;k++){ctx.beginPath();ctx.moveTo(hx+110+k*14,372);ctx.lineTo(hx+110+k*14,350);ctx.stroke();}ctx.beginPath();ctx.moveTo(hx+104,358);ctx.lineTo(hx+236,358);ctx.stroke();});
    layer(240,.45,(x,i)=>{ctx.fillStyle='#5a3a2a';ctx.fillRect(x-5,300,10,100);ctx.fillStyle='#4fa866';ctx.beginPath();ctx.arc(x,290,34,0,7);ctx.arc(x-24,306,24,0,7);ctx.arc(x+24,306,24,0,7);ctx.fill();});
    layer(90,.7,(x,i)=>{if(hash(i)<.4)return;const fc=['#fff','#ffe27a','#ff9ec0','#c9a6ff'][i&3];ctx.strokeStyle='#4f9a4f';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,425);ctx.lineTo(x,410);ctx.stroke();ctx.fillStyle=fc;ctx.beginPath();ctx.arc(x,408,4,0,7);ctx.fill();});
  }else if(k==='wood'){
    const mx=viewW*.75-cam*.02;ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(mx,80,28,0,7);ctx.fill();moonFace(mx,80,28);
    drawBokeh('#d8ffb0',.18);
    layer(110,.22,(x,i)=>pine(x,400,140+hash(i)*90,'rgba(30,60,50,.45)'));
    layer(190,.5,(x,i)=>pine(x+hash(i+5)*60,410,190+hash(i+3)*110,'rgba(10,22,16,.75)'));
  }else if(k==='workshop'){
    layer(380,.25,(x,i)=>{const cx=x+190,cy=150+hash(i)*120,r=40+hash(i+1)*40;ctx.save();ctx.translate(cx,cy);ctx.rotate(time*.4*(i%2?1:-1));ctx.fillStyle='rgba(255,210,150,.08)';for(let k=0;k<10;k++){ctx.rotate(Math.PI/5);ctx.fillRect(-r*.15,-r-10,r*.3,22);}ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();ctx.fillStyle='rgba(40,20,10,.25)';ctx.beginPath();ctx.arc(0,0,r*.35,0,7);ctx.fill();ctx.restore();});
    layer(420,.45,(x,i)=>{ctx.fillStyle='rgba(90,50,30,.85)';ctx.fillRect(x,240,170,8);const tc=['#ff9ec0','#9fd0ff','#ffd36e','#7fe0c0'];
      for(let k=0;k<4;k++){const tx=x+18+k*40;ctx.fillStyle=tc[(i+k)&3];if(k%2){ctx.beginPath();ctx.roundRect(tx-8,212,16,28,4);ctx.fill();ctx.fillStyle='#f6d6c4';ctx.beginPath();ctx.arc(tx,206,7,0,7);ctx.fill();}else{ctx.beginPath();ctx.arc(tx,226,13,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(tx-13,224,26,3);}}});
    layer(900,.3,(x,i)=>{const lx=x+450,g=ctx.createRadialGradient(lx,90,0,lx,90,180);g.addColorStop(0,'rgba(255,220,150,.3)');g.addColorStop(1,'rgba(255,220,150,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(lx,90,180,0,7);ctx.fill();ctx.fillStyle='#ffe6a8';ctx.beginPath();ctx.moveTo(lx-20,90);ctx.lineTo(lx+20,90);ctx.lineTo(lx+10,70);ctx.lineTo(lx-10,70);ctx.fill();});
  }else if(k==='attic'){
    ctx.strokeStyle='rgba(120,90,70,.35)';ctx.lineWidth=14;layer(320,.3,(x,i)=>{ctx.beginPath();ctx.moveTo(x,-40);ctx.lineTo(x+160,180);ctx.lineTo(x+320,-40);ctx.stroke();});
    layer(1100,.15,(x,i)=>{const wx=x+500;ctx.fillStyle='#1a2a5a';ctx.beginPath();ctx.arc(wx,140,50,0,7);ctx.fill();ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(wx+14,128,16,0,7);ctx.fill();ctx.strokeStyle='#5a3a2a';ctx.lineWidth=6;ctx.beginPath();ctx.arc(wx,140,50,0,7);ctx.moveTo(wx-50,140);ctx.lineTo(wx+50,140);ctx.moveTo(wx,90);ctx.lineTo(wx,190);ctx.stroke();});
    layer(300,.5,(x,i)=>{const dx=x+80,sw=Math.sin(time*1.2+i)*.12;ctx.save();ctx.translate(dx,40);ctx.rotate(sw);ctx.strokeStyle='rgba(200,180,160,.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-80);ctx.lineTo(0,60);ctx.stroke();
      ctx.fillStyle='rgba(40,28,36,.85)';ctx.beginPath();ctx.arc(0,66,8,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(-10,74);ctx.lineTo(10,74);ctx.lineTo(14,100);ctx.lineTo(-14,100);ctx.fill();ctx.restore();});
    drawBokeh('#e8d8c8',.1);
  }else if(k==='firegarden'){
    drawBokeh('#ffb066',.12);
    layer(700,.3,(x,i)=>{const tx=x+350;ctx.fillStyle='rgba(60,20,20,.85)';ctx.fillRect(tx-10,220,20,180);ctx.fillStyle='rgba(90,40,30,.75)';ctx.beginPath();ctx.arc(tx,200,80,0,7);ctx.arc(tx-60,230,50,0,7);ctx.arc(tx+60,230,50,0,7);ctx.fill();
      for(let k=0;k<9;k++){const ax=tx+(hash(i*9+k)-.5)*170,ay=180+hash(i*5+k)*80;const g=ctx.createRadialGradient(ax,ay,0,ax,ay,14);g.addColorStop(0,'rgba(255,220,120,.7)');g.addColorStop(1,'rgba(255,220,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(ax,ay,14,0,7);ctx.fill();ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.arc(ax,ay,4.5,0,7);ctx.fill();}});
    layer(420,.5,(x,i)=>{ctx.strokeStyle='rgba(255,150,90,.12)';ctx.lineWidth=14;ctx.beginPath();ctx.arc(x+210,240,120,Math.PI,0);ctx.stroke();ctx.fillStyle='rgba(255,150,90,.08)';ctx.fillRect(x+83,240,14,160);});
    {const fx=((time*90)%(viewW+400))-200,fy=90+Math.sin(time*1.5)*30;ctx.save();ctx.translate(fx,fy);ctx.globalAlpha=.55;ctx.fillStyle='#ff8a3a';ctx.beginPath();ctx.ellipse(0,0,16,7,0,0,7);ctx.fill();const fl=Math.sin(time*8)*.5;
      ctx.fillStyle='#ffb066';for(const sd of [-1,1]){ctx.save();ctx.scale(1,sd);ctx.rotate(-.4-fl);ctx.beginPath();ctx.ellipse(-4,-10,18,5,-.3,0,7);ctx.fill();ctx.restore();}ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(-44,-8);ctx.lineTo(-38,0);ctx.lineTo(-46,8);ctx.closePath();ctx.fill();ctx.globalAlpha=1;ctx.restore();}
  }else if(k==='koschei'){
    drawBokeh('#8affb0',.1);
    layer(520,.25,(x,i)=>{const bx=x+260;ctx.fillStyle='rgba(10,30,20,.85)';ctx.fillRect(bx-40,180,80,220);ctx.beginPath();ctx.moveTo(bx-46,180);ctx.quadraticCurveTo(bx-46,120,bx,100);ctx.quadraticCurveTo(bx+46,120,bx+46,180);ctx.fill();ctx.fillRect(bx-2,70,4,32);
      ctx.fillStyle='rgba(138,255,176,.45)';ctx.fillRect(bx-8,220,16,24);ctx.fillRect(bx-8,280,16,24);});
    layer(300,.55,(x,i)=>{ctx.fillStyle='rgba(10,20,14,.9)';ctx.fillRect(x-3,280,6,30);ctx.fillRect(x-8,276,16,6);const fl=1+Math.sin(time*11+i)*.18;const g=ctx.createRadialGradient(x,262,0,x,262,36);g.addColorStop(0,'rgba(120,255,160,.35)');g.addColorStop(1,'rgba(120,255,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,262,36,0,7);ctx.fill();ctx.fillStyle='#9fffb8';ctx.beginPath();ctx.ellipse(x,266,5,12*fl,0,0,7);ctx.fill();});
  }else if(k==='garden'){
    const sx=viewW*.82,sy=80;
    ctx.save();ctx.translate(sx,sy);ctx.rotate(time*.15);ctx.fillStyle='rgba(255,243,196,.28)';for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(0,-150);ctx.lineTo(10,0);ctx.fill();}ctx.restore();
    ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(sx,sy,34,0,7);ctx.fill();
    ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(sx-10,sy-4,2.8,0,7);ctx.arc(sx+10,sy-4,2.8,0,7);ctx.fill();
    ctx.strokeStyle='#c2556f';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx,sy+5,8,.2,Math.PI-.2);ctx.stroke();
    ctx.fillStyle='rgba(255,140,170,.55)';ctx.beginPath();ctx.ellipse(sx-19,sy+5,5,3,0,0,7);ctx.ellipse(sx+19,sy+5,5,3,0,0,7);ctx.fill();
    clouds('#ffffff',.9,.1,30);
    layer(1100,.15,(x,i)=>{const bx=x+300;ctx.fillStyle='#ffe6f2';ctx.fillRect(bx,250,220,150);ctx.fillRect(bx-30,190,44,210);ctx.fillRect(bx+90,160,40,240);ctx.fillRect(bx+200,205,38,195);
      ctx.fillStyle='#b48cff';[[bx-8,190,30],[bx+110,160,28],[bx+219,205,27]].forEach(([tx,ty,w])=>{ctx.beginPath();ctx.moveTo(tx-w,ty);ctx.lineTo(tx,ty-52);ctx.lineTo(tx+w,ty);ctx.fill();});
      ctx.fillStyle='#ff7aa8';[[bx-8,138],[bx+110,108],[bx+219,153]].forEach(([fx,fy])=>{ctx.fillRect(fx-1,fy-14,2,14);ctx.beginPath();ctx.moveTo(fx+1,fy-14);ctx.lineTo(fx+14,fy-10+Math.sin(time*4+fx)*2);ctx.lineTo(fx+1,fy-6);ctx.fill();});
      ctx.fillStyle='#ffd0e6';ctx.beginPath();ctx.arc(bx+110,300,22,Math.PI,0);ctx.fillRect(bx+88,300,44,100);ctx.fill();ctx.fillStyle='#9fd0ff';for(const wx of [bx+20,bx+170])ctx.fillRect(wx,280,14,20);});
    layer(620,.35,(x,i)=>{ctx.fillStyle='rgba(110,200,120,.9)';ctx.beginPath();ctx.ellipse(x+310,420,360,90,0,Math.PI,0);ctx.fill();});
    layer(170,.6,(x,i)=>{ctx.fillStyle='#4fa866';ctx.beginPath();ctx.arc(x,398,22,0,7);ctx.arc(x+22,392,26,0,7);ctx.arc(x+46,400,20,0,7);ctx.fill();
      const fc=['#ff9ec0','#ffe27a','#fff','#c9a6ff'];for(let k=0;k<4;k++){ctx.fillStyle=fc[(i+k)&3];ctx.beginPath();ctx.arc(x+hash(i*5+k)*50,382+hash(i*3+k)*16,3,0,7);ctx.fill();}});
  }else if(k==='thorn'){
    const mx=viewW*.75-cam*.02;ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(mx,80,30,0,7);ctx.fill();moonFace(mx,80,30);
    drawBokeh('#ffd6f0',.08);
    layer(1300,.12,(x,i)=>{const bx=x+500;ctx.fillStyle='rgba(30,14,44,.8)';ctx.fillRect(bx,170,60,230);ctx.beginPath();ctx.moveTo(bx-10,170);ctx.lineTo(bx+30,90);ctx.lineTo(bx+70,170);ctx.fill();ctx.fillStyle='rgba(255,220,150,.5)';ctx.fillRect(bx+25,200,10,16);});
    const vine=(x,i,col,w,rcol)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,420);const h=200+hash(i)*120;ctx.bezierCurveTo(x+60,420-h*.3,x-60,420-h*.6,x+20,420-h);ctx.quadraticCurveTo(x+50,420-h-30,x+30,420-h-50);ctx.stroke();
      ctx.fillStyle=rcol;ctx.beginPath();ctx.arc(x+20,420-h,9,0,7);ctx.fill();ctx.beginPath();ctx.arc(x+10+hash(i+3)*20,420-h*.55,7,0,7);ctx.fill();};
    layer(260,.35,(x,i)=>vine(x,i,'rgba(40,80,50,.55)',10,'rgba(255,120,160,.5)'));
    layer(340,.6,(x,i)=>vine(x+100,i+50,'rgba(20,46,28,.85)',14,'rgba(255,92,134,.85)'));
  }else if(k==='tower'){
    ctx.fillStyle='rgba(255,255,255,.035)';
    layer(80,.3,(x,i)=>{for(let r=0;r<12;r++){const ry=r*38-60;ctx.beginPath();ctx.roundRect(x+(r%2?40:0),ry,74,32,6);ctx.fill();}});
    layer(420,.35,(x,i)=>{const wx=x+200;ctx.fillStyle='rgba(120,255,140,.12)';ctx.beginPath();ctx.moveTo(wx-34,330);ctx.lineTo(wx-34,170);ctx.quadraticCurveTo(wx,110,wx+34,170);ctx.lineTo(wx+34,330);ctx.fill();
      ctx.strokeStyle='rgba(10,6,16,.6)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(wx,130);ctx.lineTo(wx,330);ctx.moveTo(wx-34,240);ctx.lineTo(wx+34,240);ctx.stroke();});
    layer(300,.55,(x,i)=>{ctx.fillStyle='rgba(30,20,40,.9)';ctx.fillRect(x-3,280,6,30);ctx.fillRect(x-8,276,16,6);
      const fl=1+Math.sin(time*11+i)*.18;const g=ctx.createRadialGradient(x,262,0,x,262,36);g.addColorStop(0,'rgba(120,255,120,.35)');g.addColorStop(1,'rgba(120,255,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,262,36,0,7);ctx.fill();
      ctx.fillStyle='#9fff9a';ctx.beginPath();ctx.ellipse(x,266,5,12*fl,0,0,7);ctx.fill();ctx.fillStyle='#eaffea';ctx.beginPath();ctx.ellipse(x,270,2.5,6*fl,0,0,7);ctx.fill();});
  }else if(k==='kitchen'){
    ctx.fillStyle='rgba(255,180,120,.05)';layer(90,.25,(x,i)=>{for(let r=0;r<14;r++){const ry=r*30-80;ctx.fillRect(x+(r%2?45:0),ry,84,24);}});
    layer(1300,.2,(x,i)=>{const wx=x+900;ctx.fillStyle='#1a2a5a';ctx.beginPath();ctx.roundRect(wx,90,110,130,10);ctx.fill();ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(wx+75,130,16,0,7);ctx.fill();moonFace(wx+75,130,16);ctx.strokeStyle='#6a3a20';ctx.lineWidth=6;ctx.beginPath();ctx.roundRect(wx,90,110,130,10);ctx.moveTo(wx+55,90);ctx.lineTo(wx+55,220);ctx.moveTo(wx,155);ctx.lineTo(wx+110,155);ctx.stroke();});
    layer(1000,.3,(x,i)=>{const fx=x+300;ctx.fillStyle='rgba(60,30,20,.9)';ctx.beginPath();ctx.roundRect(fx-110,180,220,220,14);ctx.fill();ctx.fillStyle='#1a0e08';ctx.beginPath();ctx.moveTo(fx-70,400);ctx.lineTo(fx-70,280);ctx.quadraticCurveTo(fx,220,fx+70,280);ctx.lineTo(fx+70,400);ctx.fill();
      for(let k=0;k<5;k++){const fl=Math.sin(time*9+k*1.7)*.25+1;ctx.fillStyle=['#ff6a2a','#ffb347','#ffe27a'][k%3];ctx.beginPath();ctx.ellipse(fx-36+k*18,392-14*fl,9,26*fl,0,0,7);ctx.fill();}
      const g=ctx.createRadialGradient(fx,370,0,fx,370,160);g.addColorStop(0,'rgba(255,170,80,.35)');g.addColorStop(1,'rgba(255,170,80,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(fx,370,160,0,7);ctx.fill();});
    layer(380,.45,(x,i)=>{ctx.fillStyle='rgba(120,70,40,.8)';ctx.fillRect(x,230,150,8);const jc=['#ff8fbf','#9fd0ff','#ffd36e','#7fe0c0'];for(let k=0;k<4;k++){ctx.fillStyle=jc[(i+k)&3];ctx.globalAlpha=.75;ctx.beginPath();ctx.roundRect(x+10+k*34,200-hash(i*4+k)*14,22,30+hash(i*4+k)*14,6);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#d8b890';ctx.fillRect(x+12+k*34,196-hash(i*4+k)*14,18,6);}});
  }else if(k==='road'){
    drawBokeh('#ffffff',.06);
    const mx=viewW*.2-cam*.02;ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(mx,90,28,0,7);ctx.fill();ctx.fillStyle=L.theme.bg[0];ctx.beginPath();ctx.arc(mx+14,82,24,0,7);ctx.fill();
    layer(1500,.08,(x,i)=>{const px=x+800;ctx.fillStyle='rgba(40,50,110,.9)';ctx.beginPath();ctx.ellipse(px,330,300,90,0,Math.PI,0);ctx.fill();
      ctx.fillStyle='rgba(230,230,255,.85)';ctx.fillRect(px-60,200,120,60);ctx.fillRect(px-80,170,30,90);ctx.fillRect(px+50,170,30,90);ctx.fillRect(px-14,150,28,60);
      ctx.fillStyle='rgba(180,160,255,.9)';[[px-65,170,20],[px+65,170,20],[px,150,18]].forEach(([tx,ty,w])=>{ctx.beginPath();ctx.moveTo(tx-w,ty);ctx.lineTo(tx,ty-34);ctx.lineTo(tx+w,ty);ctx.fill();});
      ctx.fillStyle='#ffe27a';for(let k=0;k<5;k++)ctx.fillRect(px-50+k*22,220,8,12);});
    layer(700,.25,(x,i)=>{ctx.fillStyle='rgba(30,44,90,.9)';ctx.beginPath();ctx.ellipse(x+350,420,400,110,0,Math.PI,0);ctx.fill();});
    layer(520,.4,(x,i)=>{ctx.fillStyle='rgba(22,34,70,.95)';ctx.beginPath();ctx.ellipse(x+260,430,300,80,0,Math.PI,0);ctx.fill();});
    layer(200,.7,(x,i)=>{ctx.fillStyle='rgba(20,24,40,.9)';ctx.fillRect(x-2,330,4,70);const g=ctx.createRadialGradient(x,326,0,x,326,30);g.addColorStop(0,'rgba(255,220,140,.45)');g.addColorStop(1,'rgba(255,220,140,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,326,30,0,7);ctx.fill();ctx.fillStyle='#ffe6a8';ctx.beginPath();ctx.roundRect(x-5,318,10,14,3);ctx.fill();});
  }else if(k==='ballroom'){
    drawBokeh('#ffe6a8',.1);
    layer(520,.3,(x,i)=>{const wx=x+260;ctx.fillStyle='rgba(150,180,255,.12)';ctx.beginPath();ctx.moveTo(wx-40,360);ctx.lineTo(wx-40,170);ctx.quadraticCurveTo(wx,120,wx+40,170);ctx.lineTo(wx+40,360);ctx.fill();
      ctx.fillStyle='rgba(200,60,100,.35)';ctx.beginPath();ctx.moveTo(wx-60,140);ctx.quadraticCurveTo(wx-40,260,wx-56,370);ctx.lineTo(wx-40,370);ctx.quadraticCurveTo(wx-30,240,wx-20,150);ctx.fill();ctx.beginPath();ctx.moveTo(wx+60,140);ctx.quadraticCurveTo(wx+40,260,wx+56,370);ctx.lineTo(wx+40,370);ctx.quadraticCurveTo(wx+30,240,wx+20,150);ctx.fill();});
    layer(260,.45,(x,i)=>{ctx.fillStyle='rgba(255,230,168,.08)';ctx.fillRect(x-14,120,28,280);ctx.fillRect(x-20,112,40,10);ctx.fillRect(x-20,392,40,8);});
    const cx=viewW/2,cy=150,R=56,tot=L.timer||120,rem=Math.max(0,timeLeft),fr=rem/tot;
    ctx.fillStyle='rgba(60,40,20,.6)';ctx.beginPath();ctx.arc(cx,cy,R+8,0,7);ctx.fill();
    ctx.fillStyle='#fff8e8';ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();ctx.strokeStyle='#f2c66d';ctx.lineWidth=4;ctx.stroke();
    ctx.fillStyle='#8a6a3a';for(let k=0;k<12;k++){const a=k*Math.PI/6;ctx.beginPath();ctx.arc(cx+Math.cos(a)*(R-9),cy+Math.sin(a)*(R-9),k%3?1.6:3,0,7);ctx.fill();}
    const ma=-Math.PI/2-fr*Math.PI/3,ha=-Math.PI/2-fr*Math.PI/36;
    ctx.strokeStyle='#3a2a1a';ctx.lineCap='round';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ha)*R*.5,cy+Math.sin(ha)*R*.5);ctx.stroke();
    ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ma)*R*.8,cy+Math.sin(ma)*R*.8);ctx.stroke();
    ctx.fillStyle='#d24a62';ctx.beginPath();ctx.arc(cx,cy,3.5,0,7);ctx.fill();
    layer(700,.45,(x,i)=>{const cx2=x+350,cy2=40;ctx.save();ctx.translate(cx2,topY);ctx.strokeStyle='rgba(255,230,168,.3)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,cy2-topY);ctx.stroke();ctx.translate(0,cy2-topY);
      ctx.strokeStyle='rgba(255,230,168,.45)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,50,10,0,0,7);ctx.stroke();
      for(let j=0;j<9;j++){const a=j/9*Math.PI*2;ctx.globalAlpha=.4+.5*Math.max(0,Math.sin(time*3+j+i));ctx.fillStyle='#fff6d8';ctx.beginPath();ctx.arc(Math.cos(a)*50,Math.sin(a)*10-4,2.4,0,7);ctx.fill();}
      ctx.globalAlpha=1;ctx.restore();});
  }else if(k==='storm'){
    layer(600,.08,(x,i)=>{const y=10+hash(i)*120,s=1.2+hash(i+1)*.8;ctx.fillStyle='rgba(20,28,44,.55)';ctx.beginPath();ctx.arc(x,y,40*s,0,7);ctx.arc(x+50*s,y-14*s,50*s,0,7);ctx.arc(x+105*s,y,40*s,0,7);ctx.fill();ctx.fillRect(x-20*s,y,150*s,30*s);});
    layer(1100,.15,(x,i)=>{ctx.fillStyle='rgba(8,14,26,.6)';const bx=x+300;ctx.fillRect(bx,250,220,150);ctx.fillRect(bx-30,200,40,200);ctx.fillRect(bx+90,170,36,230);
      [[bx-10,200],[bx+108,170]].forEach(([tx,ty])=>{ctx.beginPath();ctx.moveTo(tx-24,ty);ctx.lineTo(tx,ty-46);ctx.lineTo(tx+24,ty);ctx.fill();});});
    layer(46,.75,(x,i)=>{if(hash(i)<.55)return;ctx.strokeStyle='rgba(8,18,26,.7)';ctx.lineWidth=2;const h=40+hash(i+1)*50,bend=windV*.08;ctx.beginPath();ctx.moveTo(x,440);ctx.quadraticCurveTo(x+4+bend,440-h/2,x+(hash(i+2)-.5)*16+bend*2,440-h);ctx.stroke();});
  }else if(k==='dawn'){
    const prog=clamp(cam/Math.max(1,COLS*T-viewW),0,1),sx=viewW*.68,sy=320-prog*230;
    ctx.save();ctx.translate(sx,sy);ctx.rotate(time*.15);ctx.fillStyle='rgba(255,243,196,.18)';
    for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(0,-260);ctx.lineTo(12,0);ctx.fill();}ctx.restore();
    const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,140);sg.addColorStop(0,'rgba(255,240,180,.6)');sg.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,140,0,7);ctx.fill();
    ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(sx,sy,46,0,7);ctx.fill();
    ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(sx-14,sy-6,3.6,0,7);ctx.arc(sx+14,sy-6,3.6,0,7);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(sx-12.8,sy-7.4,1.3,0,7);ctx.arc(sx+15.2,sy-7.4,1.3,0,7);ctx.fill();
    ctx.strokeStyle='#c2556f';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx,sy+6,10,.2,Math.PI-.2);ctx.stroke();
    ctx.fillStyle='rgba(255,140,170,.55)';ctx.beginPath();ctx.ellipse(sx-25,sy+6,7,4,0,0,7);ctx.ellipse(sx+25,sy+6,7,4,0,0,7);ctx.fill();
    clouds('#ffffff',.55,.12,30);clouds('#ffd6e6',.45,.25,150);
    layer(760,.3,(x,i)=>{for(let k=0;k<5;k++){const bx=x+((time*20)%760)+k*22-(k>2?(k-2)*44:0),by=110+Math.abs(k-2)*10+hash(i)*30,f=Math.sin(time*6+k)*4;
      ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(bx-8,by-f);ctx.quadraticCurveTo(bx-4,by-4,bx,by);ctx.quadraticCurveTo(bx+4,by-4,bx+8,by-f);ctx.stroke();}});
  }else if(k==='forest'){
    for(let i=0;i<4;i++){const bx=((i*360-cam*.08)%1440+1440)%1440-200;const g=ctx.createLinearGradient(bx,0,bx+200,400);g.addColorStop(0,'rgba(220,255,230,.07)');g.addColorStop(1,'rgba(220,255,230,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(bx,-200);ctx.lineTo(bx+70,-200);ctx.lineTo(bx+260,420);ctx.lineTo(bx+160,420);ctx.fill();}
    layer(130,.25,(x,i)=>{const h=220+hash(i)*120;ctx.fillStyle='rgba(20,60,40,.35)';ctx.fillRect(x-6,400-h,12,h);ctx.beginPath();ctx.arc(x,400-h,40+hash(i+1)*20,0,7);ctx.arc(x-26,400-h+26,30,0,7);ctx.arc(x+26,400-h+22,32,0,7);ctx.fill();});
    layer(230,.5,(x,i)=>{const h=300;ctx.fillStyle='rgba(4,14,9,.65)';ctx.beginPath();ctx.moveTo(x-14,400);ctx.lineTo(x-9,400-h);ctx.lineTo(x+9,400-h);ctx.lineTo(x+16,400);ctx.fill();ctx.fillStyle='rgba(120,180,130,.12)';ctx.fillRect(x-9,400-h*.6,4,h*.5);});
    drawBokeh('#d8ffb0',.2);
  }else if(k==='castle'){
    drawBokeh('#d8b0ff',.1);
    layer(400,.35,(x,i)=>{
      const wx=x+200,top=110,w=90,h=230;
      ctx.fillStyle='rgba(150,90,220,.1)';ctx.beginPath();ctx.moveTo(wx-w/2,top+h);ctx.lineTo(wx-w/2,top+40);ctx.quadraticCurveTo(wx-w/2,top,wx,top-20);ctx.quadraticCurveTo(wx+w/2,top,wx+w/2,top+40);ctx.lineTo(wx+w/2,top+h);ctx.fill();
      ctx.strokeStyle='rgba(20,8,30,.6)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(wx,top-14);ctx.lineTo(wx,top+h);ctx.moveTo(wx-w/2,top+110);ctx.lineTo(wx+w/2,top+110);ctx.stroke();
      ctx.beginPath();ctx.arc(wx,top+50,20,0,7);ctx.stroke();
    });
    layer(260,.55,(x,i)=>{
      ctx.fillStyle='rgba(20,8,30,.7)';ctx.fillRect(x-2,300,4,100);ctx.fillRect(x-18,300,36,4);
      for(const cx of [x-16,x,x+16]){const fl=1+Math.sin(time*12+cx)*.15;ctx.fillStyle='rgba(255,210,140,.85)';ctx.beginPath();ctx.ellipse(cx,288,2.6,6*fl,0,0,7);ctx.fill();
        const g=ctx.createRadialGradient(cx,288,0,cx,288,22);g.addColorStop(0,'rgba(255,200,120,.25)');g.addColorStop(1,'rgba(255,200,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,288,22,0,7);ctx.fill();
        ctx.fillStyle='rgba(240,230,255,.5)';ctx.fillRect(cx-2,292,4,10);}
    });
  }else if(k==='choco'){
    drawBokeh('#ffcf9e',.12);
    layer(300,.5,x=>{
      ctx.fillStyle='rgba(255,210,160,.05)';ctx.fillRect(x-12,170,24,230);
      ctx.strokeStyle='rgba(255,210,160,.07)';ctx.lineWidth=12;ctx.beginPath();ctx.arc(x+150,190,138,Math.PI*.92,Math.PI*2.08);ctx.stroke();
    });
    layer(420,.3,(x,i)=>{
      const cy=150+hash(i)*80,r=60;
      ctx.save();ctx.translate(x,cy);ctx.rotate((hash(i+2)-.5)*.6);
      ctx.globalAlpha=.16;ctx.fillStyle=i%2?'#c2263a':'#e9b77d';
      ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,Math.PI*1.05,Math.PI*1.95);ctx.fill();
      ctx.strokeStyle='#ffe0b0';ctx.lineWidth=1.5;
      for(let a=1.05;a<=1.951;a+=.1){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a*Math.PI)*r,Math.sin(a*Math.PI)*r);ctx.stroke();}
      ctx.restore();ctx.globalAlpha=1;
    });
  }else if(k==='palace'){
    drawBokeh('#e8e4ff',.1);clouds('#e8e0ff',.14,.12);
    layer(240,.28,(x,i)=>{
      const h=160+hash(i)*140,w=26+hash(i+1)*20;
      ctx.fillStyle='rgba(200,190,255,.08)';ctx.beginPath();ctx.moveTo(x,400-h);ctx.lineTo(x+w,400-h*.75);ctx.lineTo(x+w*.8,400);ctx.lineTo(x-w*.8,400);ctx.lineTo(x-w,400-h*.75);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,400-h);ctx.lineTo(x,400);ctx.stroke();
    });
    layer(720,.45,(x,i)=>{
      const cx=x+360,cy=60,sw=Math.sin(time*.8+i)*.05;
      ctx.save();ctx.translate(cx,topY);ctx.rotate(sw);
      ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,cy-topY);ctx.stroke();
      ctx.translate(0,cy-topY);
      ctx.strokeStyle='rgba(233,226,255,.35)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,46,10,0,0,7);ctx.stroke();
      for(let j=0;j<9;j++){const a=j/9*Math.PI*2,px=Math.cos(a)*46,py=Math.sin(a)*10;
        ctx.globalAlpha=.4+.5*Math.max(0,Math.sin(time*3+j+i));ctx.fillStyle='#fff';
        ctx.beginPath();ctx.moveTo(px,py+4);ctx.lineTo(px+3,py+11);ctx.lineTo(px,py+18);ctx.lineTo(px-3,py+11);ctx.fill();}
      ctx.globalAlpha=1;ctx.restore();
    });
  }else{
    drawBokeh('#ffe3f0',.12);clouds('#ffd1e6',.28,.12,20);clouds('#d8c8ff',.18,.2,90);
    layer(320,.3,(x,i)=>{
      const h=150+hash(i)*90,cy=400-h,cols=['#ffd36e','#7fe0c0','#ff9ec0','#c9a6ff'];
      ctx.globalAlpha=.18;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,cy);ctx.lineTo(x,400);ctx.stroke();
      ctx.fillStyle=cols[i&3];ctx.beginPath();ctx.arc(x,cy,40,0,7);ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();
      for(let a=0;a<12;a+=.2){const r=a*3.2;ctx.lineTo(x+Math.cos(a+time*.5)*r,cy+Math.sin(a+time*.5)*r);}ctx.stroke();
      ctx.globalAlpha=1;
    });
    layer(460,.5,(x,i)=>{
      const top=150+hash(i+9)*60;
      ctx.save();ctx.globalAlpha=.16;ctx.beginPath();ctx.rect(x-10,top,20,400-top);ctx.clip();
      ctx.fillStyle='#fff';ctx.fillRect(x-10,top,20,400-top);
      ctx.fillStyle='#ff4f6d';for(let y=top-20;y<400;y+=26){ctx.beginPath();ctx.moveTo(x-10,y);ctx.lineTo(x+10,y-12);ctx.lineTo(x+10,y);ctx.lineTo(x-10,y+12);ctx.fill();}
      ctx.restore();
      ctx.globalAlpha=.16;ctx.strokeStyle='#fff';ctx.lineWidth=20;ctx.beginPath();ctx.arc(x+26,top,26,Math.PI,2*Math.PI);ctx.stroke();ctx.globalAlpha=1;
    });
  }
}
function weather(topY,botY){
  const kind=L.theme.kind;
  if(kind==='storm'){
    const span=Math.max(viewW,600)+80,hgt=botY-topY+40,sl=-6+windV*.12;
    ctx.strokeStyle='rgba(200,220,255,.35)';ctx.lineWidth=1.2;ctx.beginPath();
    for(const f of flakes){const x=(((f.x-cam*f.d+time*windV*.4)%span)+span)%span-40,y=topY-20+((f.y+time*f.s*7)%1)*hgt;ctx.moveTo(x,y);ctx.lineTo(x+sl,y+16);}
    ctx.stroke();
    if(windStr>.05){ctx.strokeStyle=`rgba(230,240,255,${.35*windStr})`;ctx.lineWidth=2;ctx.lineCap='round';const d=Math.sign(windV)||1;
      for(let i=0;i<14;i++){const yy=topY+60+hash(i)*(botY-topY-120),xx=(((hash(i+5)*viewW+time*600*d)%(viewW+200))+viewW+200)%(viewW+200)-100;ctx.beginPath();ctx.moveTo(xx,yy);ctx.quadraticCurveTo(xx-30*d,yy-6,xx-70*d,yy+2);ctx.stroke();}}
    return;
  }
  if(kind!=='snow'&&kind!=='palace'&&kind!=='castle')return;
  const span=Math.max(viewW,600)+40,hgt=botY-topY+20,pal=kind!=='snow';
  const cols=kind==='castle'?['#c9a6ff','#ff9ec0','#ffffff','#7a5aa8']:['#ffffff','#e9e2ff','#ffd6f0','#cfe8ff'];
  for(let n=0;n<flakes.length;n+=(pal?2:1)*(LOWQ?2:1)){
    const f=flakes[n];
    const x=(((f.x+Math.sin(time*.7+f.ph)*20-cam*f.d)%span)+span)%span-20;
    const y=topY-10+((f.y+time*f.s*(pal?.4:1))%1)*hgt;
    if(pal){
      ctx.globalAlpha=(.3+.6*Math.max(0,Math.sin(time*3+f.ph)))*f.d;ctx.fillStyle=cols[n&3];
      const s=f.r*1.6;ctx.beginPath();ctx.moveTo(x,y-s*2);ctx.lineTo(x+s*.4,y);ctx.lineTo(x,y+s*2);ctx.lineTo(x-s*.4,y);ctx.fill();
      ctx.beginPath();ctx.moveTo(x-s*2,y);ctx.lineTo(x,y+s*.4);ctx.lineTo(x+s*2,y);ctx.lineTo(x,y-s*.4);ctx.fill();
    }else{
      ctx.fillStyle='#fff';ctx.globalAlpha=.35+f.d*.6;ctx.beginPath();ctx.arc(x,y,f.r,0,7);ctx.fill();
    }
  }
  ctx.globalAlpha=1;
}

// ================= render: world =================
function drawTiles(pulse){
  const th=L.theme,kind=th.kind;
  const c0=Math.max(0,Math.floor(cam/T)-1),c1=Math.min(COLS-1,Math.ceil((cam+viewW)/T)+1);
  const botY=(H-(offY+camY*scale))/scale;
  for(let y=0;y<ROWS;y++){
    let x=c0;
    while(x<=c1){
      const v=grid[y][x];if(!v){x++;continue;}
      let e=x;while(e+1<=c1&&grid[y][e+1]===v)e++;
      const px=x*T,w=(e-x+1)*T,py=y*T;
      if(v===2){
        ctx.fillStyle='rgba(255,255,255,.08)';ctx.beginPath();ctx.roundRect(px+2,py+4,w-4,12,6);ctx.fill();
        ctx.fillStyle=th.oneway;ctx.beginPath();ctx.roundRect(px+2,py,w-4,8,4);ctx.fill();
        if(kind==='sweets'){ctx.fillStyle='rgba(255,111,160,.55)';for(let sx=px+10;sx<px+w-8;sx+=14){ctx.fillRect(sx,py,5,8);}}
      }else if(v===6&&kind==='garden'){
        for(let tx=x;tx<=e;tx++){
          const gx=tx*T;ctx.fillStyle='#a8703f';ctx.beginPath();ctx.roundRect(gx+4,py+T-8,T-8,8,3);ctx.fill();
          for(let k=0;k<3;k++){const sx=gx+10+k*10;ctx.fillStyle='#e8c070';ctx.beginPath();ctx.moveTo(sx-2.5,py+T-8);ctx.lineTo(sx,py+12+k%2*4);ctx.lineTo(sx+2.5,py+T-8);ctx.fill();ctx.fillStyle='#fff6d0';ctx.beginPath();ctx.arc(sx,py+12+k%2*4,1.2,0,7);ctx.fill();
            ctx.fillStyle='#d8a0ff';ctx.beginPath();ctx.ellipse(sx,py+T-14,3.5,2.2,0,0,7);ctx.fill();}
        }
      }else if(v===6){
        for(let tx=x;tx<=e;tx++){
          const gx=tx*T;ctx.strokeStyle=kind==='thorn'?'#2e5a2e':'#5b3a6e';ctx.lineWidth=2.4;ctx.lineCap='round';
          for(let k=0;k<3;k++){ctx.beginPath();const ox=gx+4+k*12;ctx.moveTo(ox,py+T);ctx.quadraticCurveTo(ox+10,py+22-k*3,ox+4,py+14+hash(tx+k)*6);ctx.stroke();}
          ctx.fillStyle=kind==='thorn'?'#4f8a3e':'#8a5a9e';
          for(let k=0;k<6;k++){const hx=gx+4+hash(tx*7+k)*32,hy=py+20+hash(tx*3+k)*16;ctx.beginPath();ctx.moveTo(hx,hy-5);ctx.lineTo(hx+3,hy);ctx.lineTo(hx-3,hy);ctx.fill();}
          if(kind==='thorn'){ctx.fillStyle='#ff5c86';ctx.beginPath();ctx.arc(gx+20,py+14,5,0,7);ctx.fill();ctx.strokeStyle='#c9325a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(gx+20,py+14,2.4,0,4.6);ctx.stroke();}
        }
      }else if(v===7||v===8){
        const on=beatOn(v),ph=beatPhase()%1,warn=on&&ph>.72;
        if(on){
          const a=warn?(Math.sin(time*40)>0?.45:1):1;ctx.globalAlpha=a;
          ctx.fillStyle='rgba(201,166,255,.18)';ctx.beginPath();ctx.roundRect(px+2,py+4,w-4,16,8);ctx.fill();
          const g=ctx.createLinearGradient(0,py,0,py+11);g.addColorStop(0,'#f2eaff');g.addColorStop(1,v===7?'#b48cff':'#ff9ec0');
          ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(px+2,py,w-4,11,5.5);ctx.fill();
          ctx.globalAlpha=1;
        }else{
          ctx.setLineDash([4,5]);ctx.strokeStyle=v===7?'rgba(180,140,255,.35)':'rgba(255,158,192,.35)';ctx.lineWidth=1.5;
          ctx.beginPath();ctx.roundRect(px+3,py+1,w-6,9,4.5);ctx.stroke();ctx.setLineDash([]);
        }
      }else if(v===9||v===10){
        const d=v===9?1:-1;ctx.fillStyle='#3a2a20';ctx.fillRect(px,py,w,y===ROWS-1?Math.max(T,botY-py+2):T+.5);
        ctx.fillStyle='#5a5a6a';ctx.beginPath();ctx.roundRect(px,py,w,12,6);ctx.fill();
        ctx.save();ctx.beginPath();ctx.rect(px+2,py+2,w-4,8);ctx.clip();ctx.fillStyle='#ffd36e';
        const off=((time*100*d)%16+16)%16;for(let sx=px-16+off;sx<px+w+16;sx+=16){ctx.beginPath();ctx.moveTo(sx,py+2);ctx.lineTo(sx+4*d,py+6);ctx.lineTo(sx,py+10);ctx.lineTo(sx+3*d,py+10);ctx.lineTo(sx+7*d,py+6);ctx.lineTo(sx+3*d,py+2);ctx.fill();}ctx.restore();
        ctx.fillStyle='#8a8a9a';for(let gx=px+8;gx<px+w;gx+=20){ctx.save();ctx.translate(gx,py+18);ctx.rotate(time*4*d);ctx.fillRect(-5,-1,10,2);ctx.fillRect(-1,-5,2,10);ctx.restore();}
      }else if(v===5){
        for(let tx=x;tx<=e;tx++){
          const c=crumbles.find(c=>c.tx===tx&&c.ty===y);
          const jx=c?(Math.random()-.5)*3*(1-c.t/.45+.3):0,gx=tx*T+jx;
          ctx.fillStyle='rgba(200,190,255,.12)';ctx.fillRect(gx+3,py+12,T-6,6);
          const cc=kind==='attic'?['#d8b088','#7a5030','#a07040']:kind==='thorn'?['#b8f0a0','#4f9a46','#7fd070']:kind==='tower'?['#d8d0e8','#6a607e','#8a809e']:['#f6f2ff','#a99bff','#d0a8ff'];
          const g=ctx.createLinearGradient(0,py,0,py+13);g.addColorStop(0,cc[0]);g.addColorStop(1,c?cc[2]:cc[1]);
          ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(gx+1,py+2);ctx.lineTo(gx+T-1,py+2);ctx.lineTo(gx+T-5,py+13);ctx.lineTo(gx+5,py+13);ctx.fill();
          ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx+12,py+2);ctx.lineTo(gx+16,py+13);ctx.moveTo(gx+27,py+2);ctx.lineTo(gx+24,py+13);ctx.stroke();
          if(c){ctx.strokeStyle='rgba(80,40,140,.6)';ctx.beginPath();ctx.moveTo(gx+8,py+3);ctx.lineTo(gx+19,py+9);ctx.lineTo(gx+30,py+4);ctx.stroke();}
        }
      }else if(v===4){
        for(let tx=x;tx<=e;tx++){
          const sq=gum&&gum.tx===tx&&gum.ty===y?Math.sin((1-gum.t/.35)*Math.PI)*.35:0;
          const cols=['#ff6fa0','#7fe0c0','#ffd36e','#b48cff'],gx=tx*T;
          ctx.save();ctx.translate(gx+T/2,py+T);ctx.scale(1+sq*.5,1-sq);
          if(kind==='kitchen'){ctx.fillStyle=['#ff8fbf','#9fd0ff','#ffd36e'][tx%3];ctx.beginPath();ctx.roundRect(-19,-24,38,24,10);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.roundRect(-15,-21,30,6,3);ctx.fill();ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.arc(-7,-11,1.8,0,7);ctx.arc(7,-11,1.8,0,7);ctx.fill();ctx.restore();continue;}
          if(kind==='road'){ctx.fillStyle='#ff9a3c';ctx.beginPath();ctx.ellipse(0,-15,19,15,0,0,7);ctx.fill();ctx.strokeStyle='#d8701e';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-15,7,15,0,0,7);ctx.moveTo(0,-30);ctx.lineTo(0,0);ctx.stroke();ctx.strokeStyle='#5aa040';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-29);ctx.quadraticCurveTo(2,-36,7,-37);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.3)';ctx.beginPath();ctx.ellipse(-9,-21,4,6,-.4,0,7);ctx.fill();ctx.restore();continue;}
          const g=ctx.createLinearGradient(0,-T,0,0);g.addColorStop(0,'#fff');g.addColorStop(.25,cols[tx&3]);g.addColorStop(1,cols[tx&3]);
          ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-17,0);ctx.lineTo(-17,-14);ctx.quadraticCurveTo(-17,-T+2,0,-T+2);ctx.quadraticCurveTo(17,-T+2,17,-14);ctx.lineTo(17,0);ctx.fill();
          ctx.fillStyle='rgba(255,255,255,.7)';for(let d=0;d<6;d++)ctx.fillRect(-11+hash(tx*9+d)*22,-30+hash(tx*5+d)*24,2,2);
          ctx.restore();
        }
      }else{
        const isIce=v===3;
        ctx.fillStyle=isIce?'#14294a':th.body;
        {const hh=y===ROWS-1?Math.max(T,botY-py+2):T+.5,openTop=y===0||!isSolid(grid[y-1][x]),openTopR=y===0||!isSolid(grid[y-1][e]),
          tl=openTop&&(x===0||!isSolid(grid[y][x-1]))?10:0,tr=openTopR&&(e>=COLS-1||!isSolid(grid[y][e+1]))?10:0;
          ctx.beginPath();ctx.moveTo(px+tl,py);ctx.lineTo(px+w-tr,py);if(tr)ctx.quadraticCurveTo(px+w,py,px+w,py+tr);ctx.lineTo(px+w,py+hh);ctx.lineTo(px,py+hh);ctx.lineTo(px,py+tl);if(tl)ctx.quadraticCurveTo(px,py,px+tl,py);ctx.fill();
          if(!LOWQ){const dg=ctx.createLinearGradient(0,py,0,py+140);dg.addColorStop(0,'rgba(255,255,255,.05)');dg.addColorStop(1,'rgba(0,0,0,.28)');ctx.fillStyle=dg;ctx.fill();}
          ctx.save();ctx.clip();
        for(let tx=x;tx<=e;tx++){
          const gx=tx*T;
          if(kind==='studio'){ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(gx+(y%2?20:0),py+14,1.5,T-14);ctx.fillRect(gx,py+T-1,T,1);}
          ctx.fillStyle='rgba(255,255,255,.06)';ctx.beginPath();ctx.arc(gx+(y%2?28:10),py+24,3.2,0,7);ctx.arc(gx+(y%2?10:28),py+36,2.2,0,7);ctx.fill();
          if(isIce){ctx.fillStyle='rgba(190,230,255,.08)';ctx.beginPath();ctx.moveTo(gx+8,py+T);ctx.lineTo(gx+22,py+6);ctx.lineTo(gx+28,py+6);ctx.lineTo(gx+14,py+T);ctx.fill();}
          if(y===0||!isSolid(grid[y-1][tx])){
            ctx.fillStyle=isIce?'#a8e4ff':th.top;ctx.fillRect(gx,py,T+.5,4);
            ctx.fillStyle=isIce?'rgba(168,228,255,.2)':th.glow;ctx.fillRect(gx,py+4,T+.5,10);
            if(kind==='dawn'){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(gx+8,py+3,9,Math.PI,0);ctx.arc(gx+26,py+2,11,Math.PI,0);ctx.arc(gx+40,py+4,8,Math.PI,0);ctx.fill();}
            if((kind==='snow'||kind==='forest'||kind==='garden'||kind==='road'||kind==='meadow'||kind==='wood')&&!isIce){ctx.fillStyle=kind==='forest'?'#7fb08c':kind==='snow'?th.top:th.top;ctx.beginPath();ctx.arc(gx+10,py+2,6,Math.PI,0);ctx.arc(gx+28,py+2,7,Math.PI,0);ctx.fill();}
            if(kind==='sweets'){ctx.fillStyle=th.top;const dx=gx+6+hash(tx)*26;ctx.fillRect(dx-2,py+3,4,5+hash(tx+1)*5);ctx.beginPath();ctx.arc(dx,py+8+hash(tx+1)*5,2.6,0,7);ctx.fill();}
            if(kind==='stage'&&tx%3===0){ctx.fillStyle=`rgba(255,233,200,${.25+.6*pulse})`;ctx.beginPath();ctx.arc(gx+T/2,py+20,2.2,0,7);ctx.fill();}
            if(isIce&&tx%2===0){ctx.fillStyle=`rgba(255,255,255,${.3+.5*Math.max(0,Math.sin(time*2+tx))})`;ctx.fillRect(gx+12,py+1,2,2);}
          }
        }
        ctx.restore();}
        if(x>0&&!isSolid(grid[y][x-1])){ctx.fillStyle=th.side;ctx.fillRect(px,py+8,2,T-8);}
        if(e<COLS-1&&!isSolid(grid[y][e+1])){ctx.fillStyle=th.side;ctx.fillRect(px+w-2,py,2,T);}
      }
      x=e+1;
    }
  }
}
function drawGoal(){
  const gx=L.goal*T;
  if(goalA<=0||gx<cam-200||gx>cam+viewW+200)return;
  ctx.globalAlpha=goalA;
  const topY=-(offY+camY*scale)/scale;
  const sg=ctx.createLinearGradient(0,topY,0,400);sg.addColorStop(0,'rgba(255,240,220,0)');sg.addColorStop(1,'rgba(255,236,214,.22)');
  ctx.fillStyle=sg;ctx.beginPath();ctx.moveTo(gx-12,topY);ctx.lineTo(gx+12,topY);ctx.lineTo(gx+80,400);ctx.lineTo(gx-80,400);ctx.fill();
  ctx.fillStyle='rgba(255,236,214,.18)';ctx.beginPath();ctx.ellipse(gx,400,80,10,0,0,7);ctx.fill();
  ctx.save();ctx.translate(gx,330+Math.sin(time*2)*5);ctx.rotate(time*.6);
  const gl=ctx.createRadialGradient(0,0,0,0,0,34);gl.addColorStop(0,'rgba(255,233,168,.6)');gl.addColorStop(1,'rgba(255,233,168,0)');
  ctx.fillStyle=gl;ctx.beginPath();ctx.arc(0,0,34,0,7);ctx.fill();
  ctx.fillStyle='#fff3cf';ctx.beginPath();
  for(let i=0;i<10;i++){const r=i%2?6:15,a=i*Math.PI/5-Math.PI/2;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.fill();ctx.restore();
  ctx.globalAlpha=1;
}
function fairyPos(i){const cx=L.cps[i]*T+20;let gy=10;for(let y=0;y<ROWS;y++){if(grid[y][Math.floor(cx/T)]){gy=y;break;}}return{x:cx,y:gy*T-70};}
function drawFairy(i){
  const f=fairyPos(i),awake=i<=cp&&fairyWake[i]!==undefined&&(fairyWake[i]>0||i===0),since=fairyWake[i]?time-fairyWake[i]:9;
  let x=f.x,y=f.y+Math.sin(time*2.4+i)*5;
  if(since<1.4){const a=since/1.4*Math.PI*2;x+=Math.cos(a)*30;y+=Math.sin(a)*18-10;}
  ctx.save();ctx.translate(x,y);
  if(awake){const g=ctx.createRadialGradient(0,0,0,0,0,30);g.addColorStop(0,'rgba(255,240,180,.55)');g.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,30,0,7);ctx.fill();}
  ctx.globalAlpha=awake?1:.55;
  const fl=awake?Math.sin(time*22)*.5:.1;
  ctx.fillStyle='rgba(220,240,255,.75)';
  for(const sd of [-1,1]){ctx.save();ctx.scale(sd,1);ctx.rotate(-.5-fl*.6);ctx.beginPath();ctx.ellipse(8,-6,8,4.5,0,0,7);ctx.fill();ctx.rotate(.9);ctx.beginPath();ctx.ellipse(7,2,6,3.2,0,0,7);ctx.fill();ctx.restore();}
  ctx.fillStyle=awake?'#ffd1e6':'#c8b8d8';ctx.beginPath();ctx.moveTo(-5,10);ctx.lineTo(5,10);ctx.lineTo(2,-2);ctx.lineTo(-2,-2);ctx.fill();
  ctx.fillStyle='#f6d6c4';ctx.beginPath();ctx.arc(0,-6,4.6,0,7);ctx.fill();
  ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.arc(0,-8,4.8,Math.PI,0);ctx.fill();
  ctx.strokeStyle='#2a1a2a';ctx.lineWidth=.9;
  if(awake){ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(-1.6,-6,.9,0,7);ctx.arc(1.6,-6,.9,0,7);ctx.fill();}
  else{ctx.beginPath();ctx.moveTo(-2.5,-6);ctx.lineTo(-.8,-6);ctx.moveTo(.8,-6);ctx.lineTo(2.5,-6);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='600 9px Fredoka, Inter, sans-serif';ctx.fillText('z',8,-14-Math.sin(time*2)*2);ctx.fillText('z',12,-20-Math.sin(time*2+1)*2);}
  ctx.strokeStyle='#e8c070';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(4,2);ctx.lineTo(10,-8);ctx.stroke();ctx.fillStyle='#fff6c8';ctx.beginPath();ctx.arc(10,-9,1.8+(awake?Math.sin(time*8):0)*.6,0,7);ctx.fill();
  ctx.restore();
}
function friendGround(cx){let gy=10;for(let y=0;y<ROWS;y++){if(grid[y][Math.floor(cx/T)]){gy=y;break;}}return gy*T;}
function drawFriend(f){
  const [col,kind,text]=f,cx=col*T+20,gy=friendGround(cx),near=Math.abs(player.x-cx)<170;
  ctx.save();ctx.translate(cx,gy);
  if(kind==='mouse'){const e={type:'mouse',x:-14,y:-24,w:28,h:24,dir:1,anim:time*3,inv:0,squash:0};drawMouse(e);ctx.fillStyle='#ff7aa8';ctx.beginPath();ctx.moveTo(4,-22);ctx.lineTo(0,-27);ctx.lineTo(0,-18);ctx.fill();ctx.beginPath();ctx.moveTo(4,-22);ctx.lineTo(8,-27);ctx.lineTo(8,-18);ctx.fill();}
  else if(kind==='bird'){const b=Math.sin(time*5)*2,fl=Math.sin(time*18)*.6;ctx.translate(0,-30+b);ctx.fillStyle='#6ab4ff';ctx.beginPath();ctx.ellipse(0,0,9,7,0,0,7);ctx.fill();ctx.fillStyle='#9fd0ff';ctx.save();ctx.rotate(-.4-fl);ctx.beginPath();ctx.ellipse(-4,-4,7,3,0,0,7);ctx.fill();ctx.restore();ctx.fillStyle='#ffb347';ctx.beginPath();ctx.moveTo(8,-1);ctx.lineTo(13,1);ctx.lineTo(8,3);ctx.fill();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(4.5,-2,1.2,0,7);ctx.fill();ctx.fillStyle='rgba(255,140,175,.6)';ctx.beginPath();ctx.arc(5,1.5,1.3,0,7);ctx.fill();ctx.translate(0,30-b);}
  else if(kind==='swan'){const b=Math.sin(time*2)*1.5;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,-10+b,16,9,0,0,7);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(10,-14+b);ctx.quadraticCurveTo(18,-22+b,13,-30+b);ctx.quadraticCurveTo(10,-36+b,17,-37+b);ctx.stroke();ctx.fillStyle='#ffb347';ctx.beginPath();ctx.moveTo(18,-39+b);ctx.lineTo(25,-36+b);ctx.lineTo(18,-34+b);ctx.fill();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(16,-38+b,1.2,0,7);ctx.fill();}
  else{ctx.translate(0,-40+Math.sin(time*2.4)*4);ctx.fillStyle='rgba(220,240,255,.75)';const fl=Math.sin(time*22)*.5;for(const sd of [-1,1]){ctx.save();ctx.scale(sd,1);ctx.rotate(-.5-fl*.6);ctx.beginPath();ctx.ellipse(8,-6,8,4.5,0,0,7);ctx.fill();ctx.restore();}
    ctx.fillStyle='#ffd1e6';ctx.beginPath();ctx.moveTo(-5,10);ctx.lineTo(5,10);ctx.lineTo(2,-2);ctx.lineTo(-2,-2);ctx.fill();ctx.fillStyle='#f6d6c4';ctx.beginPath();ctx.arc(0,-6,4.6,0,7);ctx.fill();ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.arc(0,-8,4.8,Math.PI,0);ctx.fill();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(-1.6,-6,.9,0,7);ctx.arc(1.6,-6,.9,0,7);ctx.fill();}
  ctx.restore();
  if(near&&!f.spoken&&state==='play'){f.spoken=true;speak(text);}
  if(near){
    ctx.font='600 12px Fredoka, Inter, system-ui, sans-serif';const words=text.split(' '),lines=[];let cur='';
    for(const w of words){if(ctx.measureText(cur+' '+w).width>170&&cur){lines.push(cur);cur=w;}else cur=cur?cur+' '+w:w;}lines.push(cur);
    const bw=Math.max(...lines.map(l=>ctx.measureText(l).width))+20,bh=lines.length*15+12,bx=cx-bw/2,by=gy-(kind==='fairy'?68:52)-bh;
    ctx.fillStyle='rgba(255,255,255,.96)';ctx.beginPath();ctx.roundRect(bx,by,bw,bh,10);ctx.fill();ctx.beginPath();ctx.moveTo(cx-6,by+bh);ctx.lineTo(cx,by+bh+8);ctx.lineTo(cx+6,by+bh);ctx.fill();
    ctx.fillStyle='#5a2a6a';ctx.textAlign='center';lines.forEach((l,i)=>ctx.fillText(l,cx,by+18+i*15));
  }
}
function drawPrince(){
  if(!prince)return;ctx.save();ctx.translate(prince.x,400);ctx.scale(prince.face,1);
  ctx.fillStyle='#1d2340';ctx.fillRect(-6,-14,5,14);ctx.fillRect(2,-14,5,14);
  ctx.fillStyle='#3a5ad0';ctx.beginPath();ctx.roundRect(-10,-34,20,22,5);ctx.fill();ctx.fillStyle='#f2c66d';ctx.fillRect(-10,-17,20,3);ctx.fillRect(-2,-34,4,20);
  ctx.fillStyle='#f6d6c4';ctx.beginPath();ctx.arc(0,-40,7,0,7);ctx.fill();ctx.fillStyle='#4a2c2c';ctx.beginPath();ctx.arc(0,-42,7,Math.PI,0);ctx.fill();
  ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.moveTo(-6,-46);ctx.lineTo(-5,-53);ctx.lineTo(-2,-49);ctx.lineTo(0,-55);ctx.lineTo(2,-49);ctx.lineTo(5,-53);ctx.lineTo(6,-46);ctx.fill();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(3,-40,1.1,0,7);ctx.fill();ctx.fillStyle='rgba(255,140,170,.6)';ctx.beginPath();ctx.arc(5,-37.5,1.4,0,7);ctx.fill();
  ctx.save();ctx.translate(9,-26);ctx.rotate(prince.slash>0?-1.2+(1-prince.slash/.5)*2:-.4);ctx.fillStyle='#e8eef8';ctx.fillRect(-1.5,-26,3,26);ctx.fillStyle='#f2c66d';ctx.fillRect(-5,-2,10,3);ctx.restore();
  ctx.restore();
  for(const w of waves){ctx.save();ctx.translate(w.x,w.y);ctx.strokeStyle='rgba(255,240,180,.9)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,16,-1.2,1.2);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.arc(-6,0,12,-1.1,1.1);ctx.stroke();ctx.restore();}
}
function drawStepmother(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(e.dead){ctx.translate(0,-30);ctx.rotate(e.rot);ctx.translate(0,30);}
  if(e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  ctx.scale(e.dir,1);const sw=Math.sin(e.anim*.5)*.08;
  ctx.fillStyle='#6a2a8a';ctx.beginPath();ctx.moveTo(-8,-46);ctx.lineTo(8,-46);ctx.lineTo(24,0);ctx.lineTo(-24,0);ctx.closePath();ctx.fill();
  ctx.fillStyle='#8a3aaa';ctx.beginPath();ctx.moveTo(-4,-44);ctx.lineTo(4,-44);ctx.lineTo(10,0);ctx.lineTo(-10,0);ctx.fill();
  ctx.fillStyle='#4a1a6a';ctx.beginPath();ctx.roundRect(-9,-52,18,12,4);ctx.fill();
  ctx.strokeStyle='#e6c8e8';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-8,-48);ctx.lineTo(-18,-36+Math.sin(e.anim)*4);ctx.moveTo(8,-48);ctx.lineTo(18,-60+Math.sin(e.anim*1.3)*5);ctx.stroke();
  ctx.fillStyle='#e6dccc';ctx.beginPath();ctx.ellipse(1,-60,7.5,9,0,0,7);ctx.fill();
  ctx.fillStyle='#e6dccc';ctx.beginPath();ctx.moveTo(6,-61);ctx.lineTo(13,-58);ctx.lineTo(6,-56);ctx.fill();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(4,-62,1.3,0,7);ctx.fill();ctx.strokeStyle='#2a1a2a';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(1,-66);ctx.lineTo(7,-64);ctx.stroke();
  ctx.strokeStyle='#a03050';ctx.beginPath();ctx.moveTo(2,-54);ctx.quadraticCurveTo(5,-56,8,-54);ctx.stroke();
  ctx.save();ctx.translate(0,-68);ctx.rotate(sw);ctx.fillStyle='#3a1050';ctx.beginPath();ctx.ellipse(0,0,18,4.5,0,0,7);ctx.fill();ctx.beginPath();ctx.roundRect(-9,-12,18,13,4);ctx.fill();
  ctx.strokeStyle='#ff7aa8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-6,-10);ctx.quadraticCurveTo(-18,-26,-6,-30);ctx.stroke();ctx.restore();
  ctx.restore();
  if(e.stun>0){for(let k=0;k<3;k++){const a=time*5+k*2.1;ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(e.x+e.w/2+Math.cos(a)*16,e.y-6+Math.sin(a)*4,2.6,0,7);ctx.fill();}}
}
function drawPickup(u){
  const y=u.y+Math.sin(time*3+u.t)*4;ctx.save();ctx.translate(u.x,y);
  const col=u.type==='speed'?'255,200,90':u.type==='shield'?'160,210,255':'201,166,255';
  const g=ctx.createRadialGradient(0,0,0,0,0,26);g.addColorStop(0,`rgba(${col},.55)`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,26,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=2;ctx.fillStyle=`rgba(${col},.35)`;ctx.beginPath();ctx.arc(0,0,15,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.strokeStyle='#fff';ctx.lineCap='round';
  if(u.type==='speed'){ctx.beginPath();ctx.moveTo(-7,4);ctx.quadraticCurveTo(-2,3,1,-2);ctx.quadraticCurveTo(4,-6,8,-2);ctx.lineTo(8,5);ctx.lineTo(-5,5);ctx.closePath();ctx.fill();ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-11,-3);ctx.lineTo(-6,-3);ctx.moveTo(-12,1);ctx.lineTo(-8,1);ctx.stroke();}
  else if(u.type==='shield'){ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-6,7);ctx.lineTo(4,-3);ctx.stroke();ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?2.4:5.5,a=k*Math.PI/5-Math.PI/2;ctx.lineTo(5+Math.cos(a)*r,-4+Math.sin(a)*r);}ctx.fill();}
  else{ctx.beginPath();ctx.ellipse(-3,5,3,2.3,-.4,0,7);ctx.ellipse(5,3,3,2.3,-.4,0,7);ctx.fill();ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(-.4,5);ctx.lineTo(-.4,-6);ctx.lineTo(7.6,-8);ctx.lineTo(7.6,3);ctx.stroke();}
  ctx.restore();
}
function drawSecret(){
  if(!secret||secret.got)return;const y=secret.y+Math.sin(time*2)*4;ctx.save();ctx.translate(secret.x,y);
  const g=ctx.createRadialGradient(0,0,0,0,0,34);g.addColorStop(0,'rgba(255,215,100,.6)');g.addColorStop(1,'rgba(255,215,100,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,34,0,7);ctx.fill();
  ctx.rotate(Math.sin(time*1.5)*.25);ctx.scale(1+Math.sin(time*5)*.06,1+Math.sin(time*5)*.06);
  const sg=ctx.createLinearGradient(0,-14,0,14);sg.addColorStop(0,'#fff6c8');sg.addColorStop(1,'#ffb020');ctx.fillStyle=sg;ctx.strokeStyle='#fff';ctx.lineWidth=1.5;
  ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?6:14,a=k*Math.PI/5-Math.PI/2;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#7a4a10';ctx.beginPath();ctx.arc(-3,-1,1.3,0,7);ctx.arc(3,-1,1.3,0,7);ctx.fill();
  ctx.restore();
}
function drawItem(r){
  ctx.save();ctx.translate(r.x,r.y+Math.sin(time*3+r.t)*3);
  const kind=L.item,glowC={daisy:'255,255,220',key:'255,211,110',apple:'255,200,90',gift:'255,160,200',star:'255,226,122',slipper:'190,225,255',gfeather:'255,215,120',feather:'220,235,255',rose:'255,92,134',flake:'190,225,255',candy:'190,130,255',truffle:'233,183,125',crystal:'210,200,255'}[kind];
  const g=ctx.createRadialGradient(0,0,0,0,0,18);g.addColorStop(0,`rgba(${glowC},.38)`);g.addColorStop(1,`rgba(${glowC},0)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,18,0,7);ctx.fill();
  {const a=time*2.4+r.t,sx=Math.cos(a)*14,sy=Math.sin(a)*10,ss=2.6+Math.sin(time*6+r.t);ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.moveTo(sx,sy-ss*1.6);ctx.lineTo(sx+ss*.4,sy);ctx.lineTo(sx,sy+ss*1.6);ctx.lineTo(sx-ss*.4,sy);ctx.fill();ctx.beginPath();ctx.moveTo(sx-ss*1.6,sy);ctx.lineTo(sx,sy+ss*.4);ctx.lineTo(sx+ss*1.6,sy);ctx.lineTo(sx,sy-ss*.4);ctx.fill();}
  ctx.lineCap='round';
  if(kind==='rose'){
    ctx.strokeStyle='#7fd39a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,4);ctx.lineTo(0,14);ctx.stroke();
    ctx.fillStyle='#7fd39a';ctx.beginPath();ctx.ellipse(3.5,10,3.5,1.8,-.5,0,7);ctx.fill();
    ctx.fillStyle='#ff5c86';ctx.beginPath();ctx.arc(0,-1,6.5,0,7);ctx.fill();
    ctx.strokeStyle='#c9325a';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(0,-1,3,0,4.6);ctx.stroke();
  }else if(kind==='flake'){
    ctx.rotate(time*.8+r.t);ctx.strokeStyle='#f2f8ff';ctx.lineWidth=1.8;
    for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-9);ctx.moveTo(0,-5);ctx.lineTo(3,-8);ctx.moveTo(0,-5);ctx.lineTo(-3,-8);ctx.stroke();}
  }else if(kind==='daisy'){
    ctx.rotate(time*.6+r.t);ctx.fillStyle='#fff';for(let k=0;k<8;k++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.ellipse(0,-6,2.4,4.6,0,0,7);ctx.fill();}ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.arc(0,0,3.4,0,7);ctx.fill();
  }else if(kind==='key'){
    ctx.rotate(Math.sin(time*2+r.t)*.4);ctx.strokeStyle='#ffd36e';ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(-4.5,-5,3.4,0,7);ctx.stroke();ctx.beginPath();ctx.arc(4.5,-5,3.4,0,7);ctx.stroke();ctx.fillStyle='#ffd36e';ctx.fillRect(-1.3,-3,2.6,12);
  }else if(kind==='apple'){
    ctx.rotate(Math.sin(time*2+r.t)*.15);const ag=ctx.createLinearGradient(0,-8,0,9);ag.addColorStop(0,'#fff2a8');ag.addColorStop(1,'#ffb020');ctx.fillStyle=ag;ctx.beginPath();ctx.moveTo(0,-5);ctx.bezierCurveTo(-4,-9,-10,-6,-9,1);ctx.bezierCurveTo(-8,7,-3,10,0,8);ctx.bezierCurveTo(3,10,8,7,9,1);ctx.bezierCurveTo(10,-6,4,-9,0,-5);ctx.fill();
    ctx.strokeStyle='#8a5a2a';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(1.5,-10);ctx.stroke();ctx.fillStyle='#7fd39a';ctx.beginPath();ctx.ellipse(4,-9,3.5,1.6,-.4,0,7);ctx.fill();
  }else if(kind==='gift'){
    ctx.rotate(Math.sin(time*2+r.t)*.15);
    ctx.fillStyle='#ff8fbf';ctx.beginPath();ctx.roundRect(-7,-4,14,11,2);ctx.fill();ctx.fillStyle='#ffb3d4';ctx.beginPath();ctx.roundRect(-8,-7,16,4,1.5);ctx.fill();
    ctx.fillStyle='#ffe27a';ctx.fillRect(-1.3,-7,2.6,14);ctx.strokeStyle='#ffe27a';ctx.lineWidth=1.8;ctx.beginPath();ctx.ellipse(-3,-9,3,2,-.4,0,7);ctx.ellipse(3,-9,3,2,.4,0,7);ctx.stroke();
  }else if(kind==='star'){
    ctx.rotate(Math.sin(time*2+r.t)*.25);ctx.fillStyle='#ffe27a';ctx.beginPath();
    for(let k=0;k<10;k++){const rr=k%2?4.2:9.5,a=k*Math.PI/5-Math.PI/2;ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}ctx.fill();
    ctx.fillStyle='#7a4a10';ctx.beginPath();ctx.arc(-2,-.5,.9,0,7);ctx.arc(2,-.5,.9,0,7);ctx.fill();
  }else if(kind==='slipper'){
    ctx.rotate(Math.sin(time*2+r.t)*.2);
    ctx.fillStyle='rgba(207,232,255,.85)';ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-9,4);ctx.quadraticCurveTo(-2,4,2,-1);ctx.quadraticCurveTo(6,-5,10,-1);ctx.lineTo(10,6);ctx.lineTo(-6,6);ctx.lineTo(-7,9);ctx.lineTo(-9,9);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(4,-1,1.2,0,7);ctx.fill();
  }else if(kind==='feather'||kind==='gfeather'){
    ctx.rotate(Math.sin(time*2+r.t)*.35-.5);
    ctx.fillStyle=kind==='gfeather'?'#ffe08a':'#f6f9ff';ctx.beginPath();ctx.moveTo(0,10);ctx.quadraticCurveTo(-7,0,-1,-11);ctx.quadraticCurveTo(6,-2,0,10);ctx.fill();
    ctx.strokeStyle='#b8c8e0';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,12);ctx.quadraticCurveTo(-1,0,-1,-10);ctx.stroke();
  }else if(kind==='truffle'){
    ctx.fillStyle='#7a3b22';ctx.beginPath();ctx.arc(0,0,7.5,0,7);ctx.fill();ctx.strokeStyle='rgba(255,215,160,.7)';ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.arc(-2.5,-2.5,2.5,0,7);ctx.fill();
    ctx.strokeStyle='#e9b77d';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-6,-1);ctx.quadraticCurveTo(-3,-4,0,-1);ctx.quadraticCurveTo(3,2,6,-1);ctx.stroke();
  }else if(kind==='crystal'){
    ctx.rotate(Math.sin(time*1.5+r.t)*.3);
    const g=ctx.createLinearGradient(-6,-9,6,9);g.addColorStop(0,'#fff');g.addColorStop(1,'#a99bff');
    ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(7,-3);ctx.lineTo(0,10);ctx.lineTo(-7,-3);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-7,-3);ctx.lineTo(7,-3);ctx.moveTo(0,-10);ctx.lineTo(0,10);ctx.stroke();
  }else{
    ctx.rotate(Math.sin(time*2+r.t)*.25);
    ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(-13,-5);ctx.lineTo(-13,5);ctx.fill();ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(13,-5);ctx.lineTo(13,5);ctx.fill();
    ctx.fillStyle='#b06cff';ctx.beginPath();ctx.ellipse(0,0,8,6.5,0,0,7);ctx.fill();
    ctx.strokeStyle='#e7d2ff';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-3,-5);ctx.quadraticCurveTo(0,0,-3,5);ctx.moveTo(2,-6);ctx.quadraticCurveTo(5,0,2,6);ctx.stroke();
  }
  ctx.restore();
}
function drawStun(e){if(e.stun>0){for(let k=0;k<3;k++){const a=time*5+k*2.1;ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(e.x+e.w/2+Math.cos(a)*18,e.y-8+Math.sin(a)*5,2.8,0,7);ctx.fill();}}}
function drawSoldier(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(!e.dead){ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(0,0,13,3,0,0,7);ctx.fill();}
  if(e.dead){ctx.translate(0,-20);ctx.rotate(e.rot);ctx.translate(0,20);}
  if(e.squash>0)ctx.scale(1.35,.35);
  ctx.scale(e.dir,1);
  const sw=Math.sin(e.anim)*3;
  ctx.fillStyle='#1d2340';ctx.beginPath();ctx.roundRect(-7+sw,-11,5,11,2);ctx.roundRect(2-sw,-11,5,11,2);ctx.fill();
  ctx.fillStyle='#d24a62';ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=1.4;ctx.beginPath();ctx.roundRect(-9,-27,18,18,5);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-7,-25);ctx.lineTo(7,-12);ctx.stroke();
  ctx.fillStyle='#f2c66d';ctx.fillRect(-9,-14,18,2);
  ctx.fillStyle='#f3d2bf';ctx.beginPath();ctx.arc(0,-31,5.5,0,7);ctx.fill();
  ctx.fillStyle='#1d2340';ctx.beginPath();ctx.roundRect(-6.5,-48,13,15,5);ctx.fill();
  ctx.fillStyle='#f2c66d';ctx.fillRect(-6.5,-35.5,13,2);
  ctx.fillStyle='#1d1530';ctx.beginPath();ctx.arc(.5,-31,1.3,0,7);ctx.arc(3.8,-31,1.3,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(.6,-31.8,.7,.7);ctx.fillRect(3.9,-31.8,.7,.7);
  ctx.fillStyle='rgba(255,120,150,.6)';ctx.beginPath();ctx.arc(4.5,-28.5,1.3,0,7);ctx.arc(-2.5,-28.5,1.3,0,7);ctx.fill();
  ctx.save();ctx.translate(-11,-19);ctx.rotate(e.anim*.6);ctx.strokeStyle='#f2c66d';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-4,0);ctx.lineTo(4,0);ctx.stroke();
  ctx.beginPath();ctx.arc(-6,0,2.6,0,7);ctx.arc(6,0,2.6,0,7);ctx.stroke();ctx.restore();
  ctx.restore();
}
function drawOwl(e){
  const big=e.type==='rothbart',s=big?2.3:1;
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h/2);
  if(e.dead)ctx.rotate(e.rot);
  if(e.squash>0)ctx.scale(1.3,.4);
  if(big&&e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  if(big){const g=ctx.createRadialGradient(0,0,0,0,0,70);g.addColorStop(0,'rgba(170,60,220,.35)');g.addColorStop(1,'rgba(170,60,220,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,70,0,7);ctx.fill();}
  ctx.scale(s*(e.dir||1),s);
  const rv=e.type==='raven'||e.type==='imp',im=e.type==='imp',f=Math.sin(e.anim)*.7,wing=big?'#1c0f28':im?'#2e5a2a':rv?'#1e1e2e':'#4a3c5e',body=big?'#2c1a3c':im?'#5aa04a':rv?'#2e2e44':'#6b5a7e',face=big?'#4a2c5e':im?'#8ad07a':rv?'#3e3e58':'#cbbfd8';
  ctx.fillStyle=wing;
  ctx.save();ctx.translate(-9,-1);ctx.rotate(-.3-f);ctx.beginPath();ctx.ellipse(-9,0,13,5,0,0,7);ctx.fill();ctx.restore();
  ctx.save();ctx.translate(9,-1);ctx.rotate(.3+f);ctx.beginPath();ctx.ellipse(9,0,13,5,0,0,7);ctx.fill();ctx.restore();
  ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(0,2,12,13,0,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(-10,-6);ctx.lineTo(-9,-15);ctx.lineTo(-4,-9);ctx.fill();ctx.beginPath();ctx.moveTo(10,-6);ctx.lineTo(9,-15);ctx.lineTo(4,-9);ctx.fill();
  ctx.fillStyle=face;ctx.beginPath();ctx.ellipse(0,-2,9.5,7,0,0,7);ctx.fill();
  ctx.fillStyle=big?'#ff3b5c':'#ffd36e';ctx.beginPath();ctx.arc(-4,-2,3.4,0,7);ctx.arc(4,-2,3.4,0,7);ctx.fill();
  ctx.fillStyle='#14091c';ctx.beginPath();ctx.arc(-3.6,-2,1.6,0,7);ctx.arc(4.4,-2,1.6,0,7);ctx.fill();
  ctx.fillStyle='#f2a64d';ctx.beginPath();ctx.moveTo(-1.6,1);ctx.lineTo(1.6,1);ctx.lineTo(0,4.5);ctx.fill();
  if(big){ctx.fillStyle='#f2c66d';ctx.beginPath();ctx.moveTo(-6,-9);ctx.lineTo(-5,-16);ctx.lineTo(-2,-11);ctx.lineTo(0,-18);ctx.lineTo(2,-11);ctx.lineTo(5,-16);ctx.lineTo(6,-9);ctx.fill();}
  ctx.restore();
}
function drawBroom(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(e.dead){ctx.translate(0,-20);ctx.rotate(e.rot);ctx.translate(0,20);}
  if(e.squash>0)ctx.scale(1.35,.35);
  ctx.scale(e.dir,1);ctx.rotate(Math.sin(e.anim)*.12);
  ctx.strokeStyle='#a8703f';ctx.lineWidth=3.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(0,-44);ctx.stroke();
  ctx.fillStyle='#f2c66d';ctx.beginPath();ctx.moveTo(-6,-16);ctx.lineTo(6,-16);ctx.lineTo(12,0);ctx.lineTo(-12,0);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#c8963a';ctx.lineWidth=1;for(let k=-8;k<=8;k+=4){ctx.beginPath();ctx.moveTo(k*.5,-14);ctx.lineTo(k+Math.sin(e.anim*2+k)*1.5,0);ctx.stroke();}
  ctx.fillStyle='#d24a62';ctx.fillRect(-7,-19,14,4);
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-2,-10,2.6,0,7);ctx.arc(4,-10,2.6,0,7);ctx.fill();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(-1.2,-10,1.3,0,7);ctx.arc(4.8,-10,1.3,0,7);ctx.fill();
  ctx.strokeStyle='#2a1a2a';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-4.5,-14);ctx.lineTo(-.5,-13);ctx.moveTo(6.5,-14);ctx.lineTo(2.5,-13);ctx.stroke();
  ctx.restore();
}
function drawCarabosse(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h/2);
  if(e.dead)ctx.rotate(e.rot);
  if(e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  const g=ctx.createRadialGradient(0,0,0,0,0,75);g.addColorStop(0,'rgba(120,220,120,.3)');g.addColorStop(1,'rgba(120,220,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,75,0,7);ctx.fill();
  ctx.scale(e.dir||1,1);const f=Math.sin(e.anim)*.5;
  ctx.fillStyle='#2a1838';
  for(const sd of [-1,1]){ctx.save();ctx.scale(sd,1);ctx.rotate(-.3-f*.6);ctx.beginPath();ctx.moveTo(6,-10);ctx.quadraticCurveTo(30,-34,52,-20);ctx.lineTo(42,-12);ctx.lineTo(46,-2);ctx.lineTo(34,-4);ctx.lineTo(34,6);ctx.quadraticCurveTo(20,0,6,6);ctx.fill();ctx.restore();}
  ctx.fillStyle='#3a1f52';ctx.beginPath();ctx.moveTo(0,-16);ctx.lineTo(20,30);ctx.lineTo(-20,30);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b8e8a8';ctx.beginPath();ctx.arc(0,-18,11,0,7);ctx.fill();
  ctx.fillStyle='#1a0e26';ctx.beginPath();ctx.moveTo(-12,-20);ctx.quadraticCurveTo(-18,-38,-8,-44);ctx.quadraticCurveTo(-10,-32,-4,-26);ctx.lineTo(4,-26);ctx.quadraticCurveTo(10,-32,8,-44);ctx.quadraticCurveTo(18,-38,12,-20);ctx.quadraticCurveTo(0,-30,-12,-20);ctx.fill();
  ctx.fillStyle='#ff3b5c';ctx.beginPath();ctx.arc(-4,-18,2.2,0,7);ctx.arc(4,-18,2.2,0,7);ctx.fill();
  ctx.strokeStyle='#4a2a3a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-3,-12);ctx.quadraticCurveTo(0,-14,3,-12);ctx.stroke();
  ctx.strokeStyle='#8a6a4a';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(18,30);ctx.lineTo(26,-24);ctx.stroke();
  const og=ctx.createRadialGradient(26,-28,0,26,-28,10);og.addColorStop(0,'#eaffd8');og.addColorStop(1,'#5ac85a');ctx.fillStyle=og;ctx.beginPath();ctx.arc(26,-28,6+Math.sin(time*6),0,7);ctx.fill();
  ctx.restore();
}

function drawWolf(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(e.dead){ctx.translate(0,-20);ctx.rotate(e.rot);ctx.translate(0,20);}
  if(e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  ctx.scale(e.dir,1);const run=e.mode==='dash'||e.mode==='walk',lg=run?Math.sin(e.anim*(e.mode==='dash'?2:1))*6:0,cr=e.mode==='crouch'?4:0,pant=e.mode==='tired';
  ctx.fillStyle='#6a6a80';
  ctx.beginPath();ctx.moveTo(-26,-24+cr);ctx.quadraticCurveTo(-40,-34,-36,-14);ctx.lineTo(-26,-18+cr);ctx.fill();
  ctx.fillStyle='#55556a';ctx.fillRect(-20+lg,-14,6,14);ctx.fillRect(10-lg,-14,6,14);
  ctx.fillStyle='#7a7a92';ctx.beginPath();ctx.ellipse(-2,-22+cr,25,12,0,0,7);ctx.fill();
  ctx.fillStyle='#55556a';ctx.fillRect(-14-lg,-14,6,14);ctx.fillRect(16+lg,-14,6,14);
  ctx.fillStyle='#c8c8d8';ctx.beginPath();ctx.ellipse(0,-16+cr,16,5,0,0,7);ctx.fill();
  ctx.save();ctx.translate(22,-30+cr);
  ctx.fillStyle='#7a7a92';ctx.beginPath();ctx.ellipse(0,0,11,10,0,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(-6,-6);ctx.lineTo(-3,-17);ctx.lineTo(2,-7);ctx.fill();ctx.beginPath();ctx.moveTo(1,-7);ctx.lineTo(6,-16);ctx.lineTo(8,-4);ctx.fill();
  ctx.fillStyle='#ffb3cf';ctx.beginPath();ctx.moveTo(-4,-8);ctx.lineTo(-3,-13);ctx.lineTo(0,-8);ctx.fill();
  ctx.fillStyle='#c8c8d8';ctx.beginPath();ctx.ellipse(9,4,9,5,0,0,7);ctx.fill();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(17,2,2.2,0,7);ctx.fill();
  ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(4,-2,2.4,0,7);ctx.fill();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(4.6,-2,1.2,0,7);ctx.fill();
  ctx.strokeStyle='#2a1a2a';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(1,-6);ctx.lineTo(7,-4.5);ctx.stroke();
  if(pant){ctx.fillStyle='#ff7aa8';ctx.beginPath();ctx.ellipse(12,10+Math.sin(time*14)*1.5,3,4,0,0,7);ctx.fill();}
  ctx.restore();ctx.restore();
  if(e.mode==='tired'&&!e.dead){ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='600 12px Fredoka, Inter, sans-serif';ctx.fillText('huff',e.x+e.w/2+(e.dir>0?30:-30),e.y-8-Math.sin(time*4)*3);}
}
function drawCoppelius(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(e.dead){ctx.translate(0,-30);ctx.rotate(e.rot);ctx.translate(0,30);}
  if(e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  ctx.scale(e.dir,1);
  ctx.fillStyle='#3a2a20';ctx.fillRect(-9,-14,7,14);ctx.fillRect(2,-14,7,14);
  ctx.fillStyle='#5a3a6a';ctx.beginPath();ctx.moveTo(-12,-46);ctx.lineTo(12,-46);ctx.lineTo(18,-12);ctx.lineTo(-18,-12);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f2c66d';ctx.fillRect(-2,-44,4,30);
  ctx.strokeStyle='#5a3a6a';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(10,-40);ctx.lineTo(20,-30+Math.sin(e.anim)*5);ctx.stroke();
  ctx.fillStyle='#f6dcc8';ctx.beginPath();ctx.arc(1,-54,9,0,7);ctx.fill();
  ctx.fillStyle='#e8e8f0';ctx.beginPath();ctx.moveTo(-6,-50);ctx.quadraticCurveTo(1,-34,8,-50);ctx.fill();
  ctx.strokeStyle='#2a1a2a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(-1,-56,3,0,7);ctx.arc(6,-56,3,0,7);ctx.stroke();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(-1,-56,1,0,7);ctx.arc(6,-56,1,0,7);ctx.fill();
  ctx.fillStyle='#2a2030';ctx.beginPath();ctx.ellipse(1,-62,13,3.5,0,0,7);ctx.fill();ctx.beginPath();ctx.roundRect(-7,-76,16,15,3);ctx.fill();ctx.fillStyle='#a03050';ctx.fillRect(-7,-66,16,3);
  ctx.restore();
  if(e.stun>0){for(let k=0;k<3;k++){const a=time*5+k*2.1;ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(e.x+e.w/2+Math.cos(a)*16,e.y-8+Math.sin(a)*4,2.6,0,7);ctx.fill();}}
}
function drawKoschei(e){
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h/2);
  if(e.dead)ctx.rotate(e.rot);
  if(e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  const g=ctx.createRadialGradient(0,0,0,0,0,80);g.addColorStop(0,'rgba(120,255,160,.3)');g.addColorStop(1,'rgba(120,255,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,80,0,7);ctx.fill();
  ctx.scale(e.dir||1,1);const f=Math.sin(e.anim)*.5;
  ctx.fillStyle='#14281c';
  for(const sd of [-1,1]){ctx.save();ctx.scale(sd,1);ctx.rotate(-.25-f*.5);ctx.beginPath();ctx.moveTo(6,-6);ctx.quadraticCurveTo(34,-30,56,-14);ctx.lineTo(44,-6);ctx.lineTo(48,6);ctx.lineTo(30,2);ctx.quadraticCurveTo(18,6,6,8);ctx.fill();ctx.restore();}
  ctx.fillStyle='#1e3a28';ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(22,32);ctx.lineTo(-22,32);ctx.closePath();ctx.fill();
  ctx.fillStyle='#d8e8c8';ctx.beginPath();ctx.ellipse(0,-20,10,12,0,0,7);ctx.fill();
  ctx.fillStyle='#e8f0e0';ctx.beginPath();ctx.moveTo(-7,-14);ctx.quadraticCurveTo(0,14,7,-14);ctx.fill();
  ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.ellipse(-4,-22,2.6,3.2,0,0,7);ctx.ellipse(4,-22,2.6,3.2,0,0,7);ctx.fill();
  ctx.fillStyle='#8affb0';ctx.beginPath();ctx.arc(-4,-22,1.1,0,7);ctx.arc(4,-22,1.1,0,7);ctx.fill();
  ctx.fillStyle='#ffd36e';ctx.beginPath();ctx.moveTo(-9,-30);ctx.lineTo(-8,-40);ctx.lineTo(-4,-34);ctx.lineTo(0,-44);ctx.lineTo(4,-34);ctx.lineTo(8,-40);ctx.lineTo(9,-30);ctx.fill();
  ctx.strokeStyle='#8a6a4a';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(20,30);ctx.lineTo(28,-26);ctx.stroke();
  const og=ctx.createRadialGradient(28,-30,0,28,-30,10);og.addColorStop(0,'#eaffea');og.addColorStop(1,'#3ac86a');ctx.fillStyle=og;ctx.beginPath();ctx.arc(28,-30,6+Math.sin(time*6),0,7);ctx.fill();
  ctx.restore();
}
function drawMouse(e){
  const king=e.type==='king',s=king?2.25:1;
  ctx.save();ctx.translate(e.x+e.w/2,e.y+e.h);
  if(e.dead){ctx.translate(0,-14*s);ctx.rotate(e.rot);ctx.translate(0,14*s);}
  if(e.squash>0)ctx.scale(1.35,.35);
  if(king&&e.inv>0&&Math.floor(e.inv*16)%2)ctx.globalAlpha=.4;
  ctx.scale(e.dir*s,s);
  const sw=Math.sin(e.anim)*3,fur=king?'#8f8399':'#a99bb8';
  ctx.lineCap='round';
  ctx.strokeStyle='#ffb3c7';ctx.lineWidth=2/s*1.2;ctx.beginPath();ctx.moveTo(-12,-8);ctx.quadraticCurveTo(-24,-6+sw,-22,-19);ctx.stroke();
  if(king){ctx.fillStyle='#b3243d';ctx.beginPath();ctx.moveTo(4,-19);ctx.quadraticCurveTo(-10,-22,-17,-2);ctx.lineTo(-4,-2);ctx.fill();}
  ctx.fillStyle='#7d7090';ctx.beginPath();ctx.ellipse(-6+sw,-1.5,4,2,0,0,7);ctx.ellipse(6-sw,-1.5,4,2,0,0,7);ctx.fill();
  ctx.fillStyle=fur;ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=1.3/s*1.2;ctx.beginPath();ctx.ellipse(-1,-10,13,9,0,0,7);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(11,-14,7,0,7);ctx.fill();
  ctx.beginPath();ctx.ellipse(17,-12.5,4.5,3,0,0,7);ctx.fill();
  ctx.fillStyle='#ff8fae';ctx.beginPath();ctx.arc(21.5,-12.5,1.8,0,7);ctx.fill();
  ctx.fillStyle=fur;ctx.beginPath();ctx.arc(7,-21,5,0,7);ctx.fill();
  ctx.fillStyle='#ffb3c7';ctx.beginPath();ctx.arc(7,-21,3,0,7);ctx.fill();
  ctx.fillStyle=king?'#ff3b5c':'#1a1220';ctx.beginPath();ctx.arc(13.5,-16,2.2,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(14.2,-16.8,.8,0,7);ctx.fill();
  if(!king){ctx.fillStyle='rgba(255,140,170,.7)';ctx.beginPath();ctx.ellipse(15.5,-11.5,2,1.2,0,0,7);ctx.fill();}
  if(king){
    ctx.fillStyle='#f2c66d';ctx.beginPath();ctx.moveTo(6,-19);ctx.lineTo(7,-29);ctx.lineTo(10,-24);ctx.lineTo(13,-31);ctx.lineTo(15,-24);ctx.lineTo(18,-28);ctx.lineTo(17,-19);ctx.fill();
    ctx.fillStyle='#ff5c86';ctx.beginPath();ctx.arc(13,-21.5,1.2,0,7);ctx.fill();
  }
  ctx.restore();
}
function drawBallerina(p){
  ctx.save();ctx.translate(p.x+p.w/2,p.y+p.h);
  if(p.sq){const e=easeOutBack(Math.min(1,p.sq.t/.22));ctx.scale(p.sq.x+(1-p.sq.x)*e,p.sq.y+(1-p.sq.y)*e);}
  if(p.inv>0&&Math.floor(p.inv*14)%2)ctx.globalAlpha=.35;
  const spinning=p.spinT>0||state==='win';
  let sx=p.face;
  if(spinning){sx=p.face*Math.cos(p.spinA);if(Math.abs(sx)<.18)sx=.18*(sx<0?-1:1);}
  ctx.scale(sx,1);
  const air=!p.onGround,run=p.onGround&&Math.abs(p.vx)>20,ph=p.anim;
  const C=p.alt?Object.assign({},costumeFor(L.ballet),{tights:'#eafff6',suit:'#3fc8a0',tutu:'#dcfff2',tutu2:'rgba(63,200,160,.6)',rainbow:false}):costumeFor(L.ballet),tights=C.tights,suit=C.rainbow?`hsl(${(time*90)%360},85%,70%)`:C.suit,tutu=C.tutu,tutu2=C.tutu2,skin='#f3d2bf',hair='#3b2629';
  if(p.flapT>0){const a=p.flapT/.4,fl=Math.sin(a*Math.PI*3)*.6;ctx.globalAlpha=Math.min(1,a*2)*.9;ctx.fillStyle=L.ballet==='firebird'?'#ffb066':'#fff';for(const sd of [-1,1]){ctx.save();ctx.translate(0,-36);ctx.rotate(sd*(.9+fl));ctx.beginPath();ctx.ellipse(sd*14,0,16,5,0,0,7);ctx.fill();ctx.restore();}ctx.globalAlpha=p.inv>0&&Math.floor(p.inv*14)%2?.35:1;}
  if(!air){ctx.save();ctx.scale(1/Math.abs(sx),1);ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(0,0,14,3,0,0,7);ctx.fill();ctx.restore();}
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=tights;ctx.lineWidth=3.6;
  const leg=(...pts)=>{ctx.beginPath();ctx.moveTo(0,-23);pts.forEach(([x,y])=>ctx.lineTo(x,y));const c0=ctx.strokeStyle,w0=ctx.lineWidth;ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=w0+2;ctx.stroke();ctx.strokeStyle=c0;ctx.lineWidth=w0;ctx.stroke();};
  if(spinning){leg([0,0]);leg([9,-13],[1,-8]);}
  else if(air){const s=p.vy<0?1:.7;leg([10*s,-17],[20*s,-22+4*(1-s)]);leg([-10*s,-15],[-20*s,-14]);}
  else if(run){const a=Math.sin(ph),b=Math.cos(ph);leg([a*10,-Math.max(0,b)*5]);leg([-a*10,-Math.max(0,-b)*5]);}
  else{const br=Math.sin(time*2)*.5;leg([-3,0]);leg([3+br,0]);}
  ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=1.4;
  ctx.fillStyle=suit;ctx.beginPath();ctx.roundRect(-5,-40,10,18,4);ctx.fill();ctx.stroke();
  ctx.save();ctx.translate(0,-23);ctx.rotate(air&&!spinning?-.12:0);
  ctx.fillStyle=tutu2;ctx.beginPath();ctx.ellipse(0,1,17,4.5,0,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle=tutu;ctx.beginPath();ctx.ellipse(0,-.5,15.5,4,0,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-3,-1.6,8,1.4,0,0,7);ctx.fill();ctx.restore();
  ctx.strokeStyle=skin;ctx.lineWidth=2.6;
  const arm=(cx,cy,x,y)=>{ctx.beginPath();ctx.moveTo(0,-37);ctx.quadraticCurveTo(cx,cy,x,y);const c0=ctx.strokeStyle,w0=ctx.lineWidth;ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=w0+1.8;ctx.stroke();ctx.strokeStyle=c0;ctx.lineWidth=w0;ctx.stroke();};
  if(spinning){arm(12,-36,3,-30);arm(-12,-36,-3,-30);}
  else if(air){arm(16,-58,4,-70);arm(-15,-58,-5,-70);}
  else if(run){arm(10,-38,16,-34);arm(-10,-38,-16,-33);}
  else{arm(9,-34,6,-26);arm(-9,-34,-6,-26);}
  drawHead(C,spinning);
  ctx.restore();
}
function drawHead(C,closed){
  const skin='#f6d6c4',hair='#4a2c2c';
  ctx.fillStyle=skin;ctx.fillRect(-1.5,-44,3,5);
  ctx.strokeStyle='rgba(60,20,70,.55)';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(1,-51,9,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle=hair;ctx.beginPath();ctx.arc(1,-51.5,9.4,Math.PI*.93,Math.PI*2.02);ctx.quadraticCurveTo(6,-56,3,-55);ctx.quadraticCurveTo(-3,-53,-8.2,-49);ctx.fill();
  ctx.beginPath();ctx.arc(-4.5,-61,5.2,0,7);ctx.fill();
  if(C.head==='flower'){ctx.strokeStyle='#5aa05a';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(1,-51,10,Math.PI*1.1,Math.PI*1.9);ctx.stroke();const fc=['#ff9ec0','#ffe27a','#c9a6ff'];for(let k=0;k<5;k++){const a=Math.PI*(1.12+k*.19);ctx.fillStyle=fc[k%3];ctx.beginPath();ctx.arc(1+Math.cos(a)*10,-51+Math.sin(a)*10,2.6,0,7);ctx.fill();}}
  else if(C.head==='star'){ctx.fillStyle='#ffe27a';ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?2:4.6,a=k*Math.PI/5-Math.PI/2;ctx.lineTo(7+Math.cos(a)*r,-58+Math.sin(a)*r);}ctx.fill();}
  else if(C.head==='bunny'){for(const[ex,rt] of [[-4,-.2],[5,.2]]){ctx.save();ctx.translate(ex,-60);ctx.rotate(rt);ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,-7,2.8,8,0,0,7);ctx.fill();ctx.fillStyle='#ffb3cf';ctx.beginPath();ctx.ellipse(0,-7,1.3,5.5,0,0,7);ctx.fill();ctx.restore();}}
  else if(C.head==='cat'){ctx.fillStyle='#4a2c2c';ctx.beginPath();ctx.moveTo(-7,-57);ctx.lineTo(-6,-67);ctx.lineTo(-1,-59);ctx.fill();ctx.beginPath();ctx.moveTo(9,-57);ctx.lineTo(8,-67);ctx.lineTo(3,-59);ctx.fill();ctx.fillStyle='#ffb3cf';ctx.beginPath();ctx.moveTo(-5.5,-59);ctx.lineTo(-5,-64);ctx.lineTo(-2.5,-60);ctx.fill();ctx.beginPath();ctx.moveTo(7.5,-59);ctx.lineTo(7,-64);ctx.lineTo(4.5,-60);ctx.fill();}
  else if(C.head==='tiara'){ctx.fillStyle=C.tiara;ctx.beginPath();ctx.moveTo(-7,-58);ctx.lineTo(-6,-65);ctx.lineTo(-2,-61);ctx.lineTo(1,-68);ctx.lineTo(4,-61);ctx.lineTo(8,-65);ctx.lineTo(9,-58);ctx.closePath();ctx.fill();ctx.fillStyle='#ff7aa8';ctx.beginPath();ctx.arc(1,-63,1.5,0,7);ctx.fill();}
  else if(C.head==='swan'){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(-10,-58,6.5,2.2,-.6,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(2,-60,6,2,.5,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(-4.5,-67,2.2,5,0,0,7);ctx.fill();}
  else{ctx.fillStyle='#ff7aa8';ctx.beginPath();ctx.moveTo(-1,-62);ctx.lineTo(5,-66);ctx.lineTo(5,-58);ctx.fill();ctx.beginPath();ctx.moveTo(-1,-62);ctx.lineTo(-5,-68);ctx.lineTo(2,-67);ctx.fill();ctx.beginPath();ctx.arc(-1,-62,1.8,0,7);ctx.fill();}
  ctx.lineCap='round';
  if(closed){ctx.strokeStyle='#2a1a2a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(3,-50,1.6,Math.PI*1.1,Math.PI*1.9);ctx.stroke();ctx.beginPath();ctx.arc(7.6,-50,1.5,Math.PI*1.1,Math.PI*1.9);ctx.stroke();}
  else{ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(3,-50.5,1.9,0,7);ctx.arc(7.6,-50.5,1.7,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(3.6,-51.2,.65,0,7);ctx.arc(8.1,-51.2,.6,0,7);ctx.fill();}
  ctx.strokeStyle='#c2556f';ctx.lineWidth=1.1;ctx.beginPath();ctx.arc(5.6,-47.2,1.7,.25,Math.PI-.25);ctx.stroke();
  ctx.fillStyle='rgba(255,140,175,.6)';ctx.beginPath();ctx.ellipse(.2,-47,1.9,1.1,0,0,7);ctx.ellipse(9.2,-47,1.5,1.1,0,0,7);ctx.fill();
}

function draw(){
  if(mode==='dance'){drawDance();return;}
  ctx.setTransform(1,0,0,1,0,0);
  const bgc=L.theme.bg,bg=ctx.createLinearGradient(0,0,0,cv.height);
  bg.addColorStop(0,bgc[0]);bg.addColorStop(.6,bgc[1]);bg.addColorStop(1,bgc[2]);
  ctx.fillStyle=bg;ctx.fillRect(0,0,cv.width,cv.height);
  const tq=trauma*trauma*SET.shake,sh=14*tq*(.6*Math.sin(time*41)+.4*Math.sin(time*67)),shy=9*tq*(.6*Math.sin(time*53+1)+.4*Math.sin(time*29));
  ctx.setTransform(DPR*scale,0,0,DPR*scale,DPR*sh,DPR*((offY+camY*scale)+shy));
  const topY=-(offY+camY*scale)/scale,botY=(H-(offY+camY*scale))/scale;
  const bp=beatPos(),pulse=Math.exp(-(bp-Math.floor(bp))*5);
  backdrop(topY,botY,pulse);
  ctx.save();ctx.translate(-cam,0);
  drawGoal();
  if(L.theme.liquid){
    const x0=cam-10,x1=cam+viewW+10;
    const wl=L.theme.liquidY||424;
    ctx.fillStyle=L.theme.liquid;ctx.beginPath();ctx.moveTo(x0,botY);
    for(let x=x0;x<=x1;x+=16)ctx.lineTo(x,wl+Math.sin(x*.03+time*2)*(L.theme.wave||3)+Math.sin(x*.011-time*1.3)*(L.theme.wave||0)*.6);
    ctx.lineTo(x1,botY);ctx.fill();
    ctx.strokeStyle=L.theme.liquidTop;ctx.lineWidth=2.5;ctx.beginPath();
    for(let x=x0;x<=x1;x+=16)ctx.lineTo(x,wl+Math.sin(x*.03+time*2)*(L.theme.wave||3)+Math.sin(x*.011-time*1.3)*(L.theme.wave||0)*.6);ctx.stroke();
    ctx.fillStyle=L.theme.glint||'rgba(255,220,180,.18)';
    for(let i=0;i<14;i++){const bx=x0+((hash(i)*2000+time*20)%(viewW+20));ctx.beginPath();ctx.ellipse(bx,wl+12+hash(i+3)*24,8+hash(i+7)*14,1.5,0,0,7);ctx.fill();}
    if(L.theme.kind==='lake'){const mx=cam+viewW*.72;for(let i=0;i<7;i++){ctx.globalAlpha=.3-i*.035;ctx.fillStyle='#eaf2ff';ctx.beginPath();ctx.ellipse(mx+Math.sin(time*1.5+i)*4,wl+8+i*8,30-i*3,1.6,0,0,7);ctx.fill();}ctx.globalAlpha=1;}
  }
  for(const d of drafts){
    if(d.x+d.w<cam||d.x>cam+viewW)continue;
    const g=ctx.createLinearGradient(0,d.top,0,480);const dc=L.theme.draftCol||'210,255,225';g.addColorStop(0,`rgba(${dc},0)`);g.addColorStop(1,`rgba(${dc},${.14+.05*Math.sin(time*3)})`);
    ctx.fillStyle=g;ctx.fillRect(d.x+6,d.top,d.w-12,480-d.top);
    ctx.strokeStyle=`rgba(${L.theme.draftCol||'220,255,230'},.16)`;ctx.lineWidth=2;
    for(let k=0;k<3;k++){const yy=480-((time*90+k*60)%(480-d.top));ctx.beginPath();ctx.moveTo(d.x+12,yy);ctx.quadraticCurveTo(d.x+d.w/2,yy-10,d.x+d.w-12,yy);ctx.stroke();}
  }
  drawTiles(pulse);
  for(const m of movers){
    if(m.x+m.w<cam-20||m.x>cam+viewW+20)continue;
    if(m.kind==='pad'){
      ctx.globalAlpha=m.under>0?.25:1;
      ctx.fillStyle='#2f6b4c';ctx.beginPath();ctx.ellipse(m.x+m.w/2,m.y+5,m.w/2,8,0,.25,Math.PI*2-.05);ctx.lineTo(m.x+m.w/2,m.y+5);ctx.fill();
      ctx.fillStyle='#4f9a6e';ctx.beginPath();ctx.ellipse(m.x+m.w/2,m.y+3,m.w/2-3,6,0,.3,Math.PI*2-.08);ctx.lineTo(m.x+m.w/2,m.y+3);ctx.fill();
      if(hash(m.x0)>.4){const fx=m.x+m.w*.3,fy=m.y-1;ctx.fillStyle='#ffc6dc';for(let k=0;k<5;k++){ctx.beginPath();ctx.ellipse(fx+Math.cos(k*1.26)*3,fy+Math.sin(k*1.26)*1.5-2,3,5,k*1.26,0,7);ctx.fill();}ctx.fillStyle='#ffe9a8';ctx.beginPath();ctx.arc(fx,fy-2,1.8,0,7);ctx.fill();}
      ctx.globalAlpha=1;
    }else if(L.theme.kind==='dawn'){
      const cx=m.x+m.w/2,cy=m.y+10,fd=m.dx<0?-1:m.dx>0?1:(m.face||1);m.face=fd;const fl=Math.sin(time*6+m.x0);
      ctx.save();ctx.translate(cx,cy);ctx.scale(fd,1);
      ctx.fillStyle='rgba(120,60,90,.12)';ctx.beginPath();ctx.ellipse(0,26,m.w*.4,5,0,0,7);ctx.fill();
      ctx.fillStyle='#e9eef8';ctx.beginPath();ctx.ellipse(-8,-2,30,7+fl*5,-.2-fl*.25,0,7);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,2,m.w/2,12,0,0,7);ctx.fill();
      ctx.beginPath();ctx.moveTo(-m.w/2,2);ctx.lineTo(-m.w/2-14,-8);ctx.lineTo(-m.w/2+6,-4);ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(m.w/2-14,0);ctx.quadraticCurveTo(m.w/2+10,-6,m.w/2+2,-20);ctx.quadraticCurveTo(m.w/2-4,-30,m.w/2+8,-32);ctx.stroke();
      ctx.fillStyle='#ffb347';ctx.beginPath();ctx.moveTo(m.w/2+10,-34);ctx.lineTo(m.w/2+20,-31);ctx.lineTo(m.w/2+10,-29);ctx.fill();
      ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(m.w/2+8,-33,1.4,0,7);ctx.fill();
      ctx.fillStyle='rgba(255,140,175,.6)';ctx.beginPath();ctx.arc(m.w/2+6,-30,1.6,0,7);ctx.fill();
      ctx.fillStyle='#e9eef8';ctx.beginPath();ctx.ellipse(6,-4,26,6-fl*4,.25+fl*.3,0,7);ctx.fill();
      ctx.restore();
    }else if(L.theme.kind==='garden'){
      const cx=m.x+m.w/2,cy=m.y+22,r=m.w/2+4,wob=Math.sin(time*3+m.x0)*1.5;
      const bg=ctx.createRadialGradient(cx-r*.3,cy-r*.3,2,cx,cy,r);bg.addColorStop(0,'rgba(255,255,255,.55)');bg.addColorStop(.7,'rgba(220,200,255,.22)');bg.addColorStop(1,'rgba(255,170,230,.45)');
      ctx.fillStyle=bg;ctx.beginPath();ctx.ellipse(cx,cy,r+wob,r-wob,0,0,7);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx,cy,r+wob,r-wob,0,0,7);ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.ellipse(cx-r*.4,cy-r*.45,5,3,-.6,0,7);ctx.fill();
    }else if(L.theme.kind==='road'){
      const cx=m.x+m.w/2,by=m.y;
      ctx.fillStyle='#ff9a3c';ctx.beginPath();ctx.ellipse(cx,by+18,m.w/2,20,0,Math.PI,0);ctx.lineTo(cx+m.w/2,by+26);ctx.lineTo(cx-m.w/2,by+26);ctx.fill();
      ctx.strokeStyle='#d8701e';ctx.lineWidth=2;for(const k of [-.25,0,.25]){ctx.beginPath();ctx.ellipse(cx+k*m.w,by+18,m.w*.12,20,0,Math.PI,0);ctx.stroke();}
      ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.roundRect(cx-10,by+6,20,14,7);ctx.fill();
      ctx.fillStyle='#f2c66d';ctx.fillRect(m.x-2,by-2,m.w+4,4);
      for(const wx of [m.x+14,m.x+m.w-14]){ctx.save();ctx.translate(wx,by+30);ctx.rotate(m.x*.05);ctx.strokeStyle='#f2c66d';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.stroke();ctx.beginPath();for(let k=0;k<4;k++){ctx.moveTo(0,0);ctx.lineTo(Math.cos(k*Math.PI/2)*9,Math.sin(k*Math.PI/2)*9);}ctx.stroke();ctx.restore();}
      ctx.strokeStyle='#5aa040';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,by-2);ctx.quadraticCurveTo(cx+4,by-12,cx+10,by-12);ctx.stroke();
    }else if(L.theme.kind==='tower'){
      ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.roundRect(m.x+3,m.y+6,m.w-6,14,4);ctx.fill();
      ctx.fillStyle='#6a607e';ctx.beginPath();ctx.roundRect(m.x,m.y,m.w,16,4);ctx.fill();
      ctx.fillStyle='#c8bcd8';ctx.fillRect(m.x+3,m.y,m.w-6,3);
      ctx.strokeStyle='rgba(20,10,30,.4)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(m.x+m.w*.4,m.y+3);ctx.lineTo(m.x+m.w*.4,m.y+16);ctx.stroke();
      ctx.fillStyle=`rgba(140,255,140,${.5+.3*Math.sin(time*4+m.x0)})`;ctx.beginPath();ctx.arc(m.x+m.w*.7,m.y+9,2.2,0,7);ctx.fill();
    }else if(L.theme.kind==='choco'){
      ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.roundRect(m.x+3,m.y+6,m.w-6,12,6);ctx.fill();
      ctx.fillStyle='#d9a066';ctx.beginPath();ctx.roundRect(m.x,m.y,m.w,14,5);ctx.fill();
      ctx.fillStyle='#f0c48a';ctx.fillRect(m.x+4,m.y+1,m.w-8,3);
      ctx.fillStyle='#a8703f';for(let hx=m.x+10;hx<m.x+m.w-6;hx+=14){ctx.beginPath();ctx.arc(hx,m.y+9,1.6,0,7);ctx.fill();}
    }else{
      const g=ctx.createRadialGradient(m.x+m.w/2,m.y+8,0,m.x+m.w/2,m.y+8,m.w*.7);g.addColorStop(0,'rgba(200,190,255,.35)');g.addColorStop(1,'rgba(200,190,255,0)');
      ctx.fillStyle=g;ctx.fillRect(m.x-30,m.y-30,m.w+60,70);
      const lg=ctx.createLinearGradient(0,m.y,0,m.y+12);lg.addColorStop(0,'#fff');lg.addColorStop(1,'#b8a8ff');
      ctx.fillStyle=lg;ctx.beginPath();ctx.ellipse(m.x+m.w/2,m.y+6,m.w/2,7,0,0,7);ctx.fill();
    }
  }
  for(const r of items){if(r.got||r.x<cam-30||r.x>cam+viewW+30)continue;drawItem(r);}
  if(L.friends)for(const f of L.friends){const fx=f[0]*T;if(fx>cam-200&&fx<cam+viewW+200)drawFriend(f);}
  drawPrince();
  for(let i=1;i<L.cps.length;i++){const fx=L.cps[i]*T;if(fx>cam-60&&fx<cam+viewW+60)drawFairy(i);}
  for(const u of pickups)if(!u.got&&u.x>cam-40&&u.x<cam+viewW+40)drawPickup(u);
  drawSecret();
  for(const e of enemies){if(e.gone||e.x<cam-120||e.x>cam+viewW+120)continue;if(e.type==='king')drawStun(e);e.type==='wolf'?drawWolf(e):e.type==='coppelius'?drawCoppelius(e):e.type==='koschei'?drawKoschei(e):e.type==='stepmother'?drawStepmother(e):e.type==='soldier'?drawSoldier(e):e.type==='broom'?drawBroom(e):e.type==='carabosse'?drawCarabosse(e):(e.type==='owl'||e.type==='rothbart'||e.type==='raven'||e.type==='imp')?drawOwl(e):drawMouse(e);}
  if(state!=='title')for(const player of activePlayers()){drawBallerina(player);if(coop){ctx.font='700 11px Fredoka, Inter, sans-serif';ctx.textAlign='center';ctx.fillStyle=player.alt?'#7fe0c0':'#ff9ec0';ctx.fillText(player.alt?'P2':'P1',player.x+player.w/2,player.y-28);}if(player.shield){const cx=player.x+player.w/2,cy=player.y+player.h/2-8;ctx.strokeStyle=`rgba(190,225,255,${.6+.3*Math.sin(time*6)})`;ctx.lineWidth=2.5;ctx.fillStyle='rgba(160,210,255,.12)';ctx.beginPath();ctx.arc(cx,cy,36,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.ellipse(cx-14,cy-18,6,3,-.6,0,7);ctx.fill();}}
  for(const q of parts){
    ctx.globalAlpha=Math.max(0,q.life/q.max);ctx.fillStyle=q.c;
    if(q.shape==='heart'){ctx.save();ctx.translate(q.x,q.y);ctx.scale(q.s/6,q.s/6);ctx.beginPath();ctx.moveTo(0,4);ctx.bezierCurveTo(-7,-1,-4,-7,0,-3);ctx.bezierCurveTo(4,-7,7,-1,0,4);ctx.fill();ctx.restore();}
    else if(q.shape==='star'){ctx.beginPath();for(let k=0;k<10;k++){const r=k%2?q.s*.45:q.s*1.1,a=k*Math.PI/5-Math.PI/2+time*2;ctx.lineTo(q.x+Math.cos(a)*r,q.y+Math.sin(a)*r);}ctx.fill();}
    else if(q.shape==='note'){ctx.beginPath();ctx.ellipse(q.x,q.y,3.2,2.4,-.4,0,7);ctx.fill();ctx.fillRect(q.x+2.2,q.y-9,1.4,9);}
    else if(q.shape==='bubble'){ctx.strokeStyle=q.c;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(q.x,q.y,q.s,0,7);ctx.stroke();}
    else if(q.spark){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(time*4);ctx.fillRect(-q.s/2,-q.s*1.5,q.s,q.s*3);ctx.fillRect(-q.s*1.5,-q.s/2,q.s*3,q.s);ctx.restore();}
    else{ctx.beginPath();ctx.arc(q.x,q.y,q.s,0,7);ctx.fill();}
  }
  ctx.globalAlpha=1;
  ctx.font='600 13px Fredoka, Inter, system-ui, sans-serif';ctx.textAlign='center';
  for(const t of texts){const k=1-t.life,sc=k<.14?.4+.75*easeOutBack(k/.14):1.15-Math.min(.15,(k-.14));ctx.globalAlpha=Math.min(1,t.life*1.8);ctx.save();ctx.translate(t.x,t.y);ctx.scale(sc,sc);ctx.fillStyle='rgba(60,20,70,.55)';ctx.fillText(t.t,1,1.5);ctx.fillStyle='#fff';ctx.fillText(t.t,0,0);ctx.restore();}
  ctx.globalAlpha=1;
  ctx.restore();
  weather(topY,botY);
  if(mode==='story'&&L.wind&&(windWarn||windStr>.05)){
    const d=Math.floor(lt/7)%2?-1:1,a=windWarn?(Math.sin(time*14)>0?.8:.3):.6*windStr+.2,cx=viewW/2,cy=topY+(offY>40?120:150);
    ctx.globalAlpha=a;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
    for(let k=-1;k<=1;k++){const x=cx+k*22*d;ctx.beginPath();ctx.moveTo(x-8*d,cy-12);ctx.lineTo(x+6*d,cy);ctx.lineTo(x-8*d,cy+12);ctx.stroke();}
    ctx.globalAlpha=1;
  }
  if(!LOWQ&&mode==='story'){const vg=ctx.createRadialGradient(viewW/2,(topY+botY)/2,Math.min(viewW,botY-topY)*.45,viewW/2,(topY+botY)/2,Math.max(viewW,botY-topY)*.75);vg.addColorStop(0,'rgba(20,0,40,0)');vg.addColorStop(1,'rgba(20,0,40,.22)');ctx.fillStyle=vg;ctx.fillRect(-20,topY,viewW+40,botY-topY);}
  if(hurtFlash>0){const g=ctx.createRadialGradient(viewW/2,(topY+botY)/2,Math.min(viewW,botY-topY)*.3,viewW/2,(topY+botY)/2,Math.max(viewW,botY-topY)*.7);g.addColorStop(0,'rgba(255,60,100,0)');g.addColorStop(1,`rgba(255,60,100,${(SET.flash?.45:.2)*hurtFlash})`);ctx.fillStyle=g;ctx.fillRect(-20,topY,viewW+40,botY-topY);}
  if(flash>0){
    if(bolt){ctx.strokeStyle=`rgba(255,250,220,${Math.min(1,bolt.life*5)})`;ctx.lineWidth=4;ctx.lineJoin='round';ctx.beginPath();let bx=bolt.sx,by=topY;ctx.moveTo(bx,by);
      for(let k=0;k<7;k++){bx+=(hash(bolt.seed+k)-.5)*60;by+=(320-topY)/7;ctx.lineTo(bx,by);}ctx.stroke();}
    ctx.fillStyle=`rgba(225,235,255,${flash*(SET.flash?.45:.08)})`;ctx.fillRect(-20,topY,viewW+40,botY-topY);
  }
  // valance
  ctx.fillStyle='#3d0f26';ctx.fillRect(-20,topY,viewW+40,16);
  ctx.beginPath();for(let x=0;x<viewW+60;x+=56){ctx.moveTo(x+56,topY+16);ctx.arc(x+28,topY+16,28,0,Math.PI);}ctx.fill();
  // boss bar
  if(boss&&boss.active&&!bossDefeated&&state==='play'){
    const cx=viewW/2,by=L.theme.kind==='ballroom'?232:topY+(offY>40?80:105);
    ctx.font='600 11px Fredoka, Inter, system-ui, sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.75)';
    ctx.fillText(boss.type==='wolf'?'THE WOLF':boss.type==='coppelius'?'DR. COPP\u00c9LIUS':boss.type==='koschei'?'KOSCHEI':boss.type==='stepmother'?'THE STEPMOTHER':boss.type==='king'?'THE MOUSE KING':boss.type==='carabosse'?'CARABOSSE':'VON ROTHBART',cx,by);
    for(let i=0;i<3;i++){ctx.fillStyle=i<boss.hp?'#ff5c86':'rgba(255,255,255,.18)';ctx.beginPath();ctx.roundRect(cx-49+i*34,by+8,30,6,3);ctx.fill();}
  }
  // closing curtains on win
  if(winT>0){
    const k=clamp((winT-.5)/1.4,0,1),ez=1-Math.pow(1-k,3),cw=viewW/2*ez;
    if(cw>0)for(const side of [0,1]){
      const x0=side?viewW-cw:0,cg=ctx.createLinearGradient(x0,0,x0+cw,0);
      for(let i=0;i<=8;i++)cg.addColorStop(i/8,i%2?'#5e1634':'#3d0f26');
      ctx.fillStyle=cg;ctx.fillRect(x0,topY,cw,botY-topY);
    }
  }
  const bd=$('beat');bd.style.opacity=.3+.7*pulse;bd.style.transform=`scale(${1+.6*pulse})`;
}


