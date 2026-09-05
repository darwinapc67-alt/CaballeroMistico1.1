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
    gain.gain.setValueAtTime(vol * sfxVolume, audioCtx.currentTime + delay);
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
    gain.gain.setValueAtTime(vol * musicVolume, audioCtx.currentTime + delay);
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
    gain.gain.setValueAtTime(vol, audioCtx.currentTime + delay);
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
function sfxExplosion() { playNoise(0.5, 0.25, 0); playTone(80, 0.4, "sawtooth", 0.15, 0); playTone(60, 0.5, "square", 0.10, 0.1); }
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
function sfxWaterDrop() { playTone(1050, 0.05, "sine", 0.07, 0); playTone(1450, 0.09, "sine", 0.05, 0.04); }
function sfxBossDoorsLock() { playTone(95, 0.28, "sawtooth", 0.12, 0); playTone(58, 0.42, "square", 0.1, 0.08); playNoise(0.18, 0.08, 0.04); }
function sfxBossDoorsOpen() { playTone(180, 0.16, "sine", 0.1, 0); playTone(360, 0.22, "sine", 0.09, 0.12); playTone(720, 0.28, "triangle", 0.07, 0.24); }

function playAmbientChord(baseFreq, delay) {
  if (!audioCtx || !musicPlaying) return;
  playMusicTone(baseFreq, 3.5, "sine", 0.05, delay);
  playMusicTone(baseFreq * 1.25, 3.2, "triangle", 0.03, delay + 0.1);
  playMusicTone(baseFreq * 1.5, 2.8, "sine", 0.025, delay + 0.2);
  playMusicTone(baseFreq * 2, 2.5, "sine", 0.02, delay + 0.3);
}

function startMusic() {
  initAudio();
  if (musicPlaying) return;
  musicPlaying = true;
  var chords = [82.41, 98, 110, 130.81, 110, 98, 82.41, 73.42];
  var chordIdx = 0;
  playAmbientChord(chords[chordIdx], 0);
  musicInterval = setInterval(function() {
    if (!musicPlaying) return;
    chordIdx = (chordIdx + 1) % chords.length;
    playAmbientChord(chords[chordIdx], 0);
  }, 3200);
}
function stopMusic() { musicPlaying = false; if (musicInterval) { clearInterval(musicInterval); musicInterval = null; } }
function toggleMusic() { initAudio(); if (musicPlaying) stopMusic(); else startMusic(); }
function toggleSfx() { sfxEnabled = !sfxEnabled; }
function adjustMusicVolume(delta) { musicVolume = Math.max(0, Math.min(1, musicVolume + delta)); }
function adjustSfxVolume(delta) { sfxVolume = Math.max(0, Math.min(1, sfxVolume + delta)); }