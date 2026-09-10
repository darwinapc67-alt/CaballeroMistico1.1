function resetAll() {
  enemies = enemies.filter(function(enemy) {
    return !enemy.infiniteEnemy && !enemy.customEnemy;
  });
  brightnessBoost = 1;
  transIsFall = false; transitionCooldown = 0;
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
  musicPlaying = false; gamepadConnected = false; gamepadIndex = -1;
  gpButtons = {}; prevGPButtons = {}; gpAxes = {x:0,y:0}; gamepadMenuAxisLock = 0;
  inventoryOpen = false;
  mapOpen = false;
  inventoryPage = 0;
  inventorySelection = 0;
  inventoryHover = -1;
  resetPlayer();
  currentRoom = 0; cameraX = 0; targetCamX = 0; cameraY = 0; targetCamY = 0;
  hasSword = false; swordEquipped = false;
  weaponId = DEFAULT_WEAPON_ID;
  unlockedWeapons = [DEFAULT_WEAPON_ID];
  weaponLevels = {};
  WEAPON_PROGRESSION.forEach(function(id) { weaponLevels[id] = 0; });
  hasBrokenLarvaSword = false;
  player.hasSword = false; player.swordEquipped = false;
  player.weaponId = weaponId;
  if (twoPlayerMode) { player2.hasSword = false; player2.swordEquipped = false; player2.weaponId = weaponId; }
  azari = 0; hasMap = false; hasBow = false; arrows = 0; bombs = 0; shopOpen = false; shopId = 0; shopGreeting = ""; shopGreetingTimer = 0;
  heartFragments1 = 0; heartFragments2 = 0;
  heartFragmentsBought1 = 0; heartFragmentsBought2 = 0;
  hasAzariCharm = false; hasDoubleJump = false;
  hasAzariMagnet = false; hasAzariBag = false; azariBagLevel = 0; hasLantern = false; lanternLevel = 0;
  hasOldKey = false; keyReady = false; doorUnlocked = false; rewardAzariCollected = false;
  hasDash = false;
  swordLevel = 0; bowLevel = 0; arrowType = "normal";
  combatSkills = { charged: false, aerial: false, combo: false };
  blessingSlots = 2; equippedBlessings = []; armorId = "vacío"; armorLevel = 0;
  permanentUpgrades = { vitality: 0, strength: 0 };
  bossUniqueItems = { guardian: false, queen_larva: false, abyssal_knight: false };
  hiddenCollectibles = { eclipse: false, root: false, crown: false };
  hitFlash = 0; needsRespawn = false;
  player.hp = player.maxHp = 10 + permanentUpgrades.vitality;
  if (twoPlayerMode) player2.hp = player2.maxHp = 10;
  stats = { playTime: 0, enemiesKilled: 0, roomsVisited: 1, jumps: 0, attacks: 0, deaths: 0 };
  frameCounter = 0;
  bestiary = { bat: { discovered: false, count: 0 }, larva_mosca: { discovered: false, count: 0 }, cazador_paramo: { discovered: false, count: 0 }, dark_knight: { discovered: false, count: 0 }, blue_sentry: { discovered: false, count: 0 } };
  diaryScroll = 0;
  deathParticles = [];
  azariDrops = [];
  playerDead = false; deathTimer = 0;
  deathChoice = 0; deathAnimTimer = 0;
  consecutiveDeaths = 0;
  infiniteWave = 0; infiniteSpawnTimer = 60;
  highestRoomReached = 0;
  tutorialStep = 0; tutorialTimer = 240;
  checkpointState = { room: 0, px: 100, py: 400, hp: 10, maxHp: 10, azari: 0, hasSword: false, swordEquipped: false, weaponId: DEFAULT_WEAPON_ID, unlockedWeapons: [DEFAULT_WEAPON_ID], hasBow: false, arrows: 0, bombs: 0, hasMap: false, hasAzariCharm: false, hasLantern: false, lanternLevel: 0, hasDash: false, hasDoubleJump: false, swordLevel: 0, bowLevel: 0, arrowType: "normal", combatSkills: { charged: false, aerial: false, combo: false } };
  room0.transitionZone = null; room1.transitionZone = null; room2.transitionZone = null;
  room3.transitionZone = null; room4.transitionZone = null;
  room5.transitionZone = {x:4750, y:460, w:50, h:100, to:6};
  room6.transitionZone = null; room7.transitionZone = null; room8.transitionZone = null;
  room9.transitionZone = {x:7960, y:460, w:40, h:100, to:10};
  room10.transitionZone = {x:8000, y:500, w:40, h:100, to:9, sharedBoundary: true};
  room11.transitionZone = {x:9540, y:460, w:40, h:100, to:12};
  rooms[19].transitionZone = {x:15940, y:460, w:40, h:100, to:20};
  rooms[20].transitionZone = null;
  if (gameMode === "infinite") {
    room0.platforms = [{x:20, y:560, w:760, h:40}];
    room0.spikes = [];
    room0.walls = [{x:0, y:0, w:20, h:600}, {x:780, y:0, w:20, h:600}, {x:0, y:0, w:800, h:20}, {x:0, y:580, w:800, h:20}];
    hasSword = true; swordEquipped = true; player.hasSword = true; player.swordEquipped = true; player.swordSheathed = false;
  } else {
    room0.platforms = [{x:0, y:560, w:220, h:40}, {x:500, y:560, w:300, h:40}, {x:180, y:490, w:75, h:14}, {x:300, y:490, w:75, h:14}, {x:420, y:490, w:75, h:14}, {x:540, y:490, w:75, h:14}, {x:360, y:410, w:65, h:14}];
    room0.spikes = [{x:220, y:580, w:280, h:20}];
    room0.walls = [];
  }
  bossArenaState = { guardian: false, queen_larva: false, abyssal_knight: false };
  bossAbilities = { guardian: false, queen_larva: false, abyssal_knight: false };
  bossZonesUnlocked = { guardian: false, queen_larva: false, abyssal_knight: false };
  bossVictory = { active: false, timer: 0, type: "", reward: "", ability: "", zone: "" };
  bossIntroTimer = 0;
  achievements = { firstEnemy: false, firstBoss: false, enemies50: false, enemies100: false };
  achievementNotify = { active: false, timer: 0, title: "" };
  player.guardTimer = 0; player.guardCooldown = 0; player.blocking = false;
  player2.guardTimer = 0; player2.guardCooldown = 0; player2.blocking = false;
  bossDoorSoundRoom = -1;
  bossDialogueSeen = {};
  bossDialogueLines = [];
  bossDialogueIndex = 0;
  bossProjectiles = [];
  bossDeathEffects = [];
  room1.pedestal.taken = false; room1.pedestal.glow = 0;
  if (room9.healingStone) room9.healingStone.active = true;
  enemies.forEach(function(e){
    e.dead = false;
    if (e.boss) {
      e.hp = e.maxHp; e.phase = 1; e.enraged = false; e.action = "";
      e.actionTimer = 0; e.attackTimer = e.type === "abyssal_knight" ? 50 : 70;
      e.deathTimer = 0; e.attackHit = false; e.phaseNotice = 0;
    }
    e.vy = 0;
  });
  if (gameMode === "infinite") {
    enemies.forEach(function(e) { if (e.room === 0 && !e.boss) e.dead = true; });
  }
  generateStalactites();
}

