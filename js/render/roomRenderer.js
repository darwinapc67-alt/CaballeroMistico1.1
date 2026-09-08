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
  ctx.fillStyle = "rgba(0, 0, 8, 0.72)";
  ctx.fillRect(0, 0, canvas.width, 105);
  ctx.fillRect(0, canvas.height - 105, canvas.width, 105);
  ctx.fillStyle = "#ffd36a";
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText(translateText(dialogueMode === "story" ? "HISTORIA DE LA CIUDAD" : "ENTRADA CINEMÁTICA"), canvas.width / 2, 32);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(3, 3, 12, 0.88)";
  ctx.fillRect(42, 385, canvas.width - 84, 150);
  ctx.strokeStyle = "#a85cff";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 385, canvas.width - 84, 150);
  ctx.fillStyle = line[0] ? "#ffd36a" : "#ff5f86";
  ctx.font = "bold 16px monospace";
  ctx.fillText(line[0] ? translateText(line[0]) + ":" : "", 64, 420);
  ctx.fillStyle = "#fff";
  ctx.font = line[0] ? "15px monospace" : "bold 18px monospace";
  ctx.textAlign = line[0] ? "left" : "center";
  ctx.fillText("«" + translateText(line[1]) + "»", line[0] ? 64 : canvas.width / 2, line[0] ? 458 : 460);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(200, 220, 255, 0.8)";
  ctx.font = "11px monospace";
  ctx.fillText(interiorInspecting ? "E / ENTER volver  •  ESC salir" : "A/D o ←/→ mover  •  E inspeccionar  •  puerta para salir", 64, 505);
}
function drawHouseInterior() {
  var line = bossDialogueLines[bossDialogueIndex] || ["", ""];
  ctx.fillStyle = "#120f20";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#2a2035";
  ctx.fillRect(70, 70, canvas.width - 140, 455);
  ctx.fillStyle = "#3b2b43";
  ctx.fillRect(70, 70, canvas.width - 140, 28);
  ctx.fillStyle = "#171525";
  ctx.fillRect(70, 455, canvas.width - 140, 70);
  ctx.fillStyle = "#5a4660";
  ctx.fillRect(70, 525, canvas.width - 140, 15);
  ctx.fillStyle = "#151322";
  ctx.fillRect(70, 100, 14, 440);
  ctx.fillRect(916, 100, 14, 440);
  ctx.fillStyle = "#8c624c";
  ctx.fillRect(98, 370, 50, 155);
  ctx.fillStyle = "#d9a85e";
  ctx.fillRect(108, 435, 28, 90);
  ctx.fillStyle = "#fff0b0";
  ctx.font = "11px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SALIDA", 123, 420);
  var interiorObjects = currentHouse && currentHouse.objects ? currentHouse.objects : [];
  interiorObjects.forEach(function(object, index) {
    var objectX = 175 + index * 230;
    var selected = index === interiorSelection && !interiorInspecting;
    ctx.fillStyle = "#5b4667";
    ctx.fillRect(objectX, 350, 96, 12);
    ctx.fillStyle = "#e0b15f";
    if (index % 3 === 0) {
      ctx.fillRect(objectX + 20, 290, 56, 42);
      ctx.strokeStyle = "#f5d27a";
      ctx.strokeRect(objectX + 20, 290, 56, 42);
      ctx.fillStyle = "#72578a";
      ctx.fillRect(objectX + 47, 298, 2, 26);
    } else if (index % 3 === 1) {
      ctx.fillRect(objectX + 14, 294, 68, 42);
      ctx.fillStyle = "#4c385e";
      ctx.fillRect(objectX + 25, 300, 46, 28);
      ctx.fillStyle = "#f0c871";
      ctx.fillRect(objectX + 34, 304, 28, 3);
      ctx.fillRect(objectX + 34, 313, 22, 3);
    } else {
      ctx.fillStyle = "#bd794f";
      ctx.fillRect(objectX + 30, 286, 36, 48);
      ctx.fillStyle = "#f1c66d";
      ctx.fillRect(objectX + 39, 294, 18, 28);
    }
    ctx.strokeStyle = selected ? "#ffd36a" : "#6f607d";
    ctx.lineWidth = selected ? 3 : 1;
    ctx.strokeRect(objectX - 12, 370, 120, 52);
    ctx.fillStyle = selected ? "#ffd36a" : "#b8a9c9";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    ctx.fillText(object.label, objectX + 48, 405);
  });
  ctx.fillStyle = "#0b1522";
  ctx.fillRect(610, 390, 26, 48);
  ctx.fillStyle = "#12b8c4";
  ctx.fillRect(616, 398, 14, 40);
  ctx.fillStyle = "#d8e6f5";
  ctx.fillRect(617, 382, 12, 10);
  ctx.fillStyle = "#78a5c0";
  ctx.fillRect(608, 438, 30, 6);
  drawPlayerEntity({
    x: interiorPlayer.x - 11,
    y: interiorPlayer.y - 30,
    w: 22,
    h: 30,
    vx: interiorPlayer.vx,
    vy: interiorPlayer.vy,
    facing: interiorPlayer.vx < 0 ? -1 : 1,
    color: player.color,
    headColor: player.headColor,
    inv: 0,
    dashing: false,
    blocking: false,
    hasSword: false,
    swordEquipped: false,
    swordSheathed: true,
    swordSwing: 0
  });
  ctx.fillStyle = "#ffd36a";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.fillText("INTERIOR", canvas.width / 2, 45);
  ctx.fillStyle = "#f2dfb0";
  ctx.font = "bold 16px monospace";
  ctx.fillText(line[0] || "Memoria de la ciudad", canvas.width / 2, 405);
  ctx.font = "14px monospace";
  ctx.fillStyle = "#fff";
  ctx.fillText(line[1], canvas.width / 2, 435);
  ctx.fillStyle = "#9fb3c8";
  ctx.font = "12px monospace";
  var nearbyObject = false;
  if (!interiorInspecting && interiorObjects.length) {
    var nearestObjectX = 175 + interiorSelection * 230 + 48;
    nearbyObject = Math.abs(interiorPlayer.x - nearestObjectX) < 115;
  }
  ctx.fillText(interiorInspecting ? "E / ENTER volver  •  ESC salir" :
    (nearbyObject ? "E inspeccionar objeto  •  A/D mover" : "Acércate a los objetos para inspeccionarlos"), canvas.width / 2, 490);
  ctx.textAlign = "left";
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
function drawShopNPC() {
  var room = rooms[currentRoom];
  if (!room.shops || !room.shops.length) return;
  var houseX = 7360, houseY = 430, houseW = 320;
  ctx.fillStyle = "#26263a";
  ctx.fillRect(houseX, houseY + 25, houseW, 95);
  ctx.fillStyle = "#44334d";
  ctx.beginPath();
  ctx.moveTo(houseX - 18, houseY + 28);
  ctx.lineTo(houseX + houseW / 2, houseY - 38);
  ctx.lineTo(houseX + houseW + 18, houseY + 28);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#111122";
  ctx.fillRect(houseX + 30, houseY + 62, 34, 28);
  ctx.fillRect(houseX + houseW - 64, houseY + 62, 34, 28);
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 13px monospace";
  ctx.textAlign = "center";
  ctx.fillText("CASA DE COMERCIO", houseX + houseW / 2, houseY + 18);
  ctx.textAlign = "left";
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
