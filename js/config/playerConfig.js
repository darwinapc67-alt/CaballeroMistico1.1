var player = {
  x: 100, y: 400, w: 22, h: 30, vx: 0, vy: 0, onGround: false, facing: 1,
  jumpsLeft: 1, maxJumps: 2, jumpHeld: false, inv: 0, anim: 0, autoWalk: 0, frozen: false,
  hp: 10, maxHp: 10, id: 1, color: "#0aa", headColor: "#0cc",
  hasSword: false, swordEquipped: false, weaponId: DEFAULT_WEAPON_ID, swordSwing: 0, swordCooldown: 0, bowCooldown: 0, attackHeld: false, attackCharge: 0, attackCharged: false, attackDown: false, attackType: "",
  swordSheathed: true, swordSheathTimer: 0, blocking: false, guardTimer: 0, guardCooldown: 0,
  dashTimer: 0, dashCooldown: 0, dashDir: 1, dashing: false, recoilTimer: 0
};

var player2 = {
  x: 140, y: 400, w: 22, h: 30, vx: 0, vy: 0, onGround: false, facing: 1,
  jumpsLeft: 1, maxJumps: 2, jumpHeld: false, inv: 0, anim: 0, autoWalk: 0, frozen: false,
  hp: 10, maxHp: 10, id: 2, color: "#a0a", headColor: "#c0c",
  hasSword: false, swordEquipped: false, weaponId: DEFAULT_WEAPON_ID, swordSwing: 0, swordCooldown: 0, bowCooldown: 0, attackHeld: false, attackCharge: 0, attackCharged: false, attackDown: false, attackType: "",
  swordSheathed: true, swordSheathTimer: 0, blocking: false, guardTimer: 0, guardCooldown: 0,
  dashTimer: 0, dashCooldown: 0, dashDir: 1, dashing: false, recoilTimer: 0
};

var hasSword = false, swordEquipped = false, weaponId = DEFAULT_WEAPON_ID;
var currentRoom = 0, cameraX = 0, targetCamX = 0, cameraY = 0, targetCamY = 0;
var particles = [], floatTexts = [], arrowsInFlight = [], bombsInFlight = [], impactBursts = [], flash = 0;
var combatShake = 0, combatHitStop = 0;
var healingHearts = [];
var keys = {};
