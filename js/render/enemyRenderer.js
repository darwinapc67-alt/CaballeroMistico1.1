function drawEnemies() {
  var camLeft = cameraX, camRight = cameraX + 800, camTop = cameraY, camBottom = cameraY + 600;
  enemies.forEach(function(e) {
    if (e.dead || (!e.canRoam && e.room !== currentRoom)) return;
    if (gameMode === "custom" && !e.customEnemy) return;
    if (gameMode === "infinite" && e.room === 0 && !e.infiniteEnemy && !e.boss) return;
    if (e.x + e.w < camLeft - 50 || e.x > camRight + 50) return;
    if (e.y + e.h < camTop - 50 || e.y > camBottom + 50) return;
    ctx.save();
    if (e.hitFlash > 0) {
      e.hitFlash--;
      ctx.globalAlpha = 0.45 + (e.hitFlash % 2) * 0.25;
    }
    if (e.boss) {
      var bossColor = e.type === "guardian" ? "#b77b45" : (e.type === "queen_larva" ? "#9b4c9b" : (e.type === "dragon" ? "#b94632" : "#415f98"));
      var attackPulse = e.actionTimer > 0 ? Math.sin(e.actionTimer * 0.7) * 4 : 0;
      var bossBob = e.action === "jump" ? Math.sin(e.actionTimer * 0.35) * 5 : attackPulse * 0.35;
      var phaseColor = e.phase === 3 ? "#ff315a" : (e.phase === 2 ? "#ffb347" : "#8cf");
      ctx.globalAlpha = 0.16 + (e.phase || 1) * 0.04;
      ctx.fillStyle = phaseColor;
      ctx.beginPath(); ctx.arc(e.x + e.w / 2, e.y + e.h / 2, 48 + (e.phase || 1) * 8, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(255,80,80,0.18)";
      ctx.fillRect(e.x - 8, e.y - 8, e.w + 16, e.h + 16);
      ctx.fillStyle = bossColor;
      ctx.fillRect(e.x, e.y + 14 + bossBob, e.w, e.h - 14);
      ctx.fillStyle = "#d8b18a";
      ctx.fillRect(e.x + 10, e.y + bossBob, e.w - 20, 18);
      ctx.fillStyle = "#ff3344";
      ctx.fillRect(e.x + 15, e.y + 7, 5, 4);
      ctx.fillRect(e.x + e.w - 20, e.y + 7, 5, 4);
      if (e.type === "guardian") {
        ctx.fillStyle = "#6d4329"; ctx.fillRect(e.x - 8, e.y + 25, 10, 45); ctx.fillRect(e.x + e.w - 2, e.y + 25, 10, 45);
        ctx.fillStyle = "#ddd"; ctx.fillRect(e.x + e.w / 2 - 3, e.y + 28, 6, 30);
      } else if (e.type === "queen_larva") {
        ctx.fillStyle = "#d971bd";
        for (var q = 0; q < 3; q++) ctx.fillRect(e.x + 8 + q * 22, e.y + 40 + (q % 2) * 8, 12, 6);
      } else if (e.type === "dragon") {
        ctx.fillStyle = "#6f1f27";
        ctx.fillRect(e.x - 18, e.y + 22, 20, 34);
        ctx.fillRect(e.x + e.w - 2, e.y + 22, 20, 34);
        ctx.fillStyle = "#ff7138";
        ctx.beginPath();
        ctx.moveTo(e.x + 20, e.y + 5);
        ctx.lineTo(e.x - 18, e.y - 22);
        ctx.lineTo(e.x + 8, e.y + 32);
        ctx.moveTo(e.x + e.w - 20, e.y + 5);
        ctx.lineTo(e.x + e.w + 18, e.y - 22);
        ctx.lineTo(e.x + e.w - 8, e.y + 32);
        ctx.fill();
        ctx.fillStyle = "#ffd36a";
        ctx.fillRect(e.x + 20, e.y + 12, 7, 5);
        ctx.fillRect(e.x + e.w - 27, e.y + 12, 7, 5);
      } else {
        ctx.fillStyle = "#d9e4ff"; ctx.fillRect(e.x + e.w - 5, e.y + 28 + bossBob, 28, 5);
        ctx.fillStyle = "#26385f"; ctx.fillRect(e.x - 5, e.y + 25, 10, 48);
      }
      if (e.action === "melee" || e.action === "sword" || e.action === "dash") {
        ctx.strokeStyle = e.phase === 3 ? "#ff315a" : "#ffd36a";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(e.x + e.w / 2, e.y + e.h / 2, 32 + Math.max(0, e.actionTimer), -0.9, 0.9);
        ctx.stroke();
      }
      if (e.action === "shockwave" || e.action === "wall" || e.action === "ceiling") {
        ctx.strokeStyle = phaseColor; ctx.lineWidth = 2;
        ctx.strokeRect(e.x - 14, e.y - 14, e.w + 28, e.h + 28);
      }
      ctx.fillStyle = "#f44"; ctx.fillRect(e.x, e.y - 14, e.w * Math.max(0, e.hp / e.maxHp), 5);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.strokeRect(e.x, e.y - 14, e.w, 5);
    } else if (e.type === 'blue_sentry') {
      var sentryPulse = 0.75 + Math.sin(Date.now() / 120) * 0.2;
      ctx.fillStyle = "rgba(35, 190, 255, " + (sentryPulse * 0.35) + ")";
      ctx.beginPath();
      ctx.arc(e.x + e.w / 2, e.y + e.h / 2, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#123b68";
      ctx.fillRect(e.x + 4, e.y + 4, e.w - 8, e.h - 8);
      ctx.strokeStyle = "#35cfff";
      ctx.lineWidth = 2;
      ctx.strokeRect(e.x + 4, e.y + 4, e.w - 8, e.h - 8);
      ctx.fillStyle = "#d9fbff";
      ctx.fillRect(e.x + 13, e.y + 10, 6, 8);
    } else if (e.type === 'dark_knight') {
      var knightFacing = e.vx < 0 ? -1 : 1;
      ctx.fillStyle = "rgba(8, 10, 20, 0.5)";
      ctx.beginPath(); ctx.ellipse(e.x + e.w / 2, e.y + e.h, 19, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#171b2b"; ctx.fillRect(e.x + 5, e.y + 14, e.w - 10, e.h - 14);
      ctx.fillStyle = "#303950"; ctx.fillRect(e.x + 8, e.y + 2, e.w - 16, 18);
      ctx.fillStyle = "#9db5e8"; ctx.fillRect(e.x + (knightFacing > 0 ? 21 : 8), e.y + 9, 4, 3);
      ctx.fillStyle = e.blocking ? "#80b7ff" : "#9aa7c4";
      ctx.fillRect(e.x + (knightFacing > 0 ? e.w : -18), e.y + 18, 18, 4);
      if (e.blocking) {
        ctx.fillStyle = "rgba(96, 170, 255, 0.8)";
        ctx.beginPath();
        ctx.moveTo(e.x + (knightFacing > 0 ? e.w + 2 : -2), e.y + 12);
        ctx.lineTo(e.x + (knightFacing > 0 ? e.w + 20 : -20), e.y + 18);
        ctx.lineTo(e.x + (knightFacing > 0 ? e.w + 20 : -20), e.y + 43);
        ctx.lineTo(e.x + (knightFacing > 0 ? e.w + 2 : -2), e.y + 50);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = "#dce7ff"; ctx.fillRect(e.x + (knightFacing > 0 ? e.w + 12 : -28), e.y + 5, 3, 32);
      if (e.dashTimer > 0) {
        ctx.strokeStyle = "#7fb3ff"; ctx.lineWidth = 3;
        ctx.strokeRect(e.x - 5, e.y - 5, e.w + 10, e.h + 10);
      }
      ctx.fillStyle = "#f44"; ctx.fillRect(e.x, e.y - 12, e.w * Math.max(0, e.hp / e.maxHp), 4);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.strokeRect(e.x, e.y - 12, e.w, 4);
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
    if (e.hitFlash > 0) {
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = 0.75;
      ctx.fillRect(e.x - 3, e.y - 3, e.w + 6, e.h + 6);
    }
    ctx.restore();
  });
}
