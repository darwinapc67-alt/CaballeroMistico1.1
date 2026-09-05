var canvas, ctx;
var ROOM_W = 800, ROOM_H = 600, GRAVITY = 0.6;
var DASH_SPEED = 12, DASH_DURATION = 10, DASH_COOLDOWN = 45, DASH_INV_FRAMES = 12;
/* Rooms 0-9 are the original route, room 10 is the final descent, and
   rooms 11-13 are the Guardian, Queen Larva, and Abyssal Knight arenas. */
var WORLD_W = 14 * ROOM_W;
var SAVE_KEY = "caballero_mistico_v080";
var VERSION = "v1.65";

var ST_LANGUAGE = 0, ST_DEVICE = 1, ST_MENU = 2, ST_PLAYING = 3, ST_PAUSED = 4, ST_TRANSITION = 5, ST_INVENTORY = 7, ST_DIALOGUE = 8, ST_DEATH = 9;

var gameState = ST_LANGUAGE;
var languageSelection = 0, language = "es";
var deviceSelection = 0, device = "pc";
var devices = [
  { code: "pc", label: "PC" },
  { code: "touch", label: "Celular / Tablet" },
  { code: "play", label: "Control de Play" }
];
var languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" }
];

var translations = {
  en: {
    "CABALLERO MÍSTICO": "MYSTIC KNIGHT", "Selecciona una ranura": "Select a save slot", "RANURA": "SLOT",
    "Guardado": "Saved", "Vacía": "Empty", "para nueva partida": "for a new game", "Borrar": "Delete",
    "Reanudar": "Resume", "Ver Diario": "View Journal", "Agregar J2": "Add P2", "Quitar J2": "Remove P2",
    "Controles": "Controls", "Salir al Menú": "Exit to Menu", "PAUSA": "PAUSED", "DIARIO DEL CABALLERO": "KNIGHT'S JOURNAL",
    "Bestiario de criaturas abatidas": "Bestiary of defeated creatures", "Abatidos": "Defeated", "Criatura no descubierta.": "Undiscovered creature.",
    "ESTADÍSTICAS": "STATS", "Inventario": "Inventory", "Sin arma": "Unarmed", "Encuentra la espada...": "Find the sword...",
    "Nueva criatura descubierta!": "New creature discovered!", "CARGANDO": "LOADING", "TIENDA DEL EXILIADO": "EXILE'S SHOP",
    "Mapa de la Zona": "Area Map", "Ya lo posees": "Already owned", "Comprar": "Buy", "Fragmentos": "Fragments",
    "Compra fragmentos": "Buy fragments", "Amuleto": "Charm", "Vida restaurada!": "Health restored!",
    "Obtuviste la Espada!": "You got the Sword!", "Presiona": "Press", "atacar": "to attack", "Muerto!": "Defeated!",
    "No hay más abajo!": "There is nowhere further down!", "No hay vuelta atrás...": "There is no turning back...",
    "cayó!": "fell!", "sentándose...": "sitting down...", "Mando detectado": "Controller detected",
    "CAVERNA INICIAL": "INITIAL CAVE", "CUEVA OLVIDADA": "FORGOTTEN CAVE", "ASCENSO ROCOSO": "ROCKY ASCENT",
    "TÚNELES OLVIDADOS": "FORGOTTEN TUNNELS", "PROFUNDIDADES": "DEPTHS", "PICO ABISMAL": "ABYSSAL PEAK",
    "CAMINO FINAL": "FINAL PATH", "TIENDA": "SHOP", "Mapa": "Map", "Fragmentos J1": "P1 Fragments", "Fragmentos J2": "P2 Fragments",
    "Mover": "Move", "Saltar": "Jump", "Atacar": "Attack", "Interactuar": "Interact", "Menú": "Menu",
    "Música": "Music", "Seleccionar": "Select", "Navegar": "Navigate", "Confirmar": "Confirm", "Volver": "Back",
    "MÚSICA Y SONIDO": "MUSIC & SOUND", "Efectos": "Effects", "ESC para volver": "ESC to go back",
    "ELIGE TU IDIOMA": "CHOOSE YOUR LANGUAGE", "ELIGE TU DISPOSITIVO": "CHOOSE YOUR DEVICE", "ELIGE TU FORMA DE JUGAR": "CHOOSE HOW TO PLAY",
    "Celular / Tablet": "Mobile / Tablet", "Control de Play": "Play Controller", "Choose your language": "Choose your language", "Escolha seu idioma": "Choose your language",
    "Espada": "Sword", "Modo": "Mode", "JUGADOR": "PLAYER", "Tiempo": "Time", "Vida": "Health",
    "Murciélago Sombrío": "Shadow Bat", "Criatura alada que habita las profundidades. se alimenta de energia de hechizos.": "Winged creature that dwells in the depths and feeds on spell energy.",
    "Larva-Mosca": "Fly Larva", "Aberración híbrida que embiste con ferocidad.": "A hybrid aberration that charges with ferocity.",
    "⚙️ Configuración": "⚙️ Settings", "Panel del admin": "Admin Panel", "Dificultad": "Difficulty",
    "ELIGE LA DIFICULTAD": "CHOOSE DIFFICULTY", "Esta opción se guardará con la nueva partida": "This choice will be saved with the new game",
    "FÁCIL": "EASY", "NORMAL": "NORMAL", "DIFÍCIL": "HARD", "Recibes menos daño de los enemigos.": "You take less damage from enemies.",
    "La experiencia equilibrada.": "The balanced experience.", "Recibes más daño de los enemigos.": "You take more damage from enemies.",
    "Idioma": "Language", "Dispositivo": "Device", "Admin activado": "Admin enabled", "Activar modo admin": "Enable admin mode",
    "INVENTARIO": "INVENTORY", "Presiona ` o SHARE para cerrar": "Press ` or SHARE to close", "cerrar mapa": "close map", "usar mapa": "use map",
    "JUGADOR 1": "PLAYER 1", "Arco": "Bow", "Flechas": "Arrows", "Bendición codiciosa": "Greedy blessing", "Saltos": "Jumps",
    "Doble": "Double", "Simple": "Single", "MAPA DE TODAS LAS ZONAS": "MAP OF ALL AREAS", "ZONA": "AREA", "JEFE": "BOSS",
    "ESTADÍSTICAS": "STATS", "Nueva criatura descubierta!": "New creature discovered!", "Listo": "Ready", "Encuentra la espada...": "Find the sword...",
    "Dash": "Dash", "CONSOLA ADMIN  •  COMANDOS DISPONIBLES": "ADMIN CONSOLE  •  AVAILABLE COMMANDS",
    "Ejemplo: /give azari 1000": "Example: /give azari 1000", "Ejemplo: /tp habitacion 5": "Example: /tp room 5",
    "ENTER ejecutar  •  ESC cerrar": "ENTER execute  •  ESC close", "ENTER / ESPACIO para continuar": "ENTER / SPACE to continue",
    "¿BORRAR RANURA": "DELETE SLOT", "Esta acción no se puede deshacer": "This action cannot be undone",
    "Confirmar": "Confirm", "Cancelar": "Cancel",     "ENTER confirmar  •  ESC cancelar": "ENTER confirm  •  ESC cancel", "Música y sonido": "Music & sound",
    "Dorado: zona actual  •  Morado: jefe  •  Verde: tienda  •  Rojo: peligro": "Gold: current area  •  Purple: boss  •  Green: shop  •  Red: danger",
    "Introduce la contraseña": "Enter the password", "para nueva partida": "for a new game", "ENEMIGOS": "ENEMIES", "JEFES": "BOSSES",
    "LOGRO DESBLOQUEADO": "ACHIEVEMENT UNLOCKED", "Primer enemigo": "First enemy", "Primer jefe": "First boss",
    "50 enemigos": "50 enemies", "100 enemigos": "100 enemies",
    "Guardia": "Guard", "Recarga": "Cooldown", "Guardia lista": "Guard ready", "Guardia agotada": "Guard expired",
    "Registro de criaturas y grandes enemigos": "Record of creatures and great enemies",
    "Guardián de la Cueva": "Cave Guardian", "Reina Larva": "Larva Queen", "Caballero Abismal": "Abyssal Knight",
    "JEFE DERROTADO": "BOSS DEFEATED", "Recompensa": "Reward", "Habilidad nueva": "New ability",
    "Zona desbloqueada": "Zone unlocked", "Guardia pétrea": "Stone Guard", "Llamada de crías": "Brood Call",
    "Corte abisal": "Abyssal Slash", "FASE": "PHASE", "ENTRADA CINEMÁTICA": "CINEMATIC ENTRANCE",
    "Ataque especial": "Special attack", "¡COMIENZA EL COMBATE!": "THE FIGHT BEGINS!",
    "Corazón de piedra": "Stone Heart", "Núcleo de la colonia": "Colony Core", "Fragmento del abismo": "Abyss Shard",
    "Santuario de la Cueva": "Cave Sanctuary", "Nido Carmesí": "Crimson Nest", "Trono del Abismo": "Abyssal Throne"
  },
  pt: {
    "CABALLERO MÍSTICO": "CAVALEIRO MÍSTICO", "Selecciona una ranura": "Selecione um espaço", "RANURA": "ESPAÇO",
    "Guardado": "Salvo", "Vacía": "Vazio", "para nueva partida": "para novo jogo", "Borrar": "Apagar",
    "Reanudar": "Continuar", "Ver Diario": "Ver Diário", "Agregar J2": "Adicionar J2", "Quitar J2": "Remover J2",
    "Controles": "Controles", "Salir al Menú": "Sair ao Menu", "PAUSA": "PAUSADO", "DIARIO DEL CABALLERO": "DIÁRIO DO CAVALEIRO",
    "Bestiario de criaturas abatidas": "Bestiário de criaturas derrotadas", "Abatidos": "Derrotados", "Criatura no descubierta.": "Criatura não descoberta.",
    "ESTADÍSTICAS": "ESTATÍSTICAS", "Inventario": "Inventário", "Sin arma": "Sem arma", "Encuentra la espada...": "Encontre a espada...",
    "Nueva criatura descubierta!": "Nova criatura descoberta!", "CARGANDO": "CARREGANDO", "TIENDA DEL EXILIADO": "LOJA DO EXILADO",
    "Mapa de la Zona": "Mapa da Área", "Ya lo posees": "Você já possui", "Comprar": "Comprar", "Fragmentos": "Fragmentos",
    "Compra fragmentos": "Comprar fragmentos", "Amuleto": "Amuleto", "Vida restaurada!": "Vida restaurada!",
    "Obtuviste la Espada!": "Você conseguiu a Espada!", "Presiona": "Pressione", "atacar": "para atacar", "Muerto!": "Derrotado!",
    "No hay más abajo!": "Não há mais abaixo!", "No hay vuelta atrás...": "Não há como voltar...",
    "cayó!": "caiu!", "sentándose...": "sentando...", "Mando detectado": "Controle detectado",
    "CAVERNA INICIAL": "CAVERNA INICIAL", "CUEVA OLVIDADA": "CAVERNA ESQUECIDA", "ASCENSO ROCOSO": "SUBIDA ROCHOSA",
    "TÚNELES OLVIDADOS": "TÚNEIS ESQUECIDOS", "PROFUNDIDADES": "PROFUNDEZAS", "PICO ABISMAL": "PICO ABISSAL",
    "CAMINO FINAL": "CAMINHO FINAL", "TIENDA": "LOJA", "Mapa": "Mapa", "Fragmentos J1": "Fragmentos J1", "Fragmentos J2": "Fragmentos J2",
    "Mover": "Mover", "Saltar": "Pular", "Atacar": "Atacar", "Interactuar": "Interagir", "Menú": "Menu",
    "Música": "Música", "Seleccionar": "Selecionar", "Navegar": "Navegar", "Confirmar": "Confirmar", "Volver": "Voltar",
    "MÚSICA Y SONIDO": "MÚSICA E SOM", "Efectos": "Efeitos", "ESC para volver": "ESC para voltar",
    "ELIGE TU IDIOMA": "ESCOLHA SEU IDIOMA", "ELIGE TU DISPOSITIVO": "ESCOLHA SEU DISPOSITIVO", "ELIGE TU FORMA DE JUGAR": "ESCOLHA COMO JOGAR",
    "Celular / Tablet": "Celular / Tablet", "Control de Play": "Controle de Play", "Choose your language": "Escolha seu idioma", "Escolha seu idioma": "Escolha seu idioma",
    "Espada": "Espada", "Modo": "Modo", "JUGADOR": "JOGADOR", "Tiempo": "Tempo", "Vida": "Vida",
    "Murciélago Sombrío": "Morcego Sombrio", "Criatura alada que habita las profundidades. se alimenta de energia de hechizos.": "Criatura alada das profundezas que se alimenta de energia de feitiços.",
    "Larva-Mosca": "Larva-Mosca", "Aberración híbrida que embiste con ferocidad.": "Aberração híbrida que investe com ferocidade.",
    "⚙️ Configuración": "⚙️ Configurações", "Panel del admin": "Painel do admin", "ELIGE LA DIFICULTAD": "ESCOLHA A DIFICULDADE",
    "Esta opción se guardará con la nueva partida": "Esta opção será salva com o novo jogo", "FÁCIL": "FÁCIL", "NORMAL": "NORMAL", "DIFÍCIL": "DIFÍCIL",
    "Recibes menos daño de los enemigos.": "Você recebe menos dano dos inimigos.", "La experiencia equilibrada.": "A experiência equilibrada.", "Recibes más daño de los enemigos.": "Você recebe mais dano dos inimigos.",
    "Idioma": "Idioma", "Dispositivo": "Dispositivo", "Admin activado": "Admin ativado", "Activar modo admin": "Ativar modo admin",
    "INVENTARIO": "INVENTÁRIO", "Presiona ` o SHARE para cerrar": "Pressione ` ou SHARE para fechar", "cerrar mapa": "fechar mapa", "usar mapa": "usar mapa",
    "JUGADOR 1": "JOGADOR 1", "Arco": "Arco", "Flechas": "Flechas", "Bendición codiciosa": "Bênção gananciosa", "Saltos": "Saltos",
    "Doble": "Duplo", "Simple": "Simples", "MAPA DE TODAS LAS ZONAS": "MAPA DE TODAS AS ÁREAS", "ZONA": "ÁREA", "JEFE": "CHEFE",
    "Dash": "Dash", "CONSOLA ADMIN  •  COMANDOS DISPONIBLES": "CONSOLE ADMIN  •  COMANDOS DISPONÍVEIS",
    "Ejemplo: /give azari 1000": "Exemplo: /give azari 1000", "Ejemplo: /tp habitacion 5": "Exemplo: /tp sala 5",
    "ENTER ejecutar  •  ESC cerrar": "ENTER executar  •  ESC fechar", "ENTER / ESPACIO para continuar": "ENTER / ESPAÇO para continuar",
    "¿BORRAR RANURA": "APAGAR ESPAÇO", "Esta acción no se puede deshacer": "Esta ação não pode ser desfeita",
    "Confirmar": "Confirmar", "Cancelar": "Cancelar",     "ENTER confirmar  •  ESC cancelar": "ENTER confirmar  •  ESC cancelar", "Música y sonido": "Música e som",
    "Dorado: zona actual  •  Morado: jefe  •  Verde: tienda  •  Rojo: peligro": "Dourado: área atual  •  Roxo: chefe  •  Verde: loja  •  Vermelho: perigo",
    "Introduce la contraseña": "Digite a senha", "para nueva partida": "para novo jogo", "ENEMIGOS": "INIMIGOS", "JEFES": "CHEFES",
    "LOGRO DESBLOQUEADO": "CONQUISTA DESBLOQUEADA", "Primer enemigo": "Primeiro inimigo", "Primer jefe": "Primeiro chefe",
    "50 enemigos": "50 inimigos", "100 enemigos": "100 inimigos",
    "Guardia": "Guarda", "Recarga": "Recarga", "Guardia lista": "Guarda pronta", "Guardia agotada": "Guarda esgotada",
    "Registro de criaturas y grandes enemigos": "Registro de criaturas e grandes inimigos",
    "Guardián de la Cueva": "Guardião da Caverna", "Reina Larva": "Rainha Larva", "Caballero Abismal": "Cavaleiro Abissal",
    "JEFE DERROTADO": "CHEFE DERROTADO", "Recompensa": "Recompensa", "Habilidad nueva": "Nova habilidade",
    "Zona desbloqueada": "Área desbloqueada", "Guardia pétrea": "Guarda pétrea", "Llamada de crías": "Chamado da ninhada",
    "Corte abisal": "Corte abissal", "FASE": "FASE", "ENTRADA CINEMÁTICA": "ENTRADA CINEMATOGRÁFICA",
    "Ataque especial": "Ataque especial", "¡COMIENZA EL COMBATE!": "A LUTA COMEÇA!",
    "Corazón de piedra": "Coração de pedra", "Núcleo de la colonia": "Núcleo da colônia", "Fragmento del abismo": "Fragmento do abismo",
    "Santuario de la Cueva": "Santuário da Caverna", "Nido Carmesí": "Ninho Carmesim", "Trono del Abismo": "Trono do Abismo"
  }
};

