/**
 * DEMO VERSION - FOR DEMONSTRATION PURPOSES ONLY
 *
 * This code is proprietary and protected by copyright law.
 * All rights reserved. Unauthorized copying, modification,
 * distribution, or use of this software is strictly prohibited.
 *
 * (c) 2026 Machina Slot Engine. All Rights Reserved.
 */
/**
 * Bootstrap Loader
 *
 * Loads bundles in strict order:
 * 1. libs.bundle.js (PIXI, GSAP)
 * 2. engine.bundle.js (Engine core)
 * 3. game.bundle.js (Game implementation)
 *
 * Then creates and initializes the game.
 */

(function() {
  'use strict';

  console.log('🚀 Starting game bootstrap...');

  // Bundle loading queue
  // Note: Preloader is loaded as a module (see Phase 0 below)
  const bundles = [
    { name: 'libraries', path: '/libraries/index.bundle.js', progress: 10 },
    { name: 'engine', path: '/engine/index.bundle.js', progress: 25 },
    { name: 'game', path: `/game/${window.initConfig?.game || 'demo-slot'}/index.bundle.js`, progress: 40 }
  ];

  let currentProgress = 0;

  /**
   * Update preloader progress
   * Before game is created: call PRELOADER directly
   * After game is created: emit event through game.events.app
   */
  function updateProgress(progress, message) {
    if (window.game?.events?.app) {
      // Game exists - emit event
      window.game.events.app.emit('progress', { progress, message });
    } else if (window.PRELOADER) {
      // Game not yet created - call PRELOADER directly
      window.PRELOADER.setProgress(progress, message);
    }
  }

  /**
   * Load a script dynamically
   */
  function loadScript(src, progressValue, message) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => {
        console.log(`✅ Loaded: ${src}`);
        currentProgress = progressValue;
        updateProgress(currentProgress, message);
        resolve();
      };
      script.onerror = () => {
        console.error(`❌ Failed to load: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Load all bundles sequentially
   */
  async function loadBundles() {
    for (const bundle of bundles) {
      console.log(`📦 Loading ${bundle.name} bundle...`);
      await loadScript(bundle.path);
    }
  }

  /**
   * Initialize the game
   */
  async function initGame() {
    console.log('🎮 [PHASE 5] Initializing game...');

    // Check if window.Game exists
    if (!window.Game) {
      throw new Error('window.Game is not defined. Game bundle may have failed to load.');
    }

    updateProgress(55, 'Creating game instance...');

    // Replace window.GAME with game instance
    const GameClass = window.Game;

    // Transfer the bootstrapped data to the new instance
    const engineData = {
      di:        window.GAME.di,
      classMap:  window.GAME.classMap,
      factory:   window.GAME.factory,
      resources: window.GAME.resources,
      events:    window.GAME.events
    };

    // Create game instance (extends Game)
    window.GAME = new GameClass();

    // Restore engine data (since Game constructor creates new instances)
    Object.assign(window.GAME, engineData);

    console.log('📍 window.GAME upgraded to:', window.GAME.constructor.name);

    updateProgress(60, 'Initializing game...');

    // Initialize game (loads resources 60-95%)
    await window.GAME.init();

    updateProgress(95, 'Starting game...');

    // Start
    if (typeof window.GAME.start === 'function') {
      window.GAME.start();
    }

    // Complete!
    updateProgress(100, 'Ready!');

    console.log('✅ Game bootstrap complete!');

    // Hide preloader after a short delay
    setTimeout(() => {
      if (window.PRELOADER) {
        window.PRELOADER.hide();
      }
    }, 500);
  }

  /**
   * Main bootstrap function
   */
  async function bootstrap() {
    try {
      console.log('🚀 Starting game bootstrap...');

      // Phase 0: Load preloader module FIRST
      console.log('📦 [PHASE 0] Loading preloader module...');
      if (window.initConfig?.localModules?.includes('preloader')) {
        await loadScript('/modules/preloader/index.bundle.js', 0, 'Loading preloader...');
      }

      // Phase 1: Load libraries bundle
      console.log('📦 [PHASE 1] Loading libraries bundle...');
      await loadScript(bundles[0].path, bundles[0].progress, 'Loading PIXI & GSAP...');

      // Phase 2: Load engine bundle (creates window.GAME)
      console.log('📦 [PHASE 2] Loading engine bundle...');
      await loadScript(bundles[1].path, bundles[1].progress, 'Loading engine core...');

      // Phase 3: Engine bootstrap (loads app.json)
      console.log('⚙️  [PHASE 3] Bootstrapping engine (loading app.json)...');
      updateProgress(30, 'Loading app.json...');
      if (typeof window.GAME?.bootstrap === 'function') {
        await window.GAME.bootstrap();
      } else {
        throw new Error('window.GAME.bootstrap() not found');
      }

      // Ensure initConfig exists (for production where it comes from backend)
      if (!window.initConfig) {
        window.initConfig = {};
      }

      // Get appConfig from DI container (loaded by bootstrap)
      const appConfig = window.GAME.di.resolve('appConfig');
      window.initConfig.app = appConfig;

      // Phase 3.25: Load subsystems from app.json
      console.log('📦 [PHASE 3.25] Loading subsystems...');

      const subsystemsToLoad = appConfig?.subsystems || [];

      if (subsystemsToLoad.length > 0) {
        updateProgress(32, 'Loading subsystems...');
        for (const subsystemName of subsystemsToLoad) {
          const subsystemPath = `/subsystems/${subsystemName}/index.bundle.js`;
          console.log(`  📦 Loading subsystem: ${subsystemName}`);
          await loadScript(subsystemPath);
        }
        console.log('✅ All subsystems loaded');
      } else {
        console.log('⏭️  No subsystems to load');
      }

      // Phase 3.5: Load modules from app.json or initConfig
      console.log('📦 [PHASE 3.5] Loading modules...');

      // In dev mode: use initConfig.localModules
      // In prod mode: use app.json modules
      let modulesToLoad = [];

      if (window.initConfig?.localModules && window.initConfig.localModules.length > 0) {
        // Dev mode - load from local modules list
        console.log('  🔧 Dev mode - using initConfig.localModules');
        modulesToLoad = window.initConfig.localModules;
      } else if (appConfig?.modules && appConfig.modules.length > 0) {
        // Prod mode - load from app.json
        console.log('  🚀 Prod mode - using app.json modules');
        modulesToLoad = appConfig.modules.map(m => typeof m === 'string' ? m : m.name);
      }

      if (modulesToLoad.length > 0) {
        updateProgress(35, 'Loading modules...');
        for (const moduleName of modulesToLoad) {
          // Skip preloader - already loaded in Phase 0
          if (moduleName === 'preloader') continue;

          const modulePath = `/modules/${moduleName}/index.bundle.js`;
          console.log(`  📦 Loading module: ${moduleName}`);
          await loadScript(modulePath);
        }
        console.log('✅ All modules loaded');
      } else {
        console.log('⏭️  No modules to load');
      }

      // Phase 4: Load game bundle
      console.log('📦 [PHASE 4] Loading game bundle...');
      await loadScript(bundles[2].path, bundles[2].progress, 'Loading game...');

      // Bundles loaded = 50%
      updateProgress(50, 'Bundles loaded, initializing game...');

      // Phase 5: Game initialization (resources = 50-100%)
      await initGame();
    } catch (error) {
      console.error('💥 Bootstrap failed:', error);
      throw error;
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
