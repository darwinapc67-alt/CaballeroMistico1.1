function getZoneVisualProfile(roomIndex) {
  if (roomIndex >= 35) {
    return { id: "boss", top: "#170d1d", middle: "#28152d", bottom: "#080610", light: "#ff5b79", accent: "#d94d75", platform: "#3d263d", edge: "#a85b72", particle: "#ff9a72" };
  }
  if (roomIndex >= 30) {
    return { id: "abyss", top: "#070d1b", middle: "#101d32", bottom: "#03060f", light: "#3b8cff", accent: "#426fa8", platform: "#1d3049", edge: "#4e89bd", particle: "#82c8ff" };
  }
  if (roomIndex >= 21) {
    return { id: "city", top: "#17253d", middle: "#304967", bottom: "#101828", light: "#ffd36a", accent: "#b36b4d", platform: "#35435a", edge: "#d3a45e", particle: "#ffe8a5" };
  }
  if (roomIndex >= 11) {
    return { id: "marsh", top: "#101d20", middle: "#263b32", bottom: "#071110", light: "#8ee08a", accent: "#668d63", platform: "#33453b", edge: "#83b47b", particle: "#b5e6ad" };
  }
  return { id: "crystal", top: "#11152d", middle: "#202b50", bottom: "#070a18", light: "#69dfff", accent: "#536cb4", platform: "#303b5a", edge: "#79b8d6", particle: "#b9f3ff" };
}

function drawCaveBg(rx, decor, roomH, roomWidth, roomIndex) {
  roomWidth = roomWidth || ROOM_W;
  var roomSeed = Math.floor(rx / ROOM_W);
  var profile = getZoneVisualProfile(roomIndex);
  var bgGradient = ctx.createLinearGradient(rx, 0, rx, roomH);
  bgGradient.addColorStop(0, profile.top);
  bgGradient.addColorStop(0.52, profile.middle);
  bgGradient.addColorStop(1, profile.bottom);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(rx, 0, roomWidth, roomH);
  var backGradient = ctx.createLinearGradient(rx, 0, rx, roomH);
  backGradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
  backGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.05)");
  backGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
  ctx.fillStyle = backGradient;
  ctx.fillRect(rx, 0, roomWidth, roomH);
  drawCaveBackRelief(rx, roomH, roomWidth, roomSeed);
  drawZoneBackdropDetails(rx, roomH, roomWidth, roomIndex, roomSeed, profile);
  if (gameMode === "normal") drawNormalCaveAtmosphere(rx, roomH, roomWidth, roomSeed);
  for (var i = 0; i < 20; i++) {
    var sx = rx + (i * 137) % roomWidth, sy = (i * 89) % roomH;
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
  drawCaveEdgeDetails(rx, roomH, roomWidth, roomSeed, roomIndex);
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
      ctx.fillStyle = "rgba(66, 69, 92, 0.22)";
      ctx.fillRect(d.x + 3, d.y + 8, Math.max(2, d.w - 8), 2);
    }
  });
  drawZoneLighting(rx, roomH, roomWidth, profile);
}