function translateText(text) {
  if (language === "es") return text;
  var result = String(text);
  var dictionary = translations[language] || {};
  Object.keys(dictionary).sort(function(a, b) { return b.length - a.length; }).forEach(function(key) {
    result = result.split(key).join(dictionary[key]);
  });
  return result;
}
var menuSelection = 0, menuSubState = "slots", slotToDelete = -1, activeSlot = -1;
var settingsSelection = 0, settingsReturn = false, adminFromSettings = false;
var difficultySelection = 1, difficulty = "normal";
var difficultyOptions = [
  { id: "easy", name: "FÁCIL", desc: "Recibes menos daño de los enemigos.", damage: 0.7 },
  { id: "normal", name: "NORMAL", desc: "La experiencia equilibrada.", damage: 1 },
  { id: "hard", name: "DIFÍCIL", desc: "Recibes más daño de los enemigos.", damage: 1.35 }
];
var adminPassword = "", adminMessage = "";
var adminMode = false, adminConsoleOpen = false, adminCommand = "", adminCommandMessage = "";
var pauseSelection = 0, pauseSubState = "menu", diaryCategory = "enemies";

var transTimer = 0, transPhase = "out", transTargetRoom = 0, transFade = 0;
var transIsFall = false, transitionCooldown = 0;

