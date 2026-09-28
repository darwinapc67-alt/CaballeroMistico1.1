var room0 = {
  height: 600,
  platforms: [
    {x:-240, y:560, w:600, h:40}, {x:500, y:560, w:300, h:40}
  ],
  spikes: [{x:360, y:580, w:140, h:20}],
  walls: [
    {x:0, y:0, w:20, h:430},
    {x:0, y:430, w:20, h:130, breakable: true, requiresSword: true, broken: false},
    {x:0, y:560, w:20, h:40}
  ],
  chests: [{x:-205, y:520, rewardAzari: true, rewardAmount: 125, opened: false}],
  secretPassage: {x:-240, y:0, w:240, h:600},
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
    {x:2400, y:560, w:800, h:40},
    {x:2470, y:450, w:220, h:110},
    {x:2840, y:420, w:230, h:140}
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
    {x:3350, y:350, w:80, h:14},
    {x:3835, y:470, w:130, h:14}, {x:3860, y:390, w:100, h:14}
  ],
  spikes: [{x:3600, y:560, w:200, h:20}],
  walls: [
    {x:3200 + 590, y:120, w:22, h:440, breakable: true, requiresSword: true, broken: false}
  ],
  chests: [{x:3200 + 690, y:500, legendary: true, opened: false}],
  transitionZone: null,
  decor: genDecor(3200, 10, 6, 600)
};

var room5 = {
  height: 600,
  platforms: [
    {x:4000, y:560, w:800, h:40},
    {x:4070, y:450, w:180, h:110},
    {x:4400, y:440, w:205, h:120}
  ],
  spikes: [], walls: [],
  transitionZone: {x:4750, y:460, w:50, h:100, to:6},
  decor: genDecor(4000, 6, 8, 600)
};

var room6 = {
  height: 900,
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
  decor: genDecor(4800, 8, 5, 900)
};

var room7 = {
  height: 600,
  platforms: [
    {x:5600, y:560, w:800, h:40},
    {x:5660, y:450, w:210, h:110},
    {x:6020, y:430, w:195, h:130}
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
    {x:7600, y:250, w:80, h:14}, {x:7800, y:280, w:80, h:14},
    {x:7865, y:470, w:90, h:14}, {x:7880, y:390, w:70, h:14}
  ],
  spikes: [], walls: [{
    x:7980, y:0, w:20, h:600, breakable: true, requiresSword: true, broken: false
  }, {
    x:7200 + 645, y:120, w:22, h:440, breakable: true, requiresSword: true, broken: false
  }],
  transitionZone: {x:7960, y:460, w:40, h:100, to:10},
  shopDoor: {x:7485, y:475, w:55, h:85},
  shops: [
    { id: 0, npc: {x:7400, y:525, w:20, h:35}, label: "" }
  ],
  healingStone: {x: 7250, y: 520, w: 50, h: 40, active: true},
  chests: [{x:7200 + 690, y:500, legendary: true, opened: false}],
  decor: genDecor(7200, 10, 8, 600)
};

/* The final descent is a vertical room before the boss arenas. */
var room10 = {
  height: 1200,
  platforms: [
    {x:8000, y:1160, w:800, h:40}, {x:8060, y:1050, w:120, h:14},
    {x:8220, y:930, w:120, h:14}, {x:8420, y:810, w:120, h:14},
    {x:8260, y:690, w:120, h:14},     {x:8460, y:570, w:120, h:14},
    {x:8100, y:570, w:152, h:16},
    {x:8300, y:450, w:120, h:14}, {x:8500, y:330, w:120, h:14},
    {x:8340, y:210, w:120, h:14}, {x:8500, y:80, w:200, h:40}
  ],
  spikes: [], walls: [],   transitionZone: {x:8000, y:500, w:40, h:100, to:9, sharedBoundary: true},
  decor: genDecor(8000, 8, 5, 1200)
};

