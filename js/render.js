function drawCaveBg(rx, decor, roomH) {
  ctx.fillStyle = "#080818";
  ctx.fillRect(rx, 0, ROOM_W, roomH);
  for (var i = 0; i < 20; i++) {
    var sx = rx + (i * 137) % ROOM_W, sy = (i * 89) % roomH;
    ctx.globalAlpha = 0.1 + Math.sin(Date.now()/2000 + i) * 0.05;
    ctx.fillStyle = "#fff"; ctx.fillRect(sx, sy, 1, 1);
  }
  ctx.globalAlpha = 1;
  waterDrops.forEach(function(drop) {
    ctx.globalAlpha = Math.min(1, drop.life / 20);
    ctx.fillStyle = "rgba(100, 200, 255, 0.8)";
    ctx.fillRect(drop.x, drop.y, 2, 8);
  });
  ctx.globalAlpha = 1;
  decor.forEach(function(d) {
    if (d.type === 'stalactite') {
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.w/2, d.y + d.h);
      ctx.lineTo(d.x + d.w, d.y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#2a2a3e";
      ctx.fillRect(d.x + d.w/2 - 1, d.y, 2, d.h * 0.7);
    } else if (d.type === 'rock') {
      ctx.fillStyle = "#151525";
      ctx.beginPath();
      ctx.moveTo(d.x, d.y + d.h);
      ctx.lineTo(d.x + d.w/2, d.y);
      ctx.lineTo(d.x + d.w, d.y + d.h);
      ctx.closePath();
      ctx.fill();
    } else if (d.type === 'wall') {
      ctx.fillStyle = "#0f0f1a";
      ctx.fillRect(d.x, d.y, d.w, d.h);
      ctx.fillStyle = "#1a1a28";
      ctx.fillRect(d.x + 2, d.y + 2, d.w - 4, d.h - 4);
    }
  });
}

function drawPlatforms(room) {
  room.platforms.forEach(function(p) {
    ctx.fillStyle = "#2a2a3a";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "#3a3a4a";
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = "#1a1a2a";
    ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
  });
}

function drawSpikes(room) {
  room.spikes.forEach(function(s) {
    ctx.fillStyle = "#441111";
    ctx.fillRect(s.x, s.y, s.w, s.h);
    ctx.fillStyle = "#661111";
    for (var i = 0; i < s.w; i += 12) {
      ctx.beginPath();
      ctx.moveTo(s.x + i, s.y + s.h);
      ctx.lineTo(s.x + i + 6, s.y);
      ctx.lineTo(s.x + i + 12, s.y + s.h);
      ctx.closePath(); ctx.fill();
    }
  });
}

function drawTransitionZone(tz) {
  if (!tz) return;
  ctx.fillStyle = "rgba(100, 200, 255, 0.08)";
  ctx.fillRect(tz.x, tz.y, tz.w, tz.h);
  ctx.strokeStyle = "rgba(100, 200, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.strokeRect(tz.x, tz.y, tz.w, tz.h);
  ctx.fillStyle = "rgba(100, 200, 255, 0.4)";
  ctx.font = "10px monospace";
  ctx.fillText("→", tz.x + tz.w/2 - 4, tz.y + tz.h/2 + 3);
}

function drawPedestal() {
  var ped = room1.pedestal;
  ctx.fillStyle = "#4a4a5a";
  ctx.fillRect(ped.stone.x, ped.stone.y, ped.stone.w, ped.stone.h);
  ctx.fillStyle = "#5a5a6a";
  ctx.fillRect(ped.stone.x, ped.stone.y, ped.stone.w, 4);
  if (!ped.taken) {
    ped.glow += 0.05;
    var glowAlpha = 0.15 + Math.sin(ped.glow) * 0.1;
    ctx.fillStyle = "rgba(255, 215, 0, " + glowAlpha + ")";
    ctx.fillRect(ped.glass.x - 5, ped.glass.y - 5, ped.glass.w + 10, ped.glass.h + 10);
    ctx.fillStyle = "rgba(200, 220, 255, 0.15)";
    ctx.fillRect(ped.glass.x, ped.glass.y, ped.glass.w, ped.glass.h);
    ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(ped.glass.x, ped.glass.y, ped.glass.w, ped.glass.h);
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(ped.sword.x, ped.sword.y, ped.sword.w, ped.sword.h);
    ctx.fillStyle = "#fff";
    ctx.fillRect(ped.sword.x + 1, ped.sword.y + 2, ped.sword.w - 2, ped.sword.h * 0.6);
  }
}

