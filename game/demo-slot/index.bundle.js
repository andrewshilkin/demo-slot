/**
 * DEMO VERSION - FOR DEMONSTRATION PURPOSES ONLY
 *
 * This code is proprietary and protected by copyright law.
 * All rights reserved. Unauthorized copying, modification,
 * distribution, or use of this software is strictly prohibited.
 *
 * (c) 2026 Machina Slot Engine. All Rights Reserved.
 */
"use strict";var GAME_BUNDLE=(()=>{var t=Object.defineProperty;var e=(r,n)=>t(r,"name",{value:n,configurable:!0});var{View:a}=ENGINE,s=class extends a{constructor(){super(...arguments);this.viewName="triangle";this.configName="views"}static{e(this,"TriangleView")}build(){this.initConfig(),this.graphics=new PIXI.Graphics;let i=this.config.size;this.graphics.beginFill(this.config.color),this.graphics.moveTo(i/2,0),this.graphics.lineTo(i,i),this.graphics.lineTo(0,i),this.graphics.lineTo(i/2,0),this.graphics.endFill(),this.graphics.x=this.config.x,this.graphics.y=this.config.y,this.container.addChild(this.graphics),console.log(`\u2713 TriangleView (game) drawn at (${this.config.x}, ${this.config.y}) - size ${i}`)}};var{Slot:g}=ENGINE,o=class extends g{static{e(this,"DemoSlot")}setupComponents(){console.log("\u{1F527} Setting up game components..."),di.register("TriangleView",s,!1),console.log("\u2713 TriangleView registered")}};window.Game=o;console.log("\u2705 Game bundle loaded - window.Game is ready");})();
