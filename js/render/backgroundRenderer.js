function getZoneVisualProfile(roomIndex) {
  if (rooms[roomIndex] && rooms[roomIndex].visualProfile === "brumalis") {
    return { id: "brumalis", top: "#a9c5cc", middle: "#49636a", bottom: "#111b20", light: "#d8eff2", accent: "#6d929b", platform: "#3d565d", edge: "#a1c2c8", particle: "#d4eef0" };
  }
  if ((roomIndex >= 0 && roomIndex <= 23) || roomIndex === 50) {
    return { id: "ardoris", top: "#8fb4a4", middle: "#34534a", bottom: "#09130f", light: "#c7e6c1", accent: "#6e8052", platform: "#4a4b3d", edge: "#8b8061", particle: "#c6d0a5" };
  }
  if (rooms[roomIndex] && rooms[roomIndex].optional) {
    if (rooms[roomIndex].visualProfile === "abyss") {
      return { id: "abyss", top: "#070d1b", middle: "#101d32", bottom: "#03060f", light: "#3b8cff", accent: "#426fa8", platform: "#1d3049", edge: "#4e89bd", particle: "#82c8ff" };
    }
    return { id: "crystal", top: "#11152d", middle: "#202b50", bottom: "#070a18", light: "#69dfff", accent: "#536cb4", platform: "#303b5a", edge: "#79b8d6", particle: "#b9f3ff" };
  }
  if (rooms[roomIndex] && rooms[roomIndex].bossName) {
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

function drawCaveBg(rx, roomH, roomWidth, roomIndex, backgroundHeight) {
  roomWidth = roomWidth || ROOM_W;
  backgroundHeight = Math.max(roomH, backgroundHeight || roomH);
  var roomSeed = Math.floor(rx / ROOM_W);
  var profile = getZoneVisualProfile(roomIndex);
  var bgGradient = ctx.createLinearGradient(rx, 0, rx, backgroundHeight);
  bgGradient.addColorStop(0, profile.top);
  bgGradient.addColorStop(0.52, profile.middle);
  bgGradient.addColorStop(1, profile.bottom);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(rx, 0, roomWidth, roomH);
  var backGradient = ctx.createLinearGradient(rx, 0, rx, backgroundHeight);
  backGradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
  backGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.05)");
  backGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
  ctx.fillStyle = backGradient;
  ctx.fillRect(rx, 0, roomWidth, roomH);
}

function drawCaveBgDetails(rx, decor, roomH, roomWidth, roomIndex, continuity) {
  roomWidth = roomWidth || ROOM_W;
  continuity = continuity || {backgroundHeight: roomH, left: false, right: false};
  var roomSeed = Math.floor(rx / ROOM_W);
  var profile = getZoneVisualProfile(roomIndex);
  if (roomIndex === 0) {
    var entranceCenter = rx + 320;
    ctx.fillStyle = "#668a73";
    ctx.fillRect(rx - 40, 0, 300, 540);
    ctx.fillStyle = "#d7c68f";
    ctx.globalAlpha = 0.28;
    ctx.beginPath();
    ctx.arc(rx + 110, 110, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#263f31";
    for (var exteriorPlant = 0; exteriorPlant < 4; exteriorPlant++) {
      var exteriorX = rx + 18 + exteriorPlant * 58;
      ctx.beginPath();
      ctx.moveTo(exteriorX, 560);
      ctx.quadraticCurveTo(exteriorX - 12, 525, exteriorX - 22, 480);
      ctx.quadraticCurveTo(exteriorX - 4, 500, exteriorX + 6, 548);
      ctx.quadraticCurveTo(exteriorX + 14, 490, exteriorX + 28, 470);
      ctx.quadraticCurveTo(exteriorX + 20, 530, exteriorX + 12, 560);
      ctx.closePath();
      ctx.fill();
    }
    var exteriorGlow = ctx.createRadialGradient(entranceCenter, -20, 20, entranceCenter, 50, 300);
    exteriorGlow.addColorStop(0, "rgba(211, 237, 194, 0.68)");
    exteriorGlow.addColorStop(0.25, "rgba(157, 205, 169, 0.32)");
    exteriorGlow.addColorStop(1, "rgba(115, 165, 145, 0)");
    ctx.fillStyle = exteriorGlow;
    ctx.fillRect(entranceCenter - 300, -20, 600, 360);
    ctx.fillStyle = "rgba(191, 224, 188, 0.12)";
    ctx.beginPath();
    ctx.moveTo(entranceCenter - 72, 0);
    ctx.lineTo(entranceCenter + 58, 0);
    ctx.lineTo(entranceCenter + 150, 310);
    ctx.lineTo(entranceCenter - 145, 310);
    ctx.closePath();
    ctx.fill();
  }
  drawCaveBackRelief(rx, roomH, roomWidth, roomSeed, continuity);
  drawNaturalRockLayers(rx, roomH, roomWidth, profile);
  drawZoneBackdropDetails(rx, roomH, roomWidth, roomIndex, roomSeed, profile);
  if (gameMode === "normal") drawNormalCaveAtmosphere(rx, roomH, roomWidth, roomSeed, profile);
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
  drawCaveEdgeDetails(rx, roomH, roomWidth, roomSeed, roomIndex, continuity);
  drawCaveDecor(decor, continuity);
  drawZoneLighting(rx, roomH, roomWidth, profile, continuity.backgroundHeight);
}

function drawCaveDecor(decor, continuity) {
  (decor || []).forEach(function(d) {
    if (d.type === 'stalactite') {
      var stalactiteGradient = ctx.createLinearGradient(d.x, d.y, d.x + d.w, d.y + d.h);
      stalactiteGradient.addColorStop(0, "#111426");
      stalactiteGradient.addColorStop(0.38, "#34364e");
      stalactiteGradient.addColorStop(0.72, "#20243a");
      stalactiteGradient.addColorStop(1, "#0c1020");
      ctx.fillStyle = stalactiteGradient;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.w * 0.36, d.y + d.h * 0.1);
      ctx.lineTo(d.x + d.w * 0.54, d.y + d.h * 0.58);
      ctx.lineTo(d.x + d.w * 0.43, d.y + d.h);
      ctx.lineTo(d.x + d.w * 0.24, d.y + d.h * 0.64);
      ctx.lineTo(d.x + d.w * 0.08, d.y + d.h * 0.18);
      ctx.lineTo(d.x + d.w, d.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(126, 145, 183, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(d.x + d.w * 0.36, d.y + 3);
      ctx.lineTo(d.x + d.w * 0.4, d.y + d.h * 0.36);
      ctx.lineTo(d.x + d.w * 0.51, d.y + d.h * 0.55);
      ctx.stroke();
    } else if (d.type === 'rock') {
      ctx.fillStyle = "#151525";
      ctx.beginPath();
      ctx.moveTo(d.x, d.y + d.h);
      ctx.lineTo(d.x + d.w/2, d.y);
      ctx.lineTo(d.x + d.w, d.y + d.h);
      ctx.closePath();
      ctx.fill();
    } else if (d.type === 'wall') {
      if (continuity && (d.side ? continuity.right : continuity.left)) return;
      var wallGradient = ctx.createLinearGradient(d.x, d.y, d.x + d.w, d.y + d.h);
      wallGradient.addColorStop(0, "#101221");
      wallGradient.addColorStop(1, "#27293d");
      ctx.fillStyle = wallGradient;
      ctx.beginPath();
      if (d.side) {
        ctx.moveTo(d.x + d.w, d.y);
        ctx.lineTo(d.x + d.w * 0.38, d.y + d.h * 0.12);
        ctx.lineTo(d.x + d.w * 0.52, d.y + d.h * 0.4);
        ctx.lineTo(d.x, d.y + d.h * 0.62);
        ctx.lineTo(d.x + d.w * 0.42, d.y + d.h);
        ctx.lineTo(d.x + d.w, d.y + d.h);
      } else {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.w * 0.62, d.y + d.h * 0.12);
        ctx.lineTo(d.x + d.w * 0.48, d.y + d.h * 0.4);
        ctx.lineTo(d.x + d.w, d.y + d.h * 0.62);
        ctx.lineTo(d.x + d.w * 0.58, d.y + d.h);
        ctx.lineTo(d.x, d.y + d.h);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(91, 98, 126, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });
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
      ctx.moveTo(x + 8, 0);
      ctx.lineTo(x + 112, 0);
      ctx.lineTo(x + 99, 34);
      ctx.lineTo(x + 76, 48);
      ctx.lineTo(x + 59, 92 + (i % 3) * 12);
      ctx.lineTo(x + 43, 61);
      ctx.lineTo(x + 25, 50);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(103, 115, 148, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 59, 10);
      ctx.lineTo(x + 54, 52);
      ctx.lineTo(x + 68, 70);
      ctx.stroke();
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

function drawZoneLighting(rx, roomH, roomWidth, profile, backgroundHeight) {
  backgroundHeight = Math.max(roomH, backgroundHeight || roomH);
  var lightX = rx + roomWidth * 0.5;
  var lightY = profile.id === "abyss" ? backgroundHeight * 0.35 : backgroundHeight * 0.58;
  var radius = profile.id === "boss" ? 290 : 220;
  var glow = ctx.createRadialGradient(lightX, lightY, 12, lightX, lightY, radius);
  glow.addColorStop(0, profile.light + "22");
  glow.addColorStop(1, profile.light + "00");
  ctx.fillStyle = glow;
  ctx.fillRect(rx, 0, roomWidth, roomH);
}
function drawCaveLocalLighting(roomIndex, room) {
  var roomWidth = room.roomWidth || ROOM_W;
  var roomX = room.worldX !== undefined ? room.worldX : roomIndex * ROOM_W;
  var roomHeight = room.height;
  var profile = getZoneVisualProfile(roomIndex);
  var roomSeed = Math.floor(roomX / ROOM_W);
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  var torchX = roomX + (roomSeed % 2 ? roomWidth - 105 : 105);
  var torchY = roomHeight - 125;
  var torchState = roomIndex === currentRoom && roomIndex === roomAtmosphereRoom
    ? atmosphereTorches[0]
    : null;
  var flamePower = torchState && !torchState.lit
    ? 0
    : 1 + (torchState ? torchState.flicker : 0);
  if (flamePower > 0 && roomHeight >= 560) {
    var torchRadius = 145 + flamePower * 20;
    var torchGlow = ctx.createRadialGradient(torchX, torchY - 4, 4, torchX, torchY - 4, torchRadius);
    torchGlow.addColorStop(0, "rgba(255, 178, 89, 0.24)");
    torchGlow.addColorStop(0.32, "rgba(255, 129, 56, 0.12)");
    torchGlow.addColorStop(1, "rgba(255, 98, 39, 0)");
    ctx.fillStyle = torchGlow;
    ctx.fillRect(torchX - torchRadius, torchY - torchRadius, torchRadius * 2, torchRadius * 2);
  }

  for (var crystal = 0; crystal < 2; crystal++) {
    var crystalX = roomX + (crystal === 0 ? 54 : roomWidth - 72);
    var crystalY = roomHeight - 62 - ((roomSeed * 23 + crystal * 47) % 90);
    var crystalRadius = 118;
    var crystalGlow = ctx.createRadialGradient(crystalX, crystalY, 2, crystalX, crystalY, crystalRadius);
    crystalGlow.addColorStop(0, profile.id === "boss"
      ? "rgba(255, 104, 135, 0.23)"
      : "rgba(93, 216, 255, 0.2)");
    crystalGlow.addColorStop(0.38, profile.id === "boss"
      ? "rgba(191, 63, 117, 0.1)"
      : "rgba(54, 132, 197, 0.09)");
    crystalGlow.addColorStop(1, "rgba(45, 114, 175, 0)");
    ctx.fillStyle = crystalGlow;
    ctx.fillRect(crystalX - crystalRadius, crystalY - crystalRadius, crystalRadius * 2, crystalRadius * 2);
  }
  ctx.restore();
}
function drawNormalCaveAtmosphere(rx, roomH, roomWidth, seed, profile) {
  ctx.save();
  if (profile.id === "ardoris") {
    var mossCount = Math.ceil(roomWidth / 220);
    ctx.globalAlpha = 0.34;
    for (var moss = 0; moss < mossCount; moss++) {
      var mossX = rx + 35 + moss * 220 + ((seed * 29 + moss * 41) % 70);
      var mossY = roomH - 30 - ((seed + moss) % 3) * 10;
      ctx.fillStyle = moss % 2 ? "#66815a" : "#4f7052";
      ctx.beginPath();
      ctx.ellipse(mossX, mossY, 18 + moss % 3 * 5, 5 + moss % 2 * 2, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#7d9567";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mossX - 12, mossY - 2);
      ctx.quadraticCurveTo(mossX - 28, mossY - 24, mossX - 36, mossY - 42);
      ctx.moveTo(mossX + 8, mossY - 3);
      ctx.quadraticCurveTo(mossX + 24, mossY - 20, mossX + 31, mossY - 34);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }
  if (profile.id === "marsh") {
    var rootCount = Math.ceil(roomWidth / 260);
    ctx.globalAlpha = 0.28;
    for (var root = 0; root < rootCount; root++) {
      var rootX = rx + 70 + root * 260 + ((seed * 19 + root * 37) % 55);
      var rootLength = 70 + ((seed * 13 + root * 29) % 75);
      ctx.strokeStyle = root % 2 ? "#45634d" : "#536b4e";
      ctx.lineWidth = 4 + root % 2;
      ctx.beginPath();
      ctx.moveTo(rootX, 0);
      ctx.bezierCurveTo(rootX - 18, rootLength * 0.35, rootX + 18, rootLength * 0.66, rootX + 2, rootLength);
      ctx.stroke();
      ctx.fillStyle = "#71835b";
      ctx.beginPath();
      ctx.ellipse(rootX + 5, rootLength - 5, 7, 3, -0.35, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 0.16;
    for (var mist = 0; mist < 3; mist++) {
      var mistX = rx + mist * roomWidth / 3;
      var mistY = roomH * (0.56 + mist * 0.035);
      var mistGradient = ctx.createLinearGradient(mistX, mistY - 45, mistX, mistY + 55);
      mistGradient.addColorStop(0, "rgba(107, 170, 112, 0)");
      mistGradient.addColorStop(0.5, "rgba(107, 170, 112, 0.55)");
      mistGradient.addColorStop(1, "rgba(107, 170, 112, 0)");
      ctx.fillStyle = mistGradient;
      ctx.fillRect(mistX, mistY - 45, roomWidth / 3 + 30, 100);
    }
    ctx.restore();
    return;
  }

  var tileWidth = 240;
  var tileCount = Math.ceil(roomWidth / tileWidth) + 1;

  ctx.globalAlpha = 0.48;
  for (var stal = 0; stal < tileCount; stal++) {
    var stalX = rx + 65 + stal * tileWidth + ((seed * 11 + stal * 23) % 90);
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
  for (var crystal = 0; crystal < Math.max(1, Math.floor(tileCount / 2)); crystal++) {
    var crystalX = rx + 110 + crystal * tileWidth * 1.6 + ((seed * 13 + crystal * 17) % 48);
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

    if (crystal % 2 !== seed % 2) continue;
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
  ctx.restore();
}
function drawCaveBackRelief(rx, roomH, roomWidth, seed, continuity) {
  ctx.save();
  ctx.globalAlpha = 0.28;
  for (var i = 0; i < 7; i++) {
    var side = i % 2 ? 1 : -1;
    if (continuity && (side < 0 ? continuity.left : continuity.right)) continue;
    var w = 45 + ((seed * 17 + i * 31) % 65);
    var x = side < 0 ? rx : rx + roomWidth - w;
    var y = 70 + ((seed * 41 + i * 73) % Math.max(80, roomH - 150));
    var h = 35 + ((seed * 13 + i * 19) % 55);
    ctx.fillStyle = i % 2 ? "#101125" : "#15152b";
    ctx.beginPath();
    if (side < 0) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + w * 0.65, y + h * 0.12);
      ctx.lineTo(x + w * 0.48, y + h * 0.4);
      ctx.lineTo(x + w, y + h * 0.62);
      ctx.lineTo(x + w * 0.58, y + h);
      ctx.lineTo(x, y + h);
    } else {
      ctx.moveTo(x + w, y);
      ctx.lineTo(x + w * 0.35, y + h * 0.12);
      ctx.lineTo(x + w * 0.52, y + h * 0.4);
      ctx.lineTo(x, y + h * 0.62);
      ctx.lineTo(x + w * 0.42, y + h);
      ctx.lineTo(x + w, y + h);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(78, 82, 112, 0.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * (side < 0 ? 0.65 : 0.35), y + 5);
    ctx.lineTo(x + w * (side < 0 ? 0.48 : 0.52), y + h * 0.55);
    ctx.lineTo(x + w * (side < 0 ? 0.72 : 0.28), y + h * 0.72);
    ctx.stroke();
  }
  ctx.restore();
}

function getBackgroundVariation(cell, layer) {
  var value = Math.sin(cell * 127.1 + layer * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function drawNaturalRockLayers(rx, roomH, roomWidth, profile) {
  var spacing = 305;
  var visibleLeft = Math.max(rx, cameraX - 100);
  var visibleRight = Math.min(rx + roomWidth, cameraX + canvas.width + 100);
  if (visibleRight <= visibleLeft) return;

  var firstCell = Math.floor(visibleLeft / spacing) - 1;
  var lastCell = Math.ceil(visibleRight / spacing) + 1;
  var bands = [
    {top: 68, range: 250, height: 70, opacity: 0.18, scale: 0.76},
    {top: 180, range: 250, height: 90, opacity: 0.22, scale: 1},
    {top: 325, range: 150, height: 70, opacity: 0.15, scale: 0.82}
  ];
  if (roomH > 650) {
    bands.push({top: 610, range: Math.min(150, roomH - 650), height: 86, opacity: 0.17, scale: 0.86});
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(rx, 0, roomWidth, roomH);
  ctx.clip();
  for (var cell = firstCell; cell <= lastCell; cell++) {
    for (var bandIndex = 0; bandIndex < bands.length; bandIndex++) {
      var band = bands[bandIndex];
      var presence = getBackgroundVariation(cell, bandIndex + 3);
      if (presence < 0.38) continue;

      var x = cell * spacing + 8 + getBackgroundVariation(cell, bandIndex + 11) * 190;
      var y = band.top + getBackgroundVariation(cell, bandIndex + 19) * band.range;
      var width = (78 + getBackgroundVariation(cell, bandIndex + 29) * 140) * band.scale;
      var height = (30 + getBackgroundVariation(cell, bandIndex + 37) * band.height) * band.scale;
      var peakOffset = 0.14 + getBackgroundVariation(cell, bandIndex + 43) * 0.36;
      var secondPeak = 0.48 + getBackgroundVariation(cell, bandIndex + 47) * 0.36;
      var shapeVariant = Math.floor(getBackgroundVariation(cell, bandIndex + 67) * 3);

      ctx.globalAlpha = band.opacity;
      ctx.fillStyle = bandIndex === 0 ? profile.middle : profile.bottom;
      ctx.beginPath();
      ctx.moveTo(x, y + height * 0.72);
      if (shapeVariant === 1) {
        ctx.quadraticCurveTo(x + width * 0.14, y + height * 0.55, x + width * 0.27, y + height * 0.32);
        ctx.quadraticCurveTo(x + width * 0.42, y + height * 0.12, x + width * 0.55, y + height * 0.43);
        ctx.quadraticCurveTo(x + width * 0.73, y + height * 0.62, x + width * 0.84, y + height * 0.26);
      } else if (shapeVariant === 2) {
        ctx.lineTo(x + width * 0.11, y + height * 0.59);
        ctx.lineTo(x + width * 0.24, y + height * 0.28);
        ctx.lineTo(x + width * 0.39, y + height * 0.48);
        ctx.lineTo(x + width * 0.51, y + height * 0.08);
        ctx.lineTo(x + width * 0.68, y + height * 0.42);
        ctx.lineTo(x + width * 0.79, y + height * 0.24);
      } else {
        ctx.lineTo(x + width * 0.12, y + height * 0.48);
        ctx.lineTo(x + width * peakOffset, y + height * 0.24);
        ctx.lineTo(x + width * 0.43, y + height * 0.52);
        ctx.lineTo(x + width * secondPeak, y);
        ctx.lineTo(x + width * 0.76, y + height * 0.42);
      }
      ctx.lineTo(x + width, y + height * 0.7);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = band.opacity * 1.5;
      ctx.strokeStyle = profile.edge;
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (shapeVariant === 1) {
        ctx.moveTo(x + width * 0.14, y + height * 0.55);
        ctx.quadraticCurveTo(x + width * 0.27, y + height * 0.32, x + width * 0.42, y + height * 0.25);
        ctx.quadraticCurveTo(x + width * 0.66, y + height * 0.57, x + width * 0.84, y + height * 0.26);
      } else if (shapeVariant === 2) {
        ctx.moveTo(x + width * 0.11, y + height * 0.59);
        ctx.lineTo(x + width * 0.24, y + height * 0.28);
        ctx.lineTo(x + width * 0.39, y + height * 0.48);
        ctx.lineTo(x + width * 0.51, y + height * 0.08);
        ctx.lineTo(x + width * 0.68, y + height * 0.42);
        ctx.lineTo(x + width * 0.79, y + height * 0.24);
      } else {
        ctx.moveTo(x + width * 0.12, y + height * 0.48);
        ctx.lineTo(x + width * peakOffset, y + height * 0.24);
        ctx.lineTo(x + width * 0.43, y + height * 0.52);
        ctx.lineTo(x + width * secondPeak, y);
        ctx.lineTo(x + width * 0.76, y + height * 0.42);
      }
      ctx.stroke();

      ctx.globalAlpha = band.opacity * 0.8;
      ctx.strokeStyle = profile.bottom;
      ctx.beginPath();
      ctx.moveTo(x + width * 0.35, y + height * 0.53);
      ctx.lineTo(x + width * 0.41, y + height * 0.68);
      ctx.lineTo(x + width * 0.38, y + height * 0.82);
      ctx.moveTo(x + width * 0.76, y + height * 0.47);
      ctx.lineTo(x + width * 0.71, y + height * 0.64);
      ctx.stroke();

      if (profile.id === "ardoris" || profile.id === "marsh") {
        ctx.globalAlpha = band.opacity * 1.8;
        ctx.strokeStyle = profile.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.18, y + height * 0.5);
        ctx.quadraticCurveTo(x + width * 0.28, y + height * 0.37, x + width * 0.37, y + height * 0.47);
        ctx.moveTo(x + width * 0.72, y + height * 0.49);
        ctx.quadraticCurveTo(x + width * 0.82, y + height * 0.38, x + width * 0.89, y + height * 0.56);
        ctx.stroke();
        ctx.globalAlpha = band.opacity * 1.5;
        ctx.fillStyle = profile.accent;
        ctx.beginPath();
        ctx.ellipse(x + width * 0.32, y + height * 0.47, 7, 2, -0.2, 0, Math.PI * 2);
        ctx.ellipse(x + width * 0.82, y + height * 0.48, 9, 2, 0.15, 0, Math.PI * 2);
        ctx.fill();
      } else if (profile.id === "crystal" || profile.id === "abyss" || profile.id === "brumalis") {
        var crystalX = x + width * (0.24 + getBackgroundVariation(cell, bandIndex + 53) * 0.5);
        var crystalHeight = 12 + getBackgroundVariation(cell, bandIndex + 59) * 19;
        ctx.globalAlpha = band.opacity * 1.5;
        ctx.fillStyle = profile.light + "55";
        ctx.beginPath();
        ctx.moveTo(crystalX, y + height * 0.38);
        ctx.lineTo(crystalX + 4, y + height * 0.38 - crystalHeight);
        ctx.lineTo(crystalX + 9, y + height * 0.38);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
  ctx.restore();
}

function drawCaveEdgeDetails(rx, roomH, roomWidth, seed, roomIndex, continuity) {
  ctx.save();
  for (var i = 0; i < 5; i++) {
    var side = i % 2 ? 1 : -1;
    if (continuity && (side < 0 ? continuity.left : continuity.right)) continue;
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
    var crystalOnRight = j % 2 === 1;
    if (continuity && (crystalOnRight ? continuity.right : continuity.left)) continue;
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
  var torchOnRight = seed % 2 === 1;
  if (roomH >= 560 && !(continuity && (torchOnRight ? continuity.right : continuity.left))) {
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
function drawCityBg(rx, room, roomWidth) {
  roomWidth = roomWidth || room.roomWidth || ROOM_W;
  var palette = ["#182848", "#213b59", "#294a62", "#31586a"];
  ctx.fillStyle = palette[room.district.length % palette.length];
  ctx.fillRect(rx, 0, roomWidth, room.height);
  ctx.fillStyle = "rgba(255, 210, 120, 0.08)";
  ctx.fillRect(rx, 80, roomWidth, 210);
  ctx.fillStyle = "#10182c";
  ctx.fillRect(rx, 470, roomWidth, 90);
}

function drawCityBackgroundDetails(rx, room, roomWidth) {
  roomWidth = roomWidth || room.roomWidth || ROOM_W;
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
    var roomOrigin = room.worldX !== undefined ? room.worldX : roomIndex * ROOM_W;
    var x = roomOrigin + house.x;
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
    if (p.surface) {
      var surfaceBottom = room.height;
      var surfaceTop = p.y + p.surface.reduce(function(top, point) {
        return Math.min(top, point.y);
      }, p.surface[0].y);
      var surfaceGradient = ctx.createLinearGradient(0, surfaceTop, 0, surfaceBottom);
      surfaceGradient.addColorStop(0, profile.accent);
      surfaceGradient.addColorStop(0.12, profile.platform);
      surfaceGradient.addColorStop(0.58, profile.platform);
      surfaceGradient.addColorStop(0.82, "rgba(5, 8, 18, 0.22)");
      surfaceGradient.addColorStop(1, "rgba(5, 8, 18, 0.98)");
      ctx.beginPath();
      ctx.moveTo(p.x + p.surface[0].x, surfaceBottom);
      p.surface.forEach(function(point) {
        ctx.lineTo(p.x + point.x, p.y + point.y);
      });
      ctx.lineTo(p.x + p.surface[p.surface.length - 1].x, surfaceBottom);
      ctx.closePath();
      ctx.fillStyle = surfaceGradient;
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p.x + p.surface[0].x, surfaceBottom);
      p.surface.forEach(function(point) {
        ctx.lineTo(p.x + point.x, p.y + point.y);
      });
      ctx.lineTo(p.x + p.surface[p.surface.length - 1].x, surfaceBottom);
      ctx.closePath();
      ctx.clip();
      var crackCount = Math.ceil(p.w / 140);
      var crackSeed = Math.abs(Math.floor(p.x / ROOM_W)) + (roomIndex || 0) * 17;
      for (var crackIndex = 0; crackIndex < crackCount; crackIndex++) {
        var crackOffset = (crackIndex * 143 + crackSeed * 37) % Math.max(1, p.w - 34);
        var crackX = p.x + crackOffset;
        var crackSurfaceY = getPlatformSurfaceY(p, crackX + 14);
        if (crackSurfaceY === null) continue;
        var crackY = p.y + crackSurfaceY + 8 + ((crackIndex * 29 + crackSeed * 11) % 30);
        if (crackY + 7 >= surfaceBottom) continue;
        ctx.strokeStyle = "rgba(5, 8, 18, 0.38)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(crackX, crackY);
        ctx.lineTo(crackX + 12, crackY + 4);
        ctx.lineTo(crackX + 20, crackY + 1);
        ctx.lineTo(crackX + 28, crackY + 7);
        ctx.stroke();
        ctx.strokeStyle = "rgba(150, 166, 193, 0.13)";
        ctx.beginPath();
        ctx.moveTo(crackX + 2, crackY + 2);
        ctx.lineTo(crackX + 13, crackY + 6);
        ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = "rgba(159, 170, 190, 0.42)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      p.surface.forEach(function(point, pointIndex) {
        var worldX = p.x + point.x;
        var worldY = p.y + point.y;
        if (pointIndex === 0) ctx.moveTo(worldX, worldY);
        else ctx.lineTo(worldX, worldY);
      });
      ctx.stroke();
      return;
    }
    var isCollapsingBossFloor = collapsingDragonFloor && p.y >= 600;
    var floorDrop = isCollapsingBossFloor && floorCollapseTimer <= 120
      ? Math.pow((120 - floorCollapseTimer) / 120, 1.35) * 420
      : 0;
    ctx.save();
    if (floorDrop > 0) ctx.translate(0, floorDrop);
    var stoneBase = p.y > 500 ? profile.platform : profile.accent;
    var stoneGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + Math.max(1, p.h));
    stoneGradient.addColorStop(0, profile.edge);
    stoneGradient.addColorStop(Math.min(0.18, 2 / Math.max(1, p.h)), stoneBase);
    stoneGradient.addColorStop(0.58, stoneBase);
    stoneGradient.addColorStop(1, "rgba(5, 8, 18, 0.94)");
    ctx.fillStyle = stoneGradient;
    ctx.fillRect(p.x, p.y, p.w, p.h);

    var rockSeed = Math.floor(p.x * 13 + p.y * 7 + p.w * 3 + p.h * 11);
    ctx.fillStyle = "rgba(225, 235, 255, 0.14)";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + 1);
    ctx.lineTo(p.x + p.w * 0.12, p.y + 1);
    for (var ridge = 1; ridge <= 8; ridge++) {
      var ridgeX = p.x + p.w * (0.12 + ridge * 0.095);
      var ridgeY = p.y + 0.5 + ((rockSeed + ridge * 17) % 3) * 0.55;
      ctx.lineTo(ridgeX, ridgeY);
    }
    ctx.lineTo(p.x + p.w, p.y + 1);
    ctx.lineTo(p.x + p.w, p.y + 3);
    ctx.lineTo(p.x, p.y + 3);
    ctx.closePath();
    ctx.fill();

    if (p.w > 18 && p.h > 8) {
      var facetCount = Math.min(22, Math.max(1, Math.floor(p.w / 22)));
      for (var facet = 0; facet < facetCount; facet++) {
        var facetSeed = rockSeed + facet * 47;
        var facetX = p.x + 4 + (facetSeed * 19 % Math.max(1, p.w - 10));
        var facetY = p.y + 4 + (facetSeed * 11 % Math.max(1, p.h - 6));
        var facetW = Math.min(5 + facetSeed % 13, p.x + p.w - 2 - facetX);
        var facetH = Math.min(2 + facetSeed % Math.max(2, Math.min(7, p.h - 3)), p.y + p.h - 2 - facetY);
        if (facetW < 2 || facetH < 1) continue;
        ctx.fillStyle = facet % 3 === 0
          ? "rgba(202, 218, 240, 0.14)"
          : (facet % 3 === 1 ? "rgba(7, 11, 24, 0.22)" : "rgba(103, 137, 176, 0.13)");
        ctx.beginPath();
        ctx.moveTo(facetX, facetY + facetH);
        ctx.lineTo(facetX + 2, facetY);
        ctx.lineTo(facetX + facetW, facetY + 1);
        ctx.lineTo(facetX + facetW - 2, facetY + facetH);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.strokeStyle = "rgba(8, 12, 25, 0.72)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var crack = 0; p.h > 4 && p.w > 35 && crack < Math.min(4, Math.max(1, Math.floor(p.w / 110))); crack++) {
      var crackX = p.x + 16 + ((rockSeed + crack * 67) % Math.max(1, p.w - 28));
      var crackDepth = Math.min(p.h - 2, 5 + (rockSeed + crack * 23) % 13);
      ctx.moveTo(crackX, p.y + 3);
      ctx.lineTo(crackX - 2, p.y + crackDepth * 0.45);
      ctx.lineTo(crackX + 2, p.y + crackDepth * 0.7);
      ctx.lineTo(crackX - 1, p.y + crackDepth);
    }
    ctx.stroke();

    ctx.fillStyle = "rgba(5, 7, 16, 0.5)";
    ctx.fillRect(p.x, p.y + Math.max(0, p.h - 3), p.w, Math.min(3, p.h));
    ctx.fillStyle = "rgba(205, 220, 244, 0.12)";
    if (p.h > 10) {
      ctx.fillRect(p.x + 2, p.y + 5, Math.max(1, p.w * 0.22), 1);
      ctx.fillRect(p.x + p.w * 0.62, p.y + 7, Math.max(1, p.w * 0.18), 1);
    }
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
    var stoneBreakable = w.breakable && w.material === "stone";
    if (w.broken) {
      var breakAge = frameCounter - (w.brokenAt || 0);
      if (breakAge >= 0 && breakAge < 18) {
        ctx.globalAlpha = 1 - breakAge / 18;
        ctx.fillStyle = stoneBreakable ? "#858c91" : "#8b7057";
        for (var fragment = 0; fragment < 5; fragment++) {
          var fragmentX = w.x + ((fragment * 13) % Math.max(4, w.w - 4));
          var fragmentY = w.y + ((fragment * 37 + breakAge * (fragment + 1) * 2) % Math.max(8, w.h - 8));
          ctx.fillRect(fragmentX, fragmentY, 4 + (fragment % 2) * 3, 4);
        }
        ctx.globalAlpha = 1;
      }
      return;
    }
    var wallGradient = ctx.createLinearGradient(w.x, w.y, w.x + w.w, w.y + w.h);
    wallGradient.addColorStop(0, w.breakable ? (stoneBreakable ? "#68747a" : "#80634d") : "#53566d");
    wallGradient.addColorStop(0.3, w.breakable ? (stoneBreakable ? "#454c55" : "#59483e") : "#343447");
    wallGradient.addColorStop(1, w.breakable ? (stoneBreakable ? "#242b34" : "#302722") : "#171a2a");
    ctx.fillStyle = wallGradient;
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.fillStyle = w.breakable ? (stoneBreakable ? "#748087" : "#8b7057") : "#55556b";
    ctx.fillRect(w.x, w.y, w.w, 4);
    ctx.fillStyle = w.breakable ? (stoneBreakable ? "#242b34" : "#302722") : "#1b1b2b";
    ctx.fillRect(w.x + w.w - 4, w.y, 4, w.h);
    ctx.strokeStyle = w.breakable
      ? (stoneBreakable ? "rgba(176, 195, 205, 0.38)" : "rgba(226, 188, 125, 0.42)")
      : "rgba(105, 106, 132, 0.35)";
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
    var wallSeed = Math.floor(w.x * 5 + w.y * 11 + w.w * 13 + w.h * 3);
    for (var ledge = 0; ledge < Math.min(8, Math.max(2, Math.floor(w.h / 70))); ledge++) {
      var ledgeY = w.y + 12 + ((wallSeed + ledge * 53) % Math.max(1, w.h - 22));
      var ledgeX = w.x + 3 + ((wallSeed + ledge * 29) % Math.max(1, w.w - 10));
      var ledgeW = Math.min(w.w - 5, 5 + (wallSeed + ledge * 17) % 19);
      ctx.fillStyle = ledge % 2 ? "rgba(6, 9, 21, 0.26)" : "rgba(190, 205, 231, 0.12)";
      ctx.beginPath();
      ctx.moveTo(ledgeX, ledgeY + 4);
      ctx.lineTo(ledgeX + 3, ledgeY);
      ctx.lineTo(ledgeX + ledgeW, ledgeY + 1);
      ctx.lineTo(ledgeX + ledgeW - 2, ledgeY + 5);
      ctx.closePath();
      ctx.fill();
    }
    if (w.breakable) {
      ctx.strokeStyle = stoneBreakable ? "rgba(174, 193, 205, 0.55)" : "rgba(244, 210, 145, 0.65)";
      ctx.beginPath();
      ctx.moveTo(w.x + 4, w.y + 42);
      ctx.lineTo(w.x + w.w - 5, w.y + 86);
      ctx.moveTo(w.x + w.w - 5, w.y + 135);
      ctx.lineTo(w.x + 4, w.y + 188);
      ctx.stroke();
    }
  });
}
function drawArdorisPassages(room, roomIndex) {
  if (!room || !room.sideExits || (!room.directionalMap && roomIndex < 50)) return;
  room.sideExits.forEach(function(exit) {
    var passage = exit.passage;
    if (!passage) return;
    var open = typeof isSideExitAvailable === "function" && isSideExitAvailable(exit);
    ctx.save();
    ctx.fillStyle = "#080b13";
    ctx.strokeStyle = "#69727e";
    ctx.lineWidth = 3;

    if (passage.axis === "x") {
      var portalX = passage.direction === "right"
        ? passage.thresholdX - 18 : passage.thresholdX - 30;
      ctx.fillRect(portalX, passage.y, 48, passage.h);
      ctx.fillStyle = "#393f4b";
      ctx.fillRect(portalX, passage.y, 10, passage.h);
      ctx.fillRect(portalX + 38, passage.y, 10, passage.h);
      ctx.fillRect(portalX, passage.y, 48, 12);
      ctx.fillStyle = "#7e8995";
      ctx.fillRect(portalX + 8, passage.y + 12, 32, 4);
      ctx.strokeRect(portalX + 5, passage.y + 5, 38, passage.h - 10);
      ctx.fillStyle = "#a9c5d8";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText(passage.direction === "right" ? "›" : "‹",
        portalX + 24, passage.y + passage.h / 2 + 5);
      if (!open) {
        ctx.fillStyle = "rgba(95, 31, 44, 0.94)";
        ctx.fillRect(portalX + 12, passage.y + 22, 24, passage.h - 44);
        ctx.strokeStyle = "#ff8b79";
        ctx.lineWidth = 2;
        ctx.strokeRect(portalX + 12, passage.y + 22, 24, passage.h - 44);
        for (var bar = passage.y + 31; bar < passage.y + passage.h - 25; bar += 18) {
          ctx.beginPath();
          ctx.moveTo(portalX + 14, bar);
          ctx.lineTo(portalX + 34, bar + 8);
          ctx.stroke();
        }
      }
    } else if (passage.direction === "up") {
      ctx.fillRect(passage.x, 0, passage.w, passage.h);
      ctx.fillStyle = "#454c58";
      ctx.fillRect(passage.x - 8, 0, 10, passage.h);
      ctx.fillRect(passage.x + passage.w - 2, 0, 10, passage.h);
      ctx.fillRect(passage.x - 8, passage.h - 8, passage.w + 16, 8);
      ctx.strokeRect(passage.x, 0, passage.w, passage.h - 2);
      ctx.fillStyle = "#b9d1df";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText("↑", passage.centerX, passage.h - 22);
      if (!open) {
        ctx.fillStyle = "rgba(95, 31, 44, 0.94)";
        ctx.fillRect(passage.x + 12, 14, passage.w - 24, 18);
        ctx.strokeStyle = "#ff8b79";
        ctx.strokeRect(passage.x + 12, 14, passage.w - 24, 18);
      }
    } else {
      var openingBottom = room.height;
      ctx.fillRect(passage.x, passage.thresholdY, passage.w, openingBottom - passage.thresholdY);
      ctx.fillStyle = "#454c58";
      ctx.fillRect(passage.x - 8, passage.thresholdY - 8, 10, 20);
      ctx.fillRect(passage.x + passage.w - 2, passage.thresholdY - 8, 10, 20);
      ctx.fillStyle = "#8b96a2";
      ctx.fillRect(passage.x - 8, passage.thresholdY - 8, passage.w + 16, 8);
      ctx.strokeRect(passage.x, passage.thresholdY, passage.w, Math.max(0, openingBottom - passage.thresholdY));
      ctx.fillStyle = "#b9d1df";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText("↓", passage.centerX, passage.thresholdY + 28);
      if (!open) {
        ctx.fillStyle = "rgba(95, 31, 44, 0.94)";
        ctx.fillRect(passage.x + 8, passage.thresholdY - 12, passage.w - 16, 10);
        ctx.strokeStyle = "#ff8b79";
        ctx.strokeRect(passage.x + 8, passage.thresholdY - 12, passage.w - 16, 10);
      }
    }
    ctx.textAlign = "left";
    ctx.restore();
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