var audioCtx = null, musicPlaying = false, musicInterval = null, sfxEnabled = true;
var musicVolume = 0.35, sfxVolume = 0.7;
var gamepadConnected = false, gamepadIndex = -1;
var gpButtons = {}, prevGPButtons = {}, gpAxes = { x: 0, y: 0 };
var gamepadMenuAxisLock = 0;

var zoneName = "", zoneNameTimer = 0;

var azari = 0, hasMap = false, hasBow = false, arrows = 0, shopOpen = false, shopMenuOpen = false, shopId = 0, shopAnim = 0, shopConfirm = -1, shopGreeting = "", shopGreetingTimer = 0;
var shopPreviousX = 0, shopPreviousY = 0, shopExitCooldown = 0;
var heartFragments1 = 0, heartFragments2 = 0;
var heartFragmentsBought1 = 0, heartFragmentsBought2 = 0;
var hasAzariCharm = false, hasDoubleJump = false;

var lastSafeX = 100, lastSafeY = 400;
var healing = false, healTimer = 0, hitFlash = 0, needsRespawn = false;

var twoPlayerMode = false;
var inventoryOpen = false, mapOpen = false;

var stalactites = [];
var waterDrops = [];
var deathParticles = [];
var playerDead = false;
var deathTimer = 0;
var deathChoice = 0, deathAnimTimer = 0;
var consecutiveDeaths = 0;
var checkpointState = null;
var highestRoomReached = 0;
var tutorialStep = 0, tutorialTimer = 0;
var bossProjectiles = [];
var bossDeathEffects = [];
var bossArenaState = { guardian: false, queen_larva: false, abyssal_knight: false };
var bossAbilities = { guardian: false, queen_larva: false, abyssal_knight: false };
var bossZonesUnlocked = { guardian: false, queen_larva: false, abyssal_knight: false };
var bossVictory = { active: false, timer: 0, type: "", reward: "", ability: "", zone: "" };
var bossIntroTimer = 0;
var bossDoorSoundRoom = -1;
var bossDialogueSeen = {};
var bossDialogueLines = [];
var bossDialogueIndex = 0;

