window.addEventListener("keydown", function(e) {
  initAudio();
  var k = e.key.toLowerCase();
  var normalizedKey = e.key === " " ? " " : (e.key === "Shift" ? "shift" : k);
  keys[normalizedKey] = true;
  var up = e.key === "ArrowUp" || e.code === "ArrowUp";
  var down = e.key === "ArrowDown" || e.code === "ArrowDown";
  var left = e.key === "ArrowLeft" || e.code === "ArrowLeft";
  var right = e.key === "ArrowRight" || e.code === "ArrowRight";
  var confirm = e.key === "Enter" || e.key === "Return" || e.code === "Enter" || e.code === "NumpadEnter" || e.key === " ";

  if (gameState === ST_MENU && menuSubState === "controls_category") {
    if (e.key === "Escape") { menuSubState = "settings"; e.preventDefault(); return; }
    if (up || k === "w") controlsConfigSelection = (controlsConfigSelection + 2) % 3;
    else if (down || k === "s") controlsConfigSelection = (controlsConfigSelection + 1) % 3;
    else if (confirm) {
      controlsConfigDevice = ["play", "pc", "touch"][controlsConfigSelection];
      controlsConfigSlot = 0;
      controlsConfigListening = false;
      if (controlsConfigDevice === "touch") {
        touchEditSelection = 0;
        gameState = ST_PAUSED;
        pauseSubState = "controls_touch";
      } else {
        menuSubState = "controls_config";
      }
    }
    e.preventDefault();
    return;
  }
  if (gameState === ST_MENU && menuSubState === "controls_config") {
    if (e.key === "Escape") {
      controlsConfigListening = false;
      menuSubState = "settings";
      e.preventDefault();
      return;
    }
    if (controlsConfigListening) {
      if (e.key !== "Enter" && e.key !== "Escape") {
        var selectedBinding = getControlBinding(controlActions[controlsConfigActionSelection].id);
        if (controlsConfigDevice === "play") {
          selectedBinding.pad[controlsConfigSlot] = Number(e.which || e.keyCode);
        } else if (selectedBinding.key.indexOf(normalizedKey) < 0) {
          selectedBinding.key[controlsConfigSlot] = normalizedKey;
        }
        saveControlBindings();
        controlsConfigListening = false;
      }
      e.preventDefault();
      return;
    }
    if (up || k === "w") controlsConfigActionSelection = (controlsConfigActionSelection - 1 + controlActions.length) % controlActions.length;
    else if (down || k === "s") controlsConfigActionSelection = (controlsConfigActionSelection + 1) % controlActions.length;
    else if (left || e.key === "ArrowLeft" || e.code === "ArrowLeft") controlsConfigSlot = (controlsConfigSlot + 3) % 4;
    else if (right || e.key === "ArrowRight" || e.code === "ArrowRight") controlsConfigSlot = (controlsConfigSlot + 1) % 4;
    else if (confirm) controlsConfigListening = true;
    e.preventDefault();
    return;
  }

  if (gameState === ST_INTRO) {
    if (confirm || e.key === "Escape") {
      finishIntro();
      e.preventDefault();
    }
    return;
  }

  if (gameState === ST_LEVEL_EDITOR) {
    if (e.key === "Escape") {
      gameState = ST_MENU;
      menuSubState = "slots";
      menuSelection = 5;
      editorMessage = "";
      e.preventDefault();
      return;
    }
    if (k === "s") {
      saveCustomEditorLevel();
      e.preventDefault();
      return;
    }
    if (k === "n") {
      addEditorRoom();
      e.preventDefault();
      return;
    }
    if (e.key === "[" || e.key === "]") {
      selectEditorRoom(editorRoomIndex + (e.key === "]" ? 1 : -1));
      e.preventDefault();
      return;
    }
    if (k === "x" || e.key === "Delete") {
      editorCategory = 0;
      editorPaletteSelection = 2;
      e.preventDefault();
      return;
    }
    if (k === "1" || k === "2" || k === "3" || k === "4") {
      editorCategory = Number(k) - 1;
      editorPaletteSelection = 0;
      e.preventDefault();
      return;
    }
    if (up || down) {
      var editorItems = editorPalette[editorCategory] || [];
      if (up) editorPaletteSelection = (editorPaletteSelection - 1 + editorItems.length) % editorItems.length;
      if (down) editorPaletteSelection = (editorPaletteSelection + 1) % editorItems.length;
      e.preventDefault();
      return;
    }
    return;
  }

  if (gameState === ST_MENU && menuSubState === "mode") {
    if (up || k === "w") modeSelection = (modeSelection + modeOptions.length - 1) % modeOptions.length;
    else if (down || k === "s") modeSelection = (modeSelection + 1) % modeOptions.length;
    else if (confirm) { gameMode = modeOptions[modeSelection].id; menuSubState = "difficulty"; }
    else if (e.key === "Escape") menuSubState = "slots";
    else return;
    e.preventDefault(); return;
  }
  if (gameState === ST_MENU && menuSubState === "difficulty") {
    var keyCode = e.which || e.keyCode;
    var difficultyUp = up || keyCode === 38 || k === "w";
    var difficultyDown = down || keyCode === 40 || k === "s";
    var difficultyConfirm = confirm || keyCode === 13;
    var directDifficulty = k === "1" ? 0 : (k === "2" ? 1 : (k === "3" ? 2 : -1));
    if (difficultyUp) {
      difficultySelection = (difficultySelection + difficultyOptions.length - 1) % difficultyOptions.length;
    } else if (difficultyDown) {
      difficultySelection = (difficultySelection + 1) % difficultyOptions.length;
    } else if (directDifficulty >= 0) {
      difficultySelection = directDifficulty;
    } else if (difficultyConfirm) {
      beginNewGameFromDifficulty();
    } else if (e.key === "Escape") {
      menuSubState = "slots";
    } else {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }

  if (k === "`") {
    if (gameState === ST_PLAYING) {
      inventoryOpen = !inventoryOpen;
      if (!inventoryOpen) mapOpen = false;
      if (inventoryOpen) gameState = ST_INVENTORY;
      else gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_INVENTORY) {
      inventoryOpen = false;
      mapOpen = false;
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    }

  }

  if (gameState === ST_INVENTORY && k === "m") {
    if (hasMap) mapOpen = !mapOpen;
    e.preventDefault();
    return;
  }
  if (gameState === ST_INVENTORY && !mapOpen) {
    var inventoryItems = 9;
    var inventoryPageCount = getInventoryPageCount();
    if (left) { inventoryPage = inventoryPage > 0 ? inventoryPage - 1 : inventoryPageCount - 1; inventorySelection = 0; e.preventDefault(); return; }
    if (right) { inventoryPage = inventoryPage < inventoryPageCount - 1 ? inventoryPage + 1 : 0; inventorySelection = 0; e.preventDefault(); return; }
    if (up) { inventorySelection = inventorySelection < 3 ? inventorySelection + 6 : inventorySelection - 3; e.preventDefault(); return; }
    if (down) { inventorySelection = inventorySelection >= 6 ? inventorySelection - 6 : inventorySelection + 3; e.preventDefault(); return; }
    var inventoryWeaponCount = unlockedWeapons.length;
    if (k === "e" && inventoryPage === 0 && inventorySelection === inventoryWeaponCount + 1 && hasOldKey) {
      keyReady = true;
      inventoryOpen = false;
      gameState = ST_PLAYING;
      spawnFloatText(player.x, player.y - 28, "Llave vieja preparada", "#d4af37");
      e.preventDefault(); return;
    }
    if (confirm) {
      var selectedInventoryItem = inventoryPage * 9 + inventorySelection;
      if (selectedInventoryItem >= 0 && selectedInventoryItem < inventoryWeaponCount && hasSword) {
        weaponId = normalizeWeaponId(unlockedWeapons[selectedInventoryItem]);
        player.weaponId = weaponId;
        player2.weaponId = weaponId;
        spawnFloatText(player.x, player.y - 28, getWeaponConfig(weaponId).name, getWeaponConfig(weaponId).color);
      }
      if (selectedInventoryItem === inventoryWeaponCount + 2 && hasAzariCharm) toggleBlessing("greedy");
      if (selectedInventoryItem === inventoryWeaponCount + 9 && bossUniqueItems.guardian) toggleBlessing("stone");
      if (selectedInventoryItem === inventoryWeaponCount + 10 && bossUniqueItems.queen_larva) toggleBlessing("brood");
      if (selectedInventoryItem === inventoryWeaponCount + 11 && bossUniqueItems.abyssal_knight) toggleBlessing("abyss");
      e.preventDefault(); return;
    }
  }

  if (gameState === ST_PLAYING && hasSword && /^[1-6]$/.test(k)) {
    var weaponIndex = Number(k) - 1;
    if (WEAPON_PROGRESSION[weaponIndex] && isWeaponUnlocked(WEAPON_PROGRESSION[weaponIndex])) {
      weaponId = normalizeWeaponId(WEAPON_PROGRESSION[weaponIndex]);
      player.weaponId = weaponId;
      player2.weaponId = weaponId;
      spawnFloatText(player.x, player.y - 28, getWeaponConfig(weaponId).name, getWeaponConfig(weaponId).color);
      e.preventDefault();
      return;
    }
    spawnFloatText(player.x, player.y - 28, "Arma bloqueada", "#ff7777");
    e.preventDefault();
    return;
  }

  if (e.key === "Escape") {
    if (adminConsoleOpen) {
      adminConsoleOpen = false;
      adminCommand = "";
      e.preventDefault();
      return;
    }
    if (shopOpen && gameState === ST_PLAYING) {
      if (shopMenuOpen) { shopMenuOpen = false; shopConfirm = -1; }
      else { gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause(); }
      e.preventDefault();
      return;
    } else if (gameState === ST_PLAYING) {
      if (customLevelActive) { exitCustomLevel(); e.preventDefault(); return; }
      gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause();
      e.preventDefault();
      return;
    } else if (gameState === ST_PAUSED) {
      if (pauseSubState === "diary" || pauseSubState === "settings") pauseSubState = "menu";
      else if (pauseSubState === "controls" || pauseSubState === "audio") pauseSubState = "menu";
      else gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_INVENTORY) {
      inventoryOpen = false;
      mapOpen = false;
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    } else if (gameState === ST_MENU && menuSubState === "confirm_delete") {
      menuSubState = "slots"; slotToDelete = -1;
      e.preventDefault();
      return;
    } else if (gameState === ST_MENU && menuSubState === "admin_password") {
      adminPassword = ""; adminMessage = "";
      if (settingsReturn === "pause") {
        settingsReturn = false;
        gameState = ST_PAUSED;
        pauseSubState = "settings";
      } else {
        menuSubState = "slots";
      }
      e.preventDefault();
      return;
    } else if (gameState === ST_MENU && menuSubState === "settings") {
      menuSubState = "slots";
      e.preventDefault();
      return;
    }

  }

  if (gameState === ST_DIALOGUE) {
    if (e.key === "Escape") {
      bossDialogueLines = [];
      dialogueMode = "boss";
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    }
    if (confirm || e.key === " " || k === "x" || k === "e") {
      advanceBossDialogue();
      e.preventDefault();
    }
    return;
  }

  if (gameState === ST_HOUSE) {
    if (e.key === "Escape") {
      currentHouse = null;
      bossDialogueLines = [];
      interiorInspecting = false;
      dialogueMode = "boss";
      gameState = ST_PLAYING;
      e.preventDefault();
      return;
    }
    var interiorObjects = currentHouse && currentHouse.objects ? currentHouse.objects : [];
    if (!interiorInspecting) {
      if (e.key === "a" || e.key === "A" || e.code === "KeyA" || e.key === "ArrowLeft" || e.code === "ArrowLeft") {
        interiorMoveLeft = true; e.preventDefault();
      }
      if (e.key === "d" || e.key === "D" || e.code === "KeyD" || e.key === "ArrowRight" || e.code === "ArrowRight") {
        interiorMoveRight = true; e.preventDefault();
      }
      if (e.key === " " || e.key === "Space" || e.code === "Space" || e.key === "ArrowUp" || e.code === "ArrowUp") {
        interiorJump = true; e.preventDefault();
      }
    }
    if (e.key === "Enter" || e.code === "Enter" || e.code === "NumpadEnter" || k === "e") {
      if (!interiorInspecting && interiorPlayer.x < 155) {
        currentHouse = null;
        bossDialogueLines = [];
        gameState = ST_PLAYING;
        e.preventDefault();
        return;
      }
      if (interiorInspecting) {
        interiorInspecting = false;
        bossDialogueLines = currentHouse.story;
        bossDialogueIndex = 0;
      } else if (interiorObjects.length) {
        var nearest = 0;
        var nearestDistance = Infinity;
        interiorObjects.forEach(function(object, index) {
          var objectX = 175 + index * 230 + 48;
          var distance = Math.abs(interiorPlayer.x - objectX);
          if (distance < nearestDistance) { nearest = index; nearestDistance = distance; }
        }, true);
        interiorSelection = nearest;
        var objectX = 175 + interiorSelection * 230 + 48;
        if (Math.abs(interiorPlayer.x - objectX) < 115) {
          bossDialogueLines = [["INSPECCIÓN", interiorObjects[interiorSelection].text]];
          bossDialogueIndex = 0;
          interiorInspecting = true;
        }
      } else if (bossDialogueIndex < bossDialogueLines.length - 1) {
        bossDialogueIndex++;
      } else {
        currentHouse = null;
        bossDialogueLines = [];
        interiorInspecting = false;
        dialogueMode = "boss";
        gameState = ST_PLAYING;
      }
      e.preventDefault();
      return;
    }
    return;
  }

  if (bossVictory.active && (confirm || e.key === " " || k === "x" || k === "e")) {
    bossVictory.active = false;
    requestInterstitialAd("boss");
    e.preventDefault();
    return;
  }

  if (gameState === ST_DEATH) {
    var deathOptions = 3;
    if (up || k === "w") deathChoice = (deathChoice - 1 + deathOptions) % deathOptions;
    if (down || k === "s") deathChoice = (deathChoice + 1) % deathOptions;
    if (confirm) {
      if (deathChoice === 0) {
        restoreCheckpoint(true);
      } else if (deathChoice === 1) {
        if (adRewardedRevive) {
          adRewardedRevive = false;
          player.hp = Math.max(1, Math.ceil(player.maxHp / 2));
          player.frozen = false; playerDead = false; player.inv = 90;
          gameState = ST_PLAYING;
          showAdMessage("¡Has vuelto al combate!");
        } else {
          requestRewardedAd("revive");
        }
      } else { resetAll(); gameState = ST_MENU; menuSubState = "slots"; }
      e.preventDefault();
    }
    return;
  }

  if (gameState === ST_LANGUAGE) {
    if (up || k === "w") { languageSelection = (languageSelection - 1 + languages.length) % languages.length; e.preventDefault(); return; }
    if (down || k === "s") { languageSelection = (languageSelection + 1) % languages.length; e.preventDefault(); return; }
    if (confirm) {
      language = languages[languageSelection].code;
      if (settingsReturn === "pause") {
        settingsReturn = false;
        gameState = ST_PAUSED;
        pauseSubState = "settings";
      } else if (settingsReturn) {
        settingsReturn = false;
        gameState = ST_MENU;
        menuSubState = "settings";
      } else {
        if (isMobileBrowser) {
          device = "touch";
          setupTouchControls();
          gameState = ST_MENU;
          menuSubState = "slots";
        } else {
          gameState = ST_DEVICE;
          deviceSelection = 0;
        }
      }
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
      if (settingsReturn === "pause") {
        gameState = ST_PAUSED;
        pauseSubState = "settings";
      } else {
        gameState = ST_MENU;
        menuSubState = settingsReturn ? "settings" : "slots";
      }
      settingsReturn = false;
      e.preventDefault();
      return;
    }
    return;
  }

  if (gameState === ST_MENU) {
    if (menuSubState === "admin_password") {
      if (confirm) {
        if (adminPassword === "123412") {
          azari = 1000;
          adminMode = true;
          adminConsoleOpen = false;
          adminCommand = "";
          adminCommandMessage = "Modo admin activado. Presiona / durante la partida.";
          currentRoom = rooms.length - 1;
          player.x = currentRoom * ROOM_W + 30;
          player.y = rooms[currentRoom].height - 120;
          player.vx = 0; player.vy = 0;
          if (adminFromSettings && settingsReturn === "pause") {
            adminFromSettings = false;
            settingsReturn = false;
            gameState = ST_PAUSED;
            pauseSubState = "settings";
          } else if (adminFromSettings) {
            adminFromSettings = false;
            gameState = ST_MENU;
            menuSubState = "settings";
          } else {
            gameState = ST_PLAYING;
            menuSubState = "slots";
            startMusic(); updateUI();
          }
        } else {
          adminPassword = "";
          adminMessage = "Contraseña incorrecta";
        }
        if (gameState === ST_DIALOGUE) return;
        e.preventDefault(); return;
      }
      if (e.key === "Backspace") { adminPassword = adminPassword.slice(0, -1); e.preventDefault(); return; }
      if (/^[0-9]$/.test(e.key) && adminPassword.length < 12) { adminPassword += e.key; e.preventDefault(); return; }
      return;
    }
    if (menuSubState === "difficulty" && e.key === "Escape") {
      menuSubState = "mode";
      e.preventDefault();
      return;
    }
    if (menuSubState === "mode" && e.key === "Escape") {
      menuSubState = "slots";
      e.preventDefault();
      return;
    }
    if (menuSubState === "guide") {
      if (e.key === "Escape") {
        menuSubState = "slots";
        e.preventDefault();
      }
      return;
    }
    if (menuSubState === "settings") {
      if (up || k === "w") { settingsSelection = (settingsSelection - 1 + 5) % 5; e.preventDefault(); return; }
      if (down || k === "s") { settingsSelection = (settingsSelection + 1) % 5; e.preventDefault(); return; }
      if (settingsSelection === 2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (e.key === "ArrowRight" ? 0.1 : -0.1)));
        e.preventDefault(); return;
      }
      if (settingsSelection === 3 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        adjustGameSpeed(e.key === "ArrowRight" ? 1 : -1);
        e.preventDefault(); return;
      }
      if (confirm) {
        if (settingsSelection === 0) { settingsReturn = true; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = true; gameState = ST_DEVICE; }
        if (settingsSelection === 4) { controlsConfigSelection = 0; controlsConfigSlot = 0; controlsConfigListening = false; menuSubState = "controls_category"; }
        e.preventDefault(); return;
      }
      return;
    }
    if (menuSubState === "levels") {
      if (up || k === "w") { levelsSelection = (levelsSelection - 1 + 2) % 2; e.preventDefault(); return; }
      if (down || k === "s") { levelsSelection = (levelsSelection + 1) % 2; e.preventDefault(); return; }
      if (confirm) {
        if (levelsSelection === 0) {
          if (startCustomLevel()) menuSubState = "slots";
        } else {
          openNewEditorLevel();
          menuSubState = "slots";
        }
        e.preventDefault();
        return;
      }
      if (e.key === "Escape") {
        menuSubState = "slots";
        e.preventDefault();
      }
      return;
    }
    if (menuSubState === "difficulty") {
      if (up || k === "w") { difficultySelection = (difficultySelection - 1 + difficultyOptions.length) % difficultyOptions.length; e.preventDefault(); return; }
      if (down || k === "s") { difficultySelection = (difficultySelection + 1) % difficultyOptions.length; e.preventDefault(); return; }
      if (confirm) {
        beginNewGameFromDifficulty();
        e.preventDefault();
        return;
      }
      return;
    }

    if (menuSubState === "slots") {
      if (up || k === "w") { menuSelection = (menuSelection - 1 + 8) % 8; e.preventDefault(); return; }
      if (down || k === "s") { menuSelection = (menuSelection + 1) % 8; e.preventDefault(); return; }
      if (confirm) {
        if (menuSelection === 5) { menuSubState = "levels"; levelsSelection = 0; e.preventDefault(); return; }
        if (menuSelection === 6) { menuSubState = "settings"; settingsSelection = 0; e.preventDefault(); return; }
        if (menuSelection === 7) { menuSubState = "guide"; e.preventDefault(); return; }
        activeSlot = menuSelection;
        var saves = getSaves();
        if (saves.slots[menuSelection]) {
          if (loadGame(menuSelection)) { gameState = ST_PLAYING; startMusic(); updateUI(); }
        } else {
          modeSelection = 0;
          menuSubState = "mode";
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
      if (confirm || k === "y" || k === "s" || k === "delete") { deleteSave(slotToDelete); menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
      if (k === "n" || e.key === "Escape") { menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
    }
    return;
  }

  if (gameState === ST_PAUSED) {
    if (pauseSubState === "settings") {
      if (up || k === "w") { settingsSelection = (settingsSelection - 1 + 5) % 5; e.preventDefault(); return; }
      if (down || k === "s") { settingsSelection = (settingsSelection + 1) % 5; e.preventDefault(); return; }
      if (settingsSelection === 2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (e.key === "ArrowRight" ? 0.1 : -0.1)));
        e.preventDefault(); return;
      }
      if (settingsSelection === 3 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        adjustGameSpeed(e.key === "ArrowRight" ? 1 : -1);
        e.preventDefault(); return;
      }
      if (confirm) {
        if (settingsSelection === 0) { settingsReturn = "pause"; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = "pause"; gameState = ST_DEVICE; }
        if (settingsSelection === 4) { controlsConfigDevice = "pc"; controlsConfigSelection = 0; controlsConfigActionSelection = 0; controlsConfigListening = false; menuSubState = "controls_config"; gameState = ST_MENU; }
        e.preventDefault(); return;
      }
      return;
    }
    if (pauseSubState === "diary") {
      if (k === "a" || e.key === "ArrowLeft" || k === "q" || k === "1") { diaryCategory = "enemies"; diaryScroll = 0; }
      if (k === "d" || e.key === "ArrowRight" || k === "2") { diaryCategory = "bosses"; diaryScroll = 0; }
      if (up || k === "w") { diaryScroll = Math.max(0, diaryScroll - 1); e.preventDefault(); return; }
      if (down || k === "s") { diaryScroll = Math.min(diaryCategory === "enemies" ? 1 : 0, diaryScroll + 1); e.preventDefault(); return; }
      if (k === "a" || e.key === "ArrowLeft" || k === "q" || k === "1" ||
          k === "d" || e.key === "ArrowRight" || k === "2") e.preventDefault();
      return;
    }
    if (pauseSubState === "audio") {
      if (up || k === "w") { audioSelection = (audioSelection + 2) % 3; e.preventDefault(); return; }
      if (down || k === "s") { audioSelection = (audioSelection + 1) % 3; e.preventDefault(); return; }
      if (e.key === "ArrowLeft") { adjustAudioVolume(-0.05); e.preventDefault(); return; }
      if (e.key === "ArrowRight") { adjustAudioVolume(0.05); e.preventDefault(); return; }
      return;
    }
    if (pauseSubState === "controls") {
      if (up || k === "w") controlsConfigSelection = (controlsConfigSelection + 2) % 3;
      else if (down || k === "s") controlsConfigSelection = (controlsConfigSelection + 1) % 3;
      else if (confirm) {
        controlsConfigSlot = 0;
        controlsConfigActionSelection = 0;
        if (controlsConfigSelection === 0) { controlsConfigDevice = "play"; pauseSubState = "controls_pad"; }
        else if (controlsConfigSelection === 1) { controlsConfigDevice = "pc"; pauseSubState = "controls_keys"; }
        else { touchEditSelection = 0; pauseSubState = "controls_touch"; applyTouchLayout(); }
      } else if (e.key === "Escape") {
        pauseSubState = "menu";
      }
      e.preventDefault();
      return;
    }
    if (pauseSubState === "controls_pad") {
      if (e.key === "Escape") {
        controlsConfigListening = false;
        pauseSubState = "controls";
      } else if (controlsConfigListening) {
        if (e.key !== "Enter") {
          var pausePadBinding = controlActions[controlsConfigActionSelection].pad;
          pausePadBinding[controlsConfigSlot] = e.which || e.keyCode;
          saveControlBindings();
          controlsConfigListening = false;
        }
      } else if (up || k === "w") {
        controlsConfigActionSelection = (controlsConfigActionSelection - 1 + controlActions.length) % controlActions.length;
      } else if (down || k === "s") {
        controlsConfigActionSelection = (controlsConfigActionSelection + 1) % controlActions.length;
      } else if (left) {
        controlsConfigSlot = (controlsConfigSlot + 3) % 4;
      } else if (right) {
        controlsConfigSlot = (controlsConfigSlot + 1) % 4;
      } else if (confirm) {
        controlsConfigListening = true;
      }
      e.preventDefault();
      return;
    }
    if (pauseSubState === "controls_keys") {
      if (e.key === "Escape") {
        controlsConfigListening = false;
        pauseSubState = "controls";
      } else if (controlsConfigListening) {
        if (e.key !== "Enter") {
          var pauseKeyBinding = controlActions[controlsConfigActionSelection].key;
          pauseKeyBinding[controlsConfigSlot] = normalizedKey;
          saveControlBindings();
          controlsConfigListening = false;
        }
      } else if (up || k === "w") {
        controlsConfigActionSelection = (controlsConfigActionSelection - 1 + controlActions.length) % controlActions.length;
      } else if (down || k === "s") {
        controlsConfigActionSelection = (controlsConfigActionSelection + 1) % controlActions.length;
      } else if (left || e.key === "ArrowLeft" || e.code === "ArrowLeft") {
        controlsConfigSlot = (controlsConfigSlot + 3) % 4;
      } else if (right || e.key === "ArrowRight" || e.code === "ArrowRight") {
        controlsConfigSlot = (controlsConfigSlot + 1) % 4;
      } else if (confirm) {
        controlsConfigListening = true;
      }
      e.preventDefault();
      return;
    }
    if (pauseSubState === "controls_touch") {
      if (e.key === "Escape") {
        saveTouchLayout();
        pauseSubState = "controls";
      } else if (up || k === "w") {
        touchEditSelection = (touchEditSelection + 2) % 3;
      } else if (down || k === "s") {
        touchEditSelection = (touchEditSelection + 1) % 3;
      } else if (left || k === "a" || right || k === "d" || k === "q" || k === "e" || k === "+" || k === "-") {
        var touchDirection = left || k === "a" || k === "q" || k === "-" ? -1 : 1;
        if (touchEditSelection === 0) {
          if (k === "q" || k === "e") touchLayout.joystick.y = Math.max(4, Math.min(90, touchLayout.joystick.y + touchDirection * 2));
          else touchLayout.joystick.x = Math.max(0, Math.min(82, touchLayout.joystick.x + touchDirection * 2));
        }
        if (touchEditSelection === 1) {
          if (k === "q" || k === "e") touchLayout.actions.y = Math.max(4, Math.min(90, touchLayout.actions.y + touchDirection * 2));
          else touchLayout.actions.x = Math.max(0, Math.min(82, touchLayout.actions.x + touchDirection * 2));
        }
        if (touchEditSelection === 2) touchLayout.opacity = Math.max(0.2, Math.min(1, touchLayout.opacity + touchDirection * 0.05));
        applyTouchLayout();
        saveTouchLayout();
      }
      e.preventDefault();
      return;
    }
    if (up || k === "w") { pauseSelection = (pauseSelection - 1 + 8) % 8; e.preventDefault(); return; }
    if (down || k === "s") { pauseSelection = (pauseSelection + 1) % 8; e.preventDefault(); return; }
    if (confirm) {
      if (pauseSelection === 0) gameState = ST_PLAYING;
      if (pauseSelection === 1) pauseSubState = "diary";
      if (pauseSelection === 2) { twoPlayerMode = !twoPlayerMode; updateUI(); }
      if (pauseSelection === 3) {
        controlsConfigSelection = 0;
        controlsConfigActionSelection = 0;
        controlsConfigListening = false;
        pauseSubState = "controls";
      }
      if (pauseSelection === 4) pauseSubState = "audio";
      if (pauseSelection === 5) pauseSubState = "settings";
      if (pauseSelection === 6) { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; }
      if (pauseSelection === 7) requestRewardedAd("random");
      e.preventDefault();
      return;
    }
    if (k === "q") { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; e.preventDefault(); return; }
    return;
  }

  if (gameState === ST_PLAYING) {
    if (adminMode && adminConsoleOpen) {
      if (e.key === "Enter" || e.code === "Enter" || e.code === "NumpadEnter") {
        executeAdminCommand(adminCommand);
        adminCommand = "";
        e.preventDefault();
        return;
      }
      if (e.key === "Backspace") { adminCommand = adminCommand.slice(0, -1); e.preventDefault(); return; }
      if (e.key.length === 1 && adminCommand.length < 120) {
        adminCommand += e.key;
        e.preventDefault();
      }
      return;
    }
    if (adminMode && e.key === "/") {
      adminConsoleOpen = true;
      adminCommand = "/";
      adminCommandMessage = "";
      e.preventDefault();
      return;
    }
    if (e.key === "a" || e.key === "A") { keys["a"] = true; e.preventDefault(); }
    if (e.key === "d" || e.key === "D") { keys["d"] = true; e.preventDefault(); }
    if (e.key === "ArrowLeft") { keys["arrowleft"] = true; e.preventDefault(); }
    if (e.key === "ArrowRight") { keys["arrowright"] = true; e.preventDefault(); }
    if (e.key === " " || e.key === "Space" || e.code === "Space") { keys[" "] = true; e.preventDefault(); }
    if (e.key === "ArrowUp") { keys["arrowup"] = true; e.preventDefault(); }
    if (e.key === "ArrowDown") { keys["arrowdown"] = true; e.preventDefault(); }
    if (e.key === "s" || e.key === "S") { keys["s"] = true; e.preventDefault(); }
    if (e.key === "x" || e.key === "X" || e.key === "j" || e.key === "J") { keys["x"] = true; e.preventDefault(); }
    if (e.key === "z" || e.key === "Z") { keys["z"] = true; e.preventDefault(); }
    if (e.key === "e" || e.key === "E") { keys["e"] = true; e.preventDefault(); }
    if (e.key === "c" || e.key === "C") { keys["c"] = true; e.preventDefault(); }
    if (e.key === "b" || e.key === "B" || e.code === "KeyB") { keys["b"] = true; e.preventDefault(); }
    if (e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") { keys["shift"] = true; e.preventDefault(); }
    if (e.key === "m" || e.key === "M") { initAudio(); toggleMusic(); e.preventDefault(); }
    if (e.key === "n" || e.key === "N") { initAudio(); toggleSfx(); e.preventDefault(); }
  }

  if (shopOpen) {
    if (shopAnim > 0) return;
    if (!shopMenuOpen) {
      if (e.key === "e" || e.key === "E") {
        var vendorDistanceX = player.x - shopVendorX;
        var vendorDistanceY = player.y - shopVendorY;
        var vendorDistance = Math.sqrt(vendorDistanceX * vendorDistanceX + vendorDistanceY * vendorDistanceY);
        if (vendorDistance < 150) {
          shopMenuOpen = true; menuSelection = 0; sfxNpc();
          shopGreeting = "Forastero... acércate. Tengo cosas que podrían ayudarte.";
          shopGreetingTimer = 240;
          speakShopGreeting(shopGreeting);
        }
        if (Math.abs(player.x - 100) < 70 && player.y > 500) {
          shopOpen = false; shopMenuOpen = false; shopExitCooldown = 30; keys["e"] = false; player.x = shopPreviousX; player.y = shopPreviousY;
        }
        e.preventDefault(); return;
      }
      return;
    }
    if (shopId === 0) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 25) % 25; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 25; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 17 && azari >= 1) { spendAzari(1, "bombs"); bombs += 5; sfxBuy(); }
        if (menuSelection === 18) buyArmorUpgrade();
        if (menuSelection >= 19 && menuSelection <= 24) {
          var keyboardWeaponId = WEAPON_PROGRESSION[menuSelection - 19];
          var keyboardWeaponPrice = isWeaponUnlocked(keyboardWeaponId) ? 30 + getWeaponLevel(keyboardWeaponId) * 20 : 100;
          if (azari >= keyboardWeaponPrice && (isWeaponUnlocked(keyboardWeaponId) || menuSelection === 19 || isWeaponUnlocked(WEAPON_PROGRESSION[menuSelection - 20]))) {
            if (!isWeaponUnlocked(keyboardWeaponId)) unlockedWeapons.push(keyboardWeaponId);
            else if (!upgradeWeapon(keyboardWeaponId)) { e.preventDefault(); return; }
            spendAzari(keyboardWeaponPrice, "weapon_" + keyboardWeaponId);
            weaponId = keyboardWeaponId; player.weaponId = weaponId; player2.weaponId = weaponId; swordEquipped = true; sfxBuy();
          }
        }
        e.preventDefault(); return;
      }
      e.preventDefault(); return;
    }
    if (shopId === 1) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 7) % 7; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 7; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 0 && swordLevel < 3 && hasSword && azari >= 30) { spendAzari(30, "sword_upgrade"); swordLevel++; sfxBuy(); }
        if (menuSelection === 1 && bowLevel < 3 && hasBow && azari >= 30) { spendAzari(30, "bow_upgrade"); bowLevel++; sfxBuy(); }
        if (menuSelection === 2 && hasBow && arrowType === "normal" && azari >= 20) { spendAzari(20, "heavy_arrows"); arrowType = "heavy"; sfxBuy(); }
        if (menuSelection === 3 && !combatSkills.charged && hasSword && azari >= 35) { spendAzari(35, "charged_attack"); combatSkills.charged = true; sfxBuy(); }
        if (menuSelection === 4 && !combatSkills.aerial && hasSword && azari >= 35) { spendAzari(35, "aerial_attack"); combatSkills.aerial = true; sfxBuy(); }
        if (menuSelection === 5 && !combatSkills.combo && hasSword && azari >= 50) { spendAzari(50, "combo"); combatSkills.combo = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariCharm && azari >= 45) { spendAzari(45, "azari_charm"); hasAzariCharm = true; sfxBuy(); }
        shopConfirm = -1;
        e.preventDefault(); return;
      }
    }
    if (shopId === 2) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 2) % 2; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 2; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 0 && heartFragmentsBought2 < 2 && azari >= 25) {
          spendAzari(25, "heart_fragment_2"); heartFragments2++; heartFragmentsBought2++;
          spawnFloatText(player2.x, player2.y - 30, "¡Fragmento J2!", "#f4f");
          sfxBuy();
          if (heartFragments2 >= 3) { heartFragments2 -= 3; player2.maxHp++; player2.hp = player2.maxHp; spawnFloatText(player2.x, player2.y - 50, "¡Vida +1!", "#f4f"); spawnParticles(player2.x + player2.w/2, player2.y + player2.h/2, "#f4f", 20, 5); }
        }
        if (menuSelection === 1 && !hasAzariCharm && azari >= 45) { spendAzari(45, "azari_charm"); hasAzariCharm = true; spawnFloatText(player.x, player.y - 30, "¡Amuleto!", "#0ff"); sfxBuy(); }
        e.preventDefault(); return;
      }
    }
    if (e.key === "Escape") { shopOpen = false; shopMenuOpen = false; shopConfirm = -1; shopExitCooldown = 30; player.x = shopPreviousX; player.y = shopPreviousY; e.preventDefault(); return; }
  }
}, true);

