var canvas, ctx;
var ROOM_W = 800, ROOM_H = 600, GRAVITY = 0.6;
var DASH_SPEED = 12, DASH_DURATION = 10, DASH_COOLDOWN = 45, DASH_INV_FRAMES = 12;
var GUARD_DURATION = 600, GUARD_COOLDOWN = 600;
/* Rooms 0-9 are the original route, room 10 is the final descent, and
   rooms 11-13 are the Guardian, Queen Larva, and Abyssal Knight arenas. */
var WORLD_W = 40 * ROOM_W;
var SAVE_KEY = "caballero_mistico_v080";
var VERSION = "v1.65";

var ST_LANGUAGE = 0, ST_DEVICE = 1, ST_MENU = 2, ST_PLAYING = 3, ST_PAUSED = 4, ST_TRANSITION = 5, ST_INVENTORY = 7, ST_DIALOGUE = 8, ST_DEATH = 9, ST_HOUSE = 10, ST_LEVEL_EDITOR = 11, ST_INTRO = 12;
var introTimer = 0;

var isMobileBrowser = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 0 && window.innerWidth <= 900);
var gameState = ST_LANGUAGE;
var languageSelection = 0, language = "es";
var deviceSelection = isMobileBrowser ? 1 : 0, device = isMobileBrowser ? "touch" : "pc";
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
var levelsSelection = 0;
var settingsSelection = 0, settingsReturn = false, adminFromSettings = false;
var brightnessBoost = 1;
var difficultySelection = 1, difficulty = "normal";
var gameMode = "normal", modeSelection = 0;
var infiniteWave = 0, infiniteSpawnTimer = 0;
var adMenuSelection = 0, adMessage = "", adMessageTimer = 0;
var adRewardedRevive = false, adAzariBonusTimer = 0;
var GAM_AD_UNIT_PATH = "";
var GAM_ENABLE_TEST_REWARDS = false;
var modeOptions = [
  { id: "normal", name: "MODO NORMAL", desc: "Recorre la historia y derrota a los jefes." },
  { id: "infinite", name: "MODO INFINITO", desc: "Sobrevive a oleadas interminables de enemigos." }
];
var difficultyOptions = [
  { id: "easy", name: "FÁCIL", desc: "Recibes menos daño de los enemigos.", damage: 0.7 },
  { id: "normal", name: "NORMAL", desc: "La experiencia equilibrada.", damage: 1 },
  { id: "hard", name: "DIFÍCIL", desc: "Recibes más daño de los enemigos.", damage: 1.35 }
];
var adminPassword = "", adminMessage = "";
var adminMode = false, adminConsoleOpen = false, adminCommand = "", adminCommandMessage = "";
var pauseSelection = 0, pauseSubState = "menu", diaryCategory = "enemies", diaryScroll = 0;

var transTimer = 0, transPhase = "out", transTargetRoom = 0, transFade = 0;
var transIsFall = false, transIsRise = false, transitionCooldown = 0;

var audioCtx = null, musicPlaying = false, musicInterval = null, sfxEnabled = true;
var masterVolume = 1, musicVolume = 0.75, sfxVolume = 0.7, audioSelection = 0;
var ambientTimer = 0;
var gamepadConnected = false, gamepadIndex = -1;
var gpButtons = {}, prevGPButtons = {}, gpAxes = { x: 0, y: 0 };
var gamepadMenuAxisLock = 0;

var zoneName = "", zoneNameTimer = 0;

var lastSafeX = 100, lastSafeY = 400;
var healing = false, healTimer = 0, healingStoneCooldown = 0, hitFlash = 0, needsRespawn = false;

var twoPlayerMode = false;
var inventoryOpen = false, mapOpen = false, inventorySelection = 0, inventoryHover = -1;

var CUSTOM_LEVELS_KEY = "caballero_mistico_custom_levels_v1";
var EDITOR_COLS = 18, EDITOR_ROWS = 12, EDITOR_CELL = 32;
var EDITOR_GRID_X = 24, EDITOR_GRID_Y = 86, EDITOR_PANEL_X = 620;
var editorCategory = 0, editorPaletteSelection = 0;
var editorLevel = null, editorMessage = "";
var customLevelActive = false;
var customLevelGoal = null;
var customRooms = [], customRoomIndex = 0;
var editorRoomIndex = 0;
var editorCategories = ["FAVORITOS", "PINCHOS", "ENEMIGOS", "PLATAFORMAS"];
var editorPalette = [
  [
    {id: "start", label: "INICIO", kind: "start", color: "#ffd700"},
    {id: "goal", label: "META", kind: "goal", color: "#6cc"},
    {id: "door", label: "PUERTA / META", kind: "goal", color: "#7dffad"},
    {id: "erase", label: "BORRAR", kind: "erase", color: "#f66"}
  ],
  [
    {id: "spike", label: "PINCHO", kind: "spike", color: "#f55"}
  ],
  [
    {id: "bat", label: "MURCIÉLAGO", kind: "enemy", color: "#d66cff"},
    {id: "larva", label: "LARVA-MOSCA", kind: "enemy", color: "#ff9b3d"},
    {id: "hunter", label: "CAZADOR", kind: "enemy", color: "#d98b58"},
    {id: "dark_knight", label: "CABALLERO", kind: "enemy", color: "#7185c7"},
    {id: "blue_sentry", label: "CENTINELA AZUL", kind: "enemy", color: "#4fdcff"}
  ],
  [
    {id: "platform", label: "PLATAFORMA", kind: "platform", color: "#6cc"},
    {id: "platform_small", label: "PLATAFORMA CORTA", kind: "platform", color: "#8bd"},
    {id: "wall", label: "MURO", kind: "wall", color: "#789"},
    {id: "floor", label: "SUELO", kind: "platform", color: "#a98"}
  ]
];

