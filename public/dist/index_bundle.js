(()=>{"use strict";var e={607:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(768),r=i(363),d=i(934),l=i(630),c=i(25),o=a(i(10)),p=i(597),h=i(230),f=i(277),u=i(773),y=i(853),g=i(826),m=i(221),x=document.getElementById("canvas"),b=window.devicePixelRatio;x.style.width=`${window.innerWidth}px`,x.style.height=`${window.innerHeight}px`,x.width=window.innerWidth*b,x.height=window.innerHeight*b;const v=new r.Player("tester"),w=new l.Opponent("loti");v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},p.bird))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},p.bird))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},p.bird))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},p.bird))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},u.shark))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},f.fish))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},f.fish))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},f.fish))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},h.turtle))),v.addToDeck(new n.Card(Object.assign({cardID:v.deck.size},y.forestGuardian)));const k=new d.Game(5,{player:v,opponent:w});new c.Scenario,o.default.loadAll(["../public/assets/part/type/1X4.png","../public/assets/part/type/2X4.png","../public/assets/part/type/3X4.png","../public/assets/card-zoneX4.png","../public/assets/card/frontX4.png","../public/assets/monster/humenX4.png","../public/assets/monster/birdX4.png","../public/assets/monster/turtleX4.png","../public/assets/monster/forestGuardianX4.png","../public/assets/monster/sharkX4.png","../public/assets/monster/fishX4.png","../public/assets/world/entity/player/backX4.png","../public/assets/world/entity/player/frontX4.png","../public/assets/world/entity/player/leftX4.png","../public/assets/world/entity/player/rightX4.png","../public/assets/part/abilities/thornX4.png","../public/assets/part/sacrifice/0X4.png","../public/assets/part/sacrifice/1X4.png","../public/assets/part/sacrifice/2X4.png","../public/assets/part/sacrifice/3X4.png","../public/assets/part/number/0X4.png","../public/assets/part/number/1X4.png","../public/assets/part/number/2X4.png","../public/assets/part/number/3X4.png","../public/assets/part/number/4X4.png","../public/assets/part/number/5X4.png","../public/assets/part/number/6X4.png","../public/assets/part/number/7X4.png","../public/assets/part/number/8X4.png","../public/assets/part/number/9X4.png"]).then((()=>s(void 0,void 0,void 0,(function*(){m.World.init(),m.World.on(),yield(0,g.Wait)(2),m.World.off(),k.start(),yield(0,g.Wait)(2),k.end(),m.World.on()}))))},101:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasCardObject=void 0;const n=a(i(10)),r=document.body,d=window.devicePixelRatio;t.CanvasCardObject=class{constructor(e,t,i){this.x=0,this.y=0,this.xSaver=0,this.ySaver=0,this.isArranged=!1,this.isAttacking=!1,this.attackMotion=!1,this.card=e,this.isPlayerCard=t,this.x=i.x,this.isPlayerCard?this.y=60*r.getBoundingClientRect().height/100*d:this.y=r.getBoundingClientRect().height*-d,this.xSaver=i.x,this.ySaver=i.y}draw(){const e=document.getElementById("canvas").getContext("2d"),t=`../public/assets/monster/${this.card.name}X4.png`,i=`../public/assets/part/type/${this.card.type}X4.png`;e.drawImage(n.default.get("../public/assets/card/frontX4.png"),this.x,this.y),e.drawImage(n.default.get(i),this.x+68,this.y+168);for(let t=0;t<this.card.sacrifice.length;t++){const i=`../public/assets/part/sacrifice/${this.card.sacrifice[t]}X4.png`;e.drawImage(n.default.get(i),this.x+16+32*t,this.y+132)}if(e.drawImage(n.default.get(t),this.x,this.y),this.card.atk<10){const t=`../public/assets/part/number/${this.card.atk}X4.png`;e.drawImage(n.default.get(t),this.x+28,this.y+208)}else{const t=`../public/assets/part/number/${Math.floor(this.card.atk/10)}X4.png`,i=`../public/assets/part/number/${this.card.atk%10}X4.png`;e.drawImage(n.default.get(t),this.x+20,this.y+208),e.drawImage(n.default.get(i),this.x+36,this.y+208)}if(this.card.def<10){const t=`../public/assets/part/number/${this.card.def}X4.png`;e.drawImage(n.default.get(t),this.x+116,this.y+208)}else{const t=`../public/assets/part/number/${Math.floor(this.card.def/10)}X4.png`,i=`../public/assets/part/number/${this.card.def%10}X4.png`;e.drawImage(n.default.get(t),this.x+108,this.y+208),e.drawImage(n.default.get(i),this.x+124,this.y+208)}if(this.card.heal<10){const t=`../public/assets/part/number/${this.card.heal}X4.png`;e.drawImage(n.default.get(t),this.x+72,this.y+212)}else{const t=`../public/assets/part/number/${Math.floor(this.card.heal/10)}X4.png`,i=`../public/assets/part/number/${this.card.heal%10}X4.png`;e.drawImage(n.default.get(t),this.x+64,this.y+212),e.drawImage(n.default.get(i),this.x+80,this.y+212)}e.drawImage(n.default.get("../public/assets/part/abilities/thornX4.png"),this.x+92,this.y+12)}attack(){this.isAttacking=!0}moveTo(e,t,i){return s(this,void 0,void 0,(function*(){this.x!==e&&(this.x<e?this.x+i>e?this.x+=e-this.x:this.x+=i:this.x-i<e?this.x-=this.x-e:this.x-=i),this.y!==t&&(this.y<t?this.y+i>t?this.y+=t-this.y:this.y+=i:this.y-i<t?this.y-=this.y-t:this.y-=i)}))}rander(){this.y===this.ySaver&&(this.isArranged=!0),this.isArranged||this.moveTo(this.x,this.ySaver,80),this.isAttacking&&(this.attackMotion?(this.moveTo(this.x,this.ySaver,10),this.y===this.ySaver&&(this.attackMotion=!1,this.isAttacking=!1)):(this.moveTo(this.x,this.ySaver-25,10),this.y===this.ySaver-25&&(this.attackMotion=!0)))}}},10:function(e,t){var i=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});class s{static loadAll(e){return i(this,void 0,void 0,(function*(){yield new Promise((t=>i(this,void 0,void 0,(function*(){const i=e.map(((e,t)=>new Promise((i=>{const a=new Image;a.src=e,a.addEventListener("load",(()=>{s.assets[e]=a,i(t)}))}))));s.promises=i,yield Promise.allSettled(i).then((e=>{t("done"),console.log(e)}))}))))}))}static get(e){return s.assets[e]}}s.assets={},t.default=s},826:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Wait=void 0,t.Wait=function(e){return new Promise((t=>{setTimeout((()=>{t("")}),1e3*e)}))}},934:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const a=i(826),n=i(768),r=i(87),d=i(988),l=document.body,c=document.getElementById("bell"),o=document.getElementById("player-container"),p=document.getElementById("card-info"),h=document.getElementById("card-info-on-hand");t.Game=class{constructor(e,t){this.isPlayerTurn=!0,this.phase=1,this.player=t.player,this.opponent=t.opponent,this.numOfCardZone=e,this.field=new r.Field(this.numOfCardZone)}start(){return s(this,void 0,void 0,(function*(){this.field.isOn=!0,c.style.transform="translate(0px, 0px)",o.style.transform="translate(0px, 0px)",p.style.transform="translate(0px, 0px)",this.init();for(const[e,t]of this.opponent.deck)this.opponent.addToHand(t);for(let e=0;e<10;e++)yield(0,a.Wait)(.3),this.drawCard(!0)}))}end(){this.field.isOn=!1,this.field.init(),this.player.initHand(),c.style.transform=`translate(0px, ${l.getBoundingClientRect().height/100*40+110}px)`,o.style.transform=`translate(0px, ${l.getBoundingClientRect().height/100*40}px)`,p.style.transform="translate(500px, 0px)"}numOfCardOnField(){let e=[],t=[];return this.field.fieldArrange.player.map((t=>{t&&e.push(t.type)})),this.field.fieldArrange.opponent.map((e=>{e&&t.push(e.type)})),{player:{types:{1:e.filter((e=>1===e)).length,2:e.filter((e=>2===e)).length,3:e.filter((e=>3===e)).length},total:e.length},opponent:{types:{1:t.filter((e=>1===e)).length,2:t.filter((e=>2===e)).length,3:t.filter((e=>3===e)).length},total:t.length}}}isApplyDefence(e){let t=this.field.fieldArrange.opponent[e],i=this.field.fieldArrange.player[e];this.isPlayerTurn||(t=this.field.fieldArrange.player[e],i=this.field.fieldArrange.opponent[e]);let s=!1;return i&&t&&(1===i.type?2===t.type&&(s=!0):2===i.type?3===t.type&&(s=!0):3===i.type&&1===t.type&&(s=!0)),s}battle(){for(let e=0;e<this.numOfCardZone;e++)if(this.isPlayerTurn){if(this.field.fieldArrange.player[e])if(this.field.fieldArrange.opponent[e]){this.field.canvasCardObjects.player.get(this.field.fieldArrange.player[e].cardID).attack();let t=0;t=this.isApplyDefence(e)?this.field.fieldArrange.opponent[e].def-this.field.fieldArrange.player[e].atk>=0?0:-(this.field.fieldArrange.opponent[e].def-this.field.fieldArrange.player[e].atk):this.field.fieldArrange.player[e].atk,this.field.fieldArrange.opponent[e].damage(t).then((()=>{this.field.fieldArrange.opponent[e].heal<=0&&this.field.kill(0,e)}))}else console.log("직접공격함")}else if(this.field.fieldArrange.opponent[e])if(this.field.fieldArrange.player[e]){let t=0;t=this.isApplyDefence(e)?this.field.fieldArrange.player[e].def-this.field.fieldArrange.opponent[e].atk>=0?0:-(this.field.fieldArrange.player[e].def-this.field.fieldArrange.opponent[e].atk):this.field.fieldArrange.opponent[e].atk,this.field.fieldArrange.player[e].damage(t).then((()=>{this.field.fieldArrange.player[e].heal<=0&&this.field.kill(1,e)}))}else console.log("직접공격딤함")}turnChange(){this.isPlayerTurn?(this.isPlayerTurn=!1,this.phase=0,c.classList.remove("bell-up"),c.classList.add("bell-pushed"),this.intellect(),console.log("이제 상대턴")):(this.phase++,this.isPlayerTurn=!0,c.classList.remove("bell-pushed"),c.classList.add("bell-up"),console.log("이제 내턴"))}newArrange(e){return s(this,void 0,void 0,(function*(){yield(0,a.Wait)(.25),this.field.selectCard(e,this.isPlayerTurn),this.phase++}))}addToHand(e){this.player.hand.set(e.cardID,e)}drawCard(e){if(this.isPlayerTurn&&1===this.phase||e){let t=this.player.deck.get(this.player.deck.size-1);this.player.removeToDeck(this.player.deck.size-1),this.addToHand(t);const i=document.getElementById("player-hand"),n=document.createElement("div"),r=document.createElement("img"),d=document.createElement("img"),l=document.createElement("img"),c=document.body,o=c.getBoundingClientRect().width/100*10;r.src="./assets/card/front.png",d.src=`../public/assets/monster/${t.name}.png`,l.src=`../public/assets/part/type/${t.type}.png`,n.classList.add("card","card-on-hand"),r.classList.add("card-part"),d.classList.add("card-part"),l.classList.add("card-part"),n.append(r),n.append(l),n.id=`card-${t.cardID}`,n.style.left=window.innerWidth-o-(20+5*this.player.deck.size)+"px",n.addEventListener("mouseover",(()=>{n.style.zIndex="2",n.style.transform+="translateY(-20px)",h.innerText=`\n                cardID: ${t.cardID}\n                name: ${t.name}\n                type: ${t.type}\n                sacrifice: ${t.sacrifice}\n                health: ${t.heal}\n                attack: ${t.atk}\n                defence: ${t.def}\n                `})),n.addEventListener("mouseout",(()=>{n.style.zIndex="1",n.style.transform+="translateY(20px)",h.innerText=""})),i.append(n);const p=r.getBoundingClientRect().width/39;l.style.width=5*p+"px",l.style.transform=`translate(${17*p}px, ${42*p}px)`;for(let e=0;e<t.sacrifice.length;e++){const i=document.createElement("img");i.src=`../public/assets/part/sacrifice/${t.sacrifice[e]}X4.png`,i.classList.add("card-part"),n.append(i),i.style.width=7*p+"px",i.style.transform=`translate(${4*p+8*p*e}px, ${33*p}px)`}if(n.append(d),t.atk<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.atk}.png`,e.classList.add("card-part"),n.append(e),e.style.width=3*p+"px",e.style.transform=`translate(${7*p}px, ${52*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.atk/10)}.png`,i.src=`../public/assets/part/number/${t.atk%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),n.append(e,i),e.style.width=3*p+"px",i.style.width=3*p+"px",e.style.transform=`translate(${5*p}px, ${52*p}px)`,i.style.transform=`translate(${9*p}px, ${52*p}px)`}if(t.def<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.def}.png`,e.classList.add("card-part"),n.append(e),e.style.width=3*p+"px",e.style.transform=`translate(${29*p}px, ${52*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.def/10)}.png`,i.src=`../public/assets/part/number/${t.def%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),n.append(e,i),e.style.width=3*p+"px",i.style.width=3*p+"px",e.style.transform=`translate(${27*p}px, ${52*p}px)`,i.style.transform=`translate(${31*p}px, ${52*p}px)`}if(t.heal<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.heal}.png`,e.classList.add("card-part"),n.append(e),e.style.width=3*p+"px",e.style.transform=`translate(${18*p}px, ${53*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.heal/10)}.png`,i.src=`../public/assets/part/number/${t.heal%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),n.append(e,i),e.style.width=3*p+"px",i.style.width=3*p+"px",e.style.transform=`translate(${16*p}px, ${53*p}px)`,i.style.transform=`translate(${20*p}px, ${53*p}px)`}n.style.height=65*p+"px",setTimeout((()=>{n.style.left=20+120*(this.player.hand.size-1)+"px"}),50),n.addEventListener("click",(()=>s(this,void 0,void 0,(function*(){if(this.isPlayerTurn&&!this.field.isArranging&&!this.field.isSacrificing&&this.numOfCardOnField().player.total>=t.sacrifice.length&&this.numOfCardOnField().player.types[1]>=t.sacrifice.filter((e=>1===e)).length&&this.numOfCardOnField().player.types[2]>=t.sacrifice.filter((e=>2===e)).length&&this.numOfCardOnField().player.types[3]>=t.sacrifice.filter((e=>3===e)).length){n.style.transform+=`translateY(${c.getBoundingClientRect().height/2}px)`,this.player.removeToHand(t.cardID),this.newArrange(t),yield(0,a.Wait)(.2),i.removeChild(n);let e=0;this.player.hand.forEach((t=>{document.getElementById(`card-${t.cardID}`).style.left=20+120*e+"px",e++}))}})))),e||this.phase++}}intellect(){return s(this,void 0,void 0,(function*(){let e,t,i=0;const s=this.opponent.hand,n=this.field.fieldArrange.opponent,r=this.field.fieldArrange.player;for(const[a,d]of s)for(let s=0;s<this.numOfCardZone;s++)if(r[s]&&!n[s]){const a=d.atk;i<a&&(i=a,e=d,t=s)}e&&(yield(0,a.Wait)(1),this.field.placeCard(e,t,this.isPlayerTurn),this.opponent.removeToHand(e.cardID)),yield(0,a.Wait)(1),this.battle(),this.turnChange()}))}init(){const e=document.getElementById("player-deck");c.addEventListener("click",(()=>{this.isPlayerTurn&&(this.phase>1||this.player.deck.size<=0)&&!this.field.isArranging&&!this.field.isSacrificing&&(this.battle(),this.turnChange())})),c.classList.add("bell-pushed"),this.isPlayerTurn?c.classList.remove("bell-pushed"):c.classList.add("bell-pushed"),this.field.init(),this.player.initHand(),this.field.placeCard(new n.Card(Object.assign({cardID:10},d.test)),0,!1),this.field.placeCard(new n.Card(Object.assign({cardID:11},d.test)),1,!1),this.field.placeCard(new n.Card(Object.assign({cardID:12},d.test)),2,!1),this.field.placeCard(new n.Card(Object.assign({cardID:13},d.test)),3,!1),this.field.placeCard(new n.Card(Object.assign({cardID:14},d.test)),4,!1),e.addEventListener("click",(()=>{this.player.hand.size<10&&this.player.deck.size>0&&this.drawCard()}))}}},87:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Field=void 0;const n=i(101),r=a(i(10)),d=document.getElementById("canvas").getContext("2d"),l=document.getElementById("card-info-on-field"),c=document.body,o=window.devicePixelRatio,p="../public/assets/card-zoneX4.png";let h,f;t.Field=class{constructor(e){this.isOn=!1,this.isArranging=!1,this.isSacrificing=!1,this.fieldAxis={opponent:[],player:[]},this.fieldArrange={opponent:[],player:[]},this.canvasCardObjects={opponent:new Map,player:new Map},this.selectedSacrificeCard=[],this.isPlayerTurn=!0,this.numOfCardZone=e,this.loop=this.loop.bind(this)}draw(){const e=Math.floor(c.getBoundingClientRect().height*o/100*60/2-f+4),t=Math.floor(c.getBoundingClientRect().width*o/2-h*this.numOfCardZone/2+4*(this.numOfCardZone-1)/2);for(let i=0;i<2;i++)for(let s=0;s<this.numOfCardZone;s++){const a=t+(h-4)*s,n=e+(f-4)*i;d.drawImage(r.default.get(p),a,n)}}renderCard(){this.canvasCardObjects.opponent.forEach((e=>{e.draw(),e.rander()})),this.canvasCardObjects.player.forEach((e=>{e.draw(),e.rander()}))}selectCard(e,t){return s(this,void 0,void 0,(function*(){this.selectedCard=e,e.sacrifice.length<1?this.isArranging=!0:this.isSacrificing=!0,this.isPlayerTurn=t}))}placeCard(e,t,i){i?this.fieldArrange.player[t]||(this.fieldArrange.player[t]=e,this.canvasCardObjects.player.set(e.cardID,new n.CanvasCardObject(e,i,{x:this.fieldAxis.player[t].x,y:this.fieldAxis.player[t].y}))):this.fieldArrange.opponent[t]||(this.fieldArrange.opponent[t]=e,this.canvasCardObjects.opponent.set(e.cardID,new n.CanvasCardObject(e,i,{x:this.fieldAxis.opponent[t].x,y:this.fieldAxis.opponent[t].y})))}kill(e,t){0===e?(this.canvasCardObjects.opponent.delete(this.fieldArrange.opponent[t].cardID),this.fieldArrange.opponent[t]=void 0):1===e&&(this.canvasCardObjects.player.delete(this.fieldArrange.player[t].cardID),this.fieldArrange.player[t]=void 0)}loop(){d.clearRect(0,0,c.getBoundingClientRect().width*o,c.getBoundingClientRect().height*o),this.isOn&&(this.draw(),this.renderCard(),requestAnimationFrame(this.loop))}init(){return s(this,void 0,void 0,(function*(){h=r.default.get(p).width,f=r.default.get(p).height;const e=Math.floor(c.getBoundingClientRect().height*o/100*60/2-f+4),t=Math.floor(c.getBoundingClientRect().width*o/2-h*this.numOfCardZone/2+4*(this.numOfCardZone-1)/2);for(let i=0;i<2;i++)for(let s=0;s<this.numOfCardZone;s++){const a=t+(h-4)*s,n=e+(f-4)*i;0===i?this.fieldAxis.opponent.push({x:a,y:n}):this.fieldAxis.player.push({x:a,y:n})}window.addEventListener("click",(e=>{const t=e.clientX,i=e.clientY;if(this.isArranging&&t&&i)for(let e=0;e<this.numOfCardZone;e++)t>this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+f)/o&&(this.fieldArrange.player[e]||(this.placeCard(this.selectedCard,e,this.isPlayerTurn),this.isArranging=!1));if(this.isSacrificing&&t&&i)for(let e=0;e<this.numOfCardZone;e++)t>this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+f)/o&&this.fieldArrange.player[e]&&(this.selectedCard.sacrifice[this.selectedSacrificeCard.length]!==this.fieldArrange.player[e].type&&0!==this.selectedCard.sacrifice[this.selectedSacrificeCard.length]||(this.selectedSacrificeCard.push(e),this.kill(1,e),this.selectedSacrificeCard.length===this.selectedCard.sacrifice.length&&(this.selectedSacrificeCard=[],this.isSacrificing=!1,this.isArranging=!0)))})),window.addEventListener("mousemove",(e=>{const t=e.clientX,i=e.clientY;l.innerText="";for(let e=0;e<this.numOfCardZone;e++){if(t>=this.fieldAxis.opponent[e].x/o&&t<(this.fieldAxis.opponent[e].x+h)/o&&i>=this.fieldAxis.opponent[e].y/o&&i<(this.fieldAxis.opponent[e].y+f)/o&&this.fieldArrange.opponent[e]){const t=this.fieldArrange.opponent[e];l.innerText=`\n                                cardID: ${t.cardID}\n                                name: ${t.name}\n                                type: ${t.type}\n                                sacrifice: ${t.sacrifice}\n                                health: ${t.heal}\n                                attack: ${t.atk}\n                                defence: ${t.def}\n                            `}if(t>=this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+f)/o&&this.fieldArrange.player[e]){const t=this.fieldArrange.player[e];l.innerText=`\n                                cardID: ${t.cardID}\n                                name: ${t.name}\n                                type: ${t.type}\n                                sacrifice: ${t.sacrifice}\n                                health: ${t.heal}\n                                attack: ${t.atk}\n                                defence: ${t.def}\n                            `}}}));for(let e=0;e<this.numOfCardZone;e++)this.fieldArrange.player.push(void 0),this.fieldArrange.opponent.push(void 0);requestAnimationFrame(this.loop)}))}}},768:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const a=i(826);t.Card=class{constructor(e){this.cardID=e.cardID,this.name=e.name,this.type=e.type,this.sacrifice=e.sacrifice,this.atk=e.attack,this.def=e.defence,this.heal=e.health}damage(e){return s(this,void 0,void 0,(function*(){for(let t=0;t<e&&(yield(0,a.Wait)(.06),this.heal-=1,console.log(this.heal),!(this.heal<=0));t++);}))}}},630:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Opponent=void 0,t.Opponent=class{constructor(e){this.hand=new Map,this.deck=new Map,this.name=e}addToHand(e){this.hand.set(e.cardID,e)}addToDeck(e){this.deck.set(this.deck.size,e)}removeToHand(e){this.hand.delete(e)}removeToDeck(e){this.deck.delete(e)}}},363:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0,t.Player=class{constructor(e){this.hand=new Map,this.deck=new Map,this.name=e}initHand(){this.hand.clear()}addToDeck(e){this.deck.set(e.cardID,e),this.updateDeck()}removeToDeck(e){this.deck.delete(e),this.updateDeck()}removeToHand(e){this.hand.delete(e)}updateDeck(){const e=document.getElementById("player-deck");e.replaceChildren(),this.deck.forEach(((t,i)=>{const s=document.createElement("img");s.src="./assets/card/back.png",s.alt=t.name,s.classList.add("card"),s.style.right=5*i+20+"px",e.append(s)}))}}},25:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(a,n){function r(e){try{l(s.next(e))}catch(e){n(e)}}function d(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,d)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Scenario=void 0;const a=i(826),n=document.getElementById("bell"),r=document.getElementById("player-container"),d=document.getElementById("card-info"),l=document.getElementById("scenario-container"),c=document.body;t.Scenario=class{constructor(){this.isScenarioOn=!1}on(){return s(this,void 0,void 0,(function*(){this.isScenarioOn||(l.classList.remove("hidden"),yield(0,a.Wait)(1),n.style.transform=`translate(0px, ${c.getBoundingClientRect().height/100*40+90}px)`,r.style.transform=`translate(0px, ${c.getBoundingClientRect().height/100*40}px)`,d.style.transform="translate(500px, 0px)",yield(0,a.Wait)(.1),l.classList.remove("scenario-off"),l.classList.add("scenario-on"),this.isScenarioOn=!0)}))}off(){return s(this,void 0,void 0,(function*(){this.isScenarioOn&&(yield(0,a.Wait)(1),l.classList.add("scenario-off"),l.classList.remove("scenario-on"),yield(0,a.Wait)(.1),n.style.transform="translate(0px, 90px)",r.style.transform="translate(0px, 0px)",yield(0,a.Wait)(1),l.classList.add("hidden"),this.isScenarioOn=!1)}))}}},221:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.World=void 0;const s=i(638),a=document.body,n=document.getElementById("bell"),r=document.getElementById("player-container"),d=document.getElementById("card-info"),l=document.getElementById("canvas").getContext("2d"),c=window.devicePixelRatio,o={w:!1,a:!1,s:!1,d:!1};class p{constructor(){p.loop=p.loop.bind(p)}static movePlayer(e){o.w&&(p.player.state="back",p.player.y-=e),o.a&&(p.player.state="left",p.player.x-=e),o.s&&(p.player.state="front",p.player.y+=e),o.d&&(p.player.state="right",p.player.x+=e)}static render(){p.player.draw()}static loop(){l.clearRect(0,0,window.innerWidth*c,window.innerHeight*c),p.isOn&&(p.movePlayer(10),p.render(),requestAnimationFrame(p.loop))}static init(){window.addEventListener("keydown",(e=>{"w"===e.key||"W"===e.key?o.w=!0:"a"===e.key||"A"===e.key?o.a=!0:"s"===e.key||"S"===e.key?o.s=!0:"d"!==e.key&&"D"!==e.key||(o.d=!0)})),window.addEventListener("keyup",(e=>{"w"!==e.key&&"W"!==e.key||(o.w=!1),"a"!==e.key&&"A"!==e.key||(o.a=!1),"s"!==e.key&&"S"!==e.key||(o.s=!1),"d"!==e.key&&"D"!==e.key||(o.d=!1)}))}static on(){n.style.transform=`translate(0px, ${a.getBoundingClientRect().height/100*40+110}px)`,r.style.transform=`translate(0px, ${a.getBoundingClientRect().height/100*40}px)`,d.style.transform="translate(500px, 0px)",p.isOn=!0,requestAnimationFrame(p.loop)}static off(){n.style.transform="translate(0px, 0px)",r.style.transform="translate(0px, 0px)",d.style.transform="translate(0px, 0px)",p.isOn=!1}}t.World=p,p.isOn=!1,p.player=new s.Player("tester",{x:0,y:0})},952:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Entity=void 0,t.Entity=class{constructor(e,t){this.name=e,this.x=t.x,this.y=t.y}}},638:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;const a=s(i(10)),n=i(952);document.body,window.devicePixelRatio;class r extends n.Entity{constructor(){super(...arguments),this.state="front"}draw(){document.getElementById("canvas").getContext("2d").drawImage(a.default.get(`../public/assets/world/entity/player/${this.state}X4.png`),this.x,this.y)}}t.Player=r},597:e=>{e.exports=JSON.parse('{"bird":{"name":"bird","type":1,"sacrifice":[],"attack":1,"defence":1,"health":1}}')},277:e=>{e.exports=JSON.parse('{"fish":{"name":"fish","type":3,"sacrifice":[],"attack":0,"defence":1,"health":2}}')},853:e=>{e.exports=JSON.parse('{"forestGuardian":{"name":"forestGuardian","type":1,"sacrifice":[1,1,1,1],"attack":7,"defence":3,"health":6}}')},773:e=>{e.exports=JSON.parse('{"shark":{"name":"shark","type":3,"sacrifice":[3,3,3],"attack":5,"defence":3,"health":5}}')},230:e=>{e.exports=JSON.parse('{"turtle":{"name":"turtle","type":3,"sacrifice":[0,0,0],"attack":2,"defence":6,"health":4}}')},988:e=>{e.exports=JSON.parse('{"test":{"name":"humen","type":1,"sacrifice":[0,0,0,0],"attack":0,"defence":0,"health":99}}')}},t={};!function i(s){var a=t[s];if(void 0!==a)return a.exports;var n=t[s]={exports:{}};return e[s].call(n.exports,n,n.exports,i),n.exports}(607)})();