function drawBombBox() {
  if (!room2.bombBox || room2.bombBox.broken) return;
  var b = room2.bombBox;
  ctx.fillStyle = "#553311";
  ctx.fillRect(b.x, b.y, b.w, b.h);
  ctx.fillStyle = "#664422";
  ctx.fillRect(b.x, b.y, b.w, 4);
  ctx.fillStyle = "#331100";
  ctx.fillRect(b.x + 5, b.y + 6, 8, 8);
  ctx.fillStyle = "#ff0000";
  ctx.beginPath(); ctx.arc(b.x + b.w/2, b.y + 4, 3, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = "#ff6600"; ctx.lineWidth = 1;
  ctx.strokeRect(b.x - 2, b.y - 2, b.w + 4, b.h + 4);
}

function drawCityBuildings() {
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 300, 800, 300);
  ctx.fillStyle = "#0f0f25";
  for (var i = 0; i < 8; i++) {
    var bx = i * 100 + 20, bh = 80 + Math.sin(i * 2.5) * 40;
    ctx.fillRect(bx, 400 - bh, 60, bh);
    ctx.fillStyle = "#1a1a3a";
    ctx.fillRect(bx + 10, 400 - bh + 10, 15, 15);
    ctx.fillRect(bx + 35, 400 - bh + 10, 15, 15);
    ctx.fillStyle = "#0f0f25";
  }
}

function drawShopNPC() {
  var room = rooms[currentRoom];
  if (room.shops) {
    room.shops.forEach(function(s) {
      var npc = s.npc;
      var houseX = npc.x - 55, houseY = npc.y - 95;
      ctx.fillStyle = "#26263a";
      ctx.fillRect(houseX, houseY + 25, 130, 95);
      ctx.fillStyle = s.id === 0 ? "#4a3a25" : "#3a2638";
      ctx.beginPath();
      ctx.moveTo(houseX - 8, houseY + 28);
      ctx.lineTo(houseX + 65, houseY - 25);
      ctx.lineTo(houseX + 138, houseY + 28);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#111122";
      ctx.fillRect(houseX + 18, houseY + 62, 20, 18);
      ctx.fillRect(houseX + 92, houseY + 62, 20, 18);
      ctx.fillStyle = "#8b4513";
      ctx.fillRect(npc.x, npc.y, npc.w, npc.h);
      ctx.fillStyle = "#a0522d";
      ctx.fillRect(npc.x, npc.y, npc.w, 5);
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(npc.x + 4, npc.y + 8, 4, 4);
      ctx.fillRect(npc.x + npc.w - 8, npc.y + 8, 4, 4);
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(npc.x - 9, npc.y - 10, 4, 4);
    });
  }
}

function drawHealingStone() {
  var room = rooms[currentRoom];
  if (!room.healingStone) return;
  var st = room.healingStone;
  ctx.fillStyle = "#2a4a3a";
  ctx.fillRect(st.x, st.y, st.w, st.h);
  ctx.fillStyle = "#3a6a4a";
  ctx.fillRect(st.x + 5, st.y + 5, st.w - 10, st.h - 10);
  ctx.fillStyle = "#4f4";
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  ctx.fillText("✦", st.x + st.w/2, st.y + st.h/2 + 5);
  ctx.textAlign = "left";
  if (st.active) {
    var pulse = 0.2 + Math.sin(Date.now() / 300) * 0.1;
    ctx.fillStyle = "rgba(80, 255, 100, " + pulse + ")";
    ctx.beginPath(); ctx.arc(st.x + st.w/2, st.y + st.h/2, 35, 0, Math.PI*2); ctx.fill();
  }
}