function toggleBlessing(id) {
  var index = equippedBlessings.indexOf(id);
  if (index >= 0) { equippedBlessings.splice(index, 1); return; }
  if (equippedBlessings.length >= blessingSlots) equippedBlessings.shift();
  equippedBlessings.push(id);
  trackGameEvent("blessing_selected", { blessing_name: id });
}

document.addEventListener("keyup", function(e) {
  var normalizedKey = e.key === " " ? " " : (e.key === "Shift" ? "shift" : e.key.toLowerCase());
  keys[normalizedKey] = false;
  if (e.key === "a" || e.key === "A" || e.code === "KeyA" || e.key === "ArrowLeft" || e.code === "ArrowLeft") interiorMoveLeft = false;
  if (e.key === "d" || e.key === "D" || e.code === "KeyD" || e.key === "ArrowRight" || e.code === "ArrowRight") interiorMoveRight = false;
  if (e.key === "a" || e.key === "A") keys["a"] = false;
  if (e.key === "d" || e.key === "D") keys["d"] = false;
  if (e.key === "ArrowLeft") keys["arrowleft"] = false;
  if (e.key === "ArrowRight") keys["arrowright"] = false;
  if (e.key === " " || e.key === "Space" || e.code === "Space") keys[" "] = false;
  if (e.key === "ArrowUp") keys["arrowup"] = false;
  if (e.key === "ArrowUp") keys["arrowup"] = false;
  if (e.key === "ArrowDown") keys["arrowdown"] = false;
  if (e.key === "s" || e.key === "S") keys["s"] = false;
  if (e.key === "x" || e.key === "X" || e.key === "j" || e.key === "J") keys["x"] = false;
  if (e.key === "z" || e.key === "Z") keys["z"] = false;
  if (e.key === "e" || e.key === "E") keys["e"] = false;
  if (e.key === "c" || e.key === "C") keys["c"] = false;
  if (e.key === "b" || e.key === "B" || e.code === "KeyB") keys["b"] = false;
  if (e.key === "Shift") keys["shift"] = false;
});