function drawZoneBackdropDetails(rx, roomH, roomWidth, roomIndex, seed, profile) {
  ctx.save();
  var tileCount = Math.ceil(roomWidth / 220) + 1;
  ctx.globalAlpha = 0.5;
  for (var i = 0; i < tileCount; i++) {
    var x = rx + i * 220 + ((seed * 17) % 35);
    if (profile.id === "marsh") {
      ctx.fillStyle = "#132d29";
      ctx.fillRect(x + 26, roomH - 210, 13, 170);
      ctx.fillRect(x + 72, roomH - 180, 10, 140);
      ctx.strokeStyle = "#477957";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(x + 34, roomH - 160); ctx.quadraticCurveTo(x + 75, roomH - 230, x + 115, roomH - 130); ctx.stroke();
      ctx.fillStyle = "rgba(150, 240, 150, 0.2)";
      ctx.fillRect(x + 112, roomH - 116, 4, 4);
      ctx.fillRect(x + 128, roomH - 145, 3, 3);
    } else if (profile.id === "abyss") {
      ctx.fillStyle = "#172945";
      ctx.fillRect(x + 30, 110, 16, roomH - 150);
      ctx.fillRect(x + 105, 170, 12, roomH - 210);
      ctx.fillStyle = "#315b7f";
      ctx.fillRect(x + 23, 110, 30, 7);
      ctx.fillRect(x + 98, 170, 26, 6);
      ctx.strokeStyle = "rgba(108, 190, 255, 0.36)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x + 15, 110); ctx.lineTo(x + 38, 82); ctx.lineTo(x + 61, 110);
      ctx.moveTo(x + 90, 170); ctx.lineTo(x + 111, 143); ctx.lineTo(x + 130, 170); ctx.stroke();
    } else if (profile.id === "boss") {
      ctx.fillStyle = "#321b35";
      ctx.fillRect(x + 30, 90, 18, roomH - 115);
      ctx.fillRect(x + 106, 90, 18, roomH - 115);
      ctx.fillStyle = "#63334d";
      ctx.fillRect(x + 22, 82, 110, 12);
      ctx.strokeStyle = "rgba(232, 86, 121, 0.5)";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x + 77, 155, 43, Math.PI, 0); ctx.stroke();
      ctx.fillStyle = "#e26a7c";
      ctx.fillRect(x + 72, 128, 10, 18);
    } else if (profile.id === "city") {
      ctx.fillStyle = "#354966";
      ctx.fillRect(x + 22, roomH - 220, 105, 180);
      ctx.fillStyle = "#b36b4d";
      ctx.beginPath(); ctx.moveTo(x + 12, roomH - 220); ctx.lineTo(x + 75, roomH - 270); ctx.lineTo(x + 137, roomH - 220); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#f6d58a";
      ctx.fillRect(x + 42, roomH - 165, 16, 20);
      ctx.fillRect(x + 91, roomH - 165, 16, 20);
    } else {
      ctx.fillStyle = i % 2 ? "#1b3150" : "#172744";
      ctx.beginPath();
      ctx.moveTo(x + 20, roomH - 70); ctx.lineTo(x + 58, 100 + (i % 3) * 30); ctx.lineTo(x + 98, roomH - 70); ctx.closePath(); ctx.fill();
      ctx.fillStyle = profile.accent;
      ctx.globalAlpha = 0.45;
      ctx.fillRect(x + 56, 145 + (i % 3) * 30, 5, 48);
      ctx.globalAlpha = 0.5;
    }
  }
  ctx.globalAlpha = 0.32;
  for (var p = 0; p < 16; p++) {
    var px = rx + ((p * 97 + seed * 31) % Math.max(1, roomWidth));
    var py = 70 + ((p * 53 + seed * 19) % Math.max(80, roomH - 130));
    var drift = Math.sin(Date.now() / (profile.id === "abyss" ? 700 : 1000) + p) * 5;
    ctx.fillStyle = profile.particle;
    ctx.fillRect(px + drift, py, profile.id === "marsh" ? 3 : 2, profile.id === "boss" ? 4 : 2);
  }
  ctx.restore();
}

