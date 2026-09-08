function drawBossProjectiles() {
  bossProjectiles.forEach(function(b) {
    if (b.room !== currentRoom) return;
    ctx.fillStyle = b.color;
    if (b.kind === "knight_bolt") {
      ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w / 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#bde"; ctx.fillRect(b.x + 2, b.y + 2, 3, 3);
    } else if (b.kind === "blue_ray") {
      ctx.shadowColor = "#35cfff";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#35cfff";
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#d9fbff";
      ctx.fillRect(b.x + 4, b.y + 4, b.w - 8, b.h - 8);
    } else {
      ctx.beginPath(); ctx.arc(b.x + b.w / 2, b.y + b.h / 2, Math.max(b.w, b.h) / 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.fillRect(b.x + 2, b.y + 2, 3, 3);
    }

  });
}
function drawBossDeathEffects() {
  bossDeathEffects.forEach(function(effect) {
    if (effect.room !== currentRoom) return;
    var alpha = Math.max(0, effect.life / effect.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = effect.color;
    ctx.globalAlpha = alpha * 0.45;
    ctx.fillRect(effect.x - effect.radius / 2, effect.y - effect.radius / 2, effect.radius, effect.radius);
    ctx.restore();
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
