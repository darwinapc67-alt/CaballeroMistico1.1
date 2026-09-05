function playerTakeDamage(p, dmg) {
  if (p.inv > 0 || p.frozen) return;
  if (p.blocking) {
    p.inv = 8;
    spawnParticles(p.x + p.w/2, p.y + p.h/2, "#9de8ff", 8, 2);
    spawnFloatText(p.x, p.y - 18, "¡BLOQUEADO!", "#9de8ff");
    return;
  }
  p.hp -= dmg;
  p.inv = 40;
  spawnParticles(p.x + p.w/2, p.y + p.h/2, "#f44", 10);
  flash = 0.4;
  sfxHit();
  if (p.hp <= 0) {
    p.hp = p.maxHp;
    stats.deaths++;
    playerDead = true;
    deathTimer = 60;
    sfxDeath();
    for (var i = 0; i < 30; i++) {
      deathParticles.push({
        x: p.x + p.w/2, y: p.y + p.h/2,
        vx: (Math.random()-0.5)*8, vy: (Math.random()-0.5)*8 - 3,
        life: 30 + Math.random() * 30, maxLife: 50,
        color: ["#f44", "#f88", "#f00", "#ff0"][Math.floor(Math.random()*4)],
        size: 3 + Math.random() * 4
      });
    }
    p.x = currentRoom * ROOM_W + 100 + (p.id === 2 ? 40 : 0);
    p.y = 400; p.vx = 0; p.vy = 0;
    spawnFloatText(p.x, p.y - 20, "¡J" + p.id + " cayó!", "#f44");
    spawnParticles(p.x + p.w/2, p.y + p.h/2, "#f00", 20, 5);
  }
}

function resetPlayer() {
  player.x = 100; player.y = 400; player.vx = 0; player.vy = 0;
  player.jumpsLeft = hasDoubleJump ? 2 : 1; player.facing = 1; player.inv = 0; player.autoWalk = 0;
  player.maxJumps = hasDoubleJump ? 2 : 1;
  player.frozen = false;
  player.swordSwing = 0; player.swordCooldown = 0; player.bowCooldown = 0;
  player.swordSheathed = true; player.swordSheathTimer = 0;
  player.blocking = false;
  player.dashTimer = 0; player.dashCooldown = 0; player.dashDir = 1; player.dashing = false;
  playerDead = false;
  deathTimer = 0;
  particles = []; floatTexts = []; arrowsInFlight = []; flash = 0;
  healing = false; healTimer = 0;
  hitFlash = 0; needsRespawn = false;
  if (twoPlayerMode) {
    player2.x = 140; player2.y = 400; player2.vx = 0; player2.vy = 0;
    player2.jumpsLeft = hasDoubleJump ? 2 : 1; player2.facing = 1; player2.inv = 0; player2.autoWalk = 0;
    player2.maxJumps = hasDoubleJump ? 2 : 1;
    player2.frozen = false;
    player2.swordSwing = 0; player2.swordCooldown = 0; player2.bowCooldown = 0;
    player2.swordSheathed = true; player2.swordSheathTimer = 0;
    player2.blocking = false;
    player2.dashTimer = 0; player2.dashCooldown = 0; player2.dashDir = 1; player2.dashing = false;
  }
}

function bossTarget(e) {
  var target = player;
  var dx = (player.x + player.w / 2) - (e.x + e.w / 2);
  var dy = (player.y + player.h / 2) - (e.y + e.h / 2);
  var best = Math.sqrt(dx * dx + dy * dy);
  if (twoPlayerMode) {
    var dx2 = (player2.x + player2.w / 2) - (e.x + e.w / 2);
    var dy2 = (player2.y + player2.h / 2) - (e.y + e.h / 2);
    var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    if (d2 < best) { target = player2; dx = dx2; dy = dy2; best = d2; }
  }
  return { player: target, dx: dx, dy: dy, dist: best };
}

function spawnBossProjectile(e, vx, vy, damage, kind, extra) {
  extra = extra || {};
  bossProjectiles.push({
    x: e.x + e.w / 2 - (extra.w || 10) / 2, y: e.y + e.h / 2 - (extra.h || 10) / 2,
    w: extra.w || 10, h: extra.h || 10, vx: vx, vy: vy, gravity: extra.gravity || 0,
    damage: damage, life: extra.life || 180, room: e.room, kind: kind || "rock",
    color: extra.color || "#b66", homing: !!extra.homing
  });
}

function bossMeleeHit(e, damage, reach) {
  if (e.attackHit) return;
  var hitbox = { x: e.x - reach, y: e.y - 10, w: e.w + reach * 2, h: e.h + 20 };
  if (rectHit(player, hitbox)) { playerTakeDamage(player, damage); e.attackHit = true; }
  if (twoPlayerMode && rectHit(player2, hitbox)) { playerTakeDamage(player2, damage); e.attackHit = true; }
}