function drawZoneLighting(rx, roomH, roomWidth, profile) {
  var lightX = rx + roomWidth * 0.5;
  var lightY = profile.id === "abyss" ? roomH * 0.35 : roomH * 0.58;
  var radius = profile.id === "boss" ? 290 : 220;
  var glow = ctx.createRadialGradient(lightX, lightY, 12, lightX, lightY, radius);
  glow.addColorStop(0, profile.light + "22");
  glow.addColorStop(1, profile.light + "00");
  ctx.fillStyle = glow;
  ctx.fillRect(rx, 0, roomWidth, roomH);
}
function drawNormalCaveAtmosphere(rx, roomH, roomWidth, seed) {
  ctx.save();
  var tileWidth = 240;
  var tileCount = Math.ceil(roomWidth / tileWidth) + 1;

  // Repeated silhouettes keep the backdrop reusable across rooms without touching gameplay geometry.
  ctx.globalAlpha = 0.34;
  for (var tile = 0; tile < tileCount; tile++) {
    var tileX = rx + tile * tileWidth - (seed % 3) * 18;
    var ruinY = Math.min(roomH - 105, 320 + ((seed + tile) % 3) * 18);
    ctx.fillStyle = tile % 2 ? "#111226" : "#15142a";
    ctx.fillRect(tileX + 34, ruinY, 72, 72);
    ctx.fillRect(tileX + 20, ruinY + 18, 18, 54);
    ctx.fillRect(tileX + 104, ruinY + 29, 20, 43);
    ctx.beginPath();
    ctx.moveTo(tileX + 22, ruinY);
    ctx.lineTo(tileX + 69, ruinY - 25 - ((seed + tile) % 2) * 12);
    ctx.lineTo(tileX + 120, ruinY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(83, 82, 111, 0.3)";
    ctx.fillRect(tileX + 47, ruinY + 13, 9, 20);
    ctx.fillRect(tileX + 78, ruinY + 30, 10, 17);
    ctx.fillRect(tileX + 29, ruinY + 52, 15, 5);
  }

  // Hanging silhouettes are deliberately confined to the ceiling band.
  ctx.globalAlpha = 0.62;
  for (var stal = 0; stal < tileCount * 2; stal++) {
    var stalX = rx + 42 + stal * 113 + (seed % 5) * 7;
    var stalH = 18 + ((seed * 11 + stal * 17) % 42);
    ctx.fillStyle = stal % 2 ? "#1b1b31" : "#23233b";
    ctx.beginPath();
    ctx.moveTo(stalX - 13, 0);
    ctx.lineTo(stalX + 13, 0);
    ctx.lineTo(stalX + 4, stalH - 5);
    ctx.lineTo(stalX, stalH);
    ctx.lineTo(stalX - 7, stalH - 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(91, 94, 123, 0.22)";
    ctx.fillRect(stalX - 3, 2, 3, Math.max(3, stalH - 12));
  }

  // Wall crystals and purple plants use small local halos instead of heavy lighting.
  for (var crystal = 0; crystal < tileCount; crystal++) {
    var crystalX = rx + 74 + crystal * 197 + ((seed * 13) % 24);
    var crystalY = Math.min(roomH - 80, 150 + ((seed + crystal * 2) % 3) * 64);
    var crystalGlow = ctx.createRadialGradient(crystalX, crystalY, 2, crystalX, crystalY, 30);
    crystalGlow.addColorStop(0, "rgba(93, 216, 255, 0.22)");
    crystalGlow.addColorStop(1, "rgba(41, 104, 157, 0)");
    ctx.fillStyle = crystalGlow;
    ctx.beginPath(); ctx.arc(crystalX, crystalY, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#347d9c";
    ctx.beginPath();
    ctx.moveTo(crystalX, crystalY - 17);
    ctx.lineTo(crystalX + 7, crystalY + 8);
    ctx.lineTo(crystalX - 4, crystalY + 13);
    ctx.lineTo(crystalX - 10, crystalY - 6);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#a8efff";
    ctx.fillRect(crystalX - 2, crystalY - 10, 3, 7);

    var plantX = crystalX + 45;
    var plantY = roomH - 28 - ((seed + crystal) % 2) * 8;
    ctx.fillStyle = "rgba(177, 71, 255, 0.18)";
    ctx.beginPath(); ctx.arc(plantX, plantY - 10, 26, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#5f2d78";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(plantX, plantY);
    ctx.quadraticCurveTo(plantX - 8, plantY - 18, plantX - 13, plantY - 25);
    ctx.moveTo(plantX + 2, plantY);
    ctx.quadraticCurveTo(plantX + 6, plantY - 16, plantX + 15, plantY - 22);
    ctx.stroke();
    ctx.fillStyle = "#bf69e8";
    ctx.fillRect(plantX - 16, plantY - 28, 6, 5);
    ctx.fillRect(plantX + 13, plantY - 25, 6, 5);
  }

  // Low-opacity fog bands and shadows add depth while leaving the combat lane readable.
  ctx.globalAlpha = 0.1;
  for (var fog = 0; fog < tileCount; fog++) {
    var fogX = rx + fog * tileWidth;
    var fogGradient = ctx.createLinearGradient(fogX, roomH * 0.42, fogX, roomH * 0.66);
    fogGradient.addColorStop(0, "rgba(124, 126, 170, 0)");
    fogGradient.addColorStop(0.5, "rgba(124, 126, 170, 0.6)");
    fogGradient.addColorStop(1, "rgba(124, 126, 170, 0)");
    ctx.fillStyle = fogGradient;
    ctx.fillRect(fogX, roomH * 0.42, tileWidth, Math.min(150, roomH * 0.28));
  }
  ctx.globalAlpha = 0.16;
  for (var shadow = 0; shadow < tileCount; shadow++) {
    var shadowX = rx + 90 + shadow * tileWidth;
    ctx.fillStyle = "#02020b";
    ctx.beginPath();
    ctx.ellipse(shadowX, roomH - 112 - (shadow % 2) * 55, 72, 30, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
function drawCaveBackRelief(rx, roomH, roomWidth, seed) {
  ctx.save();
  ctx.globalAlpha = 0.42;
  for (var i = 0; i < 7; i++) {
    var x = rx + 30 + ((seed * 83 + i * 127) % Math.max(80, roomWidth - 60));
    var y = 70 + ((seed * 41 + i * 73) % Math.max(80, roomH - 150));
    var w = 80 + ((seed * 17 + i * 31) % 100);
    var h = 35 + ((seed * 13 + i * 19) % 55);
    ctx.fillStyle = i % 2 ? "#101125" : "#15152b";
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + w * 0.18, y + h * 0.25);
    ctx.lineTo(x + w * 0.45, y);
    ctx.lineTo(x + w * 0.78, y + h * 0.2);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(78, 82, 112, 0.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.45, y + 5);
    ctx.lineTo(x + w * 0.35, y + h * 0.55);
    ctx.lineTo(x + w * 0.52, y + h * 0.72);
    ctx.stroke();
  }
  ctx.restore();
}
function drawCaveEdgeDetails(rx, roomH, roomWidth, seed, roomIndex) {
  ctx.save();
  for (var i = 0; i < 5; i++) {
    var side = i % 2 ? 1 : -1;
    var x = rx + (side < 0 ? 18 + i * 9 : roomWidth - 34 - i * 8);
    var y = 80 + ((seed * 67 + i * 103) % Math.max(100, roomH - 180));
    ctx.strokeStyle = "rgba(76, 79, 105, 0.42)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + side * 12, y + 13);
    ctx.lineTo(x + side * 5, y + 31);
    ctx.lineTo(x + side * 18, y + 48);
    ctx.stroke();
  }
  for (var j = 0; j < 3; j++) {
    var crystalX = rx + (j % 2 ? roomWidth - 72 : 54 + j * 18);
    var crystalY = roomH - 62 - ((seed * 23 + j * 47) % 90);
    ctx.fillStyle = "rgba(53, 173, 202, 0.14)";
    ctx.beginPath();
    ctx.arc(crystalX, crystalY, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = j % 2 ? "#397a93" : "#4e9bb0";
    ctx.beginPath();
    ctx.moveTo(crystalX, crystalY - 18);
    ctx.lineTo(crystalX + 8, crystalY + 8);
    ctx.lineTo(crystalX - 4, crystalY + 14);
    ctx.lineTo(crystalX - 10, crystalY - 5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(180, 244, 255, 0.7)";
    ctx.fillRect(crystalX - 2, crystalY - 10, 3, 8);
  }
  if (roomH >= 560) {
    var torchX = rx + (seed % 2 ? roomWidth - 105 : 105);
    var torchY = roomH - 125;
    var torchState = roomIndex === currentRoom && roomIndex === roomAtmosphereRoom ? atmosphereTorches[0] : null;
    var windBoost = roomAtmosphereWind && torchState ? 0.18 : 0;
    var flamePower = torchState && !torchState.lit ? 0 : 1 + windBoost + (torchState ? torchState.flicker : 0);
    if (flamePower > 0) {
      var glow = ctx.createRadialGradient(torchX, torchY, 3, torchX, torchY, 58 + flamePower * 8);
      glow.addColorStop(0, "rgba(255, 170, 72, " + (0.13 + flamePower * 0.08) + ")");
      glow.addColorStop(1, "rgba(255, 120, 42, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(torchX, torchY, 58 + flamePower * 8, 0, Math.PI * 2); ctx.fill();
    } else {
      var shade = ctx.createRadialGradient(torchX, torchY, 2, torchX, torchY, 70);
      shade.addColorStop(0, "rgba(0, 0, 8, 0.3)");
      shade.addColorStop(1, "rgba(0, 0, 8, 0)");
      ctx.fillStyle = shade;
      ctx.beginPath(); ctx.arc(torchX, torchY, 70, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#70452e";
    ctx.fillRect(torchX - 3, torchY, 6, 27);
    if (flamePower > 0) {
      ctx.save();
      ctx.translate(torchX, torchY - 5);
      ctx.rotate(torchState ? (torchState.flicker + windBoost) * 0.65 : 0);
      ctx.fillStyle = "#ffb54d";
      ctx.fillRect(-5, -3 - flamePower * 4, 10, 10 + flamePower * 3);
      ctx.fillStyle = "#ffe6a1";
      ctx.fillRect(-2, -8 - flamePower * 4, 4, 6 + flamePower * 2);
      ctx.restore();
    }
  }
  ctx.restore();
}
function drawCityBg(rx, room) {
  var palette = ["#182848", "#213b59", "#294a62", "#31586a"];
  ctx.fillStyle = palette[room.district.length % palette.length];
  ctx.fillRect(rx, 0, ROOM_W, room.height);
  ctx.fillStyle = "rgba(255, 210, 120, 0.08)";
  ctx.fillRect(rx, 80, ROOM_W, 210);
  ctx.fillStyle = "#10182c";
  ctx.fillRect(rx, 470, ROOM_W, 90);
  for (var i = 0; i < 6; i++) {
    var bx = rx + i * 145 - 20;
    var bh = 85 + (i % 3) * 28;
    ctx.fillStyle = i % 2 ? "#31435a" : "#3a4960";
    ctx.fillRect(bx, 470 - bh, 112, bh);
    ctx.fillStyle = "rgba(255, 211, 106, 0.45)";
    for (var w = 0; w < 2; w++) {
      ctx.fillRect(bx + 22 + w * 42, 440 - bh, 11, 15);
    }
  }
  ctx.fillStyle = "rgba(255, 211, 106, 0.8)";
  for (var j = 0; j < 8; j++) {
    var lampX = rx + 35 + j * 105;
    ctx.fillRect(lampX, 120 + (j % 2) * 35, 4, 42);
    ctx.beginPath();
    ctx.arc(lampX + 2, 165 + (j % 2) * 35, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#f4d38a";
  ctx.font = "bold 14px monospace";
  ctx.fillText(room.district, rx + 22, 42);
}
function drawCityHouses(room, roomIndex) {
  (room.houses || []).forEach(function(house) {
    var x = roomIndex * ROOM_W + house.x;
    var width = 170;
    var top = 390;
    ctx.fillStyle = "#29243b";
    ctx.fillRect(x, top, width, 170);
    ctx.strokeStyle = "#80647a";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, top, width, 170);
    ctx.fillStyle = "#ad674f";
    ctx.beginPath();
    ctx.moveTo(x - 14, top);
    ctx.lineTo(x + width / 2, top - 55);
    ctx.lineTo(x + width + 14, top);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#d9a85e";
    ctx.fillRect(x + width / 2 - 16, 490, 32, 70);
    ctx.fillStyle = "#ffe8a5";
    ctx.fillRect(x + 24, 430, 30, 27);
    ctx.fillRect(x + width - 54, 430, 30, 27);
    ctx.fillStyle = "#fff4bc";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("E", x + width / 2, 480);
    ctx.textAlign = "left";
  });
}
function drawPlatforms(room, roomIndex) {
  var profile = getZoneVisualProfile(roomIndex !== undefined ? roomIndex :
    Math.floor((room.worldX !== undefined ? room.worldX : room.platforms[0].x) / ROOM_W));
  (room.hiddenPlatforms || []).forEach(function(p) {
    ctx.fillStyle = "rgba(126, 205, 255, 0.12)";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = "rgba(154, 224, 255, 0.35)";
    ctx.strokeRect(p.x, p.y, p.w, p.h);
  });
  var collapsingDragonFloor = floorCollapseTimer > 0 &&
    roomIndex === currentRoom &&
    roomIndex === 39 &&
    room.bossName === "GUARDIÁN DE LA CUEVA";
  room.platforms.forEach(function(p) {
    var isCollapsingBossFloor = collapsingDragonFloor && p.y >= 600;
    var floorDrop = isCollapsingBossFloor && floorCollapseTimer <= 120
      ? Math.pow((120 - floorCollapseTimer) / 120, 1.35) * 420
      : 0;
    ctx.save();
    if (floorDrop > 0) ctx.translate(0, floorDrop);
    ctx.fillStyle = p.y > 500 ? profile.platform : profile.accent;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = profile.edge;
    ctx.fillRect(p.x, p.y, p.w, Math.min(3, p.h));
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    for (var seam = 18 + ((p.x / 7) % 17); seam < p.w - 8; seam += 37 + ((p.y / 5) % 13)) {
      ctx.fillRect(p.x + seam, p.y + 4, 2, Math.max(2, p.h - 9));
    }
    ctx.strokeStyle = "rgba(12, 13, 25, 0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x + p.w * 0.22, p.y + 3);
    ctx.lineTo(p.x + p.w * 0.25, p.y + Math.min(p.h - 2, 9));
    ctx.lineTo(p.x + p.w * 0.32, p.y + Math.min(p.h - 2, 12));
    ctx.moveTo(p.x + p.w * 0.7, p.y + 3);
    ctx.lineTo(p.x + p.w * 0.67, p.y + Math.min(p.h - 2, 8));
    ctx.stroke();
    ctx.fillStyle = "#1a1a2a";
    ctx.fillRect(p.x, p.y + Math.max(0, p.h - 3), p.w, Math.min(3, p.h));
    ctx.restore();
    if (isCollapsingBossFloor && floorCollapseTimer <= 120) {
      var crackProgress = Math.max(0, Math.min(1, (120 - floorCollapseTimer) / 60));
      ctx.save();
      ctx.globalAlpha = 0.35 + crackProgress * 0.55;
      ctx.strokeStyle = "#171421";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p.x + p.w * 0.28, p.y);
      ctx.lineTo(p.x + p.w * 0.34, p.y + 10 + crackProgress * 8);
      ctx.lineTo(p.x + p.w * 0.30, p.y + 20 + crackProgress * 20);
      ctx.moveTo(p.x + p.w * 0.72, p.y);
      ctx.lineTo(p.x + p.w * 0.66, p.y + 12 + crackProgress * 9);
      ctx.lineTo(p.x + p.w * 0.70, p.y + 22 + crackProgress * 18);
      ctx.stroke();
      ctx.restore();
    }
  });
}
function drawWalls(room) {
  room.walls.forEach(function(w) {
    if (w.broken) {
      var breakAge = frameCounter - (w.brokenAt || 0);
      if (breakAge >= 0 && breakAge < 18) {
        ctx.globalAlpha = 1 - breakAge / 18;
        ctx.fillStyle = "#8b7057";
        for (var fragment = 0; fragment < 5; fragment++) {
          var fragmentX = w.x + ((fragment * 13) % Math.max(4, w.w - 4));
          var fragmentY = w.y + ((fragment * 37 + breakAge * (fragment + 1) * 2) % Math.max(8, w.h - 8));
          ctx.fillRect(fragmentX, fragmentY, 4 + (fragment % 2) * 3, 4);
        }
        ctx.globalAlpha = 1;
      }
      return;
    }
    ctx.fillStyle = w.breakable ? "#59483e" : "#343447";
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.fillStyle = w.breakable ? "#8b7057" : "#55556b";
    ctx.fillRect(w.x, w.y, w.w, 4);
    ctx.fillStyle = w.breakable ? "#302722" : "#1b1b2b";
    ctx.fillRect(w.x + w.w - 4, w.y, 4, w.h);
    ctx.strokeStyle = w.breakable ? "rgba(226, 188, 125, 0.42)" : "rgba(105, 106, 132, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w.x + 6, w.y + 12);
    ctx.lineTo(w.x + Math.min(w.w - 5, 16), w.y + 24);
    ctx.lineTo(w.x + 8, w.y + 37);
    ctx.stroke();
    ctx.fillStyle = "rgba(12, 13, 25, 0.55)";
    for (var blockY = w.y + 45; blockY < w.y + w.h - 5; blockY += 24) {
      ctx.fillRect(w.x + 3, blockY, Math.max(2, w.w - 9), 2);
    }
    if (w.breakable) {
      ctx.strokeStyle = "rgba(244, 210, 145, 0.65)";
      ctx.beginPath();
      ctx.moveTo(w.x + 4, w.y + 42);
      ctx.lineTo(w.x + w.w - 5, w.y + 86);
      ctx.moveTo(w.x + w.w - 5, w.y + 135);
      ctx.lineTo(w.x + 4, w.y + 188);
      ctx.stroke();
    }
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
  ctx.fillStyle = "rgba(92, 72, 57, 0.72)";
  ctx.fillRect(tz.x, tz.y + tz.h - 8, tz.w, 8);
  ctx.fillStyle = "rgba(211, 165, 102, 0.5)";
  ctx.fillRect(tz.x, tz.y + tz.h - 8, tz.w, 2);
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
