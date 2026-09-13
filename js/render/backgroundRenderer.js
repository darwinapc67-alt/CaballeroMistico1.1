function drawCaveBg(rx, decor, roomH, roomWidth) {
  roomWidth = roomWidth || ROOM_W;
  var roomSeed = Math.floor(rx / ROOM_W);
  ctx.fillStyle = "#080818";
  ctx.fillRect(rx, 0, roomWidth, roomH);
  var backGradient = ctx.createLinearGradient(rx, 0, rx, roomH);
  backGradient.addColorStop(0, "rgba(25, 27, 48, 0.38)");
  backGradient.addColorStop(0.5, "rgba(7, 8, 20, 0.08)");
  backGradient.addColorStop(1, "rgba(2, 3, 10, 0.48)");
  ctx.fillStyle = backGradient;
  ctx.fillRect(rx, 0, roomWidth, roomH);
  drawCaveBackRelief(rx, roomH, roomWidth, roomSeed);
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
  drawCaveEdgeDetails(rx, roomH, roomWidth, roomSeed);
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
function drawCaveEdgeDetails(rx, roomH, roomWidth, seed) {
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
    var glow = ctx.createRadialGradient(torchX, torchY, 3, torchX, torchY, 58);
    glow.addColorStop(0, "rgba(255, 170, 72, 0.18)");
    glow.addColorStop(1, "rgba(255, 120, 42, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(torchX, torchY, 58, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#70452e";
    ctx.fillRect(torchX - 3, torchY, 6, 27);
    ctx.fillStyle = "#ffb54d";
    ctx.fillRect(torchX - 5, torchY - 8, 10, 10);
    ctx.fillStyle = "#ffe6a1";
    ctx.fillRect(torchX - 2, torchY - 12, 4, 6);
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
function drawPlatforms(room) {
  room.platforms.forEach(function(p) {
    ctx.fillStyle = p.y > 500 ? "#303044" : "#292b40";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "#55566d";
    ctx.fillRect(p.x, p.y, p.w, Math.min(3, p.h));
    ctx.fillStyle = "rgba(115, 116, 137, 0.45)";
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
  });
}
function drawWalls(room) {
  room.walls.forEach(function(w) {
    ctx.fillStyle = "#343447";
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.fillStyle = "#55556b";
    ctx.fillRect(w.x, w.y, w.w, 4);
    ctx.fillStyle = "#1b1b2b";
    ctx.fillRect(w.x + w.w - 4, w.y, 4, w.h);
    ctx.strokeStyle = "rgba(105, 106, 132, 0.35)";
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