var stalactites = [];
var waterDrops = [];
var azariDrops = [];
var deathParticles = [];
var playerDead = false;
var deathTimer = 0;
var deathChoice = 0, deathAnimTimer = 0;
var consecutiveDeaths = 0;
var checkpointState = null;
var highestRoomReached = 0;
var tutorialStep = 0, tutorialTimer = 0;

var stats = {
  playTime: 0,
  enemiesKilled: 0,
  roomsVisited: 1,
  jumps: 0,
  attacks: 0,
  deaths: 0
};
var frameCounter = 0;

var discoveryNotify = { active: false, timer: 0, name: "" };
var achievements = { firstEnemy: false, firstBoss: false, enemies50: false, enemies100: false };
var achievementNotify = { active: false, timer: 0, title: "" };

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

function createBlankEditorLevel() {
  var cells = [];
  for (var i = 0; i < EDITOR_COLS * EDITOR_ROWS; i++) cells.push(null);
  return {
    name: "NIVEL PERSONALIZADO",
    cols: EDITOR_COLS,
    rows: EDITOR_ROWS,
    cells: cells,
    rooms: [{cells: cells}],
    timestamp: 0
  };
}

function getCustomLevels() {
  try {
    var data = localStorage.getItem(CUSTOM_LEVELS_KEY);
    var levels = data ? JSON.parse(data) : [];
    return Array.isArray(levels) ? levels : [];
  } catch(e) {
    return [];
  }
}

function saveCustomEditorLevel() {
  if (!editorLevel) editorLevel = createBlankEditorLevel();
  editorLevel.rooms = editorLevel.rooms || [{cells: editorLevel.cells || []}];
  editorLevel.rooms[editorRoomIndex] = {cells: editorLevel.cells.slice()};
  editorLevel.timestamp = Date.now();
  editorLevel.name = editorLevel.name || "NIVEL PERSONALIZADO";
  var levels = getCustomLevels();
  levels[0] = JSON.parse(JSON.stringify(editorLevel));
  try {
    localStorage.setItem(CUSTOM_LEVELS_KEY, JSON.stringify(levels));
    editorMessage = "NIVEL GUARDADO";
  } catch(e) {
    editorMessage = "NO SE PUDO GUARDAR";
  }
}

function loadCustomEditorLevel() {
  var levels = getCustomLevels();
  if (!levels.length || !levels[0]) return false;
  var saved = levels[0];
  editorLevel = createBlankEditorLevel();
  editorLevel.name = saved.name || editorLevel.name;
  editorLevel.timestamp = saved.timestamp || 0;
  var savedRooms = Array.isArray(saved.rooms) && saved.rooms.length ? saved.rooms : [{cells: saved.cells || []}];
  editorLevel.rooms = savedRooms.map(function(room) {
    var roomCells = [];
    for (var i = 0; i < EDITOR_COLS * EDITOR_ROWS; i++) roomCells.push(room.cells && room.cells[i] || null);
    return {cells: roomCells};
  });
  editorRoomIndex = Math.min(editorRoomIndex, editorLevel.rooms.length - 1);
  editorLevel.cells = editorLevel.rooms[editorRoomIndex].cells;
  editorMessage = "NIVEL CARGADO";
  return true;
}

function openNewEditorLevel() {
  editorLevel = createBlankEditorLevel();
  editorRoomIndex = 0;
  editorCategory = 0;
  editorPaletteSelection = 0;
  editorMessage = "";
  gameState = ST_LEVEL_EDITOR;
}

function openCustomEditorLevel() {
  if (!loadCustomEditorLevel()) return false;
  editorCategory = 0;
  editorPaletteSelection = 0;
  gameState = ST_LEVEL_EDITOR;
  return true;
}

