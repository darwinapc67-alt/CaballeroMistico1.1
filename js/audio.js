function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function playTone(freq, duration, type, vol, delay) {
  initAudio();
  if (!audioCtx || !sfxEnabled) return;
  try {
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(vol * sfxVolume * masterVolume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
  } catch(e) {}
}

function playMusicTone(freq, duration, type, vol, delay) {
  initAudio();
  if (!audioCtx || !musicPlaying) return;
  try {
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(vol * musicVolume * masterVolume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
  } catch(e) {}
}

function playNoise(duration, vol, delay) {
  initAudio();
  if (!audioCtx || !sfxEnabled) return;
  try {
    var bufferSize = Math.floor(audioCtx.sampleRate * duration);
    var buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    var noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    var gain = audioCtx.createGain();
    gain.gain.setValueAtTime(vol * sfxVolume * masterVolume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
    noise.connect(gain); gain.connect(audioCtx.destination);
    noise.start(audioCtx.currentTime + delay);
  } catch(e) {}
}

function sfxJump() { playTone(220, 0.12, "square", 0.08, 0); playTone(330, 0.10, "square", 0.06, 0.03); }
function sfxAttack() { playTone(880, 0.08, "sawtooth", 0.06, 0); playTone(1100, 0.06, "sawtooth", 0.04, 0.03); }
function sfxHit() { playNoise(0.15, 0.12, 0); playTone(150, 0.15, "square", 0.10, 0); playTone(100, 0.20, "sawtooth", 0.08, 0.05); }
function sfxEnemyDie() { playTone(400, 0.10, "square", 0.08, 0); playTone(300, 0.12, "square", 0.06, 0.05); playTone(200, 0.15, "sine", 0.05, 0.10); }
function sfxCoin() { playTone(1200, 0.06, "sine", 0.10, 0); playTone(1600, 0.08, "sine", 0.08, 0.05); }
function sfxHeal() { playTone(523, 0.15, "sine", 0.07, 0); playTone(659, 0.15, "sine", 0.07, 0.12); playTone(784, 0.20, "sine", 0.07, 0.24); }
function sfxEquip() { playTone(660, 0.10, "sine", 0.10, 0); playTone(880, 0.15, "sine", 0.10, 0.08); playTone(1100, 0.20, "sine", 0.08, 0.16); }
function sfxTransition() { playTone(200, 0.3, "sine", 0.05, 0); playTone(300, 0.3, "sine", 0.05, 0.15); }
function sfxDiscovery() { playTone(523, 0.10, "sine", 0.08, 0); playTone(659, 0.10, "sine", 0.08, 0.08); playTone(784, 0.10, "sine", 0.08, 0.16); playTone(1047, 0.20, "sine", 0.08, 0.24); }
function sfxBuy() { playTone(880, 0.08, "sine", 0.10, 0); playTone(1100, 0.10, "sine", 0.10, 0.06); playTone(1320, 0.15, "sine", 0.08, 0.12); }
function sfxFall() { playTone(200, 0.4, "sine", 0.06, 0); playTone(150, 0.5, "sine", 0.05, 0.15); playTone(100, 0.6, "sine", 0.04, 0.30); }
function sfxStalactiteFall() { playTone(80, 0.3, "sawtooth", 0.06, 0); playNoise(0.2, 0.08, 0.05); }
function sfxDeath() { playTone(800, 0.1, "square", 0.10, 0); playTone(600, 0.1, "square", 0.08, 0.08); playTone(400, 0.2, "sawtooth", 0.06, 0.16); playTone(200, 0.3, "sawtooth", 0.04, 0.28); playNoise(0.3, 0.15, 0); }
function sfxPlatformLand() { playTone(150, 0.06, "sine", 0.05, 0); playTone(120, 0.08, "sine", 0.04, 0.03); }
function sfxBow() { playTone(520, 0.06, "triangle", 0.08, 0); playTone(760, 0.08, "sine", 0.05, 0.04); }
function sfxPause() { playTone(440, 0.08, "sine", 0.08, 0); playTone(330, 0.12, "sine", 0.06, 0.06); }
function sfxNpc() { playTone(520, 0.08, "triangle", 0.08, 0); playTone(680, 0.1, "triangle", 0.06, 0.08); }
function speakShopGreeting(text) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
  window.speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.9;
  utterance.pitch = 0.75;
  utterance.volume = 0.85;
  window.speechSynthesis.speak(utterance);
}
function speakBossDialogue(text) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    sfxBossVoice();
    return;
  }
  window.speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(translateText(text));
  utterance.lang = language === "pt" ? "pt-BR" : (language === "en" ? "en-US" : "es-ES");
  utterance.rate = 0.82;
  utterance.pitch = 0.62;
  utterance.volume = 0.9;
  window.speechSynthesis.speak(utterance);
}
function sfxBossVoice() { playTone(110, 0.18, "sawtooth", 0.08, 0); playTone(82, 0.24, "triangle", 0.06, 0.1); }
function sfxWaterDrop() { playTone(1050, 0.05, "sine", 0.07, 0); playTone(1450, 0.09, "sine", 0.05, 0.04); }
function sfxBossDoorsLock() { playTone(95, 0.28, "sawtooth", 0.12, 0); playTone(58, 0.42, "square", 0.1, 0.08); playNoise(0.18, 0.08, 0.04); }
function sfxBossDoorsOpen() { playTone(180, 0.16, "sine", 0.1, 0); playTone(360, 0.22, "sine", 0.09, 0.12); playTone(720, 0.28, "triangle", 0.07, 0.24); }
function sfxBossPhase() { playTone(70, 0.25, "sawtooth", 0.12, 0); playTone(140, 0.25, "square", 0.08, 0.12); playNoise(0.18, 0.08, 0.04); }

