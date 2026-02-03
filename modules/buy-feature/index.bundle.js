/**
 * DEMO VERSION - FOR DEMONSTRATION PURPOSES ONLY
 *
 * This code is proprietary and protected by copyright law.
 * All rights reserved. Unauthorized copying, modification,
 * distribution, or use of this software is strictly prohibited.
 *
 * (c) 2026 Machina Slot Engine. All Rights Reserved.
 */
"use strict";var Module_buy_feature=(()=>{var c=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var w=Object.prototype.hasOwnProperty;var r=(o,e)=>c(o,"name",{value:e,configurable:!0});var C=(o,e)=>{for(var i in e)c(o,i,{get:e[i],enumerable:!0})},L=(o,e,i,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of B(e))!w.call(o,n)&&n!==i&&c(o,n,{get:()=>e[n],enumerable:!(t=F(e,n))||t.enumerable});return o};var M=o=>L(c({},"__esModule",{value:!0}),o);var z={};C(z,{BUY_CONFIRMED:()=>g,BUY_FAILED:()=>x,BUY_STARTED:()=>v,BuyButton:()=>a,BuyFeatureModule:()=>p,BuyPopup:()=>l,getBuyFeatureModule:()=>b,initializeBuyFeature:()=>u});var y=class y{constructor(e){this.onClick=e,this.element=this.createElement(),this.setupEventListeners()}createElement(){let e=document.createElement("button");return e.id="buy-feature-button",e.textContent="BUY BONUS",e.style.cssText=`
      position: fixed;
      left: 16px;
      bottom: 60px;
      width: 130px;
      height: 50px;
      border-radius: 25px;
      border: 3px solid #FFD700;
      background: linear-gradient(145deg, #7B1FA2, #4A148C);
      color: #FFD700;
      font-size: 14px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
      z-index: 1000;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      touch-action: manipulation;
      letter-spacing: 1px;
    `,e.addEventListener("mouseenter",()=>{e.style.transform="scale(1.05)",e.style.boxShadow="0 6px 20px rgba(123, 31, 162, 0.5)"}),e.addEventListener("mouseleave",()=>{e.style.transform="scale(1)",e.style.boxShadow="0 4px 15px rgba(0, 0, 0, 0.4)"}),e.addEventListener("mousedown",()=>{e.style.transform="scale(0.95)"}),e.addEventListener("mouseup",()=>{e.style.transform="scale(1.05)"}),e}setupEventListeners(){this.element.addEventListener("click",()=>{this.onClick()})}setVisible(e){this.element.style.display=e?"":"none"}getElement(){return this.element}destroy(){this.element.remove()}};r(y,"BuyButton");var a=y;var h=class h{constructor(e,i,t){this.options=[];this.options=e,this.onSelect=i,this.onClose=t,this.overlay=this.createOverlay(),this.panel=this.createPanel(),this.overlay.appendChild(this.panel),this.overlay.style.display="none"}createOverlay(){let e=document.createElement("div");return e.id="buy-feature-overlay",e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `,e.addEventListener("click",i=>{i.target===e&&(this.hide(),this.onClose())}),e}createPanel(){let e=document.createElement("div");e.style.cssText=`
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
      border: 3px solid #FFD700;
      border-radius: 16px;
      padding: 32px;
      min-width: 360px;
      max-width: 480px;
      box-shadow: 0 0 40px rgba(255, 215, 0, 0.2);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;let i=document.createElement("h2");i.textContent="BUY BONUS",i.style.cssText=`
      text-align: center;
      color: #FFD700;
      font-family: Arial, sans-serif;
      font-size: 28px;
      font-weight: bold;
      margin: 0 0 24px 0;
      letter-spacing: 3px;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    `,e.appendChild(i),this.options.forEach((n,d)=>{e.appendChild(this.createOptionCard(n,d))});let t=document.createElement("button");return t.textContent="CLOSE",t.style.cssText=`
      display: block;
      width: 100%;
      margin-top: 16px;
      padding: 12px;
      border: 2px solid #666;
      border-radius: 8px;
      background: transparent;
      color: #999;
      font-size: 14px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 1px;
    `,t.addEventListener("mouseenter",()=>{t.style.borderColor="#999",t.style.color="#ccc"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="#666",t.style.color="#999"}),t.addEventListener("click",()=>{this.hide(),this.onClose()}),e.appendChild(t),e}createOptionCard(e,i){let t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 215, 0, 0.3);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      transition: all 0.2s ease;
    `,t.addEventListener("mouseenter",()=>{t.style.borderColor="rgba(255, 215, 0, 0.6)",t.style.background="rgba(255, 255, 255, 0.08)"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="rgba(255, 215, 0, 0.3)",t.style.background="rgba(255, 255, 255, 0.05)"});let n=document.createElement("div");n.style.cssText="flex: 1; margin-right: 16px;";let d=document.createElement("div");d.textContent=e.title,d.style.cssText=`
      color: #fff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    `;let m=document.createElement("div");m.textContent=e.description,m.style.cssText=`
      color: #aaa;
      font-family: Arial, sans-serif;
      font-size: 12px;
    `,n.appendChild(d),n.appendChild(m);let s=document.createElement("button");return s.textContent=`${e.price}`,s.style.cssText=`
      min-width: 80px;
      padding: 10px 16px;
      border: 2px solid #FFD700;
      border-radius: 8px;
      background: linear-gradient(145deg, #7B1FA2, #4A148C);
      color: #FFD700;
      font-size: 16px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    `,s.addEventListener("mouseenter",()=>{s.style.transform="scale(1.05)",s.style.boxShadow="0 4px 15px rgba(123, 31, 162, 0.5)"}),s.addEventListener("mouseleave",()=>{s.style.transform="scale(1)",s.style.boxShadow="none"}),s.addEventListener("click",()=>{this.onSelect(i,e.price)}),t.appendChild(n),t.appendChild(s),t}show(){this.overlay.style.display="flex",this.overlay.offsetHeight,this.overlay.style.opacity="1",this.panel.style.transform="scale(1)"}hide(){this.overlay.style.opacity="0",this.panel.style.transform="scale(0.9)",setTimeout(()=>{this.overlay.style.display="none"},300)}getElement(){return this.overlay}destroy(){this.overlay.remove()}};r(h,"BuyPopup");var l=h;var g="buyFeature:confirm",v="buyFeature:started",x="buyFeature:failed",E=class E{constructor(){this.button=null;this.popup=null;this.initialized=!1;this.config=null}initialize(){if(this.initialized)return;console.log("\u{1F4B0} BuyFeatureModule: Initializing...");let e=window.GAME.di.resolve("initResponse");if(this.config=e?.buyFeature??null,!this.config||!this.config.enabled){console.log("\u{1F4B0} BuyFeatureModule: Disabled or no config, skipping"),this.initialized=!0;return}this.button=new a(()=>this.openPopup()),this.popup=new l(this.config.options,(i,t)=>this.onOptionSelected(i,t),()=>{}),document.body.appendChild(this.button.getElement()),document.body.appendChild(this.popup.getElement()),this.setupGameListeners(),this.initialized=!0,console.log("\u{1F4B0} BuyFeatureModule: Initialized with",this.config.options.length,"options")}setupGameListeners(){let e=window.GAME.events.app;e.on("game:spin:started",()=>this.button?.setVisible(!1)),e.on("game:spin:stopped",()=>{this.isFreeSpinsActive()||this.button?.setVisible(!0)}),e.on("game:freespins:started",()=>this.button?.setVisible(!1)),e.on("game:freespins:flow:complete",()=>this.button?.setVisible(!0)),e.on(v,()=>this.button?.setVisible(!1)),e.on(x,()=>this.button?.setVisible(!0))}isFreeSpinsActive(){try{let e=window.MODULES?.ui;if(e?.uiState)return e.uiState.get().freeSpinsActive}catch{}return!1}openPopup(){this.popup?.show()}onOptionSelected(e,i){this.popup?.hide(),window.GAME.events.app.emit(g,{optionIndex:e,price:i})}destroy(){this.button?.destroy(),this.popup?.destroy(),this.initialized=!1}};r(E,"BuyFeatureModule");var p=E,f=null;function b(){return f||(f=new p),f}r(b,"getBuyFeatureModule");function u(){b().initialize()}r(u,"initializeBuyFeature");console.log("\u{1F4B0} Buy Feature Module: Script loaded, setting up initialization...");var T=window.GAME?.fsm?.getCurrent()?.name;T==="Idle"?(console.log("\u{1F4B0} Buy Feature Module: Game already Idle, initializing now"),u()):(console.log("\u{1F4B0} Buy Feature Module: Waiting for game:ready event..."),window.GAME.events.app.on("game:ready",()=>{console.log("\u{1F4B0} Buy Feature Module: game:ready received, initializing"),u()}));console.log("\u{1F4B0} Buy Feature Module entry point executed");return M(z);})();