function selectEditorRoom(index) {
  if (!editorLevel || !editorLevel.rooms) return;
  editorLevel.rooms[editorRoomIndex] = {cells: editorLevel.cells.slice()};
  editorRoomIndex = Math.max(0, Math.min(editorLevel.rooms.length - 1, index));
  editorLevel.cells = editorLevel.rooms[editorRoomIndex].cells;
  editorMessage = "HABITACION " + (editorRoomIndex + 1);
}

function addEditorRoom() {
  if (!editorLevel) return;
  editorLevel.rooms = editorLevel.rooms || [{cells: editorLevel.cells.slice()}];
  editorLevel.rooms[editorRoomIndex] = {cells: editorLevel.cells.slice()};
  var cells = [];
  for (var i = 0; i < EDITOR_COLS * EDITOR_ROWS; i++) cells.push(null);
  editorLevel.rooms.push({cells: cells});
  selectEditorRoom(editorLevel.rooms.length - 1);
}

function buildCustomRoom(roomData, index) {
  var platforms = [], spikes = [], walls = [], start = null, goal = null;
  (roomData.cells || []).forEach(function(id, cellIndex) {
    if (!id) return;
    var col = cellIndex % EDITOR_COLS, row = Math.floor(cellIndex / EDITOR_COLS);
    var x = col * EDITOR_CELL, y = row * EDITOR_CELL;
    var item = getEditorPaletteItemById(id);
    if (!item) return;
    if (id === "start") start = {x: x + 5, y: y + 2};
    else if (id === "goal" || id === "door") goal = {x: x, y: y, w: EDITOR_CELL, h: EDITOR_CELL, type: id};
    else if (item.kind === "platform") platforms.push({x: x, y: y + 22, w: EDITOR_CELL, h: 10});
    else if (item.kind === "wall") walls.push({x: x, y: y, w: EDITOR_CELL, h: EDITOR_CELL});
    else if (item.kind === "spike") spikes.push({x: x + 2, y: y + 16, w: EDITOR_CELL - 4, h: 16});
    else if (item.kind === "enemy") enemies.push({
      x: x + 2, y: y + 4, w: id === "dark_knight" ? 34 : 28, h: id === "dark_knight" ? 48 : 22,
      vx: -1.2, vy: 0, baseY: y + 4, range: 60, speed: 1.2, visionRadius: 240,
      dead: false, room: 0, type: id === "larva" ? "larva_mosca" : id, staysRoom: true,
      customEnemy: true, customRoom: index,
      hp: id === "dark_knight" ? 48 : 20, maxHp: id === "dark_knight" ? 48 : 20
    });
  });
  walls = [{x: 0, y: 0, w: 16, h: 600}, {x: 560, y: 0, w: 16, h: 600}].concat(walls);
  if (!platforms.some(function(p) { return p.y + p.h >= 600; })) platforms.push({x: 16, y: 560, w: 544, h: 40});
  return {platforms: platforms, spikes: spikes, walls: walls, transitionZone: null, height: 600, roomWidth: 576, start: start, goal: goal, custom: true};
}

function startCustomLevel() {
  if (!loadCustomEditorLevel()) return false;
  enemies.forEach(function(enemy) { if (!enemy.boss) enemy.dead = true; });
  customRooms = (editorLevel.rooms || [{cells: editorLevel.cells}]).map(buildCustomRoom);
  customRoomIndex = 0;
  room0.platforms = customRooms[0].platforms; room0.spikes = customRooms[0].spikes;
  room0.walls = customRooms[0].walls; room0.transitionZone = null; room0.roomWidth = 576;
  room0.height = 600; room0.custom = true;
  customLevelActive = true;
  gameMode = "custom";
  currentRoom = 0;
  cameraX = 0; targetCamX = 0; cameraY = 0; targetCamY = 0;
  hasSword = true; swordEquipped = true; player.hasSword = true; player.swordEquipped = true; player.swordSheathed = false;
  player.x = customRooms[0].start ? customRooms[0].start.x : 32; player.y = customRooms[0].start ? customRooms[0].start.y : 400;
  player.vx = 0; player.vy = 0; player.hp = player.maxHp = 10;
  customLevelGoal = customRooms[0].goal;
  gameState = ST_PLAYING;
  return true;
}

function exitCustomLevel() {
  customLevelActive = false;
  gameMode = "normal";
  resetAll();
  gameState = ST_MENU;
  menuSubState = "slots";
}

function getEditorPaletteItem() {
  var items = editorPalette[editorCategory] || [];
  return items[editorPaletteSelection] || items[0] || null;
}

function getEditorPaletteItemById(id) {
  for (var categoryIndex = 0; categoryIndex < editorPalette.length; categoryIndex++) {
    for (var itemIndex = 0; itemIndex < editorPalette[categoryIndex].length; itemIndex++) {
      if (editorPalette[categoryIndex][itemIndex].id === id) return editorPalette[categoryIndex][itemIndex];
    }
  }
  return null;
}