var room11 = {
  height: 600,
  platforms: [
    {x:8800, y:560, w:800, h:40}
  ],
  spikes: [], walls: [],
  transitionZone: {x:9540, y:460, w:40, h:100, to:12},
  decor: genDecor(8800, 6, 5, 600)
};

var room12 = {
  height: 600,
  platforms: [{x:15200, y:560, w:800, h:40}],
  spikes: [], walls: [{
    x:15982, y:0, w:18, h:600, breakable: true, requiresSword: true, broken: false
  }],
  transitionZone: {x:15940, y:460, w:40, h:100, to:20},
  decor: genDecor(15200, 8, 4, 600), bossName: "REINA LARVA"
};

var room13 = {
  height: 600,
  platforms: [{x:16000, y:560, w:800, h:40}],
  spikes: [], walls: [{x:16782, y:0, w:18, h:600}],
  transitionZone: null,
  decor: genDecor(16000, 10, 5, 600), bossName: "CABALLERO ABISMAL"
};

function createInterludeRoom(index, name, variant) {
  var off = index * ROOM_W;
  var platforms = [{x: off, y: 560, w: ROOM_W, h: 40}];
  platforms.push({x: off + 80, y: 420 + (variant % 2) * 40, w: 150, h: 16});
  platforms.push({x: off + 330, y: 320 + (variant % 3) * 40, w: 180, h: 16});
  platforms.push({x: off + 610, y: 400 - (variant % 2) * 80, w: 120, h: 16});
  return {height: 600, platforms: platforms, spikes: variant === 3 ? [{x: off + 300, y: 540, w: 180, h: 20}] : [],
    walls: [], transitionZone: {x: off + 750, y: 460, w: 40, h: 100, to: index + 1},
    decor: genDecor(off, 7, 5, 600), zoneTitle: name || "PASO DE LAS PROFUNDIDADES"};
}

var interludeRooms = [
  createInterludeRoom(12, "", 0),
  createInterludeRoom(13, "", 1),
  createInterludeRoom(14, "", 2),
  createInterludeRoom(15, "", 3),
  createInterludeRoom(16, "", 4),
  createInterludeRoom(17, "", 5),
  createInterludeRoom(18, "", 6)
];

function createCityRoom(index, district, features) {
  var off = index * ROOM_W;
  var platforms = [{x: off, y: 560, w: ROOM_W, h: 40}];
  if (features.roofs) {
    platforms.push({x: off + 65, y: 380, w: 190, h: 18});
    platforms.push({x: off + 540, y: 320, w: 180, h: 18});
  }
  if (features.towers) {
    platforms.push({x: off + 315, y: 250, w: 170, h: 18});
    platforms.push({x: off + 350, y: 145, w: 100, h: 18});
  }
  if (features.bridge) {
    platforms.push({x: off + 90, y: 430, w: 180, h: 16});
    platforms.push({x: off + 500, y: 430, w: 210, h: 16});
  }
  return {
    height: 600,
    platforms: platforms,
    spikes: [],
    walls: [],
    transitionZone: null,
    city: true,
    district: district,
    cityFeatures: features,
    houses: features.houses || [],
    decor: []
  };
}

