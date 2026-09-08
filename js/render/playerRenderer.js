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
