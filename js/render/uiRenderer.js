function drawInventoryIcon(iconX, iconY, kind, owned, color) {
  if (!owned) return;
  ctx.save();
  ctx.translate(iconX, iconY);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (kind === "sword") {
    ctx.rotate(-Math.PI / 4);
    ctx.fillRect(-2, -17, 5, 25);
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(-8, 7, 17, 4);
    ctx.fillStyle = "#704321";
    ctx.fillRect(-2, 11, 5, 9);
  } else if (kind === "bow") {
    ctx.beginPath();
    ctx.arc(-2, 0, 16, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-2, -16);
    ctx.lineTo(13, 0);
    ctx.lineTo(-2, 16);
    ctx.stroke();
  } else if (kind === "key") {
    ctx.beginPath();
    ctx.arc(-7, -5, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillRect(-1, -3, 17, 4);
    ctx.fillRect(9, 1, 4, 7);
  } else if (kind === "amulet") {
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(12, -3);
    ctx.lineTo(0, 15);
    ctx.lineTo(-12, -3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#173647";
    ctx.beginPath();
    ctx.arc(0, -2, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "lantern") {
    ctx.fillRect(-8, -7, 16, 17);
    ctx.strokeRect(-6, -14, 12, 8);
    ctx.fillStyle = "#fff2a8";
    ctx.beginPath();
    ctx.arc(0, 1, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "map") {
    ctx.beginPath();
    ctx.moveTo(-15, -11);
    ctx.lineTo(-5, -15);
    ctx.lineTo(5, -11);
    ctx.lineTo(15, -15);
    ctx.lineTo(15, 11);
    ctx.lineTo(5, 15);
    ctx.lineTo(-5, 11);
    ctx.lineTo(-15, 15);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-5, -15);
    ctx.lineTo(-5, 11);
    ctx.moveTo(5, -11);
    ctx.lineTo(5, 15);
    ctx.stroke();
  } else if (kind === "fragment") {
    ctx.beginPath();
    ctx.moveTo(0, -17);
    ctx.lineTo(12, -4);
    ctx.lineTo(7, 13);
    ctx.lineTo(-9, 13);
    ctx.lineTo(-14, -4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e9dcff";
    ctx.fillRect(-2, -10, 4, 16);
  } else if (kind === "doubleJump") {
    ctx.beginPath();
    ctx.moveTo(-14, 6);
    ctx.lineTo(0, -10);
    ctx.lineTo(14, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-14, 14);
    ctx.lineTo(0, -2);
    ctx.lineTo(14, 14);
    ctx.stroke();
  } else if (kind === "dash") {
    ctx.beginPath();
    ctx.moveTo(-15, 5);
    ctx.lineTo(0, -14);
    ctx.lineTo(-2, -2);
    ctx.lineTo(15, -2);
    ctx.lineTo(0, 15);
    ctx.lineTo(2, 4);
    ctx.closePath();
    ctx.fill();
  } else if (kind === "armor") {
    ctx.beginPath();
    ctx.moveTo(0, -17);
    ctx.lineTo(12, -10);
    ctx.lineTo(10, 10);
    ctx.lineTo(0, 17);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-12, -10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#222b3b";
    ctx.fillRect(-3, -11, 6, 22);
  } else if (kind === "relic") {
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1b2234";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawInventory() {
  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#6cc";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 24px monospace";
  ctx.fillText(translateText("🎒 INVENTARIO"), canvas.width/2, 40);
  ctx.fillStyle = "#446";
  ctx.font = "12px monospace";
  ctx.fillText(translateText("Presiona ` o SHARE para cerrar"), canvas.width/2, 60);
  ctx.textAlign = "left";
  ctx.fillStyle = "#c9a94e";
  ctx.font = "bold 13px monospace";
  ctx.fillText("OBJETOS", 34, 92);
  ctx.fillStyle = "#687080";
  ctx.fillText("EQUIPO", 208, 92);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f3d36a";
  ctx.fillText("HABITACIÓN " + (inventoryPage + 1) + " / 2", 380, 92);
  ctx.fillStyle = inventoryPage > 0 ? "#f3d36a" : "#485363";
  ctx.fillText("◀", 525, 92);
  ctx.fillStyle = inventoryPage < 1 ? "#f3d36a" : "#485363";
  ctx.fillText("▶", 550, 92);
  ctx.textAlign = "left";

  var inventorySlots = [
    { name: "Espada", kind: "sword", owned: hasSword, detail: hasSword ? "nivel +" + swordLevel : "sin obtener", color: "#e4e9f0" },
    { name: "Arco", kind: "bow", owned: hasBow, detail: hasBow ? arrows + " flechas" : "sin obtener", color: "#b98b58" },
    { name: "Llave vieja", kind: "key", owned: hasOldKey, detail: hasOldKey ? "puerta antigua" : "sin obtener", color: "#d4af37" },
    { name: "Amuleto", kind: "amulet", owned: hasAzariCharm, detail: "bendición", color: "#73d4cc" },
    { name: "Linterna", kind: "lantern", owned: hasLantern, detail: hasLantern ? "nivel " + lanternLevel : "sin obtener", color: "#f2c45c" },
    { name: "Mapa", kind: "map", owned: hasMap, detail: "zonas descubiertas", color: "#8bb7d9" },
    { name: "Fragmento", kind: "fragment", owned: heartFragments1 > 0 || heartFragments2 > 0, detail: (heartFragments1 + heartFragments2) + " / 6", color: "#a88be8" },
    { name: "Doble salto", kind: "doubleJump", owned: hasDoubleJump, detail: "habilidad", color: "#8ad6ff" },
    { name: "Dash", kind: "dash", owned: hasDash, detail: "habilidad", color: "#c58cff" },
    { name: "Armadura", kind: "armor", owned: armorId === "plate", detail: armorId === "plate" ? "50% de probabilidad de medio daño" : "sin obtener", color: "#d8a85f" },
    { name: "Corazón pétreo", kind: "relic", owned: bossUniqueItems.guardian, detail: "reliquia de jefe", color: "#9ca8b2" },
    { name: "Núcleo colonia", kind: "relic", owned: bossUniqueItems.queen_larva, detail: "reliquia de jefe", color: "#d68aab" },
    { name: "Fragmento abisal", kind: "relic", owned: bossUniqueItems.abyssal_knight, detail: "reliquia de jefe", color: "#8368c9" }
  ];
  var pageSlots = inventorySlots.slice(inventoryPage * 9, inventoryPage * 9 + 9);
  while (pageSlots.length < 9) pageSlots.push({ name: "", owned: false, detail: "", color: "#647080" });
  var slotX = 28, slotY = 112, slotW = 150, slotH = 60, slotGap = 6;
  pageSlots.forEach(function(slot, index) {
    var col = index % 3, row = Math.floor(index / 3);
    var x = slotX + col * (slotW + slotGap);
    var y = slotY + row * (slotH + slotGap);
    var selected = inventorySelection === index || inventoryHover === index;
    ctx.fillStyle = selected ? "rgba(201,169,78,0.22)" : "rgba(255,255,255,0.035)";
    ctx.fillRect(x, y, slotW, slotH);
    ctx.strokeStyle = selected ? "#f3d36a" : "#394354";
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(x, y, slotW, slotH);
    ctx.fillStyle = slot.owned ? "rgba(255,255,255,0.06)" : "#303846";
    ctx.fillRect(x + 10, y + 13, 42, 42);
    ctx.strokeStyle = slot.owned ? slot.color : "#485363";
    ctx.strokeRect(x + 10, y + 13, 42, 42);
    drawInventoryIcon(x + 31, y + 34, slot.kind, slot.owned, slot.color);
    ctx.fillStyle = slot.owned ? "#eee8d0" : "#657080";
    ctx.font = "bold 11px monospace";
    ctx.fillText(slot.owned ? slot.name : "—", x + 60, y + 31);
    ctx.fillStyle = slot.owned ? "#9fb39b" : "#596272";
    ctx.font = "10px monospace";
    ctx.fillText(slot.owned ? slot.detail : "vacío", x + 60, y + 48);
  });

  var selectedSlot = pageSlots[inventorySelection] || pageSlots[0];
  ctx.fillStyle = "#151d2b";
  ctx.fillRect(28, 386, 470, 100);
  ctx.strokeStyle = "#4b596f";
  ctx.strokeRect(28, 386, 470, 100);
  ctx.fillStyle = "#f3d36a";
  ctx.font = "bold 14px monospace";
  ctx.fillText(selectedSlot.owned ? selectedSlot.name.toUpperCase() : "SIN OBJETO SELECCIONADO", 46, 414);
  ctx.fillStyle = "#aeb8c8";
  ctx.font = "11px monospace";
  ctx.fillText(selectedSlot.owned ? selectedSlot.detail : "Explora el reino para encontrar objetos.", 46, 440);
  ctx.fillStyle = "#6f7c90";
  ctx.fillText("ENTER: usar/equipar   FLECHAS: mover   ` : cerrar", 46, 466);

  ctx.fillStyle = "#172131";
  ctx.fillRect(528, 92, 242, 368);
  ctx.strokeStyle = "#52627b";
  ctx.strokeRect(528, 92, 242, 368);
  ctx.fillStyle = "#c9a94e";
  ctx.font = "bold 13px monospace";
  ctx.fillText("EQUIPAMIENTO", 548, 120);
  ctx.fillStyle = "#9da9bb";
  ctx.font = "11px monospace";
  ctx.fillText("ESPADA", 548, 154);
  ctx.fillText(hasSword ? "Nivel +" + swordLevel : "Sin obtener", 650, 154);
  ctx.fillText("ARCO", 548, 184);
  ctx.fillText(hasBow ? "Disponible" : "Sin obtener", 650, 184);
  ctx.fillText("ARMADURA", 548, 214);
  ctx.fillText(armorId === "vacío" ? "Ninguna" : armorId, 650, 214);
  ctx.fillText("VIDA", 548, 244);
  ctx.fillText(player.hp + " / " + player.maxHp, 650, 244);
  ctx.strokeStyle = "#344154";
  ctx.beginPath();
  ctx.moveTo(548, 268); ctx.lineTo(750, 268); ctx.stroke();
  ctx.fillStyle = "#78879d";
  ctx.fillText("COLECCIONABLES", 548, 296);
  ctx.fillText("Fragmentos", 548, 324);
  ctx.fillText(heartFragments1 + heartFragments2 + " / 6", 700, 324);
  ctx.fillText("Secretos", 548, 354);
  ctx.fillText(Object.keys(hiddenCollectibles).filter(function(key) { return hiddenCollectibles[key]; }).length + " / 3", 700, 354);
  ctx.fillText("Azari", 548, 384);
  ctx.fillText(String(azari), 700, 384);
  ctx.fillStyle = "#59677d";
  ctx.fillText("Las casillas vacías se llenarán", 548, 420);
  ctx.fillText("cuando encuentres nuevos objetos.", 548, 438);
  ctx.textAlign = "left";
  return;
  if (hasMap) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#6cc";
    ctx.font = "bold 12px monospace";
    ctx.fillText("M: " + translateText(mapOpen ? "cerrar mapa" : "usar mapa"), canvas.width / 2, 80);
  }

  ctx.textAlign = "left";
  ctx.fillStyle = "#0cc";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("👤 JUGADOR 1"), 30, 100);
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("❤️ " + player.hp + "/" + player.maxHp, 200, 100);

  var items = [
    "💎 Bendición codiciosa " + (hasAzariCharm ? "✓" : "—"),
    "🪨 Corazón pétreo " + (bossUniqueItems.guardian ? "✓" : "—"),
    "🐛 Núcleo de colonia " + (bossUniqueItems.queen_larva ? "✓" : "—"),
    "🌑 Fragmento abisal " + (bossUniqueItems.abyssal_knight ? "✓" : "—"),
    "🛡️ Armadura: " + armorId,
    "⚔️ Espada +" + swordLevel + "  🏹 Arco +" + bowLevel,
    "❤️ Vida: " + player.maxHp + "  Fragmentos " + heartFragments1 + "/3",
    "💠 Azari: " + azari + "  Saltos: " + (hasDoubleJump ? "Doble" : "Simple"),
    "🗝️ Llave vieja " + (hasOldKey ? "✓" : "—")
  ];

  var y = 125;
  items.forEach(function(item, index) {
    var cardX = 25 + (index % 2) * 175;
    var cardY = 115 + Math.floor(index / 2) * 55;
    var active = !mapOpen && (inventorySelection === index || inventoryHover === index);
    ctx.fillStyle = active ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(cardX, cardY, 165, 45);
    ctx.strokeStyle = active ? "#6cc" : "#333";
    ctx.lineWidth = active ? 2 : 1;
    ctx.strokeRect(cardX, cardY, 165, 45);
    ctx.fillStyle = active ? "#ffd700" : "#aaa";
    ctx.font = "12px monospace";
    ctx.fillText(item, cardX + 10, cardY + 27);
  });
  ctx.fillStyle = "#6cc"; ctx.font = "bold 12px monospace";
  ctx.fillText("BENDICIONES (" + equippedBlessings.length + "/" + blessingSlots + ")", 390, 125);
  ctx.fillStyle = "#bbb"; ctx.font = "11px monospace";
  ctx.fillText(equippedBlessings.length ? equippedBlessings.join(" • ") : "Ninguna equipada", 390, 145);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 12px monospace";
  ctx.fillText("DESCRIPCIÓN", 390, 180);
  ctx.fillStyle = "#ccc"; ctx.font = "11px monospace";
  var descriptions = [
    "Duplica las ganancias de Azari.",
    "Reduce el daño recibido.",
    "Invoca una ayuda breve al atacar.",
    "Aumenta el daño de habilidades abisales.",
    "Equipo defensivo intercambiable.",
    "Nivel de daño permanente de armas.",
    "Cada fragmento completa una mejora de vida.",
    "Coleccionables y progreso de exploración.",
    "Llave antigua. Selecciónala y pulsa E para prepararla junto a una puerta."
  ];
  var descriptionIndex = inventoryHover >= 0 ? inventoryHover : inventorySelection;
  ctx.fillText(descriptions[descriptionIndex], 390, 200);
  ctx.fillStyle = "#8f8"; ctx.fillText("Coleccionables ocultos: " +
    Object.keys(hiddenCollectibles).filter(function(key) { return hiddenCollectibles[key]; }).length + "/3", 390, 235);
  ctx.fillStyle = "#aaa"; ctx.fillText("Ranuras: usa Enter para equipar", 390, 265);
  ctx.fillText("Armadura actual: " + armorId + " | alternativa: " + (armorId === "cave" ? "vacío" : "caverna"), 390, 285);
  if (mapOpen && hasMap) {
    ctx.fillStyle = "rgba(3, 8, 20, 0.97)";
    ctx.fillRect(14, 88, canvas.width - 28, 455);
    ctx.strokeStyle = "#6cc";
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 88, canvas.width - 28, 455);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 14px monospace";
    ctx.fillText(translateText("🗺️ MAPA DE TODAS LAS ZONAS"), canvas.width / 2, 110);

    var cardW = 101, cardH = 184, gap = 6, startX = 18, startY = 122;
    for (var roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
      var room = rooms[roomIndex];
      var col = roomIndex % 7, row = Math.floor(roomIndex / 7);
      var cardX = startX + col * (cardW + gap), cardY = startY + row * (cardH + gap);
      var selected = roomIndex === currentRoom;
      var discovered = roomIndex <= highestRoomReached;
      ctx.fillStyle = selected ? "rgba(93,72,12,0.75)" : (discovered ? "rgba(25,34,57,0.9)" : "rgba(8,10,18,0.95)");
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeStyle = selected ? "#ffd700" : (room.bossName ? "#a85cff" : "#43516f");
      ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      ctx.fillStyle = selected ? "#ffd700" : (discovered ? "#d5def5" : "#3d4352");
      ctx.font = "bold 11px monospace";
      ctx.fillText(translateText("ZONA") + " " + (roomIndex + 1), cardX + cardW / 2, cardY + 14);

      var innerX = cardX + 7, innerY = cardY + 22, innerW = cardW - 14, innerH = cardH - 31;
      if (!discovered) {
        ctx.fillStyle = "#303542";
        ctx.font = "bold 22px monospace";
        ctx.fillText("?", cardX + cardW / 2, cardY + cardH / 2);
        continue;
      }
      var scaleX = innerW / 800, scaleY = innerH / room.height;
      room.platforms.forEach(function(platform) {
        var localX = platform.x - roomIndex * ROOM_W;
        ctx.fillStyle = platform.y > room.height - 80 ? "#9b6b3e" : "#6c8a9b";
        ctx.fillRect(innerX + localX * scaleX, innerY + platform.y * scaleY,
          Math.max(3, platform.w * scaleX), Math.max(2, platform.h * scaleY));
      });
      (room.spikes || []).forEach(function(spike) {
        var spikeX = innerX + (spike.x - roomIndex * ROOM_W) * scaleX;
        ctx.fillStyle = "#e44";
        ctx.fillRect(spikeX, innerY + spike.y * scaleY, Math.max(3, spike.w * scaleX), 2);
      });
      (room.shops || []).forEach(function(shop) {
        ctx.fillStyle = "#4fdbb4";
        ctx.fillRect(innerX + (shop.npc.x - roomIndex * ROOM_W) * scaleX, innerY + shop.npc.y * scaleY - 3, 4, 5);
      });
      if (room.bossName) {
        ctx.fillStyle = "#d68cff";
        ctx.font = "bold 9px monospace";
        ctx.fillText(translateText("JEFE"), cardX + cardW / 2, cardY + cardH - 8);
      } else if (room.shops && room.shops.length) {
        ctx.fillStyle = "#4fdbb4";
        ctx.font = "9px monospace";
        ctx.fillText(translateText("TIENDA"), cardX + cardW / 2, cardY + cardH - 8);
      }
    }
    ctx.fillStyle = "#aaa";
    ctx.font = "11px monospace";
    ctx.fillText(translateText("Dorado: zona actual  •  Morado: jefe  •  Verde: tienda  •  Rojo: peligro"), canvas.width / 2, 532);
    ctx.textAlign = "left";
  }

  var statY = mapOpen && hasMap ? 555 : 335;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(30, statY, canvas.width - 60, 70);
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 1;
  ctx.strokeRect(30, statY, canvas.width - 60, 70);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("📊 ESTADÍSTICAS"), canvas.width/2, statY + 20);
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText("⏱️ " + formatTime(stats.playTime) + "  |  ⚔️ " + stats.enemiesKilled + "  |  🏠 " + stats.roomsVisited, canvas.width/2, statY + 42);
  ctx.fillText("🦘 " + stats.jumps + "  |  ⚡ " + stats.attacks + "  |  💀 " + stats.deaths, canvas.width/2, statY + 60);
  ctx.textAlign = "left";
}
function drawLevelEditor() {
  ctx.fillStyle = "#050510";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "left";
  ctx.fillText("🎒 EDITOR DE NIVELES", 24, 35);
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("Clic: colocar  •  Clic derecho: quitar  •  S: guardar  •  ESC: salir", 24, 58);
  ctx.fillStyle = "#18243b";
  ctx.fillRect(24, 62, 286, 20);
  ctx.fillStyle = "#8cf0ff";
  ctx.font = "bold 11px monospace";
  ctx.fillText("< SALA", 30, 76);
  ctx.fillText("SALA " + (editorRoomIndex + 1) + "/" + (editorLevel && editorLevel.rooms ? editorLevel.rooms.length : 1), 112, 76);
  ctx.fillStyle = "#7dffad";
  ctx.fillText("NUEVA SALA [N]", 194, 76);

  ctx.fillStyle = "#0b1020";
  ctx.fillRect(EDITOR_GRID_X, EDITOR_GRID_Y, EDITOR_COLS * EDITOR_CELL, EDITOR_ROWS * EDITOR_CELL);
  ctx.strokeStyle = "#6cc";
  ctx.lineWidth = 2;
  ctx.strokeRect(EDITOR_GRID_X, EDITOR_GRID_Y, EDITOR_COLS * EDITOR_CELL, EDITOR_ROWS * EDITOR_CELL);
  ctx.strokeStyle = "rgba(108,204,204,0.2)";
  ctx.lineWidth = 1;
  for (var col = 0; col <= EDITOR_COLS; col++) {
    ctx.beginPath();
    ctx.moveTo(EDITOR_GRID_X + col * EDITOR_CELL, EDITOR_GRID_Y);
    ctx.lineTo(EDITOR_GRID_X + col * EDITOR_CELL, EDITOR_GRID_Y + EDITOR_ROWS * EDITOR_CELL);
    ctx.stroke();
  }
  for (var row = 0; row <= EDITOR_ROWS; row++) {
    ctx.beginPath();
    ctx.moveTo(EDITOR_GRID_X, EDITOR_GRID_Y + row * EDITOR_CELL);
    ctx.lineTo(EDITOR_GRID_X + EDITOR_COLS * EDITOR_CELL, EDITOR_GRID_Y + row * EDITOR_CELL);
    ctx.stroke();
  }

  if (editorLevel) {
    editorLevel.cells.forEach(function(id, index) {
      var item = getEditorPaletteItemById(id);
      if (!item) return;
      var cellX = EDITOR_GRID_X + (index % EDITOR_COLS) * EDITOR_CELL;
      var cellY = EDITOR_GRID_Y + Math.floor(index / EDITOR_COLS) * EDITOR_CELL;
      ctx.fillStyle = item.color;
      if (item.kind === "spike") {
        ctx.beginPath();
        ctx.moveTo(cellX + 5, cellY + EDITOR_CELL - 5);
        ctx.lineTo(cellX + EDITOR_CELL / 2, cellY + 5);
        ctx.lineTo(cellX + EDITOR_CELL - 5, cellY + EDITOR_CELL - 5);
        ctx.closePath();
        ctx.fill();
      } else if (item.kind === "enemy") {
        ctx.beginPath();
        ctx.arc(cellX + EDITOR_CELL / 2, cellY + EDITOR_CELL / 2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillRect(cellX + 11, cellY + 12, 3, 3);
        ctx.fillRect(cellX + 18, cellY + 12, 3, 3);
      } else if (item.kind === "start") {
        ctx.beginPath();
        ctx.moveTo(cellX + 8, cellY + 26);
        ctx.lineTo(cellX + 16, cellY + 6);
        ctx.lineTo(cellX + 24, cellY + 26);
        ctx.closePath();
        ctx.fill();
      } else if (item.kind === "goal") {
        ctx.beginPath();
        if (item.id === "door") {
          ctx.fillRect(cellX + 6, cellY + 4, 20, 28);
          ctx.fillStyle = "#211";
          ctx.fillRect(cellX + 21, cellY + 18, 3, 3);
        } else {
          ctx.moveTo(cellX + 16, cellY + 5);
          ctx.lineTo(cellX + 27, cellY + 16);
          ctx.lineTo(cellX + 16, cellY + 27);
          ctx.lineTo(cellX + 5, cellY + 16);
          ctx.closePath();
          ctx.fill();
        }
      } else if (item.id === "platform_small") {
        ctx.fillRect(cellX + 6, cellY + 9, EDITOR_CELL - 12, 12);
      } else {
        ctx.fillRect(cellX + 3, cellY + 5, EDITOR_CELL - 6, EDITOR_CELL - 10);
      }
    });
  }

  ctx.fillStyle = "rgba(7,12,25,0.98)";
  ctx.fillRect(EDITOR_PANEL_X, 12, canvas.width - EDITOR_PANEL_X - 12, canvas.height - 24);
  ctx.strokeStyle = "#43516f";
  ctx.strokeRect(EDITOR_PANEL_X, 12, canvas.width - EDITOR_PANEL_X - 12, canvas.height - 24);
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 13px monospace";
  ctx.textAlign = "center";
  ctx.fillText("🎒 MOCHILA", EDITOR_PANEL_X + 82, 35);
  editorCategories.forEach(function(category, index) {
    var tabX = EDITOR_PANEL_X + 6, tabY = EDITOR_GRID_Y + index * 32;
    var selected = editorCategory === index;
    ctx.fillStyle = selected ? "rgba(108,204,204,0.22)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(tabX, tabY, 157, 28);
    ctx.strokeStyle = selected ? "#6cc" : "#333";
    ctx.strokeRect(tabX, tabY, 157, 28);
    ctx.fillStyle = selected ? "#6cc" : "#888";
    ctx.font = "bold 10px monospace";
    ctx.fillText(category, EDITOR_PANEL_X + 82, tabY + 19);
  });
  var paletteItems = editorPalette[editorCategory] || [];
  paletteItems.forEach(function(item, index) {
    var itemY = EDITOR_GRID_Y + 136 + index * 58;
    var selected = editorPaletteSelection === index;
    ctx.fillStyle = selected ? "rgba(255,215,0,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(EDITOR_PANEL_X + 6, itemY, 157, 50);
    ctx.strokeStyle = selected ? "#ffd700" : "#333";
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(EDITOR_PANEL_X + 6, itemY, 157, 50);
    ctx.fillStyle = item.color;
    ctx.fillRect(EDITOR_PANEL_X + 16, itemY + 13, 22, 22);
    ctx.fillStyle = selected ? "#fff" : "#aaa";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(item.label, EDITOR_PANEL_X + 46, itemY + 29);
  });
  ctx.textAlign = "center";
  ctx.fillStyle = "#888";
  ctx.font = "10px monospace";
  ctx.fillText("BORRAR: X / clic derecho", EDITOR_PANEL_X + 82, 420);
  ctx.fillText("GUARDAR: S", EDITOR_PANEL_X + 82, 437);
  ctx.fillStyle = editorMessage ? "#8f8" : "#555";
  ctx.fillText(editorMessage || "Nivel vacío listo", EDITOR_PANEL_X + 82, 470);
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText("Celdas: " + (editorLevel ? editorLevel.cells.filter(function(cell) { return !!cell; }).length : 0), 310, 495);
  ctx.fillText("PUERTA conecta con la siguiente sala", 310, 515);
  ctx.textAlign = "left";
}
function drawBossVictory() {
  var alpha = Math.min(0.86, 0.35 + Math.sin(Date.now() / 180) * 0.08);
  ctx.fillStyle = "rgba(4, 4, 18, " + alpha + ")";
  ctx.fillRect(70, 145, canvas.width - 140, 250);
  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 3;
  ctx.strokeRect(70, 145, canvas.width - 140, 250);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 30px monospace";
  ctx.fillText(translateText("JEFE DERROTADO"), canvas.width / 2, 190);
  ctx.fillStyle = "#fff"; ctx.font = "bold 15px monospace";
  ctx.fillText(translateText("Recompensa") + ": " + translateText(bossVictory.reward), canvas.width / 2, 235);
  ctx.fillStyle = "#7ff"; ctx.font = "bold 15px monospace";
  ctx.fillText(translateText("Habilidad nueva") + ": " + translateText(bossVictory.ability), canvas.width / 2, 275);
  ctx.fillStyle = "#8f8"; ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("Zona desbloqueada") + ": " + translateText(bossVictory.zone), canvas.width / 2, 315);
  ctx.fillStyle = "#bbb"; ctx.font = "12px monospace";
  ctx.fillText(translateText("Ataque especial") + " • " + translateText(bossVictory.ability), canvas.width / 2, 355);
  ctx.textAlign = "left";
}
function drawGame() {
  drawGameWorld();
  if (hitFlash > 0) {
    var alpha = hitFlash > 30 ? (60 - hitFlash) / 30 : hitFlash / 30;
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawIntro() {
    var t = introTimer / 60;
    var phase = t < 3 ? 0 : (t < 7 ? 1 : (t < 12 ? 2 : 3));
    var fade = Math.min(1, introTimer / 45, Math.max(0, (900 - introTimer) / 45));
    ctx.fillStyle = "#020208";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = fade;
    if (phase >= 1) {
      var sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, "#090d24");
      sky.addColorStop(1, "#27151b");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,90,35,0.25)";
      ctx.beginPath();
      ctx.arc(130, 390, 85 + Math.sin(introTimer / 12) * 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0b0b16";
      ctx.beginPath();
      ctx.moveTo(0, 470); ctx.lineTo(150, 315); ctx.lineTo(260, 470);
      ctx.lineTo(410, 290); ctx.lineTo(610, 470); ctx.lineTo(800, 330); ctx.lineTo(800, 600); ctx.lineTo(0, 600);
      ctx.closePath(); ctx.fill();
      for (var fire = 0; fire < 6; fire++) {
        ctx.fillStyle = "#ff7038";
        ctx.fillRect(90 + fire * 118, 430 - (fire % 2) * 18, 5, 18 + (fire % 3) * 7);
      }
    }
    if (phase >= 2) {
      var zoom = 1 + Math.max(0, Math.min(1, (t - 7) / 5)) * 0.12;
      ctx.translate(400, 420);
      ctx.scale(zoom, zoom);
      ctx.fillStyle = "#090b16";
      ctx.fillRect(-30, -125, 60, 125);
      ctx.beginPath();
      ctx.arc(0, -145, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6cc";
      ctx.fillRect(-18, -154, 8, 4); ctx.fillRect(10, -154, 8, 4);
      ctx.strokeStyle = "#d5b66a";
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(24, -105); ctx.lineTo(92, -205); ctx.stroke();
      ctx.fillStyle = "rgba(108,204,204,0.15)";
      ctx.beginPath(); ctx.arc(0, -90, 115, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else {
      ctx.restore();
    }
    if (phase === 3 && introTimer % 90 < 18) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "#f2ead7";
    ctx.font = "bold 22px monospace";
    if (phase === 0) ctx.fillText("Durante siglos, el reino permaneció en paz…", 400, 310);
    else if (phase === 1) ctx.fillText("Hasta que algo despertó.", 400, 310);
    else if (phase === 2) ctx.fillText("Y ahora… te toca enfrentarlo.", 400, 250);
    else {
      ctx.fillStyle = "#ffd36a";
      ctx.font = "bold 30px monospace";
      ctx.fillText("⚔ CABALLERO", 400, 250);
      ctx.fillText("MÍSTICO", 400, 292);
      ctx.fillStyle = "#fff";
      ctx.font = "16px monospace";
      ctx.fillText("El destino comienza aquí.", 400, 340);
    }
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "11px monospace";
    ctx.fillText("ENTER / ESPACIO para omitir", 400, 560);
    ctx.textAlign = "left";
  }
  var barX = canvas.width - 20 - (player.maxHp * 15);
  if (barX < 200) barX = 200;
  drawHpBar(player, barX, 14);
  if (twoPlayerMode) drawHpBar(player2, barX, 30);

  if (heartFragments1 > 0 || heartFragments2 > 0) {
    ctx.fillStyle = "#f44"; ctx.font = "bold 12px monospace";
    var fragText = "❤️ J1:" + heartFragments1 + "/3";
    if (twoPlayerMode) fragText += "  J2:" + heartFragments2 + "/3";
    ctx.fillText(fragText, barX, twoPlayerMode ? 50 : 28);
  }
  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";
  ctx.fillText(hasSword ? "⚔️ " + translateText("Espada") : "🛡️ " + translateText("Sin arma"), 12, 22);
  if (gameMode === "infinite") {
    ctx.fillStyle = "#ff9b3d"; ctx.font = "bold 13px monospace";
    ctx.fillText("COLISEO INFINITO  •  RONDA " + infiniteWave + "  •  PODER " + (swordLevel + (hasDash ? 1 : 0) + (hasDoubleJump ? 1 : 0) + (hasBow ? 1 : 0)), 12, canvas.height - 18);
  }
  if (hasSword) { ctx.fillStyle = player.swordCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("⚔️ J1: " + (player.swordCooldown <= 0 ? (player.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 42); }
  else { ctx.fillStyle = "#555"; ctx.fillText(translateText("Encuentra la espada..."), 12, 42); }
  if (hasBow) { ctx.fillStyle = player.bowCooldown <= 0 ? "#ffd700" : "#444"; ctx.fillText("🏹 " + translateText("Arco") + ": " + (player.bowCooldown <= 0 ? translateText("Listo") : "···"), 12, 62); }
  if (bombs > 0) { ctx.fillStyle = "#ff7138"; ctx.fillText("💣 Bombas: " + bombs + " (B)", 12, hasBow ? 82 : 62); }
  if (hasDash) {
    ctx.fillStyle = player.dashCooldown <= 0 ? "#7af" : "#446";
    ctx.fillText("↯ " + translateText("Dash") + ": " + (player.dashCooldown <= 0 ? translateText("Listo") : "···"), 12, twoPlayerMode ? 76 : (hasBow ? 82 : 62));
  }
  if (twoPlayerMode && hasSword) {
    ctx.fillStyle = player2.swordCooldown <= 0 ? "#f0f" : "#444"; ctx.fillText("⚔️ J2: " + (player2.swordCooldown <= 0 ? (player2.swordSheathed ? "🔒" : "⚔️") : "···"), 12, 58);
  }
  if (hasSword) { ctx.fillStyle = "#ffd700"; ctx.font = "16px monospace"; ctx.fillText("🗡️", canvas.width - 28, 72); }
  if (hasMap) {
    ctx.textAlign = "right"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 13px monospace";
    ctx.fillText("🗺️ " + translateText("Mapa"), canvas.width - 20, twoPlayerMode ? 74 : 42);
    ctx.textAlign = "left";
  }
  if (hasAzariCharm) {
    ctx.textAlign = "right"; ctx.fillStyle = "#0ff"; ctx.font = "bold 12px monospace";
    ctx.fillText("💎 " + translateText("Bendición codiciosa"), canvas.width - 20, twoPlayerMode ? 90 : 58);
    ctx.textAlign = "left";
  }
  if (bossAbilities.guardian) {
    ctx.textAlign = "right";
    ctx.fillStyle = player.guardTimer > 0 ? "#9de8ff" : (player.guardCooldown > 0 ? "#667" : "#9de8ff");
    ctx.font = "bold 11px monospace";
    var guardText = player.guardTimer > 0
      ? translateText("Guardia") + ": " + Math.ceil(player.guardTimer / 60) + "s"
      : (player.guardCooldown > 0 ? translateText("Recarga") + ": " + Math.ceil(player.guardCooldown / 60) + "s" : translateText("Guardia lista"));
    ctx.fillText("🪨 " + guardText, canvas.width - 20, twoPlayerMode ? 106 : 76);
    ctx.textAlign = "left";
  }
  if (zoneNameTimer > 0) {
    ctx.globalAlpha = Math.min(1, zoneNameTimer/30);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center";
    ctx.fillText(zoneName, canvas.width/2, 50);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }
  var activeBoss = null;
  enemies.forEach(function(e) { if (e.boss && e.room === currentRoom && !e.dead) activeBoss = e; });
  if (activeBoss && bossIntroTimer <= 0) {
    ctx.textAlign = "center";
    var displayName = bossDiaryInfo[activeBoss.type] ? bossDiaryInfo[activeBoss.type].name : activeBoss.bossName;
    ctx.fillStyle = activeBoss.phase === 3 ? "#ff315a" : "#ffd36a";
    ctx.font = "bold 15px monospace";
    ctx.fillText(translateText(displayName) + "  " + activeBoss.hp + "/" + activeBoss.maxHp, canvas.width / 2, 116);
    ctx.fillStyle = "#180d16"; ctx.fillRect(120, 124, canvas.width - 240, 22);
    ctx.strokeStyle = "#ffd36a"; ctx.lineWidth = 2; ctx.strokeRect(120, 124, canvas.width - 240, 22);
    ctx.fillStyle = activeBoss.phase === 3 ? "#ff315a" : (activeBoss.phase === 2 ? "#ff9b3d" : "#d66");
    ctx.fillRect(124, 128, (canvas.width - 248) * Math.max(0, activeBoss.hp / activeBoss.maxHp), 14);
    ctx.fillStyle = "#fff"; ctx.font = "bold 11px monospace";
    ctx.fillText(translateText("FASE") + " " + (activeBoss.phase || 1), canvas.width / 2, 162);
    ctx.textAlign = "left";
  }
  if (bossVictory.active) drawBossVictory();
  if (discoveryNotify.active) {
    var alpha = Math.min(1, discoveryNotify.timer / 40);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
    ctx.fillText("⚔️ " + translateText("Nueva criatura descubierta!"), canvas.width/2, 80);
    ctx.fillStyle = "#f88"; ctx.font = "bold 14px monospace";
    ctx.fillText(discoveryNotify.name, canvas.width/2, 105);
    ctx.textAlign = "left"; ctx.globalAlpha = 1;
  }

  ctx.textAlign = "right"; ctx.fillStyle = "#0ff"; ctx.font = "bold 13px monospace";
  ctx.fillText("💠 " + azari, canvas.width - 20, 98);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(100,200,255,0.3)";
  ctx.font = "12px monospace";
  ctx.textAlign = "right";
  ctx.fillText("` = " + translateText("Inventario"), canvas.width - 10, canvas.height - 20);
  ctx.textAlign = "left";
  if (adminMode) {
    ctx.fillStyle = "#f66";
    ctx.font = "bold 11px monospace";
    ctx.fillText("ADMIN", 12, canvas.height - 38);
  }
  if (achievementNotify.active) {
    var achievementAlpha = Math.min(1, achievementNotify.timer / 30);
    ctx.save();
    ctx.globalAlpha = achievementAlpha;
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(24, 18, 8, 0.94)";
    ctx.fillRect(canvas.width - 285, canvas.height - 105, 265, 66);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width - 285, canvas.height - 105, 265, 66);
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 12px monospace";
    ctx.fillText("🏆 " + translateText("LOGRO DESBLOQUEADO"), canvas.width - 32, canvas.height - 80);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px monospace";
    ctx.fillText(translateText(achievementNotify.title), canvas.width - 32, canvas.height - 55);
    ctx.restore();
    ctx.textAlign = "left";
  }
  if (adminConsoleOpen) drawAdminConsole();
  drawTutorial();
}
function drawIntro() {
 var t = introTimer / 60;
 var phase = t < 3 ? 0 : (t < 7 ? 1 : (t < 12 ? 2 : 3));
 ctx.fillStyle = phase === 0 ? "#020208" : "#0b1024";
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 if (phase >= 1) {
   ctx.fillStyle = "rgba(255,80,30,0.25)";
   ctx.beginPath(); ctx.arc(130, 400, 95 + Math.sin(introTimer / 12) * 8, 0, Math.PI * 2); ctx.fill();
   ctx.fillStyle = "#070914";
   ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(180, 300); ctx.lineTo(320, 470); ctx.lineTo(500, 280); ctx.lineTo(800, 460); ctx.lineTo(800, 600); ctx.lineTo(0, 600); ctx.closePath(); ctx.fill();
   ctx.fillStyle = "#ff7138";
   for (var i = 0; i < 6; i++) ctx.fillRect(90 + i * 120, 430 - (i % 2) * 18, 5, 24);
 }
 if (phase >= 2) {
   ctx.save();
   ctx.translate(400, 430);
   ctx.fillStyle = "#080b16"; ctx.fillRect(-30, -125, 60, 125);
   ctx.beginPath(); ctx.arc(0, -145, 28, 0, Math.PI * 2); ctx.fill();
   ctx.fillStyle = "#6cc"; ctx.fillRect(-18, -154, 8, 4); ctx.fillRect(10, -154, 8, 4);
   ctx.strokeStyle = "#d5b66a"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(24, -105); ctx.lineTo(92, -205); ctx.stroke();
   ctx.restore();
 }
 if (phase === 3 && introTimer % 90 < 18) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
 ctx.textAlign = "center"; ctx.fillStyle = "#f2ead7"; ctx.font = "bold 22px monospace";
 if (phase === 0) ctx.fillText("Durante siglos, el reino permaneció en paz…", 400, 310);
 else if (phase === 1) ctx.fillText("Hasta que algo despertó.", 400, 310);
 else if (phase === 2) ctx.fillText("Y ahora… te toca enfrentarlo.", 400, 250);
 else { ctx.fillStyle = "#ffd36a"; ctx.font = "bold 34px monospace"; ctx.fillText("⚔ CABALLERO MÍSTICO", 400, 270); ctx.fillStyle = "#fff"; ctx.font = "16px monospace"; ctx.fillText("El destino comienza aquí.", 400, 315); }
 ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "11px monospace"; ctx.fillText("ENTER / ESPACIO para omitir", 400, 560);
 ctx.textAlign = "left";
}
function drawDeathScreen() {
  drawGameWorld();
  ctx.fillStyle = "rgba(2, 2, 10, 0.86)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ff526f";
  ctx.font = "bold 34px monospace";
  ctx.fillText("HAS MUERTO", canvas.width / 2, 170);
  ctx.fillStyle = "#ddd";
  ctx.font = "14px monospace";
  ctx.fillText("Tres derrotas: elige cómo continuar.", canvas.width / 2, 215);
  var deathOptions = ["Volver al último punto de guardado", "💀 " + (adRewardedRevive ? "Revivir ahora" : "Ver anuncio para revivir"), "Ir al menú principal"];
  deathOptions.forEach(function(option, index) {
    var y = 300 + index * 54;
    ctx.fillStyle = deathChoice === index ? "rgba(100, 220, 200, 0.2)" : "rgba(0,0,0,0.25)";
    ctx.fillRect(145, y - 28, canvas.width - 290, 40);
    ctx.strokeStyle = deathChoice === index ? "#6cc" : "#444";
    ctx.strokeRect(145, y - 28, canvas.width - 290, 40);
    ctx.fillStyle = deathChoice === index ? "#6cc" : "#aaa";
    ctx.font = "bold 14px monospace";
    ctx.fillText((deathChoice === index ? "▶ " : "") + option, canvas.width / 2, y - 3);
  });
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("↑/↓ elegir • ENTER confirmar", canvas.width / 2, 440 + (deathOptions.length - 2) * 54);
  ctx.textAlign = "left";
}
function drawTutorial() {
  if (gameState !== ST_PLAYING || tutorialTimer <= 0 || tutorialStep >= 6) return;
  var messages = [
    "A/D: moverte",
    "ESPACIO: saltar",
    "E: interactuar y recoger objetos",
    "X/J: atacar con la espada",
    "Z: disparar con el arco",
    "C: usar tus habilidades"
  ];
  ctx.fillStyle = "rgba(4, 8, 20, 0.82)";
  ctx.fillRect(18, 78, 330, 42);
  ctx.strokeStyle = "#6cc";
  ctx.strokeRect(18, 78, 330, 42);
  ctx.fillStyle = "#d5def5";
  ctx.font = "bold 13px monospace";
  ctx.fillText("TUTORIAL  •  " + messages[tutorialStep], 30, 103);
}
function drawAdminConsole() {
  ctx.fillStyle = "rgba(3, 5, 12, 0.94)";
  ctx.fillRect(45, canvas.height - 255, canvas.width - 90, 215);
  ctx.strokeStyle = "#f66";
  ctx.lineWidth = 2;
  ctx.strokeRect(45, canvas.height - 255, canvas.width - 90, 215);
  ctx.textAlign = "left";
  ctx.fillStyle = "#f66";
  ctx.font = "bold 14px monospace";
  ctx.fillText(translateText("CONSOLA ADMIN  •  COMANDOS DISPONIBLES"), 65, canvas.height - 228);
  ctx.fillStyle = "#d5def5";
  ctx.font = "11px monospace";
  ctx.fillText("/give azari [cantidad]", 65, canvas.height - 202);
  ctx.fillText("/give espada", 65, canvas.height - 184);
  ctx.fillText("/give arco", 65, canvas.height - 166);
  ctx.fillText("/give mapa", 65, canvas.height - 148);
  ctx.fillText("/give flechas [cantidad]", 65, canvas.height - 130);
  ctx.fillText("/give vida", 65, canvas.height - 112);
  ctx.fillText("/give dash", 65, canvas.height - 94);
  ctx.fillText("/give linterna [nivel]  |  /give luz infinito", 65, canvas.height - 76);
  ctx.fillText("/give ds  |  /give qds", 65, canvas.height - 58);
  ctx.fillText("/tp habitacion [1-23]", 330, canvas.height - 202);
  ctx.fillText(translateText("Ejemplo: /give azari 1000"), 330, canvas.height - 184);
  ctx.fillText(translateText("Ejemplo: /tp habitacion 5"), 330, canvas.height - 166);
  ctx.fillStyle = "#fff";
  ctx.font = "14px monospace";
  ctx.fillText("> " + adminCommand + "_", 65, canvas.height - 78);
  ctx.fillStyle = "#fff";
  ctx.fillStyle = "#aaa";
  ctx.font = "11px monospace";
  ctx.fillText(adminCommandMessage || translateText("ENTER ejecutar  •  ESC cerrar"), 65, canvas.height - 55);
  ctx.textAlign = "left";
}
function drawMenu() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i * 137) % 800, sy = (i * 89) % 600;
    ctx.globalAlpha = 0.08 + Math.sin(Date.now()/1000 + i) * 0.06;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#6cc"; ctx.font = "bold 36px monospace"; ctx.textAlign = "center";
  ctx.fillText(translateText("⚔️ CABALLERO MÍSTICO"), canvas.width/2, 80);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION, canvas.width/2, 105);
  ctx.fillStyle = "#666"; ctx.font = "14px monospace";
  ctx.fillText(translateText("Selecciona una ranura"), canvas.width/2, 135);

  var saves = getSaves();
  for (var i = 0; i < 5; i++) {
    var y = 155 + i * 63, isSel = (i === menuSelection), slot = saves.slots[i];
    ctx.fillStyle = isSel ? "rgba(100, 200, 255, 0.12)" : "rgba(255,255,255,0.02)";
    ctx.fillRect(180, y, 440, 54);
    ctx.strokeStyle = isSel ? "#6cc" : "#2a2a3a"; ctx.lineWidth = isSel ? 2 : 1;
    ctx.strokeRect(180, y, 440, 54);
    ctx.textAlign = "left"; ctx.font = "bold 16px monospace"; ctx.fillStyle = isSel ? "#6cc" : "#888";
    ctx.fillText(translateText("RANURA") + " " + (i+1), 200, y+22);
    ctx.font = "12px monospace";
    if (slot) {
      ctx.fillStyle = "#8f8"; ctx.fillText("🗂️  " + translateText("Guardado") + " — " + fmtDate(slot.timestamp), 200, y+36);
      ctx.fillStyle = "#0ff"; ctx.fillText("💠 " + (slot.azari || 0) + " Azari" + (slot.hasMap ? "  🗺️ Mapa" : "") + "  ❤️ " + (slot.hp || "?") + "/" + (slot.maxHp || "?") + "  " + (slot.difficulty || "normal").toUpperCase(), 200, y+52);
      var playTime = slot.stats ? slot.stats.playTime || 0 : 0;
      ctx.fillStyle = "#ffd700"; ctx.fillText("⏱️ " + formatTime(playTime), 430, y+52);
      ctx.fillStyle = "#555"; ctx.textAlign = "right"; ctx.fillText("[DEL/X] " + translateText("Borrar"), 600, y+40);
    } else {
      ctx.fillStyle = "#444"; ctx.fillText(translateText("Vacía") + " — ENTER " + translateText("para nueva partida"), 200, y+40);
    }
    if (isSel) { ctx.fillStyle = "#6cc"; ctx.fillText("▶", 165, y+30); }
  }
  var levelsY = 490, levelsSelected = menuSelection === 5;
  ctx.fillStyle = levelsSelected ? "rgba(100,200,255,0.15)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, levelsY - 20, 440, 30);
  ctx.strokeStyle = levelsSelected ? "#6cc" : "#333"; ctx.lineWidth = levelsSelected ? 2 : 1;
  ctx.strokeRect(180, levelsY - 20, 440, 30);
  ctx.fillStyle = levelsSelected ? "#6cc" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((levelsSelected ? "▶  " : "    ") + "NIVELES", canvas.width/2, levelsY);

  var settingsY = 530, settingsSelected = menuSelection === 6;
  ctx.fillStyle = settingsSelected ? "rgba(100,200,255,0.15)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, settingsY - 20, 440, 32);
  ctx.strokeStyle = settingsSelected ? "#6cc" : "#333"; ctx.lineWidth = settingsSelected ? 2 : 1;
  ctx.strokeRect(180, settingsY - 20, 440, 32);
  ctx.fillStyle = settingsSelected ? "#6cc" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((settingsSelected ? "▶  " : "    ") + translateText("⚙️ Configuración"), canvas.width/2, settingsY);

  var adminY = 570, adminSelected = menuSelection === 7;
  ctx.fillStyle = adminSelected ? "rgba(255,80,80,0.18)" : "rgba(255,255,255,0.02)";
  ctx.fillRect(180, adminY - 20, 440, 32);
  ctx.strokeStyle = adminSelected ? "#f66" : "#333"; ctx.lineWidth = adminSelected ? 2 : 1;
  ctx.strokeRect(180, adminY - 20, 440, 32);
  ctx.fillStyle = adminSelected ? "#f66" : "#888"; ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.fillText((adminSelected ? "▶  " : "    ") + translateText("Panel del admin"), canvas.width/2, adminY);
  ctx.textAlign = "center"; ctx.fillStyle = "#333"; ctx.font = "12px monospace";
  ctx.fillText(gamepadConnected ? "⬆️⬇️ Navegar  •  ❌ Seleccionar  •  ⬜ Borrar" : "↑/↓ Navegar  •  ENTER Seleccionar  •  DEL/X Borrar", canvas.width/2, 598);

  if (menuSubState === "confirm_delete") {
    ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f44"; ctx.font = "bold 20px monospace";
    ctx.fillText(translateText("¿BORRAR RANURA") + " " + (slotToDelete+1) + "?", canvas.width/2, 250);
    ctx.fillStyle = "#888"; ctx.font = "16px monospace";
    ctx.fillText(translateText("Esta acción no se puede deshacer"), canvas.width/2, 285);
    ctx.fillStyle = "#0f0"; ctx.fillText("[Y / S] " + translateText("Confirmar"), canvas.width/2, 330);
    ctx.fillStyle = "#f44"; ctx.fillText("[N / ESC] " + translateText("Cancelar"), canvas.width/2, 360);
  }
  if (menuSubState === "levels") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 26px monospace";
    ctx.fillText("NIVELES", canvas.width/2, 170);
    var customLevels = getCustomLevels();
    var levelOptions = ["CARGAR NIVEL", "CREAR NIVEL"];
    levelOptions.forEach(function(option, index) {
      var optionY = 250 + index * 75, selected = levelsSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, optionY - 27, 440, 54);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, optionY - 27, 440, 54);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option, canvas.width/2, optionY);
    });
    ctx.fillStyle = customLevels.length ? "#8f8" : "#666";
    ctx.font = "12px monospace";
    ctx.fillText(customLevels.length ? "NIVEL PERSONALIZADO GUARDADO" : "NO HAY NIVELES GUARDADOS", canvas.width/2, 410);
    ctx.fillStyle = "#666";
    ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar  •  ESC Volver", canvas.width/2, 500);
  }
  if (menuSubState === "admin_password") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f66"; ctx.font = "bold 24px monospace";
    ctx.fillText(translateText("Panel del admin"), canvas.width/2, 220);
    ctx.fillStyle = "#aaa"; ctx.font = "14px monospace";
    ctx.fillText(translateText("Introduce la contraseña"), canvas.width/2, 265);
    ctx.fillStyle = "#fff"; ctx.font = "bold 24px monospace";
    ctx.fillText("*".repeat(adminPassword.length), canvas.width/2, 315);
    ctx.fillStyle = adminMessage ? "#f66" : "#666"; ctx.font = "12px monospace";
    ctx.fillText(adminMessage || translateText("ENTER confirmar  •  ESC cancelar"), canvas.width/2, 370);
  }
  if (menuSubState === "mode") {
    ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 25px monospace";
    ctx.fillText("ELIGE EL MODO DE JUEGO", canvas.width / 2, 150);
    modeOptions.forEach(function(option, index) {
      var y = 250 + index * 85, selected = modeSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(150, y - 28, 500, 58);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.strokeRect(150, y - 28, 500, 58);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option.name, canvas.width / 2, y);
      ctx.fillStyle = "#888"; ctx.font = "11px monospace"; ctx.fillText(option.desc, canvas.width / 2, y + 21);
    });
    ctx.fillStyle = "#666"; ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar  •  ESC Volver", canvas.width / 2, 480);
  }
  if (menuSubState === "difficulty") {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 25px monospace";
    ctx.fillText(translateText("ELIGE LA DIFICULTAD"), canvas.width / 2, 150);
    ctx.fillStyle = "#888";
    ctx.font = "13px monospace";
    ctx.fillText(translateText("Esta opción se guardará con la nueva partida"), canvas.width / 2, 180);
    difficultyOptions.forEach(function(option, index) {
      var y = 240 + index * 70, selected = difficultySelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 25, 440, 52);
      ctx.strokeStyle = selected ? "#6cc" : "#333";
      ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 25, 440, 52);
      ctx.fillStyle = selected ? "#6cc" : "#aaa";
      ctx.font = "bold 17px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + translateText(option.name), canvas.width / 2, y);
      ctx.fillStyle = "#888";
      ctx.font = "11px monospace";
      ctx.fillText(translateText(option.desc), canvas.width / 2, y + 20);
    });
    ctx.fillStyle = "#666";
    ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  1/2/3 Elegir  •  ENTER Confirmar  •  ESC Volver", canvas.width / 2, 500);
  }
  if (menuSubState === "settings") {
    ctx.fillStyle = "rgba(0,0,0,0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 26px monospace";
    ctx.fillText("⚙️ CONFIGURACIÓN", canvas.width / 2, 150);
    var settings = [
      "🌐 " + translateText("Idioma") + ": " + languages[languageSelection].label,
      "🎮 " + translateText("Dispositivo") + ": " + translateText(devices[deviceSelection].label),
      "☀️ Brillo: " + Math.round(brightnessBoost * 100) + "%",
      "🎮 Cambiar controles",
      "🔐 " + translateText(adminMode ? "Admin activado" : "Activar modo admin")
    ];
    settings.forEach(function(option, index) {
      var y = 230 + index * 65, selected = settingsSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 25, 440, 48);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 25, 440, 48);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 15px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option, canvas.width / 2, y + 5);
    });
    ctx.fillStyle = "#666"; ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  ←/→ Ajustar brillo  •  ENTER Seleccionar  •  ESC Volver", canvas.width / 2, 505);
  }
  if (menuSubState === "controls_config") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd700"; ctx.font = "bold 25px monospace";
    ctx.fillText("🎮 CAMBIAR CONTROLES", canvas.width / 2, 85);
    ctx.fillStyle = "#888"; ctx.font = "12px monospace";
    ctx.fillText("Selecciona una acción y pulsa ENTER; después presiona la nueva tecla", canvas.width / 2, 115);
    controlActions.forEach(function(action, index) {
      var y = 155 + index * 40, selected = controlsConfigSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(135, y - 22, 530, 32);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.strokeRect(135, y - 22, 530, 32);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 13px monospace";
      ctx.fillText((selected ? "▶ " : "  ") + action.label, 155, y);
      ctx.fillStyle = "#f3d36a";
      ctx.fillText(action.key === " " ? "ESPACIO" : action.key.toUpperCase(), 500, y);
      ctx.fillStyle = "#8bd";
      ctx.fillText("PSP: botón " + action.pad, 590, y);
    });
    ctx.fillStyle = controlsConfigListening ? "#ffd700" : "#666"; ctx.font = "12px monospace";
    ctx.fillText(controlsConfigListening ? "PULSA LA NUEVA TECLA..." : "↑/↓ Elegir  •  ENTER Cambiar  •  ESC Volver", canvas.width / 2, 510);
  }
  ctx.textAlign = "left";
}
function drawLanguageSelect() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (var i = 0; i < 60; i++) {
    var sx = (i * 137) % 800, sy = (i * 89) % 600;
    ctx.globalAlpha = 0.08 + Math.sin(Date.now()/1000 + i) * 0.06;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 32px monospace";
  ctx.fillText("⚔️ CABALLERO MÍSTICO", canvas.width/2, 125);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace";
  ctx.fillText("ELIGE TU IDIOMA", canvas.width/2, 205);
  ctx.fillStyle = "#888"; ctx.font = "13px monospace";
  ctx.fillText("Choose your language  •  Escolha seu idioma", canvas.width/2, 232);
  for (var i = 0; i < languages.length; i++) {
    var y = 285 + i * 58, isSelected = i === languageSelection;
    ctx.fillStyle = isSelected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(250, y - 22, 300, 42);
    ctx.strokeStyle = isSelected ? "#6cc" : "#333"; ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeRect(250, y - 22, 300, 42);
    ctx.fillStyle = isSelected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
    ctx.fillText((isSelected ? "▶  " : "    ") + languages[i].label, canvas.width/2, y + 6);
  }
  ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar", canvas.width/2, 520);
  ctx.textAlign = "left";
}
function drawDeviceSelect() {
  ctx.fillStyle = "#050510"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 30px monospace";
  ctx.fillText(translateText("CABALLERO MÍSTICO"), canvas.width/2, 125);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 20px monospace";
  ctx.fillText(translateText(device === "pc" ? "ELIGE TU DISPOSITIVO" : "ELIGE TU FORMA DE JUGAR"), canvas.width/2, 205);
  ctx.fillStyle = "#888"; ctx.font = "13px monospace";
  ctx.fillText("PC  •  Mobile / Tablet  •  Play Controller", canvas.width/2, 232);
  for (var i = 0; i < devices.length; i++) {
    var y = 285 + i * 58, isSelected = i === deviceSelection;
    ctx.fillStyle = isSelected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(220, y - 22, 360, 42);
    ctx.strokeStyle = isSelected ? "#6cc" : "#333"; ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeRect(220, y - 22, 360, 42);
    ctx.fillStyle = isSelected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
    ctx.fillText((isSelected ? "▶  " : "    ") + translateText(devices[i].label), canvas.width/2, y + 6);
  }
  ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Navegar  •  ENTER Confirmar", canvas.width/2, 520);
  ctx.textAlign = "left";
}
function drawPause() {
  if (pauseSubState === "diary") {
    drawDiary();
    return;
  }
  if (pauseSubState === "controls") {
    drawControls();
    return;
  }
  if (pauseSubState === "controls_keys") {
    drawControlBindings();
    return;
  }
  if (pauseSubState === "controls_touch") {
    drawTouchControlsEditor();
    return;
  }
  if (pauseSubState === "audio") {
    drawAudioMenu();
    return;
  }
  if (pauseSubState === "settings") {
    ctx.fillStyle = "rgba(0,0,0,0.94)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 26px monospace";
    ctx.fillText("⚙️ CONFIGURACIÓN", canvas.width / 2, 130);
    var pauseSettings = [
      "🌐 Idioma: " + languages[languageSelection].label,
      "🎮 Dispositivo: " + devices[deviceSelection].label,
      "☀️ Brillo: " + Math.round(brightnessBoost * 100) + "%",
      "🎮 Cambiar controles",
      "🔐 " + (adminMode ? "Admin activado" : "Activar modo admin")
    ];
    pauseSettings.forEach(function(option, index) {
      var y = 210 + index * 60, selected = settingsSelection === index;
      ctx.fillStyle = selected ? "rgba(100,200,255,0.16)" : "rgba(255,255,255,0.03)";
      ctx.fillRect(180, y - 23, 440, 46);
      ctx.strokeStyle = selected ? "#6cc" : "#333"; ctx.lineWidth = selected ? 2 : 1;
      ctx.strokeRect(180, y - 23, 440, 46);
      ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 15px monospace";
      ctx.fillText((selected ? "▶  " : "    ") + option, canvas.width / 2, y + 5);
    });
    ctx.fillStyle = "#666"; ctx.font = "12px monospace";
    ctx.fillText("↑/↓ Navegar  •  ←/→ Ajustar brillo  •  ESC Volver", canvas.width / 2, 530);
    ctx.textAlign = "left";
    return;
  }
  ctx.fillStyle = "rgba(0,0,0,0.82)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.fillStyle = "#6cc"; ctx.font = "bold 32px monospace";
  ctx.fillText("⏸️  " + translateText("PAUSA"), canvas.width/2, 130);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText(VERSION + (twoPlayerMode ? "  •  👥 MODO 2P" : "  •  👤 MODO 1P"), canvas.width/2, 155);
  var opts = [
    "▶  " + translateText("Reanudar"), "📖  " + translateText("Ver Diario"),
    twoPlayerMode ? "👤  " + translateText("Quitar J2") : "👥  " + translateText("Agregar J2"),
    "🎮  " + translateText("Controles"), "🔊  " + translateText("MÚSICA Y SONIDO"), "⚙️  " + translateText("⚙️ Configuración"), "🚪  " + translateText("Salir al Menú")
  ];
  opts.push("💰  Ver anuncio • recompensa");
  for (var i = 0; i < opts.length; i++) {
    var y = 200 + i * 40;
    var isSel = (i === pauseSelection);
    ctx.fillStyle = isSel ? "rgba(100,200,255,0.15)" : "transparent";
    ctx.fillRect(250, y - 18, 300, 36);
    ctx.strokeStyle = isSel ? "#6cc" : "#333"; ctx.lineWidth = isSel ? 2 : 1;
    ctx.strokeRect(250, y - 18, 300, 36);
    ctx.fillStyle = isSel ? "#6cc" : "#aaa"; ctx.font = "bold 16px monospace";
    ctx.fillText(opts[i], canvas.width/2, y + 5);
  }
  ctx.fillStyle = "#444"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ " + translateText("Navegar") + "  •  ENTER " + translateText("Seleccionar") + "  •  ESC " + translateText("Volver"), canvas.width/2, 510);
  ctx.textAlign = "left";
}
function drawAudioMenu() {
  ctx.fillStyle = "rgba(0,0,0,0.9)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 28px monospace";
  ctx.fillText(translateText("MÚSICA Y SONIDO"), canvas.width/2, 130);
  ctx.fillStyle = "#aaa"; ctx.font = "15px monospace";
  var audioLabels = ["Volumen general: " + Math.round(masterVolume * 100) + "%", "Música: " + Math.round(musicVolume * 100) + "%", translateText("Efectos") + ": " + Math.round(sfxVolume * 100) + "%"];
  audioLabels.forEach(function(label, index) {
    ctx.fillStyle = audioSelection === index ? "#6cc" : "#aaa";
    ctx.fillText((audioSelection === index ? "▶ " : "") + label, canvas.width/2, 200 + index * 45);
  });
  ctx.fillStyle = "#6cc"; ctx.font = "13px monospace";
  ctx.fillText("↑/↓ Seleccionar  •  ←/→ Ajustar", canvas.width/2, 355);
  ctx.fillStyle = "#666";
  ctx.fillText(translateText("ESC para volver"), canvas.width/2, 410);
  ctx.textAlign = "left";
}
function drawDiary() {
  ctx.fillStyle = "rgba(5,5,16,0.95)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.fillStyle = "#ffd700"; ctx.font = "bold 28px monospace";
  ctx.fillText(translateText("📖 DIARIO DEL CABALLERO"), canvas.width/2, 60);
  ctx.fillStyle = "#446"; ctx.font = "12px monospace";
  ctx.fillText(translateText("Registro de criaturas y grandes enemigos"), canvas.width/2, 85);
  var tabs = [{ key: "enemies", label: "⚔️ " + translateText("ENEMIGOS") }, { key: "bosses", label: "👑 " + translateText("JEFES") }];
  tabs.forEach(function(tab, idx) {
    var tabX = idx === 0 ? 270 : 530;
    var active = diaryCategory === tab.key;
    ctx.fillStyle = active ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(tabX - 105, 98, 210, 32);
    ctx.strokeStyle = active ? "#6cc" : "#333";
    ctx.lineWidth = active ? 2 : 1;
    ctx.strokeRect(tabX - 105, 98, 210, 32);
    ctx.fillStyle = active ? "#6cc" : "#777";
    ctx.font = "bold 14px monospace";
    ctx.fillText(tab.label, tabX, 120);
  });
  var entries = diaryCategory === "enemies" ? Object.keys(bestiaryInfo) : ["guardian", "queen_larva", "abyssal_knight"];
  var startY = 145;
  ctx.save();
  ctx.beginPath(); ctx.rect(100, 135, 600, 415); ctx.clip();
  entries.forEach(function(key, idx) {
    var isBoss = diaryCategory === "bosses";
    var data = isBoss ? { discovered: !!bossArenaState[key], count: bossArenaState[key] ? 1 : 0 } : bestiary[key];
    var info = isBoss ? bossDiaryInfo[key] : bestiaryInfo[key], y = startY + (idx - diaryScroll) * 130;
    var discovered = data.discovered;
    ctx.fillStyle = discovered ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.02)";
    ctx.fillRect(120, y, 560, 115);
    ctx.strokeStyle = discovered ? "#ffd700" : "#333"; ctx.lineWidth = 2;
    ctx.strokeRect(120, y, 560, 115);
    ctx.textAlign = "left";
    if (discovered) {
      ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace";
      ctx.fillText("⚔️ " + info.name, 145, y + 26);
      ctx.fillStyle = "#0ff"; ctx.font = "bold 14px monospace";
      ctx.fillText(isBoss ? "Derrotado: ✓" : "Abatidos: " + data.count, 145, y + 48);
      ctx.fillStyle = "#aaa"; ctx.font = "12px monospace";
      var words = info.desc.split(' ');
      var line = "", lineY = y + 72;
      words.forEach(function(w) {
        if ((line + w).length > 55) { ctx.fillText(line, 145, lineY); line = w + " "; lineY += 16; }
        else line += w + " ";
      });
      if (line) ctx.fillText(line, 145, lineY);
    } else {
      ctx.fillStyle = "#444"; ctx.font = "bold 18px monospace";
      ctx.fillText("???", 145, y + 28);
      ctx.fillStyle = "#333"; ctx.font = "12px monospace";
      ctx.fillText("Criatura no descubierta.", 145, y + 55);
      ctx.fillStyle = "#222"; ctx.fillRect(520, y + 20, 120, 75);
      ctx.strokeStyle = "#333"; ctx.strokeRect(520, y + 20, 120, 75);
      ctx.fillStyle = "#333"; ctx.font = "20px monospace"; ctx.textAlign = "center";
      ctx.fillText("?", 580, y + 65); ctx.textAlign = "left";
    }
  });
  ctx.restore();
  ctx.textAlign = "center"; ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("A/D o ←/→ cambiar categoría  •  ESC para volver", canvas.width/2, 560);
  ctx.fillText(diaryScroll > 0 ? "↑ W / Flecha arriba" : "↓ S / Flecha abajo", canvas.width/2, 578);
  ctx.textAlign = "left";
}
function drawControls() {
  ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 28px monospace";
  ctx.fillText("🎮 CONTROLES", canvas.width / 2, 100);
  var options = ["CAMBIAR BOTONES", "MOVER BOTONES"];
  options.forEach(function(option, index) {
    var selected = controlsConfigSelection === index, y = 230 + index * 90;
    ctx.fillStyle = selected ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(200, y - 30, 400, 58);
    ctx.strokeStyle = selected ? "#6cc" : "#333";
    ctx.strokeRect(200, y - 30, 400, 58);
    ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 17px monospace";
    ctx.fillText((selected ? "▶ " : "  ") + option, canvas.width / 2, y + 6);
  });
  ctx.fillStyle = "#666"; ctx.font = "12px monospace";
  ctx.fillText("↑/↓ Elegir  •  ENTER Seleccionar  •  ESC Volver", canvas.width / 2, 475);
  ctx.textAlign = "left";
}