var cityRooms = [
  createCityRoom(21, "", {roofs: true, towers: true, houses: [
    {x: 80, label: "Casa", story: [["", "Antes de que llegara la oscuridad, la ciudad unía todos los caminos."], ["", "En sus plazas se reunían viajeros de cavernas lejanas."], ["", "Ahora solo queda memoria entre estas paredes."]], objects: [
      {label: "Mapa antiguo", text: "Las rutas de la ciudad terminan en una puerta marcada con el símbolo del vacío."},
      {label: "Libro abierto", text: "El cronista escribió: quien recuerde el pasado podrá reconstruir el futuro."},
      {label: "Ventana", text: "Desde aquí se ve la plaza y las luces que todavía resisten."}
    ]},
    {x: 610, label: "Casa de la campana", story: [["GUARDIANA", "La campana sonaba cada amanecer para llamar a los protectores."], ["", "Un día dejó de sonar... y nadie volvió a ocupar la torre."]], objects: [
      {label: "Campana rota", text: "Una grieta atraviesa el metal. Aun así, conserva un débil eco mágico."},
      {label: "Escudo", text: "El escudo lleva las marcas de muchos defensores, pero ninguno terminó la batalla."}
    ]}
  ]}),
  createCityRoom(22, "", {roofs: true, bridge: true, houses: [
    {x: 190, label: "Taller abandonado", story: [["MAESTRO FORJADOR", "Aquí se fabricaban armas para defender la civilización."], ["", "La última espada fue entregada a un caballero que nunca regresó."]], objects: [
      {label: "Yunque", text: "El metal del yunque todavía está tibio, como si alguien hubiera trabajado aquí hace poco."},
      {label: "Molde vacío", text: "El molde tiene la forma exacta de una espada que se parece a la tuya."}
    ]}
  ]}),
  createCityRoom(23, "", {roofs: true, towers: true, houses: [
    {x: 470, label: "Archivo del mercado", story: [["MERCADER", "Cada puesto guardaba una historia: semillas, mapas, sal y secretos."], ["", "Los comerciantes partieron cuando las luces del subsuelo se apagaron."]], objects: [
      {label: "Cofre vacío", text: "Solo quedan monedas antiguas y una nota: protege la última llama."},
      {label: "Farol", text: "La llama no consume aceite. Brilla con la energía de la civilización."}
    ]}
  ]}),
  createCityRoom(24, "", {roofs: false, bridge: true}),
  createCityRoom(25, "", {roofs: false, towers: true, bridge: true}),
  createCityRoom(26, "", {roofs: true, towers: true}),
  createCityRoom(27, "", {roofs: true, bridge: true}),
  createCityRoom(28, "", {roofs: true, towers: true}),
  createCityRoom(29, "", {roofs: false, towers: true, bridge: true})
];

function createBossApproachRoom(index, variant) {
  var off = index * ROOM_W;
  var platforms = [{x: off, y: 560, w: ROOM_W, h: 40}];
  platforms.push({x: off + 55, y: 430, w: 150, h: 16});
  platforms.push({x: off + 285, y: 335 - variant * 25, w: 180, h: 16});
  platforms.push({x: off + 555, y: 440, w: 165, h: 16});
  if (variant === 2) platforms.push({x: off + 390, y: 205, w: 145, h: 16});
  return {
    height: 600,
    platforms: platforms,
    spikes: variant > 0 ? [{x: off + 220, y: 540, w: 70, h: 20}] : [],
    walls: [],
    transitionZone: {x: off + 750, y: 460, w: 40, h: 100, to: index + 1},
    decor: genDecor(off, 9 + variant, 5, 600),
    zoneTitle: "SENDERO DEL ABISMO"
  };
}
var bossApproachRooms = [
  createBossApproachRoom(20, 0),
  createBossApproachRoom(21, 1),
  createBossApproachRoom(22, 2)
];

cityRooms[cityRooms.length - 1].transitionZone = {x: 29 * ROOM_W + 750, y: 460, w: 40, h: 100, to: 30};
cityRooms[cityRooms.length - 1].platforms = [{x: 29 * ROOM_W, y: 560, w: ROOM_W, h: 40}];

function shiftRoomGeometry(room, delta) {
  if (room.worldX !== undefined) room.worldX += delta;
  room.platforms.forEach(function(item) { item.x += delta; });
  room.spikes.forEach(function(item) { item.x += delta; });
  room.walls.forEach(function(item) { item.x += delta; });
  if (room.transitionZone) { room.transitionZone.x += delta; if (room.transitionZone.to >= 20) room.transitionZone.to += 3; }
  ["lockedDoor", "openDoor", "rewardPile"].forEach(function(key) {
    if (room[key]) room[key].x += delta;
  });
  if (room.decor) room.decor.forEach(function(item) { if (item.x !== undefined) item.x += delta; });
}