function updateBoss(e, room) {
  var target = bossTarget(e);
  var arenaLeft = e.room * ROOM_W + 35, arenaRight = arenaLeft + ROOM_W - 70;
  var floorY = room.height - 40 - e.h;
  e.aiTimer = (e.aiTimer || 0) - 1;
  e.attackTimer = (e.attackTimer || 0) - 1;
  if (e.hp <= e.maxHp / 2 && !e.enraged) {
    e.enraged = true; e.phase = Math.max(2, e.phase || 1);
    e.attackTimer = 1;
    spawnFloatText(e.x, e.y - 25, "¡ENRAGE!", "#f44");
    spawnParticles(e.x + e.w / 2, e.y + e.h / 2, "#f22", 22, 5);
  }
  if (e.type === "guardian") {
    if (e.actionTimer > 0) {
      e.actionTimer--;
      if (e.action === "melee" && e.actionTimer === 8) bossMeleeHit(e, e.enraged ? 8 : 5, 30);
      if (e.action === "jump") { e.vy += GRAVITY; e.y += e.vy; }
      if (e.y >= floorY) { e.y = floorY; e.vy = 0; e.action = ""; e.attackHit = false; }
    } else if (e.attackTimer <= 0) {
      e.attackTimer = e.enraged ? 45 : 70;
      var choice = Math.random();
      if (target.dist < 125 && choice < 0.45) {
        e.action = "melee"; e.actionTimer = 18; e.attackHit = false;
      } else if (choice < 0.72) {
        e.action = "jump"; e.actionTimer = 34; e.vy = -11;
        e.vx = target.player.x < e.x ? -4 : 4;
      } else {
        var dx = target.dx, dy = target.dy, d = Math.max(1, target.dist);
        spawnBossProjectile(e, dx / d * (e.enraged ? 6 : 5), dy / d * (e.enraged ? 6 : 5), e.enraged ? 5 : 3, "guardian_rock", {w:14, h:14, color:"#98704d"});
      }
    }
    if (!e.action || e.action === "melee") e.x += (target.player.x < e.x ? -1 : 1) * (e.enraged ? 1.6 : 1);
  } else if (e.type === "queen_larva") {
    if (e.action !== "ceiling") e.y = floorY;
    if (e.actionTimer > 0) {
      e.actionTimer--;
      if (e.action === "charge") { e.x += e.vx; bossMeleeHit(e, e.enraged ? 7 : 4, 20); }
      if (e.action === "wall" && e.actionTimer % 12 === 0) {
        bossProjectiles.push({x: arenaLeft, y: 220 + (e.actionTimer % 3) * 55, w: 16, h: 10,
          vx: e.enraged ? 6 : 4, vy: 0, gravity: 0, damage: 4, life: 150,
          room: e.room, kind: "wall_spike", color: "#bd668d", homing: false});
        bossProjectiles.push({x: arenaRight, y: 220 + (e.actionTimer % 3) * 55, w: 16, h: 10,
          vx: e.enraged ? -6 : -4, vy: 0, gravity: 0, damage: 4, life: 150,
          room: e.room, kind: "wall_spike", color: "#bd668d", homing: false});
      }
      if (e.action === "ceiling") {
        if (e.actionTimer % 10 === 0) spawnBossProjectile(e, 0, 3.5, 4, "ceiling_rock", {w:13, h:18, color:"#8b6070", gravity:0.12});
      }
      if (e.actionTimer <= 0) { e.action = ""; e.attackHit = false; e.y = floorY; }
    } else if (e.attackTimer <= 0) {
      e.attackTimer = e.enraged ? 42 : 68;
      var q = Math.random();
      if (q < 0.22) {
        e.action = "wall"; e.actionTimer = e.enraged ? 60 : 42;
      } else if (q < 0.45) {
        e.action = "charge"; e.actionTimer = e.enraged ? 28 : 22; e.vx = target.player.x < e.x ? - (e.enraged ? 7 : 5) : (e.enraged ? 7 : 5); e.attackHit = false;
      } else if (q < 0.65) {
        e.action = "ceiling"; e.actionTimer = e.enraged ? 55 : 40; e.y = 55;
      } else if (q < 0.85) {
        for (var i = 0; i < (e.enraged ? 3 : 2); i++) {
          enemies.push({x: e.x + (i - 1) * 35, y: floorY - 22, w: 28, h: 22, vx: 0, vy: 0,
            speed: 1.8, visionRadius: 260, dead: false, room: e.room, type: "larva_mosca"});
        }
        spawnFloatText(e.x, e.y - 25, "¡CRÍA!", "#d98");
      } else {
        var dxq = target.dx, dyq = target.dy, dq = Math.max(1, target.dist);
        spawnBossProjectile(e, dxq / dq * 5, dyq / dq * 5, 4, "queen_spit", {w:12, h:12, color:"#b35c9c", homing:true});
      }
    }
    if (e.x < arenaLeft) e.x = arenaLeft;
    if (e.x > arenaRight) e.x = arenaRight;
  } else if (e.type === "abyssal_knight") {
    var healthPhase = e.hp <= e.maxHp / 3 ? 3 : (e.hp <= e.maxHp * 2 / 3 ? 2 : 1);
    if (healthPhase > e.phase) { e.phase = healthPhase; e.attackTimer = 1; }
    if (e.actionTimer > 0) {
      e.actionTimer--;
      if (e.action === "sword") bossMeleeHit(e, e.phase === 3 ? 10 : 7, 38);
      if (e.action === "dash") { e.x += e.vx; bossMeleeHit(e, e.phase === 3 ? 9 : 6, 15); }
      if (e.action === "teleport" && e.actionTimer === 4) {
        e.x = Math.max(arenaLeft, Math.min(arenaRight, e.teleportTargetX));
        e.y = floorY;
        spawnParticles(e.x + e.w / 2, e.y + e.h / 2, "#7af", 14, 4);
      }
      if (e.actionTimer <= 0) { e.action = ""; e.attackHit = false; }
    } else if (e.attackTimer <= 0) {
      e.attackTimer = e.phase === 3 ? 28 : (e.phase === 2 ? 42 : 58);
      var k = Math.random();
      if (k < 0.25) {
        e.action = "sword"; e.actionTimer = 16; e.attackHit = false;
      } else if (k < 0.5) {
        e.action = "dash"; e.actionTimer = e.phase === 3 ? 16 : 11; e.vx = target.player.x < e.x ? - (e.phase === 3 ? 11 : 8) : (e.phase === 3 ? 11 : 8); e.attackHit = false;
      } else if (k < 0.7) {
        e.action = "teleport"; e.actionTimer = 8;
        e.teleportTargetX = target.player.x + (target.player.x < e.x ? 90 : -90);
      } else {
        var spread = e.phase === 3 ? 3 : 1;
        for (var j = -spread; j <= spread; j++) {
          var angle = Math.atan2(target.dy, target.dx) + j * 0.16;
          spawnBossProjectile(e, Math.cos(angle) * (e.phase === 3 ? 7 : 5), Math.sin(angle) * (e.phase === 3 ? 7 : 5), e.phase === 3 ? 6 : 4, "knight_bolt", {w:9, h:9, color:"#79c"});
        }
      }
    }
    if (!e.action || e.action === "sword") e.x += (target.player.x < e.x ? -1 : 1) * (e.phase === 3 ? 2.2 : 1.2);
    if (e.x < arenaLeft) e.x = arenaLeft;
    if (e.x > arenaRight) e.x = arenaRight;
  }
  if (e.y > floorY && e.type !== "queen_larva") { e.y = floorY; e.vy = 0; }
}

