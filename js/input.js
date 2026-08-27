window.addEventListener("keydown", function(e) {
  initAudio();
  var k = e.key.toLowerCase();
  var up = e.key === "ArrowUp" || e.code === "ArrowUp";
  var down = e.key === "ArrowDown" || e.code === "ArrowDown";
  var confirm = e.key === "Enter" || e.code === "Enter" || e.code === "NumpadEnter";

  if (k === "`") {
    if (gameState === ST_PLAYING) {
      inventoryOpen = !inventoryOpen;
      if (inventoryOpen) gameState = ST_INVENTORY;
      else gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_INVENTORY) {
      inventoryOpen = false;
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    }
  }

  if (e.key === "Escape") {
    if (gameState === ST_PLAYING) {
      gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause();
      e.preventDefault();
      return;
    } else if (gameState === ST_PAUSED) {
      if (pauseSubState === "diary") pauseSubState = "menu";
      else if (pauseSubState === "controls" || pauseSubState === "audio") pauseSubState = "menu";
      else gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_INVENTORY) {
      inventoryOpen = false;
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_MENU && menuSubState === "confirm_delete") {
      menuSubState = "slots"; slotToDelete = -1;
      e.preventDefault();
      return;
    } else if (shopOpen) {
      shopOpen = false; menuSelection = 0;
      e.preventDefault();
      return;
    }
  }

  if (gameState === ST_LANGUAGE) {
    if (up || k === "w") { languageSelection = (languageSelection - 1 + languages.length) % languages.length; e.preventDefault(); return; }
    if (down || k === "s") { languageSelection = (languageSelection + 1) % languages.length; e.preventDefault(); return; }
    if (confirm) {
      language = languages[languageSelection].code;
      gameState = ST_DEVICE;
      deviceSelection = 0;
      e.preventDefault();
      return;
    }
    return;
  }

  if (gameState === ST_DEVICE) {
    if (up || k === "w") { deviceSelection = (deviceSelection - 1 + devices.length) % devices.length; e.preventDefault(); return; }
    if (down || k === "s") { deviceSelection = (deviceSelection + 1) % devices.length; e.preventDefault(); return; }
    if (confirm) {
      device = devices[deviceSelection].code;
      if (device === "play") {
        scanGamepads();
        if (gamepadIndex >= 0) gamepadConnected = true;
      } else {
        gamepadConnected = false;
      }
      setupTouchControls();
      gameState = ST_MENU;
      menuSubState = "slots";
      e.preventDefault();
      return;
    }
    return;
  }

  if (gameState === ST_MENU) {
    if (menuSubState === "slots") {
      if (up || k === "w") { menuSelection = (menuSelection - 1 + 5) % 5; e.preventDefault(); return; }
      if (down || k === "s") { menuSelection = (menuSelection + 1) % 5; e.preventDefault(); return; }
      if (confirm) {
        activeSlot = menuSelection;
        var saves = getSaves();
        if (saves.slots[menuSelection]) {
          if (loadGame(menuSelection)) { gameState = ST_PLAYING; startMusic(); updateUI(); }
        } else {
          resetAll(); gameState = ST_PLAYING; startMusic(); updateUI();
        }
        e.preventDefault();
        return;
      }
      if (k === "delete" || k === "x") {
        if (getSaves().slots[menuSelection]) { menuSubState = "confirm_delete"; slotToDelete = menuSelection; }
        e.preventDefault();
        return;
      }
    } else if (menuSubState === "confirm_delete") {
      if (k === "y" || k === "s") { deleteSave(slotToDelete); menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
      if (k === "n" || e.key === "Escape") { menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
    }
    return;
  }

  if (gameState === ST_PAUSED) {
    if (pauseSubState === "diary") return;
    if (pauseSubState === "audio") {
      if (up || k === "w") { adjustMusicVolume(0.05); e.preventDefault(); return; }
      if (down || k === "s") { adjustMusicVolume(-0.05); e.preventDefault(); return; }
      if (e.key === "ArrowLeft") { adjustSfxVolume(-0.05); e.preventDefault(); return; }
      if (e.key === "ArrowRight") { adjustSfxVolume(0.05); e.preventDefault(); return; }
      return;
    }
    if (pauseSubState === "controls") { if (e.key === "Escape") { pauseSubState = "menu"; e.preventDefault(); } return; }
    if (up || k === "w") { pauseSelection = (pauseSelection - 1 + 6) % 6; e.preventDefault(); return; }
    if (down || k === "s") { pauseSelection = (pauseSelection + 1) % 6; e.preventDefault(); return; }
    if (confirm) {
      if (pauseSelection === 0) gameState = ST_PLAYING;
      if (pauseSelection === 1) pauseSubState = "diary";
      if (pauseSelection === 2) { twoPlayerMode = !twoPlayerMode; updateUI(); }
      if (pauseSelection === 3) { pauseSubState = "controls"; }
      if (pauseSelection === 4) pauseSubState = "audio";
      if (pauseSelection === 5) { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; }
      e.preventDefault();
      return;
    }
    if (k === "q") { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; e.preventDefault(); return; }
    return;
  }

  if (gameState === ST_PLAYING) {
    if (e.key === "a" || e.key === "A") { keys["a"] = true; e.preventDefault(); }
    if (e.key === "d" || e.key === "D") { keys["d"] = true; e.preventDefault(); }
    if (e.key === "ArrowLeft") { keys["arrowleft"] = true; e.preventDefault(); }
    if (e.key === "ArrowRight") { keys["arrowright"] = true; e.preventDefault(); }
    if (e.key === " " || e.key === "Space") { keys[" "] = true; e.preventDefault(); }
    if (e.key === "ArrowUp") { keys["arrowup"] = true; e.preventDefault(); }
    if (e.key === "x" || e.key === "X" || e.key === "j" || e.key === "J") { keys["x"] = true; e.preventDefault(); }
    if (e.key === "z" || e.key === "Z") { keys["z"] = true; e.preventDefault(); }
    if (e.key === "e" || e.key === "E") { keys["e"] = true; e.preventDefault(); }
    if (e.key === "m" || e.key === "M") { initAudio(); toggleMusic(); e.preventDefault(); }
    if (e.key === "n" || e.key === "N") { initAudio(); toggleSfx(); e.preventDefault(); }
  }

  if (shopOpen) {
    if (shopId === 0) {
      if (up || k === "w") { menuSelection = (menuSelection - 1 + 3) % 3; e.preventDefault(); return; }
      if (down || k === "s") { menuSelection = (menuSelection + 1) % 3; e.preventDefault(); return; }
      if (confirm) {
        if (menuSelection === 0 && !hasMap && azari >= 45) { azari -= 45; hasMap = true; sfxBuy(); }
        if (menuSelection === 1 && !hasBow && azari >= 35) { azari -= 35; hasBow = true; sfxBuy(); }
        if (menuSelection === 2 && azari >= 5) { azari -= 5; arrows += 20; sfxBuy(); }
        e.preventDefault(); return;
      }
    }
    if (shopId === 1) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 2) % 2; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 2; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 0 && heartFragmentsBought1 < 2 && azari >= 25) {
          azari -= 25; heartFragments1++; heartFragmentsBought1++;
          spawnFloatText(player.x, player.y - 30, "¡Fragmento J1!", "#f44");
          sfxBuy();
          if (heartFragments1 >= 3) { heartFragments1 -= 3; player.maxHp++; player.hp = player.maxHp; spawnFloatText(player.x, player.y - 50, "¡Vida +1!", "#f44"); spawnParticles(player.x + player.w/2, player.y + player.h/2, "#f44", 20, 5); }
        }
        if (menuSelection === 1 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; spawnFloatText(player.x, player.y - 30, "¡Amuleto!", "#0ff"); sfxBuy(); }
        e.preventDefault(); return;
      }
    }
    if (shopId === 2) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 2) % 2; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 2; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 0 && heartFragmentsBought2 < 2 && azari >= 25) {
          azari -= 25; heartFragments2++; heartFragmentsBought2++;
          spawnFloatText(player2.x, player2.y - 30, "¡Fragmento J2!", "#f4f");
          sfxBuy();
          if (heartFragments2 >= 3) { heartFragments2 -= 3; player2.maxHp++; player2.hp = player2.maxHp; spawnFloatText(player2.x, player2.y - 50, "¡Vida +1!", "#f4f"); spawnParticles(player2.x + player2.w/2, player2.y + player2.h/2, "#f4f", 20, 5); }
        }
        if (menuSelection === 1 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; spawnFloatText(player.x, player.y - 30, "¡Amuleto!", "#0ff"); sfxBuy(); }
        e.preventDefault(); return;
      }
    }
    if (e.key === "Escape") { shopOpen = false; menuSelection = 0; e.preventDefault(); return; }
  }
});