function handleLevelEditorMouse(event) {
  var rect = canvas.getBoundingClientRect();
  var x = (event.clientX - rect.left) * canvas.width / rect.width;
  var y = (event.clientY - rect.top) * canvas.height / rect.height;
  if (y >= 60 && y < 82 && x >= 24 && x < 310) {
    if (x < 105) selectEditorRoom(editorRoomIndex - 1);
    else if (x < 190) selectEditorRoom(editorRoomIndex + 1);
    else addEditorRoom();
    return;
  }
  if (x >= EDITOR_PANEL_X && x < canvas.width && y >= EDITOR_GRID_Y && y < EDITOR_GRID_Y + 128) {
    var category = Math.floor((y - EDITOR_GRID_Y) / 32);
    if (category >= 0 && category < editorCategories.length) {
      editorCategory = category;
      editorPaletteSelection = 0;
    }
    return;
  }
  if (x >= EDITOR_PANEL_X && x < canvas.width && y >= EDITOR_GRID_Y + 136) {
    var paletteIndex = Math.floor((y - EDITOR_GRID_Y - 136) / 58);
    var paletteItems = editorPalette[editorCategory] || [];
    if (paletteIndex >= 0 && paletteIndex < paletteItems.length) editorPaletteSelection = paletteIndex;
    return;
  }
  if (x < EDITOR_GRID_X || y < EDITOR_GRID_Y ||
      x >= EDITOR_GRID_X + EDITOR_COLS * EDITOR_CELL ||
      y >= EDITOR_GRID_Y + EDITOR_ROWS * EDITOR_CELL) return;
  var col = Math.floor((x - EDITOR_GRID_X) / EDITOR_CELL);
  var row = Math.floor((y - EDITOR_GRID_Y) / EDITOR_CELL);
  var index = row * EDITOR_COLS + col;
  var item = getEditorPaletteItem();
  if (!editorLevel || !item) return;
  if (event.button === 2 || item.kind === "erase") editorLevel.cells[index] = null;
  else editorLevel.cells[index] = item.id;
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
    hasAzariMagnet: hasAzariMagnet, hasAzariBag: hasAzariBag, azariBagLevel: azariBagLevel, hasOldKey: hasOldKey, doorUnlocked: doorUnlocked, rewardAzariCollected: rewardAzariCollected, hasLantern: hasLantern, lanternLevel: lanternLevel, hasDash: hasDash,
    brightnessBoost: brightnessBoost,
    swordLevel: swordLevel, bowLevel: bowLevel, arrowType: arrowType, combatSkills: combatSkills,
    blessingSlots: blessingSlots, equippedBlessings: equippedBlessings, armorId: armorId,
    permanentUpgrades: permanentUpgrades, bossUniqueItems: bossUniqueItems, hiddenCollectibles: hiddenCollectibles,
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
    difficulty: difficulty, gameMode: gameMode,
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
  difficulty = s.difficulty || "normal"; gameMode = s.gameMode || "normal";
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
  hasAzariMagnet = s.hasAzariMagnet || false;
  azariBagLevel = Math.max(0, Math.min(5, Number(s.azariBagLevel) || (s.hasAzariBag ? 1 : 0)));
  hasAzariBag = azariBagLevel > 0;
  hasOldKey = s.hasOldKey || false;
  doorUnlocked = s.doorUnlocked || false;
  rewardAzariCollected = s.rewardAzariCollected || false;
  hasLantern = s.hasLantern || false;
  lanternLevel = Math.max(0, Math.min(3, s.lanternLevel || (hasLantern ? 1 : 0)));
  brightnessBoost = Math.max(0, Math.min(1, Number(s.brightnessBoost) || 0));
  hasDash = s.hasDash || false;
  swordLevel = s.swordLevel || 0; bowLevel = s.bowLevel || 0;
  arrowType = s.arrowType || "normal";
  combatSkills = s.combatSkills || { charged: false, aerial: false, combo: false };
  blessingSlots = s.blessingSlots || 2;
  equippedBlessings = s.equippedBlessings || [];
  armorId = s.armorId || "vacío";
  permanentUpgrades = s.permanentUpgrades || { vitality: 0, strength: 0 };
  bossUniqueItems = s.bossUniqueItems || { guardian: false, queen_larva: false, abyssal_knight: false };
  hiddenCollectibles = s.hiddenCollectibles || { eclipse: false, root: false, crown: false };
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
  rooms[19].transitionZone = bossArenaState.queen_larva ? {x: 15940, y: 460, w: 40, h: 100, to: 20} : null;
  rooms[20].transitionZone = bossArenaState.abyssal_knight ? {x: 16730, y: 460, w: 40, h: 100, to: 21} : null;
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

var midScene = null;
