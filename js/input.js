window.addEventListener("keydown", function(e) {
  initAudio();
  var k = e.key.toLowerCase();
  var up = e.key === "ArrowUp" || e.code === "ArrowUp";
  var down = e.key === "ArrowDown" || e.code === "ArrowDown";
  var confirm = e.key === "Enter" || e.key === "Return" || e.code === "Enter" || e.code === "NumpadEnter" || e.key === " ";

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
    if (up) { inventorySelection = (inventorySelection - 1 + inventoryItems) % inventoryItems; e.preventDefault(); return; }
    if (down) { inventorySelection = (inventorySelection + 1) % inventoryItems; e.preventDefault(); return; }
    if (k === "e" && inventorySelection === 8 && hasOldKey) {
      keyReady = true;
      inventoryOpen = false;
      gameState = ST_PLAYING;
      spawnFloatText(player.x, player.y - 28, "Llave vieja preparada", "#d4af37");
      e.preventDefault(); return;
    }
    if (confirm) {
      if (inventorySelection === 0 && hasAzariCharm) toggleBlessing("greedy");
      if (inventorySelection === 1 && bossUniqueItems.guardian) toggleBlessing("stone");
      if (inventorySelection === 2 && bossUniqueItems.queen_larva) toggleBlessing("brood");
      if (inventorySelection === 3 && bossUniqueItems.abyssal_knight) toggleBlessing("abyss");
      if (inventorySelection === 4 && armorId !== "void") armorId = armorId === "cave" ? "void" : "cave";
      e.preventDefault(); return;
    }
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
    e.preventDefault();
    return;
  }

  if (gameState === ST_DEATH) {
    if (consecutiveDeaths < 3) return;
    var deathOptions = adRewardedRevive ? 3 : 2;
    if (up || k === "w") deathChoice = (deathChoice - 1 + deathOptions) % deathOptions;
    if (down || k === "s") deathChoice = (deathChoice + 1) % deathOptions;
    if (confirm) {
      if (deathChoice === 0) {
        restoreCheckpoint();
      } else if (deathChoice === 1 && adRewardedRevive) {
        adRewardedRevive = false;
        player.hp = Math.max(1, Math.ceil(player.maxHp / 2));
        player.frozen = false; playerDead = false; player.inv = 90;
        gameState = ST_PLAYING;
        showAdMessage("¡Has vuelto al combate!");
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
    if (menuSubState === "settings") {
      if (up || k === "w") { settingsSelection = (settingsSelection - 1 + 4) % 4; e.preventDefault(); return; }
      if (down || k === "s") { settingsSelection = (settingsSelection + 1) % 4; e.preventDefault(); return; }
      if (settingsSelection === 2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (e.key === "ArrowRight" ? 0.1 : -0.1)));
        e.preventDefault(); return;
      }
      if (confirm) {
        if (settingsSelection === 0) { settingsReturn = true; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = true; gameState = ST_DEVICE; }
        if (settingsSelection === 3) { adminFromSettings = true; menuSubState = "admin_password"; adminPassword = ""; adminMessage = ""; }
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
        if (menuSelection === 7) { menuSubState = "admin_password"; adminFromSettings = false; adminPassword = ""; adminMessage = ""; e.preventDefault(); return; }
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
      if (k === "y" || k === "s") { deleteSave(slotToDelete); menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
      if (k === "n" || e.key === "Escape") { menuSubState = "slots"; slotToDelete = -1; e.preventDefault(); return; }
    }
    return;
  }

  if (gameState === ST_PAUSED) {
    if (pauseSubState === "settings") {
      if (up || k === "w") { settingsSelection = (settingsSelection - 1 + 4) % 4; e.preventDefault(); return; }
      if (down || k === "s") { settingsSelection = (settingsSelection + 1) % 4; e.preventDefault(); return; }
      if (settingsSelection === 2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (e.key === "ArrowRight" ? 0.1 : -0.1)));
        e.preventDefault(); return;
      }
      if (confirm) {
        if (settingsSelection === 0) { settingsReturn = "pause"; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = "pause"; gameState = ST_DEVICE; }
        if (settingsSelection === 3) { adminFromSettings = true; settingsReturn = "pause"; menuSubState = "admin_password"; gameState = ST_MENU; adminPassword = ""; adminMessage = ""; }
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
    if (pauseSubState === "controls") { if (e.key === "Escape") { pauseSubState = "menu"; e.preventDefault(); } return; }
    if (up || k === "w") { pauseSelection = (pauseSelection - 1 + 7) % 7; e.preventDefault(); return; }
    if (down || k === "s") { pauseSelection = (pauseSelection + 1) % 7; e.preventDefault(); return; }
    if (confirm) {
      if (pauseSelection === 0) gameState = ST_PLAYING;
      if (pauseSelection === 1) pauseSubState = "diary";
      if (pauseSelection === 2) { twoPlayerMode = !twoPlayerMode; updateUI(); }
      if (pauseSelection === 3) { pauseSubState = "controls"; }
      if (pauseSelection === 4) pauseSubState = "audio";
      if (pauseSelection === 5) pauseSubState = "settings";
      if (pauseSelection === 6) { if (activeSlot >= 0) saveGame(activeSlot); gameState = ST_MENU; menuSubState = "slots"; }
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
    if (e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") { keys["shift"] = true; e.preventDefault(); }
    if (e.key === "m" || e.key === "M") { initAudio(); toggleMusic(); e.preventDefault(); }
    if (e.key === "n" || e.key === "N") { initAudio(); toggleSfx(); e.preventDefault(); }
  }

  if (shopOpen) {
    if (shopAnim > 0) return;
    if (!shopMenuOpen) {
      if (e.key === "e" || e.key === "E") {
        var vendorDistance = Math.abs(player.x - 680) + Math.abs(player.y - 445);
        if (vendorDistance < 115) {
          shopMenuOpen = true; menuSelection = 0; sfxNpc();
          shopGreeting = shopId === 0 ? "Forastero... acércate. Tengo cosas que podrían ayudarte." : "El corazón de la cueva aún guarda poder para ti.";
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
      if (up || k === "w") { menuSelection = (menuSelection - 1 + 10) % 10; e.preventDefault(); return; }
      if (down || k === "s") { menuSelection = (menuSelection + 1) % 10; e.preventDefault(); return; }
      if (confirm) {
        if (shopConfirm === menuSelection) {
          if (menuSelection === 0 && !hasMap && azari >= 45) { azari -= 45; hasMap = true; sfxBuy(); }
          if (menuSelection === 1 && !hasBow && azari >= 35) { azari -= 35; hasBow = true; sfxBuy(); }
          if (menuSelection === 2 && azari >= 5) { azari -= 5; arrows += 20; sfxBuy(); }
          if (menuSelection === 3 && heartFragmentsBought1 < 2 && azari >= 25) { azari -= 25; heartFragments1++; heartFragmentsBought1++; sfxBuy(); if (heartFragments1 >= 3) { heartFragments1 -= 3; player.maxHp++; player.hp = player.maxHp; } }
          if (menuSelection === 4 && heartFragmentsBought2 < 2 && azari >= 25) { azari -= 25; heartFragments2++; heartFragmentsBought2++; sfxBuy(); if (heartFragments2 >= 3) { heartFragments2 -= 3; player2.maxHp++; player2.hp = player2.maxHp; } }
          if (menuSelection === 5 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; sfxBuy(); }
          if (menuSelection === 6 && !hasAzariMagnet && azari >= 60) { azari -= 60; hasAzariMagnet = true; sfxBuy(); }
          if (menuSelection === 7 && azariBagLevel < 5) {
            var bagPrices = [80, 120, 180, 260, 350];
            var bagPrice = bagPrices[azariBagLevel];
            if (azari >= bagPrice) { azari -= bagPrice; azariBagLevel++; hasAzariBag = true; sfxBuy(); }
          }
          if (menuSelection === 8 && ((!hasLantern && azari >= 70) || (hasLantern && lanternLevel < 3 && azari >= (lanternLevel === 1 ? 110 : 180)))) {
            azari -= hasLantern ? (lanternLevel === 1 ? 110 : 180) : 70;
            hasLantern = true; lanternLevel = Math.min(3, lanternLevel + 1); sfxBuy();
          }
          if (menuSelection === 9 && !hasOldKey && azari >= 40) { azari -= 40; hasOldKey = true; sfxBuy(); }
          shopConfirm = -1;
        } else shopConfirm = menuSelection;
        e.preventDefault(); return;
      }
    }
    if (shopId === 1) {
      if (e.key === "ArrowUp" || k === "w") { menuSelection = (menuSelection - 1 + 7) % 7; e.preventDefault(); return; }
      if (e.key === "ArrowDown" || k === "s") { menuSelection = (menuSelection + 1) % 7; e.preventDefault(); return; }
      if (e.key === "Enter") {
        if (menuSelection === 0 && swordLevel < 3 && hasSword && azari >= 30) { azari -= 30; swordLevel++; sfxBuy(); }
        if (menuSelection === 1 && bowLevel < 3 && hasBow && azari >= 30) { azari -= 30; bowLevel++; sfxBuy(); }
        if (menuSelection === 2 && hasBow && arrowType === "normal" && azari >= 20) { azari -= 20; arrowType = "heavy"; sfxBuy(); }
        if (menuSelection === 3 && !combatSkills.charged && hasSword && azari >= 35) { azari -= 35; combatSkills.charged = true; sfxBuy(); }
        if (menuSelection === 4 && !combatSkills.aerial && hasSword && azari >= 35) { azari -= 35; combatSkills.aerial = true; sfxBuy(); }
        if (menuSelection === 5 && !combatSkills.combo && hasSword && azari >= 50) { azari -= 50; combatSkills.combo = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; sfxBuy(); }
        shopConfirm = -1;
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
    if (e.key === "Escape") { shopOpen = false; shopMenuOpen = false; shopConfirm = -1; shopExitCooldown = 30; player.x = shopPreviousX; player.y = shopPreviousY; e.preventDefault(); return; }
  }
}, true);

function toggleBlessing(id) {
  var index = equippedBlessings.indexOf(id);
  if (index >= 0) { equippedBlessings.splice(index, 1); return; }
  if (equippedBlessings.length >= blessingSlots) equippedBlessings.shift();
  equippedBlessings.push(id);
}

document.addEventListener("keyup", function(e) {
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
  if (e.key === "Shift") keys["shift"] = false;
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
  var btn14 = gpButtons[14] && !prevGPButtons[14];
  var btn15 = gpButtons[15] && !prevGPButtons[15];
  if (shopOpen && (shopId === 0 || shopId === 1)) {
    var shopOptions = shopId === 0 ? 10 : 7;
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection - 1 + shopOptions) % shopOptions; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { menuSelection = (menuSelection + 1) % shopOptions; gamepadMenuAxisLock = 1; }
    if (btn0) {
      if (shopId === 0) {
        if (menuSelection === 0 && !hasMap && azari >= 45) { azari -= 45; hasMap = true; sfxBuy(); }
        if (menuSelection === 1 && !hasBow && azari >= 35) { azari -= 35; hasBow = true; sfxBuy(); }
        if (menuSelection === 2 && azari >= 5) { azari -= 5; arrows += 20; sfxBuy(); }
        if (menuSelection === 3 && heartFragmentsBought1 < 2 && azari >= 25) { azari -= 25; heartFragments1++; heartFragmentsBought1++; sfxBuy(); if (heartFragments1 >= 3) { heartFragments1 -= 3; player.maxHp++; player.hp = player.maxHp; } }
        if (menuSelection === 4 && heartFragmentsBought2 < 2 && azari >= 25) { azari -= 25; heartFragments2++; heartFragmentsBought2++; sfxBuy(); if (heartFragments2 >= 3) { heartFragments2 -= 3; player2.maxHp++; player2.hp = player2.maxHp; } }
        if (menuSelection === 5 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariMagnet && azari >= 60) { azari -= 60; hasAzariMagnet = true; sfxBuy(); }
        if (menuSelection === 7 && azariBagLevel < 5) {
          var bagPrices2 = [80, 120, 180, 260, 350];
          var bagPrice2 = bagPrices2[azariBagLevel];
          if (azari >= bagPrice2) { azari -= bagPrice2; azariBagLevel++; hasAzariBag = true; sfxBuy(); }
        }
        if (menuSelection === 8 && ((!hasLantern && azari >= 70) || (hasLantern && lanternLevel < 3 && azari >= (lanternLevel === 1 ? 110 : 180)))) {
          azari -= hasLantern ? (lanternLevel === 1 ? 110 : 180) : 70;
          hasLantern = true; lanternLevel = Math.min(3, lanternLevel + 1); sfxBuy();
        }
      } else {
        if (menuSelection === 0 && swordLevel < 3 && hasSword && azari >= 30) { azari -= 30; swordLevel++; sfxBuy(); }
        if (menuSelection === 1 && bowLevel < 3 && hasBow && azari >= 30) { azari -= 30; bowLevel++; sfxBuy(); }
        if (menuSelection === 2 && hasBow && arrowType === "normal" && azari >= 20) { azari -= 20; arrowType = "heavy"; sfxBuy(); }
        if (menuSelection === 3 && !combatSkills.charged && hasSword && azari >= 35) { azari -= 35; combatSkills.charged = true; sfxBuy(); }
        if (menuSelection === 4 && !combatSkills.aerial && hasSword && azari >= 35) { azari -= 35; combatSkills.aerial = true; sfxBuy(); }
        if (menuSelection === 5 && !combatSkills.combo && hasSword && azari >= 50) { azari -= 50; combatSkills.combo = true; sfxBuy(); }
        if (menuSelection === 6 && !hasAzariCharm && azari >= 45) { azari -= 45; hasAzariCharm = true; sfxBuy(); }
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
    if (menuSubState === "settings") {
      if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
      if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection - 1 + 4) % 4; gamepadMenuAxisLock = 1; }
      if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection + 1) % 4; gamepadMenuAxisLock = 1; }
      if (settingsSelection === 2 && (btn14 || btn15)) { brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (btn15 ? 0.1 : -0.1))); }
      if (btn0) {
        if (settingsSelection === 0) { settingsReturn = true; gameState = ST_LANGUAGE; }
        if (settingsSelection === 1) { settingsReturn = true; gameState = ST_DEVICE; }
        if (settingsSelection === 3) { adminFromSettings = true; menuSubState = "admin_password"; adminPassword = ""; adminMessage = ""; }
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
        menuSubState = "admin_password";
        adminFromSettings = false; adminPassword = ""; adminMessage = "";
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
  if (gameState === ST_PAUSED && pauseSubState === "settings") {
    if (Math.abs(gpAxes.y) < 0.5) gamepadMenuAxisLock = 0;
    if (btn12 || (gpAxes.y < -0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection - 1 + 4) % 4; gamepadMenuAxisLock = 1; }
    if (btn13 || (gpAxes.y > 0.5 && gamepadMenuAxisLock === 0)) { settingsSelection = (settingsSelection + 1) % 4; gamepadMenuAxisLock = 1; }
    if (settingsSelection === 2 && (btn14 || btn15)) { brightnessBoost = Math.max(0, Math.min(1, brightnessBoost + (btn15 ? 0.1 : -0.1))); }
    if (btn0) {
      if (settingsSelection === 0) { settingsReturn = "pause"; gameState = ST_LANGUAGE; }
      if (settingsSelection === 1) { settingsReturn = "pause"; gameState = ST_DEVICE; }
      if (settingsSelection === 3) { adminFromSettings = true; settingsReturn = "pause"; menuSubState = "admin_password"; gameState = ST_MENU; adminPassword = ""; adminMessage = ""; }
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
    if (gameState === ST_PLAYING) { gameState = ST_PAUSED; pauseSubState = "menu"; pauseSelection = 0; sfxPause(); return; }
    else if (gameState === ST_PAUSED) { if (pauseSubState === "diary" || pauseSubState === "controls" || pauseSubState === "audio") pauseSubState = "menu"; else gameState = ST_PLAYING; return; }
    else if (gameState === ST_INVENTORY) { inventoryOpen = false; mapOpen = false; gameState = ST_PLAYING; return; }
  }
}

function beginNewGameFromDifficulty() {
  applyDifficultyToNewGame();
  resetAll();
  menuSubState = "slots";
  introTimer = 0;
  gameState = ST_INTRO;
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
  if (device !== "touch") return;
  var controls = document.createElement("div");
  controls.id = "touchControls";
  controls.innerHTML = '<div class="touchPad" aria-label="Joystick de movimiento"><div class="touchJoystick"><div class="touchKnob">●</div></div></div>' +
    '<div class="touchActions"><button class="touchJump" data-key=" " aria-label="Saltar">⬆</button><button data-key="x" aria-label="Atacar">⚔</button><button data-key="c" aria-label="Usar escudo">🛡</button><button data-key="shift" aria-label="Dash">↯</button><button data-key="e" aria-label="Interactuar">✦</button><button data-key="escape" aria-label="Pausa">Ⅱ</button></div>';
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
      button.setPointerCapture(event.pointerId);
      button.classList.add("pressed");
      if (key === "escape") {
        window.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", code: "Escape"}));
        return;
      }
      window.dispatchEvent(new KeyboardEvent("keydown", {key: getVirtualKey(), code: getVirtualKey() === " " ? "Space" : getVirtualKey()}));
      keys[key] = true;
    };
    var release = function(event) {
      event.preventDefault();
      button.classList.remove("pressed");
      window.dispatchEvent(new KeyboardEvent("keyup", {key: getVirtualKey(), code: getVirtualKey() === " " ? "Space" : getVirtualKey()}));
      if (key !== "escape") keys[key] = false;
    };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  });
  window.addEventListener("pointerup", function() {
    controls.querySelectorAll("button").forEach(function(button) {
      var key = button.getAttribute("data-key");
      if (key !== "escape") keys[key] = false;
      button.classList.remove("pressed");
    });
    resetJoystick();
  });
  document.body.appendChild(controls);
}