function updateBossProjectiles() {
  for (var i = bossProjectiles.length - 1; i >= 0; i--) {
    var b = bossProjectiles[i];
    b.vy += b.gravity || 0; b.x += b.vx; b.y += b.vy; b.life--;
    if (b.homing) {
      var t = bossTarget({x:b.x, y:b.y, w:b.w, h:b.h}).player;
      var tx = t.x + t.w / 2 - (b.x + b.w / 2), ty = t.y + t.h / 2 - (b.y + b.h / 2);
      var td = Math.max(1, Math.sqrt(tx * tx + ty * ty));
      b.vx += tx / td * 0.04; b.vy += ty / td * 0.04;
    }
    var hit = false;
    if (currentRoom === b.room) {
      if (rectHit(player, b)) { playerTakeDamage(player, b.damage); hit = true; }
      if (twoPlayerMode && rectHit(player2, b)) { playerTakeDamage(player2, b.damage); hit = true; }
    }
    if (hit || b.life <= 0 || b.x < b.room * ROOM_W || b.x > (b.room + 1) * ROOM_W || b.y > rooms[b.room].height + 30) {
      bossProjectiles.splice(i, 1);
    }
  }
}

function updateEnemies() {
  if (gameState !== ST_PLAYING) return;
  enemies.forEach(function(e) {
    if (e.dead || e.room !== currentRoom) return;
    var room = rooms[currentRoom];
    var left = currentRoom * ROOM_W, right = left + ROOM_W;
    if (e.boss) {
      updateBoss(e, room);
    } else if (e.type === 'larva_mosca') {
      var ecx = e.x + e.w/2, ecy = e.y + e.h/2;
      var pcx = player.x + player.w/2, pcy = player.y + player.h/2;
      var dx = pcx - ecx, dy = pcy - ecy;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var target = player;
      if (twoPlayerMode) {
        var p2cx = player2.x + player2.w/2, p2cy = player2.y + player2.h/2;
        var d2x = p2cx - ecx, d2y = p2cy - ecy;
        var dist2 = Math.sqrt(d2x*d2x + d2y*d2y);
        if (dist2 < dist) { dist = dist2; dx = d2x; dy = d2y; target = player2; }
      }
      if (dist < e.visionRadius && !target.frozen && target.inv <= 0) {
        e.vx = (dx / dist) * e.speed;
        e.vy = (dy / dist) * e.speed;
      } else {
        e.vx *= 0.92; e.vy *= 0.92;
      }
      e.x += e.vx; e.y += e.vy;
      if (e.x < left + 10) { e.x = left + 10; e.vx *= -1; }
      if (e.x + e.w > right - 10) { e.x = right - 10 - e.w; e.vx *= -1; }
      if (e.y < 0) { e.y = 0; e.vy *= -1; }
      if (e.y + e.h > room.height - 10) { e.y = room.height - 10 - e.h; e.vy *= -1; }
    } else {
      e.x += e.vx;
      e.y = e.baseY + Math.sin(Date.now() / 400 + e.x * 0.01) * e.range * 0.3;
      if (e.x < left + 20 || e.x + e.w > right - 20) e.vx *= -1;
    }
    if (player.inv <= 0 && !player.frozen && rectHit(player, e)) {
      var dmg = e.type === 'larva_mosca' ? 2 : 1;
      playerTakeDamage(player, e.boss ? (e.type === "guardian" ? 4 : 3) : dmg);
    }
    if (twoPlayerMode && player2.inv <= 0 && !player2.frozen && rectHit(player2, e)) {
      var dmg2 = e.type === 'larva_mosca' ? 2 : 1;
      playerTakeDamage(player2, e.boss ? (e.type === "guardian" ? 4 : 3) : dmg2);
    }
  });
}

function generateStalactites() {
  stalactites = [];
  for (var i = 0; i < 15; i++) {
    stalactites.push({
      x: Math.random() * WORLD_W, y: -20 - Math.random() * 100,
      w: 6 + Math.random() * 10, h: 20 + Math.random() * 40,
      speed: 0.5 + Math.random() * 1.5,
      active: false, fallTimer: 100 + Math.random() * 400, fallen: false
    });
  }
}