var room30 = {
  height: 900,
  platforms: [
    {x: 30 * ROOM_W, y: 860, w: 580, h: 40},
    {x: 30 * ROOM_W + 780, y: 860, w: 220, h: 40},
    {x: 30 * ROOM_W, y: 700, w: 180, h: 18},
    {x: 30 * ROOM_W + 195, y: 760, w: 150, h: 18},
    {x: 30 * ROOM_W + 360, y: 820, w: 150, h: 18},
    {x: 30 * ROOM_W + 520, y: 840, w: 150, h: 18},
    {x: 30 * ROOM_W + 690, y: 600, w: 110, h: 16},
    {x: 30 * ROOM_W + 535, y: 500, w: 130, h: 16},
    {x: 30 * ROOM_W + 500, y: 400, w: 130, h: 16},
    {x: 30 * ROOM_W + 635, y: 300, w: 130, h: 16},
    {x: 30 * ROOM_W + 670, y: 200, w: 130, h: 16}
  ],
  spikes: [],
  walls: [],
  transitionZone: null,
  noDoor: true,
  decor: genDecor(30 * ROOM_W, 10, 6, 900)
};

function createCorridorRoom(index, variant, nextRoom) {
  var off = index * ROOM_W;
  return {
    height: 600,
    platforms: [
      {x: off, y: 560, w: ROOM_W, h: 40},
      {x: off + 285, y: 350 + (variant % 2) * 15, w: 515, h: 18}
    ],
    spikes: [],
    walls: [],
    transitionZone: null,
    noDoor: true,
    decor: genDecor(off, 9 + variant, 5, 600)
  };
}

var room31 = createCorridorRoom(31, 1, 32);
var room32 = createCorridorRoom(32, 2, 33);
var room33 = createCorridorRoom(33, 3, null);
var room34 = {
  height: 1000,
  worldX: 30 * ROOM_W,
  roomWidth: 3700,
  verticalRoom: true,
  openDoor: {x: 30 * ROOM_W + 18, y: 0, w: 55, h: 80},
  lockedDoor: {x: 30 * ROOM_W + 1120, y: 0, w: 55, h: 80},
  platforms: [],
  spikes: [],
  walls: [],
  transitionZone: null,
  noDoor: true,
  decor: genDecor(30 * ROOM_W, 12, 6, 1000)
};
var room35 = {
  height: 900,
  worldX: 35 * ROOM_W,
  roomWidth: 800,
  platforms: [
    {x: 35 * ROOM_W, y: 860, w: 800, h: 40},
    {x: 35 * ROOM_W + 30, y: 330, w: 190, h: 18},
    {x: 35 * ROOM_W + 285, y: 330, w: 170, h: 18},
    {x: 35 * ROOM_W + 520, y: 330, w: 250, h: 18}
  ],
  spikes: [{x: 35 * ROOM_W + 225, y: 842, w: 45, h: 18}, {x: 35 * ROOM_W + 465, y: 842, w: 45, h: 18}],
  walls: [{x: 35 * ROOM_W, y: 0, w: 18, h: 900}, {x: 35 * ROOM_W + 782, y: 0, w: 18, h: 900}],
  transitionZone: {x: 35 * ROOM_W + 750, y: 760, w: 32, h: 100, to: 36},
  noDoor: false, bossName: "GUARDIÁN DE LA CUEVA",
  decor: genDecor(35 * ROOM_W, 16, 5, 900)
};
var room36 = {
  height: 600,
  worldX: 36 * ROOM_W,
  roomWidth: 800,
  platforms: [{x: 36 * ROOM_W, y: 560, w: 800, h: 40}],
  spikes: [], walls: [], transitionZone: null, noDoor: true,
  rewardPile: {x: 36 * ROOM_W + 350, y: 500, amount: 230},
  decor: genDecor(36 * ROOM_W, 16, 5, 600)
};
var room37 = {
  height: 600,
  worldX: 40 * ROOM_W,
  roomWidth: 800,
  platforms: [
    {x: 40 * ROOM_W, y: 560, w: 800, h: 40},
    {x: 40 * ROOM_W + 120, y: 450, w: 150, h: 16},
    {x: 40 * ROOM_W + 360, y: 360, w: 150, h: 16},
    {x: 40 * ROOM_W + 600, y: 450, w: 150, h: 16}
  ],
  spikes: [{x: 40 * ROOM_W + 270, y: 540, w: 90, h: 20}],
  walls: [],
  transitionZone: null,
  noDoor: false,
  decor: genDecor(40 * ROOM_W, 14, 5, 600)
};
var room38 = {
  height: 600,
  worldX: 41 * ROOM_W,
  roomWidth: 800,
  platforms: [
    {x: 41 * ROOM_W, y: 560, w: 800, h: 40},
    {x: 41 * ROOM_W + 80, y: 450, w: 150, h: 16},
    {x: 41 * ROOM_W + 300, y: 350, w: 170, h: 16},
    {x: 41 * ROOM_W + 570, y: 450, w: 150, h: 16}
  ],
  spikes: [{x: 41 * ROOM_W + 230, y: 540, w: 70, h: 20}, {x: 41 * ROOM_W + 470, y: 540, w: 70, h: 20}],
  walls: [],
  transitionZone: null,
  noDoor: false,
  decor: genDecor(41 * ROOM_W, 15, 5, 600)
};
var room39 = {
  height: 700,
  worldX: 42 * ROOM_W,
  roomWidth: 800,
  platforms: [
    {x: 42 * ROOM_W, y: 660, w: 800, h: 40},
    {x: 42 * ROOM_W + 90, y: 520, w: 180, h: 18},
    {x: 42 * ROOM_W + 530, y: 520, w: 180, h: 18}
  ],
  spikes: [],
  walls: [{x: 42 * ROOM_W, y: 0, w: 18, h: 700}, {x: 42 * ROOM_W + 782, y: 0, w: 18, h: 700}],
  transitionZone: null,
  noDoor: true,
  bossName: "DRAGÓN DEL VACÍO",
  decor: genDecor(42 * ROOM_W, 18, 6, 700)
};