document.addEventListener("keyup", function(e) {
  if (e.key === "a" || e.key === "A") keys["a"] = false;
  if (e.key === "d" || e.key === "D") keys["d"] = false;
  if (e.key === "ArrowLeft") keys["arrowleft"] = false;
  if (e.key === "ArrowRight") keys["arrowright"] = false;
  if (e.key === " " || e.key === "Space") keys[" "] = false;
  if (e.key === "ArrowUp") keys["arrowup"] = false;
  if (e.key === "x" || e.key === "X" || e.key === "j" || e.key === "J") keys["x"] = false;
  if (e.key === "z" || e.key === "Z") keys["z"] = false;
  if (e.key === "e" || e.key === "E") keys["e"] = false;
});

function scanGamepads() {
  try {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    var found = false;
    for (var i = 0; i < pads.length; i++) {
      var gp = pads[i];
      if (gp && gp.connected && !found) {
        if (!gamepadConnected || gamepadIndex !== i) {
          gamepadConnected = true; gamepadIndex = i;
          spawnFloatText(player.x || 100, (player.y || 400) - 40, "🎮 Mando detectado", "#0f0");
          updateUI();
        }
        found = true;
      }
    }
    if (!found && gamepadConnected) {
      gamepadConnected = false; gamepadIndex = -1;
      gpButtons = {}; gpAxes = {x:0,y:0};
      updateUI();
    }
  } catch(e) {}
}