function updateStalactites() {
  stalactites.forEach(function(s) {
    if (!s.active && !s.fallen) {
      s.fallTimer--;
      if (s.fallTimer <= 0) s.active = true;
    }
    if (s.active && !s.fallen) {
      s.y += s.speed;
      if (Math.random() < 0.1) spawnParticles(s.x + s.w/2, s.y, "rgba(100,100,120,0.3)", 1, 0.5);
      var roomIndex = Math.floor(s.x / ROOM_W);
      if (roomIndex < rooms.length) {
        var room = rooms[roomIndex];
        if (s.y + s.h >= room.height - 10) {
          s.fallen = true; s.active = false;
          spawnParticles(s.x + s.w/2, s.y + s.h, "#6a6a7a", 8, 4);
          spawnParticles(s.x + s.w/2, s.y + s.h, "#4a4a5a", 5, 3);
          sfxStalactiteFall();
        }
      }
    }
  });
  stalactites.forEach(function(s) {
    if (s.fallen) {
      s.fallTimer = 300 + Math.random() * 400;
      s.fallen = false;
      s.y = -20 - Math.random() * 100;
      s.x = Math.random() * WORLD_W;
      s.active = false;
    }
  });
}

function updateWaterDrops() {
  if (Math.random() < 0.006) {
    waterDrops.push({ x: currentRoom * ROOM_W + 20 + Math.random() * (ROOM_W - 40), y: cameraY - 12, vy: 3 + Math.random() * 2, life: 90 });
    sfxWaterDrop();
  }
  waterDrops.forEach(function(drop) { drop.y += drop.vy; drop.life--; });
  waterDrops = waterDrops.filter(function(drop) { return drop.life > 0 && drop.y < cameraY + canvas.height + 10; });
}

function updateArrows() {
  for (var i = arrowsInFlight.length - 1; i >= 0; i--) {
    var arrow = arrowsInFlight[i];
    arrow.x += arrow.vx;
    arrow.y += arrow.vy;
    arrow.life--;
    var hitEnemy = false;
    enemies.forEach(function(e) {
      if (!e.dead && e.room === currentRoom && rectHit(arrow, e)) {
        if (e.boss) {
          e.hp -= 5; hitEnemy = true;
          spawnFloatText(e.x, e.y - 10, "-" + 5, "#ffd700");
          spawnParticles(e.x + e.w/2, e.y + e.h/2, "#7af", 8, 3);
          if (e.hp <= 0) defeatBoss(e);
        } else {
          e.dead = true; stats.enemiesKilled++; hitEnemy = true;
          if (bestiary[e.type]) { bestiary[e.type].count++; bestiary[e.type].discovered = true; }
          var gain = e.type === "larva_mosca" ? 4 : 2;
          azari += hasAzariCharm ? gain * 2 : gain;
          spawnParticles(e.x + e.w/2, e.y + e.h/2, "#f88", 12, 5);
          spawnFloatText(e.x, e.y - 10, "¡Muerto!", "#f88");
          sfxEnemyDie(); sfxCoin();
        }
      }
    });
    if (hitEnemy || arrow.life <= 0 || arrow.x < 0 || arrow.x > WORLD_W) arrowsInFlight.splice(i, 1);
  }

}

function defeatBoss(e) {
  if (e.dead) return;
  e.dead = true; e.hp = 0; stats.enemiesKilled++;
  bossArenaState[e.type] = true;
  spawnFloatText(e.x - 20, e.y - 22, "¡" + e.bossName + " DERROTADO!", "#ffd700");
  spawnParticles(e.x + e.w / 2, e.y + e.h / 2, "#ffd700", 35, 8);
  sfxEnemyDie(); sfxCoin();
  bossProjectiles = bossProjectiles.filter(function(p) { return p.room !== e.room; });
  if (e.type === "guardian") {
    player.maxHp++;
    player.hp = player.maxHp;
    spawnFloatText(player.x, player.y - 40, "¡Corazón +1!", "#f44");
  }
  if (e.room < rooms.length - 1) {
    rooms[e.room].transitionZone = {x: e.room * ROOM_W + ROOM_W - 70, y: 450, w: 60, h: 110, to: e.room + 1};
  }
}

