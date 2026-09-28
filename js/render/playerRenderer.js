function drawPlayerEntity(p, wakeProgress) {
  var wakingPose = typeof wakeProgress === "number";
  if (wakingPose) wakeProgress = Math.max(0, Math.min(1, wakeProgress));
  var skin = null;
  for (var skinIndex = 0; skinIndex < skinCatalog.length; skinIndex++) {
    if (skinCatalog[skinIndex].id === equippedSkin) { skin = skinCatalog[skinIndex]; break; }
  }

  var moving = p.onGround && Math.abs(p.vx) > 0.5;
  var walkBlend = typeof p.walkBlend === "number"
    ? Math.max(0, Math.min(1, p.walkBlend))
    : (moving ? 1 : 0);
  var runAmount = Math.min(1, Math.abs(p.vx) / 3.5) * walkBlend;
  var phase = (p.anim || 0) * Math.PI / 12;
  var step = Math.sin(phase) * runAmount;
  var idleBreath = Math.sin(Date.now() / 430 + (p.id || 1)) * 0.55;
  var jumpPose = !p.onGround && p.vy < -1;
  var fallPose = !p.onGround && p.vy > 2;
  var attackProgress = p.swordSwing > 0
    ? 1 - Math.max(0, Math.min(1, p.swordSwing / Math.max(1, getWeaponConfig(p.weaponId || weaponId).swing)))
    : 0;
  var attacking = p.swordSwing > 0 && p.hasSword && p.swordEquipped;
  var hurt = p.inv > 0;
  var cx = p.x + p.w / 2;
  var top = p.y + Math.sin(phase * 2) * 0.65 * runAmount + idleBreath * 0.35 * (1 - walkBlend);
  var bodyLean = p.dashing ? p.facing * 0.2 : (hurt
    ? -p.facing * (0.07 + Math.sin(Date.now() / 48) * 0.04)
    : Math.sin(phase) * 0.025 * walkBlend);
  var deathProgress = gameState === ST_DEATH && playerDead && p === player
    ? Math.min(1, deathAnimTimer / 36)
    : 0;
  var baseColor = skin ? skin.body : p.color;
  var helmetColor = skin ? skin.head : p.headColor;
  var capeColor = skin && skin.cape ? skin.cape : "#6f2537";
  var armorLight = skin ? skin.head : "#c6d4e8";
  var armorMid = skin ? skin.body : "#607a9d";
  var armorDark = "#26354f";
  var visualScale = wakingPose || p === player || p === player2 ? 1.65 : 1;

  ctx.save();
  if (visualScale !== 1) {
    ctx.translate(cx, p.y + p.h);
    ctx.scale(visualScale, visualScale);
    ctx.translate(-cx, -(p.y + p.h));
  }
  if (skin) ctx.globalAlpha *= skin.alpha || 1;
  if (hurt && !playerDead && Math.floor(p.inv / 3) % 2 === 0) ctx.globalAlpha *= 0.55;

  if (deathProgress > 0) {
    var deathEase = deathProgress * deathProgress * (3 - 2 * deathProgress);
    ctx.translate(cx, p.y + p.h - 4 + deathEase * 4);
    ctx.rotate(p.facing * deathEase * Math.PI / 2);
    ctx.translate(-cx, -(p.y + p.h - 4));
  } else if (p.dashing) {
    ctx.translate(cx, p.y + p.h / 2);
    ctx.rotate(bodyLean);
    ctx.translate(-cx, -(p.y + p.h / 2));
  } else if (hurt) {
    ctx.translate(cx, p.y + p.h / 2);
    ctx.rotate(bodyLean);
    ctx.translate(-cx, -(p.y + p.h / 2));
  } else if (walkBlend > 0) {
    ctx.translate(cx, p.y + p.h / 2);
    ctx.rotate(bodyLean);
    ctx.translate(-cx, -(p.y + p.h / 2));
  }

  var floorY = top + p.h;
  var hipY = top + 20;
  var legSpread = jumpPose ? 2.4 : (fallPose ? 1.8 : 0);
  var bodyLift = jumpPose ? -1.2 : 0;
  var armSwing = step * 2;

  if (!wakingPose) {
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(cx, floorY - 1, p.w * 0.72, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (p.dashing) {
    ctx.save();
    ctx.globalAlpha *= 0.22;
    ctx.fillStyle = "#7acbff";
    ctx.beginPath();
    ctx.moveTo(cx - 6 - p.dashDir * 13, top + 10);
    ctx.lineTo(cx + 6 - p.dashDir * 13, top + 10);
    ctx.lineTo(cx + 5 - p.dashDir * 13, top + 23);
    ctx.lineTo(cx - 5 - p.dashDir * 13, top + 23);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(cx - 4 - p.dashDir * 13, top + 2, 8, 8);
    ctx.restore();
  }
  if (skin && skin.cape) {
    ctx.fillStyle = capeColor;
    ctx.beginPath();
    ctx.moveTo(cx - p.facing * 3, top + 9 + bodyLift);
    ctx.lineTo(cx - p.facing * (10 + Math.abs(step) * 1.4), top + 12 + bodyLift);
    ctx.lineTo(cx - p.facing * (8 + Math.abs(step) * 1.2), top + 26);
    ctx.lineTo(cx - p.facing * 1, top + 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    ctx.moveTo(cx - p.facing * 5, top + 12 + bodyLift);
    ctx.lineTo(cx - p.facing * 9, top + 23);
    ctx.lineTo(cx - p.facing * 5, top + 21);
    ctx.closePath();
    ctx.fill();
  }

  if (p.hasSword && p.swordEquipped && !attacking) {
    var sheathedWeapon = getWeaponConfig(p.weaponId || weaponId);
    ctx.save();
    ctx.translate(cx - p.facing * 5, top + 15 + bodyLift);
    var swordSway = Math.sin(phase) * 0.035 * walkBlend;
    ctx.rotate(p.facing > 0 ? -0.48 + swordSway : 0.48 - swordSway);
    ctx.fillStyle = "#4a2c22";
    ctx.fillRect(-1, -12, 3, 21);
    ctx.fillStyle = sheathedWeapon.color;
    ctx.fillRect(0, -12, 1.5, 18);
    ctx.fillStyle = "#e2bd67";
    ctx.fillRect(-3, 5, 7, 2);
    ctx.fillStyle = "#5c3828";
    ctx.fillRect(-1, 7, 3, 6);
    ctx.restore();
  }

  function drawLeg(side, stride, footLift) {
    var hipX = cx + side * 3;
    var kneeX = hipX + stride + side * legSpread;
    var kneeY = hipY + 4;
    var footX = kneeX + stride * 0.6 + side * 0.5;
    var footY = floorY - (jumpPose ? 3 : footLift);
    ctx.lineCap = "square";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#172238";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(hipX, hipY);
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(footX, footY - 2);
    ctx.stroke();
    ctx.strokeStyle = armorMid;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(hipX, hipY);
    ctx.lineTo(kneeX, kneeY);
    ctx.stroke();
    ctx.fillStyle = armorLight;
    ctx.fillRect(kneeX - 2, kneeY - 1, 4, 3);
    ctx.fillStyle = "#26354f";
    ctx.fillRect(footX - 3, footY - 4, 8, 4);
    ctx.fillStyle = "#9d5b35";
    ctx.fillRect(footX - 4, footY - 1, 10, 3);
    ctx.fillStyle = "#d4af72";
    ctx.fillRect(footX - 2, footY, 4, 1);
  }

  var leftLegPhase = phase;
  var rightLegPhase = phase + Math.PI;
  var leftFootLift = !jumpPose && !fallPose ? Math.max(0, Math.cos(leftLegPhase)) * 2.8 * walkBlend : 0;
  var rightFootLift = !jumpPose && !fallPose ? Math.max(0, Math.cos(rightLegPhase)) * 2.8 * walkBlend : 0;
  drawLeg(-1, Math.sin(leftLegPhase) * (jumpPose || fallPose ? 0.35 : 2.3) * runAmount, leftFootLift);
  drawLeg(1, Math.sin(rightLegPhase) * (jumpPose || fallPose ? 0.35 : 2.3) * runAmount, rightFootLift);

  ctx.fillStyle = armorDark;
  ctx.beginPath();
  ctx.moveTo(cx - 7, hipY - 2);
  ctx.lineTo(cx + 7, hipY - 2);
  ctx.lineTo(cx + 6, top + 25);
  ctx.lineTo(cx, top + 27);
  ctx.lineTo(cx - 6, top + 25);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = armorMid;
  ctx.beginPath();
  ctx.moveTo(cx - 6, hipY - 2);
  ctx.lineTo(cx + 5, hipY - 2);
  ctx.lineTo(cx + 4, top + 23);
  ctx.lineTo(cx, top + 25);
  ctx.lineTo(cx - 5, top + 23);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#d7b35e";
  ctx.fillRect(cx - 6, top + 21, 12, 2);
  ctx.fillStyle = "#26354f";
  ctx.fillRect(cx - 2, top + 21, 4, 3);
  ctx.fillStyle = "#f4d77d";
  ctx.fillRect(cx - 1, top + 22, 2, 1);

  var torsoTop = top + 9 + bodyLift;
  var torsoBottom = top + 22 + bodyLift;
  var torsoGradient = ctx.createLinearGradient(cx - 7, torsoTop, cx + 7, torsoBottom);
  torsoGradient.addColorStop(0, armorLight);
  torsoGradient.addColorStop(0.35, armorMid);
  torsoGradient.addColorStop(1, armorDark);
  ctx.fillStyle = "#172238";
  ctx.beginPath();
  ctx.moveTo(cx - 7, torsoTop + 2);
  ctx.lineTo(cx - 4, torsoTop);
  ctx.lineTo(cx + 4, torsoTop);
  ctx.lineTo(cx + 7, torsoTop + 3);
  ctx.lineTo(cx + 6, torsoBottom);
  ctx.lineTo(cx - 6, torsoBottom);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = torsoGradient;
  ctx.beginPath();
  ctx.moveTo(cx - 5, torsoTop + 2);
  ctx.lineTo(cx - 3, torsoTop + 1);
  ctx.lineTo(cx + 3, torsoTop + 1);
  ctx.lineTo(cx + 5, torsoTop + 3);
  ctx.lineTo(cx + 4, torsoBottom - 1);
  ctx.lineTo(cx - 4, torsoBottom - 1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = baseColor;
  ctx.fillRect(cx - 2, torsoTop + 4, 4, 6);
  ctx.fillStyle = "#f2d477";
  ctx.beginPath();
  ctx.moveTo(cx, torsoTop + 4);
  ctx.lineTo(cx + 2, torsoTop + 7);
  ctx.lineTo(cx, torsoTop + 10);
  ctx.lineTo(cx - 2, torsoTop + 7);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.48)";
  ctx.fillRect(cx - 4, torsoTop + 2, 2, 6);
  ctx.fillStyle = "#172238";
  ctx.fillRect(cx - 4, torsoTop + 11, 8, 1);

  function drawArm(side, swing) {
    var shoulderX = cx + side * 6;
    var shoulderY = torsoTop + 2;
    var braceArm = wakingPose && side === -(p.facing || 1) && wakeProgress < 0.76;
    var braceAmount = braceArm ? 1 - Math.min(1, wakeProgress / 0.76) : 0;
    var elbowX = shoulderX + side * (braceArm ? 3 : 2 + swing);
    var elbowY = shoulderY + (braceArm ? 7 + braceAmount * 2 : 5 + (jumpPose ? -3 : (fallPose ? 1 : 0)));
    var handX = elbowX + side * (braceArm ? 1 : 1 + swing * 0.35);
    var handY = braceArm
      ? top + 28
      : elbowY + 4 + (jumpPose ? -2 : 0) + (attacking && side === p.facing ? -3 : 0);
    ctx.lineCap = "square";
    ctx.strokeStyle = "#172238";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(handX, handY);
    ctx.stroke();
    ctx.strokeStyle = armorMid;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY + 1);
    ctx.lineTo(elbowX, elbowY);
    ctx.stroke();
    ctx.fillStyle = armorLight;
    ctx.beginPath();
    ctx.moveTo(shoulderX - 3, shoulderY);
    ctx.lineTo(shoulderX, shoulderY - 3);
    ctx.lineTo(shoulderX + 3, shoulderY);
    ctx.lineTo(shoulderX + 2, shoulderY + 4);
    ctx.lineTo(shoulderX - 2, shoulderY + 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#26354f";
    ctx.fillRect(elbowX - 2, elbowY - 1, 4, 3);
    ctx.fillStyle = "#172238";
    ctx.beginPath();
    ctx.moveTo(handX - 2.5, handY - 1);
    ctx.lineTo(handX + 1.5, handY - 1);
    ctx.lineTo(handX + 2.5, handY + 1);
    ctx.lineTo(handX + 1, handY + 3);
    ctx.lineTo(handX - 2, handY + 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = armorLight;
    ctx.fillRect(handX - 1.5, handY - 1, 2.5, 2);
    ctx.fillStyle = "#e0bd77";
    ctx.fillRect(handX - 1, handY, 2, 1);
  }

  var leadingSide = p.facing || 1;
  drawArm(-leadingSide, -armSwing + (jumpPose ? -1 : 0));
  drawArm(leadingSide, armSwing + (jumpPose ? -2 : 0));

  var headY = top + 1 + bodyLift;
  var helmetGradient = ctx.createLinearGradient(cx - 6, headY, cx + 6, headY + 9);
  helmetGradient.addColorStop(0, "#eef4fa");
  helmetGradient.addColorStop(0.3, helmetColor);
  helmetGradient.addColorStop(0.75, armorMid);
  helmetGradient.addColorStop(1, armorDark);
  ctx.fillStyle = "#172238";
  ctx.beginPath();
  ctx.moveTo(cx - 6, headY + 8);
  ctx.lineTo(cx - 6, headY + 3);
  ctx.lineTo(cx - 3, headY);
  ctx.lineTo(cx + 3, headY);
  ctx.lineTo(cx + 6, headY + 3);
  ctx.lineTo(cx + 6, headY + 8);
  ctx.lineTo(cx + 3, headY + 10);
  ctx.lineTo(cx - 3, headY + 10);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = helmetGradient;
  ctx.beginPath();
  ctx.moveTo(cx - 4, headY + 7);
  ctx.lineTo(cx - 4, headY + 3);
  ctx.lineTo(cx - 2, headY + 1);
  ctx.lineTo(cx + 2, headY + 1);
  ctx.lineTo(cx + 4, headY + 3);
  ctx.lineTo(cx + 4, headY + 7);
  ctx.lineTo(cx + 2, headY + 8);
  ctx.lineTo(cx - 2, headY + 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#172238";
  ctx.fillRect(cx - 5, headY + 5, 10, 2);
  ctx.fillStyle = "#79e7ff";
  ctx.fillRect(cx + p.facing * 1, headY + 5, 3, 1);
  ctx.fillStyle = "#fff";
  ctx.fillRect(cx + p.facing * 2, headY + 5, 1, 1);
  ctx.fillStyle = "#f2d477";
  ctx.fillRect(cx - 1, headY - 2, 2, 3);
  ctx.fillStyle = "#9a3145";
  ctx.beginPath();
  ctx.moveTo(cx, headY - 2);
  ctx.lineTo(cx - p.facing * 4, headY - 5);
  ctx.lineTo(cx - p.facing * 1, headY - 1);
  ctx.closePath();
  ctx.fill();

  if (attacking) {
    var weapon = getWeaponConfig(p.weaponId || weaponId);
    var easedAttack = attackProgress * attackProgress * (3 - 2 * attackProgress);
    var swingAngle = p.facing > 0 ? -1.25 + easedAttack * 2.15 : Math.PI + 1.25 - easedAttack * 2.15;
    if (p.vy < -2) swingAngle = -Math.PI / 2;
    else if (p.vy > 2) swingAngle = Math.PI / 2;
    var handX = cx + p.facing * 6;
    var handY = torsoTop + 8;
    ctx.save();
    ctx.translate(handX, handY);
    ctx.rotate(swingAngle);
    ctx.shadowColor = weapon.color;
    ctx.shadowBlur = p.attackType === "charged" ? 8 : 3;
    ctx.fillStyle = "#563723";
    ctx.fillRect(-2, -3, 4, 9);
    ctx.fillStyle = "#edc668";
    ctx.fillRect(-5, 3, 10, 2);
    ctx.fillStyle = weapon.color;
    ctx.beginPath();
    ctx.moveTo(-2, -3);
    ctx.lineTo(-2, -18);
    ctx.lineTo(0, -23);
    ctx.lineTo(2, -18);
    ctx.lineTo(2, -3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(-1, -17, 1, 12);
    ctx.restore();
  }

  if (p.blocking) {
    ctx.strokeStyle = "#9de8ff";
    ctx.lineWidth = 2;
    ctx.globalAlpha *= 0.85;
    ctx.beginPath();
    var shieldX = cx + p.facing * 13;
    ctx.arc(shieldX, top + 16, 11, p.facing > 0 ? -Math.PI / 2 : Math.PI / 2, p.facing > 0 ? Math.PI / 2 : Math.PI * 1.5);
    ctx.stroke();
    ctx.fillStyle = "rgba(157,232,255,0.15)";
    ctx.fill();
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
    var x = barX + i * (heartW + gap);
    var color = p.id === 2 ? "#ff33ff" : "#ff3344";
    var emptyColor = p.id === 2 ? "#331133" : "#331111";
    var outlineColor = p.id === 2 ? "#ff99ff" : "#ff8899";
    var heartValue = Math.max(0, Math.min(1, p.hp - i));
    ctx.save();
    ctx.translate(x, barY);
    ctx.fillStyle = emptyColor;
    ctx.strokeStyle = "#552233";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(5, 5, 4.5, Math.PI, 0);
    ctx.arc(10, 5, 4.5, Math.PI, 0);
    ctx.lineTo(7.5, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (heartValue > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, heartValue === 0.5 ? 8 : 16, 15);
      ctx.clip();
      ctx.fillStyle = color;
      ctx.strokeStyle = outlineColor;
      ctx.beginPath();
      ctx.arc(5, 5, 4.5, Math.PI, 0);
      ctx.arc(10, 5, 4.5, Math.PI, 0);
      ctx.lineTo(7.5, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
}
