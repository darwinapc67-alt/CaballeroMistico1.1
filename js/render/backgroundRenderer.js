function drawCaveBg(rx, decor, roomH, roomWidth) {
  roomWidth = roomWidth || ROOM_W;
  ctx.fillStyle = "#080818";
  ctx.fillRect(rx, 0, roomWidth, roomH);
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
    ctx.fillStyle = "#2a2a3a";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "#3a3a4a";
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = "#1a1a2a";
    ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
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