function update() {
  if (shopAnim > 0) shopAnim--;
  if (shopGreetingTimer > 0) shopGreetingTimer--;
  if (adMessageTimer > 0) adMessageTimer--;
  if (adAzariBonusTimer > 0) adAzariBonusTimer--;
  if (shopExitCooldown > 0) shopExitCooldown--;
  if (combatShake > 0) combatShake *= 0.82;
  if (combatShake < 0.1) combatShake = 0;
  for (var impactIndex = impactBursts.length - 1; impactIndex >= 0; impactIndex--) {
    impactBursts[impactIndex].life--;
    if (impactBursts[impactIndex].life <= 0) impactBursts.splice(impactIndex, 1);
  }
  if (combatHitStop > 0) {
    combatHitStop--;
    return;
  }
  if (bossVictory.active) {
    bossVictory.timer--;
    if (bossVictory.timer <= 0) bossVictory.active = false;
  }
  if (bossIntroTimer > 0 && gameState === ST_PLAYING) bossIntroTimer--;
  if (gameState === ST_INTRO) {
    introTimer++;
    if (introTimer >= 900) finishIntro();
    return;
  }
  if (achievementNotify.active) {
    achievementNotify.timer--;
    if (achievementNotify.timer <= 0) achievementNotify.active = false;
  }
  updateBossDeathEffects();
  updateAudioEnvironment();
  if (shopOpen && gameState === ST_PLAYING) { updateShopPlayer(); return; }
  if (gameState === ST_TRANSITION) { updateTransition(); return; }
  if (gameState === ST_DEATH) {
    deathAnimTimer++;
    for (var deathIndex = deathParticles.length - 1; deathIndex >= 0; deathIndex--) {
      var deathParticle = deathParticles[deathIndex];
      deathParticle.x += deathParticle.vx; deathParticle.y += deathParticle.vy; deathParticle.vy += 0.1; deathParticle.life--;
      if (deathParticle.life <= 0) deathParticles.splice(deathIndex, 1);
    }
    return;
  }
  if (gameState === ST_DIALOGUE) return;
  if (gameState === ST_HOUSE) {
    updateHouseInterior();
    return;
  }
  if (hitFlash > 0) {
    hitFlash--;
    if (hitFlash <= 0 && needsRespawn) {
      needsRespawn = false;
      player.frozen = false;
      player.x = lastSafeX; player.y = lastSafeY;
      player.vx = -player.facing * 4; player.vy = -5;
    }
    return;
  }
  if (gameState !== ST_PLAYING && gameState !== ST_INVENTORY) return;

  if (gameState === ST_PLAYING) {
    frameCounter++;
    if (frameCounter >= 60) { frameCounter = 0; stats.playTime++; }
    updateStalactites();
    updateWaterDrops();
    for (var i = deathParticles.length - 1; i >= 0; i--) {
      var dp = deathParticles[i];
      dp.x += dp.vx; dp.y += dp.vy; dp.vy += 0.1; dp.life--;
      if (dp.life <= 0) deathParticles.splice(i, 1);
    }
  }

  if (gameState === ST_PLAYING) {
    updatePlayer();
    updatePlayer2();
    updateEnemies();
    updateInfiniteMode();
    updateCustomLevel();
    updateArrows();
    updateBombs();
    updateAzariDrops();
    updateHealingHearts();
    if (healingStoneCooldown > 0) healingStoneCooldown--;
    updateHiddenCollectibles();
    updateBossProjectiles();
    updateTutorial();
    if (healing) {
      healTimer--;
      if (healTimer % 20 === 0) {
        if (player.hp < player.maxHp) { player.hp++; spawnParticles(player.x + player.w/2, player.y - 5, "#4f4", 3, 2); sfxHeal(); }
        if (twoPlayerMode && player2.hp < player2.maxHp) { player2.hp++; spawnParticles(player2.x + player2.w/2, player2.y - 5, "#f4f", 3, 2); sfxHeal(); }
      }
      if (healTimer <= 0 || (player.hp >= player.maxHp && (!twoPlayerMode || player2.hp >= player2.maxHp))) {
        healing = false; player.frozen = false; if (twoPlayerMode) player2.frozen = false;
        spawnFloatText(player.x, player.y - 30, "¡Vida restaurada!", "#4f4");
      }
    }
    for (var i = particles.length - 1; i >= 0; i--) { var p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life--; if (p.life <= 0) particles.splice(i, 1); }
    for (var i = floatTexts.length - 1; i >= 0; i--) { var t = floatTexts[i]; t.y += t.vy; t.life--; if (t.life <= 0) floatTexts.splice(i, 1); }
    if (zoneNameTimer > 0) zoneNameTimer--;
    if (flash > 0) flash -= 0.025;
    if (discoveryNotify.active) {
      discoveryNotify.timer--;
      if (discoveryNotify.timer <= 0) discoveryNotify.active = false;
    }
  }

  var room = rooms[currentRoom];
  if (!(gameState === ST_TRANSITION && transIsFall)) {
    if (twoPlayerMode) {
      var midX = (player.x + player.w/2 + player2.x + player2.w/2) / 2;
      targetCamX = midX - canvas.width/2 + (player.facing || 1) * 42;
    } else {
      targetCamX = player.x + player.w/2 - canvas.width/2 + (player.facing || 1) * 70 + player.vx * 8;
    }
    if (room.verticalRoom && room.worldX !== undefined) {
      var roomWidth = room.roomWidth || ROOM_W;
      targetCamX = Math.max(room.worldX, Math.min(targetCamX, room.worldX + roomWidth - canvas.width));
    } else {
      targetCamX = Math.max(0, Math.min(targetCamX, WORLD_W - canvas.width));
    }
    var diff = targetCamX - cameraX;
    cameraX += diff * 0.14;
    if (Math.abs(diff) < 0.5) cameraX = targetCamX;
  }

  if (room.height > canvas.height) {
    if (twoPlayerMode) {
      var midY = (player.y + player.h/2 + player2.y + player2.h/2) / 2;
      targetCamY = midY - canvas.height/2;
    } else {
      targetCamY = player.y + player.h/2 - canvas.height/2;
    }
    targetCamY = Math.max(0, Math.min(targetCamY, room.height - canvas.height));
  } else {
    targetCamY = 0;
  }
  var diffY = targetCamY - cameraY;
  cameraY += diffY * 0.12;
  if (Math.abs(diffY) < 0.5) cameraY = targetCamY;
}

