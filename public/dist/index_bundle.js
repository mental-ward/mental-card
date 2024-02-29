(()=>{"use strict";var e={607:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.player=void 0;const a=i(768),r=i(363),l=i(630),d=n(i(10)),c=i(177),o=i(635),p=i(495),h=i(221),u=document.getElementById("canvas"),f=window.devicePixelRatio;u.style.width=`${window.innerWidth}px`,u.style.height=`${window.innerHeight}px`,u.width=window.innerWidth*f,u.height=window.innerHeight*f,t.player=new r.Player("tester"),new l.Opponent("loti"),t.player.addToDeck(new a.Card(Object.assign({cardID:t.player.deck.size},o.fish))),t.player.addToDeck(new a.Card(Object.assign({cardID:t.player.deck.size},o.fish))),t.player.addToDeck(new a.Card(Object.assign({cardID:t.player.deck.size},o.fish))),t.player.addToDeck(new a.Card(Object.assign({cardID:t.player.deck.size},c.bird))),t.player.addToDeck(new a.Card(Object.assign({cardID:t.player.deck.size},p.shark))),d.default.loadAll(["../public/assets/part/type/1.png","../public/assets/part/type/2.png","../public/assets/part/type/3.png","../public/assets/card-zone.png","../public/assets/card/front.png","../public/assets/monster/human.png","../public/assets/monster/bird.png","../public/assets/monster/turtle.png","../public/assets/monster/forestGuardian.png","../public/assets/monster/shark.png","../public/assets/monster/fish.png","../public/assets/world/entity/player/back.png","../public/assets/world/entity/player/front.png","../public/assets/world/entity/player/left.png","../public/assets/world/entity/player/right.png","../public/assets/world/bg/space1/1.png","../public/assets/world/entity/etc/E.png","../public/assets/subtitle/profiles/nurseX6.png","../public/assets/subtitle/profiles/playerX6.png","../public/assets/subtitle/subtitle.png","../public/assets/subtitle/subtitleX6.png","../public/assets/world/entity/bed/front.png","../public/assets/world/entity/nurse/front.png","../public/assets/part/abilities/double-attack.png","../public/assets/part/sacrifice/0.png","../public/assets/part/sacrifice/1.png","../public/assets/part/sacrifice/2.png","../public/assets/part/sacrifice/3.png","../public/assets/part/number/0.png","../public/assets/part/number/1.png","../public/assets/part/number/2.png","../public/assets/part/number/3.png","../public/assets/part/number/4.png","../public/assets/part/number/5.png","../public/assets/part/number/6.png","../public/assets/part/number/7.png","../public/assets/part/number/8.png","../public/assets/part/number/9.png"]).then((()=>s(void 0,void 0,void 0,(function*(){h.World.init(),h.World.on()}))))},101:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasCardObject=void 0;const a=n(i(10)),r=document.body,l=window.devicePixelRatio;t.CanvasCardObject=class{constructor(e,t,i){this.x=0,this.y=0,this.xSaver=0,this.ySaver=0,this.isArranged=!1,this.isAttacking=!1,this.attackMotion=!1,this.isPlayerTurn=!1,this.card=e,this.isPlayerCard=t,this.x=i.x,this.isPlayerCard?this.y=60*r.getBoundingClientRect().height/100*l:this.y=r.getBoundingClientRect().height*-l,this.xSaver=i.x,this.ySaver=i.y}draw(){const e=document.getElementById("canvas").getContext("2d"),t=`../public/assets/monster/${this.card.name}.png`,i=`../public/assets/part/type/${this.card.type}.png`;e.drawImage(a.default.get("../public/assets/card/front.png"),this.x,this.y),e.drawImage(a.default.get(i),this.x+68,this.y+168);for(let t=0;t<this.card.sacrifice.length;t++){const i=`../public/assets/part/sacrifice/${this.card.sacrifice[t]}.png`;e.drawImage(a.default.get(i),this.x+16+32*t,this.y+132)}if(e.drawImage(a.default.get(t),this.x,this.y),this.card.atk<10){const t=`../public/assets/part/number/${this.card.atk}.png`;e.drawImage(a.default.get(t),this.x+104,this.y+192)}else{const t=`../public/assets/part/number/${Math.floor(this.card.atk/10)}.png`,i=`../public/assets/part/number/${this.card.atk%10}.png`;e.drawImage(a.default.get(t),this.x+96,this.y+192),e.drawImage(a.default.get(i),this.x+112,this.y+192)}if(this.card.def<10){const t=`../public/assets/part/number/${this.card.def}.png`;e.drawImage(a.default.get(t),this.x+130,this.y+224)}else{const t=`../public/assets/part/number/${Math.floor(this.card.def/10)}.png`,i=`../public/assets/part/number/${this.card.def%10}.png`;e.drawImage(a.default.get(t),this.x+122,this.y+224),e.drawImage(a.default.get(i),this.x+138,this.y+224)}if(this.card.heal<10){const t=`../public/assets/part/number/${this.card.heal}.png`;e.drawImage(a.default.get(t),this.x+26,this.y+206)}else{const t=`../public/assets/part/number/${Math.floor(this.card.heal/10)}.png`,i=`../public/assets/part/number/${this.card.heal%10}.png`;e.drawImage(a.default.get(t),this.x+18,this.y+206),e.drawImage(a.default.get(i),this.x+34,this.y+206)}0!==this.card.abilities.length&&e.drawImage(a.default.get(`../public/assets/part/abilities/${this.card.abilities}.png`),this.x+58,this.y+208)}attack(e){this.isAttacking=!0,this.isPlayerTurn=e}moveTo(e,t,i){return s(this,void 0,void 0,(function*(){this.x!==e&&(this.x<e?this.x+i>e?this.x+=e-this.x:this.x+=i:this.x-i<e?this.x-=this.x-e:this.x-=i),this.y!==t&&(this.y<t?this.y+i>t?this.y+=t-this.y:this.y+=i:this.y-i<t?this.y-=this.y-t:this.y-=i)}))}rander(){this.y===this.ySaver&&(this.isArranged=!0),this.isArranged||this.moveTo(this.x,this.ySaver,80),this.isAttacking&&(this.isPlayerTurn?this.attackMotion?(this.moveTo(this.x,this.ySaver,10),this.y===this.ySaver&&(this.attackMotion=!1,this.isAttacking=!1)):(this.moveTo(this.x,this.ySaver-25,10),this.y===this.ySaver-25&&(this.attackMotion=!0)):this.attackMotion?(this.moveTo(this.x,this.ySaver,10),this.y===this.ySaver&&(this.attackMotion=!1,this.isAttacking=!1)):(this.moveTo(this.x,this.ySaver+25,10),this.y===this.ySaver+25&&(this.attackMotion=!0)))}}},10:function(e,t){var i=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});class s{static loadAll(e){return i(this,void 0,void 0,(function*(){yield new Promise((t=>i(this,void 0,void 0,(function*(){const i=e.map(((e,t)=>new Promise((i=>{const n=new Image;n.src=e,n.addEventListener("load",(()=>{s.assets[e]=n,i(t)}))}))));s.promises=i,yield Promise.allSettled(i).then((e=>{t("done"),console.log(e)}))}))))}))}static get(e){return s.assets[e]}}s.assets={},t.default=s},826:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Wait=void 0,t.Wait=function(e){return new Promise((t=>{setTimeout((()=>{t("")}),1e3*e)}))}},934:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const n=i(826),a=i(768),r=i(87),l=i(384),d=document.body,c=document.getElementById("bell"),o=document.getElementById("player-container"),p=document.getElementById("card-info"),h=document.getElementById("card-info-on-hand");t.Game=class{constructor(e,t){this.isPlayerTurn=!0,this.phase=1,this.player=t.player,this.opponent=t.opponent,this.numOfCardZone=e,this.field=new r.Field(this.numOfCardZone)}start(){return s(this,void 0,void 0,(function*(){this.field.isOn=!0,c.classList.remove("bell-hidden"),o.style.transform="translate(0px, 0px)",p.style.transform="translate(0px, 0px)",this.init();for(const[e,t]of this.opponent.deck)this.opponent.addToHand(t);for(let e=0;e<3;e++)yield(0,n.Wait)(.3),this.drawCard(!0)}))}end(){this.field.isOn=!1,this.field.init(),this.player.initHand(),c.style.transform=`translate(0px, ${d.getBoundingClientRect().height/100*40+110}px)`,o.style.transform=`translate(0px, ${d.getBoundingClientRect().height/100*40}px)`,p.style.transform="translate(500px, 0px)"}numOfCardOnField(){let e=[],t=[];return this.field.fieldArrange.player.map((t=>{t&&e.push(t.type)})),this.field.fieldArrange.opponent.map((e=>{e&&t.push(e.type)})),{player:{types:{1:e.filter((e=>1===e)).length,2:e.filter((e=>2===e)).length,3:e.filter((e=>3===e)).length},total:e.length},opponent:{types:{1:t.filter((e=>1===e)).length,2:t.filter((e=>2===e)).length,3:t.filter((e=>3===e)).length},total:t.length}}}isApplyDefence(e){let t=this.field.fieldArrange.opponent[e],i=this.field.fieldArrange.player[e];this.isPlayerTurn||(t=this.field.fieldArrange.player[e],i=this.field.fieldArrange.opponent[e]);let s=!1;return i&&t&&(1===i.type?2===t.type&&(s=!0):2===i.type?3===t.type&&(s=!0):3===i.type&&1===t.type&&(s=!0)),s}battle(e){for(let t=0;t<this.numOfCardZone;t++){const i=this.isPlayerTurn?this.field.fieldArrange.player[t]:this.field.fieldArrange.opponent[t],s=this.isPlayerTurn?this.field.fieldArrange.opponent[t]:this.field.fieldArrange.player[t];if(i)if(s){(this.isPlayerTurn?this.field.canvasCardObjects.player.get(this.field.fieldArrange.player[t].cardID):this.field.canvasCardObjects.opponent.get(this.field.fieldArrange.opponent[t].cardID)).attack(this.isPlayerTurn);let n=0;n=this.isApplyDefence(t)?s.def-i.atk>=0?0:-(s.def-i.atk):i.atk,s.damage(n).then((()=>{s.heal<=0&&this.field.kill(this.isPlayerTurn?0:1,t),i.abilities,e()}))}else console.log("직접공격함")}}turnChange(){this.isPlayerTurn?(this.isPlayerTurn=!1,this.phase=0,c.classList.remove("bell-up"),c.classList.add("bell-pushed"),this.intellect(),console.log("이제 상대턴")):(this.phase++,this.isPlayerTurn=!0,c.classList.remove("bell-pushed"),c.classList.add("bell-up"),console.log("이제 내턴"))}newArrange(e){return s(this,void 0,void 0,(function*(){yield(0,n.Wait)(.25),this.field.selectCard(e,this.isPlayerTurn),this.phase++}))}addToHand(e){this.player.hand.set(e.cardID,e)}drawCard(e){if(this.isPlayerTurn&&1===this.phase||e){let t=this.player.deck.get(this.player.deck.size-1);this.player.removeToDeck(this.player.deck.size-1),this.addToHand(t);const i=document.getElementById("player-hand"),a=document.createElement("div"),r=document.createElement("img"),l=document.createElement("img"),d=document.createElement("img"),c=document.body,o=c.getBoundingClientRect().width/100*10;r.src="./assets/card/front.png",l.src=`../public/assets/monster/${t.name}.png`,d.src=`../public/assets/part/type/${t.type}.png`,a.classList.add("card","card-on-hand"),r.classList.add("card-part"),l.classList.add("card-part"),d.classList.add("card-part"),a.append(r),a.append(d),a.id=`card-${t.cardID}`,a.style.left=window.innerWidth-o-(20+5*this.player.deck.size)+"px",a.addEventListener("mouseover",(()=>{a.style.zIndex="2",a.style.transform+="translateY(-20px)",h.innerText=`\n                cardID: ${t.cardID}\n                name: ${t.name}\n                type: ${t.type}\n                sacrifice: ${t.sacrifice}\n                health: ${t.heal}\n                attack: ${t.atk}\n                defence: ${t.def}\n                `})),a.addEventListener("mouseout",(()=>{a.style.zIndex="1",a.style.transform+="translateY(20px)",h.innerText=""})),i.append(a);const p=r.getBoundingClientRect().width/156;d.style.width=20*p+"px",d.style.transform=`translate(${68*p}px, ${168*p}px)`;for(let e=0;e<t.sacrifice.length;e++){const i=document.createElement("img");i.src=`../public/assets/part/sacrifice/${t.sacrifice[e]}.png`,i.classList.add("card-part"),a.append(i),i.style.width=28*p+"px",i.style.transform=`translate(${16*p+32*p*e}px, ${132*p}px)`}if(a.append(l),t.atk<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.atk}.png`,e.classList.add("card-part"),a.append(e),e.style.width=12*p+"px",e.style.transform=`translate(${104*p}px, ${192*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.atk/10)}.png`,i.src=`../public/assets/part/number/${t.atk%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),a.append(e,i),e.style.width=12*p+"px",i.style.width=12*p+"px",e.style.transform=`translate(${96*p}px, ${192*p}px)`,i.style.transform=`translate(${112*p}px, ${192*p}px)`}if(t.def<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.def}.png`,e.classList.add("card-part"),a.append(e),e.style.width=12*p+"px",e.style.transform=`translate(${130*p}px, ${224*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.def/10)}.png`,i.src=`../public/assets/part/number/${t.def%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),a.append(e,i),e.style.width=12*p+"px",i.style.width=12*p+"px",e.style.transform=`translate(${122*p}px, ${224*p}px)`,i.style.transform=`translate(${138*p}px, ${224*p}px)`}if(t.heal<10){const e=document.createElement("img");e.src=`../public/assets/part/number/${t.heal}.png`,e.classList.add("card-part"),a.append(e),e.style.width=12*p+"px",e.style.transform=`translate(${26*p}px, ${206*p}px)`}else{const e=document.createElement("img"),i=document.createElement("img");e.src=`../public/assets/part/number/${Math.floor(t.heal/10)}.png`,i.src=`../public/assets/part/number/${t.heal%10}.png`,e.classList.add("card-part"),i.classList.add("card-part"),a.append(e,i),e.style.width=12*p+"px",i.style.width=12*p+"px",e.style.transform=`translate(${18*p}px, ${206*p}px)`,i.style.transform=`translate(${34*p}px, ${206*p}px)`}a.style.height=260*p+"px",setTimeout((()=>{a.style.left=20+120*(this.player.hand.size-1)+"px"}),50),a.addEventListener("click",(()=>s(this,void 0,void 0,(function*(){if(this.isPlayerTurn&&!this.field.isArranging&&!this.field.isSacrificing&&this.numOfCardOnField().player.total>=t.sacrifice.length&&this.numOfCardOnField().player.types[1]>=t.sacrifice.filter((e=>1===e)).length&&this.numOfCardOnField().player.types[2]>=t.sacrifice.filter((e=>2===e)).length&&this.numOfCardOnField().player.types[3]>=t.sacrifice.filter((e=>3===e)).length){a.style.transform+=`translateY(${c.getBoundingClientRect().height/2}px)`,this.player.removeToHand(t.cardID),this.newArrange(t),yield(0,n.Wait)(.2),i.removeChild(a);let e=0;this.player.hand.forEach((t=>{document.getElementById(`card-${t.cardID}`).style.left=20+120*e+"px",e++}))}})))),e||this.phase++}}intellect(){return s(this,void 0,void 0,(function*(){let e,t,i=0;const s=this.opponent.hand,a=this.field.fieldArrange.opponent,r=this.field.fieldArrange.player;for(const[n,l]of s)for(let s=0;s<this.numOfCardZone;s++)if(r[s]&&!a[s]){const n=l.atk;i<n&&(i=n,e=l,t=s)}e&&(yield(0,n.Wait)(1),this.field.placeCard(e,t,this.isPlayerTurn),this.opponent.removeToHand(e.cardID)),yield(0,n.Wait)(1),this.battle((()=>{this.turnChange()}))}))}init(){const e=document.getElementById("player-deck");c.addEventListener("click",(()=>{this.isPlayerTurn&&(this.phase>1||this.player.deck.size<=0)&&!this.field.isArranging&&!this.field.isSacrificing&&this.battle((()=>{this.turnChange()}))})),c.classList.add("bell-pushed"),this.isPlayerTurn?c.classList.remove("bell-pushed"):c.classList.add("bell-pushed"),this.field.init(),this.player.initHand(),this.field.placeCard(new a.Card(Object.assign({cardID:14},l.test)),4,!1),e.addEventListener("click",(()=>{this.player.hand.size<10&&this.player.deck.size>0&&this.drawCard()}))}}},87:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Field=void 0;const a=i(101),r=n(i(10)),l=document.getElementById("canvas").getContext("2d"),d=document.getElementById("card-info-on-field"),c=document.body,o=window.devicePixelRatio,p="../public/assets/card-zone.png";let h,u;t.Field=class{constructor(e){this.isOn=!1,this.isArranging=!1,this.isSacrificing=!1,this.fieldAxis={opponent:[],player:[]},this.fieldArrange={opponent:[],player:[]},this.canvasCardObjects={opponent:new Map,player:new Map},this.selectedSacrificeCard=[],this.isPlayerTurn=!0,this.numOfCardZone=e,this.loop=this.loop.bind(this)}draw(){const e=Math.floor(c.getBoundingClientRect().height*o/100*60/2-u+4),t=Math.floor(c.getBoundingClientRect().width*o/2-h*this.numOfCardZone/2+4*(this.numOfCardZone-1)/2);for(let i=0;i<2;i++)for(let s=0;s<this.numOfCardZone;s++){const n=t+(h-4)*s,a=e+(u-4)*i;l.drawImage(r.default.get(p),n,a)}}renderCard(){this.canvasCardObjects.opponent.forEach((e=>{e.draw(),e.rander()})),this.canvasCardObjects.player.forEach((e=>{e.draw(),e.rander()}))}selectCard(e,t){return s(this,void 0,void 0,(function*(){this.selectedCard=e,e.sacrifice.length<1?this.isArranging=!0:this.isSacrificing=!0,this.isPlayerTurn=t}))}placeCard(e,t,i){i?this.fieldArrange.player[t]||(this.fieldArrange.player[t]=e,this.canvasCardObjects.player.set(e.cardID,new a.CanvasCardObject(e,i,{x:this.fieldAxis.player[t].x,y:this.fieldAxis.player[t].y}))):this.fieldArrange.opponent[t]||(this.fieldArrange.opponent[t]=e,this.canvasCardObjects.opponent.set(e.cardID,new a.CanvasCardObject(e,i,{x:this.fieldAxis.opponent[t].x,y:this.fieldAxis.opponent[t].y})))}kill(e,t){0===e?(this.canvasCardObjects.opponent.delete(this.fieldArrange.opponent[t].cardID),this.fieldArrange.opponent[t]=void 0):1===e&&(this.canvasCardObjects.player.delete(this.fieldArrange.player[t].cardID),this.fieldArrange.player[t]=void 0)}loop(){l.clearRect(0,0,c.getBoundingClientRect().width*o,c.getBoundingClientRect().height*o),this.isOn&&(this.draw(),this.renderCard(),requestAnimationFrame(this.loop))}init(){return s(this,void 0,void 0,(function*(){h=r.default.get(p).width,u=r.default.get(p).height;const e=Math.floor(c.getBoundingClientRect().height*o/100*60/2-u+4),t=Math.floor(c.getBoundingClientRect().width*o/2-h*this.numOfCardZone/2+4*(this.numOfCardZone-1)/2);for(let i=0;i<2;i++)for(let s=0;s<this.numOfCardZone;s++){const n=t+(h-4)*s,a=e+(u-4)*i;0===i?this.fieldAxis.opponent.push({x:n,y:a}):this.fieldAxis.player.push({x:n,y:a})}window.addEventListener("click",(e=>{const t=e.clientX,i=e.clientY;if(this.isArranging&&t&&i)for(let e=0;e<this.numOfCardZone;e++)t>this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+u)/o&&(this.fieldArrange.player[e]||(this.placeCard(this.selectedCard,e,this.isPlayerTurn),this.isArranging=!1));if(this.isSacrificing&&t&&i)for(let e=0;e<this.numOfCardZone;e++)t>this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+u)/o&&this.fieldArrange.player[e]&&(this.selectedCard.sacrifice[this.selectedSacrificeCard.length]!==this.fieldArrange.player[e].type&&0!==this.selectedCard.sacrifice[this.selectedSacrificeCard.length]||(this.selectedSacrificeCard.push(e),this.kill(1,e),this.selectedSacrificeCard.length===this.selectedCard.sacrifice.length&&(this.selectedSacrificeCard=[],this.isSacrificing=!1,this.isArranging=!0)))})),window.addEventListener("mousemove",(e=>{const t=e.clientX,i=e.clientY;d.innerText="";for(let e=0;e<this.numOfCardZone;e++){if(t>=this.fieldAxis.opponent[e].x/o&&t<(this.fieldAxis.opponent[e].x+h)/o&&i>=this.fieldAxis.opponent[e].y/o&&i<(this.fieldAxis.opponent[e].y+u)/o&&this.fieldArrange.opponent[e]){const t=this.fieldArrange.opponent[e];d.innerText=`\n                                cardID: ${t.cardID}\n                                name: ${t.name}\n                                type: ${t.type}\n                                sacrifice: ${t.sacrifice}\n                                health: ${t.heal}\n                                attack: ${t.atk}\n                                defence: ${t.def}\n                            `}if(t>=this.fieldAxis.player[e].x/o&&t<(this.fieldAxis.player[e].x+h)/o&&i>=this.fieldAxis.player[e].y/o&&i<(this.fieldAxis.player[e].y+u)/o&&this.fieldArrange.player[e]){const t=this.fieldArrange.player[e];d.innerText=`\n                                cardID: ${t.cardID}\n                                name: ${t.name}\n                                type: ${t.type}\n                                sacrifice: ${t.sacrifice}\n                                health: ${t.heal}\n                                attack: ${t.atk}\n                                defence: ${t.def}\n                            `}}}));for(let e=0;e<this.numOfCardZone;e++)this.fieldArrange.player.push(void 0),this.fieldArrange.opponent.push(void 0);requestAnimationFrame(this.loop)}))}}},768:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const n=i(826);t.Card=class{constructor(e){this.cardID=e.cardID,this.name=e.name,this.type=e.type,this.sacrifice=e.sacrifice,this.atk=e.attack,this.def=e.defence,this.heal=e.health,this.abilities=e.abilities}damage(e){return s(this,void 0,void 0,(function*(){for(let t=0;t<e&&(yield(0,n.Wait)(.15/e),this.heal-=1,console.log(this.heal),!(this.heal<=0));t++);}))}}},630:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Opponent=void 0,t.Opponent=class{constructor(e){this.hand=new Map,this.deck=new Map,this.name=e}addToHand(e){this.hand.set(e.cardID,e)}addToDeck(e){this.deck.set(this.deck.size,e)}removeToHand(e){this.hand.delete(e)}removeToDeck(e){this.deck.delete(e)}}},363:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0,t.Player=class{constructor(e){this.hand=new Map,this.deck=new Map,this.name=e}initHand(){this.hand.clear()}addToDeck(e){this.deck.set(e.cardID,e),this.updateDeck()}removeToDeck(e){this.deck.delete(e),this.updateDeck()}removeToHand(e){this.hand.delete(e)}updateDeck(){const e=document.getElementById("player-deck");e.replaceChildren(),this.deck.forEach(((t,i)=>{const s=document.createElement("img");s.src="./assets/card/back.png",s.alt=t.name,s.classList.add("card"),s.style.right=5*i+20+"px",e.append(s)}))}}},25:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Scenario=void 0;const n=i(826),a=i(221),r=document.getElementById("bell"),l=document.getElementById("player-container"),d=document.getElementById("card-info"),c=document.getElementById("scenario-container"),o=document.body;class p{static on(){return s(this,void 0,void 0,(function*(){this.isScenarioOn||(a.World.pause(),c.classList.remove("hidden"),yield(0,n.Wait)(.1),r.style.transform=`translate(0px, ${o.getBoundingClientRect().height/100*40+90}px)`,l.style.transform=`translate(0px, ${o.getBoundingClientRect().height/100*40}px)`,d.style.transform="translate(500px, 0px)",yield(0,n.Wait)(.1),c.classList.remove("scenario-off"),c.classList.add("scenario-on"),this.isScenarioOn=!0)}))}static off(){return s(this,void 0,void 0,(function*(){this.isScenarioOn&&(c.classList.add("scenario-off"),c.classList.remove("scenario-on"),yield(0,n.Wait)(.1),r.style.transform="translate(0px, 90px)",l.style.transform="translate(0px, 0px)",yield(0,n.Wait)(.1),c.classList.add("hidden"),this.isScenarioOn=!1)}))}}t.Scenario=p,p.isScenarioOn=!1},759:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(n,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function l(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,l)}d((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Subtitle=void 0;const a=n(i(10)),r=i(221),l=document.body,d=document.getElementById("canvas").getContext("2d"),c=window.devicePixelRatio,o={nurse:"간호사",player:"나"};class p{constructor(e){p.type=e}static load(){if(p.isOn){p.currentSubtitle=p.subtitles[p.index];const e=p.currentSubtitle.split(":")[0],t=p.currentSubtitle.split(":")[1];p.isTextFinished||(p.stringIndex!==t.length-1?(p.time+=1,2===p.time&&(p.stringIndex+=1,p.output+=t[p.stringIndex],p.time=0)):p.isTextFinished=!0);const i=a.default.get("../public/assets/subtitle/subtitleX6.png"),s=a.default.get(`../public/assets/subtitle/profiles/${e}X6.png`);d.font="bold 30px Arial",d.drawImage(i,Math.floor(l.getBoundingClientRect().width*c/2-i.width/2),Math.floor(l.getBoundingClientRect().height*c-i.height-60)),s&&d.drawImage(s,Math.floor(l.getBoundingClientRect().width*c/2-i.width/2+18),Math.floor(l.getBoundingClientRect().height*c-i.height-60+18)),d.fillText(p.output,Math.floor(l.getBoundingClientRect().width*c/2-i.width/2+258),Math.floor(l.getBoundingClientRect().height*c-i.height+96)),d.fillText(o[e],Math.floor(l.getBoundingClientRect().width*c/2-i.width/2+270),Math.floor(l.getBoundingClientRect().height*c-i.height+12))}}static on(e,t){return s(this,void 0,void 0,(function*(){t&&(p.callback=t),r.World.pause(),p.isOn=!0,p.subtitles=e}))}static off(){p.isOn=!1,r.World.start()}static next(){if(p.isTextFinished)p.index+=1,p.stringIndex=-1,p.output="",void 0!==p.subtitles[p.index]?p.currentSubtitle=p.subtitles[p.index]:(p.off(),p.index=-1,p.callback()),p.isTextFinished=!1;else{p.isTextFinished=!0;const e=p.currentSubtitle.split(":")[1];p.output=e}}}t.Subtitle=p,p.isOn=!1,p.index=0,p.callback=()=>{},p.time=0,p.stringIndex=-1,p.isTextFinished=!0,p.output=""},114:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Space=void 0,document.body,window.devicePixelRatio,document.getElementById("canvas").getContext("2d"),t.Space=class{constructor(e,t,i){this.linkedSpace={top:void 0,left:void 0,bottom:void 0,right:void 0},this.entities=new Map,this.backgroundImagePath=e,t.forEach((e=>{this.entities.set(this.entities.size,e)})),i&&(this.linkedSpace=i)}load(){this.entities.forEach((e=>{e.load()}))}init(){}}},221:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.World=void 0;const s=i(147),n=i(638),a=i(759),r=i(924),l=document.body,d=document.getElementById("bell"),c=document.getElementById("player-container"),o=document.getElementById("card-info"),p=document.getElementById("canvas").getContext("2d"),h=window.devicePixelRatio,u={w:!1,a:!1,s:!1,d:!1},f=e=>{"w"===e.key||"W"===e.key?u.w=!0:"a"===e.key||"A"===e.key?u.a=!0:"s"===e.key||"S"===e.key?u.s=!0:"d"!==e.key&&"D"!==e.key||(u.d=!0)},y=e=>{"w"!==e.key&&"W"!==e.key||(u.w=!1),"a"!==e.key&&"A"!==e.key||(u.a=!1),"s"!==e.key&&"S"!==e.key||(u.s=!1),"d"!==e.key&&"D"!==e.key||(u.d=!1)},g=e=>{var t;"e"!==e.key&&"E"!==e.key||((null===(t=x.targetedEventer)||void 0===t?void 0:t.eventAvailability)&&!x.atEvent&&(x.atEvent=!0,x.targetedEventer.event()),a.Subtitle.isOn&&a.Subtitle.next())};let m=window.performance.now();class x{constructor(){x.loop=x.loop.bind(x)}static start(){x.isPause=!1}static pause(){x.isPause=!0}static movePlayer(e){const t={w:!0,a:!0,s:!0,d:!0},i=()=>{x.currentSpace.entities.forEach((e=>{s.Stuff;let i=!0,n=!0,a=!0,r=!0;const l=x.player.x+x.player.w/2-(e.x+e.w/2),d=x.player.y+x.player.h/2-(e.y+e.h/2),c=x.player.w/2+e.w/2,o=x.player.h/2+e.h/2;x.player.x+x.player.w<=e.x&&x.player.y+x.player.h>e.y&&x.player.y<e.y+e.h&&Math.abs(l)<=c&&l<0&&(r=!1),x.player.x+x.player.w>=e.x&&x.player.y+x.player.h>e.y&&x.player.y<e.y+e.h&&Math.abs(l)<=c&&l>0&&(n=!1),x.player.y+x.player.h<=e.y&&x.player.x<e.x+e.w&&x.player.x+x.player.w>e.x&&Math.abs(d)<=o&&d<0&&(a=!1),x.player.y+x.player.h>=e.y&&x.player.x<e.x+e.w&&x.player.x+x.player.w>e.x&&Math.abs(d)<=o&&d>0&&(i=!1),t.d||(r=t.d),t.a||(n=t.a),t.s||(a=t.s),t.w||(i=t.w),t.w=i,t.a=n,t.s=a,t.d=r}))};if(u.w){x.player.state="back";for(let s=0;s<e;s++)i(),t.w&&(x.player.y-=1)}if(u.a){x.player.state="left";for(let s=0;s<e;s++)i(),t.a&&(x.player.x-=1)}if(u.s){x.player.state="front";for(let s=0;s<e;s++)i(),t.s&&(x.player.y+=1)}if(u.d){x.player.state="right";for(let s=0;s<e;s++)i(),t.d&&(x.player.x+=1)}}static render(){x.currentSpace.load(),x.player.load(),a.Subtitle.load()}static loop(e){const t=1e3/60,i=e-m;if(i>=t){if(m=e-i%t,p.clearRect(0,0,window.innerWidth*h,window.innerHeight*h),!x.isOn)return;x.isPause||x.movePlayer(10),x.render(),x.player.y<0?(x.currentSpace.linkedSpace.top&&(x.currentSpace.linkedSpace.top.linkedSpace.bottom=x.currentSpace,x.currentSpace=x.currentSpace.linkedSpace.top),x.player.y=l.getBoundingClientRect().height*h):x.player.y>l.getBoundingClientRect().height*h&&(x.currentSpace.linkedSpace.bottom&&(x.currentSpace.linkedSpace.bottom.linkedSpace.top=x.currentSpace,x.currentSpace=x.currentSpace.linkedSpace.bottom),x.player.y=0),x.player.x<0?(x.currentSpace.linkedSpace.left&&(x.currentSpace.linkedSpace.left.linkedSpace.right=x.currentSpace,x.currentSpace=x.currentSpace.linkedSpace.left),x.player.x=l.getBoundingClientRect().width*h):x.player.x>l.getBoundingClientRect().width*h&&(x.currentSpace.linkedSpace.right&&(x.currentSpace.linkedSpace.right.linkedSpace.left=x.currentSpace,x.currentSpace=x.currentSpace.linkedSpace.right),x.player.x=0)}requestAnimationFrame(x.loop)}static init(){x.currentSpace=r.space0}static on(){window.addEventListener("keydown",f),window.addEventListener("keyup",y),window.addEventListener("keypress",g),d.classList.add("bell-hidden"),c.style.transform=`translate(0px, ${l.getBoundingClientRect().height/100*40}px)`,o.style.transform="translate(500px, 0px)",x.isOn=!0,requestAnimationFrame(x.loop),(0,r.startSpace0Script)()}static off(){window.removeEventListener("keydown",f),window.removeEventListener("keyup",y),window.removeEventListener("keypress",g),d.classList.remove("bell-hidden"),c.style.transform="translate(0px, 0px)",o.style.transform="translate(0px, 0px)",x.isOn=!1}}t.World=x,x.isPause=!1,x.atEvent=!1,x.isOn=!1,x.player=new n.Player("tester",{x:850,y:Math.floor(l.getBoundingClientRect().height/2*h-60),w:60,h:120})},952:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Entity=void 0,t.Entity=class{constructor(e,t){this.name=e,this.x=t.x,this.y=t.y,this.w=t.w,this.h=t.h,this.w=60,this.h=120}}},234:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Npc=void 0;const n=s(i(10)),a=i(221),r=i(952),l=document.getElementById("canvas").getContext("2d");class d extends r.Entity{constructor(){super(...arguments),this.state="front",this.eventAvailability=!1,this.eventType="",this.event=()=>{}}load(){l.drawImage(n.default.get(`../public/assets/world/entity/${this.name}/${this.state}.png`),this.x,this.y),"talk"===this.eventType&&(Math.abs(a.World.player.x-this.x)<120&&Math.abs(a.World.player.y-this.y)<120?(this.eventAvailability=!0,a.World.targetedEventer=this,l.drawImage(n.default.get("../public/assets/world/entity/etc/E.png"),this.x+this.w/2-12,this.y-52)):this.eventAvailability=!1)}addEvent(e,t){this.eventType=e,this.event=t}moveTo(){}}t.Npc=d},638:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;const n=s(i(10)),a=i(952);class r extends a.Entity{constructor(){super(...arguments),this.state="front"}load(){document.getElementById("canvas").getContext("2d").drawImage(n.default.get(`../public/assets/world/entity/player/${this.state}.png`),this.x,this.y)}}t.Player=r},147:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Stuff=void 0;const n=s(i(10)),a=i(952),r=document.getElementById("canvas").getContext("2d");class l extends a.Entity{constructor(e,t,i){super(e,t),this.texturePath=i,this.x=t.x,this.y=t.y,this.w=t.w,this.h=t.h}load(){r.drawImage(n.default.get(this.texturePath),this.x,this.y)}}t.Stuff=l},774:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.bed=void 0;const s=i(147);t.bed=e=>new s.Stuff("bed",{x:e.x,y:e.y,w:60,h:104},"../public/assets/world/entity/bed/front.png")},924:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.space0=t.startSpace0Script=void 0;const s=i(607),n=i(934),a=i(630),r=i(25),l=i(759),d=i(114),c=i(221),o=i(234),p=i(774),h=document.body,u=window.devicePixelRatio,f=new o.Npc("nurse",{x:500,y:Math.floor(h.getBoundingClientRect().height/2*u-62),w:60,h:124});t.startSpace0Script=()=>{r.Scenario.on(),f.addEvent("talk",(()=>{l.Subtitle.on(["nurse: 좋은 아침이야","nurse: 몸은 좀 어떠니?","player: ...","nurse: 어지럽거나 하지는 않니?","player: .......","nurse: 음...","nurse: 많이 심심하지?!","nurse: 최근 우리 병동에서 유행하는 카드 게임 알고 있니?","nurse: 한번 해보지 않을래?"],(()=>{const e=new a.Opponent("loti"),t=new n.Game(5,{player:s.player,opponent:e});c.World.off(),t.start()}))}))},t.space0=new d.Space("../public/assets/world/bg/space1/1.png",[(0,p.bed)({x:Math.floor(h.getBoundingClientRect().width/2*u-30),y:Math.floor(h.getBoundingClientRect().height/2*u-52)}),f],{top:new d.Space("../public/assets/world/bg/space1/1.png",[])})},177:e=>{e.exports=JSON.parse('{"bird":{"name":"bird","type":1,"sacrifice":[],"attack":5,"defence":1,"health":1,"abilities":""}}')},635:e=>{e.exports=JSON.parse('{"fish":{"name":"fish","type":3,"sacrifice":[],"attack":0,"defence":1,"health":2,"abilities":""}}')},495:e=>{e.exports=JSON.parse('{"shark":{"name":"shark","type":3,"sacrifice":[3,3,3],"attack":5,"defence":3,"health":5,"abilities":""}}')},384:e=>{e.exports=JSON.parse('{"test":{"name":"human","type":1,"sacrifice":[0,0,0,0],"attack":99,"defence":99,"health":99,"abilities":"double-attack"}}')}},t={};!function i(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,i),a.exports}(607)})();