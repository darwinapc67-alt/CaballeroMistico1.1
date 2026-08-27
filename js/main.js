function resetAll() {
  transIsFall = false; transitionCooldown = 0;
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
  musicPlaying = false; gamepadConnected = false; gamepadIndex = -1;
  gpButtons = {}; prevGPButtons = {}; gpAxes = {x:0,y:0};
  inventoryOpen = false;
  resetPlayer();
  currentRoom = 0; cameraX = 0; targetCamX = 0; cameraY = 0; targetCamY = 0;
  hasSword = false; swordEquipped = false;
  player.hasSword = false; player.swordEquipped = false;
  if (twoPlayerMode) { player2.hasSword = false; player2.swordEquipped = false; }
  azari = 0; hasMap = false; shopOpen = false; shopId = 0;
  heartFragments1 = 0; heartFragments2 = 0;
  heartFragmentsBought1 = 0; heartFragmentsBought2 = 0;
  hasAzariCharm = false; hasDoubleJump = false;
  hitFlash = 0; needsRespawn = false;
  player.hp = player.maxHp = 10;
  if (twoPlayerMode) player2.hp = player2.maxHp = 10;
  stats = { playTime: 0, enemiesKilled: 0, roomsVisited: 1, jumps: 0, attacks: 0, deaths: 0 };
  frameCounter = 0;
  bestiary = { bat: { discovered: false, count: 0 }, larva_mosca: { discovered: false, count: 0 } };
  deathParticles = [];
  playerDead = false; deathTimer = 0;
  room0.transitionZone = null; room1.transitionZone = null; room2.transitionZone = null;
  room3.transitionZone = null; room4.transitionZone = null;
  room5.transitionZone = {x:4750, y:460, w:50, h:100, to:6};
  room6.transitionZone = null; room7.transitionZone = null; room8.transitionZone = null; room9.transitionZone = null;
  room1.pedestal.taken = false; room1.pedestal.glow = 0;
  if (room2.bombBox) { room2.bombBox.broken = false; room2.bombBox.exploded = false; }
  if (room9.healingStone) room9.healingStone.active = true;
  enemies.forEach(function(e){ e.dead = false; });
  generateStalactites();
}

function update() {
  if (shopOpen) return;
  if (gameState === ST_EXPLOSION) { updateExplosion(); return; }
  if (gameState === ST_TRANSITION) { updateTransition(); return; }
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
    for (var i = deathParticles.length - 1; i >= 0; i--) {
      var dp = deathParticles[i];
      dp.x += dp.vx; dp.y += dp.vy; dp.vy += 0.1; dp.life--;
      if (dp.life <= 0) deathParticles.splice(i, 1);
    }
  }

  var room = rooms[currentRoom];

  if (twoPlayerMode) {
    var midX = (player.x + player.w/2 + player2.x + player2.w/2) / 2;
    targetCamX = midX - canvas.width/2;
  } else {
    targetCamX = player.x + player.w/2 - canvas.width/2;
  }
  targetCamX = Math.max(0, Math.min(targetCamX, WORLD_W - canvas.width));
  var diff = targetCamX - cameraX; cameraX += diff * 0.08; if (Math.abs(diff) < 0.5) cameraX = targetCamX;

  if (room.height > canvas.height) {
    if (twoPlayerMode) {
      var midY = (player.y + player.h/2 + player2.y + player2.h/2) / 2;
      targetCamY = midY - canvas.height/2;
    } else {
      targetCamY = player.y + player.h/2 - canvas.height/2;
    }
    targetCamY = Math.max(0, Math.min(targetCamY, room.height - canvas.height));
  } else { targetCamY = 0; }
  var diffY = targetCamY - cameraY; cameraY += diffY * 0.08; if (Math.abs(diffY) < 0.5) cameraY = targetCamY;

  if (gameState === ST_PLAYING) {
    updatePlayer();
    updatePlayer2();
    updateEnemies();
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
}

function loop() {
  update();
  if (gameState === ST_LANGUAGE) drawLanguageSelect();
  else if (gameState === ST_MENU) drawMenu();
  else if (gameState === ST_PAUSED) { drawGame(); drawPause(); }
  else if (gameState === ST_TRANSITION) drawTransition();
  else if (gameState === ST_EXPLOSION) drawExplosion();
  else if (gameState === ST_INVENTORY) { drawGame(); drawInventory(); }
  else {
    drawGame();
    if (shopOpen) drawShop();
  }
  requestAnimationFrame(loop);
}

canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
resetAll();
loop();