shiftRoomGeometry(room13, 3 * ROOM_W);
cityRooms.forEach(function(room) { shiftRoomGeometry(room, 3 * ROOM_W); });
shiftRoomGeometry(room30, 3 * ROOM_W);
shiftRoomGeometry(room31, 3 * ROOM_W);
shiftRoomGeometry(room32, 3 * ROOM_W);
shiftRoomGeometry(room33, 3 * ROOM_W);
shiftRoomGeometry(room34, 3 * ROOM_W);
shiftRoomGeometry(room35, 3 * ROOM_W);
shiftRoomGeometry(room36, 3 * ROOM_W);

var rooms = [room0, room1, room2, room3, room4, room5, room6, room7, room8, room9,
  room10, room11].concat(interludeRooms, [room12], bossApproachRooms, [room13], cityRooms, [room30, room31, room32, room33, room34, room35, room36, room37, room38, room39]);
var guardianRoom39 = JSON.parse(JSON.stringify(room35));
shiftRoomGeometry(guardianRoom39, ROOM_W);
guardianRoom39.platforms = [{x: 39 * ROOM_W, y: 860, w: 800, h: 40}];
guardianRoom39.spikes = [];
guardianRoom39.walls = [
  {x: 39 * ROOM_W, y: 0, w: 18, h: 900},
  {x: 39 * ROOM_W + 782, y: 0, w: 18, h: 900}
];
guardianRoom39.transitionZone = null;
guardianRoom39.bossName = "GUARDIÁN DE LA CUEVA";
rooms[39] = guardianRoom39;
rooms[42] = room39;
room35.bossName = null;
rooms[38].bossName = null;