function setupFullscreenButton() {
  if (document.getElementById("fullscreenButton")) return;
  var button = document.createElement("button");
  button.id = "fullscreenButton";
  button.type = "button";
  button.addEventListener("click", function() {
    var root = document.documentElement;
    if (document.fullscreenElement) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
      return;
    }
    var request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (request) request.call(root);
  });
  document.body.appendChild(button);
}

function updateFullscreenButton() {
  var button = document.getElementById("fullscreenButton");
  if (!button) return;
  var visible = isMobileBrowser && gameState === ST_LANGUAGE;
  button.style.display = visible ? "block" : "none";
  button.textContent = document.fullscreenElement ? "↙ SALIR DE PANTALLA COMPLETA" : "⛶ PANTALLA COMPLETA";
}

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
  var btn14 = gpButtons[14] && !prevGPButtons[14];
  var btn15 = gpButtons[15] && !prevGPButtons[15];
  if (shopOpen && shopId === 0) {
    if (btn9) {
      shopOpen = false; shopMenuOpen = false; shopConfirm = -1; shopExitCooldown = 30;
      player.x = shopPreviousX; player.y = shopPreviousY;
    }
    return;
  }
  if (shopOpen && (shopId === 0 || shopId === 1)) {
    var shopOptions = shopId === 0 ? 25 : 7;
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection - 1 + shopOptions) % shopOptions; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection + 1) % shopOptions; gamepadMenuAxisLock = 1; }
    if (btn0) {
      if (shopId === 0) {
        if (menuSelection === 0 && !hasMap && azari >= 45) { spendAzari(45, "map"); hasMap = true; sfxBuy(); }
        if (menuSelection === 1 && !hasBow && azari >= 35) { spendAzari(35, "bow"); hasBow = true; sfxBuy(); }
        if (menuSelection === 2 && azari >= 5) { spendAzari(5, "arrows"); arrows += 20; sfxBuy(); }
        if (menuSelection === 3 && heartFragmentsBought1 < 2 && azari >= 25) { spendAzari(25, "heart_fragment_1"); heartFragments1++; heartFragmentsBought1++; sfxBuy(); if (heartFragments1 >= 3) { heartFragments1 -= 3; player.maxHp++; player.hp = player.maxHp; } }
        if (menuSelection === 4 && heartFragmentsBought2 < 2 && azari >= 25) { spendAzari(25, "heart_fragment_2"); heartFragments2++; heartFragmentsBought2++; sfxBuy(); if (heartFragments2 >= 3) { heartFragments2 -= 3; player2.maxHp++; player2.hp = player2.maxHp; } }
        if (menuSelection === 5 && !hasAzariCharm && azari >= 45) { spendAzari(45, "azari_charm"); hasAzariCharm = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariMagnet && azari >= 60) { spendAzari(60, "azari_magnet"); hasAzariMagnet = true; sfxBuy(); }
        if (menuSelection === 7 && azariBagLevel < 5) {
          var bagPrices2 = [80, 120, 180, 260, 350];
          var bagPrice2 = bagPrices2[azariBagLevel];
          if (azari >= bagPrice2) { spendAzari(bagPrice2, "azari_bag"); azariBagLevel++; hasAzariBag = true; sfxBuy(); }
        }
        if (menuSelection === 8 && ((!hasLantern && azari >= 70) || (hasLantern && lanternLevel < 3 && azari >= (lanternLevel === 1 ? 110 : 180)))) {
          spendAzari(hasLantern ? (lanternLevel === 1 ? 110 : 180) : 70, "lantern");
          hasLantern = true; lanternLevel = Math.min(3, lanternLevel + 1); sfxBuy();
        }
        if (menuSelection === 9 && !hasOldKey && azari >= 40) { spendAzari(40, "old_key"); hasOldKey = true; sfxBuy(); }
        if (menuSelection === 10 && swordLevel < 3 && hasSword && azari >= 30) { spendAzari(30, "sword_upgrade"); swordLevel++; sfxBuy(); }
        if (menuSelection === 11 && bowLevel < 3 && hasBow && azari >= 30) { spendAzari(30, "bow_upgrade"); bowLevel++; sfxBuy(); }
        if (menuSelection === 12 && hasBow && arrowType === "normal" && azari >= 20) { spendAzari(20, "heavy_arrows"); arrowType = "heavy"; sfxBuy(); }
        if (menuSelection === 13 && !combatSkills.charged && hasSword && azari >= 35) { spendAzari(35, "charged_attack"); combatSkills.charged = true; sfxBuy(); }
        if (menuSelection === 14 && !combatSkills.aerial && hasSword && azari >= 35) { spendAzari(35, "aerial_attack"); combatSkills.aerial = true; sfxBuy(); }
        if (menuSelection === 15 && !combatSkills.combo && hasSword && azari >= 50) { spendAzari(50, "combo"); combatSkills.combo = true; sfxBuy(); }
        if (menuSelection === 16 && !hasAzariCharm && azari >= 45) { spendAzari(45, "azari_charm"); hasAzariCharm = true; sfxBuy(); }
        if (menuSelection === 17 && azari >= 1) { spendAzari(1, "bombs"); bombs += 5; sfxBuy(); }
        if (menuSelection === 18) buyArmorUpgrade();
        if (menuSelection >= 19 && menuSelection <= 24) {
          var weaponShopId = WEAPON_PROGRESSION[menuSelection - 19];
          var weaponPrice = isWeaponUnlocked(weaponShopId) ? 30 + getWeaponLevel(weaponShopId) * 20 : 100;
          if (azari >= weaponPrice) {
            if (!isWeaponUnlocked(weaponShopId)) {
              if (menuSelection > 19 && unlockedWeapons.indexOf(WEAPON_PROGRESSION[menuSelection - 20]) < 0) return;
              unlockedWeapons.push(weaponShopId);
            } else if (!upgradeWeapon(weaponShopId)) return;
            spendAzari(weaponPrice, "weapon_" + weaponShopId);
            weaponId = weaponShopId; player.weaponId = weaponId; player2.weaponId = weaponId; swordEquipped = true; sfxBuy();
          }
        }
      } else {
        if (menuSelection === 0 && swordLevel < 3 && hasSword && azari >= 30) { spendAzari(30, "sword_upgrade"); swordLevel++; sfxBuy(); }
        if (menuSelection === 1 && bowLevel < 3 && hasBow && azari >= 30) { spendAzari(30, "bow_upgrade"); bowLevel++; sfxBuy(); }
        if (menuSelection === 2 && hasBow && arrowType === "normal" && azari >= 20) { spendAzari(20, "heavy_arrows"); arrowType = "heavy"; sfxBuy(); }
        if (menuSelection === 3 && !combatSkills.charged && hasSword && azari >= 35) { spendAzari(35, "charged_attack"); combatSkills.charged = true; sfxBuy(); }
        if (menuSelection === 4 && !combatSkills.aerial && hasSword && azari >= 35) { spendAzari(35, "aerial_attack"); combatSkills.aerial = true; sfxBuy(); }
        if (menuSelection === 5 && !combatSkills.combo && hasSword && azari >= 50) { spendAzari(50, "combo"); combatSkills.combo = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariCharm && azari >= 45) { spendAzari(45, "azari_charm"); hasAzariCharm = true; sfxBuy(); }
      }
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
  if (gameState === ST_LEVEL_EDITOR) {
    if (btn9) {
      gameState = ST_MENU;
      menuSubState = "slots";
      menuSelection = 5;
    } else if (btn0) {
      saveCustomEditorLevel();
    }
    return;
  }
  if (gameState === ST_MENU) {
    if (device !== "play") return;
    if (menuSubState === "controls_config") {
      if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
      if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { controlsConfigActionSelection = (controlsConfigActionSelection - 1 + controlActions.length) % controlActions.length; gamepadMenuAxisLock = 1; }
      if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { controlsConfigActionSelection = (controlsConfigActionSelection + 1) % controlActions.length; gamepadMenuAxisLock = 1; }
      if (btn14) controlsConfigSlot = (controlsConfigSlot + 3) % 4;
      if (btn15) controlsConfigSlot = (controlsConfigSlot + 1) % 4;
      if (controlsConfigListening) {
        for (var padIndex = 0; padIndex < 32; padIndex++) {
          if (gpButtons[padIndex] && !prevGPButtons[padIndex]) {
            var padBinding = controlActions[controlsConfigActionSelection].pad;
            padBinding[controlsConfigSlot] = padIndex;
            saveControlBindings();
            controlsConfigListening = false;
            break;
          }
        }
      } else if (btn0) {
        controlsConfigListening = true;
      }
      return;
    }
    if (menuSubState === "settings") {
      if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
      if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection - 1 + 5) % 5; gamepadMenuAxisLock = 1; }
      if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection + 1) % 5; gamepadMenuAxisLock = 1; }
      if (settingsSelection === 2 && (btn14 || btn15)) { brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (btn15 ? 0.1 : -0.1))); }
      if (settingsSelection === 3 && (btn14 || btn15)) adjustGameSpeed(btn15 ? 1 : -1);
      if (btn0) {
        if (settingsSelection === 0) { settingsReturn = true; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = true; gameState = ST_DEVICE; }
        if (settingsSelection === 4) { controlsConfigDevice = "pc"; controlsConfigSelection = 0; controlsConfigActionSelection = 0; controlsConfigListening = false; menuSubState = "controls_config"; }
      }
      return;
    }
    if (menuSubState === "difficulty") {
      if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
      if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { difficultySelection = (difficultySelection - 1 + difficultyOptions.length) % difficultyOptions.length; gamepadMenuAxisLock = 1; }
      if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { difficultySelection = (difficultySelection + 1) % difficultyOptions.length; gamepadMenuAxisLock = 1; }
      if (btn0 || (gpButtons[1] && !prevGPButtons[1])) {
        applyDifficultyToNewGame();
        resetAll(); gameState = ST_PLAYING; startMusic(); updateUI(); menuSubState = "slots";
      }
      return;
    }
    if (menuSubState === "levels") {
      if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
      if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { levelsSelection = (levelsSelection - 1 + 2) % 2; gamepadMenuAxisLock = 1; }
      if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { levelsSelection = (levelsSelection + 1) % 2; gamepadMenuAxisLock = 1; }
      if (btn0) {
        if (levelsSelection === 0) {
          if (startCustomLevel()) menuSubState = "slots";
        } else {
          openNewEditorLevel();
          menuSubState = "slots";
        }
      }
      return;
    }
    if (menuSubState === "guide") {
      if (btn9) menuSubState = "slots";
      return;
    }
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection - 1 + 8) % 8; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection + 1) % 8; gamepadMenuAxisLock = 1; }
    if (btn0 || (gpButtons[1] && !prevGPButtons[1])) {
      activeSlot = menuSelection;
      if (menuSelection === 5) {
        menuSubState = "levels";
        levelsSelection = 0;
        return;
      }
      if (menuSelection === 6) {
        menuSubState = "settings";
        settingsSelection = 0;
        return;
      }
      if (menuSelection === 7) {
        menuSubState = "guide";
        return;
      }
      var saves = getSaves();
      if (saves.slots[menuSelection]) {
        if (loadGame(menuSelection)) { gameState = ST_PLAYING; startMusic(); updateUI(); }
      } else {
        difficultySelection = 1;
        beginNewGameFromDifficulty();
      }
    }
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "controls") {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { controlsConfigSelection = (controlsConfigSelection + 2) % 3; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { controlsConfigSelection = (controlsConfigSelection + 1) % 3; gamepadMenuAxisLock = 1; }
    if (btn0) {
      controlsConfigSlot = 0;
      if (controlsConfigSelection === 0) { controlsConfigDevice = "play"; pauseSubState = "controls_pad"; }
      else if (controlsConfigSelection === 1) { controlsConfigDevice = "pc"; pauseSubState = "controls_keys"; }
      else { touchEditSelection = 0; pauseSubState = "controls_touch"; applyTouchLayout(); }
    }
    return;
  }
  if (gameState === ST_PAUSED && (pauseSubState === "controls_keys" || pauseSubState === "controls_pad")) {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { controlsConfigActionSelection = (controlsConfigActionSelection - 1 + controlActions.length) % controlActions.length; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { controlsConfigActionSelection = (controlsConfigActionSelection + 1) % controlActions.length; gamepadMenuAxisLock = 1; }
    if (btn14) controlsConfigSlot = (controlsConfigSlot + 3) % 4;
    if (btn15) controlsConfigSlot = (controlsConfigSlot + 1) % 4;
    if (controlsConfigListening) {
      for (var controlsPadIndex = 0; controlsPadIndex < 32; controlsPadIndex++) {
        if (gpButtons[controlsPadIndex] && !prevGPButtons[controlsPadIndex]) {
          if (pauseSubState === "controls_pad") {
            controlActions[controlsConfigActionSelection].pad[controlsConfigSlot] = controlsPadIndex;
          }
          saveControlBindings();
          controlsConfigListening = false;
          break;
        }
      }
    } else if (btn0) controlsConfigListening = true;
    if (btn9) pauseSubState = "controls";
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "controls_touch") {
    if (btn12) touchEditSelection = (touchEditSelection + 2) % 3;
    if (btn13) touchEditSelection = (touchEditSelection + 1) % 3;
    var touchPadDirection = btn14 ? -1 : (btn15 ? 1 : 0);
    if (touchPadDirection) {
      if (touchEditSelection === 0) touchLayout.joystick.x = Math.max(0, Math.min(82, touchLayout.joystick.x + touchPadDirection * 2));
      if (touchEditSelection === 1) touchLayout.actions.x = Math.max(0, Math.min(82, touchLayout.actions.x + touchPadDirection * 2));
      if (touchEditSelection === 2) touchLayout.opacity = Math.max(0.2, Math.min(1, touchLayout.opacity + touchPadDirection * 0.05));
      applyTouchLayout();
      saveTouchLayout();
    }
    if (btn9) pauseSubState = "controls";
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "settings") {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection - 1 + 5) % 5; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection + 1) % 5; gamepadMenuAxisLock = 1; }
    if (settingsSelection === 2 && (btn14 || btn15)) { brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (btn15 ? 0.1 : -0.1))); }
    if (settingsSelection === 3 && (btn14 || btn15)) adjustGameSpeed(btn15 ? 1 : -1);
    if (btn0) {
      if (settingsSelection === 0) { settingsReturn = "pause"; gameState = ST_LANGUAGE; }
      if (settingsSelection === 1) { settingsReturn = "pause"; gameState = ST_DEVICE; }
    }
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "diary") {
    if (btn14 || (gpAxes.x < -0.5 && gamepadMenuAxisLock === 0)) {
      diaryCategory = "enemies";
      gamepadMenuAxisLock = 1;
    }
    if (btn15 || (gpAxes.x > 0.5 && gamepadMenuAxisLock === 0)) {
      diaryCategory = "bosses";
      gamepadMenuAxisLock = 1;
    }
    return;
  }
  if (gameState === ST_PAUSED && pauseSubState === "menu") {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { pauseSelection = (pauseSelection - 1 + 7) % 7; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { pauseSelection = (pauseSelection + 1) % 7; gamepadMenuAxisLock = 1; }
    if (btn0) {
      if (pauseSelection === 0) gameState = ST_PLAYING;
      if (pauseSelection === 1) pauseSubState = "diary";
      if (pauseSelection === 2) { twoPlayerMode = !twoPlayerMode; updateUI(); }
      if (pauseSelection === 3) pauseSubState = "controls";
      if (pauseSelection === 4) pauseSubState = "audio";
      if (pauseSelection === 5) pauseSubState = "settings";
      if (pauseSelection === 6) { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; }
    }

    return;
  }
  if (btn8) {
    if (gameState === ST_PLAYING) { inventoryOpen = !inventoryOpen; if (inventoryOpen) gameState = ST_INVENTORY; else gameState = ST_PLAYING; return; }
    else if (gameState === ST_INVENTORY) { inventoryOpen = false; mapOpen = false; gameState = ST_PLAYING; return; }
  }
  if (gameState === ST_DIALOGUE) {
    if (btn0 || gpButtons[1] && !prevGPButtons[1]) advanceBossDialogue();
    return;
  }
  if (gameState === ST_HOUSE) {
    if (btn9) {
      currentHouse = null;
      bossDialogueLines = [];
      gameState = ST_PLAYING;
    } else if (btn0 || gpButtons[1] && !prevGPButtons[1]) {
      if (bossDialogueIndex < bossDialogueLines.length - 1) bossDialogueIndex++;
      else {
        currentHouse = null;
        bossDialogueLines = [];
        gameState = ST_PLAYING;
      }
    }
    return;
  }
  if (bossVictory.active && (btn0 || gpButtons[1] && !prevGPButtons[1])) {
    bossVictory.active = false;
    return;
  }
  if (btn9) {
    if (gameState === ST_DEVICE) {
      deviceSelection = (deviceSelection + 1) % devices.length;
      return;
    }
    if (shopOpen) { shopOpen = false; shopMenuOpen = false; shopConfirm = -1; shopExitCooldown = 30; keys["e"] = false; player.x = shopPreviousX; player.y = shopPreviousY; return; }
    if (gameState === ST_PLAYING) { gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause(); requestInterstitialAd("pause"); return; }
    else if (gameState === ST_PAUSED) { if (pauseSubState === "diary" || pauseSubState === "controls" || pauseSubState === "controls_keys" || pauseSubState === "controls_touch" || pauseSubState === "audio") pauseSubState = "menu"; else gameState = ST_PLAYING; return; }
    else if (gameState === ST_INVENTORY) { inventoryOpen = false; mapOpen = false; gameState = ST_PLAYING; return; }
  }
}