function updateGenericPlayer(p, moveLeft, moveRight, jumpPressed, attackPressed, interactPressed, shootPressed, blockPressed, dashPressed) {
  if (gameState !== ST_PLAYING) return;
  p.blocking = !!blockPressed && !p.frozen;
  if (playerDead && p === player) {
    deathTimer--;
    if (deathTimer <= 0) { playerDead = false; p.inv = 40; }
    return;
  }
  if (p.autoWalk > 0 || p.frozen) { p.autoWalk--; return; }

  var wasOnGround = p.onGround;
  if (p.dashCooldown > 0) p.dashCooldown--;
  if (dashPressed && p.dashCooldown <= 0 && p.dashTimer <= 0 && !p.blocking) {
    p.dashTimer = DASH_DURATION;
    p.dashCooldown = DASH_COOLDOWN;
    p.dashDir = moveLeft ? -1 : (moveRight ? 1 : p.facing || 1);
    p.facing = p.dashDir;
    p.dashing = true;
    p.inv = Math.max(p.inv, DASH_INV_FRAMES);
    p.vy = 0;
    spawnParticles(p.x + p.w / 2, p.y + p.h / 2, "#7af", 8, 3);
  }

  if (p.dashTimer > 0) {
    p.dashTimer--;
    p.dashing = true;
    p.vx = p.dashDir * DASH_SPEED;
    p.vy = 0;
    if (p.dashTimer <= 0) p.dashing = false;
  } else {
    p.dashing = false;
    if (moveLeft) { p.vx = -3.5; p.facing = -1; }
    else if (moveRight) { p.vx = 3.5; p.facing = 1; }
    else p.vx *= 0.75;

    p.vy += GRAVITY; if (p.vy > 12) p.vy = 12;
  }
  p.x += p.vx; p.y += p.vy;

  if (p.onGround && Math.abs(p.vx) > 1 && Math.random() < 0.3) {
    spawnParticles(p.x + p.w/2 + (p.facing > 0 ? 0 : p.w), p.y + p.h, "rgba(200,200,200,0.3)", 1, 0.5);
  }

  var left = 0, right = WORLD_W;
  if (p.x < left + 5) { p.x = left + 5; p.vx = 0; }
  if (p.x + p.w > right - 5) { p.x = right - 5 - p.w; p.vx = 0; }

  var newRoom = Math.floor(p.x / ROOM_W);
  if (newRoom >= rooms.length) newRoom = rooms.length - 1;
  if (newRoom !== currentRoom) {
    currentRoom = newRoom;
    stats.roomsVisited++;
    var names = ["CAVERNA INICIAL", "CUEVA OLVIDADA", "ASCENSO ROCOSO", "TÚNELES OLVIDADOS", "PROFUNDIDADES", "", "PICO ABISMAL", "", "CAMINO FINAL", "TIENDA"];
    zoneName = names[currentRoom] || "";
    zoneNameTimer = 120;
    p.inv = 30;
  }

  var room = rooms[currentRoom];
  if (p.y + p.h > room.height) {
    var hasFloor = false;
    for (var i = 0; i < room.platforms.length; i++) {
      var pl = room.platforms[i];
      if (pl.y + pl.h >= room.height - 5 && rectHit(p, pl)) { hasFloor = true; break; }
    }
    if (currentRoom === 2 && room2.bombBox && !room2.bombBox.broken) {
      var b = room2.bombBox;
      if (b.y + b.h >= room.height - 5 && rectHit(p, b)) hasFloor = true;
    }
    if (hasFloor) {
      p.y = room.height - p.h; p.vy = 0; p.onGround = true; p.jumpsLeft = p.maxJumps;
    }
  }
  if (p.y > room.height + 80) {
    if (currentRoom === 2 && room2.bombBox && room2.bombBox.exploded) { startFallTransition(); return; }
    if (currentRoom === 5) { startTransition(6, "forward"); return; }
    if (currentRoom < rooms.length - 1) { sfxFall(); startFallThroughTransition(currentRoom + 1); return; }
    p.x = currentRoom * ROOM_W + ROOM_W / 2 - p.w / 2 + (p.id === 2 ? 30 : -30);
    p.y = 100; p.vx = 0; p.vy = 0;
    spawnFloatText(p.x, p.y - 20, "¡No hay más abajo!", "#f44");
    return;
  }
  p.onGround = false;
  var touchingSpikes = false;

  room.platforms.forEach(function(pl) {
    if (rectHit(p, pl)) {
      if (p.vy >= 0 && p.y + p.h - p.vy <= pl.y + 10) {
        if (!wasOnGround && p.vy > 2) {
          spawnParticles(p.x + p.w/2, p.y + p.h, "rgba(180,160,140,0.5)", 5, 2);
          sfxPlatformLand();
        }
        p.y = pl.y - p.h; p.vy = 0; p.onGround = true; p.jumpsLeft = p.maxJumps;
      } else if (p.vy < 0 && p.y - p.vy >= pl.y + pl.h - 10) {
        p.y = pl.y + pl.h; p.vy = 0;
      } else if (p.vx > 0) { p.x = pl.x - p.w; p.vx = 0; }
      else if (p.vx < 0) { p.x = pl.x + pl.w; p.vx = 0; }
    }
  });

  if (currentRoom === 2 && room2.bombBox && !room2.bombBox.broken) {
    var b = room2.bombBox;
    if (rectHit(p, b)) {
      if (p.vy >= 0 && p.y + p.h - p.vy <= b.y + 10) {
        p.y = b.y - p.h; p.vy = 0; p.onGround = true; p.jumpsLeft = p.maxJumps;
      } else if (p.vx > 0) { p.x = b.x - p.w; p.vx = 0; }
      else if (p.vx < 0) { p.x = b.x + b.w; p.vx = 0; }
    }
  }
  room.walls.forEach(function(w) {
    if (rectHit(p, w)) {
      if (p.vx > 0) { p.x = w.x - p.w; p.vx = 0; }
      else if (p.vx < 0) { p.x = w.x + w.w; p.vx = 0; }
    }
  });

  if (p.onGround && p.inv <= 0) {
    if (p === player) {
      var onSpikes = false;
      room.spikes.forEach(function(s) {
        var hit = {x: s.x + 5, y: s.y - 15, w: s.w - 10, h: s.h + 15};
        if (rectHit(p, hit)) onSpikes = true;
      });
      if (!onSpikes) { lastSafeX = p.x; lastSafeY = p.y; }
    }
  }

  if (p.inv <= 0) {
    room.spikes.forEach(function(s) {
      var hit = {x: s.x + 5, y: s.y - 15, w: s.w - 10, h: s.h + 15};
      if (rectHit(p, hit)) {
        touchingSpikes = true;
        playerTakeDamage(p, 1);
        if (p === player) { hitFlash = 60; needsRespawn = true; p.x = lastSafeX; p.y = lastSafeY; }
        p.frozen = true;
        p.vx = 0; p.vy = 0;
        spawnParticles(p.x + p.w/2, p.y + p.h, "#f44", 12);
      }
    });
  } else { p.inv--; }

  if (p === player && transitionCooldown <= 0) {
    var roomBoss = enemies.find ? enemies.find(function(enemy) { return enemy.boss && enemy.room === currentRoom; }) : null;
    if (room.transitionZone && rectHit(p, room.transitionZone) && (!roomBoss || roomBoss.dead)) {
      startTransition(room.transitionZone.to, "forward");
      return;
    }
  }

  if (p.swordSwing > 0) p.swordSwing--;
  if (p.swordCooldown > 0) p.swordCooldown--;
  if (p.bowCooldown > 0) p.bowCooldown--;
  if (!p.swordSheathed && p.swordSwing <= 0) {
    p.swordSheathTimer--;
    if (p.swordSheathTimer <= 0) p.swordSheathed = true;
  }

  if (attackPressed && p.hasSword && p.swordEquipped && p.swordCooldown <= 0 && p.swordSwing <= 0 && !p.frozen) {
    p.swordSwing = 12; p.swordCooldown = 22;
    p.swordSheathed = false;
    p.swordSheathTimer = 180;
    stats.attacks++;
    spawnParticles(p.x + p.w/2 + p.facing * 18, p.y + p.h/2, "#ffd700", 6, 4);
    sfxAttack();
    if (p.id === 1) { tryBreakBombBox(); }
    checkSwordHitEnemiesFor(p);
  }

  if (shootPressed && p.id === 1 && hasBow && arrows > 0 && p.bowCooldown <= 0 && !p.frozen) {
    arrows--; p.bowCooldown = 18;
    arrowsInFlight.push({ x: p.x + (p.facing > 0 ? p.w : -12), y: p.y + 13, w: 12, h: 3, vx: p.facing * 8, vy: 0, life: 100 });
    sfxBow();
  }

  if (interactPressed) tryInteractFor(p);

  if (jumpPressed && p.jumpsLeft > 0 && !p.frozen) {
    p.vy = -14.5; p.jumpsLeft--; p.onGround = false;
    stats.jumps++;
    spawnParticles(p.x + p.w/2, p.y + p.h, "#888", 4);
    sfxJump();
  }
}

