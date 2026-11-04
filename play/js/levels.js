// ================= levels =================
// tiles: 1 solid · 2 one-way · 3 ice · 4 gumdrop (bouncy)
const LEVELS=[
{
  friends:[[6,'fairy','Tap Spin to twirl — it knocks toy soldiers away!']],act:'Act I',name:'The Party',blurb:'Roses · Toy soldiers',num:'linear-gradient(135deg,#ff9ec0,#ff5c86)',
  item:'rose',itemName:'Roses',enemy:'soldier',goal:164,cps:[2,63,98,131],
  theme:{kind:'stage',bg:['#1e1446','#3d2266','#7d3f80'],body:'#1d1530',top:'#ffd1e3',glow:'rgba(255,209,227,.12)',side:'rgba(255,209,227,.25)',oneway:'#ffd1e3'},
  music:{bpm:132,meter:3,dur:1.1,
    mel:[76,79,84,83,81,76,77,81,84,83,79,74,76,79,84,88,84,81,81,77,74,79,74,71],
    ch:[[60,64,67],[57,60,64],[57,60,65],[55,59,62],[60,64,67],[57,60,64],[57,60,65],[55,59,62]],
    bass:[48,45,41,43,48,45,41,43]},
  build({fill,item,en}){
    fill(0,24,10,11);
    fill(8,11,7,7,2);for(let i=8;i<=11;i++)item(i,i===8||i===11?6:5);
    fill(15,16,8,9);item(15,7);item(16,7);en(20,10);
    item(26,8);
    fill(28,55,10,11);
    fill(31,34,7,7,2);fill(37,40,5,5,2);for(let i=37;i<=40;i++)item(i,4);
    en(43,10);
    fill(58,59,7,7,2);item(58,6);item(59,6);
    fill(62,90,10,11);fill(70,71,8,9);fill(76,77,7,9);
    for(let i=72;i<=75;i++)item(i,9);item(76,6);item(77,6);
    en(66,10);en(73,10);
    fill(93,94,8,8);item(93,7);item(94,7);
    fill(97,122,10,11);fill(105,113,8,9);for(let i=106;i<=112;i+=2)item(i,7);
    en(101,10);en(109,8);en(118,10);
    fill(125,126,7,7,2);item(125,6);item(126,6);
    fill(130,171,10,11);fill(138,139,9,9);fill(140,141,8,9);fill(142,147,7,9);
    item(139,8);item(141,7);item(144,5);item(146,6);
    en(151,10);en(156,10);
  }
},
{
  act:'Act II',name:'Land of Snow',blurb:'Snowflakes · Icy floors · Mice',num:'linear-gradient(135deg,#bfe6ff,#6aa8ff)',
  item:'flake',itemName:'Snowflakes',enemy:'mouse',goal:164,cps:[2,39,71,100,132],
  theme:{kind:'snow',bg:['#13245a','#2f4c8a','#6f8fc8'],body:'#18213d',top:'#eef4ff',glow:'rgba(220,235,255,.14)',side:'rgba(220,235,255,.2)',oneway:'#dcebff'},
  music:{bpm:116,meter:3,dur:1.5,shimmer:.04,
    mel:[76,72,69,77,72,69,74,77,81,80,76,71,81,76,72,77,81,84,83,80,76,81,76,69],
    ch:[[57,60,64],[57,60,65],[57,62,65],[56,59,64],[57,60,64],[57,60,65],[56,59,64],[57,60,64]],
    bass:[45,41,38,40,45,41,40,45]},
  build({fill,item,en}){
    fill(0,20,10,11);
    fill(5,8,7,7,2);for(let i=5;i<=8;i++)item(i,6);
    fill(13,14,8,9);item(13,7);item(14,7);
    fill(21,34,10,11,3);for(let i=23;i<=33;i+=2)item(i,9);en(28,10);
    item(36,7);item(37,7);
    fill(39,60,10,11);fill(44,45,8,9);fill(50,53,7,9);
    fill(41,43,5,5,2);for(let i=41;i<=43;i++)item(i,4);
    item(51,6);item(52,6);en(47,10);en(57,10);
    fill(63,64,8,8,2);fill(67,68,6,6,2);item(63,7);item(64,7);item(67,5);item(68,5);
    fill(71,95,10,11,3);fill(78,79,8,9);fill(86,87,7,9);
    item(78,7);item(79,7);item(86,6);item(87,6);for(let i=81;i<=84;i++)item(i,9);
    en(75,10);en(85,10);
    fill(97,98,8,8);item(97,7);item(98,7);
    fill(100,125,10,11);fill(106,114,8,9);fill(108,111,5,5,2);for(let i=108;i<=111;i++)item(i,4);
    en(103,10);en(110,8);en(120,10);
    fill(128,129,7,7,2);item(128,6);item(129,6);
    fill(132,171,10,11);fill(140,141,9,9,3);fill(142,143,8,9,3);fill(144,145,7,9,3);
    item(141,8);item(143,7);item(145,6);
    en(150,10);en(158,10);
  }
},
{
  friends:[[5,'fairy','Bounce on the gumdrops to reach the sweets up high!'],[137,'fairy','The Mouse King is hiding in the Sugar Plum Palace. Onward!']],act:'Act III',name:'Land of Sweets',blurb:'Gumdrops · Sugarplums · Mice',num:'linear-gradient(135deg,#ffd36e,#ff7fb0)',
  item:'candy',itemName:'Sugarplums',enemy:'mouse',goal:164,cps:[2,29,67,106,132],
  theme:{kind:'sweets',bg:['#3a1a5a','#8a3a7a','#f08aa8'],body:'#4a2533',top:'#ffd6e6',glow:'rgba(255,214,230,.14)',side:'rgba(255,214,230,.25)',oneway:'#fff0b8'},
  music:{bpm:120,meter:4,dur:.4,
    mel:[72,76,79,76,74,79,83,79,76,81,84,81,77,81,84,81,79,76,72,76,74,71,67,71,69,72,77,74,72,79,84,0],
    ch:[[60,64,67],[59,62,67],[57,60,64],[57,60,65],[60,64,67],[59,62,67],[57,60,65],[60,64,67]],
    bass:[48,43,45,41,48,43,41,48]},
  build({fill,item,en}){
    fill(0,22,10,11);for(let i=3;i<=5;i++)item(i,9);
    fill(9,9,9,9,4);fill(6,12,5,5,2);for(let i=7;i<=11;i++)item(i,4);item(6,8);item(12,8);
    en(17,10);
    fill(25,26,11,11,4);item(25,7);item(26,7);
    fill(29,60,10,11);fill(33,36,7,7,2);for(let i=33;i<=36;i++)item(i,6);
    fill(42,42,9,9,4);fill(45,46,5,9);item(45,4);item(46,4);
    en(39,10);en(52,10);
    fill(63,64,8,8,2);item(63,7);item(64,7);
    fill(67,100,10,11);fill(72,72,9,9,4);fill(70,78,3,3,2);for(let i=71;i<=77;i+=2)item(i,2);
    fill(85,86,8,9);fill(90,91,7,9);item(85,7);item(86,7);item(90,6);item(91,6);
    en(76,10);en(88,10);
    fill(103,103,11,11,4);item(103,6);
    fill(106,171,10,11);fill(112,113,8,9);item(110,9);item(112,7);item(113,7);item(115,9);
    en(118,10);en(124,10);
    item(128,9);item(130,9);
    fill(138,140,8,8,2);for(let i=138;i<=140;i++)item(i,7);fill(146,146,9,9,4);fill(149,152,5,5,2);for(let i=149;i<=152;i++)item(i,4);en(144,10);
  }
},
{
  act:'Act IV',name:'Hot Chocolate',blurb:'Truffles · Wafer rafts · Chocolate river',num:'linear-gradient(135deg,#e9b77d,#8a4a2c)',
  item:'truffle',itemName:'Truffles',enemy:'mouse',goal:164,cps:[2,35,75,123],
  theme:{kind:'choco',bg:['#2a140e','#5a2a1c','#a8603a'],body:'#2b160f',top:'#e9b77d',glow:'rgba(233,183,125,.14)',side:'rgba(233,183,125,.25)',oneway:'#f3d3a1',liquid:'#4a2214',liquidTop:'#8a4a2c'},
  music:{bpm:138,meter:3,dur:.55,wave:'triangle',shimmer:.015,
    mel:[74,77,76,74,72,76,74,70,74,73,76,69,81,77,74,79,74,70,73,76,79,77,74,74],
    ch:[[57,62,65],[55,60,64],[53,58,62],[57,61,64],[57,62,65],[55,58,62],[57,61,64],[57,62,65]],
    bass:[50,48,46,45,50,43,45,50]},
  build({fill,item,en,mover}){
    fill(0,18,10,11);for(let i=4;i<=7;i++)item(i,9);
    fill(10,12,7,7,2);for(let i=10;i<=12;i++)item(i,6);en(14,10);
    mover(20,9,3,'h',8,4);for(const i of [22,25,28,31])item(i,7);
    fill(35,58,10,11);fill(43,44,8,9);fill(51,54,6,6,2);for(let i=51;i<=54;i++)item(i,5);
    en(40,10);en(50,10);item(43,7);item(44,7);
    mover(61,8,2,'v',3,3);mover(65,6,2,'h',4,3.5);mover(71,8,2,'v',3,3.4);
    item(61,4);item(62,4);for(let i=66;i<=69;i++)item(i,4);item(71,4);item(72,4);
    fill(75,100,10,11);fill(82,83,8,9);fill(88,90,7,9);
    item(82,7);item(83,7);item(88,6);item(89,6);item(90,6);
    en(79,10);en(86,10);en(94,10);
    mover(102,9,3,'h',16,7);for(const i of [105,109,113,117])item(i,7);fill(110,112,10,11);
    fill(123,171,10,11);fill(130,131,9,9);fill(132,133,8,9);fill(134,138,7,9);
    item(131,8);item(133,7);item(135,6);item(137,6);
    en(142,10);en(152,10);
  }
},
{
  friends:[[126,'fairy','The Mouse King! The palace floor is slippery ice — careful!']],act:'Act V',name:'Sugar Plum Palace',blurb:'Crumbling glass · The Mouse King',num:'linear-gradient(135deg,#e9e2ff,#8f7bff)',
  item:'crystal',itemName:'Crystals',enemy:'mouse',goal:167,cps:[2,29,67,116],arena:[134,168],
  theme:{kind:'palace',bg:['#1a1a4a','#3d3a8a','#8a78d0'],body:'#1c1a44',top:'#e9e2ff',glow:'rgba(233,226,255,.14)',side:'rgba(233,226,255,.22)',oneway:'#cfe0ff'},
  music:{bpm:104,meter:4,dur:.7,shimmer:.06,
    mel:[83,79,76,79,81,76,72,76,78,81,83,78,79,76,71,0,79,84,83,79,76,81,79,76,75,78,83,78,76,71,64,0],
    ch:[[55,59,64],[57,60,64],[54,59,63],[55,59,64],[55,60,64],[57,60,64],[54,59,63],[55,59,64]],
    bass:[52,57,59,52,60,57,59,52]},
  build({fill,item,en,mover,king}){
    fill(0,16,10,11);for(let i=3;i<=6;i++)item(i,9);
    fill(8,10,7,7,2);for(let i=8;i<=10;i++)item(i,6);en(13,10);
    fill(17,28,10,10,5);for(let i=18;i<=27;i+=3)item(i,8);
    fill(29,52,10,11);fill(35,36,8,9);fill(41,44,6,6,5);for(let i=41;i<=44;i++)item(i,5);
    item(35,7);item(36,7);en(39,10);en(48,10);
    fill(55,56,8,8,5);fill(59,60,6,6,5);fill(63,64,8,8,5);fill(53,66,11,11);
    item(55,7);item(56,7);item(59,5);item(60,5);item(63,7);item(64,7);
    fill(67,95,10,11);mover(72,9,2,'v',5,4);fill(74,80,3,3,2);for(let i=75;i<=79;i++)item(i,2);
    fill(85,86,8,9);fill(87,88,6,9);item(85,7);item(87,5);item(88,5);
    en(78,10);en(91,10);
    mover(97,8,2,'h',5,3);fill(105,106,7,7,5);mover(108,8,2,'h',5,3.2);
    item(99,6);item(101,6);item(105,6);item(106,6);item(110,6);item(112,6);
    fill(116,133,10,11);fill(134,171,10,11,3);fill(122,124,8,8,5);
    item(123,7);item(127,9);item(129,9);item(131,9);en(120,10);
    king(156);
  }
}
  ,{
  friends:[[43,'swan','That wall is tall! Leap, then leap again to flap your wings.']],ballet:'swan',act:'Act I',name:'The Lakeside',blurb:'Feathers · Lily pads · Owls',num:'linear-gradient(135deg,#eaf2ff,#7fa6d6)',
  item:'feather',itemName:'Feathers',enemy:'owl',goal:164,cps:[2,28,61,104],hint:'Tap Leap again in the air to flap your wings',
  theme:{kind:'lake',bg:['#102450','#2a4f84','#7aa0d0'],body:'#16223a',top:'#dfe9f5',glow:'rgba(223,233,245,.14)',side:'rgba(223,233,245,.22)',oneway:'#c9d8ea',liquid:'#0d2440',liquidTop:'#7fa6d6',liquidY:420,glint:'rgba(220,235,255,.2)'},
  music:{bpm:76,meter:4,dur:1.7,wave:'triangle',shimmer:.015,arp:true,
    mel:[78,0,0,[71,73], [74,76],78,0,74, 78,0,74,0, 78,0,[71,74],71, 67,74,71,0, 0,0,[71,73],[74,76], 78,0,0,[74,76], 71,0,0,0],
    ch:[[59,62,66],[59,62,66],[59,62,67],[59,62,66],[59,64,67],[59,62,66],[58,61,66],[59,62,66]],
    bass:[47,47,43,47,40,47,42,47]},
  build({fill,item,en,pad}){
    fill(0,16,10,11);for(let i=4;i<=7;i++)item(i,9);
    fill(9,11,7,7,2);for(let i=9;i<=11;i++)item(i,6);
    pad(18);pad(21);pad(24);item(18,8);item(21,8);item(24,8);
    fill(28,48,10,11);fill(33,34,8,9);item(33,7);item(34,7);
    fill(36,39,5,5,2);for(let i=36;i<=39;i++)item(i,4);
    en(38,7);en(43,6);
    fill(46,48,6,9);item(47,4);
    pad(51);pad(54);pad(57);item(51,8);item(54,7);item(57,8);en(55,5);
    fill(61,85,10,11);fill(66,67,8,9);fill(72,75,7,9);
    item(66,7);item(67,7);for(let i=72;i<=75;i++)item(i,6);en(69,6);en(80,6);
    pad(87);pad(90);fill(93,94,7,7,2);item(93,6);item(94,6);pad(97);pad(100);
    item(87,8);item(90,8);item(97,8);item(100,8);
    fill(104,171,10,11);fill(112,113,8,9);fill(118,121,5,5,2);for(let i=118;i<=121;i++)item(i,4);
    fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);item(141,8);item(143,7);item(145,6);
    en(116,7);en(126,6);en(134,7);en(150,6);
  }
},{
  ballet:'swan',act:'Act II',name:'Enchanted Forest',blurb:'Rising mist · Thorns · Owls',num:'linear-gradient(135deg,#cfe8d4,#3f8a5c)',
  item:'feather',itemName:'Feathers',enemy:'owl',goal:164,cps:[2,31,67,111],hint:'Ride the rising mist — and mind the thorns',
  theme:{kind:'forest',bg:['#0c2418','#1d4a30','#4a8a5c'],body:'#121e18',top:'#cfe8d4',glow:'rgba(207,232,212,.13)',side:'rgba(207,232,212,.2)',oneway:'#bfe3c8'},
  music:{bpm:126,meter:3,dur:1.2,shimmer:.03,
    mel:[74,71,66, 76,71,67, 73,78,76, 74,71,0, 79,74,71, 76,79,83, 81,78,73, 71,74,78],
    ch:[[59,62,66],[59,64,67],[58,61,66],[59,62,66],[59,62,67],[59,64,67],[58,61,66],[59,62,66]],
    bass:[47,52,54,47,55,52,54,47]},
  build({fill,item,en,draft}){
    fill(0,22,10,11);for(let i=3;i<=6;i++)item(i,9);
    fill(10,11,9,9,6);item(10,7);item(11,7);fill(15,17,7,7,2);for(let i=15;i<=17;i++)item(i,6);
    draft(24,28,110);for(let r=4;r<=7;r++)item(26,r);item(24,5);item(28,5);
    fill(31,55,10,11);fill(36,38,9,9,6);en(41,6);
    draft(42,43,150);fill(45,48,5,9);item(46,4);item(47,4);
    fill(51,52,9,9,6);item(51,7);item(52,7);
    draft(58,64,130);fill(61,63,4,4,2);for(let i=61;i<=63;i++)item(i,3);
    fill(67,95,10,11);fill(74,80,8,9);fill(77,77,7,7,6);item(75,7);item(79,7);
    en(72,6);en(85,6);en(91,5);fill(88,89,9,9,6);
    draft(98,99,160);fill(101,103,5,5,2);for(let i=101;i<=103;i++)item(i,4);draft(105,106,160);
    fill(111,171,10,11);fill(118,119,9,9,6);fill(130,131,9,9,6);
    draft(124,125,90);for(let r=3;r<=6;r++)item(124,r);
    en(127,6);en(138,6);en(146,5);
    fill(150,151,9,9);fill(152,153,8,9);item(151,8);item(153,7);
  }
},{
  ballet:'swan',act:'Act III',name:"Rothbart's Ball",blurb:'Wing gusts · Von Rothbart',num:'linear-gradient(135deg,#c9a6ff,#3a1e4f)',
  item:'feather',itemName:'Feathers',enemy:'owl',goal:167,cps:[2,35,77,119],arena:[126,170],hint:'Von Rothbart\u2019s wings stir up gusts — watch the arrows!',wind:true,
  theme:{kind:'castle',bg:['#1a0c2a','#3a1a50','#7a3a6a'],body:'#140c1c',top:'#b9a3d6',glow:'rgba(185,163,214,.14)',side:'rgba(185,163,214,.22)',oneway:'#d8c8f0'},
  music:{bpm:132,meter:4,dur:.45,
    mel:[[76,79],[83,79],[76,79],[83,79], [84,79],[76,79],84,0, [81,76],[72,76],[81,84],83, 81,[78,75],71,0,
         [76,79],[83,79],[88,86],[84,83], 84,[83,81],79,[76,79], [78,81],[83,81],[78,75],71, 76,0,64,0],
    ch:[[55,59,64],[55,60,64],[57,60,64],[54,59,63],[55,59,64],[55,60,64],[54,59,63],[55,59,64]],
    bass:[52,48,45,47,52,48,47,52]},
  build({fill,item,en,mover,rothbart}){
    fill(0,20,10,11);for(let i=4;i<=8;i++)item(i,9);en(14,6);
    fill(23,24,9,9,2);fill(27,28,8,8,2);fill(31,32,9,9,2);item(23,8);item(24,8);item(27,7);item(28,7);item(31,8);item(32,8);
    fill(35,60,10,11);fill(40,41,8,9);fill(47,50,6,6,2);for(let i=47;i<=50;i++)item(i,5);en(45,6);en(53,5);
    fill(63,64,8,8,2);fill(67,68,6,6,2);fill(71,72,8,8,2);fill(74,75,9,9,2);
    item(63,7);item(67,5);item(68,5);item(71,7);item(75,8);
    fill(77,104,10,11);fill(84,85,8,9);fill(90,93,7,9);item(84,7);item(85,7);for(let i=90;i<=93;i++)item(i,6);
    en(88,5);en(97,6);en(101,5);
    fill(107,108,9,9,2);mover(110,8,2,'h',4,3.4);fill(116,117,9,9,2);item(107,8);item(111,7);item(112,7);item(115,8);
    fill(119,171,10,11);item(121,9);item(123,9);
    rothbart(150);
  }
},{
  ballet:'swan',act:'Act IV',name:'The Storm',blurb:'Wind gusts · Lightning · Lily pads',num:'linear-gradient(135deg,#b8c8e0,#3d4f6a)',
  item:'feather',itemName:'Feathers',enemy:'owl',goal:164,cps:[2,29,65,107],hint:'Watch the arrows — gusts of wind will push you!',wind:true,lightning:true,
  theme:{kind:'storm',bg:['#0e1626','#24344e','#4d6080'],body:'#18202e',top:'#c8d4e6',glow:'rgba(200,212,230,.13)',side:'rgba(200,212,230,.2)',oneway:'#b8c8e0',liquid:'#0e1e34',liquidTop:'#8aa4c8',liquidY:420,glint:'rgba(200,220,255,.18)',wave:7},
  music:{bpm:144,meter:4,dur:.42,
    mel:[[83,81],[78,81],[83,81],[78,74], [79,78],[74,71],79,[78,79], [76,79],[83,79],[76,74],71, 78,[73,76],78,0,
         [86,83],[78,83],[86,83],[78,74], [79,83],86,[84,83],79, [78,81],[85,81],[78,76],73, 78,0,66,0],
    ch:[[59,62,66],[59,62,67],[59,64,67],[58,61,66],[59,62,66],[59,62,67],[58,61,66],[58,61,66]],
    bass:[47,43,52,54,47,43,54,54]},
  build({fill,item,en,pad}){
    fill(0,18,10,11);for(let i=3;i<=6;i++)item(i,9);fill(8,10,7,7,2);for(let i=8;i<=10;i++)item(i,6);
    pad(20);pad(23);pad(26);item(20,8);item(23,8);item(26,8);
    fill(29,50,10,11);fill(34,35,8,9);item(34,7);item(35,7);fill(43,46,5,5,2);for(let i=43;i<=46;i++)item(i,4);
    en(36,5);en(40,6);en(48,5);
    fill(53,54,8,8,2);pad(57);fill(60,61,7,7,2);item(53,7);item(54,7);item(57,8);item(60,6);item(61,6);
    fill(65,90,10,11);fill(70,72,7,9);fill(80,81,8,9);for(let i=70;i<=72;i++)item(i,6);item(80,7);item(81,7);
    en(68,6);en(74,5);en(77,5);en(86,6);
    pad(93);pad(96);fill(99,100,6,6,2);pad(103);item(93,8);item(96,8);item(99,5);item(100,5);item(103,8);
    fill(107,171,10,11);fill(114,115,8,9);fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);
    item(114,7);item(115,7);item(141,8);item(143,7);item(145,6);for(let i=125;i<=130;i++)item(i,9);
    en(119,6);en(128,5);en(136,6);en(152,5);
  }
},{
  ballet:'swan',act:'Act V',name:'Sunrise',blurb:'Golden feathers · Flying swans · Finale',num:'linear-gradient(135deg,#ffe27a,#ff8fae)',
  item:'gfeather',itemName:'Golden feathers',enemy:'owl',goal:164,cps:[2,30,74,124],hint:'Hop on the flying swans to cross the sky',
  finale:'Odette and Siegfried dance into the sunrise — the spell is broken forever!',
  theme:{kind:'dawn',bg:['#3a3a80','#c8708e','#ffd29a'],body:'#fbe3ee',top:'#ffffff',glow:'rgba(255,255,255,.35)',side:'rgba(255,255,255,.5)',oneway:'#ffffff'},
  music:{bpm:120,meter:3,dur:1.3,shimmer:.04,
    mel:[74,78,81, 81,79,76, 78,74,71, 79,83,86, 86,81,78, 79,83,79, 76,73,76, 74,0,0],
    ch:[[57,62,66],[57,61,64],[59,62,66],[59,62,67],[57,62,66],[59,62,67],[57,61,64],[57,62,66]],
    bass:[50,45,47,43,50,43,45,50]},
  build({fill,item,en,mover}){
    fill(0,16,10,11);for(let i=3;i<=6;i++)item(i,9);fill(7,9,7,7,2);for(let i=7;i<=9;i++)item(i,6);
    mover(18,9,3,'h',7,4.5);for(const i of [19,22,25])item(i,7);
    fill(30,48,10,11);fill(36,38,8,9);item(36,7);item(37,7);item(38,7);en(33,5);en(42,6);
    mover(50,8,3,'v',4,4);fill(54,60,4,4,2);for(let i=54;i<=60;i++)item(i,3);
    mover(62,6,3,'h',8,5);for(const i of [64,67,70])item(i,4);
    fill(74,100,10,11);fill(80,81,8,9);fill(88,91,6,6,2);item(80,7);item(81,7);for(let i=88;i<=91;i++)item(i,5);
    en(78,5);en(84,6);en(95,5);
    mover(102,9,3,'h',6,4);mover(113,7,3,'h',6,4.4);item(105,7);item(109,7);item(116,5);item(120,5);
    fill(124,171,10,11);fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);item(141,8);item(143,7);item(145,6);
    en(135,6);en(150,5);
  }
},{
  friends:[[18,'fairy','Jump onto the bubble and it will carry you up!']],ballet:'beauty',act:'Act I',name:'The Christening',blurb:'A gentle start · Fairy gifts · Bubbles',num:'linear-gradient(135deg,#ffd6f0,#b48cff)',
  item:'gift',itemName:'Fairy gifts',enemy:'raven',goal:134,cps:[2,29,67,111],hint:'Don’t touch the spindles! Ride the fairy bubbles',
  theme:{kind:'garden',bg:['#3f7fd0','#8cc4f0','#ffe8c8'],body:'#5a3f30',top:'#8ee09a',glow:'rgba(142,224,154,.18)',side:'rgba(142,224,154,.3)',oneway:'#ffe0f0'},
  music:{bpm:132,meter:3,dur:1.2,shimmer:.04,
    mel:[67,72,76, 74,71,67, 69,72,77, 76,72,67, 69,72,76, 77,74,69, 71,74,79, 72,0,0],
    ch:[[60,64,67],[59,62,67],[57,60,65],[60,64,67],[57,60,64],[57,60,65],[59,62,67],[60,64,67]],
    bass:[48,43,41,48,45,41,43,48]},
  build({fill,item,en,mover}){
    fill(0,20,10,11);for(let i=3;i<=6;i++)item(i,9);fill(8,11,7,7,2);for(let i=8;i<=11;i++)item(i,6);
    fill(15,15,9,9,6);item(15,7);
    mover(22,9,2,'v',4,3.5);fill(25,27,5,5,2);for(let i=25;i<=27;i++)item(i,4);item(22,4);
    fill(29,55,10,11);fill(35,35,9,9,6);fill(40,41,8,9);fill(44,47,6,6,2);for(let i=44;i<=47;i++)item(i,5);
    item(40,7);item(41,7);en(38,6);en(50,5);fill(52,52,9,9,6);
    mover(57,8,2,'h',6,4);for(const i of [58,61,64])item(i,6);
    fill(67,95,10,11);fill(72,72,9,9,6);fill(77,79,7,9);for(let i=77;i<=79;i++)item(i,6);
    en(75,6);en(85,5);fill(88,88,9,9,6);fill(90,93,6,6,2);for(let i=90;i<=93;i++)item(i,5);
    mover(97,9,2,'v',5,3.5);fill(100,104,4,4,2);for(let i=100;i<=104;i++)item(i,3);mover(106,7,2,'h',3,3);
    fill(111,171,10,11);fill(118,118,9,9,6);fill(125,126,8,9);item(125,7);item(126,7);
    en(122,6);
  }
},{
  ballet:'beauty',act:'Act II',name:'The Thorn Forest',blurb:'Roses · Withering vines · Thorns',num:'linear-gradient(135deg,#ff9ec0,#5a2f5a)',
  item:'rose',itemName:'Roses',enemy:'raven',goal:164,cps:[2,31,65,107],hint:'Vines wither under your feet — keep dancing!',
  theme:{kind:'thorn',bg:['#160a26','#2e1840','#5a2f5a'],body:'#1c1226',top:'#b8e0a0',glow:'rgba(184,224,160,.12)',side:'rgba(184,224,160,.2)',oneway:'#ffc6dc'},
  music:{bpm:108,meter:3,dur:1.4,shimmer:.04,
    mel:[74,69,65, 70,74,77, 79,74,70, 73,76,81, 77,74,69, 70,74,79, 76,73,69, 74,0,62],
    ch:[[57,62,65],[58,62,65],[55,58,62],[57,61,64],[57,62,65],[55,58,62],[57,61,64],[57,62,65]],
    bass:[50,46,43,45,50,43,45,50]},
  build({fill,item,en,draft}){
    fill(0,18,10,11);for(let i=3;i<=6;i++)item(i,9);fill(9,10,9,9,6);item(9,7);item(10,7);
    fill(19,30,10,10,5);for(let i=20;i<=29;i+=3)item(i,8);
    fill(31,52,10,11);fill(36,37,9,9,6);fill(41,44,6,6,5);for(let i=41;i<=44;i++)item(i,5);en(39,6);
    fill(47,48,8,9);item(47,7);item(48,7);en(50,5);
    draft(55,57,140);fill(60,62,4,4,2);for(let i=60;i<=62;i++)item(i,3);for(let r=5;r<=7;r++)item(56,r);
    fill(65,92,10,11);fill(70,71,9,9,6);fill(75,78,7,9);for(let i=75;i<=78;i++)item(i,6);en(73,6);en(84,5);fill(86,87,9,9,6);
    fill(95,96,8,8,5);fill(99,100,6,6,5);fill(103,104,8,8,5);item(95,7);item(96,7);item(99,5);item(100,5);item(103,7);item(104,7);
    fill(107,171,10,11);fill(114,115,9,9,6);draft(122,123,100);for(let r=3;r<=6;r++)item(122,r);fill(130,131,9,9,6);
    fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);item(141,8);item(143,7);item(145,6);
    en(118,6);en(135,5);en(148,6);
  }
},{
  ballet:'beauty',act:'Act III',name:"Carabosse's Tower",blurb:'Moving stones · Carabosse',num:'linear-gradient(135deg,#9fe0a0,#2e1f48)',
  item:'crystal',itemName:'Gems',enemy:'raven',goal:167,cps:[2,35,77,119],arena:[126,170],hint:'Reach the top of the tower and break the curse',
  finale:'The curse is lifted — Aurora wakes up and the whole kingdom wakes with her!',
  theme:{kind:'tower',bg:['#120c1c','#24183a','#3e2a50'],body:'#1e1828',top:'#c8bcd8',glow:'rgba(200,188,216,.12)',side:'rgba(200,188,216,.2)',oneway:'#d8d0e8'},
  music:{bpm:138,meter:4,dur:.42,
    mel:[[76,83],[79,83],[76,83],[79,83], [77,84],[81,84],77,0, [74,81],[78,81],[83,81],78, [75,78],[71,75],78,0,
         [79,86],[83,86],[79,86],[83,86], [81,84],[77,84],81,0, [78,83],[75,78],[71,75],[78,83], 76,0,64,0],
    ch:[[55,59,64],[57,60,65],[57,62,66],[54,59,63],[55,59,64],[57,60,64],[54,59,63],[55,59,64]],
    bass:[52,53,50,47,52,45,47,52]},
  build({fill,item,en,mover,carabosse}){
    fill(0,20,10,11);for(let i=4;i<=8;i++)item(i,9);en(13,6);
    mover(22,9,2,'h',4,3.2);fill(29,30,7,7,5);item(23,7);item(26,7);item(29,6);item(30,6);
    fill(35,60,10,11);fill(40,41,8,9);fill(46,49,6,6,2);for(let i=46;i<=49;i++)item(i,5);item(40,7);item(41,7);
    en(44,6);en(53,5);fill(56,56,9,9,6);
    mover(62,8,2,'v',4,3.4);fill(66,68,4,4,5);for(let i=66;i<=68;i++)item(i,3);mover(70,6,2,'h',4,3.6);
    fill(77,104,10,11);fill(84,85,8,9);fill(90,93,7,9);item(84,7);item(85,7);for(let i=90;i<=93;i++)item(i,6);en(88,5);en(97,6);
    fill(107,108,9,9,5);fill(111,112,8,8,5);fill(115,116,9,9,5);item(107,8);item(111,7);item(112,7);item(115,8);
    fill(119,171,10,11);item(121,9);item(123,9);
    carabosse(150);
  }
},{
  friends:[[5,'mouse','Squeak! Bounce on the cushion to reach the high shelf!']],ballet:'cinder',act:'Act I',name:'The Kitchen',blurb:'Sparkles · Cushions · Brooms',num:'linear-gradient(135deg,#ffd9a0,#c0703a)',
  item:'star',itemName:'Sparkles',enemy:'broom',goal:164,cps:[2,29,67,106],hint:'Bounce on the cushions to reach high shelves',
  theme:{kind:'kitchen',bg:['#2a1810','#4e2c1a','#8a5430'],body:'#3a2418',top:'#f2c890',glow:'rgba(242,200,144,.14)',side:'rgba(242,200,144,.24)',oneway:'#e8b880'},
  music:{bpm:112,meter:4,dur:.5,
    mel:[72,77,81,77, 79,76,72,76, 74,77,81,84, 82,81,79,77, 81,77,72,77, 79,82,79,74, 76,79,84,79, 77,0,65,0],
    ch:[[57,60,65],[55,60,64],[57,62,65],[58,62,65],[57,60,65],[55,58,62],[55,60,64],[57,60,65]],
    bass:[53,48,50,46,53,43,48,53]},
  build({fill,item,en}){
    fill(0,22,10,11);for(let i=3;i<=5;i++)item(i,9);fill(9,9,9,9,4);fill(6,12,5,5,2);for(let i=7;i<=11;i++)item(i,4);item(6,8);item(12,8);en(17,10);
    fill(25,26,11,11,4);item(25,7);item(26,7);
    fill(29,60,10,11);fill(33,36,7,7,2);for(let i=33;i<=36;i++)item(i,6);fill(42,42,9,9,4);fill(45,46,5,9);item(45,4);item(46,4);
    en(39,10);en(50,10);en(55,10);
    fill(63,64,8,8,2);item(63,7);item(64,7);
    fill(67,100,10,11);fill(72,72,9,9,4);fill(70,78,3,3,2);for(let i=71;i<=77;i+=2)item(i,2);
    fill(85,86,8,9);fill(90,91,7,9);item(85,7);item(86,7);item(90,6);item(91,6);en(76,10);en(82,10);en(88,10);en(95,10);
    fill(103,103,11,11,4);item(103,6);
    fill(106,171,10,11);fill(112,113,8,9);item(110,9);item(112,7);item(113,7);item(115,9);en(118,10);en(124,10);
    fill(135,135,9,9,4);fill(132,138,4,4,2);for(let i=132;i<=138;i+=2)item(i,3);
    fill(145,146,9,9);fill(147,148,8,9);fill(149,150,7,9);item(146,8);item(148,7);item(150,6);en(155,10);
  }
},{
  friends:[[16,'mouse','Wait for the carriage to come close, then hop on!']],ballet:'cinder',act:'Act II',name:'The Pumpkin Carriage',blurb:'Carriage rides · Bouncy pumpkins',num:'linear-gradient(135deg,#ffb066,#4a5aa0)',
  item:'star',itemName:'Sparkles',enemy:'broom',goal:164,cps:[2,35,75,123],hint:'Hop on the pumpkin carriages!',
  theme:{kind:'road',bg:['#0e1640','#22306a','#4a5aa0'],body:'#1e2a3e',top:'#a8d890',glow:'rgba(168,216,144,.14)',side:'rgba(168,216,144,.2)',oneway:'#f0d8a8'},
  music:{bpm:144,meter:3,dur:.9,shimmer:.03,
    mel:[79,83,86, 86,81,78, 79,83,88, 88,84,79, 83,86,91, 88,84,81, 78,81,86, 79,0,0],
    ch:[[55,59,62],[57,62,66],[55,59,64],[55,60,64],[55,59,62],[57,60,64],[57,62,66],[55,59,62]],
    bass:[43,50,52,48,43,45,50,43]},
  build({fill,item,en,mover}){
    fill(0,18,10,11);for(let i=4;i<=7;i++)item(i,9);fill(10,12,7,7,2);for(let i=10;i<=12;i++)item(i,6);en(14,10);
    mover(20,9,3,'h',8,4);for(const i of [22,25,28,31])item(i,7);
    fill(35,58,10,11);fill(40,40,9,9,4);fill(42,45,4,4,2);for(let i=42;i<=45;i++)item(i,3);fill(50,51,8,9);item(50,7);item(51,7);
    en(48,10);en(54,10);
    mover(61,8,2,'v',3,3);mover(65,6,2,'h',4,3.5);mover(71,8,2,'v',3,3.4);item(61,4);item(62,4);for(let i=66;i<=69;i++)item(i,4);item(71,4);item(72,4);
    fill(75,100,10,11);fill(82,82,9,9,4);fill(84,86,5,5,2);for(let i=84;i<=86;i++)item(i,4);en(79,10);en(90,10);en(96,10);
    mover(102,9,3,'h',16,7);for(const i of [105,109,113,117])item(i,7);
    fill(123,171,10,11);fill(130,130,9,9,4);fill(133,138,4,4,2);for(let i=133;i<=138;i++)item(i,3);
    en(142,10);en(147,10);en(152,10);
  }
},{
  ballet:'cinder',act:'Act III',name:'Midnight Ball',blurb:'Glass slippers · Beat the clock',num:'linear-gradient(135deg,#cfe8ff,#5a7ad0)',
  friends:[[18,'mouse','Jump when the floor lights up!'],[124,'mouse','Oh no, it\u2019s the wicked stepmother! Jump on her hat!']],item:'slipper',itemName:'Slippers',enemy:'broom',goal:167,cps:[2,35,77,119],arena:[127,170],timer:170,hint:'Hurry — reach the prince before the clock strikes twelve!',
  finale:'The glass slipper fits — Cinderella lives happily ever after!',
  theme:{kind:'ballroom',bg:['#1a1040','#3a2a7a','#7a5ab0'],body:'#221a44',top:'#ffe6a8',glow:'rgba(255,230,168,.14)',side:'rgba(255,230,168,.24)',oneway:'#ffe6a8'},
  music:{bpm:126,meter:3,dur:1.2,shimmer:.05,
    mel:[78,81,86, 86,83,78, 79,83,86, 85,81,76, 74,78,81, 83,79,74, 76,81,85, 86,0,0],
    ch:[[57,62,66],[59,62,66],[59,62,67],[57,61,64],[57,62,66],[59,62,67],[57,61,64],[57,62,66]],
    bass:[50,47,43,45,50,43,45,50]},
  build({fill,item,en,stepmother}){
    fill(0,20,10,11);for(let i=4;i<=8;i++)item(i,9);en(14,10);
    fill(23,24,9,9,7);fill(27,28,8,8,8);fill(31,32,9,9,7);item(23,8);item(24,8);item(27,7);item(28,7);item(31,8);item(32,8);
    fill(35,60,10,11);fill(40,41,8,9);fill(47,50,6,6,2);for(let i=47;i<=50;i++)item(i,5);en(45,10);en(55,10);
    fill(63,64,8,8,7);fill(67,68,6,6,8);fill(71,72,8,8,7);fill(74,75,9,9,8);item(63,7);item(67,5);item(68,5);item(71,7);item(75,8);
    fill(77,104,10,11);fill(84,85,8,9);fill(90,93,7,9);item(84,7);item(85,7);for(let i=90;i<=93;i++)item(i,6);en(88,10);en(99,10);
    fill(107,108,9,9,8);fill(111,112,8,8,7);fill(115,116,9,9,8);item(107,8);item(111,7);item(112,7);item(115,8);
    fill(119,171,10,11);for(let i=120;i<=126;i+=2)item(i,9);
    stepmother(150);
  }
},{
  ballet:'peter',act:'Act I',name:'The Meadow',blurb:'A gentle stroll · Daisies · Pond',num:'linear-gradient(135deg,#bff0a8,#3f9a5c)',
  friends:[[6,'bird','Tweet! Hop across the lily pads — don’t stay too long!'],[32,'bird','Bounce on the haystack to reach the high flowers!']],
  item:'daisy',itemName:'Daisies',enemy:'raven',goal:130,cps:[2,28,61,102],
  theme:{kind:'meadow',bg:['#4f9ae0','#9fd8f0','#e8ffd8'],body:'#5a3f30',top:'#8ee09a',glow:'rgba(142,224,154,.2)',side:'rgba(142,224,154,.3)',oneway:'#ffe9a8',liquid:'#3a8ac8',liquidTop:'#bfe6ff',liquidY:420,glint:'rgba(255,255,255,.35)'},
  music:{bpm:116,meter:4,dur:.45,
    mel:[72,76,79,76, 77,81,77,72, 74,79,83,79, 84,79,76,72, 76,81,84,81, 77,72,69,72, 74,77,79,83, 84,0,72,0],
    ch:[[60,64,67],[57,60,65],[59,62,67],[60,64,67],[57,60,64],[57,60,65],[59,62,67],[60,64,67]],bass:[48,41,43,48,45,41,43,48]},
  build({fill,item,en,pad}){
    fill(0,20,10,11);for(let i=3;i<=6;i++)item(i,9);fill(8,11,7,7,2);for(let i=8;i<=11;i++)item(i,6);en(14,6);
    pad(22);pad(25);item(22,8);item(25,8);
    fill(28,50,10,11);fill(34,34,9,9,4);fill(36,40,4,4,2);for(let i=36;i<=40;i++)item(i,3);en(45,6);
    pad(52);pad(55);pad(58);item(52,8);item(55,8);item(58,8);
    fill(61,90,10,11);fill(68,69,8,9);item(68,7);item(69,7);fill(74,74,9,9,4);fill(76,80,4,4,2);for(let i=76;i<=80;i++)item(i,3);en(72,6);en(85,5);
    pad(92);fill(95,96,7,7,2);pad(99);item(92,8);item(95,6);item(96,6);item(99,8);
    fill(102,171,10,11);fill(110,111,8,9);item(110,7);item(111,7);fill(118,118,9,9,4);fill(120,124,4,4,2);for(let i=120;i<=124;i++)item(i,3);
    en(114,6);
  }
},{
  ballet:'peter',act:'Act II',name:'The Wolf’s Wood',blurb:'Hollow logs · The Wolf',num:'linear-gradient(135deg,#a8c890,#2e4a3e)',
  friends:[[118,'bird','The wolf charges fast! Jump over him — stomp him when he stops to rest.']],
  item:'daisy',itemName:'Daisies',enemy:'raven',goal:167,cps:[2,31,67,105],arena:[122,170],
  theme:{kind:'wood',bg:['#1a2a3a','#2e4a3e','#6a7a5a'],body:'#1e2a20',top:'#a8c890',glow:'rgba(168,200,144,.14)',side:'rgba(168,200,144,.22)',oneway:'#c8b088'},
  music:{bpm:132,meter:4,dur:.4,
    mel:[[69,72],[76,72],69,0, [68,71],[76,71],68,0, [69,72],[76,81],[79,77],76, 75,76,71,0, [77,81],[84,81],77,0, [76,79],[84,79],76,0, [74,77],[81,77],[74,72],71, 68,0,64,0],
    ch:[[57,60,64],[56,59,64],[57,60,64],[56,59,64],[57,60,65],[55,60,64],[57,62,65],[56,59,64]],bass:[45,40,45,40,41,48,50,40]},
  build({fill,item,en,wolf}){
    fill(0,22,10,11);for(let i=3;i<=6;i++)item(i,9);fill(9,11,6,6,2);for(let i=9;i<=11;i++)item(i,5);en(16,6);
    fill(26,27,11,11,4);item(26,7);item(27,7);
    fill(31,58,10,11);fill(36,37,8,9);item(36,7);item(37,7);fill(42,45,6,6,2);for(let i=42;i<=45;i++)item(i,5);en(40,6);en(50,5);
    fill(54,54,9,9,4);fill(56,57,4,9);item(56,3);item(57,3);
    fill(61,62,8,8,2);fill(64,65,7,7,2);item(61,7);item(62,7);item(64,6);item(65,6);
    fill(67,95,10,11);fill(73,74,8,9);fill(80,83,7,9);item(73,7);item(74,7);for(let i=80;i<=83;i++)item(i,6);en(77,6);en(88,5);
    fill(98,99,8,8,2);fill(101,102,6,6,2);item(98,7);item(101,5);item(102,5);
    fill(105,171,10,11);for(let i=107;i<=113;i+=2)item(i,9);
    wolf(150);
  }
},{
  ballet:'coppelia',act:'Act I',name:'The Toy Workshop',blurb:'Wind-up keys · Conveyor belts',num:'linear-gradient(135deg,#ffd08a,#b8603a)',
  friends:[[16,'fairy','Moving belts carry you along — run with them, or against them!']],
  item:'key',itemName:'Wind-up keys',enemy:'soldier',goal:164,cps:[2,31,67,104],
  theme:{kind:'workshop',bg:['#3a2418','#6a4028','#b8805a'],body:'#3a2a20',top:'#e8c890',glow:'rgba(232,200,144,.14)',side:'rgba(232,200,144,.24)',oneway:'#d8b080'},
  music:{bpm:152,meter:3,dur:.7,shimmer:.03,
    mel:[74,78,81, 76,73,69, 78,81,86, 85,81,76, 79,83,86, 86,81,78, 76,79,85, 86,0,74],
    ch:[[57,62,66],[57,61,64],[57,62,66],[57,61,64],[59,62,67],[57,62,66],[57,61,64],[57,62,66]],bass:[50,45,50,45,43,50,45,50]},
  build({fill,item,en}){
    fill(0,18,10,11);for(let i=3;i<=6;i++)item(i,9);en(12,10);
    fill(19,30,10,11,9);for(let i=20;i<=29;i+=3)item(i,9);fill(24,26,7,7,2);for(let i=24;i<=26;i++)item(i,6);
    fill(31,33,10,11);fill(34,45,10,11,10);for(let i=35;i<=44;i+=3)item(i,9);en(40,10);
    fill(46,60,10,11);fill(50,51,8,9);item(50,7);item(51,7);fill(55,58,6,6,2);for(let i=55;i<=58;i++)item(i,5);en(53,10);
    fill(62,64,8,8,9);item(62,7);item(63,7);item(64,7);
    fill(67,95,10,11);fill(72,80,6,6,9);for(let i=72;i<=80;i+=2)item(i,5);en(75,10);en(86,10);fill(88,89,8,9);item(88,7);item(89,7);
    fill(97,99,8,8,10);fill(101,102,7,7,2);item(98,7);item(101,6);item(102,6);
    fill(104,171,10,11);fill(110,120,10,10,9);for(let i=111;i<=119;i+=2)item(i,9);en(124,10);en(132,10);
    fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);item(141,8);item(143,7);item(145,6);en(150,10);
  }
},{
  ballet:'coppelia',act:'Act II',name:'The Doll Attic',blurb:'Creaky boards · Dr. Coppélius',num:'linear-gradient(135deg,#d8b8a0,#4a3848)',
  friends:[[124,'fairy','Dr. Coppélius sends his wind-up toys after you — jump on his hat!']],
  item:'key',itemName:'Wind-up keys',enemy:'soldier',goal:167,cps:[2,33,71,113],arena:[124,170],
  theme:{kind:'attic',bg:['#140e1c','#2a1e30','#4a3848'],body:'#22181e',top:'#b89a7a',glow:'rgba(184,154,122,.14)',side:'rgba(184,154,122,.22)',oneway:'#c8a888'},
  music:{bpm:112,meter:3,dur:1.1,shimmer:.07,
    mel:[76,79,83, 78,75,71, 79,83,88, 84,81,76, 79,84,88, 87,83,78, 76,83,79, 76,0,0],
    ch:[[55,59,64],[54,59,63],[55,59,64],[57,60,64],[55,60,64],[54,59,63],[55,59,64],[55,59,64]],bass:[52,47,52,45,48,47,52,52]},
  build({fill,item,en,coppelius}){
    fill(0,20,10,11);for(let i=3;i<=7;i++)item(i,9);en(14,10);
    fill(21,32,10,10,5);for(let i=22;i<=31;i+=3)item(i,8);
    fill(33,56,10,11);fill(38,39,8,9);item(38,7);item(39,7);fill(44,47,6,6,5);for(let i=44;i<=47;i++)item(i,5);en(42,10);en(51,10);
    fill(59,60,8,8,5);fill(63,64,6,6,5);fill(67,68,8,8,5);item(59,7);item(60,7);item(63,5);item(64,5);item(67,7);item(68,7);
    fill(71,98,10,11);fill(78,79,8,9);fill(84,87,7,9);item(78,7);item(79,7);for(let i=84;i<=87;i++)item(i,6);en(76,10);en(92,10);
    fill(101,102,9,9,5);fill(105,106,8,8,5);fill(109,110,9,9,5);item(101,8);item(105,7);item(106,7);item(109,8);
    fill(113,171,10,11);for(let i=115;i<=121;i+=2)item(i,9);
    coppelius(152);
  }
},{
  ballet:'firebird',act:'Act I',name:'The Golden Garden',blurb:'Golden apples · Fire wind',num:'linear-gradient(135deg,#ffd08a,#d8402a)',
  friends:[[5,'fairy','The Firebird’s feather lets you leap twice — tap Leap again in the air!']],
  item:'apple',itemName:'Golden apples',enemy:'imp',goal:164,cps:[2,30,69,109],
  theme:{kind:'firegarden',bg:['#160818','#3a1028','#7a2a2a'],body:'#1e1218',top:'#ffb066',glow:'rgba(255,176,102,.16)',side:'rgba(255,176,102,.25)',oneway:'#ffd08a',draftCol:'255,170,90'},
  music:{bpm:92,meter:4,dur:1.5,wave:'triangle',shimmer:.02,arp:true,
    mel:[78,0,81,[80,78], 76,0,0,73, 74,0,78,[76,74], 73,0,0,0, 78,0,85,[83,81], 80,0,0,76, 78,81,80,76, 78,0,0,0],
    ch:[[57,61,66],[57,62,66],[59,62,66],[56,61,65],[57,61,66],[56,59,64],[57,62,66],[57,61,66]],bass:[42,38,47,49,42,40,38,42]},
  build({fill,item,en,draft}){
    fill(0,18,10,11);for(let i=3;i<=6;i++)item(i,9);fill(8,10,6,6,2);for(let i=8;i<=10;i++)item(i,5);en(13,6);
    draft(21,24,120);for(let r=4;r<=7;r++)item(22,r);fill(26,28,4,4,2);for(let i=26;i<=28;i++)item(i,3);
    fill(30,56,10,11);fill(36,37,8,9);item(36,7);item(37,7);fill(42,46,5,5,2);for(let i=42;i<=46;i++)item(i,4);en(40,6);en(50,5);fill(53,55,5,9);item(54,4);
    draft(59,60,140);draft(65,66,140);fill(62,63,5,5,2);item(62,4);item(63,4);
    fill(69,96,10,11);fill(75,76,8,9);item(75,7);item(76,7);fill(82,85,6,6,2);for(let i=82;i<=85;i++)item(i,5);en(72,5);en(79,6);en(90,5);en(94,6);
    fill(99,100,7,7,2);draft(103,104,120);fill(106,107,5,5,2);item(99,6);item(100,6);item(106,4);item(107,4);
    fill(109,171,10,11);draft(120,121,90);for(let r=3;r<=6;r++)item(120,r);
    fill(140,141,9,9);fill(142,143,8,9);fill(144,145,7,9);item(141,8);item(143,7);item(145,6);en(115,6);en(130,5);en(150,6);
  }
},{
  ballet:'firebird',act:'Act III',name:'Koschei’s Castle',blurb:'Every trick you know · Koschei',num:'linear-gradient(135deg,#8affb0,#14301e)',
  item:'apple',itemName:'Golden apples',enemy:'imp',goal:167,cps:[2,35,77,119],arena:[126,170],
  finale:'Koschei is defeated and the castle is free!',hint:'Belts, ice, magic floors — everything you have learned!',
  theme:{kind:'koschei',bg:['#081410','#14301e','#2e4a3a'],body:'#101c16',top:'#8affb0',glow:'rgba(138,255,176,.13)',side:'rgba(138,255,176,.2)',oneway:'#b8ffd0'},
  music:{bpm:150,meter:4,dur:.38,
    mel:[[74,74],[77,74],[73,74],[77,74], [74,81],[80,81],[77,74],73, [70,74],[77,74],[70,74],[77,74], 73,[76,73],69,0,
         [86,86],[89,86],[85,86],[89,86], [86,93],[92,93],[89,86],85, [82,86],[89,86],[82,86],[89,86], 85,0,73,0],
    ch:[[57,62,65],[57,62,65],[58,62,65],[57,61,64],[57,62,65],[57,62,65],[58,62,65],[57,61,64]],bass:[50,50,46,45,50,50,46,45]},
  build({fill,item,en,koschei}){
    fill(0,20,10,11);for(let i=4;i<=8;i++)item(i,9);en(14,6);
    fill(21,27,10,11,10);fill(28,34,10,11,9);for(let i=22;i<=33;i+=2)item(i,9);en(30,6);
    fill(35,60,10,11);fill(40,41,8,9);fill(46,49,6,6,5);for(let i=46;i<=49;i++)item(i,5);en(44,6);en(53,5);en(57,10);
    fill(63,64,8,8,7);fill(67,68,6,6,8);fill(71,72,8,8,7);fill(74,75,9,9,8);item(63,7);item(67,5);item(68,5);item(71,7);item(75,8);
    fill(77,104,10,11,3);fill(84,85,8,9);fill(90,93,7,9);item(84,7);item(85,7);for(let i=90;i<=93;i++)item(i,6);en(88,5);en(97,6);en(101,10);
    fill(107,107,11,11,4);fill(110,112,6,6,5);fill(115,116,9,9,8);item(107,8);item(110,5);item(111,5);item(112,5);item(115,8);
    fill(119,171,10,11);item(121,9);item(123,9);
    koschei(150);
  }
},{
  ballet:'school',act:'Lesson',name:'Ballet Class',blurb:'Learn to leap, spin and stomp',num:'linear-gradient(135deg,#ffd6e6,#ff9ec0)',
  friends:[[3,'fairy','Welcome to ballet class! Slide right to dance forward.'],[8,'fairy','Tap Leap to jump over the gap!'],[16,'fairy','A toy soldier! Leap and land on top of him to stomp.'],
    [26,'fairy','Here comes another one. Tap Spin to twirl him away!'],[35,'fairy','Collect roses! They buy pretty costumes in the wardrobe.'],[44,'fairy','That step is tall. Hold Leap down to jump higher!'],
    [53,'fairy','Big gap! Leap, then tap Spin in the air to float across.'],[63,'fairy','Leap when the beat dot pulses to fly extra high!'],[72,'fairy','Wake up the sleepy fairy to save your place.'],[83,'fairy','You are ready! Dance to the golden star.']],
  item:'rose',itemName:'Roses',enemy:'soldier',goal:92,cps:[2,74],
  theme:{kind:'studio',bg:['#5a2a5a','#a8507a','#f0a0b0'],body:'#7a4a32',top:'#e8b07a',glow:'rgba(232,176,122,.2)',side:'rgba(232,176,122,.3)',oneway:'#fff0f6'},
  music:{bpm:100,meter:3,dur:1.4,shimmer:.05,
    mel:[72,67,64, 69,72,77, 74,71,67, 72,0,0, 76,72,69, 77,74,72, 71,74,79, 72,0,0],
    ch:[[60,64,67],[57,60,65],[59,62,67],[60,64,67],[57,60,64],[57,62,65],[59,62,67],[60,64,67]],bass:[48,41,43,48,45,50,43,48]},
  build({fill,item,en}){
    fill(0,9,10,11);fill(13,40,10,11);item(14,9);item(15,9);
    en(19,10);en(30,10);
    for(let i=34;i<=39;i++)item(i,9);
    fill(41,52,10,11);fill(45,47,7,9);item(46,6);
    fill(58,100,10,11);
    fill(64,67,6,6,2);for(let i=64;i<=67;i++)item(i,5);
    for(let i=86;i<=90;i++)item(i,9);
  }
},{
  ballet:'firebird',act:'Act II',name:'The Firebird’s Flight',blurb:'A remix of every ballet',num:'linear-gradient(135deg,#ffb36b,#7a1e4a)',
  friends:[[4,'fairy','Ice, gumdrops, rafts, belts — every land you visited is here!'],[109,'fairy','Ride the fire wind up high!']],
  item:'apple',itemName:'Golden apples',enemy:'imp',goal:152,cps:[2,38,70,105],
  theme:{kind:'firegarden',bg:['#1a0a24','#4a1636','#b0503a'],body:'#20121c',top:'#ffc68a',glow:'rgba(255,198,138,.16)',side:'rgba(255,198,138,.25)',oneway:'#ffd8a8',draftCol:'255,190,110'},
  music:{bpm:104,meter:4,dur:1.2,wave:'triangle',shimmer:.03,arp:true,
    mel:[76,0,79,[78,76], 74,0,0,71, 72,0,76,[74,72], 71,0,0,0, 76,0,83,[81,79], 78,0,0,74, 76,79,78,74, 76,0,0,0],
    ch:[[55,59,64],[55,60,64],[57,60,64],[54,59,63],[55,59,64],[54,57,62],[55,60,64],[55,59,64]],bass:[40,36,45,47,40,38,36,40]},
  build({fill,item,en,mover,draft}){
    fill(0,16,10,11);for(let i=3;i<=6;i++)item(i,9);fill(8,10,6,6,2);for(let i=8;i<=10;i++)item(i,5);en(13,6);
    fill(17,34,10,11,3);for(let i=19;i<=33;i+=2)item(i,9);en(26,6);
    fill(35,37,11,11,4);item(36,7);
    fill(38,56,10,11);fill(40,45,5,5,2);for(let i=40;i<=45;i++)item(i,4);en(49,6);fill(52,53,8,9);item(52,7);item(53,7);
    mover(58,9,3,'h',8,3.6);for(const i of [60,63,66])item(i,7);
    fill(70,90,10,11);fill(74,82,10,11,9);for(let i=75;i<=81;i+=2)item(i,9);en(86,6);
    fill(93,94,8,8,5);fill(97,98,6,6,5);fill(101,102,8,8,5);item(93,7);item(94,7);item(97,5);item(98,5);item(101,7);item(102,7);
    fill(105,112,10,11);draft(114,115,140);for(let r=5;r<=7;r++)item(114,r);fill(117,119,4,4,2);for(let i=117;i<=119;i++)item(i,3);
    fill(121,171,10,11);en(128,6);en(136,5);
    fill(132,133,8,8,7);fill(136,137,6,6,8);item(132,7);item(133,7);item(136,5);item(137,5);
  }
}];
LEVELS.forEach((l,i)=>{l.ballet=l.ballet||'nutcracker';l.icon=['rosew','flake','candy','cocoa','crystal','swan','tree','owlc','bolt','sun','gift','rosew','crystal','star','pumpkin','clock','daisy','paw','key','gear','apple','flame','pointe','star'][i];});
LEVELS[4].finale="The Sugar Plum Fairy applauds — Clara's dream is complete.";