function pollGamepad() {
  if (gamepadConnected && gamepadIndex >= 0) {
    var gp = navigator.getGamepads()[gamepadIndex];
    if (gp) {
      var deadzone = 0.25;
      var ax = gp.axes[0] || 0; if (Math.abs(ax) < deadzone) ax = 0;
      gpAxes.x = ax;
      var ay = gp.axes[1] || 0; if (Math.abs(ay) < deadzone) ay = 0;
      gpAxes.y = ay;
      prevGPButtons = {};
      for (var k in gpButtons) prevGPButtons[k] = gpButtons[k];
      gpButtons = {};
      for (var i = 0; i < gp.buttons.length; i++) gpButtons[i] = gp.buttons[i].pressed;
    }
  }
}

function processGamepadInput() {
  if (!gamepadConnected) return;
  var btn9 = gpButtons[9] && !prevGPButtons[9];
  var btn8 = gpButtons[8] && !prevGPButtons[8];
  var btn0 = gpButtons[0] && !prevGPButtons[0];
  var btn12 = gpButtons[12] && !prevGPButtons[12];
  var btn13 = gpButtons[13] && !prevGPButtons[13];
  if (shopOpen && shopId === 0) {
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection - 1 + 3) % 3; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection + 1) % 3; gamepadMenuAxisLock = 1; }
    if (btn0) {
      if (menuSelection === 0 && !hasMap && azari >= 45) { azari -= 45; hasMap = true; sfxBuy(); }
      if (menuSelection === 1 && !hasBow && azari >= 35) { azari -= 35; hasBow = true; sfxBuy(); }
      if (menuSelection === 2 && azari >= 5) { azari -= 5; arrows += 20; sfxBuy(); }
    }
    return;
  }
  if (gameState === ST_LANGUAGE || gameState === ST_DEVICE) {
    var selection = gameState === ST_LANGUAGE ? languageSelection : deviceSelection;
    var options = gameState === ST_LANGUAGE ? languages : devices;
    if (btn12) selection = (selection - 1 + options.length) % options.length;
    if (btn13) selection = (selection + 1) % options.length;
    if (gameState === ST_LANGUAGE) languageSelection = selection;
    else deviceSelection = selection;
    if (btn0 || btn9) {
      if (gameState === ST_LANGUAGE) {
        language = languages[languageSelection].code;
        gameState = ST_DEVICE;
        deviceSelection = 0;
      } else {
        device = devices[deviceSelection].code;
        gamepadConnected = device === "play";
        setupTouchControls();
        gameState = ST_MENU;
        menuSubState = "slots";
      }
    }
    return;
  }
  if (gameState === ST_MENU) {
    if (device !== "play") return;
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection - 1 + 5) % 5; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection + 1) % 5; gamepadMenuAxisLock = 1; }
    if (btn0 || (gpButtons[1] && !prevGPButtons[1])) {
      activeSlot = menuSelection;
      var saves = getSaves();
      if (saves.slots[menuSelection]) {
        if (loadGame(menuSelection)) { gameState = ST_PLAYING; startMusic(); updateUI(); }
      } else {
        resetAll(); gameState = ST_PLAYING; startMusic(); updateUI();
      }
    }
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "menu") {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { pauseSelection = (pauseSelection - 1 + 6) % 6; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { pauseSelection = (pauseSelection + 1) % 6; gamepadMenuAxisLock = 1; }
    if (btn0) {
      if (pauseSelection === 0) gameState = ST_PLAYING;
      if (pauseSelection === 1) pauseSubState = "diary";
      if (pauseSelection === 2) { twoPlayerMode = !twoPlayerMode; updateUI(); }
      if (pauseSelection === 3) pauseSubState = "controls";
      if (pauseSelection === 4) pauseSubState = "audio";
      if (pauseSelection === 5) { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; }
    }
    return;
  }
  if (btn8) {
    if (gameState === ST_PLAYING) { inventoryOpen = !inventoryOpen; if (inventoryOpen) gameState = ST_INVENTORY; else gameState = ST_PLAYING; return; }
    else if (gameState === ST_INVENTORY) { inventoryOpen = false; gameState = ST_PLAYING; return; }
  }
  if (btn9) {
    if (gameState === ST_DEVICE) {
      deviceSelection = (deviceSelection + 1) % devices.length;
      return;
    }
    if (gameState === ST_PLAYING) { gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause(); return; }
    else if (gameState === ST_PAUSED) { if (pauseSubState === "diary" || pauseSubState === "controls" || pauseSubState === "audio") pauseSubState = "menu"; else gameState = ST_PLAYING; return; }
    else if (gameState === ST_INVENTORY) { inventoryOpen = false; gameState = ST_PLAYING; return; }
  }
}

function setupTouchControls() {
  var existing = document.getElementById("touchControls");
  if (existing) existing.remove();
  if (device !== "touch") return;
  var controls = document.createElement("div");
  controls.id = "touchControls";
  controls.innerHTML = '<button data-key="a">◀</button><button data-key="d">▶</button><button data-key=" ">⬆</button><button data-key="x">⚔</button><button data-key="e">✦</button>';
  controls.querySelectorAll("button").forEach(function(button) {
    var key = button.getAttribute("data-key");
    var press = function(event) { event.preventDefault(); keys[key] = true; };
    var release = function(event) { event.preventDefault(); keys[key] = false; };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
  });
  document.body.appendChild(controls);
}
