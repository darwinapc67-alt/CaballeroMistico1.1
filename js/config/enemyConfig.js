var bestiaryInfo = {
  bat: { name: "Murciélago Sombrío", desc: "Criatura alada que habita las profundidades. se alimenta de energia de hechizos." },
  larva_mosca: { name: "Larva-Mosca", desc: "Aberración híbrida que embiste con ferocidad." },
  cazador_paramo: { name: "Cazador del Páramo", desc: "Depredador terrestre que patrulla los páramos y persigue a los intrusos." },
  dark_knight: { name: "Caballero oscuro", desc: "Guerrero blindado que combate con espada, bloquea golpes y carga con un dash." },
  blue_sentry: { name: "Centinela Azul", desc: "Entidad flotante que dispara rayos azules y puede recibirlos de vuelta con la Espada Mística." }
};
var bestiary = { bat: { discovered: false, count: 0 }, larva_mosca: { discovered: false, count: 0 }, cazador_paramo: { discovered: false, count: 0 }, dark_knight: { discovered: false, count: 0 }, blue_sentry: { discovered: false, count: 0 } };

var enemies = [
  {x: 9630, y: 520, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 520, range: 180, speed: 1.2, dead: false, room: 12, type: 'cazador_paramo', terrestrial: true},
  {x: 10420, y: 520, w: 24, h: 20, vx: -1.4, vy: 0, baseY: 520, range: 180, speed: 1.4, dead: false, room: 13, type: 'cazador_paramo', terrestrial: true},
  {x: 11230, y: 520, w: 34, h: 48, vx: -1, vy: 0, baseY: 512, speed: 1.1, dead: false, room: 14, type: 'dark_knight', hp: 48, maxHp: 48, blockTimer: 80, dashCooldown: 100, dashTimer: 0, staysRoom: true},
  {x: 12020, y: 520, w: 34, h: 48, vx: 1, vy: 0, baseY: 512, speed: 1.2, dead: false, room: 15, type: 'dark_knight', hp: 48, maxHp: 48, blockTimer: 120, dashCooldown: 140, dashTimer: 0, staysRoom: true},
  {x: 12810, y: 520, w: 34, h: 48, vx: -1, vy: 0, baseY: 512, speed: 1.15, dead: false, room: 16, type: 'dark_knight', hp: 48, maxHp: 48, blockTimer: 60, dashCooldown: 120, dashTimer: 0, staysRoom: true},
  {x: 13600, y: 520, w: 34, h: 48, vx: 1, vy: 0, baseY: 512, speed: 1.3, dead: false, room: 17, type: 'dark_knight', hp: 48, maxHp: 48, blockTimer: 100, dashCooldown: 160, dashTimer: 0, staysRoom: true},
  {x: 14390, y: 520, w: 34, h: 48, vx: -1, vy: 0, baseY: 512, speed: 1.25, dead: false, room: 18, type: 'dark_knight', hp: 48, maxHp: 48, blockTimer: 90, dashCooldown: 110, dashTimer: 0, staysRoom: true},
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
  {x:35 * ROOM_W + 540, y:770, w:70, h:90, vx: 0, vy: 0, dead: false, room: 35, type: 'guardian',
    boss: true, bossName: "GUARDIÁN DE LA CUEVA", hp: 100, maxHp: 100, aiTimer: 80, attackTimer: 60, phase: 1, enraged: false},
  {x:15540, y:470, w:78, h:90, vx: 0, vy: 0, dead: false, room: 19, type: 'queen_larva',
    boss: true, bossName: "REINA LARVA", hp: 140, maxHp: 140, aiTimer: 90, attackTimer: 70, phase: 1, enraged: false},
  {x:16340, y:460, w:60, h:100, vx: 0, vy: 0, dead: false, room: 20, type: 'abyssal_knight',
    boss: true, bossName: "CABALLERO ABISMAL", hp: 180, maxHp: 180, aiTimer: 70, attackTimer: 50, phase: 1, enraged: false},
  {x: 24380, y: 3150, w: 32, h: 28, vx: 0, vy: 0, dead: false, room: 34, type: 'blue_sentry', shootTimer: 45, staysRoom: true},
  {x: 24740, y: 2380, w: 32, h: 28, vx: 0, vy: 0, dead: false, room: 34, type: 'blue_sentry', shootTimer: 80, staysRoom: true},
  {x: 24280, y: 1550, w: 32, h: 28, vx: 0, vy: 0, dead: false, room: 34, type: 'blue_sentry', shootTimer: 115, staysRoom: true},
  {x: 24680, y: 700, w: 32, h: 28, vx: 0, vy: 0, dead: false, room: 34, type: 'blue_sentry', shootTimer: 150, staysRoom: true}
];
for (var challengeRoom = 12; challengeRoom <= 18; challengeRoom++) {
  var challengeOrigin = challengeRoom * ROOM_W;
  enemies.push(
    {x: challengeOrigin + 260, y: 230, w: 24, h: 20, vx: challengeRoom % 2 ? 1.3 : -1.3, vy: 0,
      baseY: 230, range: 90, speed: 1.3, dead: false, room: challengeRoom, type: "bat"},
    {x: challengeOrigin + 540, y: 500, w: 28, h: 22, vx: challengeRoom % 2 ? -1 : 1, vy: 0,
      speed: 1.6, visionRadius: 210, dead: false, room: challengeRoom, type: "larva_mosca"}
  );
}
for (var approachRoom = 20; approachRoom <= 22; approachRoom++) {
  var approachOrigin = approachRoom * ROOM_W;
  enemies.push(
    {x: approachOrigin + 245, y: 280, w: 24, h: 20, vx: 1.2, vy: 0, baseY: 280, range: 75,
      speed: 1.2, dead: false, room: approachRoom, type: "bat", preserveRoom: true},
    {x: approachOrigin + 520, y: 500, w: 28, h: 22, vx: approachRoom % 2 ? -1 : 1, vy: 0,
      speed: 1.7, visionRadius: 210, dead: false, room: approachRoom, type: "larva_mosca", preserveRoom: true}
  );
}
enemies.forEach(function(enemy) {
  if (enemy.room >= 20 && !enemy.preserveRoom) { enemy.room += 3; enemy.x += 3 * ROOM_W; }
});
enemies.forEach(function(e) { e.canRoam = !e.boss; });
