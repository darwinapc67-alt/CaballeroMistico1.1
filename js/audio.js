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
  gameplay: "assets/music/normal.mp3",
  boss: "assets/music/jefe.mp3",
  infinite: "assets/music/infinite.mp3"
};
var MUSIC_BASE_VOLUME = 0.2;
var currentMusicTrack = "";
var musicRequestedTrack = "";
var musicPlayers = [];
var activeMusicPlayer = -1;
var musicFadeTimer = null;
var musicUserInteracted = false;
var musicFallbackTimer = null;
var musicFallbackTrack = "";

function getMusicTrackForState() {
  if (gameState === ST_MENU || gameState === ST_LANGUAGE || gameState === ST_DEVICE) return "menu";
  if (shopOpen) return "tienda";
  var activeBoss = enemies && enemies.find ? enemies.find(function(enemy) {
    return enemy.boss && enemy.room === currentRoom && !enemy.dead;
  }) : null;
  var roomIsBoss = rooms && rooms[currentRoom] && rooms[currentRoom].bossName;
  if (activeBoss || roomIsBoss || gameState === ST_DIALOGUE) return "jefe";
  if (gameMode === "infinite") return "infinite";
  return "normal";
}
function controlarMusica() {
  if (!musicUserInteracted || !musicEnabled) return;
  var desiredTrack = getMusicTrackForState();
  if (musicPlaying && currentMusicTrack === desiredTrack && musicRequestedTrack === desiredTrack) return;
  if (desiredTrack === "jefe" && currentMusicTrack && currentMusicTrack !== "jefe") stopMusic();
  startMusic(desiredTrack);
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
function playFallbackNote(frequency, duration, type, volume, delay) {
    if (!audioCtx || !musicEnabled) return;
    var oscillator = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    var startAt = audioCtx.currentTime + (delay || 0);
    oscillator.type = type || "square";
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * MUSIC_BASE_VOLUME * musicVolume * masterVolume), startAt + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
}
function playFallbackPhrase(trackName) {
    var phrases = {
      normal: [220, 262, 330, 392, 330, 262, 196, 220],
      tienda: [262, 330, 392, 330, 294, 349, 440, 349],
      jefe: [110, 165, 220, 330, 220, 165, 294, 440]
    };
    var notes = phrases[trackName] || phrases.normal;
    var step = trackName === "jefe" ? 0.18 : (trackName === "tienda" ? 0.42 : 0.3);
    for (var i = 0; i < notes.length; i++) {
      playFallbackNote(notes[i], step * 0.82, trackName === "tienda" ? "triangle" : "square", 0.65, i * step);
      if (trackName !== "tienda") playFallbackNote(notes[i] / 2, step * 0.75, "triangle", 0.3, i * step);
    }
}
function startFallbackMusic(trackName) {
    if (!musicEnabled) return;
    if (musicFallbackTimer) clearInterval(musicFallbackTimer);
    musicFallbackTrack = trackName;
    musicPlaying = true;
    currentMusicTrack = trackName;
    musicRequestedTrack = trackName;
    playFallbackPhrase(trackName);
    var phraseDuration = trackName === "jefe" ? 1.44 : (trackName === "tienda" ? 3.36 : 2.4);
    musicFallbackTimer = setInterval(function() {
      if (musicFallbackTrack === trackName && musicEnabled) playFallbackPhrase(trackName);
    }, phraseDuration * 1000);
}
function fadeMusicPlayers(targetPlayer, targetVolume, duration) {
  if (musicFadeTimer) clearInterval(musicFadeTimer);
  var startedAt = Date.now();
  var fromPlayer = activeMusicPlayer >= 0 ? musicPlayers[activeMusicPlayer] : null;
  musicFadeTimer = setInterval(function() {
    var progress = Math.min(1, (Date.now() - startedAt) / duration);
    if (fromPlayer && fromPlayer !== targetPlayer) setMusicPlayerVolume(fromPlayer, 1 - progress);
    setMusicPlayerVolume(targetPlayer, progress * targetVolume);
    if (progress >= 1) {
      if (fromPlayer && fromPlayer !== targetPlayer) {
        fromPlayer.pause();
        fromPlayer.currentTime = 0;
        setMusicPlayerVolume(fromPlayer, 0);
      }
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;
    }
  }, 40);
}
function startMusic(trackName) {
  if (!musicEnabled) return;
  musicUserInteracted = true;
  initAudio();
  ensureMusicPlayers();
  trackName = trackName || getMusicTrackForState();
  if (musicPlaying && currentMusicTrack === trackName) return;
  var source = MUSIC_TRACKS[trackName];
  if (!source) return;
  var nextIndex = activeMusicPlayer === 0 ? 1 : 0;
  var nextPlayer = musicPlayers[nextIndex];
  nextPlayer.src = source;
  nextPlayer.onerror = function() {
    if (currentMusicTrack === trackName) startFallbackMusic(trackName);
  };
  nextPlayer.loop = true;
  nextPlayer.currentTime = 0;
  setMusicPlayerVolume(nextPlayer, 0);
  var playResult = nextPlayer.play();
  if (playResult && playResult.catch) playResult.catch(function() {});
  currentMusicTrack = trackName;
  musicRequestedTrack = trackName;
  musicPlaying = true;
  activeMusicPlayer = nextIndex;
  fadeMusicPlayers(nextPlayer, 1, 700);
}
function stopMusic() {
  musicPlaying = false;
  currentMusicTrack = "";
  musicRequestedTrack = "";
  if (musicFadeTimer) { clearInterval(musicFadeTimer); musicFadeTimer = null; }
  musicPlayers.forEach(function(player) {
    player.pause();
    player.currentTime = 0;
    setMusicPlayerVolume(player, 0);
  });
  activeMusicPlayer = -1;
  if (musicFallbackTimer) { clearInterval(musicFallbackTimer); musicFallbackTimer = null; }
  musicFallbackTrack = "";
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
function startBossMusic() { startMusic("boss"); }
function toggleMusic() {
  musicUserInteracted = true;
  musicEnabled = !musicEnabled;
  if (!musicEnabled) stopMusic();
  else startMusic(getMusicTrackForState());
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