function playAmbientChord(baseFreq, delay) {
  if (!audioCtx || !musicPlaying) return;
  playMusicTone(baseFreq, 3.5, "sine", 0.22, delay);
  playMusicTone(baseFreq * 1.25, 3.2, "triangle", 0.13, delay + 0.1);
  playMusicTone(baseFreq * 1.5, 2.8, "sine", 0.09, delay + 0.2);
  playMusicTone(baseFreq * 2, 2.5, "sine", 0.06, delay + 0.3);
  if (currentMusicTrack === "guardian" || currentMusicTrack === "queen_larva" || currentMusicTrack === "abyssal_knight" || currentMusicTrack === "danger") {
    playMusicTone(baseFreq * 2, 0.22, "square", 0.16, delay);
    playMusicTone(baseFreq * 1.5, 0.18, "square", 0.12, delay + 0.28);
    playMusicTone(baseFreq * 2.5, 0.26, "sawtooth", 0.1, delay + 0.56);
    playMusicTone(baseFreq * 1.25, 0.2, "square", 0.12, delay + 0.9);
    playMusicTone(baseFreq * 2, 0.22, "square", 0.14, delay + 1.18);
    playMusicTone(baseFreq * 3, 0.3, "triangle", 0.1, delay + 1.5);
  }
}