function drawControlBindings() {
  ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#6cc"; ctx.font = "bold 28px monospace";
  ctx.fillText("🎮  CONTROLES", canvas.width/2, 50);
  ctx.fillStyle = "#446"; ctx.font = "14px monospace";
  ctx.fillText("Selecciona una acción para cambiarla", canvas.width/2, 82);
  ctx.fillStyle = "#6cc"; ctx.font = "bold 17px monospace";
  ctx.fillText("PC", 220, 125);
  ctx.fillStyle = "#8bd"; ctx.fillText("PSP", 500, 125);
  ctx.fillStyle = "#8f8"; ctx.fillText("CELULAR / TABLET", 700, 125);
  ctx.strokeStyle = "#334"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(400, 105); ctx.lineTo(400, 430); ctx.moveTo(635, 105); ctx.lineTo(635, 430); ctx.stroke();
  var touchBindings = {
    moveLeft: "Joystick ←",
    moveRight: "Joystick →",
    jump: "⬆",
    attack: "⚔",
    shoot: "—",
    interact: "✦",
    block: "🛡",
    dash: "↯"
  };
  controlActions.forEach(function(action, index) {
    var y = 155 + index * 35, selected = index === controlsConfigSelection;
    ctx.fillStyle = selected ? "rgba(100,200,255,0.18)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(35, y - 21, 730, 29);
    ctx.strokeStyle = selected ? "#6cc" : "#333";
    ctx.strokeRect(35, y - 21, 730, 29);
    ctx.textAlign = "left";
    ctx.fillStyle = selected ? "#6cc" : "#aaa"; ctx.font = "bold 12px monospace";
    ctx.fillText((selected ? "▶ " : "  ") + action.label, 50, y);
    ctx.textAlign = "center";
    ctx.fillStyle = "#f3d36a";
    ctx.fillText(action.key === " " ? "ESPACIO" : action.key.toUpperCase(), 220, y);
    ctx.fillStyle = "#8bd";
    ctx.fillText("Botón " + action.pad, 500, y);
    ctx.fillStyle = "#8f8";
    ctx.fillText(touchBindings[action.id], 700, y);
  });
  ctx.fillStyle = controlsConfigListening ? "#ffd700" : "#8bd"; ctx.font = "12px monospace";
  ctx.fillText(controlsConfigListening ? "PULSA LA NUEVA TECLA O BOTÓN..." : "↑/↓ Elegir  •  ENTER Cambiar  •  ESC Volver", canvas.width/2, 475);
  ctx.textAlign = "left";
}