function updatePlayer() {
  if (gameState !== ST_PLAYING) return;
  if (transitionCooldown > 0) transitionCooldown--;
  var moveLeft = keys["a"] || keys["arrowleft"];
  var moveRight = keys["d"] || keys["arrowright"];
  var jump = keys[" "] || keys["arrowup"];
  var attack = (keys["x"] || keys["j"]) && hasSword;
  var shoot = keys["z"];
  var interact = keys["e"];
  var block = keys["c"];
  var dash = keys["shift"];
  if (gamepadConnected) {
    if (gpAxes.x < -0.25) moveLeft = true;
    if (gpAxes.x > 0.25) moveRight = true;
    if (gpButtons[0] && !prevGPButtons[0]) jump = true;
    if (gpButtons[2] && !prevGPButtons[2]) attack = true;
    if (gpButtons[1] && !prevGPButtons[1]) shoot = true;
    if (gpButtons[3] && !prevGPButtons[3]) interact = true;
    if (gpButtons[6]) block = true;
    if (gpButtons[5] && !prevGPButtons[5]) dash = true;
  }
  updateGenericPlayer(player, moveLeft, moveRight, jump, attack, interact, shoot, block, dash);
}

function updatePlayer2() {
  if (gameState !== ST_PLAYING || !twoPlayerMode) return;
  var moveLeft = keys["arrowleft"];
  var moveRight = keys["arrowright"];
  var jump = keys["shift"];
  var attack = keys["ctrl"] && hasSword;
  var interact = keys["alt"];
  updateGenericPlayer(player2, moveLeft, moveRight, jump, attack, interact, false, false, keys["shift"]);
  if (rectHit(player, player2)) {
    var dx = (player.x + player.w/2) - (player2.x + player2.w/2);
    if (dx > 0) { player.x += 1; player2.x -= 1; }
    else { player.x -= 1; player2.x += 1; }
  }
}

function checkSwordHitEnemiesFor(p) {
  if (p.swordSwing <= 0) return;

  var reach = 30;
  var swingBoxes = [
    { x: p.x + (p.facing > 0 ? p.w : -reach), y: p.y + 2, w: reach, h: 26 },
    { x: p.x - 6, y: p.y - reach + 4, w: p.w + 12, h: reach },
    { x: p.x - 6, y: p.y + p.h - 4, w: p.w + 12, h: reach }
  ];

  enemies.forEach(function(e) {
    if (e.dead || e.room !== currentRoom) return;
    var hit = false;
    for (var i = 0; i < swingBoxes.length; i++) {
      if (rectHit(swingBoxes[i], e)) { hit = true; break; }
    }
    if (hit) {
      if (e.boss) {
        if (e.lastSwordHit === frameCounter) return;
        e.lastSwordHit = frameCounter;
        e.hp -= 12;
        spawnFloatText(e.x, e.y - 10, "-12", "#ffd700");
        spawnParticles(e.x + e.w/2, e.y + e.h/2, "#7af", 10, 4);
        if (e.hp <= 0) defeatBoss(e);
        return;
      }
      e.dead = true;
      stats.enemiesKilled++;
      for (var i = 0; i < 15; i++) {
        deathParticles.push({
          x: e.x + e.w/2, y: e.y + e.h/2,
          vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6 - 2,
          life: 20 + Math.random() * 20, maxLife: 30,
          color: ["#f44", "#f88", "#a0a", "#f0f"][Math.floor(Math.random()*4)],
          size: 2 + Math.random() * 4
        });
      }
      var baseGain = e.type === 'larva_mosca' ? 4 : 2;
      var azariGain = hasAzariCharm ? baseGain * 2 : baseGain;
      azari += azariGain;
      if (bestiary[e.type]) bestiary[e.type].count++;
      if (bestiary[e.type] && !bestiary[e.type].discovered) {
        bestiary[e.type].discovered = true;
        discoveryNotify = { active: true, timer: 200, name: bestiaryInfo[e.type].name };
        sfxDiscovery();
      }
      spawnParticles(e.x + e.w/2, e.y + e.h/2, "#f88", 12, 5);
      spawnParticles(e.x + e.w/2, e.y + e.h/2, "#440", 8, 3);
      p.vy = -11; p.onGround = false; p.jumpsLeft = p.maxJumps;
      spawnFloatText(e.x, e.y - 10, "¡Muerto!", "#f88");
      spawnFloatText(e.x, e.y - 25, "+" + azariGain + " Azari", "#0ff");
      sfxEnemyDie(); sfxCoin();
    }
  });
}

