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

function drawBossDoor(roomIndex) {
  var room = rooms[roomIndex];
  if (!room.bossName) return;
  var boss = null;
  enemies.forEach(function(e) {
    if (e.boss && e.room === roomIndex) boss = e;
  });
  var locked = boss && !boss.dead;
  var x = roomIndex * ROOM_W + ROOM_W - 18;
  ctx.fillStyle = locked ? "rgba(126, 19, 52, 0.9)" : "rgba(25, 126, 91, 0.75)";
  ctx.fillRect(x, 40, 12, room.height - 80);
  ctx.strokeStyle = locked ? "#ff416d" : "#64e6ae";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, 40, 12, room.height - 80);
  ctx.fillStyle = locked ? "#ff416d" : "#64e6ae";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(locked ? "BLOQUEADO" : "ABIERTO", x + 6, 28);
  ctx.textAlign = "left";
}

function drawBossDialogue() {
  var line = bossDialogueLines[bossDialogueIndex];
  if (!line) return;
  ctx.fillStyle = "rgba(3, 3, 12, 0.88)";
  ctx.fillRect(42, 385, canvas.width - 84, 150);
  ctx.strokeStyle = "#a85cff";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 385, canvas.width - 84, 150);
  ctx.fillStyle = line[0] ? "#ffd36a" : "#ff5f86";
  ctx.font = "bold 16px monospace";
  ctx.fillText(line[0] ? line[0] + ":" : "", 64, 420);
  ctx.fillStyle = "#fff";
  ctx.font = line[0] ? "15px monospace" : "bold 18px monospace";
  ctx.textAlign = line[0] ? "left" : "center";
  ctx.fillText("«" + line[1] + "»", line[0] ? 64 : canvas.width / 2, line[0] ? 458 : 460);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(200, 220, 255, 0.8)";
  ctx.font = "11px monospace";
  ctx.fillText("ENTER / ESPACIO para continuar", 64, 505);
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
    if (e.dead || (!e.canRoam && e.room !== currentRoom)) return;
    if (e.x + e.w < camLeft - 50 || e.x > camRight + 50) return;
    if (e.y + e.h < camTop - 50 || e.y > camBottom + 50) return;
    ctx.save();
    if (e.boss) {
      var bossColor = e.type === "guardian" ? "#b77b45" : (e.type === "queen_larva" ? "#9b4c9b" : "#415f98");
      ctx.fillStyle = "rgba(255,80,80,0.18)";
      ctx.fillRect(e.x - 8, e.y - 8, e.w + 16, e.h + 16);
      ctx.fillStyle = bossColor;
      ctx.fillRect(e.x, e.y + 14, e.w, e.h - 14);
      ctx.fillStyle = "#d8b18a";
      ctx.fillRect(e.x + 10, e.y, e.w - 20, 18);
      ctx.fillStyle = "#ff3344";
      ctx.fillRect(e.x + 15, e.y + 7, 5, 4);
      ctx.fillRect(e.x + e.w - 20, e.y + 7, 5, 4);
      if (e.type === "guardian") {
        ctx.fillStyle = "#6d4329"; ctx.fillRect(e.x - 8, e.y + 25, 10, 45); ctx.fillRect(e.x + e.w - 2, e.y + 25, 10, 45);
        ctx.fillStyle = "#ddd"; ctx.fillRect(e.x + e.w / 2 - 3, e.y + 28, 6, 30);
      } else if (e.type === "queen_larva") {
        ctx.fillStyle = "#d971bd";
        for (var q = 0; q < 3; q++) ctx.fillRect(e.x + 8 + q * 22, e.y + 40 + (q % 2) * 8, 12, 6);
      } else {
        ctx.fillStyle = "#d9e4ff"; ctx.fillRect(e.x + e.w - 5, e.y + 28, 28, 5);
        ctx.fillStyle = "#26385f"; ctx.fillRect(e.x - 5, e.y + 25, 10, 48);
      }
      ctx.fillStyle = "#f44"; ctx.fillRect(e.x, e.y - 14, e.w * Math.max(0, e.hp / e.maxHp), 5);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.strokeRect(e.x, e.y - 14, e.w, 5);
    } else if (e.type === 'cazador_paramo') {
      var hunterWobble = Math.sin(Date.now() / 120) * 2;
      var hunterFacing = e.vx < 0 ? -1 : 1;
      ctx.fillStyle = "rgba(20, 20, 25, 0.45)";
      ctx.beginPath();
      ctx.ellipse(e.x + e.w / 2, e.y + e.h, 15, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#62646b";
      ctx.beginPath();
      ctx.ellipse(e.x + e.w / 2, e.y + 11 + hunterWobble, 12, 8, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#3b3d43";
      ctx.fillRect(e.x + 4, e.y + 14, e.w - 8, 5);
      ctx.fillStyle = "#b6b8bd";
      ctx.fillRect(e.x + (hunterFacing > 0 ? 15 : 5), e.y + 8, 3, 3);
      ctx.fillStyle = "#292b30";
      ctx.fillRect(e.x + 3, e.y + 17, 5, 5);
      ctx.fillRect(e.x + e.w - 8, e.y + 17, 5, 5);
    } else if (e.type === 'larva_mosca') {
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

function drawBossProjectiles() {
  bossProjectiles.forEach(function(b) {
    if (b.room !== currentRoom) return;
    ctx.fillStyle = b.color;
    if (b.kind === "knight_bolt") {
      ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w / 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#bde"; ctx.fillRect(b.x + 2, b.y + 2, 3, 3);
    } else {
      ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y + b.h / 2, Math.max(b.w, b.h) / 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.fillRect(b.x + 2, b.y + 2, 3, 3);
    }

  });
}

function drawHealingHearts() {
  healingHearts.forEach(function(heart) {
    if (heart.room !== currentRoom) return;
    var pulse = Math.sin(heart.pulse) * 2;
    ctx.save();
    ctx.shadowColor = "#ff406b";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ff406b";
    ctx.beginPath();
    ctx.arc(heart.x + 6, heart.y + 6 + pulse, 5, Math.PI, 0);
    ctx.arc(heart.x + 12, heart.y + 6 + pulse, 5, Math.PI, 0);
    ctx.lineTo(heart.x + 9, heart.y + 17 + pulse);
    ctx.closePath();
    ctx.fill();
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
  if (p.dashing) {
    ctx.fillStyle = "rgba(120,190,255,0.35)";
    ctx.fillRect(p.x - p.dashDir * 18, p.y + 7, p.w, p.h - 7);
  }
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x+5, p.y+10, p.w-10, p.h-12);
  ctx.fillStyle = p.headColor;
  ctx.fillRect(p.x+5, p.y+2, p.w-10, 7);
  ctx.fillStyle = "#fff";
  var eyeX = p.facing > 0 ? p.x+12 : p.x+6;
  ctx.fillRect(eyeX, p.y+4, 2.5, 2.5);
  if (p.blocking) {
    ctx.strokeStyle = "#9de8ff";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(p.x + p.w/2 + p.facing * 12, p.y + p.h/2, 15, -Math.PI/2, Math.PI/2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

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
  ctx.fillText(translateText("🎒 INVENTARIO"), canvas.width/2, 40);
  ctx.fillStyle = "#446";
  ctx.font = "12px monospace";
  ctx.fillText(translateText("Presiona ` o SHARE para cerrar"), canvas.width/2, 60);
  if (hasMap) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#6cc";
    ctx.font = "bold 12px monospace";
    ctx.fillText("M: " + translateText(mapOpen ? "cerrar mapa" : "usar mapa"), canvas.width / 2, 80);
  }

  ctx.textAlign = "left";
  ctx.fillStyle = "#0cc";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("👤 JUGADOR 1"), 30, 100);
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
  if (mapOpen && hasMap) {
    ctx.fillStyle = "rgba(3, 8, 20, 0.97)";
    ctx.fillRect(14, 88, canvas.width - 28, 455);
    ctx.strokeStyle = "#6cc";
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 88, canvas.width - 28, 455);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 14px monospace";
    ctx.fillText(translateText("🗺️ MAPA DE TODAS LAS ZONAS"), canvas.width / 2, 110);

    var cardW = 101, cardH = 184, gap = 6, startX = 18, startY = 122;
    for (var roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
      var room = rooms[roomIndex];
      var col = roomIndex % 7, row = Math.floor(roomIndex / 7);
      var cardX = startX + col * (cardW + gap), cardY = startY + row * (cardH + gap);
      var selected = roomIndex === currentRoom;
      ctx.fillStyle = selected ? "rgba(93,72,12,0.75)" : "rgba(25,34,57,0.9)";
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeStyle = selected ? "#ffd700" : (room.bossName ? "#a85cff" : "#43516f");
      ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      ctx.fillStyle = selected ? "#ffd700" : "#d5def5";
      ctx.font = "bold 11px monospace";
      ctx.fillText(translateText("ZONA") + " " + (roomIndex + 1), cardX + cardW / 2, cardY + 14);

      var innerX = cardX + 7, innerY = cardY + 22, innerW = cardW - 14, innerH = cardH - 31;
      var scaleX = innerW / 800, scaleY = innerH / room.height;
      room.platforms.forEach(function(platform) {
        var localX = platform.x - roomIndex * ROOM_W;
        ctx.fillStyle = platform.y > room.height - 80 ? "#9b6b3e" : "#6c8a9b";
        ctx.fillRect(innerX + localX * scaleX, innerY + platform.y * scaleY,
          Math.max(3, platform.w * scaleX), Math.max(2, platform.h * scaleY));
      });
      (room.spikes || []).forEach(function(spike) {
        var spikeX = innerX + (spike.x - roomIndex * ROOM_W) * scaleX;
        ctx.fillStyle = "#e44";
        ctx.fillRect(spikeX, innerY + spike.y * scaleY, Math.max(3, spike.w * scaleX), 2);
      });
      (room.shops || []).forEach(function(shop) {
        ctx.fillStyle = "#4fdbb4";
        ctx.fillRect(innerX + (shop.npc.x - roomIndex * ROOM_W) * scaleX, innerY + shop.npc.y * scaleY - 3, 4, 5);
      });
      if (room.bossName) {
        ctx.fillStyle = "#d68cff";
        ctx.font = "bold 9px monospace";
        ctx.fillText(translateText("JEFE"), cardX + cardW / 2, cardY + cardH - 8);
      } else if (room.shops && room.shops.length) {
        ctx.fillStyle = "#4fdbb4";
        ctx.font = "9px monospace";
        ctx.fillText(translateText("TIENDA"), cardX + cardW / 2, cardY + cardH - 8);
      }
    }
    ctx.fillStyle = "#aaa";
    ctx.font = "11px monospace";
    ctx.fillText(translateText("Dorado: zona actual  •  Morado: jefe  •  Verde: tienda  •  Rojo: peligro"), canvas.width / 2, 532);
    ctx.textAlign = "left";
  }

  var statY = mapOpen && hasMap ? 555 : 300;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(30, statY, canvas.width - 60, 70);
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 1;
  ctx.strokeRect(30, statY, canvas.width - 60, 70);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("📊 ESTADÍSTICAS"), canvas.width/2, statY + 20);
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
    var rx = r * ROOM_W;
    if (rx + ROOM_W < camLeft - 100 || rx > camRight + 100) continue;
    var room = rooms[r];
    if (room.height < camTop - 100 || 0 > camBottom + 100) continue;
    drawCaveBg(rx, room.decor, room.height);
    drawPlatforms(room);
    drawSpikes(room);
    if (r === 1) drawPedestal();
    if (r === 2) drawBombBox();
    if (room.transitionZone) drawTransitionZone(room.transitionZone);
    if (room.bossName) drawBossDoor(r);
    if (r === 9) { drawShopNPC(); drawHealingStone(); }
  }
  drawEnemies();
  drawHealingHearts();
  drawBossProjectiles();
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
  var heartW = 15, heartH = 14, gap = 2;
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(barX - 6, barY - 5, (heartW + gap) * p.maxHp + 8, heartH + 10);
  ctx.strokeStyle = p.id === 2 ? "#f4f" : "#f44";
  ctx.lineWidth = 1;
  ctx.strokeRect(barX - 6, barY - 5, (heartW + gap) * p.maxHp + 8, heartH + 10);
  for (var i = 0; i < p.maxHp; i++) {
    var x = barX + i * (heartW + gap), color = p.id === 2 ? "#ff33ff" : "#ff3344";
    ctx.save();
    ctx.translate(x, barY);
    ctx.fillStyle = i < p.hp ? color : (p.id === 2 ? "#331133" : "#331111");
    ctx.strokeStyle = i < p.hp ? (p.id === 2 ? "#ff99ff" : "#ff8899") : "#552233";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(5, 5, 4.5, Math.PI, 0);
    ctx.arc(10, 5, 4.5, Math.PI, 0);
    ctx.lineTo(7.5, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
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
  ctx.fillText(hasSword ? "⚔️ " + translateText("Espada") : "🛡️ " + translateText("Sin arma"), 12, 22);
  if (hasSword) { ctx.fillStyle = player.swordCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("⚔️ J1: " + (player.swordCooldown <= 0 ? (player.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 42); }
  else { ctx.fillStyle = "#555"; ctx.fillText(translateText("Encuentra la espada..."), 12, 42); }
  if (hasBow) { ctx.fillStyle = player.bowCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("🏹 " + translateText("Arco") + ": " + (player.bowCooldown <= 0 ? translateText("Listo") : "···"), 12, 62); }
  ctx.fillStyle = player.dashCooldown <= 0 ? "#7af" : "#446";
  ctx.fillText("↯ " + translateText("Dash") + ": " + (player.dashCooldown <= 0 ? translateText("Listo") : "···"), 12, twoPlayerMode ? 76 : (hasBow ? 82 : 62));
  if (twoPlayerMode && hasSword) {
    ctx.fillStyle = player2.swordCooldown <= 0 ? "#f0f" : "#444"; ctx.fillText("⚔️ J2: " + (player2.swordCooldown <= 0 ? (player2.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 58);
  }
  if (hasSword) { ctx.fillStyle = "#ffd700"; ctx.font = "16px monospace"; ctx.fillText("🗡️", canvas.width - 28, 72); }
  if (hasMap) {
    ctx.textAlign = "right"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 13px monospace";
    ctx.fillText("🗺️ " + translateText("Mapa"), canvas.width - 20, twoPlayerMode ? 74 : 42);
    ctx.textAlign = "left";
  }
  if (hasAzariCharm) {
    ctx.textAlign = "right"; ctx.fillStyle = "#0ff"; ctx.font = "bold 12px monospace";
    ctx.fillText("💎 " + translateText("Bendición codiciosa"), canvas.width - 20, twoPlayerMode ? 90 : 58);
    ctx.textAlign = "left";
  }
  if (zoneNameTimer > 0) {
    ctx.globalAlpha = Math.min(1, zoneNameTimer/30);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center";
    ctx.fillText(zoneName, canvas.width/2, 50);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }
  var activeBoss = null;
  enemies.forEach(function(e) { if (e.boss && e.room === currentRoom && !e.dead) activeBoss = e; });
  if (activeBoss) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#f66"; ctx.font = "bold 13px monospace";
    ctx.fillText(activeBoss.bossName + "  " + activeBoss.hp + "/" + activeBoss.maxHp, canvas.width / 2, canvas.height - 42);
    ctx.fillStyle = "#421"; ctx.fillRect(190, canvas.height - 34, canvas.width - 380, 8);
    ctx.fillStyle = activeBoss.enraged ? "#ff3344" : "#d66";
    ctx.fillRect(190, canvas.height - 34, (canvas.width - 380) * Math.max(0, activeBoss.hp / activeBoss.maxHp), 8);
    ctx.textAlign = "left";
  }
  if (discoveryNotify.active) {
    var alpha = Math.min(1, discoveryNotify.timer / 40);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
    ctx.fillText("⚔️ " + translateText("Nueva criatura descubierta!"), canvas.width/2, 80);
    ctx.fillStyle = "#f88"; ctx.font = "bold 14px monospace";
    ctx.fillText(discoveryNotify.name, canvas.width/2, 105);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }
  ctx.textAlign = "right"; ctx.fillStyle = "#0ff"; ctx.font = "bold 13px monospace";
  ctx.fillText("💠 " + azari, canvas.width - 20, 98);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(100,200,255,0.3)";
  ctx.font = "12px monospace";
  ctx.textAlign = "right";
  ctx.fillText("` = " + translateText("Inventario"), canvas.width - 10, canvas.height - 20);
  ctx.textAlign = "left";
  if (adminMode) {
    ctx.fillStyle = "#f66";
    ctx.font = "bold 11px monospace";
    ctx.fillText("ADMIN", 12, canvas.height - 38);
  }
  if (adminConsoleOpen) drawAdminConsole();
}

function drawAdminConsole() {
  ctx.fillStyle = "rgba(3, 5, 12, 0.94)";
  ctx.fillRect(45, canvas.height - 255, canvas.width - 90, 215);
  ctx.strokeStyle = "#f66";
  ctx.lineWidth = 2;
  ctx.strokeRect(45, canvas.height - 255, canvas.width - 90, 215);
  ctx.textAlign = "left";
  ctx.fillStyle = "#f66";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("CONSOLA ADMIN  •  COMANDOS DISPONIBLES"), 65, canvas.height - 228);
  ctx.fillStyle = "#d5def5";
  ctx.font = "11px monospace";
  ctx.fillText("/give azari [cantidad]", 65, canvas.height - 202);
  ctx.fillText("/give espada", 65, canvas.height - 184);
  ctx.fillText("/give arco", 65, canvas.height - 166);
  ctx.fillText("/give mapa", 65, canvas.height - 148);
  ctx.fillText("/give flechas [cantidad]", 65, canvas.height - 130);
  ctx.fillText("/give vida", 65, canvas.height - 112);
  ctx.fillText("/tp habitacion [1-14]", 330, canvas.height - 202);
  ctx.fillText(translateText("Ejemplo: /give azari 1000"), 330, canvas.height - 184);
  ctx.fillText(translateText("Ejemplo: /tp habitacion 5"), 330, canvas.height - 166);
  ctx.fillStyle = "#fff";
  ctx.font = "14px monospace";
  ctx.fillText("> " + adminCommand + "_", 65, canvas.height - 78);
  ctx.fillStyle = "#fff";
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText(adminCommandMessage || translateText("ENTER ejecutar  •  ESC cerrar"), 65, canvas.height - 55);
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
  ctx.fillText(translateText("⚔️ CABALLERO MÍSTICO"), canvas.width/2, 80);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION, canvas.width/2, 105);
  ctx.fillStyle = "#666"; ctx.font = "14px monospace";
  ctx.fillText(translateText("Selecciona una ranura"), canvas.width/2, 135);

  var saves = getSaves();
  for (var i = 0; i < 5; i++) {
    var y = 180 + i * 72, isSel = (i === menuSelection), slot = saves.slots[i];
    ctx.fillStyle = isSel ? "rgba(100, 200, 255, 0.12)" : "rgba(255,255,255,0.02)";
    ctx.fillRect(180, y, 440, 62);
    ctx.strokeStyle = isSel ? "#6cc" : "#2a2a3a"; ctx.lineWidth = isSel ? 2 : 1;
    ctx.strokeRect(180, y, 440, 62);
    ctx.textAlign = "left"; ctx.font = "bold 16px monospace"; ctx.fillStyle = isSel ? "#6cc" : "#888";
    ctx.fillText(translateText("RANURA") + " " + (i+1), 200, y+22);
    ctx.font = "12px monospace";
    if (slot) {
      ctx.fillStyle = "#8f8"; ctx.fillText("🗂️  " + translateText("Guardado") + " — " + fmtDate(slot.timestamp), 200, y+36);
      ctx.fillStyle = "#0ff"; ctx.fillText("💠 " + (slot.azari || 0) + " Azari" + (slot.hasMap ? "  🗺️ Mapa" : "") + "  ❤️ " + (slot.hp || "?") + "/" + (slot.maxHp || "?") + "  " + (slot.difficulty || "normal").toUpperCase(), 200, y+52);
      var playTime = slot.stats ? slot.stats.playTime || 0 : 0;
      ctx.fillStyle = "#ffd700"; ctx.fillText("⏱️ " + formatTime(playTime), 430, y+52);
      ctx.fillStyle = "#555"; ctx.textAlign = "right"; ctx.fillText("[DEL/X] " + translateText("Borrar"), 600, y+40);
    } else {
      ctx.fillStyle = "#444"; ctx.fillText(translateText("Vacía") + " — ENTER " + translateText("para nueva partida"), 200, y+40);
    }
    if (isSel) { ctx.fillStyle = "#6cc"; ctx.fillText("▶", 165, y+30); }
  }
  var settingsY = 530, settingsSelected = menuSelection === 5;
  ctx.fillStyle = settingsSelected ? "rgba(100,200,255,0.15)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, settingsY - 20, 440, 32);
  ctx.strokeStyle = settingsSelected ? "#6cc" : "#333"; ctx.lineWidth = settingsSelected ? 2 : 1;
  ctx.strokeRect(180, settingsY - 20, 440, 32);
  ctx.fillStyle = settingsSelected ? "#6cc" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((settingsSelected ? "▶  " : "    ") + translateText("⚙️ Configuración"), canvas.width/2, settingsY);

  var adminY = 570, adminSelected = menuSelection === 6;
  ctx.fillStyle = adminSelected ? "rgba(255,80,80,0.18)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, adminY - 20, 440, 32);
  ctx.strokeStyle = adminSelected ? "#f66" : "#333"; ctx.lineWidth = adminSelected ? 2 : 1;
  ctx.strokeRect(180, adminY - 20, 440, 32);
  ctx.fillStyle = adminSelected ? "#f66" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((adminSelected ? "▶  " : "    ") + translateText("Panel del admin"), canvas.width/2, adminY);
  ctx.textAlign = "center"; ctx.fillStyle = "#333"; ctx.font = "12px monospace";
  ctx.fillText(gamepadConnected ? "⬆️⬇️ Navegar  •  ❌ Seleccionar  •  ⬜ Borrar" : "↑/↓ Navegar  •  ENTER Seleccionar  •  DEL/X Borrar", canvas.width/2, 598);

  if (menuSubState === "confirm_delete") {
    ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f44"; ctx.font = "bold 20px monospace";
    ctx.fillText(translateText("¿BORRAR RANURA") + " " + (slotToDelete+1) + "?", canvas.width/2, 250);
    ctx.fillStyle = "#888"; ctx.font = "16px monospace";
    ctx.fillText(translateText("Esta acción no se puede deshacer"), canvas.width/2, 285);
    ctx.fillStyle = "#0f0"; ctx.fillText("[Y / S] " + translateText("Confirmar"), canvas.width/2, 330);
    ctx.fillStyle = "#f44"; ctx.fillText("[N / ESC] " + translateText("Cancelar"), canvas.width/2, 360);
  }
  if (menuSubState === "admin_password") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f66"; ctx.font = "bold 24px monospace";
    ctx.fillText(translateText("Panel del admin"), canvas.width/2, 220);
    ctx.fillStyle = "#aaa"; ctx.font = "14px monospace";
    ctx.fillText(translateText("Introduce la contraseña"), canvas.width/2, 265);
    ctx.fillStyle = "#fff"; ctx.font = "bold 24px monospace";
    ctx.fillText("*".repeat(adminPassword.length), canvas.width/2, 315);
    ctx.fillStyle = adminMessage ? "#f66" : "#666"; ctx.font = "12px monospace";
    ctx.fillText(adminMessage || translateText("ENTER confirmar  •  ESC cancelar"), canvas.width/2, 370);
  }
  if (menuSubState === "difficulty") {
    ctx.fillStyle = "rgba(0,0,0,0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 25px monospace";
    ctx.fillText(translateText("ELIGE LA DIFICULTAD"), canvas.width / 2, 150);
    ctx.fillStyle = "#888";
    ctx.font = "13px monospace";
    ctx.fillText(translateText("Esta opción se guardará con la nueva partida"), canvas.width / 2, 180);
    difficultyOptions.forEach(function(option, index) {
      var y = 240 + index * 70, selected = difficultySelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 25, 440, 52);
      ctx.strokeStyle = selected ? "#6cc" : "#333";
      ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 25, 440, 52);
      ctx.fillStyle = selected ? "#6cc" : "#aaa";
      ctx.font = "bold 17px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + translateText(option.name), canvas.width / 2, y);
      ctx.fillStyle = "#888";
      ctx.font = "11px monospace";
      ctx.fillText(translateText(option.desc), canvas.width / 2, y + 20);
    });
    ctx.fillStyle = "#666";
    ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar  •  ESC Volver", canvas.width / 2, 500);
  }
  if (menuSubState === "settings") {
    ctx.fillStyle = "rgba(0,0,0,0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 26px monospace";
    ctx.fillText("⚙️ CONFIGURACIÓN", canvas.width / 2, 150);
    var settings = [
      "🌐 " + translateText("Idioma") + ": " + languages[languageSelection].label,
      "🎮 " + translateText("Dispositivo") + ": " + translateText(devices[deviceSelection].label),
      "🔐 " + translateText(adminMode ? "Admin activado" : "Activar modo admin")
    ];
    settings.forEach(function(option, index) {
      var y = 230 + index * 65, selected = settingsSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 25, 440, 48);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 25, 440, 48);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 15px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option, canvas.width / 2, y + 5);
    });
    ctx.fillStyle = "#666"; ctx.font = "12px monospace";
    ctx.fillText("↑/↓ " + translateText("Navegar") + "  •  ENTER " + translateText("Seleccionar") + "  •  ESC " + translateText("Volver"), canvas.width / 2, 470);
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
  if (pauseSubState === "settings") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 26px monospace";
    ctx.fillText("⚙️ CONFIGURACIÓN", canvas.width / 2, 130);
    var pauseSettings = [
      "🌐 Idioma: " + languages[languageSelection].label,
      "🎮 Dispositivo: " + devices[deviceSelection].label,
      "🔐 " + (adminMode ? "Admin activado" : "Activar modo admin")
    ];
    pauseSettings.forEach(function(option, index) {
      var y = 210 + index * 60, selected = settingsSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 23, 440, 46);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 23, 440, 46);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 15px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option, canvas.width / 2, y + 5);
    });
    ctx.fillStyle = "#666"; ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  ENTER Seleccionar  •  ESC Volver", canvas.width / 2, 430);
    ctx.textAlign = "left";
    return;
  }
  ctx.fillStyle = "rgba(0,0,0,0.82)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.fillStyle = "#6cc"; ctx.font = "bold 32px monospace";
  ctx.fillText("⏸️  " + translateText("PAUSA"), canvas.width/2, 130);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION + (twoPlayerMode ? "  •  👥 MODO 2P" : "  •  👤 MODO 1P"), canvas.width/2, 155);
  var opts = [
    "▶  " + translateText("Reanudar"), "📖  " + translateText("Ver Diario"),
    twoPlayerMode ? "👤  " + translateText("Quitar J2") : "👥  " + translateText("Agregar J2"),
    "🎮  " + translateText("Controles"), "🔊  " + translateText("MÚSICA Y SONIDO"), "⚙️  " + translateText("⚙️ Configuración"), "🚪  " + translateText("Salir al Menú")
  ];
  for (var i = 0; i < 7; i++) {
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
  ctx.fillText("↑/↓ " + translateText("Navegar") + "  •  ENTER " + translateText("Seleccionar") + "  •  ESC " + translateText("Volver"), canvas.width/2, 510);
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
  ctx.fillText(translateText("📖 DIARIO DEL CABALLERO"), canvas.width/2, 60);
  ctx.fillStyle = "#446"; ctx.font = "12px monospace";
  ctx.fillText(translateText("Registro de criaturas y grandes enemigos"), canvas.width/2, 85);
  var tabs = [{ key: "enemies", label: "⚔️ " + translateText("ENEMIGOS") }, { key: "bosses", label: "👑 " + translateText("JEFES") }];
  tabs.forEach(function(tab, idx) {
    var tabX = idx === 0 ? 270 : 530;
    var active = diaryCategory === tab.key;
    ctx.fillStyle = active ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(tabX - 105, 98, 210, 32);
    ctx.strokeStyle = active ? "#6cc" : "#333";
    ctx.lineWidth = active ? 2 : 1;
    ctx.strokeRect(tabX - 105, 98, 210, 32);
    ctx.fillStyle = active ? "#6cc" : "#777";
    ctx.font = "bold 14px monospace";
    ctx.fillText(tab.label, tabX, 120);
  });
  var entries = diaryCategory === "enemies" ? Object.keys(bestiaryInfo) : ["guardian", "queen_larva", "abyssal_knight"];
  var startY = 145;
  entries.forEach(function(key, idx) {
    var isBoss = diaryCategory === "bosses";
    var data = isBoss ? { discovered: !!bossArenaState[key], count: bossArenaState[key] ? 1 : 0 } : bestiary[key];
    var info = isBoss ? bossDiaryInfo[key] : bestiaryInfo[key], y = startY + idx * 130;
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
      ctx.fillText(isBoss ? "Derrotado: ✓" : "Abatidos: " + data.count, 145, y + 48);
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
  ctx.fillText("A/D o ←/→ cambiar categoría  •  ESC para volver", canvas.width/2, 560);
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
    "SHIFT / R1 → Dash", "C / L2 → Bloquear",
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
  if (shopAnim > 0) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#aaa";
    ctx.font = "bold 16px monospace";
    ctx.fillText(translateText("CARGANDO") + "...", canvas.width/2, canvas.height/2);
    ctx.fillStyle = "#6cc";
    ctx.font = "12px monospace";
    ctx.fillText(Math.ceil((shopAnim / 180) * 3) + "", canvas.width/2, canvas.height/2 + 28);
    ctx.textAlign = "left";
    return;
  }
  ctx.fillStyle = "#080818"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#151525";
  ctx.beginPath(); ctx.ellipse(canvas.width/2, 250, 330, 220, 0, Math.PI, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#25253a";
  ctx.fillRect(70, 250, canvas.width - 140, 310);
  ctx.fillStyle = "#30304a";
  ctx.fillRect(70, 250, canvas.width - 140, 8);
  ctx.fillStyle = "#3a3a4a";
  ctx.fillRect(70, 560, canvas.width - 140, 40);
  ctx.fillStyle = "#1a1a2a";
  ctx.fillRect(70, 560, canvas.width - 140, 5);
  for (var rock = 0; rock < 8; rock++) {
    var rx = 100 + rock * 83, ry = 300 + (rock % 3) * 42;
    ctx.fillStyle = rock % 2 ? "#45455c" : "#38384f";
    ctx.beginPath(); ctx.arc(rx, ry, 18 + (rock % 3) * 5, 0, Math.PI * 2); ctx.fill();
  }
  var vendorX = 680, vendorY = 445;
  ctx.fillStyle = "#5a351d";
  ctx.fillRect(590, 500, 180, 32);
  ctx.fillStyle = "#8b542b";
  ctx.fillRect(590, 500, 180, 6);
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(620, 510, 12, 8); ctx.fillRect(655, 510, 12, 8); ctx.fillRect(705, 510, 12, 8);
  ctx.fillStyle = "#8b4513"; ctx.fillRect(vendorX - 12, vendorY + 28, 24, 55);
  ctx.fillStyle = "#a0522d"; ctx.fillRect(vendorX - 12, vendorY + 28, 24, 6);
  ctx.fillStyle = "#ffd700"; ctx.fillRect(vendorX - 7, vendorY + 42, 4, 4); ctx.fillRect(vendorX + 3, vendorY + 42, 4, 4);
  ctx.fillStyle = "#d19a72"; ctx.beginPath(); ctx.arc(vendorX, vendorY + 15, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#332211"; ctx.fillRect(vendorX - 15, vendorY + 2, 30, 7);
  ctx.fillStyle = "#5a351d";
  ctx.fillRect(590, 500, 180, 22);
  ctx.fillStyle = "#8b542b";
  ctx.fillRect(590, 500, 180, 5);
  drawPlayerEntity(player);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
  ctx.fillText(shopId === 0 ? "TIENDA DEL EXPLORADOR" : "TIENDA DEL CORAZÓN", canvas.width/2, 85);
  ctx.fillStyle = "#6cc"; ctx.font = "16px monospace";
  ctx.fillText("💠 Azari: " + azari, canvas.width/2, 120);
  ctx.fillStyle = "#553311"; ctx.fillRect(82, 500, 38, 60);
  ctx.fillStyle = "#ffd700"; ctx.fillRect(106, 532, 5, 5);
  ctx.fillStyle = "#aaa"; ctx.font = "12px monospace";
  ctx.fillText("E: salir", 101, 585);
  if (shopGreetingTimer > 0) {
    ctx.fillStyle = "rgba(5,5,15,0.92)";
    ctx.fillRect(250, 390, 400, 82);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.strokeRect(250, 390, 400, 82);
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 13px monospace";
    ctx.fillText("COMERCIANTE:", 270, 414);
    ctx.fillStyle = "#fff";
    ctx.font = "12px monospace";
    ctx.fillText(shopGreeting, 270, 442, 360);
    ctx.textAlign = "center";
  }
  if (!shopMenuOpen) {
    ctx.fillStyle = "#aaa"; ctx.font = "14px monospace";
    ctx.fillText("Acércate al vendedor y pulsa E", canvas.width/2, 190);
    ctx.fillText("Pulsa E junto a la puerta para salir", canvas.width/2, 215);
    ctx.textAlign = "left";
    return;
  }
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
    ctx.fillText(shopConfirm >= 0 ? "ENTER confirmar compra  •  ESC cancelar" : "↑/↓ Elegir  •  ENTER Comprar", canvas.width/2, 355);
  } else if (shopId === 1) {
    ctx.fillStyle = "#6cc"; ctx.font = "18px monospace";
    ctx.fillText("💎 CASA DEL CORAZÓN", canvas.width/2, 200);
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
    ctx.fillText("J1: " + heartFragments1 + "/3  •  J2: " + heartFragments2 + "/3", canvas.width/2, 370);
    ctx.fillText(shopConfirm >= 0 ? "ENTER confirmar compra  •  ESC cancelar" : "↑/↓ Elegir  •  ENTER Comprar", canvas.width/2, 395);
  }
  ctx.fillStyle = "#777"; ctx.font = "12px monospace";
  ctx.fillText("ESC: pausa", canvas.width/2, 575);
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