function drawTouchControlsEditor() {
  ctx.fillStyle = "rgba(0,0,0,0.92)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#8f8"; ctx.font = "bold 25px monospace";
  ctx.fillText("MOVER BOTONES CELULAR / TABLET", canvas.width / 2, 65);
  var labels = ["Joystick", "Cada botón táctil (arrástralo)", "Opacidad"];
  var values = [
    Math.round(touchLayout.joystick.x) + "% / " + Math.round(touchLayout.joystick.y) + "%",
    "incluye pausa",
    Math.round(touchLayout.opacity * 100) + "%"
  ];
  labels.forEach(function(label, index) {
    var y = 150 + index * 70, selected = touchEditSelection === index;
    ctx.fillStyle = selected ? "rgba(143,255,143,0.16)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(150, y - 28, 500, 52);
    ctx.strokeStyle = selected ? "#8f8" : "#333"; ctx.strokeRect(150, y - 28, 500, 52);
    ctx.fillStyle = selected ? "#8f8" : "#aaa"; ctx.font = "bold 15px monospace";
    ctx.fillText((selected ? "▶ " : "  ") + label + ": " + values[index], canvas.width / 2, y + 5);
  });
  ctx.fillStyle = "#8bd"; ctx.font = "12px monospace";
  ctx.fillText("Arrastra cada botón por separado; la pausa no cierra el editor", canvas.width / 2, 390);
  ctx.fillText("+/-: opacidad  •  ESC: guardar y volver", canvas.width / 2, 415);
  ctx.textAlign = "left";
}
function drawTransition() {
  if (transIsFall || transIsRise) {
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(100, 220, 255, 0.8)";
    for (var i = 0; i < 16; i++) {
      var streakY = (i * 47 + (155 - transTimer) * 8) % (canvas.height + 40) - 20;
      ctx.fillRect(canvas.width / 2 - 90 + (i % 5) * 45, streakY, 2, 24);
    }
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px monospace";
    ctx.textAlign = "center";
    ctx.fillText(transIsRise ? "↑" : "↓", canvas.width / 2, canvas.height / 2);
    ctx.font = "bold 13px monospace";
    ctx.fillText(transIsRise ? "SUBIENDO" : "DESCENDIENDO", canvas.width / 2, canvas.height / 2 + 34);
    ctx.textAlign = "left";
  } else {
    drawGameWorld();
  }
  ctx.fillStyle = "rgba(0, 0, 0, " + transFade + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (transPhase === "load") {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("CARGANDO", canvas.width/2, 30);
    ctx.textAlign = "left";
  } else if (transIsFall || transIsRise) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText(transIsRise ? "↑" : "↓", canvas.width / 2, canvas.height - 40);
    ctx.textAlign = "left";
  }
}
function drawShop() {
  if (shopAnim > 0) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#aaa";
    ctx.font = "bold 16px monospace";
    ctx.fillText(translateText("CARGANDO") + "...", canvas.width/2, canvas.height/2);
    ctx.fillStyle = "#6cc";
    ctx.font = "12px monospace";
    ctx.fillText(Math.ceil((shopAnim / 180) * 3) + "", canvas.width/2, canvas.height/2 + 28);
    ctx.textAlign = "left";
    return;
  }
  ctx.fillStyle = "#080818"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#151525";
  ctx.beginPath(); ctx.ellipse(canvas.width/2, 250, 330, 220, 0, Math.PI, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#25253a";
  ctx.fillRect(70, 250, canvas.width - 140, 310);
  ctx.fillStyle = "#30304a";
  ctx.fillRect(70, 250, canvas.width - 140, 8);
  ctx.fillStyle = "#3a3a4a";
  ctx.fillRect(70, 560, canvas.width - 140, 40);
  ctx.fillStyle = "#1a1a2a";
  ctx.fillRect(70, 560, canvas.width - 140, 5);
  for (var rock = 0; rock < 8; rock++) {
    var rx = 100 + rock * 83, ry = 300 + (rock % 3) * 42;
    ctx.fillStyle = rock % 2 ? "#45455c" : "#38384f";
    ctx.beginPath(); ctx.arc(rx, ry, 18 + (rock % 3) * 5, 0, Math.PI * 2); ctx.fill();
  }
  var vendorX = 680, vendorY = 445;
  ctx.fillStyle = "#8b4513"; ctx.fillRect(vendorX - 12, vendorY + 28, 24, 55);
  ctx.fillStyle = "#a0522d"; ctx.fillRect(vendorX - 12, vendorY + 28, 24, 6);
  ctx.fillStyle = "#ffd700"; ctx.fillRect(vendorX - 7, vendorY + 42, 4, 4); ctx.fillRect(vendorX + 3, vendorY + 42, 4, 4);
  ctx.fillStyle = "#d19a72"; ctx.beginPath(); ctx.arc(vendorX, vendorY + 15, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#332211"; ctx.fillRect(vendorX - 15, vendorY + 2, 30, 7);
  ctx.fillStyle = "#6c8fc7";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#d4af37";
  ctx.textAlign = "left";
  ctx.fillStyle = "#5a351d";
  ctx.fillRect(590, 500, 180, 32);
  ctx.fillStyle = "#8b542b";
  ctx.fillRect(590, 500, 180, 6);
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(620, 510, 12, 8); ctx.fillRect(655, 510, 12, 8); ctx.fillRect(705, 510, 12, 8);
  drawPlayerEntity(player);
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
  ctx.fillText("TIENDA UNIFICADA", canvas.width/2, 85);
  ctx.fillStyle = "#6cc"; ctx.font = "16px monospace";
  ctx.fillText("💠 Azari: " + azari, canvas.width/2, 120);
  ctx.fillStyle = "#553311"; ctx.fillRect(82, 500, 38, 60);
  ctx.fillStyle = "#ffd700"; ctx.fillRect(106, 532, 5, 5);
  ctx.fillStyle = "#aaa"; ctx.font = "12px monospace";
  ctx.fillText("E: salir", 101, 585);
  if (shopGreetingTimer > 0) {
    ctx.fillStyle = "rgba(5,5,15,0.92)";
    ctx.fillRect(250, 390, 400, 82);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.strokeRect(250, 390, 400, 82);
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 13px monospace";
    ctx.fillText("COMERCIANTE:", 270, 414);
    ctx.fillStyle = "#fff";
    ctx.font = "12px monospace";
    ctx.fillText(shopGreeting, 270, 442, 360);
    ctx.textAlign = "center";
  }
  if (!shopMenuOpen) {
    ctx.fillStyle = "#aaa"; ctx.font = "14px monospace";
    ctx.fillText("Acércate a cualquiera de los vendedores y pulsa E", canvas.width/2, 190);
    ctx.fillText("Pulsa E junto a la puerta para salir", canvas.width/2, 215);
    ctx.textAlign = "left";
    return;
  }
  var shopItems = [
    "Mapa", "Arco", "Flechas x20", "Fragmento de vida J1", "Fragmento de vida J2",
    "Amuleto", "Imán de Azari", "Bolsa de Azari", "Linterna", "Llave vieja",
    "Mejora de espada", "Mejora de arco", "Flecha pesada", "Golpe cargado",
    "Ataque aéreo", "Combo", "Bendición codiciosa", "Bombas x5", "Armadura (50 Azari)"
  ];
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffd700"; ctx.font = "bold 15px monospace";
  ctx.fillText("ARTÍCULOS", 110, 275);
  ctx.font = "11px monospace";
  for (var itemIndex = 0; itemIndex < shopItems.length; itemIndex++) {
    var itemY = 298 + itemIndex * 13;
    if (itemIndex === menuSelection) {
      ctx.fillStyle = "rgba(108,204,204,.25)";
      ctx.fillRect(100, itemY - 12, 360, 16);
    }
    ctx.fillStyle = itemIndex === menuSelection ? "#9de8ff" : "#aaa";
    ctx.fillText((itemIndex === menuSelection ? "▶ " : "  ") + shopItems[itemIndex], 110, itemY);
  }
  ctx.textAlign = "right";
  ctx.fillStyle = "#6cc"; ctx.fillText("Bombas: " + bombs, 730, 275);
  ctx.fillText("Armadura: " + (armorId === "plate" ? "comprada" : "no"), 730, 292);
  ctx.textAlign = "center";
  ctx.fillStyle = "#777"; ctx.fillText("↑/↓ elegir • ENTER comprar • ESC salir", canvas.width / 2, 575);
  ctx.textAlign = "left";
}