var stats = {
  playTime: 0,
  enemiesKilled: 0,
  roomsVisited: 1,
  jumps: 0,
  attacks: 0,
  deaths: 0
};
var frameCounter = 0;

var bestiaryInfo = {
  bat: { name: "Murciélago Sombrío", desc: "Criatura alada que habita las profundidades. se alimenta de energia de hechizos." },
  larva_mosca: { name: "Larva-Mosca", desc: "Aberración híbrida que embiste con ferocidad." },
  cazador_paramo: { name: "Cazador del Páramo", desc: "Depredador terrestre que patrulla los páramos y persigue a los intrusos." }
};
var bestiary = { bat: { discovered: false, count: 0 }, larva_mosca: { discovered: false, count: 0 }, cazador_paramo: { discovered: false, count: 0 } };
var bossDiaryInfo = {
  guardian: { name: "Guardián de la Cueva", desc: "Protector ancestral de la primera arena. Su fuerza domina las profundidades." },
  queen_larva: { name: "Reina Larva", desc: "Soberana de la colonia. Sus ataques convierten la arena en un nido mortal." },
  abyssal_knight: { name: "Caballero Abismal", desc: "Guerrero final del abismo, capaz de cambiar de fase durante el combate." }
};
var discoveryNotify = { active: false, timer: 0, name: "" };
var achievements = { firstEnemy: false, firstBoss: false, enemies50: false, enemies100: false };
var achievementNotify = { active: false, timer: 0, title: "" };

var player = {
  x: 100, y: 400, w: 22, h: 30, vx: 0, vy: 0, onGround: false, facing: 1,
  jumpsLeft: 1, maxJumps: 2, inv: 0, anim: 0, autoWalk: 0, frozen: false,
  hp: 10, maxHp: 10, id: 1, color: "#0aa", headColor: "#0cc",
  hasSword: false, swordEquipped: false, swordSwing: 0, swordCooldown: 0, bowCooldown: 0, attackHeld: false, attackCharge: 0, attackCharged: false, attackDown: false, attackType: "",
  swordSheathed: true, swordSheathTimer: 0, blocking: false, guardTimer: 0, guardCooldown: 0,
  dashTimer: 0, dashCooldown: 0, dashDir: 1, dashing: false, recoilTimer: 0
};

var player2 = {
  x: 140, y: 400, w: 22, h: 30, vx: 0, vy: 0, onGround: false, facing: 1,
  jumpsLeft: 1, maxJumps: 2, inv: 0, anim: 0, autoWalk: 0, frozen: false,
  hp: 10, maxHp: 10, id: 2, color: "#a0a", headColor: "#c0c",
  hasSword: false, swordEquipped: false, swordSwing: 0, swordCooldown: 0, bowCooldown: 0, attackHeld: false, attackCharge: 0, attackCharged: false, attackDown: false, attackType: "",
  swordSheathed: true, swordSheathTimer: 0, blocking: false, guardTimer: 0, guardCooldown: 0,
  dashTimer: 0, dashCooldown: 0, dashDir: 1, dashing: false, recoilTimer: 0
};

var hasSword = false, swordEquipped = false;
var currentRoom = 0, cameraX = 0, targetCamX = 0, cameraY = 0, targetCamY = 0;
var particles = [], floatTexts = [], arrowsInFlight = [], flash = 0;
var healingHearts = [];
var keys = {};

