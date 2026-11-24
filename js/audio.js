function initAudio() {
  musicUserInteracted = true;
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
function sfxCriticalHit() { playNoise(0.12, 0.16, 0); playTone(220, 0.08, "square", 0.12, 0); playTone(880, 0.16, "triangle", 0.11, 0.04); playTone(1320, 0.18, "sine", 0.09, 0.10); }
function sfxEnemyDie() { playTone(400, 0.10, "square", 0.08, 0); playTone(300, 0.12, "square", 0.06, 0.05); playTone(200, 0.15, "sine", 0.05, 0.10); }
function sfxCoin() { playTone(1200, 0.06, "sine", 0.10, 0); playTone(1600, 0.08, "sine", 0.08, 0.05); }
function sfxHeal() { playTone(523, 0.15, "sine", 0.07, 0); playTone(659, 0.15, "sine", 0.07, 0.12); playTone(784, 0.20, "sine", 0.07, 0.24); }
function sfxEquip() { playTone(660, 0.10, "sine", 0.10, 0); playTone(880, 0.15, "sine", 0.10, 0.08); playTone(1100, 0.20, "sine", 0.08, 0.16); }
function sfxSwordRelease() { playNoise(0.35, 0.12, 0); playTone(180, 0.35, "sawtooth", 0.08, 0); playTone(440, 0.30, "triangle", 0.10, 0.12); playTone(880, 0.45, "sine", 0.08, 0.24); }
function sfxTransition() { playTone(200, 0.3, "sine", 0.05, 0); playTone(300, 0.3, "sine", 0.05, 0.15); }
function sfxDiscovery() { playTone(523, 0.10, "sine", 0.08, 0); playTone(659, 0.10, "sine", 0.08, 0.08); playTone(784, 0.10, "sine", 0.08, 0.16); playTone(1047, 0.20, "sine", 0.08, 0.24); }
function sfxBuy() { playTone(880, 0.08, "sine", 0.10, 0); playTone(1100, 0.10, "sine", 0.10, 0.06); playTone(1320, 0.15, "sine", 0.08, 0.12); }
function sfxFall() { playTone(200, 0.4, "sine", 0.06, 0); playTone(150, 0.5, "sine", 0.05, 0.15); playTone(100, 0.6, "sine", 0.04, 0.30); }
function sfxStalactiteFall() { playTone(80, 0.3, "sawtooth", 0.06, 0); playNoise(0.2, 0.08, 0.05); }
function sfxGroundSlam() { playNoise(0.28, 0.16, 0); playTone(72, 0.24, "sawtooth", 0.1, 0); playTone(48, 0.3, "triangle", 0.08, 0.04); }
function sfxEterium() { playTone(660, 0.12, "sine", 0.1, 0); playTone(990, 0.16, "triangle", 0.08, 0.08); playTone(1320, 0.24, "sine", 0.07, 0.16); }
function sfxEteriumSkill() { playNoise(0.12, 0.14, 0); playTone(180, 0.18, "sawtooth", 0.1, 0); playTone(520, 0.22, "triangle", 0.1, 0.04); playTone(1040, 0.28, "sine", 0.09, 0.1); }
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
function sfxWaterDrop() {}
function sfxBossDoorsLock() { playTone(95, 0.28, "sawtooth", 0.12, 0); playTone(58, 0.42, "square", 0.1, 0.08); playNoise(0.18, 0.08, 0.04); }
function sfxBossDoorsOpen() { playTone(180, 0.16, "sine", 0.1, 0); playTone(360, 0.22, "sine", 0.09, 0.12); playTone(720, 0.28, "triangle", 0.07, 0.24); }
function sfxDoorOpen() { playTone(110, 0.25, "square", 0.1, 0); playTone(220, 0.3, "sawtooth", 0.08, 0.2); playNoise(0.28, 0.08, 0.04); }
function sfxBossPhase() { playTone(70, 0.25, "sawtooth", 0.12, 0); playTone(140, 0.25, "square", 0.08, 0.12); playNoise(0.18, 0.08, 0.04); }

var MUSIC_TRACKS = {
  menu: "assets/music/menu.mp3",
  normal: "assets/music/normal.mp3",
  tienda: "assets/music/tienda.mp3",
  jefe: "assets/music/jefe.mp3",
  elite: "assets/music/elite.mp3",
  gameplay: "assets/music/normal.mp3",
  boss: "assets/music/jefe.mp3",
  infinite: "assets/music/infinite.mp3"
};
var MUSIC_SCENE_TRACKS = {
  exploration: "normal",
  danger: "jefe",
  combat: "jefe",
  elite: "elite",
  boss: "jefe",
  safe: "tienda",
  infinite: "infinite"
};
var MUSIC_FALLBACK_THEMES = {
  menu: {root: 196, scale: [0, 2, 4, 7, 9], waveform: "triangle"},
  crystal: {root: 220, scale: [0, 2, 4, 7, 9], waveform: "triangle"},
  ardoris: {root: 164.81, scale: [0, 2, 4, 7, 9], waveform: "square"},
  marsh: {root: 146.83, scale: [0, 3, 5, 7, 10], waveform: "triangle"},
  city: {root: 196, scale: [0, 2, 3, 7, 9], waveform: "triangle"},
  abyss: {root: 110, scale: [0, 1, 5, 7, 8], waveform: "sawtooth"},
  brumalis: {root: 174.61, scale: [0, 2, 5, 7, 9], waveform: "triangle"},
  infinite: {root: 130.81, scale: [0, 2, 3, 7, 8], waveform: "square"}
};
var MUSIC_FALLBACK_ARRANGEMENTS = {
  menu: {
    form: [0, 1, 0, 2, 3, 2, 1, 3],
    phrases: [
      [0, -1, 2, -1, 4, 2, 3, -1, 2, -1, 4, 3, -1, 2, 1, -1],
      [2, 3, -1, 4, 3, -1, 1, 0, 1, -1, 3, 2, -1, 4, 2, -1],
      [4, -1, 3, 2, 1, -1, 2, 0, 3, -1, 2, 4, 3, -1, 1, 0],
      [0, 2, -1, 3, 1, -1, 2, 4, 3, -1, 1, 2, -1, 3, 0, -1]
    ],
    chords: [0, 3, 4, 2, 0, 4, 2, 3, 0, 3, 1, 4, 2, 3, 4, 0]
  },
  exploration: {
    form: [0, 1, 0, 2, 3, 2, 1, 3],
    phrases: [
      [0, -1, 2, 4, 2, -1, 3, 1, 0, -1, 2, 3, 4, -1, 3, -1],
      [2, 3, -1, 4, 3, -1, 1, 0, 1, -1, 3, 2, -1, 4, 2, -1],
      [4, -1, 3, 2, -1, 1, 2, -1, 3, -1, 2, 4, 3, -1, 1, 0],
      [0, 2, -1, 3, 1, -1, 2, 4, 3, -1, 1, 2, -1, 3, 0, -1]
    ],
    chords: [0, 3, 4, 2, 0, 4, 2, 3, 0, 3, 1, 4, 2, 3, 4, 0]
  },
  danger: {
    form: [0, 1, 2, 0, 3, 2, 1, 3],
    phrases: [
      [0, 4, -1, 2, 3, -1, 1, 4, 2, -1, 3, 4, -1, 2, 1, -1],
      [2, -1, 3, 4, -1, 1, 4, 2, 3, 4, -1, 2, 1, -1, 3, 0],
      [4, 3, -1, 1, 2, 4, -1, 0, 4, -1, 2, 3, -1, 1, 2, -1],
      [1, -1, 4, 3, 2, -1, 4, 1, 0, 2, -1, 3, 4, -1, 2, 0]
    ],
    chords: [0, 4, 3, 4, 0, 2, 4, 3, 0, 4, 2, 3, 1, 4, 3, 0]
  },
  combat: {
    form: [0, 1, 2, 1, 3, 2, 3, 3],
    phrases: [
      [0, 2, 4, -1, 3, 1, -1, 4, 2, -1, 1, 3, 4, -1, 2, -1],
      [2, -1, 3, 4, 1, -1, 4, 2, 0, 3, -1, 2, 4, 1, -1, 0],
      [4, 1, -1, 3, 2, 4, -1, 0, 3, -1, 4, 2, 1, -1, 3, -1],
      [1, 3, -1, 4, 2, -1, 0, 3, 4, -1, 2, 1, 3, -1, 4, 0]
    ],
    chords: [0, 4, 2, 3, 0, 3, 1, 4, 0, 4, 2, 1, 3, 4, 2, 0]
  },
  elite: {
    form: [0, 1, 2, 0, 3, 2, 1, 3],
    phrases: [
      [0, 3, -1, 2, 4, 1, -1, 3, 2, -1, 4, 3, 1, -1, 2, -1],
      [4, -1, 1, 3, 2, -1, 4, 1, 0, 3, -1, 4, 2, -1, 1, 0],
      [2, 4, -1, 1, 3, 0, -1, 4, 3, -1, 2, 4, 1, -1, 3, -1],
      [1, -1, 3, 4, 2, -1, 0, 3, 4, 2, -1, 1, 3, -1, 4, 0]
    ],
    chords: [0, 4, 3, 2, 0, 2, 4, 3, 0, 4, 1, 3, 2, 4, 3, 0]
  },
  boss: {
    form: [0, 1, 2, 1, 3, 2, 3, 3],
    phrases: [
      [0, 4, -1, 2, 1, 3, -1, 4, 2, -1, 0, 3, 4, -1, 2, -1],
      [4, -1, 2, 3, 1, -1, 0, 2, 4, 3, -1, 1, 2, -1, 4, 0],
      [2, 1, -1, 4, 3, 0, -1, 1, 4, -1, 2, 3, 1, -1, 0, -1],
      [3, -1, 1, 4, 2, -1, 3, 0, 4, 1, -1, 2, 3, -1, 4, 0]
    ],
    chords: [0, 4, 1, 3, 0, 2, 4, 1, 0, 3, 2, 4, 1, 3, 4, 0]
  },
  safe: {
    form: [0, 1, 0, 2, 3, 2, 1, 3],
    phrases: [
      [0, -1, 2, 3, -1, 4, 2, -1, 1, -1, 3, 2, -1, 4, 3, -1],
      [3, 2, -1, 4, 1, -1, 2, 0, 2, -1, 4, 3, -1, 1, 0, -1],
      [4, -1, 1, 3, 2, -1, 0, -1, 3, 1, -1, 4, 2, -1, 1, 0],
      [0, 2, -1, 4, 3, -1, 1, 2, 4, -1, 2, 1, -1, 3, 0, -1]
    ],
    chords: [0, 3, 0, 4, 0, 2, 3, 0, 0, 3, 4, 2, 3, 4, 2, 0]
  },
  infinite: {
    form: [0, 1, 2, 0, 3, 2, 1, 3],
    phrases: [
      [0, 3, -1, 4, 2, -1, 1, 3, 4, -1, 2, 0, 3, -1, 4, -1],
      [4, -1, 2, 1, 3, 4, -1, 2, 0, 3, -1, 4, 2, -1, 1, 0],
      [2, 4, -1, 1, 0, 3, -1, 4, 3, -1, 1, 2, 4, -1, 0, -1],
      [1, -1, 4, 2, 3, -1, 0, 4, 2, 3, -1, 1, 4, -1, 2, 0]
    ],
    chords: [0, 4, 3, 1, 0, 2, 4, 3, 0, 3, 1, 4, 2, 4, 3, 0]
  }
};
var MUSIC_FALLBACK_ARPEGGIOS = {
  menu: [0, -1, 2, 4, -1, 2, 1, -1],
  exploration: [0, -1, 2, 4, 2, -1, 4, -1],
  danger: [0, 2, -1, 4, 2, 1, -1, 4],
  combat: [0, -1, 4, 2, 0, 2, -1, 4],
  elite: [0, 2, 4, -1, 2, 4, 1, -1],
  boss: [0, 4, -1, 2, 1, 4, -1, 2],
  safe: [0, -1, 2, -1, 4, 2, -1, -1],
  infinite: [0, 2, -1, 4, 2, 0, -1, 4]
};
var MUSIC_FALLBACK_BASS_RHYTHMS = {
  menu: [0, 2],
  exploration: [0, 2.5],
  danger: [0, 1.5, 2.5],
  combat: [0, 1.5, 2.5, 3.5],
  elite: [0, 2, 3],
  boss: [0, 1.5, 2.5],
  safe: [0],
  infinite: [0, 2, 3]
};
var MUSIC_FALLBACK_DYNAMICS = {
  menu: [0.5, 0.66, 0.8, 0.62],
  exploration: [0.46, 0.64, 0.76, 0.56],
  danger: [0.58, 0.78, 0.96, 0.72],
  combat: [0.62, 0.84, 1, 0.76],
  elite: [0.62, 0.86, 1, 0.78],
  boss: [0.66, 0.88, 1, 0.8],
  safe: [0.42, 0.56, 0.68, 0.5],
  infinite: [0.58, 0.8, 0.94, 0.72]
};
var MUSIC_FALLBACK_BEATS = {
  menu: 0.42, exploration: 0.46, danger: 0.34, combat: 0.36,
  elite: 0.32, boss: 0.34, safe: 0.52, infinite: 0.38
};
var MUSIC_BASE_VOLUME = 0.2;
var currentMusicTrack = "";
var musicSceneKey = "";
var musicPlayers = [];
var activeMusicPlayer = -1;
var musicFadeTimer = null;
var musicUserInteracted = false;
var musicFallbackTimer = null;
var musicFallbackTrack = "";
var musicFallbackSceneKey = "";
var musicCombatUntil = 0;
var musicFallbackGainNode = null;
var musicFallbackSwitchTimer = null;

function getMusicRegionForState() {
  if (gameMode === "infinite") return "infinite";
  var room = rooms && rooms[currentRoom];
  if (room && room.visualProfile === "brumalis") return "brumalis";
  if (room && room.optional) return room.visualProfile === "abyss" ? "abyss" : "crystal";
  if ((currentRoom >= 0 && currentRoom <= 23) || currentRoom === 50) return "ardoris";
  if (currentRoom >= 24 && currentRoom <= 29) return "city";
  if (currentRoom >= 30) return "abyss";
  return "crystal";
}

function isMusicSafeZone(room) {
  if (shopOpen || gameState === ST_HOUSE || (room && (room.safeZone || room.restArea || room.shops))) return true;
  var healingStone = room && room.healingStone;
  return !!(healingStone && player &&
    Math.abs(player.x + player.w / 2 - (healingStone.x + healingStone.w / 2)) < 110);
}

function isMusicDangerSituation(room) {
  if (floorCollapseTimer > 0) return true;
  if (player && player.maxHp > 0 && player.hp / player.maxHp <= 0.3) return true;
  if (!player || !room || !room.spikes) return false;
  return room.spikes.some(function(spike) {
    return player.x + player.w > spike.x - 70 && player.x < spike.x + spike.w + 70 &&
      Math.abs(player.y + player.h - spike.y) < 110;
  });
}

function isMusicCombatActive() {
  if (!player || !enemies || !enemies.some) return false;
  var targets = twoPlayerMode ? [player, player2] : [player];
  var activeCombat = enemies.some(function(enemy) {
    if (enemy.dead || enemy.disabled || enemy.boss || enemy.room !== currentRoom) return false;
    var vision = enemy.visionRadius || (enemy.type === "dark_knight" ? 260 :
      (enemy.type === "cazador_paramo" ? 220 : (enemy.type === "acid_slime" ? 150 : 220)));
    return targets.some(function(target) {
      if (!target || target.frozen) return false;
      var dx = target.x + target.w / 2 - (enemy.x + enemy.w / 2);
      var dy = target.y + target.h / 2 - (enemy.y + enemy.h / 2);
      return dx * dx + dy * dy <= vision * vision;
    });
  });
  if (activeCombat) musicCombatUntil = Date.now() + 2500;
  return activeCombat || Date.now() < musicCombatUntil;
}

function getMusicSceneForState() {
  if (gameState === ST_MENU || gameState === ST_LANGUAGE || gameState === ST_DEVICE) {
    return {track: "menu", key: "menu:menu"};
  }
  var region = getMusicRegionForState();
  var room = rooms && rooms[currentRoom];
  var mood = "exploration";
  var activeElite = enemies && enemies.find ? enemies.find(function(enemy) {
    return enemy.type === "ardoris_elite" && enemy.room === currentRoom && !enemy.dead && !enemy.disabled;
  }) : null;
  var activeBoss = enemies && enemies.find ? enemies.find(function(enemy) {
    return enemy.boss && enemy.room === currentRoom && !enemy.dead && !enemy.disabled;
  }) : null;
  if (isMusicSafeZone(room)) mood = "safe";
  else if (activeElite) mood = "elite";
  else if (activeBoss) mood = "boss";
  else if (gameMode === "infinite") mood = "infinite";
  else if (isMusicDangerSituation(room)) mood = "danger";
  else if (isMusicCombatActive()) mood = "combat";
  return {track: MUSIC_SCENE_TRACKS[mood] || "normal", key: region + ":" + mood};
}

function getMusicSceneKeyForTrack(trackName) {
  var scene = getMusicSceneForState();
  if (trackName === scene.track) return scene.key;
  var mood = trackName === "menu" ? "menu" :
    (trackName === "tienda" ? "safe" : (trackName === "elite" ? "elite" :
    (trackName === "jefe" || trackName === "boss" ? "boss" :
    (trackName === "infinite" ? "infinite" : "exploration"))));
  return getMusicRegionForState() + ":" + mood;
}

function getMusicTrackForState() {
  return getMusicSceneForState().track;
}
function controlarMusica() {
  if (!musicUserInteracted || !musicEnabled || gameState === ST_PAUSED) return;
  var scene = getMusicSceneForState();
  startMusic(scene.track, scene.key);
}
function setMusicPlayerVolume(player, volume) {
  player.volume = Math.max(0, Math.min(1, volume * MUSIC_BASE_VOLUME * musicVolume * masterVolume));
}
function ensureMusicPlayers() {
  if (musicPlayers.length) return;
  for (var i = 0; i < 2; i++) {
    var player = new Audio();
    player.preload = "auto";
    player.loop = true;
    player.setAttribute("aria-hidden", "true");
    musicPlayers.push(player);
  }
}
function playFallbackNote(frequency, duration, type, volume, delay, pan) {
  if (!audioCtx || !musicEnabled) return;
  var oscillator = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  var startAt = audioCtx.currentTime + (delay || 0);
  var endAt = startAt + duration;
  var attack = Math.min(0.07, duration * 0.3);
  var peak = Math.max(0.0001, volume * MUSIC_BASE_VOLUME * musicVolume * masterVolume);
  oscillator.type = type || "triangle";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peak, startAt + attack);
  gain.gain.setValueAtTime(peak, Math.max(startAt + attack, endAt - Math.min(0.1, duration * 0.25)));
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
  oscillator.connect(gain);
  var output = gain;
  if (typeof audioCtx.createStereoPanner === "function" && pan) {
    var stereo = audioCtx.createStereoPanner();
    stereo.pan.setValueAtTime(pan, startAt);
    gain.connect(stereo);
    output = stereo;
  }
  output.connect(ensureMusicFallbackGain());
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.02);
}
function getFallbackFrequency(theme, degree, octaveOffset) {
  var scaleIndex = ((degree % theme.scale.length) + theme.scale.length) % theme.scale.length;
  var octave = Math.floor(degree / theme.scale.length);
  return theme.root * Math.pow(2, (theme.scale[scaleIndex] + octave * 12 + (octaveOffset || 0)) / 12);
}