function beginNewGameFromDifficulty() {
  applyDifficultyToNewGame();
  resetAll();
  menuSubState = "slots";
  introTimer = 0;
  gameState = ST_INTRO;
  trackGameEvent("game_start", { game_mode: gameMode, difficulty: difficulty });
  trackGameEvent("level_start", { level: 1, room: 0 });
  if (gameMode === "infinite") trackGameEvent("infinite_mode_start", { difficulty: difficulty });
  updateUI();
}

function finishIntro() {
  if (gameState !== ST_INTRO) return;
  gameState = ST_PLAYING;
  startMusic();
  updateUI();
}

function setupTouchControls() {
  var existing = document.getElementById("touchControls");
  if (existing) existing.remove();
  document.body.classList.toggle("touch-device", device === "touch");
  if (device !== "touch") return;
  touchControlsSignature = getTouchControlsSignature();
  var controls = document.createElement("div");
  controls.id = "touchControls";
  controls.innerHTML = '<div class="touchPad" aria-label="Joystick de movimiento"><div class="touchJoystick"><div class="touchKnob">●</div></div></div>' +
    '<div class="touchActions">' +
    '<button class="touchJump" data-key=" " aria-label="Saltar">⬆</button>' +
    (hasSword ? '<button data-key="x" aria-label="Atacar">⚔</button>' : '') +
    '<button data-key="e" aria-label="Interactuar">✦</button>' +
    '<button data-key="escape" aria-label="Pausa">Ⅱ</button>' +
    (bossAbilities.guardian ? '<button data-key="c" aria-label="Usar escudo">🛡</button>' : '') +
    (hasDash ? '<button data-key="shift" aria-label="Dash">↯</button>' : '') +
    (bombs > 0 ? '<button data-key="b" aria-label="Lanzar bomba">💣</button>' : '') +
    '<button class="touchDelete" data-key="delete" aria-label="Borrar partida">🗑</button>' +
    '</div>';
  var joystick = controls.querySelector(".touchJoystick");
  var knob = controls.querySelector(".touchKnob");
  var joystickPointer = null;
  var lastMenuDirection = "";
  function resetJoystick() {
    joystickPointer = null;
    knob.style.transform = "translate(-50%, -50%)";
    keys.a = false;
    keys.d = false;
  }
  function moveJoystick(event) {
    if (joystickPointer !== event.pointerId) return;
    var rect = joystick.getBoundingClientRect();
    var dx = event.clientX - (rect.left + rect.width / 2);
    var dy = event.clientY - (rect.top + rect.height / 2);
    var radius = rect.width * 0.34;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > radius) {
      dx *= radius / distance;
      dy *= radius / distance;
    }
    knob.style.transform = "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px))";
    var deadZone = rect.width * 0.2;
    keys.a = dx < -deadZone;
    keys.d = dx > deadZone;
    if (gameState !== ST_PLAYING && gameState !== ST_INVENTORY) {
      var direction = Math.abs(dy) > deadZone ? (dy < 0 ? "ArrowUp" : "ArrowDown") : "";
      if (direction && direction !== lastMenuDirection) {
        window.dispatchEvent(new KeyboardEvent("keydown", {key: direction, code: direction}));
      }
      lastMenuDirection = direction;
    }
  }
  joystick.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    joystickPointer = event.pointerId;
    joystick.setPointerCapture(event.pointerId);
    moveJoystick(event);
  });
  joystick.addEventListener("pointermove", function(event) {
    event.preventDefault();
    moveJoystick(event);
  });
  joystick.addEventListener("pointerup", resetJoystick);
  joystick.addEventListener("pointercancel", resetJoystick);
  joystick.addEventListener("lostpointercapture", resetJoystick);
  controls.querySelectorAll("button").forEach(function(button) {
    var key = button.getAttribute("data-key");
    var buttonPointer = null;
    var getVirtualKey = function() {
      if (gameState === ST_MENU || gameState === ST_LEVEL_EDITOR) {
        if (key === "a") return "ArrowUp";
        if (key === "d") return "ArrowDown";
        if (key === " ") return "Enter";
      }
      return key === " " ? " " : key;
    };
    var press = function(event) {
      event.preventDefault();
      if (gameState === ST_PAUSED && pauseSubState === "controls_touch") return;
      if (buttonPointer !== null) return;
      buttonPointer = event.pointerId;
      button.setPointerCapture(event.pointerId);
      button.classList.add("pressed");
      if (key === "delete") {
        var deleteKey = gameState === ST_MENU && menuSubState === "confirm_delete" ? "Enter" : "Delete";
        window.dispatchEvent(new KeyboardEvent("keydown", {key: deleteKey, code: deleteKey}));
        return;
      }
      if (key === "escape") {
        window.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", code: "Escape"}));
        return;
      }
      window.dispatchEvent(new KeyboardEvent("keydown", {key: getVirtualKey(), code: getVirtualKey() === " " ? "Space" : getVirtualKey()}));
      keys[key] = true;
    };
    var release = function(event) {
      if (gameState === ST_PAUSED && pauseSubState === "controls_touch") return;
      if (buttonPointer !== event.pointerId) return;
      event.preventDefault();
      buttonPointer = null;
      button.classList.remove("pressed");
      window.dispatchEvent(new KeyboardEvent("keyup", {key: getVirtualKey(), code: getVirtualKey() === " " ? "Space" : getVirtualKey()}));
      if (key !== "escape") keys[key] = false;
    };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  });
  document.body.appendChild(controls);
  applyTouchLayout();
  updateTouchMenuButton();
  var touchDrag = null;
  controls.addEventListener("pointerdown", function(event) {
    if (gameState !== ST_PAUSED || pauseSubState !== "controls_touch") return;
    var target = event.target.closest(".touchPad, .touchActions button");
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (target.classList.contains("touchActions")) return;
    var targetKey = target.getAttribute("data-key");
    if (targetKey && targetKey !== "escape") keys[targetKey] = false;
    target.classList.remove("pressed");
    touchDrag = {
      pointerId: event.pointerId,
      group: target.classList.contains("touchPad") ? "joystick" : "button",
      key: targetKey,
      element: target,
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
    controls.setPointerCapture(event.pointerId);
  }, true);
  controls.addEventListener("pointermove", function(event) {
    if (!touchDrag || touchDrag.pointerId !== event.pointerId) return;
    event.preventDefault();
    if (Math.abs(event.clientX - touchDrag.startX) > 8 ||
        Math.abs(event.clientY - touchDrag.startY) > 8) {
      touchDrag.moved = true;
    }

    var x = Math.max(0, Math.min(92, event.clientX / window.innerWidth * 100 - 4));
    var y = Math.max(4, Math.min(92, event.clientY / window.innerHeight * 100 - 4));
    if (touchDrag.group === "button") {
      touchLayout.buttons[touchDrag.key] = { x: x, y: y };
    } else {
      touchLayout.joystick.x = x;
      touchLayout.joystick.y = y;
    }
    applyTouchLayout();
  }, true);
  controls.addEventListener("pointerup", function(event) {
    if (!touchDrag || touchDrag.pointerId !== event.pointerId) return;
    event.preventDefault();
    if (touchDrag.key === "escape" && !touchDrag.moved) {
      saveTouchLayout();
      pauseSubState = "controls";
    }
    touchDrag = null;
    saveTouchLayout();
  }, true);
  controls.addEventListener("pointercancel", function(event) {
    if (!touchDrag || touchDrag.pointerId !== event.pointerId) return;
    touchDrag = null;
  }, true);
}

function getTouchControlsSignature() {
  return [hasSword, hasDash, !!bossAbilities.guardian, bombs > 0].join("|");
}

function updateTouchMenuButton() {
  var button = document.querySelector("#touchControls .touchDelete");
  if (!button) return;
  button.style.display = gameState === ST_MENU && menuSubState === "slots" ? "block" : "none";
}
function buyArmorUpgrade() {
  var armorPrices = [50, 80, 120];
  if (armorLevel >= 3) return false;
  var price = armorPrices[armorLevel];
  if (azari < price) return false;
  if (!spendAzari(price, "armor_upgrade")) return false;
  armorLevel++;
  armorId = "plate";
  sfxBuy();
  return true;
}