var currentMusicTrack = "exploration";
function zoneMusicTrack() {
  if (gameState === ST_DIALOGUE) return currentMusicTrack;
  var activeBoss = enemies.find ? enemies.find(function(enemy) {
    return enemy.boss && enemy.room === currentRoom && !enemy.dead;
  }) : null;
  if (activeBoss) return activeBoss.type;
  // Las dos primeras habitaciones funcionan como introducción y conservan
  // su música de exploración aunque contengan enemigos de tutorial.
  var nearbyDanger = false;
  enemies.forEach(function(enemy) {
    if (currentRoom > 1 && enemy.room === currentRoom && !enemy.dead && !enemy.boss &&
        Math.abs(enemy.x - player.x) < 120 &&
        Math.abs(enemy.y - player.y) < 150) nearbyDanger = true;
  });
  if (nearbyDanger) return "danger";
  return "zone_" + Math.min(currentRoom, 9);
}
function updateAudioEnvironment() {
  if (gameState !== ST_PLAYING || shopOpen) return;
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  if (!musicPlaying) {
    startMusic(zoneMusicTrack());
    return;
  }
  var track = zoneMusicTrack();
  if (currentMusicTrack !== track) startMusic(track);
  ambientTimer--;
  if (ambientTimer <= 0) {
    ambientTimer = 180 + Math.floor(Math.random() * 240);
    if (currentRoom === 0 || currentRoom === 1 || currentRoom === 9) sfxWaterDrop();
    else if (currentRoom >= 10) sfxCaveEcho();
    else sfxWind();
  }
}
function startMusic(trackName) {
  initAudio();
  trackName = trackName || "exploration";
  if (musicPlaying && currentMusicTrack === trackName) return;
  if (musicPlaying) stopMusic();
  currentMusicTrack = trackName;
  musicPlaying = true;
  var chordSets = {
    exploration: [82.41, 98, 110, 130.81, 110, 98, 82.41, 73.42],
    zone_0: [82.41, 98, 110, 98, 73.42, 82.41],
    zone_1: [65.41, 73.42, 87.31, 73.42, 61.74, 65.41],
    zone_2: [98, 110, 130.81, 146.83, 130.81, 110],
    zone_3: [73.42, 82.41, 98, 110, 98, 82.41],
    zone_4: [55, 65.41, 73.42, 82.41, 73.42, 61.74],
    zone_5: [110, 123.47, 146.83, 164.81, 146.83, 123.47],
    zone_6: [61.74, 73.42, 82.41, 98, 82.41, 73.42],
    zone_7: [46.25, 55, 65.41, 73.42, 65.41, 55],
    zone_8: [82.41, 92.5, 110, 123.47, 110, 92.5],
    zone_9: [130.81, 146.83, 164.81, 196, 164.81, 146.83],
    danger: [55, 58.27, 65.41, 77.78, 65.41, 58.27],
    guardian: [55, 65.41, 73.42, 82.41, 73.42, 65.41],
    queen_larva: [73.42, 87.31, 98, 110, 98, 87.31],
    abyssal_knight: [46.25, 55, 61.74, 69.3, 61.74, 55]
  };
  var chords = chordSets[trackName] || chordSets.exploration;
  var chordIdx = 0;
  playAmbientChord(chords[chordIdx], 0, trackName);
  musicInterval = setInterval(function() {
    if (!musicPlaying) return;
    chordIdx = (chordIdx + 1) % chords.length;
    playAmbientChord(chords[chordIdx], 0, trackName);
  }, 3200);
}
function stopMusic() { musicPlaying = false; if (musicInterval) { clearInterval(musicInterval); musicInterval = null; } }
function startBossMusic(type) { startMusic(type || "guardian"); }
function toggleMusic() { initAudio(); if (musicPlaying) stopMusic(); else startMusic(); }
function toggleSfx() { sfxEnabled = !sfxEnabled; }
function adjustMusicVolume(delta) { musicVolume = Math.max(0, Math.min(1, musicVolume + delta)); }
function adjustSfxVolume(delta) { sfxVolume = Math.max(0, Math.min(1, sfxVolume + delta)); }
function adjustMasterVolume(delta) { masterVolume = Math.max(0, Math.min(1, masterVolume + delta)); }
function adjustAudioVolume(delta) {
  if (audioSelection === 0) adjustMasterVolume(delta);
  else if (audioSelection === 1) adjustMusicVolume(delta);
  else adjustSfxVolume(delta);
}
function sfxWind() { playNoise(0.35, 0.035, 0); playTone(180, 0.35, "sine", 0.025, 0.05); }
function sfxCaveEcho() { playTone(90, 0.35, "triangle", 0.04, 0); playTone(135, 0.5, "sine", 0.025, 0.18); }