function updateShopPlayer() {
  if (shopAnim > 0) return;
  if (keys["a"] || keys["arrowleft"]) { player.x -= 3.5; player.facing = -1; }
  if (keys["d"] || keys["arrowright"]) { player.x += 3.5; player.facing = 1; }
  if ((keys[" "] || keys["arrowup"]) && player.y >= 530) player.vy = -14.5;
  player.vy += GRAVITY;
  if (player.vy > 12) player.vy = 12;
  player.y += player.vy;
  if (player.y >= 530) { player.y = 530; player.vy = 0; player.onGround = true; }
  else player.onGround = false;
  player.x = Math.max(100, Math.min(canvas.width - 100, player.x));
}

function loop() {
  scanGamepads();
  pollGamepad();
  processGamepadInput();
  gameSpeedAccumulator += gameSpeed;
  var updatesThisFrame = 0;
  while (gameSpeedAccumulator >= 1 && updatesThisFrame < 4) {
    update();
    gameSpeedAccumulator -= 1;
    updatesThisFrame++;
  }
  updateFullscreenButton();
  if (device === "touch" && touchControlsSignature !== getTouchControlsSignature()) setupTouchControls();
  updateTouchMenuButton();
  if (gameState === ST_LANGUAGE) drawLanguageSelect();
  else if (gameState === ST_DEVICE) drawDeviceSelect();
  else if (gameState === ST_MENU) drawMenu();
  else if (gameState === ST_PAUSED) { drawGame(); drawPause(); }
  else if (gameState === ST_TRANSITION) drawTransition();
  else if (gameState === ST_INVENTORY) { drawGame(); drawInventory(); }
  else if (gameState === ST_DIALOGUE) { drawGame(); drawBossDialogue(); }
  else if (gameState === ST_HOUSE) drawHouseInterior();
  else if (gameState === ST_DEATH) drawDeathScreen();
  else if (gameState === ST_LEVEL_EDITOR) drawLevelEditor();
  else if (gameState === ST_INTRO) drawIntro();
  else {
    drawGame();
    if (shopOpen) drawShop();
  }
  requestAnimationFrame(loop);
}