function playFallbackPhrase(sceneKey) {
  var parts = sceneKey.split(":");
  var region = parts[0];
  var mood = parts[1] || "exploration";
  var theme = MUSIC_FALLBACK_THEMES[region] || MUSIC_FALLBACK_THEMES.crystal;
  var arrangement = MUSIC_FALLBACK_ARRANGEMENTS[mood] || MUSIC_FALLBACK_ARRANGEMENTS.exploration;
  var arpeggio = MUSIC_FALLBACK_ARPEGGIOS[mood] || MUSIC_FALLBACK_ARPEGGIOS.exploration;
  var bassRhythm = MUSIC_FALLBACK_BASS_RHYTHMS[mood] || MUSIC_FALLBACK_BASS_RHYTHMS.exploration;
  var dynamics = MUSIC_FALLBACK_DYNAMICS[mood] || MUSIC_FALLBACK_DYNAMICS.exploration;
  var beat = MUSIC_FALLBACK_BEATS[mood] || MUSIC_FALLBACK_BEATS.exploration;
  var leadWave = mood === "danger" || mood === "elite" || mood === "boss" ? "sawtooth" : theme.waveform;
  var bassWave = mood === "combat" || mood === "infinite" ? "square" : "triangle";

  for (var bar = 0; bar < 16; bar++) {
    var section = Math.floor(bar / 2);
    var barStart = bar * 4 * beat;
    var chordRoot = arrangement.chords[bar];
    var energy = dynamics[Math.floor(bar / 4)] * (bar % 2 === 0 ? 1 : 0.9);
    var melody = arrangement.phrases[arrangement.form[section]];
    var melodyStart = (bar % 2) * 8;
    var leadOctave = section === 2 || section === 3 ? 19 : (section === 6 ? 7 : 12);

    [0, 2, 4].forEach(function(chordTone, index) {
      var voicing = chordRoot + chordTone;
      var octave = index === 0 ? 0 : (index === 1 ? 12 : 12);
      playFallbackNote(
        getFallbackFrequency(theme, voicing, octave),
        beat * (bar === 15 ? 3.7 : 3.9),
        "sine",
        energy * (index === 0 ? 0.14 : 0.085),
        barStart,
        index === 0 ? -0.2 : 0.2
      );
    });

    for (var slot = 0; slot < 8; slot++) {
      var note = melody[melodyStart + slot];
      var startBeat = slot * 0.5;
      var delay = barStart + startBeat * beat;
      var arpNote = arpeggio[(slot + bar) % arpeggio.length];
      if (arpNote !== -1 && (slot % 2 === 0 || (bar + slot) % 3 === 0)) {
        playFallbackNote(
          getFallbackFrequency(theme, chordRoot + arpNote, 12),
          beat * (slot % 4 === 0 ? 0.42 : 0.28),
          "triangle",
          energy * 0.18,
          delay,
          slot % 2 === 0 ? -0.55 : 0.55
        );
      }

      if (note === -1) continue;
      var melodicDegree = note;
      if (section % 4 === 1 && (slot === 2 || slot === 6)) melodicDegree += 1;
      if (section % 4 === 2 && (slot === 0 || slot === 4)) melodicDegree += 2;
      if (section % 4 === 3 && slot > 4) melodicDegree = Math.max(0, melodicDegree - 1);
      if (section === 7 && bar === 15 && slot === 7) melodicDegree = 0;
      var noteLength = slot % 4 === 0 ? 0.78 : (slot % 3 === 0 ? 0.58 : 0.38);
      playFallbackNote(
        getFallbackFrequency(theme, melodicDegree, leadOctave),
        beat * noteLength,
        leadWave,
        energy * (slot === 0 || slot === 4 ? 0.44 : 0.34),
        delay,
        slot % 2 === 0 ? 0.18 : -0.18
      );
    }

    bassRhythm.forEach(function(bassBeat, index) {
      var bassDegree = chordRoot + (index % 2 === 0 ? 0 : 2);
      playFallbackNote(
        getFallbackFrequency(theme, bassDegree, -12),
        beat * (index === 0 ? 0.78 : 0.48),
        bassWave,
        energy * (index === 0 ? 0.36 : 0.26),
        barStart + bassBeat * beat
      );
    });
  }
  return beat * 64;
}
function ensureMusicFallbackGain() {
    if (!musicFallbackGainNode) {
      musicFallbackGainNode = audioCtx.createGain();
      musicFallbackGainNode.gain.value = 0;
      musicFallbackGainNode.connect(audioCtx.destination);
    }
    return musicFallbackGainNode;
}
function fadeOutFallbackMusic(duration) {
    if (musicFallbackTimer) { clearInterval(musicFallbackTimer); musicFallbackTimer = null; }
    if (musicFallbackSwitchTimer) { clearTimeout(musicFallbackSwitchTimer); musicFallbackSwitchTimer = null; }
    musicFallbackTrack = "";
    musicFallbackSceneKey = "";
    if (!audioCtx || !musicFallbackGainNode) return;
    var now = audioCtx.currentTime;
    var gain = musicFallbackGainNode.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(0, now + duration);
}
function startFallbackMusic(trackName, sceneKey) {
    if (!musicEnabled) return;
    sceneKey = sceneKey || getMusicSceneKeyForTrack(trackName);
    if (musicFallbackTrack === trackName && musicFallbackSceneKey === sceneKey) return;
    if (musicFallbackTimer) clearInterval(musicFallbackTimer);
    if (musicFallbackSwitchTimer) clearTimeout(musicFallbackSwitchTimer);
    var previousFallbackTrack = !!musicFallbackTrack;
    var fallbackGain = ensureMusicFallbackGain();
    if (previousFallbackTrack) {
      var fadeStart = audioCtx.currentTime;
      fallbackGain.gain.cancelScheduledValues(fadeStart);
      fallbackGain.gain.setValueAtTime(fallbackGain.gain.value, fadeStart);
      fallbackGain.gain.linearRampToValueAtTime(0, fadeStart + 0.35);
    }
    musicFallbackTrack = trackName;
    musicFallbackSceneKey = sceneKey;
    musicPlaying = true;
    currentMusicTrack = trackName;
    musicSceneKey = sceneKey;
    fadeMusicPlayers(null, 0, 350);
    function beginFallbackPhrase() {
      if (musicFallbackTrack !== trackName || musicFallbackSceneKey !== sceneKey || !musicEnabled) return;
      var now = audioCtx.currentTime;
      fallbackGain.gain.cancelScheduledValues(now);
      fallbackGain.gain.setValueAtTime(0, now);
      var phraseDuration = playFallbackPhrase(sceneKey);
      fallbackGain.gain.linearRampToValueAtTime(1, now + 0.35);
      musicFallbackTimer = setInterval(function() {
        if (musicFallbackTrack === trackName && musicFallbackSceneKey === sceneKey && musicEnabled) {
          playFallbackPhrase(sceneKey);
        }
      }, phraseDuration * 1000);
      musicFallbackSwitchTimer = null;
    }
    if (previousFallbackTrack) {
      var switchAt = audioCtx.currentTime;
      fallbackGain.gain.cancelScheduledValues(switchAt);
      fallbackGain.gain.setValueAtTime(fallbackGain.gain.value, switchAt);
      fallbackGain.gain.linearRampToValueAtTime(0, switchAt + 0.25);
      musicFallbackSwitchTimer = setTimeout(beginFallbackPhrase, 250);
    } else {
      beginFallbackPhrase();
    }
}
function fadeMusicPlayers(targetPlayer, targetVolume, duration) {
  if (musicFadeTimer) clearInterval(musicFadeTimer);
  var startedAt = Date.now();
  var outgoingPlayers = [];
  var outgoingVolumes = [];
  var volumeScale = MUSIC_BASE_VOLUME * musicVolume * masterVolume;
  musicPlayers.forEach(function(player) {
    if (player === targetPlayer || player.paused) return;
    outgoingPlayers.push(player);
    outgoingVolumes.push(volumeScale > 0 ? player.volume / volumeScale : 0);
  });
  musicFadeTimer = setInterval(function() {
    var progress = Math.min(1, (Date.now() - startedAt) / duration);
    outgoingPlayers.forEach(function(player, index) {
      setMusicPlayerVolume(player, outgoingVolumes[index] * (1 - progress));
    });
    if (targetPlayer) setMusicPlayerVolume(targetPlayer, progress * targetVolume);
    if (progress >= 1) {
      outgoingPlayers.forEach(function(player) {
        player.pause();
        player.currentTime = 0;
        setMusicPlayerVolume(player, 0);
      });
      if (!targetPlayer) activeMusicPlayer = -1;
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;
    }
  }, 40);
}
function startMusic(trackName, sceneKey) {
  if (!musicEnabled) return;
  musicUserInteracted = true;
  initAudio();
  ensureMusicPlayers();
  var scene = getMusicSceneForState();
  trackName = trackName || scene.track;
  sceneKey = sceneKey || (trackName === scene.track ? scene.key : getMusicSceneKeyForTrack(trackName));
  if (musicPlaying && currentMusicTrack === trackName) {
    if (musicSceneKey === sceneKey) return;
    musicSceneKey = sceneKey;
    if (musicFallbackTrack) startFallbackMusic(trackName, sceneKey);
    return;
  }
  var source = MUSIC_TRACKS[trackName];
  if (!source) return;
  var nextIndex = activeMusicPlayer === 0 ? 1 : 0;
  var nextPlayer = musicPlayers[nextIndex];
  nextPlayer.src = source;
  nextPlayer.onerror = function() {
    if (currentMusicTrack === trackName && musicSceneKey === sceneKey) startFallbackMusic(trackName, sceneKey);
  };
  nextPlayer.loop = true;
  nextPlayer.currentTime = 0;
  setMusicPlayerVolume(nextPlayer, 0);
  var playResult = nextPlayer.play();
  currentMusicTrack = trackName;
  musicSceneKey = sceneKey;
  musicPlaying = true;
  activeMusicPlayer = nextIndex;
  fadeMusicPlayers(nextPlayer, 1, 700);
  if (playResult && playResult.then) {
    playResult.then(function() {
      if (currentMusicTrack === trackName && musicSceneKey === sceneKey && musicFallbackTrack) {
        fadeOutFallbackMusic(0.7);
      }
    }).catch(function() {
      if (currentMusicTrack === trackName && musicSceneKey === sceneKey) startFallbackMusic(trackName, sceneKey);
    });
  }
}
function stopMusic() {
  musicPlaying = false;
  currentMusicTrack = "";
  musicSceneKey = "";
  if (musicFadeTimer) { clearInterval(musicFadeTimer); musicFadeTimer = null; }
  musicPlayers.forEach(function(player) {
    player.pause();
    player.currentTime = 0;
    setMusicPlayerVolume(player, 0);
  });
  activeMusicPlayer = -1;
  if (musicFallbackTimer) { clearInterval(musicFallbackTimer); musicFallbackTimer = null; }
  if (musicFallbackSwitchTimer) { clearTimeout(musicFallbackSwitchTimer); musicFallbackSwitchTimer = null; }
  musicFallbackTrack = "";
  musicFallbackSceneKey = "";
  if (musicFallbackGainNode && audioCtx) {
    var now = audioCtx.currentTime;
    musicFallbackGainNode.gain.cancelScheduledValues(now);
    musicFallbackGainNode.gain.setValueAtTime(0, now);
  }
}
function updateAudioEnvironment() {
  controlarMusica();
  if (audioCtx && audioCtx.state === "suspended" && musicUserInteracted && musicEnabled) audioCtx.resume();
  if (gameState !== ST_PLAYING || shopOpen) return;
  if (currentRoom === 1) {
    ambientTimer = 240;
    return;
  }
  ambientTimer--;
  if (ambientTimer <= 0) {
    ambientTimer = 180 + Math.floor(Math.random() * 240);
    if (currentRoom === 0 || currentRoom === 9) sfxCaveEcho();
    else if (currentRoom >= 10) sfxCaveEcho();
    else if (currentRoom !== 1) sfxWind();
  }
}
function startBossMusic(bossType) {
  var mood = bossType === "ardoris_elite" ? "elite" : "boss";
  startMusic(MUSIC_SCENE_TRACKS[mood], getMusicRegionForState() + ":" + mood);
}
function toggleMusic() {
  musicUserInteracted = true;
  musicEnabled = !musicEnabled;
  if (!musicEnabled) stopMusic();
  else {
    var scene = getMusicSceneForState();
    startMusic(scene.track, scene.key);
  }
}
function toggleSfx() { sfxEnabled = !sfxEnabled; }
function adjustMusicVolume(delta) {
  musicVolume = Math.max(0, Math.min(1, musicVolume + delta));
  musicPlayers.forEach(function(player) { if (player.paused) return; setMusicPlayerVolume(player, 1); });
}
function adjustSfxVolume(delta) { sfxVolume = Math.max(0, Math.min(1, sfxVolume + delta)); }
function adjustMasterVolume(delta) { masterVolume = Math.max(0, Math.min(1, masterVolume + delta)); }
function adjustAudioVolume(delta) {
  if (audioSelection === 0) adjustMasterVolume(delta);
  else if (audioSelection === 1) adjustMusicVolume(delta);
  else adjustSfxVolume(delta);
}
function sfxWind() { playNoise(0.35, 0.035, 0); playTone(180, 0.35, "sine", 0.025, 0.05); }
function sfxCaveEcho() { playTone(90, 0.35, "triangle", 0.04, 0); playTone(135, 0.5, "sine", 0.025, 0.18); }