function createOptionalCaveRoom(index, title, variant) {
  var origin = index * ROOM_W;
  return {
    height: 600,
    platforms: [],
    spikes: variant === 2 ? [{x: origin + 270, y: 540, w: 120, h: 20}] : [],
    walls: [],
    optional: true,
    zoneTitle: title,
    visualProfile: variant === 2 ? "abyss" : "crystal",
    decor: genDecor(origin, 8 + variant, 5, 600)
  };
}

rooms.push(
  createOptionalCaveRoom(43, "GRUTA DEL ECO", 0),
  createOptionalCaveRoom(44, "GALERÍA ALTA", 1),
  createOptionalCaveRoom(45, "GRIETA DEL ABISMO", 2),
  createOptionalCaveRoom(46, "BIFURCACIÓN DEL ECO", 0),
  createOptionalCaveRoom(47, "PASO DE LOS HONGOS", 1),
  createOptionalCaveRoom(48, "GALERÍA DE LAS ALTURAS", 1),
  createOptionalCaveRoom(49, "GRIETA DE LA CIUDAD", 2)
);
for (var optionalRoomIndex = 43; optionalRoomIndex < rooms.length; optionalRoomIndex++) {
  var optionalRoom = rooms[optionalRoomIndex];
  var optionalOrigin = optionalRoomIndex * ROOM_W;
  optionalRoom.walls.push(
    {x: optionalOrigin, y: 0, w: 18, h: 450},
    {x: optionalOrigin, y: 560, w: 18, h: 40},
    {x: optionalOrigin + 782, y: 0, w: 18, h: 450},
    {x: optionalOrigin + 782, y: 560, w: 18, h: 40}
  );
}

var caveFloorProfiles = {
  0: [[-240, 560], [0, 560], [160, 550], [330, 575], [470, 588], [630, 558], [800, 560]],
  1: [[0, 560], [160, 552], [330, 540], [490, 560], [650, 580], [800, 560]],
  2: [[0, 560], [150, 578], [300, 590], [470, 565], [640, 548], [800, 560]],
  3: [[0, 560], [170, 548], [340, 532], [500, 553], [660, 580], [800, 560]],
  4: [[0, 560], [150, 578], [315, 590], [475, 566], [640, 542], [800, 560]],
  5: [[0, 560], [170, 552], [330, 540], [490, 555], [650, 582], [800, 560]],
  6: [[0, 860], [130, 852], [260, 820], [390, 790], [520, 760], [650, 720], [800, 660]],
  7: [[0, 560], [155, 570], [320, 578], [480, 564], [645, 548], [800, 560]],
  8: [[0, 560], [160, 550], [325, 544], [490, 555], [650, 570], [800, 560]],
  9: [[0, 560], [165, 568], [330, 577], [495, 564], [650, 549], [800, 560]],
  10: [[0, 560], [150, 595], [300, 645], [450, 670], [590, 620], [700, 590], [800, 560]],
  11: [[0, 560], [170, 552], [340, 547], [500, 557], [660, 570], [800, 560]],
  12: [[0, 560], [140, 580], [300, 585], [450, 562], [620, 548], [800, 560]],
  13: [[0, 560], [150, 540], [320, 535], [490, 558], [640, 578], [800, 560]],
  14: [[0, 560], [200, 580], [400, 574], [550, 545], [700, 552], [800, 560]],
  15: [[0, 560], [120, 550], [280, 568], [450, 588], [620, 570], [800, 560]],
  16: [[0, 560], [180, 580], [330, 585], [530, 564], [680, 545], [800, 560]],
  17: [[0, 560], [160, 545], [300, 538], [450, 555], [610, 580], [800, 560]],
  18: [[0, 560], [160, 576], [320, 585], [470, 562], [620, 542], [800, 560]],
  20: [[0, 560], [160, 556], [325, 548], [490, 557], [655, 570], [800, 560]],
  34: [[0, 560], [160, 570], [325, 578], [490, 562], [655, 548], [800, 560]],
  35: [[0, 560], [160, 551], [325, 545], [490, 558], [655, 572], [800, 560]],
  36: [[0, 560], [165, 568], [330, 577], [495, 562], [660, 548], [800, 560]],
  37: [[0, 960], [250, 960], [500, 930], [750, 880], [1000, 800], [1250, 740], [1500, 720], [1750, 730], [2000, 700], [2250, 660], [2500, 620], [2750, 580], [3000, 550], [3250, 430], [3500, 300], [3700, 190]],
  40: [[0, 560], [160, 552], [325, 546], [490, 558], [655, 572], [800, 560]],
  41: [[0, 560], [165, 570], [330, 578], [495, 562], [660, 548], [800, 560]],
  43: [[0, 560], [160, 552], [325, 545], [490, 558], [655, 572], [800, 560]],
  44: [[0, 560], [165, 570], [330, 578], [495, 562], [660, 548], [800, 560]],
  45: [[0, 560], [160, 551], [325, 545], [490, 558], [655, 573], [800, 560]],
  46: [[0, 560], [165, 569], [330, 577], [495, 562], [660, 548], [800, 560]],
  47: [[0, 560], [160, 552], [325, 546], [490, 558], [655, 572], [800, 560]],
  48: [[0, 560], [165, 570], [330, 578], [495, 562], [660, 548], [800, 560]],
  49: [[0, 560], [160, 551], [325, 545], [490, 558], [655, 573], [800, 560]]
};

