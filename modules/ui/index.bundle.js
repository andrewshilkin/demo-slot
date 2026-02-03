/**
 * DEMO VERSION - FOR DEMONSTRATION PURPOSES ONLY
 *
 * This code is proprietary and protected by copyright law.
 * All rights reserved. Unauthorized copying, modification,
 * distribution, or use of this software is strictly prohibited.
 *
 * (c) 2026 Machina Slot Engine. All Rights Reserved.
 */
"use strict";var Module_ui=(()=>{var b=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var P=Object.prototype.hasOwnProperty;var a=(r,e)=>b(r,"name",{value:e,configurable:!0});var U=(r,e)=>{for(var n in e)b(r,n,{get:e[n],enumerable:!0})},L=(r,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of M(e))!P.call(r,s)&&s!==n&&b(r,s,{get:()=>e[s],enumerable:!(i=A(e,s))||i.enumerable});return r};var _=r=>L(b({},"__esModule",{value:!0}),r);var F={};U(F,{BottomPanel:()=>m,FreeSpinsIndicator:()=>h,GameToUIEvents:()=>g,SpinButton:()=>u,UIBridge:()=>S,UIEvents:()=>l,UIModule:()=>f,UIState:()=>E,getUIModule:()=>D,initializeUI:()=>v,uiBridge:()=>d,uiState:()=>t});var l=(c=>(c.SPIN_CLICKED="ui:spin:clicked",c.STOP_CLICKED="ui:stop:clicked",c.BET_INCREASED="ui:bet:increased",c.BET_DECREASED="ui:bet:decreased",c.BET_MAX="ui:bet:max",c.UI_READY="ui:ready",c))(l||{}),g=(o=>(o.SPIN_STARTED="game:spin:started",o.SPIN_STOPPED="game:spin:stopped",o.BALANCE_CHANGED="game:balance:changed",o.BET_CHANGED="game:bet:changed",o.WIN_AMOUNT="game:win:amount",o.GAME_READY="game:ready",o.GAME_BUSY="game:busy",o.FREE_SPINS_STARTED="game:freespins:started",o.FREE_SPINS_UPDATE="game:freespins:update",o.FREE_SPINS_ENDED="game:freespins:ended",o.FREE_SPINS_FLOW_COMPLETE="game:freespins:flow:complete",o))(g||{});var y=class y{constructor(){this.state={isSpinning:!1,canSpin:!0,balance:1e3,currentBet:10,availableBets:[1,5,10,25,50,100],lastWin:0,freeSpinsRemaining:0,freeSpinsActive:!1,isReady:!1};this.listeners=new Map}get(e){return this.state[e]}set(e,n){let i=this.state[e];i!==n&&(this.state[e]=n,this.notify(e,n,i))}on(e,n){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n),()=>{this.listeners.get(e)?.delete(n)}}notify(e,n,i){let s=this.listeners.get(e);s&&s.forEach(p=>p(n,i))}getSnapshot(){return{...this.state}}update(e){for(let[n,i]of Object.entries(e))this.set(n,i)}increaseBet(){let{currentBet:e,availableBets:n}=this.state,i=n.indexOf(e);i<n.length-1&&this.set("currentBet",n[i+1])}decreaseBet(){let{currentBet:e,availableBets:n}=this.state,i=n.indexOf(e);i>0&&this.set("currentBet",n[i-1])}setMaxBet(){let{availableBets:e}=this.state;this.set("currentBet",e[e.length-1])}};a(y,"UIState");var E=y,t=new E;var I=class I{constructor(){this.unsubscribers=[]}initialize(){console.log("\u{1F309} UIBridge: Initializing..."),this.setupUIEventListeners(),this.setupGameEventListeners(),this.setupFSMListeners(),console.log("\u2705 UIBridge: Initialized")}setupUIEventListeners(){let e=window.GAME.events.app;e.on("ui:spin:clicked",()=>{console.log("\u{1F3B0} UIBridge: Spin clicked"),this.handleSpinClick()}),e.on("ui:stop:clicked",()=>{console.log("\u{1F6D1} UIBridge: Stop clicked"),this.handleStopClick()}),e.on("ui:bet:increased",()=>{t.get("isSpinning")||(t.increaseBet(),this.emitBetChanged())}),e.on("ui:bet:decreased",()=>{t.get("isSpinning")||(t.decreaseBet(),this.emitBetChanged())}),e.on("ui:bet:max",()=>{t.get("isSpinning")||(t.setMaxBet(),this.emitBetChanged())})}setupGameEventListeners(){let e=window.GAME.events.app;e.on("game:spin:started",()=>{t.set("lastWin",0),t.get("freeSpinsActive")&&(t.set("isSpinning",!0),t.set("canSpin",!1))}),e.on("game:spin:stopped",()=>{t.get("freeSpinsActive")&&t.set("isSpinning",!1)}),e.on("game:balance:changed",n=>{t.set("balance",n.balance)}),e.on("game:win:amount",n=>{if(t.get("freeSpinsActive")){let i=t.get("lastWin");t.set("lastWin",i+n.amount)}else t.set("lastWin",n.amount)}),e.on("game:freespins:started",n=>{t.set("freeSpinsRemaining",n.count),t.set("freeSpinsActive",!0),t.set("isSpinning",!1)}),e.on("game:freespins:update",n=>{t.set("freeSpinsRemaining",n.remaining)}),e.on("game:freespins:ended",()=>{t.set("freeSpinsRemaining",0)}),e.on("game:freespins:flow:complete",()=>{t.set("freeSpinsActive",!1)})}setupFSMListeners(){let e=window.GAME.fsm}handleSpinClick(){let e=t.get("balance"),n=t.get("currentBet");if(e<n){console.warn("\u26A0\uFE0F UIBridge: Insufficient balance");return}t.set("balance",e-n),t.set("isSpinning",!0),t.set("canSpin",!1),window.GAME.events.app.emit("game:spin:started"),this.triggerSpinFlow()}handleStopClick(){console.log("\u{1F6D1} UIBridge: Stop clicked \u2014 handled by SkipController")}async triggerSpinFlow(){try{await window.GAME.di.resolve("SpinFlowController").runSpin(),this.handleSpinComplete()}catch(e){console.error("\u274C UIBridge: Spin flow error:",e),this.handleSpinComplete()}}handleSpinComplete(){t.set("isSpinning",!1),t.set("canSpin",!0),window.GAME.events.app.emit("game:spin:stopped")}emitBetChanged(){window.GAME.events.app.emit("game:bet:changed",{bet:t.get("currentBet"),bets:t.get("availableBets")})}setInitialBalance(e){t.set("balance",e)}setAvailableBets(e){t.set("availableBets",e),e.includes(t.get("currentBet"))||t.set("currentBet",e[0])}destroy(){this.unsubscribers.forEach(e=>e()),this.unsubscribers=[]}};a(I,"UIBridge");var S=I,d=new S;var x=class x{constructor(){this.isSpinning=!1;this.isPortrait=!1;this.element=this.createElement(),this.setupEventListeners(),this.subscribeToState(),this.setupOrientationListener(),this.updatePosition()}createElement(){let e=document.createElement("button");return e.id="spin-button",e.textContent="SPIN",e.style.cssText=`
      position: fixed;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #FFD700;
      background: linear-gradient(145deg, #4CAF50, #2E7D32);
      color: white;
      font-size: 18px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.2s ease;
      z-index: 1000;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      touch-action: manipulation;
    `,e.addEventListener("mouseenter",()=>{this.isSpinning||(e.style.transform=this.getTransform(1.05),e.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.4)")}),e.addEventListener("mouseleave",()=>{e.style.transform=this.getTransform(1),e.style.boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)"}),e.addEventListener("mousedown",()=>{e.style.transform=this.getTransform(.95)}),e.addEventListener("mouseup",()=>{e.style.transform=this.getTransform(1)}),e}getTransform(e){return this.isPortrait?`translateX(-50%) scale(${e})`:`translateY(-50%) scale(${e})`}setupEventListeners(){this.element.addEventListener("click",()=>{this.isSpinning?(window.GAME.events.app.emit("ui:stop:clicked"),this.element.style.display="none"):window.GAME.events.app.emit("ui:spin:clicked")})}setupOrientationListener(){window.addEventListener("resize",()=>this.updatePosition()),window.matchMedia("(orientation: portrait)").addEventListener("change",()=>{this.updatePosition()})}updatePosition(){this.isPortrait=window.innerHeight>window.innerWidth,this.isPortrait?(this.element.style.right="auto",this.element.style.top="auto",this.element.style.left="50%",this.element.style.bottom="20%",this.element.style.transform="translateX(-50%)"):(this.element.style.left="auto",this.element.style.bottom="auto",this.element.style.right="3%",this.element.style.top="50%",this.element.style.transform="translateY(-50%)")}subscribeToState(){t.on("isSpinning",e=>{this.isSpinning=e,e?this.element.style.display="":t.get("freeSpinsActive")?this.element.style.display="none":this.element.style.display="",this.updateVisual()}),t.on("canSpin",e=>{this.element.disabled=!e&&!this.isSpinning,this.element.style.opacity=this.element.disabled?"0.5":"1",this.element.style.cursor=this.element.disabled?"not-allowed":"pointer"}),window.GAME.events.app.on("game:result:show",()=>{this.isSpinning&&(this.element.style.display="")}),t.on("freeSpinsActive",e=>{e?this.element.style.display="none":this.element.style.display=""})}updateVisual(){this.isSpinning?(this.element.textContent="STOP",this.element.style.background="linear-gradient(145deg, #f44336, #c62828)",this.element.style.borderColor="#FF5722"):(this.element.textContent="SPIN",this.element.style.background="linear-gradient(145deg, #4CAF50, #2E7D32)",this.element.style.borderColor="#FFD700")}getElement(){return this.element}destroy(){this.element.remove()}};a(x,"SpinButton");var u=x;var B=class B{constructor(){this.element=this.createElement(),this.subscribeToState(),this.updateBalance(t.get("balance")),this.updateBet(t.get("currentBet")),this.updateWin(t.get("lastWin"))}createElement(){let e=document.createElement("div");e.id="bottom-panel",e.style.cssText=`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: rgba(26, 26, 46, 0.95);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      z-index: 1000;
      font-family: Arial, sans-serif;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
    `;let n=this.createSection("BALANCE","#FFFFFF");this.balanceValue=n.querySelector(".value"),e.appendChild(n);let i=this.createBetSection();e.appendChild(i);let s=this.createSection("WIN","#4CAF50");return this.winValue=s.querySelector(".value"),e.appendChild(s),e}createSection(e,n){let i=document.createElement("div");i.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;
      flex: 1;
    `;let s=document.createElement("span");s.textContent=e,s.style.cssText=`
      font-size: 10px;
      color: #888888;
      margin-bottom: 2px;
    `;let p=document.createElement("span");return p.className="value",p.textContent="$0.00",p.style.cssText=`
      font-size: 16px;
      font-weight: bold;
      color: ${n};
    `,i.appendChild(s),i.appendChild(p),i}createBetSection(){let e=document.createElement("div");e.style.cssText=`
      display: flex;
      align-items: center;
      gap: 6px;
    `,this.betMinusBtn=this.createButton("-",()=>{window.GAME.events.app.emit("ui:bet:decreased")});let n=document.createElement("div");n.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;
    `;let i=document.createElement("span");return i.textContent="BET",i.style.cssText=`
      font-size: 10px;
      color: #888888;
      margin-bottom: 2px;
    `,this.betValue=document.createElement("span"),this.betValue.className="value",this.betValue.textContent="$10.00",this.betValue.style.cssText=`
      font-size: 16px;
      font-weight: bold;
      color: #FFD700;
    `,n.appendChild(i),n.appendChild(this.betValue),this.betPlusBtn=this.createButton("+",()=>{window.GAME.events.app.emit("ui:bet:increased")}),e.appendChild(this.betMinusBtn),e.appendChild(n),e.appendChild(this.betPlusBtn),e}createButton(e,n){let i=document.createElement("button");return i.textContent=e,i.style.cssText=`
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: none;
      background: #333333;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      touch-action: manipulation;
    `,i.addEventListener("click",n),i.addEventListener("mouseenter",()=>{i.style.background="#555555"}),i.addEventListener("mouseleave",()=>{i.style.background="#333333"}),i}subscribeToState(){t.on("balance",e=>this.updateBalance(e)),t.on("currentBet",e=>this.updateBet(e)),t.on("lastWin",e=>this.updateWin(e)),t.on("isSpinning",e=>this.updateButtonsState(!e))}updateBalance(e){this.balanceValue.textContent=this.formatCurrency(e)}updateBet(e){this.betValue.textContent=this.formatCurrency(e)}updateWin(e){this.winValue.textContent=this.formatCurrency(e),this.winValue.style.color=e>0?"#4CAF50":"#666666"}updateButtonsState(e){this.betMinusBtn.disabled=!e,this.betPlusBtn.disabled=!e,this.betMinusBtn.style.opacity=e?"1":"0.5",this.betPlusBtn.style.opacity=e?"1":"0.5",this.betMinusBtn.style.cursor=e?"pointer":"not-allowed",this.betPlusBtn.style.cursor=e?"pointer":"not-allowed"}formatCurrency(e){return"$"+e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}getElement(){return this.element}destroy(){this.element.remove()}};a(B,"BottomPanel");var m=B;var T=class T{constructor(){this.element=this.createElement(),this.subscribeToState()}createElement(){let e=document.createElement("div");return e.id="free-spins-indicator",e.textContent="",e.style.cssText=`
      position: fixed;
      top: 16px;
      right: 16px;
      display: none;
      padding: 8px 24px;
      border-radius: 20px;
      border: 2px solid #FFD700;
      background: rgba(26, 26, 46, 0.9);
      color: #FFD700;
      font-size: 18px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      text-align: center;
      white-space: nowrap;
      z-index: 1000;
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
    `,e}subscribeToState(){t.on("freeSpinsRemaining",e=>{e>0?(this.element.textContent=`FREE SPINS: ${e}`,this.element.style.display="block"):this.element.style.display="none"})}getElement(){return this.element}destroy(){this.element.remove()}};a(T,"FreeSpinsIndicator");var h=T;var C=class C{constructor(){this.spinButton=null;this.bottomPanel=null;this.freeSpinsIndicator=null;this.initialized=!1}initialize(){if(this.initialized)return;console.log("\u{1F3A8} UIModule: Initializing HTML UI..."),d.initialize();let e=window.GAME?.di?.resolve("initResponse");e?.user?.balance!==void 0&&t.set("balance",e.user.balance),this.spinButton=new u,this.bottomPanel=new m,this.freeSpinsIndicator=new h,document.body.appendChild(this.spinButton.getElement()),document.body.appendChild(this.bottomPanel.getElement()),document.body.appendChild(this.freeSpinsIndicator.getElement()),t.set("isReady",!0),window.GAME.events.app.emit("ui:ready"),this.initialized=!0,console.log("\u2705 UIModule: HTML UI Initialized")}setGameData(e){e.balance!==void 0&&d.setInitialBalance(e.balance),e.bets&&d.setAvailableBets(e.bets)}destroy(){d.destroy(),this.spinButton?.destroy(),this.bottomPanel?.destroy(),this.freeSpinsIndicator?.destroy(),this.initialized=!1}};a(C,"UIModule");var f=C,w=null;function D(){return w||(w=new f),w}a(D,"getUIModule");function v(){D().initialize()}a(v,"initializeUI");console.log("\u{1F3A8} UI Module: Script loaded, setting up initialization...");var N=window.GAME?.fsm?.getCurrent()?.name;N==="Idle"?(console.log("\u{1F3A8} UI Module: Game already Idle, initializing UI now"),v()):(console.log("\u{1F3A8} UI Module: Waiting for game:ready event..."),window.GAME.events.app.on("game:ready",()=>{console.log("\u{1F3A8} UI Module: game:ready received, initializing UI"),v()}));console.log("\u2705 UI Module entry point executed");return _(F);})();