canvas = document.getElementById("gameCanvas");
canvas.tabIndex = 0;
canvas.focus();
canvas.addEventListener("click", function() { canvas.focus(); });
canvas.addEventListener("click", function(event) {
  if (gameState !== ST_MENU || menuSubState !== "difficulty") return;
  var rect = canvas.getBoundingClientRect();
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  var selected = Math.floor((y - 215) / 70);
  if (selected >= 0 && selected < difficultyOptions.length) {
    difficultySelection = selected;
    beginNewGameFromDifficulty();
  }
});
canvas.addEventListener("mousedown", function(event) {
  if (gameState !== ST_LEVEL_EDITOR) return;
  event.preventDefault();
  handleLevelEditorMouse(event);
});
canvas.addEventListener("contextmenu", function(event) {
  if (gameState === ST_LEVEL_EDITOR) event.preventDefault();
});
canvas.addEventListener("click", function(event) {
  if (gameState !== ST_MENU || menuSubState !== "levels") return;
  var rect = canvas.getBoundingClientRect();
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  var selected = Math.floor((y - 223) / 75);
  if (selected >= 0 && selected < 2) {
    levelsSelection = selected;
    if (selected === 1) { openNewEditorLevel(); menuSubState = "slots"; }
    else if (startCustomLevel()) menuSubState = "slots";
  }
});
canvas.addEventListener("click", function(event) {
  if (gameState !== ST_MENU || menuSubState !== "slots") return;
  var rect = canvas.getBoundingClientRect();
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  if (y >= 155 && y < 470) {
    menuSelection = Math.floor((y - 155) / 63);
  } else if (y >= 470 && y < 510) {
    menuSelection = 5;
    menuSubState = "levels";
    levelsSelection = 0;
  } else if (y >= 510 && y < 550) {
    menuSelection = 6;
    menuSubState = "settings";
  }
});
canvas.addEventListener("click", function(event) {
  if (gameState !== ST_INVENTORY || mapOpen) return;
  var rect = canvas.getBoundingClientRect();
  var x = (event.clientX - rect.left) * canvas.width / rect.width;
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  if (y >= 78 && y <= 104 && x >= 505 && x <= 570) {
    var inventoryPageCount = getInventoryPageCount();
    if (x < 538) inventoryPage = inventoryPage > 0 ? inventoryPage - 1 : inventoryPageCount - 1;
    else inventoryPage = inventoryPage < inventoryPageCount - 1 ? inventoryPage + 1 : 0;
    inventorySelection = 0;
    inventoryHover = -1;
    return;
  }
  var col = x >= 28 && x < 502 ? Math.floor((x - 28) / 158) : -1;
  var row = y >= 112 && y < 310 ? Math.floor((y - 112) / 66) : -1;
  if (col >= 0 && row >= 0 && row < 3) inventorySelection = row * 3 + col;
});
canvas.addEventListener("mousemove", function(event) {
  if (gameState !== ST_INVENTORY || mapOpen) {
    inventoryHover = -1;
    return;
  }
  var rect = canvas.getBoundingClientRect();
  var x = (event.clientX - rect.left) * canvas.width / rect.width;
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  var col = x >= 28 && x < 502 ? Math.floor((x - 28) / 158) : -1;
  var row = Math.floor((y - 112) / 66);
  inventoryHover = col >= 0 && row >= 0 ? row * 3 + col : -1;
  if (inventoryHover < 0 || inventoryHover >= 9) inventoryHover = -1;
});
ctx = canvas.getContext("2d");
var originalFillText = ctx.fillText.bind(ctx);
ctx.fillText = function(text, x, y, maxWidth) {
  var translated = translateText(text);
  if (maxWidth === undefined) originalFillText(translated, x, y);
  else originalFillText(translated, x, y, maxWidth);
};
resetAll();
setupTouchControls();
setupFullscreenButton();
var adminPath = window.location.pathname.replace(/\/+$/, "") === "/admin";
var adminQuery = new URLSearchParams(window.location.search).get("admin") === "1";
if (adminPath || adminQuery) {
  gameState = ST_MENU;
  menuSubState = "admin_password";
  adminFromSettings = false;
  adminPassword = "";
  adminMessage = "";
}
loop();