function drawEnemies() {
  var camLeft = cameraX, camRight = cameraX + 800, camTop = cameraY, camBottom = cameraY + 600;
  enemies.forEach(function(e) {
    if (e.dead || e.room !== currentRoom) return;
    if (e.x + e.w < camLeft - 50 || e.x > camRight + 50) return;
    if (e.y + e.h < camTop - 50 || e.y > camBottom + 50) return;
    ctx.save();
    if (e.type === 'larva_mosca') {
      var wiggle = Math.sin(Date.now()/100) * 3;
      ctx.fillStyle = "#6a4";
      ctx.beginPath(); ctx.ellipse(e.x+e.w/2, e.y+e.h/2+4, e.w/2, e.h/2.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#8c6";
      ctx.beginPath(); ctx.ellipse(e.x+e.w/2, e.y+e.h/2+2, e.w/2-2, e.h/2.5-2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#4a3"; ctx.fillRect(e.x+4, e.y+12, 4, 4); ctx.fillRect(e.x+12, e.y+14, 4, 4); ctx.fillRect(e.x+20, e.y+12, 4, 4);
      ctx.fillStyle = "#f00"; ctx.fillRect(e.x+6, e.y+4, 4, 4); ctx.fillRect(e.x+16, e.y+4, 4, 4);
      ctx.fillStyle = "#300"; ctx.fillRect(e.x+7, e.y+5, 2, 2); ctx.fillRect(e.x+17, e.y+5, 2, 2);
      ctx.fillStyle = "rgba(180,220,255,0.3)";
      ctx.beginPath(); ctx.ellipse(e.x-2+wiggle, e.y+6, 8, 12, -0.3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(e.x+e.w+2-wiggle, e.y+6, 8, 12, 0.3, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "rgba(200,240,255,0.4)"; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.ellipse(e.x-2+wiggle, e.y+6, 8, 12, -0.3, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(e.x+e.w+2-wiggle, e.y+6, 8, 12, 0.3, 0, Math.PI*2); ctx.stroke();
    } else {
      var flap = Math.sin(Date.now() / 80) * 6;
      ctx.fillStyle = "#663399";
      ctx.beginPath(); ctx.ellipse(e.x + e.w/2, e.y + e.h/2, e.w/2, e.h/2.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#442266";
      ctx.beginPath();
      ctx.moveTo(e.x + e.w/2, e.y + 4);
      ctx.lineTo(e.x - 4, e.y + flap + 4);
      ctx.lineTo(e.x + e.w/2, e.y + e.h/2);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(e.x + e.w/2, e.y + 4);
      ctx.lineTo(e.x + e.w + 4, e.y + flap + 4);
      ctx.lineTo(e.x + e.w/2, e.y + e.h/2);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#ff2244";
      ctx.fillRect(e.x + 5, e.y + 6, 4, 4);
      ctx.fillRect(e.x + 14, e.y + 6, 4, 4);
    }
    ctx.restore();
  });
}

function drawPlayerEntity(p) {
  ctx.save();
  if (p.inv > 0 && p === player) {
    var alpha = p.inv / 40 * 0.6;
    ctx.fillStyle = "rgba(0,0,0," + alpha + ")";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    if (Math.floor(p.inv / 4) % 2 === 0) ctx.globalAlpha = 0.3;
  }
  if (p.inv > 0 && Math.floor(p.inv/4)%2 === 0) ctx.globalAlpha = 0.3;

  ctx.fillStyle = "#0a0a2a";
  ctx.fillRect(p.x+4, p.y+8, p.w-8, p.h-8);
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x+5, p.y+10, p.w-10, p.h-12);
  ctx.fillStyle = p.headColor;
  ctx.fillRect(p.x+5, p.y+2, p.w-10, 7);
  ctx.fillStyle = "#fff";
  var eyeX = p.facing > 0 ? p.x+12 : p.x+6;
  ctx.fillRect(eyeX, p.y+4, 2.5, 2.5);

  if (p.hasSword && p.swordEquipped && !p.swordSheathed) {
    var sx = p.x+p.w/2, sy = p.y+p.h/2, angle = p.facing > 0 ? 0.3 : 2.8;
    if (p.swordSwing > 0) {
      var pr = 1-(p.swordSwing/12);
      if (p.vy < -2) angle = -Math.PI / 2;
      else if (p.vy > 2) angle = Math.PI / 2;
      else angle = (p.facing>0?-0.5:-2.5)+pr*(p.facing>0?2.5:2.5);
    }
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(angle);
    ctx.fillStyle = "#ddd"; ctx.fillRect(0, -2.5, 26, 5);
    ctx.fillStyle = "#fff"; ctx.fillRect(2, -1, 20, 1.5);
    ctx.fillStyle = "#d4af37"; ctx.fillRect(-2, -5, 5, 10);
    ctx.fillStyle = "#5a3010"; ctx.fillRect(-7, -2, 7, 3);
    ctx.restore();
  }
  ctx.restore();
}

function drawInventory() {
  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#6cc";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 24px monospace";
  ctx.fillText("🎒 INVENTARIO", canvas.width/2, 40);
  ctx.fillStyle = "#446";
  ctx.font = "12px monospace";
  ctx.fillText("Presiona ` o SHARE para cerrar", canvas.width/2, 60);

  ctx.textAlign = "left";
  ctx.fillStyle = "#0cc";
  ctx.font = "bold 14px monospace";
  ctx.fillText("👤 JUGADOR 1", 30, 100);
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("❤️ " + player.hp + "/" + player.maxHp, 200, 100);

  var items = [];
  if (player.hasSword) items.push("⚔️ Espada: ✓");
  if (hasBow) items.push("🏹 Arco: ✓");
  items.push("🏹 Flechas: " + arrows);
  if (hasMap) items.push("🗺️ Mapa: ✓");
  if (hasAzariCharm) items.push("💎 Bendición codiciosa: ✓");
  items.push("❤️ Fragmentos: " + heartFragments1 + "/3");
  items.push("💠 Azari: " + azari);
  items.push("🔄 Saltos: " + (hasDoubleJump ? "Doble" : "Simple"));

  var y = 125;
  items.forEach(function(item) {
    ctx.fillStyle = "#aaa";
    ctx.font = "12px monospace";
    ctx.fillText(item, 40, y);
    y += 25;
  });

  var statY = 300;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(30, statY, canvas.width - 60, 70);
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 1;
  ctx.strokeRect(30, statY, canvas.width - 60, 70);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 14px monospace";
  ctx.fillText("📊 ESTADÍSTICAS", canvas.width/2, statY + 20);
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText("⏱️ " + formatTime(stats.playTime) + "  |  ⚔️ " + stats.enemiesKilled + "  |  🏠 " + stats.roomsVisited, canvas.width/2, statY + 42);
  ctx.fillText("🦘 " + stats.jumps + "  |  ⚡ " + stats.attacks + "  |  💀 " + stats.deaths, canvas.width/2, statY + 60);
  ctx.textAlign = "left";
}

function drawGameWorld() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (flash*0.3) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.save(); ctx.translate(-Math.floor(cameraX), -Math.floor(cameraY));

  ctx.fillStyle = "#0a0a1a";
  for (var i = 0; i < 30; i++) {
    var bx = ((i * 173) % 8000), by = 50 + Math.sin(i * 2.3) * 100;
    ctx.globalAlpha = 0.03;
    ctx.beginPath(); ctx.arc(bx, by, 60 + Math.sin(i)*30, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i*137)%8000, sy = (i*89)%2000;
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
    var rx = r * ROOM_W;
    if (rx + ROOM_W < camLeft - 100 || rx > camRight + 100) continue;
    var room = rooms[r];
    if (room.height < camTop - 100 || 0 > camBottom + 100) continue;
    drawCaveBg(rx, room.decor, room.height);
    drawPlatforms(room);
    drawSpikes(room);
    if (r === 1) drawPedestal();
    if (r === 2) drawBombBox();
    if (r === 5) drawTransitionZone(room5.transitionZone);
    if (r === 9) { drawShopNPC(); drawHealingStone(); }
  }
  drawEnemies();
  arrowsInFlight.forEach(function(arrow) {
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(arrow.x, arrow.y, arrow.w, arrow.h);
    ctx.fillStyle = "#eee";
    ctx.fillRect(arrow.x + (arrow.vx > 0 ? arrow.w : -4), arrow.y - 2, 4, arrow.h + 4);
  });
  drawPlayerEntity(player);
  if (twoPlayerMode) drawPlayerEntity(player2);

  deathParticles.forEach(function(p) {
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
  });
  ctx.globalAlpha = 1;

  particles.forEach(function(p) { ctx.globalAlpha = Math.max(0, p.life/p.maxLife); ctx.fillStyle = p.color; ctx.fillRect(p.x-p.size/2, p.y-p.size/2, p.size, p.size); });
  ctx.globalAlpha = 1;
  floatTexts.forEach(function(t) { ctx.globalAlpha = Math.max(0, t.life/70); ctx.fillStyle = t.color; ctx.font = "bold 13px monospace"; ctx.fillText(t.text, t.x, t.y); });
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawHpBar(p, barX, barY) {
  var segW = 14, segH = 10, gap = 1;
  ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(barX - 4, barY - 4, (segW + gap) * p.maxHp + 6, segH + 8);
  ctx.strokeStyle = p.id === 2 ? "#f4f" : "#f44"; ctx.lineWidth = 1; ctx.strokeRect(barX - 4, barY - 4, (segW + gap) * p.maxHp + 6, segH + 8);
  for (var i = 0; i < p.maxHp; i++) {
    if (i < p.hp) {
      ctx.fillStyle = p.id === 2 ? "#ff33ff" : "#ff3344";
      ctx.fillRect(barX + i * (segW + gap), barY, segW, segH);
      ctx.fillStyle = p.id === 2 ? "#ff77ff" : "#ff6677";
      ctx.fillRect(barX + i * (segW + gap), barY, segW, 3);
    } else {
      ctx.fillStyle = p.id === 2 ? "#331133" : "#331111";
      ctx.fillRect(barX + i * (segW + gap), barY, segW, segH);
      ctx.strokeStyle = p.id === 2 ? "#441144" : "#441111"; ctx.lineWidth = 0.5;
      ctx.strokeRect(barX + i * (segW + gap), barY, segW, segH);
    }
  }
}

function drawGame() {
  drawGameWorld();
  if (hitFlash > 0) {
    var alpha = hitFlash > 30 ? (60 - hitFlash) / 30 : hitFlash / 30;
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  var barX = canvas.width - 20 - (player.maxHp * 15);
  if (barX < 200) barX = 200;
  drawHpBar(player, barX, 14);
  if (twoPlayerMode) drawHpBar(player2, barX, 30);

  if (heartFragments1 > 0 || heartFragments2 > 0) {
    ctx.fillStyle = "#f44"; ctx.font = "bold 12px monospace";
    var fragText = "❤️ J1:" + heartFragments1 + "/3";
    if (twoPlayerMode) fragText += "  J2:" + heartFragments2 + "/3";
    ctx.fillText(fragText, barX, twoPlayerMode ? 50 : 28);
  }
  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";
  ctx.fillText(hasSword ? "⚔️ Espada" : "🛡️ Sin arma", 12, 22);
  if (hasSword) { ctx.fillStyle = player.swordCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("⚔️ J1: " + (player.swordCooldown <= 0 ? (player.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 42); }
  else { ctx.fillStyle = "#555"; ctx.fillText("Encuentra la espada...", 12, 42); }
  if (hasBow) { ctx.fillStyle = player.bowCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("🏹 Arco: " + (player.bowCooldown <= 0 ? "Listo" : "···"), 12, 62); }
  if (twoPlayerMode && hasSword) {
    ctx.fillStyle = player2.swordCooldown <= 0 ? "#f0f" : "#444"; ctx.fillText("⚔️ J2: " + (player2.swordCooldown <= 0 ? (player2.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 58);
  }
  if (hasSword) { ctx.fillStyle = "#ffd700"; ctx.font = "16px monospace"; ctx.fillText("🗡️", 750, 22); }
  if (hasMap) {
    ctx.textAlign = "right"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 13px monospace";
    ctx.fillText("🗺️ Mapa", canvas.width - 20, twoPlayerMode ? 74 : 42);
    ctx.textAlign = "left";
  }
  if (hasAzariCharm) {
    ctx.textAlign = "right"; ctx.fillStyle = "#0ff"; ctx.font = "bold 12px monospace";
    ctx.fillText("💎 Codicia", canvas.width - 20, twoPlayerMode ? 90 : 58);
    ctx.textAlign = "left";
  }
  if (zoneNameTimer > 0) {
    ctx.globalAlpha = Math.min(1, zoneNameTimer/30);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center";
    ctx.fillText(zoneName, canvas.width/2, 50);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }
  if (discoveryNotify.active) {
    var alpha = Math.min(1, discoveryNotify.timer / 40);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
    ctx.fillText("⚔️ ¡Nueva criatura descubierta!", canvas.width/2, 80);
    ctx.fillStyle = "#f88"; ctx.font = "bold 14px monospace";
    ctx.fillText(discoveryNotify.name, canvas.width/2, 105);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }
  ctx.textAlign = "center"; ctx.fillStyle = "#0ff"; ctx.font = "bold 16px monospace";
  ctx.fillText("💠 " + azari, canvas.width/2, canvas.height - 20);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(100,200,255,0.3)";
  ctx.font = "12px monospace";
  ctx.textAlign = "right";
  ctx.fillText("` = Inventario", canvas.width - 10, canvas.height - 20);
  ctx.textAlign = "left";
}

function drawMenu() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i * 137) % 800, sy = (i * 89) % 600;
    ctx.globalAlpha = 0.08 + Math.sin(Date.now()/1000 + i) * 0.06;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#6cc"; ctx.font = "bold 36px monospace"; ctx.textAlign = "center";
  ctx.fillText("⚔️ CABALLERO MÍSTICO", canvas.width/2, 80);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION, canvas.width/2, 105);
  ctx.fillStyle = "#666"; ctx.font = "14px monospace";
  ctx.fillText("Selecciona una ranura", canvas.width/2, 135);

  var saves = getSaves();
  for (var i = 0; i < 5; i++) {
    var y = 180 + i * 72, isSel = (i === menuSelection), slot = saves.slots[i];
    ctx.fillStyle = isSel ? "rgba(100, 200, 255, 0.12)" : "rgba(255,255,255,0.02)";
    ctx.fillRect(180, y, 440, 62);
    ctx.strokeStyle = isSel ? "#6cc" : "#2a2a3a"; ctx.lineWidth = isSel ? 2 : 1;
    ctx.strokeRect(180, y, 440, 62);
    ctx.textAlign = "left"; ctx.font = "bold 16px monospace"; ctx.fillStyle = isSel ? "#6cc" : "#888";
    ctx.fillText("RANURA " + (i+1), 200, y+22);
    ctx.font = "12px monospace";
    if (slot) {
      ctx.fillStyle = "#8f8"; ctx.fillText("🗂️  Guardado — " + fmtDate(slot.timestamp), 200, y+36);
      ctx.fillStyle = "#0ff"; ctx.fillText("💠 " + (slot.azari || 0) + " Azari" + (slot.hasMap ? "  🗺️ Mapa" : "") + "  ❤️ " + (slot.hp || "?") + "/" + (slot.maxHp || "?") + (slot.twoPlayer ? "  👥2P" : "  👤1P"), 200, y+52);
      var playTime = slot.stats ? slot.stats.playTime || 0 : 0;
      ctx.fillStyle = "#ffd700"; ctx.fillText("⏱️ " + formatTime(playTime), 430, y+52);
      ctx.fillStyle = "#555"; ctx.textAlign = "right"; ctx.fillText("[DEL/X] Borrar", 600, y+40);
    } else {
      ctx.fillStyle = "#444"; ctx.fillText("Vacía — ENTER para nueva partida", 200, y+40);
    }
    if (isSel) { ctx.fillStyle = "#6cc"; ctx.fillText("▶", 165, y+30); }
  }
  var adminY = 540, adminSelected = menuSelection === 5;
  ctx.fillStyle = adminSelected ? "rgba(255,80,80,0.18)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, adminY - 20, 440, 32);
  ctx.strokeStyle = adminSelected ? "#f66" : "#333"; ctx.lineWidth = adminSelected ? 2 : 1;
  ctx.strokeRect(180, adminY - 20, 440, 32);
  ctx.fillStyle = adminSelected ? "#f66" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((adminSelected ? "▶  " : "    ") + "Panel del admin", canvas.width/2, adminY);
  ctx.textAlign = "center"; ctx.fillStyle = "#333"; ctx.font = "12px monospace";
  ctx.fillText(gamepadConnected ? "⬆️⬇️ Navegar  •  ❌ Seleccionar  •  ⬜ Borrar" : "↑/↓ Navegar  •  ENTER Seleccionar  •  DEL/X Borrar", canvas.width/2, 580);

  if (menuSubState === "confirm_delete") {
    ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f44"; ctx.font = "bold 20px monospace";
    ctx.fillText("¿BORRAR RANURA " + (slotToDelete+1) + "?", canvas.width/2, 250);
    ctx.fillStyle = "#888"; ctx.font = "16px monospace";
    ctx.fillText("Esta acción no se puede deshacer", canvas.width/2, 285);
    ctx.fillStyle = "#0f0"; ctx.fillText("[Y / S] Confirmar", canvas.width/2, 330);
    ctx.fillStyle = "#f44"; ctx.fillText("[N / ESC] Cancelar", canvas.width/2, 360);
  }
  if (menuSubState === "admin_password") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f66"; ctx.font = "bold 24px monospace";
    ctx.fillText("PANEL DEL ADMIN", canvas.width/2, 220);
    ctx.fillStyle = "#aaa"; ctx.font = "14px monospace";
    ctx.fillText("Introduce la contraseña", canvas.width/2, 265);
    ctx.fillStyle = "#fff"; ctx.font = "bold 24px monospace";
    ctx.fillText("*".repeat(adminPassword.length), canvas.width/2, 315);
    ctx.fillStyle = adminMessage ? "#f66" : "#666"; ctx.font = "12px monospace";
    ctx.fillText(adminMessage || "ENTER confirmar  •  ESC cancelar", canvas.width/2, 370);
  }
  ctx.textAlign = "left";
}

function drawLanguageSelect() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i * 137) % 800, sy = (i * 89) % 600;
    ctx.globalAlpha = 0.08 + Math.sin(Date.now()/1000 + i) * 0.06;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 32px monospace";
  ctx.fillText("⚔️ CABALLERO MÍSTICO", canvas.width/2, 125);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace";
  ctx.fillText("ELIGE TU IDIOMA", canvas.width/2, 205);
  ctx.fillStyle = "#888"; ctx.font = "13px monospace";
  ctx.fillText("Choose your language  •  Escolha seu idioma", canvas.width/2, 232);
  for (var i = 0; i < languages.length; i++) {
    var y = 285 + i * 58, isSelected = i === languageSelection;
    ctx.fillStyle = isSelected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(250, y - 22, 300, 42);
    ctx.strokeStyle = isSelected ? "#6cc" : "#333"; ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeRect(250, y - 22, 300, 42);
    ctx.fillStyle = isSelected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
    ctx.fillText((isSelected ? "▶  " : "    ") + languages[i].label, canvas.width/2, y + 6);
  }
  ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar", canvas.width/2, 520);
  ctx.textAlign = "left";
}

function drawDeviceSelect() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 30px monospace";
  ctx.fillText(translateText("CABALLERO MÍSTICO"), canvas.width/2, 125);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace";
  ctx.fillText(translateText(device === "pc" ? "ELIGE TU DISPOSITIVO" : "ELIGE TU FORMA DE JUGAR"), canvas.width/2, 205);
  ctx.fillStyle = "#888"; ctx.font = "13px monospace";
  ctx.fillText("PC  •  Mobile / Tablet  •  Play Controller", canvas.width/2, 232);
  for (var i = 0; i < devices.length; i++) {
    var y = 285 + i * 58, isSelected = i === deviceSelection;
    ctx.fillStyle = isSelected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(220, y - 22, 360, 42);
    ctx.strokeStyle = isSelected ? "#6cc" : "#333"; ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeRect(220, y - 22, 360, 42);
    ctx.fillStyle = isSelected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
    ctx.fillText((isSelected ? "▶  " : "    ") + translateText(devices[i].label), canvas.width/2, y + 6);
  }
  ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar", canvas.width/2, 520);
  ctx.textAlign = "left";
}

function drawPause() {
  if (pauseSubState === "diary") {
    drawDiary();
    return;
  }
  if (pauseSubState === "audio") {
    drawAudioMenu();
    return;
  }
  ctx.fillStyle = "rgba(0,0,0,0.82)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.fillStyle = "#6cc"; ctx.font = "bold 32px monospace";
  ctx.fillText("⏸️  PAUSA", canvas.width/2, 130);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION + (twoPlayerMode ? "  •  👥 MODO 2P" : "  •  👤 MODO 1P"), canvas.width/2, 155);
  var opts = [
    "▶  Reanudar", "📖  Ver Diario",
    twoPlayerMode ? "👤  Quitar J2" : "👥  Agregar J2",
    "🎮  Controles", "🔊  Música y sonido", "🚪  Salir al Menú"
  ];
  for (var i = 0; i < 6; i++) {
    var y = 200 + i * 40;
    var isSel = (i === pauseSelection);
    ctx.fillStyle = isSel ? "rgba(100,200,255,0.15)" : "transparent";
    ctx.fillRect(250, y - 18, 300, 36);
    ctx.strokeStyle = isSel ? "#6cc" : "#333"; ctx.lineWidth = isSel ? 2 : 1;
    ctx.strokeRect(250, y - 18, 300, 36);
    ctx.fillStyle = isSel ? "#6cc" : "#aaa"; ctx.font = "bold 16px monospace";
    ctx.fillText(opts[i], canvas.width/2, y + 5);
  }
  ctx.fillStyle = "#444"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Navegar  •  ENTER Seleccionar  •  ESC Volver", canvas.width/2, 480);
  ctx.textAlign = "left";
}

function drawAudioMenu() {
  ctx.fillStyle = "rgba(0,0,0,0.9)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 28px monospace";
  ctx.fillText(translateText("MÚSICA Y SONIDO"), canvas.width/2, 130);
  ctx.fillStyle = "#aaa"; ctx.font = "15px monospace";
  ctx.fillText("Música: " + Math.round(musicVolume * 100) + "%", canvas.width/2, 220);
  ctx.fillText(translateText("Efectos") + ": " + Math.round(sfxVolume * 100) + "%", canvas.width/2, 270);
  ctx.fillStyle = "#6cc"; ctx.font = "13px monospace";
  ctx.fillText("↑/↓ Música  •  ←/→ Efectos", canvas.width/2, 355);
  ctx.fillStyle = "#666";
  ctx.fillText(translateText("ESC para volver"), canvas.width/2, 410);
  ctx.textAlign = "left";
}

function drawDiary() {
  ctx.fillStyle = "rgba(5,5,16,0.95)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 28px monospace";
  ctx.fillText("📖 DIARIO DEL CABALLERO", canvas.width/2, 60);
  ctx.fillStyle = "#446"; ctx.font = "12px monospace";
  ctx.fillText("Bestiario de criaturas abatidas", canvas.width/2, 85);
  var entries = Object.keys(bestiaryInfo);
  var startY = 110;
  entries.forEach(function(key, idx) {
    var data = bestiary[key], info = bestiaryInfo[key], y = startY + idx * 130;
    var discovered = data.discovered;
    ctx.fillStyle = discovered ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.02)";
    ctx.fillRect(120, y, 560, 115);
    ctx.strokeStyle = discovered ? "#ffd700" : "#333"; ctx.lineWidth = 2;
    ctx.strokeRect(120, y, 560, 115);
    ctx.textAlign = "left";
    if (discovered) {
      ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace";
      ctx.fillText("⚔️ " + info.name, 145, y + 26);
      ctx.fillStyle = "#0ff"; ctx.font = "bold 14px monospace";
      ctx.fillText("Abatidos: " + data.count, 145, y + 48);
      ctx.fillStyle = "#aaa"; ctx.font = "12px monospace";
      var words = info.desc.split(' ');
      var line = "", lineY = y + 72;
      words.forEach(function(w) {
        if ((line + w).length > 55) { ctx.fillText(line, 145, lineY); line = w + " "; lineY += 16; }
        else line += w + " ";
      });
      if (line) ctx.fillText(line, 145, lineY);
    } else {
      ctx.fillStyle = "#444"; ctx.font = "bold 18px monospace";
      ctx.fillText("???", 145, y + 28);
      ctx.fillStyle = "#333"; ctx.font = "12px monospace";
      ctx.fillText("Criatura no descubierta.", 145, y + 55);
      ctx.fillStyle = "#222"; ctx.fillRect(520, y + 20, 120, 75);
      ctx.strokeStyle = "#333"; ctx.strokeRect(520, y + 20, 120, 75);
      ctx.fillStyle = "#333"; ctx.font = "20px monospace"; ctx.textAlign = "center";
      ctx.fillText("?", 580, y + 65); ctx.textAlign = "left";
    }
  });
  ctx.textAlign = "center"; ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("Presiona ESC para volver", canvas.width/2, 560);
  ctx.textAlign = "left";
}

function drawControls() {
  ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 28px monospace";
  ctx.fillText("🎮  CONTROLES", canvas.width/2, 50);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText("Teclas del juego", canvas.width/2, 95);
  var controls = [
    "A / ← → Mover", "ESPACIO / ↑ → Saltar",
    "X / J → Atacar", "E → Interactuar",
    "` → Inventario", "ESC → Menú"
  ];
  for (var i = 0; i < controls.length; i++) {
    ctx.fillStyle = "#aaa"; ctx.font = "bold 14px monospace";
    ctx.fillText(controls[i], canvas.width/2, 140 + i * 35);
  }
  ctx.fillStyle = "#444"; ctx.font = "12px monospace";
  ctx.fillText("Presiona ESC para volver", canvas.width/2, 380);
  ctx.textAlign = "left";
}

function drawTransition() {
  drawGameWorld();
  ctx.fillStyle = "rgba(0, 0, 0, " + transFade + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (transPhase === "load") {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("CARGANDO", canvas.width/2, 30);
    ctx.textAlign = "left";
  }
}

function drawShop() {
  drawGameWorld();
  if (shopAnim > 0) {
    ctx.fillStyle = "rgba(255,215,0," + (shopAnim / 90) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 28px monospace";
  ctx.fillText("🏚️ TIENDA DEL EXILIADO", canvas.width/2, 120);
  ctx.fillStyle = "#6cc"; ctx.font = "18px monospace";
  ctx.fillText("💠 Azari: " + azari, canvas.width/2, 160);
  if (shopId === 0) {
    var shopItems = ["🗺️ Mapa - 45 Azari", "🏹 Arco - 35 Azari", "🏹 20 flechas - 5 Azari"];
    for (var i = 0; i < shopItems.length; i++) {
      var itemY = 225 + i * 40;
      var selected = menuSelection === i;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.18)" : "transparent";
      ctx.fillRect(180, itemY - 23, 440, 34);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, itemY - 23, 440, 34);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 16px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + shopItems[i], canvas.width/2, itemY);
    }
    ctx.fillStyle = "#666"; ctx.font = "13px monospace";
    ctx.fillText("↑/↓ Elegir  •  ENTER Comprar  •  ESC Salir", canvas.width/2, 355);
  } else if (shopId === 1) {
    ctx.fillStyle = "#6cc"; ctx.font = "18px monospace";
    ctx.fillText("💎 CASA DEL CORAZÓN", canvas.width/2, 200);
    ctx.fillStyle = "#fff"; ctx.font = "16px monospace";
    ctx.fillText("❤️ J1: " + heartFragments1 + "/3", canvas.width/2, 240);
    ctx.fillText("💗 J2: " + heartFragments2 + "/3", canvas.width/2, 270);
    var heartItems = ["❤️ Fragmento J1 - 25 Azari", "💗 Fragmento J2 - 25 Azari", "💎 Bendición codiciosa - 45 Azari"];
    for (var i = 0; i < heartItems.length; i++) {
      var heartY = 240 + i * 38, heartSelected = menuSelection === i;
      ctx.fillStyle = heartSelected ? "rgba(100,200,255,0.18)" : "transparent";
      ctx.fillRect(150, heartY - 20, 500, 32);
      ctx.strokeStyle = heartSelected ? "#6cc" : "#333"; ctx.lineWidth = heartSelected ? 2 : 1;
      ctx.strokeRect(150, heartY - 20, 500, 32);
      ctx.fillStyle = heartSelected ? "#6cc" : "#aaa"; ctx.font = "bold 15px monospace";
      ctx.fillText((heartSelected ? "▶  " : "    ") + heartItems[i], canvas.width/2, heartY);
    }
    ctx.fillStyle = "#666"; ctx.font = "13px monospace";
  }
    ctx.fillText("J1: " + heartFragments1 + "/3  •  J2: " + heartFragments2 + "/3", canvas.width/2, 360);
    ctx.fillText("↑/↓ Elegir  •  ENTER Comprar  •  ESC Salir", canvas.width/2, 390);
}

function drawExplosion() {
  drawGameWorld();
  var flashIntensity = 0;
  if (explosionAnim > 40) flashIntensity = (explosionAnim - 40) / 20;
  else if (explosionAnim > 20) flashIntensity = 0.8;
  else flashIntensity = explosionAnim / 25;
  ctx.fillStyle = "rgba(255, " + (100 + explosionAnim) + ", 0, " + (flashIntensity * 0.5) + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var radius = (60 - explosionAnim) * 4;
  ctx.strokeStyle = "rgba(255, " + (explosionAnim * 4) + ", 0, " + (explosionAnim / 60) + ")";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(explosionX - cameraX, explosionY - cameraY, radius, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = "rgba(255, 200, 0, " + (explosionAnim / 80) + ")";
  ctx.beginPath(); ctx.arc(explosionX - cameraX, explosionY - cameraY, radius * 0.7, 0, Math.PI*2); ctx.stroke();
  if (explosionAnim <= 15) {
    ctx.fillStyle = "rgba(0, 0, 0, " + (1 - explosionAnim / 15) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (explosionAnim <= 20) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("CARGANDO", canvas.width/2, 30);
    ctx.textAlign = "left";
  }
}
