function drawGameWorld() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (flash*0.3) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  var shakeX = combatShake ? (Math.random() - 0.5) * combatShake : 0;
  var shakeY = combatShake ? (Math.random() - 0.5) * combatShake : 0;
  ctx.save(); ctx.translate(shakeX - Math.floor(cameraX), shakeY - Math.floor(cameraY));

  ctx.fillStyle = "#0a0a1a";
  for (var i = 0; i < 30; i++) {
    var bx = ((i * 173) % WORLD_W), by = 50 + Math.sin(i * 2.3) * 100;
    ctx.globalAlpha = 0.03;
    ctx.beginPath(); ctx.arc(bx, by, 60 + Math.sin(i)*30, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i*137)%WORLD_W, sy = (i*89)%2000;
    ctx.globalAlpha = 0.05 + Math.sin(Date.now()/1000+i)*0.03;
    ctx.fillRect(sx, sy, 1.2, 1.2);
  }
  ctx.globalAlpha = 1;

  stalactites.forEach(function(s) {
    if (s.fallen || !s.active) return;
    if (Math.floor(s.x / ROOM_W) !== currentRoom) return;
    var grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.h);
    grad.addColorStop(0, "rgba(150,150,170,0.8)");
    grad.addColorStop(0.5, "rgba(100,100,120,0.6)");
    grad.addColorStop(1, "rgba(60,60,70,0.4)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.w/2, s.y + s.h);
    ctx.lineTo(s.x + s.w, s.y);
    ctx.closePath();
    ctx.fill();
  });

  var camLeft = cameraX, camRight = cameraX + 800, camTop = cameraY, camBottom = cameraY + 600;
  for (var r = 0; r < rooms.length; r++) {
    if (currentRoom === 37 && r !== 37) continue;
    if (r === 37 && currentRoom !== 37) continue;
    var rx = rooms[r].worldX !== undefined ? rooms[r].worldX : r * ROOM_W;
    var roomWidth = rooms[r].roomWidth || ROOM_W;
    if (rx + roomWidth < camLeft - 100 || rx > camRight + 100) continue;
    var room = rooms[r];
    if (room.height < camTop - 100 || 0 > camBottom + 100) continue;
    if (room.city) drawCityBg(rx, room);
    else drawCaveBg(rx, room.decor, room.height, roomWidth);
    drawPlatforms(room);
    drawWalls(room);
    if (r === 30) {
      var holeX = 30 * ROOM_W + 580;
      ctx.fillStyle = "#020208";
      ctx.fillRect(holeX, 850, 200, 50);
      ctx.strokeStyle = "#596078";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(holeX, 860);
      ctx.lineTo(holeX + 200, 860);
      ctx.stroke();
      ctx.fillStyle = "#9aa3bd";
      ctx.font = "bold 13px monospace";
      ctx.fillText("↓", holeX + 100, 888);
    }
    drawSpikes(room);
    if (room.city) drawCityHouses(room, r);
    if (r === 1) drawPedestal();
    if (room.transitionZone && !room.noDoor && !(r === 10 && room.transitionZone.sharedBoundary)) drawTransitionZone(room.transitionZone);
    if (r === 37 && room.lockedDoor) {
      var door = room.lockedDoor;
      ctx.fillStyle = doorUnlocked ? "#23834b" : "#a83232";
      ctx.fillRect(door.x, door.y, door.w, door.h);
      ctx.strokeStyle = doorUnlocked ? "#7dffad" : "#ff7777";
      ctx.lineWidth = 3;
      ctx.strokeRect(door.x, door.y, door.w, door.h);
      ctx.fillStyle = "#111";
      ctx.fillRect(door.x + door.w - 13, door.y + 38, 6, 6);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px monospace";
      ctx.fillText(doorUnlocked ? "ABIERTA" : "CERRADA", door.x - 5, door.y - 10);
    }
    if (r === 37 && room.openDoor) {
      var openDoor = room.openDoor;
      ctx.fillStyle = "#111321";
      ctx.fillRect(openDoor.x, openDoor.y, openDoor.w, openDoor.h);
      ctx.strokeStyle = "#8cf0ff";
      ctx.lineWidth = 3;
      ctx.strokeRect(openDoor.x, openDoor.y, openDoor.w, openDoor.h);
      ctx.fillStyle = "#8cf0ff";
      ctx.font = "bold 12px monospace";
      ctx.fillText("SALIDA", openDoor.x - 2, openDoor.y - 10);
    }
    if (r === 39 && room.rewardPile && !rewardAzariCollected) {
      var pileX = room.rewardPile.x;
      var pileY = room.rewardPile.y + 48;
      var pileGlow = ctx.createRadialGradient(pileX, pileY - 24, 10, pileX, pileY - 24, 115);
      pileGlow.addColorStop(0, "rgba(76, 218, 255, 0.3)");
      pileGlow.addColorStop(1, "rgba(76, 218, 255, 0)");
      ctx.fillStyle = pileGlow;
      ctx.beginPath();
      ctx.arc(pileX, pileY - 24, 115, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.beginPath();
      ctx.ellipse(pileX, pileY + 3, 105, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      var pileRows = [
        { count: 11, width: 116, y: 0 },
        { count: 9, width: 100, y: -13 },
        { count: 7, width: 82, y: -26 },
        { count: 5, width: 62, y: -39 },
        { count: 3, width: 40, y: -52 }
      ];
      pileRows.forEach(function(row, rowIndex) {
        for (var coinIndex = 0; coinIndex < row.count; coinIndex++) {
          var coinX = pileX - row.width / 2 + (coinIndex + 0.5) * row.width / row.count;
          var coinY = pileY + row.y - (coinIndex % 2) * 2;
          ctx.fillStyle = rowIndex % 2 ? "#18a9d2" : "#28c9ed";
          ctx.beginPath();
          ctx.ellipse(coinX, coinY, 10, 6, -0.12, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#8cf0ff";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "rgba(220, 252, 255, 0.9)";
          ctx.beginPath();
          ctx.ellipse(coinX - 3, coinY - 2, 3, 1.5, -0.12, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.fillStyle = "#d9fbff";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText("230 AZARI", pileX, pileY - 70);
      ctx.textAlign = "left";
    }
    if (room.bossName) drawBossDoor(r);
    if (r === 9) { drawShopNPC(); drawHealingStone(); }
  }
  drawEnemies();
  drawBossDeathEffects();
  drawHealingHearts();
  drawBossProjectiles();
  hiddenCollectibleData.forEach(function(item) {
    if (item.room !== currentRoom || hiddenCollectibles[item.id]) return;
    ctx.fillStyle = "rgba(255,215,0,0.22)";
    ctx.beginPath(); ctx.arc(item.x, item.y, 18 + Math.sin(Date.now() / 220) * 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd700"; ctx.font = "16px monospace"; ctx.fillText("✦", item.x - 6, item.y + 6);
  });
  arrowsInFlight.forEach(function(arrow) {
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(arrow.x, arrow.y, arrow.w, arrow.h);
    ctx.fillStyle = "#eee";
    ctx.fillRect(arrow.x + (arrow.vx > 0 ? arrow.w : -4), arrow.y - 2, 4, arrow.h + 4);
  });
  bombsInFlight.forEach(function(bomb) {
    ctx.fillStyle = "#202020";
    ctx.beginPath();
    ctx.arc(bomb.x + bomb.w / 2, bomb.y + bomb.h / 2, bomb.w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ff7138";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffd36a";
    ctx.fillRect(bomb.x + bomb.w / 2 - 2, bomb.y - 3, 4, 4);
  });
  azariDrops.forEach(function(drop) {
    var pulse = 1 + Math.sin(Date.now() / 140 + drop.x) * 0.15;
    var crystalColor = drop.type === "large" ? "#ffd447" : (drop.type === "small" ? "#9eeaff" : "#42d9ff");
    ctx.save();
    ctx.translate(drop.x + drop.w / 2, drop.y + drop.h / 2);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = crystalColor;
    ctx.shadowColor = crystalColor;
    ctx.shadowBlur = hasAzariMagnet ? 14 : 7;
    ctx.beginPath();
    ctx.moveTo(0, -drop.h / 2); ctx.lineTo(drop.w / 2, 0);
    ctx.lineTo(0, drop.h / 2); ctx.lineTo(-drop.w / 2, 0);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  });
  drawPlayerEntity(player);
  if (twoPlayerMode) drawPlayerEntity(player2);
  if (customLevelActive && customLevelGoal) {
    ctx.fillStyle = customLevelGoal.type === "door" ? "#23834b" : "#ffd700";
    ctx.strokeStyle = "#fff2a3";
    ctx.lineWidth = 2;
    ctx.fillRect(customLevelGoal.x + 4, customLevelGoal.y + 4, customLevelGoal.w - 8, customLevelGoal.h - 4);
    ctx.strokeRect(customLevelGoal.x + 4, customLevelGoal.y + 4, customLevelGoal.w - 8, customLevelGoal.h - 4);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px monospace";
    ctx.fillText(customLevelGoal.type === "door" ? "PUERTA" : "META", customLevelGoal.x - 2, customLevelGoal.y - 6);
  }

  deathParticles.forEach(function(p) {
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
  });
  ctx.globalAlpha = 1;

  particles.forEach(function(p) { ctx.globalAlpha = Math.max(0, p.life/p.maxLife); ctx.fillStyle = p.color; ctx.fillRect(p.x-p.size/2, p.y-p.size/2, p.size, p.size); });
  impactBursts.forEach(function(b) {
    var progress = 1 - b.life / b.maxLife;
    ctx.globalAlpha = Math.max(0, b.life / b.maxLife);
    ctx.strokeStyle = b.critical ? "#fff36b" : "#9de8ff";
    ctx.lineWidth = b.critical ? 4 : 2;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 8 + progress * (b.critical ? 34 : 22), 0, Math.PI * 2);
    ctx.stroke();
    if (b.critical) {
      ctx.beginPath();
      ctx.moveTo(b.x - 24, b.y); ctx.lineTo(b.x + 24, b.y);
      ctx.moveTo(b.x, b.y - 24); ctx.lineTo(b.x, b.y + 24);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;
  floatTexts.forEach(function(t) { ctx.globalAlpha = Math.max(0, t.life/70); ctx.fillStyle = t.color; ctx.font = "bold 13px monospace"; ctx.fillText(t.text, t.x, t.y); });
  ctx.globalAlpha = 1;
  ctx.restore();

  var lightX = player.x - cameraX + player.w / 2;
  var lightY = player.y - cameraY + player.h / 2;
  var lightRadius = infiniteLight ? Math.max(canvas.width, canvas.height) * 2 : (hasLantern ? 190 + lanternLevel * 55 : 125);
  var darkness = ctx.createRadialGradient(lightX, lightY, lightRadius * 0.35, lightX, lightY, lightRadius);
  darkness.addColorStop(0, "rgba(4, 6, 16, 0)");
  var darknessFactor = 1 - brightnessBoost;
  darkness.addColorStop(0.72, "rgba(4, 6, 16, " + (0.42 * darknessFactor) + ")");
  darkness.addColorStop(1, "rgba(2, 3, 10, " + (0.88 * darknessFactor) + ")");
  ctx.fillStyle = darkness;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