function createCaveFloorPlatform(roomIndex) {
  var room = rooms[roomIndex];
  var profile = caveFloorProfiles[roomIndex];
  var profileStart = profile[0][0];
  var origin = (room.worldX !== undefined ? room.worldX : roomIndex * ROOM_W) + profileStart;
  var profileEnd = profile[profile.length - 1][0];
  var surface = [];
  var segment = 0;
  for (var sampleX = profileStart; sampleX < profileEnd; sampleX += 16) {
    while (segment < profile.length - 2 && sampleX > profile[segment + 1][0]) segment++;
    var p0 = profile[Math.max(0, segment - 1)];
    var p1 = profile[segment];
    var p2 = profile[segment + 1];
    var p3 = profile[Math.min(profile.length - 1, segment + 2)];
    var t = (sampleX - p1[0]) / (p2[0] - p1[0]);
    var t2 = t * t;
    var t3 = t2 * t;
    var y = 0.5 * (
      2 * p1[1] +
      (-p0[1] + p2[1]) * t +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
    );
    surface.push({x: sampleX - profileStart, y: y});
  }
  surface.push({x: profileEnd - profileStart, y: profile[profile.length - 1][1]});
  return {
    x: origin,
    y: 0,
    w: profileEnd - profileStart,
    h: room.height,
    surface: surface
  };
}

Object.keys(caveFloorProfiles).forEach(function(indexKey) {
  var roomIndex = Number(indexKey);
  var room = rooms[roomIndex];
  if (!room) return;
  room.platforms = [createCaveFloorPlatform(roomIndex)];
});

rooms.forEach(function(room) {
  room.platforms.forEach(function(platform) {
    if (!platform.surface) return;
    room.spikes.forEach(function(spike) {
      var surfaceY = getPlatformSurfaceY(platform, spike.x + spike.w / 2);
      if (surfaceY !== null) spike.y = surfaceY - spike.h;
    });
    (room.chests || []).forEach(function(chest) {
      var surfaceY = getPlatformSurfaceY(platform, chest.x + 13);
      if (surfaceY !== null) chest.y = surfaceY - 22;
    });
    if (room.healingStone) {
      var stoneSurfaceY = getPlatformSurfaceY(platform, room.healingStone.x + room.healingStone.w / 2);
      if (stoneSurfaceY !== null) room.healingStone.y = stoneSurfaceY - room.healingStone.h;
    }
    ["openDoor", "lockedDoor"].forEach(function(doorName) {
      var door = room[doorName];
      if (!door) return;
      var doorSurfaceY = getPlatformSurfaceY(platform, door.x + door.w / 2);
      if (doorSurfaceY !== null) door.y = doorSurfaceY - door.h;
    });
  });
});