function tryInteractFor(p) {
  if (currentRoom === 1 && !room1.pedestal.taken) {
    var ped = room1.pedestal;
    var dx = (p.x + p.w/2) - (ped.glass.x + ped.glass.w/2);
    var dy = (p.y + p.h/2) - (ped.glass.y + ped.glass.h/2);
    if (Math.sqrt(dx*dx + dy*dy) < 70) {
      room1.pedestal.taken = true;
      hasSword = true; swordEquipped = true;
      player.hasSword = true; player.swordEquipped = true;
      if (twoPlayerMode) { player2.hasSword = true; player2.swordEquipped = true; }
      flash = 0.6;
      spawnParticles(1180, 470, "#ffd700", 25, 5);
      sfxEquip();
      spawnParticles(1180, 470, "#fff", 15, 4);
      spawnFloatText(1180, 400, "¡Obtuviste la Espada!", "#ffd700");
      spawnFloatText(1180, 420, "Presiona X/J o CTRL para atacar", "#aaa");
      updateUI();
      return;
    }
  }
  var room = rooms[currentRoom];
  if (room.shops) {
    for (var i = 0; i < room.shops.length; i++) {
      var s = room.shops[i];
      var npc = s.npc;
      var dx = (p.x + p.w/2) - (npc.x + npc.w/2);
      var dy = (p.y + p.h/2) - (npc.y + npc.h/2);
      if (Math.sqrt(dx*dx + dy*dy) < 90 && !shopOpen && shopExitCooldown <= 0) {
        sfxNpc();
        shopPreviousX = player.x; shopPreviousY = player.y;
        shopOpen = true; shopMenuOpen = false; shopId = s.id; menuSelection = 0; shopConfirm = -1; shopAnim = 180;
        player.x = 550; player.y = 530; player.vx = 0; player.vy = 0;
        return;
      }
    }
  }
  if (room.healingStone && room.healingStone.active) {
    var st = room.healingStone;
    var dx = (p.x + p.w/2) - (st.x + st.w/2);
    var dy = (p.y + p.h/2) - (st.y + st.h/2);
    if (Math.sqrt(dx*dx + dy*dy) < 80 && p.hp < p.maxHp && !healing) {
      healing = true; healTimer = 120; p.frozen = true;
      spawnFloatText(p.x, p.y - 30, "J" + p.id + " sentándose...", "#4f4");
    }
  }
}

function tryBreakBombBox() {
  if (currentRoom !== 2 || !room2.bombBox || room2.bombBox.broken || room2.bombBox.exploded) return;
  var swingBox = { x: player.x + (player.facing > 0 ? player.w : -26), y: player.y + 2, w: 26, h: 26 };
  if (rectHit(swingBox, room2.bombBox)) {
    room2.bombBox.broken = true;
    startExplosion();
  }
}

function startExplosion() {
  gameState = ST_EXPLOSION;
  explosionAnim = 60;
  sfxExplosion();
  var box = room2.bombBox;
  explosionX = box.x + box.w/2;
  explosionY = box.y + box.h/2;
  player.frozen = true; player.vx = 0; player.vy = 0;
  if (twoPlayerMode) { player2.frozen = true; player2.vx = 0; player2.vy = 0; }
  spawnParticles(explosionX, explosionY, "#ff6600", 30, 8);
  spawnParticles(explosionX, explosionY, "#ffcc00", 20, 6);
  spawnParticles(explosionX, explosionY, "#ff0000", 15, 10);
}

function updateExplosion() {
  explosionAnim--;
  if (explosionAnim === 45) {
    knockbackVX = 10; knockbackVY = -12;
    player.vx = knockbackVX; player.vy = knockbackVY;
    if (twoPlayerMode) { player2.vx = -knockbackVX; player2.vy = knockbackVY; }
    spawnParticles(explosionX, explosionY, "#ff4400", 25, 12);
    spawnParticles(explosionX, explosionY, "#ffaa00", 20, 10);
    spawnParticles(player.x + player.w/2, player.y + player.h/2, "#ff6600", 10, 5);
    if (twoPlayerMode) spawnParticles(player2.x + player2.w/2, player2.y + player2.h/2, "#ff6600", 10, 5);
  }
  if (explosionAnim < 45 && explosionAnim > 10) {
    player.vx = knockbackVX * (explosionAnim / 45);
    player.vy += GRAVITY;
    player.x += player.vx; player.y += player.vy;
    if (twoPlayerMode) {
      player2.vx = -knockbackVX * (explosionAnim / 45);
      player2.vy += GRAVITY;
      player2.x += player2.vx; player2.y += player2.vy;
    }
    if (explosionAnim % 5 === 0) {
      spawnParticles(explosionX + (Math.random()-0.5)*40, explosionY + (Math.random()-0.5)*40, "#555", 3, 2);
    }
  }
  if (explosionAnim <= 10) { transFade = 1 - (explosionAnim / 10); }
  if (explosionAnim <= 0) { startFallTransition(); }
}

function startFallTransition() {
  gameState = ST_TRANSITION;
  transPhase = "load";
  transTimer = 60;
  transTargetRoom = 3;
  transFade = 1;
  zoneName = "TÚNELES OLVIDADOS";
  zoneNameTimer = 150;
  currentRoom = 3;
  targetCamX = currentRoom * ROOM_W;
  cameraX = targetCamX;
  player.x = 2450; player.y = 400; player.vx = 0; player.vy = 0; player.frozen = false;
  if (twoPlayerMode) { player2.x = 2490; player2.y = 400; player2.vx = 0; player2.vy = 0; player2.frozen = false; }
  room2.bombBox.exploded = true;
}

