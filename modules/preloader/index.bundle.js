/**
 * DEMO VERSION - FOR DEMONSTRATION PURPOSES ONLY
 *
 * This code is proprietary and protected by copyright law.
 * All rights reserved. Unauthorized copying, modification,
 * distribution, or use of this software is strictly prohibited.
 *
 * (c) 2026 Machina Slot Engine. All Rights Reserved.
 */
"use strict";var Module_preloader=(()=>{var s=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var d=(r,e)=>s(r,"name",{value:e,configurable:!0});var g=(r,e)=>{for(var t in e)s(r,t,{get:e[t],enumerable:!0})},h=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of l(e))!p.call(r,o)&&o!==t&&s(r,o,{get:()=>e[o],enumerable:!(i=c(e,o))||i.enumerable});return r};var m=r=>h(s({},"__esModule",{value:!0}),r);var x={};g(x,{Preloader:()=>n});var a=class a{constructor(){this.currentProgress=0;this.createUI(),this.startProgressPolling()}startProgressPolling(){let e=setInterval(()=>{if(typeof game<"u"&&game){let t=game.loadingProgress;this.setProgress(t),t>=100&&clearInterval(e)}},30)}createUI(){this.container=document.createElement("div"),this.container.id="preloader",this.container.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: 'Courier New', monospace;
      color: #ffffff;
    `;let e=document.createElement("div");e.style.cssText=`
      font-size: min(48px, 10vw);
      font-weight: bold;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #4CAF50, #2196F3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
      text-align: center;
    `,e.textContent="\u{1F3B0} SLOT ENGINE",this.container.appendChild(e);let t=document.createElement("div");t.style.cssText=`
      font-size: min(16px, 4vw);
      color: #888;
      margin-bottom: 40px;
      white-space: nowrap;
      text-align: center;
    `,t.textContent="MVC + FSM Architecture",this.container.appendChild(t);let i=document.createElement("div");i.style.cssText=`
      width: 80%;
      max-width: 400px;
      min-width: 200px;
      height: 8px;
      background: #333;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 10px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
    `,this.progressBar=document.createElement("div"),this.progressBar.style.cssText=`
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #4CAF50, #2196F3);
      transition: width 0.3s ease;
      box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    `,i.appendChild(this.progressBar),this.container.appendChild(i),this.progressText=document.createElement("div"),this.progressText.style.cssText=`
      font-size: 14px;
      color: #4CAF50;
      margin-top: 10px;
    `,this.progressText.textContent="Loading... 0%",this.container.appendChild(this.progressText),document.body.appendChild(this.container)}setProgress(e,t){this.currentProgress=Math.min(100,Math.max(0,e)),this.progressBar.style.width=`${this.currentProgress}%`;let i=t||`Loading... ${Math.round(this.currentProgress)}%`;this.progressText.textContent=i,this.currentProgress>=100&&(this.progressText.style.color="#2196F3")}hide(){this.container.style.transition="opacity 0.5s ease",this.container.style.opacity="0",setTimeout(()=>{this.container.parentNode&&this.container.parentNode.removeChild(this.container)},500)}getProgress(){return this.currentProgress}};d(a,"Preloader");var n=a;console.log("\u2705 Preloader module loaded");window.PRELOADER=new n;window.PRELOADER||(window.PRELOADER=new n);return m(x);})();
