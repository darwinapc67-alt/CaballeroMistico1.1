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
  shopDoor: {x:7485, y:475, w:55, h:85},
  shops: [
    { id: 0, npc: {x:7400, y:525, w:20, h:35}, label: "" }
  ],
  healingStone: {x: 7250, y: 520, w: 50, h: 40, active: true},
  decor: genDecor(7200, 10, 8, 600)
};

/* The final descent was lost in an earlier regression.  Keep it as a
   deliberately small ten-platform vertical room before the boss arenas. */
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
  spikes: [], walls: [{x:9582, y:0, w:18, h:600}],
  transitionZone: {x:9540, y:460, w:40, h:100, to:12},
  decor: genDecor(8800, 6, 5, 600)
};

var room12 = {
  height: 600,
  platforms: [{x:15200, y:560, w:800, h:40}],
  spikes: [], walls: [{x:15982, y:0, w:18, h:600}],
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
function createVerticalRoomPlatforms(origin) {
  var platforms = [{x: origin, y: 3460, w: 1200, h: 40}];
  var positions = [70, 285, 500, 715, 930, 715, 500, 285];
  for (var i = 0; i < 27; i++) {
    platforms.push({
      x: origin + positions[i % positions.length],
      y: 3320 - i * 125,
      w: 220,
      h: 18
    });
  }
  platforms.push({x: origin + 250, y: 120, w: 500, h: 18});
  return platforms;
}
var room34 = {
  height: 3500,
  worldX: 30 * ROOM_W,
  roomWidth: 1200,
  verticalRoom: true,
  openDoor: {x: 30 * ROOM_W + 18, y: 3380, w: 55, h: 80},
  lockedDoor: {x: 30 * ROOM_W + 1120, y: 3380, w: 55, h: 80},
  platforms: createVerticalRoomPlatforms(30 * ROOM_W),
  spikes: [],
  walls: [],
  transitionZone: null,
  noDoor: true,
  decor: genDecor(30 * ROOM_W, 12, 6, 3500)
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
  room10, room11].concat(interludeRooms, [room12], bossApproachRooms, [room13], cityRooms, [room30, room31, room32, room33, room34, room35, room36]);