function startFallThroughTransition(toRoom) {
  if (gameState === ST_TRANSITION || gameState === ST_EXPLOSION) return;
  gameState = ST_TRANSITION;
  transPhase = "out";
  transTimer = 35;
  transTargetRoom = toRoom;
  transFade = 0;
  transIsFall = true;
  player.vx = 0; player.vy = 0;
  if (twoPlayerMode) { player2.vx = 0; player2.vy = 0; }
}

function startTransition(toRoom, direction) {
  if (gameState === ST_TRANSITION || gameState === ST_EXPLOSION) return;
  sfxTransition();
  particles = [];
  floatTexts = [];
  gameState = ST_TRANSITION;
  transPhase = "out";
  transTimer = 50;
  transTargetRoom = toRoom;
  transFade = 0;
  transIsFall = false;
  player.autoWalk = 50;
  if (twoPlayerMode) player2.autoWalk = 50;
  if (direction === "back") { player.vx = -2; if (twoPlayerMode) player2.vx = -2; }
  else { player.vx = 2; if (twoPlayerMode) player2.vx = 2; }
}

function updateTransition() {
  transTimer--;
  if (transPhase === "out") {
    transFade = 1 - (transTimer / 50);
    player.x += player.vx;
    if (twoPlayerMode) player2.x += player2.vx;
    if (transTimer <= 0) { transPhase = "load"; transTimer = 40; }
  } else if (transPhase === "load") {
    transFade = 1;
    if (transTimer === 25) {
      currentRoom = transTargetRoom;
      var room = rooms[currentRoom];
      if (transIsFall) {
        player.x = currentRoom * ROOM_W + ROOM_W / 2 - player.w / 2 - 20;
        player.y = 80; player.vx = 0; player.vy = 2;
        if (twoPlayerMode) { player2.x = currentRoom * ROOM_W + ROOM_W / 2 - player2.w / 2 + 20; player2.y = 80; player2.vx = 0; player2.vy = 2; }
        spawnFloatText(player.x, player.y + 30, "No hay vuelta atrás...", "#f44");
      } else {
        if (player.vx < 0) {
          player.x = currentRoom * ROOM_W + ROOM_W - 80;
          if (twoPlayerMode) player2.x = currentRoom * ROOM_W + ROOM_W - 50;
        } else {
          player.x = currentRoom * ROOM_W + 30;
          if (twoPlayerMode) player2.x = currentRoom * ROOM_W + 60;
        }
        player.y = room.height - 120;
        player.vx = player.vx < 0 ? -2 : 2;
        if (twoPlayerMode) { player2.y = room.height - 120; player2.vx = player2.vx < 0 ? -2 : 2; }
      }
      var names = ["CAVERNA INICIAL", "CUEVA OLVIDADA", "ASCENSO ROCOSO", "TÚNELES OLVIDADOS", "PROFUNDIDADES", "", "PICO ABISMAL", "", "CAMINO FINAL", "TIENDA"];
      zoneName = names[currentRoom] || "";
      zoneNameTimer = 120;
    }
    if (transTimer <= 0) { transPhase = "in"; transTimer = transIsFall ? 35 : 50; }
  } else if (transPhase === "in") {
    transFade = transTimer / (transIsFall ? 35 : 50);
    if (transIsFall) {
      player.vy += GRAVITY; if (player.vy > 8) player.vy = 8;
      player.y += player.vy;
      if (twoPlayerMode) { player2.vy += GRAVITY; if (player2.vy > 8) player2.vy = 8; player2.y += player2.vy; }
    } else {
      player.x += player.vx;
      if (twoPlayerMode) player2.x += player2.vx;
    }
    if (transTimer <= 0) { gameState = ST_PLAYING; player.autoWalk = 0; player.vx = 0; if (twoPlayerMode) { player2.autoWalk = 0; player2.vx = 0; } transIsFall = false; transitionCooldown = 45; }
  }
}

function updateUI() {
  var el = document.getElementById("ctrlText");
  if (twoPlayerMode) {
    el.innerHTML = '<kbd>A/D</kbd>+<kbd>ESP</kbd>+<kbd>X</kbd> J1  •  <kbd>←→</kbd>+<kbd>Shift</kbd>+<kbd>Ctrl</kbd> J2  •  <kbd>`</kbd> Inventario • <kbd>ESC</kbd> Menú';
  } else {
    if (hasSword || hasBow) el.innerHTML = '<kbd>A</kbd> <kbd>D</kbd> Mover • <kbd>ESPACIO</kbd> Saltar • <kbd>SHIFT</kbd>/<kbd>R1</kbd> Dash • <kbd>C</kbd>/<kbd>L2</kbd> Bloquear • <kbd>X</kbd>/<kbd>J</kbd> Espada • <kbd>Z</kbd> Arco • <kbd>E</kbd> Interactuar • <kbd>`</kbd> Inventario • <kbd>M</kbd> Música • <kbd>N</kbd> SFX • <kbd>ESC</kbd> Menú';
    else el.innerHTML = '<kbd>A</kbd> <kbd>D</kbd> Mover • <kbd>ESPACIO</kbd> Saltar • <kbd>SHIFT</kbd>/<kbd>R1</kbd> Dash • <kbd>C</kbd>/<kbd>L2</kbd> Bloquear • <kbd>E</kbd> Interactuar • <kbd>`</kbd> Inventario • <kbd>M</kbd> Música • <kbd>N</kbd> SFX • <kbd>ESC</kbd> Menú';
  }
}