function formatTime(s) {
  if (!s || s < 0) s = 0;
  if (s < 60) return Math.floor(s) + "s";
  if (s < 3600) return Math.floor(s/60) + "m " + Math.floor(s%60) + "s";
  return Math.floor(s/3600) + "h " + Math.floor((s%3600)/60) + "m " + Math.floor(s%60) + "s";
}

function fmtDate(ts) {
  if (!ts) return "";
  var d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

function getSaves() {
  try { var d = localStorage.getItem(SAVE_KEY); if (d) return JSON.parse(d); }
  catch(e) {}
  return { slots: [null,null,null,null,null] };
}

function saveGame(i) {
  var s = getSaves();
  s.slots[i] = {
    room: currentRoom, px: player.x, py: player.y,
    twoPlayer: twoPlayerMode, hasSword: hasSword, swordEquipped: swordEquipped, hasBow: hasBow, arrows: arrows,
    enemiesKilled: enemies.map(function(e){ return e.dead; }),
    azari: azari, hasMap: hasMap, hp: player.hp, maxHp: player.maxHp,
    highestRoomReached: highestRoomReached,
    checkpointState: checkpointState ? JSON.parse(JSON.stringify(checkpointState)) : null,
    heartFragments1: heartFragments1, heartFragments2: heartFragments2,
    heartFragmentsBought1: heartFragmentsBought1, heartFragmentsBought2: heartFragmentsBought2,
    hasAzariCharm: hasAzariCharm, hasDoubleJump: hasDoubleJump,
    bossesDefeated: {
      guardian: !!bossArenaState.guardian,
      queen_larva: !!bossArenaState.queen_larva,
      abyssal_knight: !!bossArenaState.abyssal_knight
    },
    bossAbilities: {
      guardian: !!bossAbilities.guardian,
      queen_larva: !!bossAbilities.queen_larva,
      abyssal_knight: !!bossAbilities.abyssal_knight
    },
    bestiary: JSON.parse(JSON.stringify(bestiary)),
    achievements: JSON.parse(JSON.stringify(achievements)),
    difficulty: difficulty,
    stats: { playTime: stats.playTime || 0, enemiesKilled: stats.enemiesKilled || 0,
             roomsVisited: stats.roomsVisited || 1, jumps: stats.jumps || 0,
             attacks: stats.attacks || 0, deaths: stats.deaths || 0 },
    timestamp: Date.now()
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(s));
}

function loadGame(i) {
  var s = getSaves().slots[i];
  if (!s) return false;
  bossVictory.active = false;
  achievements = {
    firstEnemy: !!(s.achievements && s.achievements.firstEnemy),
    firstBoss: !!(s.achievements && s.achievements.firstBoss),
    enemies50: !!(s.achievements && s.achievements.enemies50),
    enemies100: !!(s.achievements && s.achievements.enemies100)
  };
  bossDeathEffects = [];
  difficulty = s.difficulty || "normal";
  currentRoom = Math.max(0, Math.min(rooms.length - 1, s.room || 0));
  highestRoomReached = Math.max(currentRoom, s.highestRoomReached || 0);
  checkpointState = s.checkpointState || checkpointState;
  targetCamX = currentRoom * ROOM_W; cameraX = targetCamX;
  player.x = s.px; player.y = s.py; player.vx = 0; player.vy = 0;
  hasSword = s.hasSword || false; swordEquipped = s.swordEquipped || false;
  player.hasSword = hasSword; player.swordEquipped = swordEquipped;
  hasBow = s.hasBow || false; arrows = s.arrows || 0;
  azari = s.azari || 0; hasMap = s.hasMap || false;
  player.hp = s.hp !== undefined ? s.hp : 10;
  player.maxHp = s.maxHp !== undefined ? s.maxHp : 10;
  twoPlayerMode = s.twoPlayer || false;
  heartFragments1 = s.heartFragments1 || 0;
  heartFragments2 = s.heartFragments2 || 0;
  heartFragmentsBought1 = s.heartFragmentsBought1 || 0;
  heartFragmentsBought2 = s.heartFragmentsBought2 || 0;
  hasAzariCharm = s.hasAzariCharm || false;
  hasDoubleJump = s.hasDoubleJump || false;
  bossArenaState.guardian = !!(s.bossesDefeated && s.bossesDefeated.guardian);
  bossArenaState.queen_larva = !!(s.bossesDefeated && s.bossesDefeated.queen_larva);
  bossArenaState.abyssal_knight = !!(s.bossesDefeated && s.bossesDefeated.abyssal_knight);
  bossAbilities.guardian = !!(s.bossAbilities && s.bossAbilities.guardian) || bossArenaState.guardian;
  bossAbilities.queen_larva = !!(s.bossAbilities && s.bossAbilities.queen_larva) || bossArenaState.queen_larva;
  bossAbilities.abyssal_knight = !!(s.bossAbilities && s.bossAbilities.abyssal_knight) || bossArenaState.abyssal_knight;
  bossZonesUnlocked.guardian = bossArenaState.guardian;
  bossZonesUnlocked.queen_larva = bossArenaState.queen_larva;
  bossZonesUnlocked.abyssal_knight = bossArenaState.abyssal_knight;
  rooms[11].transitionZone = bossArenaState.guardian ? {x: 9540, y: 460, w: 40, h: 100, to: 12} : null;
  rooms[12].transitionZone = bossArenaState.queen_larva ? {x: 10340, y: 460, w: 40, h: 100, to: 13} : null;
  if (hasDoubleJump) { player.maxJumps = 2; player2.maxJumps = 2; }
  if (s.bestiary) bestiary = JSON.parse(JSON.stringify(s.bestiary));
  Object.keys(bestiaryInfo).forEach(function(key) {
    if (!bestiary[key]) bestiary[key] = { discovered: false, count: 0 };
  });
  if (s.stats) stats = { playTime: s.stats.playTime || 0, enemiesKilled: s.stats.enemiesKilled || 0, roomsVisited: s.stats.roomsVisited || 1, jumps: s.stats.jumps || 0, attacks: s.stats.attacks || 0, deaths: s.stats.deaths || 0 };
  if (s.enemiesKilled) {
    s.enemiesKilled.forEach(function(dead, idx){ if (enemies[idx]) enemies[idx].dead = dead; });
  }
  enemies.forEach(function(e) {
    if (e.boss && bossArenaState[e.type]) { e.dead = true; e.hp = 0; }
  });
  return true;
}

function applyDifficultyToNewGame() {
  var selected = difficultyOptions[difficultySelection] || difficultyOptions[1];
  difficulty = selected.id;
}

function deleteSave(i) {
  var s = getSaves(); s.slots[i] = null;
  localStorage.setItem(SAVE_KEY, JSON.stringify(s));
}

function spawnParticles(x, y, color, n, spd) {
  spd = spd || 3;
  for (var i = 0; i < n; i++) {
    particles.push({
      x: x, y: y,
      vx: (Math.random()-0.5)*spd,
      vy: (Math.random()-0.5)*spd-1.5,
      life: 40+Math.random()*20,
      maxLife: 50,
      color: color,
      size: 2+Math.random()*3
    });
  }
}

function spawnFloatText(x, y, text, color) {
  floatTexts.push({x: x, y: y, text: text, color: color, life: 70, vy: -1.2});
}

function rectHit(a, b) {
  return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
}

function genDecor(off, nStal, nRock, roomH) {
  nStal = nStal || 10; nRock = nRock || 6; roomH = roomH || 600;
  var d = [];
  for (var i = 0; i < nStal; i++) {
    var x = off + 30 + Math.random() * (ROOM_W - 60);
    d.push({type:'stalactite', x: x, y: 0, w: 8+Math.random()*12, h: 15+Math.random()*40});
  }
  for (var i = 0; i < nRock; i++) {
    var x = off + Math.random() * ROOM_W;
    var h = 12 + Math.random() * 20;
    d.push({type:'rock', x: x, y: roomH-h, w: 20+Math.random()*35, h: h});
  }
  for (var i = 0; i < 4; i++) {
    d.push({type:'wall', x: off+Math.random()*ROOM_W, y: 80+Math.random()*250, w: 12+Math.random()*16, h: 30+Math.random()*60});
  }
  return d;
}

var room0 = {
  height: 600,
  platforms: [
    {x:0, y:560, w:220, h:40}, {x:500, y:560, w:300, h:40},
    {x:180, y:490, w:75, h:14}, {x:300, y:490, w:75, h:14},
    {x:420, y:490, w:75, h:14}, {x:540, y:490, w:75, h:14},
    {x:360, y:410, w:65, h:14}
  ],
  spikes: [{x:220, y:580, w:280, h:20}],
  walls: [],
  transitionZone: null,
  decor: genDecor(0, 10, 6, 600)
};

var room1 = {
  height: 600,
  platforms: [
    {x:800, y:560, w:800, h:40}, {x:950, y:480, w:80, h:14},
    {x:1350, y:480, w:80, h:14}, {x:1050, y:380, w:80, h:14},
    {x:1250, y:300, w:80, h:14}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  pedestal: { stone:{x:1130, y:520, w:100, h:40}, glass:{x:1145, y:440, w:70, h:80},
    sword:{x:1167, y:455, w:6, h:48}, taken:false, glow:0 },
  decor: genDecor(800, 10, 6, 600)
};

var room2 = {
  height: 600,
  platforms: [
    {x:1600, y:560, w:800, h:40}, {x:1650, y:480, w:70, h:14},
    {x:1750, y:410, w:70, h:14}, {x:1650, y:280, w:70, h:14},
    {x:1750, y:200, w:70, h:14}, {x:1650, y:130, w:70, h:14},
    {x:1600, y:80, w:200, h:40}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  decor: genDecor(1600, 6, 4, 600)
};

var room3 = {
  height: 600,
  platforms: [
    {x:2400, y:560, w:800, h:40}, {x:2450, y:480, w:100, h:14},
    {x:2650, y:480, w:100, h:14}, {x:2850, y:480, w:100, h:14},
    {x:3050, y:480, w:100, h:14}, {x:2500, y:380, w:80, h:14},
    {x:2700, y:320, w:80, h:14}, {x:2900, y:380, w:80, h:14},
    {x:2550, y:250, w:80, h:14}, {x:2750, y:200, w:80, h:14}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  decor: genDecor(2400, 8, 5, 600)
};

var room4 = {
  height: 600,
  platforms: [
    {x:3200, y:560, w:800, h:40}, {x:3250, y:480, w:90, h:14},
    {x:3400, y:420, w:90, h:14}, {x:3550, y:360, w:90, h:14},
    {x:3700, y:300, w:90, h:14}, {x:3300, y:250, w:80, h:14},
    {x:3500, y:200, w:80, h:14}, {x:3750, y:420, w:80, h:14},
    {x:3350, y:350, w:80, h:14}
  ],
  spikes: [{x:3600, y:560, w:200, h:20}],
  walls: [],
  transitionZone: null,
  decor: genDecor(3200, 10, 6, 600)
};

var room5 = {
  height: 600,
  platforms: [
    {x:4000, y:560, w:800, h:40}, {x:4050, y:480, w:120, h:14},
    {x:4250, y:480, w:120, h:14}, {x:4450, y:480, w:120, h:14},
    {x:4150, y:380, w:100, h:14}, {x:4350, y:380, w:100, h:14},
    {x:4250, y:280, w:100, h:14}, {x:4100, y:200, w:100, h:14},
    {x:4400, y:200, w:100, h:14}
  ],
  spikes: [], walls: [],
  transitionZone: {x:4750, y:460, w:50, h:100, to:6},
  decor: genDecor(4000, 6, 8, 600)
};

var room6 = {
  height: 1200,
  platforms: [
    {x:4800, y:1160, w:200, h:40}, {x:4850, y:1100, w:120, h:14},
    {x:5000, y:1040, w:120, h:14}, {x:5150, y:980, w:120, h:14},
    {x:4950, y:920, w:120, h:14}, {x:5200, y:860, w:120, h:14},
    {x:5050, y:800, w:120, h:14}, {x:5300, y:740, w:120, h:14},
    {x:5100, y:680, w:120, h:14}, {x:5350, y:620, w:120, h:14},
    {x:5150, y:560, w:120, h:14}, {x:5400, y:500, w:120, h:14},
    {x:5200, y:440, w:120, h:14}, {x:5450, y:380, w:120, h:14},
    {x:5250, y:320, w:120, h:14}, {x:5400, y:260, w:120, h:14},
    {x:5200, y:200, w:120, h:14}, {x:5450, y:140, w:120, h:14},
    {x:5250, y:80, w:200, h:40}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  decor: genDecor(4800, 8, 5, 1200)
};

var room7 = {
  height: 600,
  platforms: [
    {x:5600, y:560, w:800, h:40}, {x:5650, y:480, w:120, h:14},
    {x:5850, y:480, w:120, h:14}, {x:6050, y:480, w:120, h:14},
    {x:5700, y:380, w:100, h:14}, {x:5900, y:300, w:100, h:14},
    {x:6100, y:380, w:100, h:14}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  decor: genDecor(5600, 6, 8, 600)
};

var room8 = {
  height: 600,
  platforms: [
    {x:6400, y:560, w:800, h:40}, {x:6450, y:480, w:120, h:14},
    {x:6650, y:480, w:120, h:14}, {x:6850, y:480, w:120, h:14},
    {x:6500, y:380, w:100, h:14}, {x:6700, y:300, w:100, h:14},
    {x:6900, y:380, w:100, h:14}
  ],
  spikes: [], walls: [],
  transitionZone: null,
  decor: genDecor(6400, 6, 8, 600)
};

var room9 = {
  height: 600,
  platforms: [
    {x:7200, y:560, w:800, h:40},
    {x:7300, y:400, w:100, h:14}, {x:7500, y:350, w:100, h:14},
    {x:7700, y:400, w:100, h:14}, {x:7400, y:280, w:80, h:14},
    {x:7600, y:250, w:80, h:14}, {x:7800, y:280, w:80, h:14}
  ],
  spikes: [], walls: [{x:7980, y:0, w:20, h:600}],
  transitionZone: {x:7960, y:460, w:40, h:100, to:10},
  shops: [
    { id: 0, npc: {x:7380, y:525, w:20, h:35}, label: "" },
    { id: 1, npc: {x:7780, y:525, w:20, h:35}, label: "" }
  ],
  healingStone: {x: 7500, y: 520, w: 50, h: 40, active: true},
  decor: genDecor(7200, 10, 8, 600)
};

/* The final descent was lost in an earlier regression.  Keep it as a
   deliberately small ten-platform vertical room before the boss arenas. */
var room10 = {
  height: 1200,
  platforms: [
    {x:8000, y:1160, w:800, h:40}, {x:8060, y:1050, w:120, h:14},
    {x:8220, y:930, w:120, h:14}, {x:8420, y:810, w:120, h:14},
    {x:8260, y:690, w:120, h:14}, {x:8460, y:570, w:120, h:14},
    {x:8300, y:450, w:120, h:14}, {x:8500, y:330, w:120, h:14},
    {x:8340, y:210, w:120, h:14}, {x:8500, y:80, w:200, h:40}
  ],
  spikes: [], walls: [], transitionZone: null,
  decor: genDecor(8000, 8, 5, 1200)
};

var room11 = {
  height: 600,
  platforms: [{x:8800, y:560, w:800, h:40}],
  spikes: [], walls: [{x:9582, y:0, w:18, h:600}],
  transitionZone: {x:9540, y:460, w:40, h:100, to:12},
  decor: genDecor(8800, 6, 5, 600), bossName: "GUARDIÁN DE LA CUEVA"
};

var room12 = {
  height: 600,
  platforms: [{x:9600, y:560, w:800, h:40}],
  spikes: [], walls: [{x:10382, y:0, w:18, h:600}],
  transitionZone: {x:10340, y:460, w:40, h:100, to:13},
  decor: genDecor(9600, 8, 4, 600), bossName: "REINA LARVA"
};

var room13 = {
  height: 600,
  platforms: [{x:10400, y:560, w:800, h:40}],
  spikes: [], walls: [{x:11182, y:0, w:18, h:600}],
  transitionZone: null,
  decor: genDecor(10400, 10, 5, 600), bossName: "CABALLERO ABISMAL"
};

var rooms = [room0, room1, room2, room3, room4, room5, room6, room7, room8, room9,
  room10, room11, room12, room13];

var enemies = [
  {x: 150, y: 350, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 350, range: 60, dead: false, room: 0, type: 'bat'},
  {x: 350, y: 400, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 400, range: 50, dead: false, room: 0, type: 'bat'},
  {x: 550, y: 300, w: 24, h: 20, vx: 1.8, vy: 0, baseY: 300, range: 80, dead: false, room: 0, type: 'bat'},
  {x: 1050, y: 350, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 350, range: 60, dead: false, room: 1, type: 'bat'},
  {x: 1250, y: 400, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 400, range: 50, dead: false, room: 1, type: 'bat'},
  {x: 1150, y: 250, w: 24, h: 20, vx: 1.3, vy: 0, baseY: 250, range: 70, dead: false, room: 1, type: 'bat'},
  {x: 1350, y: 300, w: 24, h: 20, vx: -1.5, vy: 0, baseY: 300, range: 55, dead: false, room: 1, type: 'bat'},
  {x: 1680, y: 300, w: 24, h: 20, vx: 1.8, vy: 0, baseY: 300, range: 80, dead: false, room: 2, type: 'bat'},
  {x: 1780, y: 200, w: 24, h: 20, vx: -1.5, vy: 0, baseY: 200, range: 70, dead: false, room: 2, type: 'bat'},
  {x: 1720, y: 450, w: 24, h: 20, vx: 1.3, vy: 0, baseY: 450, range: 60, dead: false, room: 2, type: 'bat'},
  {x: 1650, y: 150, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 150, range: 50, dead: false, room: 2, type: 'bat'},
  {x: 2550, y: 350, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 350, range: 60, dead: false, room: 3, type: 'bat'},
  {x: 2750, y: 400, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 400, range: 50, dead: false, room: 3, type: 'bat'},
  {x: 2900, y: 300, w: 24, h: 20, vx: 1.8, vy: 0, baseY: 300, range: 80, dead: false, room: 3, type: 'bat'},
  {x: 2650, y: 250, w: 24, h: 20, vx: -1.4, vy: 0, baseY: 250, range: 65, dead: false, room: 3, type: 'bat'},
  {x: 3400, y: 350, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 350, range: 60, dead: false, room: 4, type: 'bat'},
  {x: 3600, y: 250, w: 24, h: 20, vx: -1.3, vy: 0, baseY: 250, range: 70, dead: false, room: 4, type: 'bat'},
  {x: 3800, y: 450, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 450, range: 50, dead: false, room: 4, type: 'bat'},
  {x: 3500, y: 180, w: 24, h: 20, vx: -1.6, vy: 0, baseY: 180, range: 75, dead: false, room: 4, type: 'bat'},
  {x: 4200, y: 350, w: 24, h: 20, vx: 1.0, vy: 0, baseY: 350, range: 40, dead: false, room: 5, type: 'bat'},
  {x: 4350, y: 280, w: 24, h: 20, vx: -1.3, vy: 0, baseY: 280, range: 60, dead: false, room: 5, type: 'bat'},
  {x: 4500, y: 420, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 420, range: 55, dead: false, room: 5, type: 'bat'},
  {x: 4100, y: 200, w: 24, h: 20, vx: -1.1, vy: 0, baseY: 200, range: 45, dead: false, room: 5, type: 'bat'},
  {x: 4850, y: 1070, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 1070, range: 50, dead: false, room: 6, type: 'bat'},
  {x: 5050, y: 1010, w: 24, h: 20, vx: -1.3, vy: 0, baseY: 1010, range: 60, dead: false, room: 6, type: 'bat'},
  {x: 5250, y: 950, w: 24, h: 20, vx: 1.6, vy: 0, baseY: 950, range: 55, dead: false, room: 6, type: 'bat'},
  {x: 5450, y: 830, w: 24, h: 20, vx: -1.4, vy: 0, baseY: 830, range: 45, dead: false, room: 6, type: 'bat'},
  {x: 5150, y: 710, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 710, range: 50, dead: false, room: 6, type: 'bat'},
  {x: 5000, y: 1020, w: 28, h: 22, vx: 0, vy: 0, speed: 1.8, visionRadius: 180, dead: false, room: 6, type: 'larva_mosca'},
  {x: 5350, y: 590, w: 28, h: 22, vx: 0, vy: 0, speed: 1.8, visionRadius: 180, dead: false, room: 6, type: 'larva_mosca'},
  {x: 7480, y: 540, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 540, range: 180, speed: 1.4, dead: false, room: 9, type: 'cazador_paramo', terrestrial: true},
  {x: 8200, y: 1140, w: 24, h: 20, vx: -1.1, vy: 0, baseY: 1140, range: 110, speed: 1.3, dead: false, room: 10, type: 'cazador_paramo', terrestrial: true},
  {x: 5750, y: 350, w: 24, h: 20, vx: 1.4, vy: 0, baseY: 350, range: 55, dead: false, room: 7, type: 'bat'},
  {x: 5900, y: 420, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 420, range: 50, dead: false, room: 7, type: 'bat'},
  {x: 6100, y: 300, w: 24, h: 20, vx: 1.6, vy: 0, baseY: 300, range: 70, dead: false, room: 7, type: 'bat'},
  {x: 5800, y: 250, w: 24, h: 20, vx: -1.3, vy: 0, baseY: 250, range: 60, dead: false, room: 7, type: 'bat'},
  {x: 6550, y: 350, w: 24, h: 20, vx: 1.5, vy: 0, baseY: 350, range: 60, dead: false, room: 8, type: 'bat'},
  {x: 6700, y: 420, w: 24, h: 20, vx: -1.2, vy: 0, baseY: 420, range: 50, dead: false, room: 8, type: 'bat'},
  {x: 6900, y: 300, w: 24, h: 20, vx: 1.7, vy: 0, baseY: 300, range: 75, dead: false, room: 8, type: 'bat'},
  {x: 6600, y: 250, w: 24, h: 20, vx: -1.4, vy: 0, baseY: 250, range: 65, dead: false, room: 8, type: 'bat'},
  {x: 7350, y: 350, w: 24, h: 20, vx: 1.3, vy: 0, baseY: 350, range: 55, dead: false, room: 9, type: 'bat'},
  {x: 7550, y: 420, w: 24, h: 20, vx: -1.5, vy: 0, baseY: 420, range: 60, dead: false, room: 9, type: 'bat'},
  {x: 7750, y: 300, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 300, range: 50, dead: false, room: 9, type: 'bat'},
  {x:7450, y:250, w:24, h:20, vx: -1.4, vy: 0, baseY: 250, range: 70, dead: false, room: 9, type: 'bat'},
  {x:9140, y:470, w:70, h:90, vx: 0, vy: 0, dead: false, room: 11, type: 'guardian',
    boss: true, bossName: "GUARDIÁN DE LA CUEVA", hp: 100, maxHp: 100, aiTimer: 80, attackTimer: 60, phase: 1, enraged: false},
  {x:9940, y:470, w:78, h:90, vx: 0, vy: 0, dead: false, room: 12, type: 'queen_larva',
    boss: true, bossName: "REINA LARVA", hp: 140, maxHp: 140, aiTimer: 90, attackTimer: 70, phase: 1, enraged: false},
  {x:10740, y:460, w:60, h:100, vx: 0, vy: 0, dead: false, room: 13, type: 'abyssal_knight',
    boss: true, bossName: "CABALLERO ABISMAL", hp: 180, maxHp: 180, aiTimer: 70, attackTimer: 50, phase: 1, enraged: false}
];
enemies.forEach(function(e) { e.canRoam = !e.boss; });

var midScene = null;
