var azari = 0, hasMap = false, hasBow = false, arrows = 0, bombs = 0, shopOpen = false, shopMenuOpen = false, shopId = 0, shopAnim = 0, shopConfirm = -1, shopGreeting = "", shopGreetingTimer = 0;
var shopPreviousX = 0, shopPreviousY = 0, shopExitCooldown = 0;
var shopVendorX = 680, shopVendorY = 445;
var heartFragments1 = 0, heartFragments2 = 0;
var heartFragmentsBought1 = 0, heartFragmentsBought2 = 0;
var hasAzariCharm = false, hasDoubleJump = false;
var hasAzariMagnet = false, hasAzariBag = false, azariBagLevel = 0, hasOldKey = false, keyReady = false, doorUnlocked = false, rewardAzariCollected = false, hasLantern = false, lanternLevel = 0, infiniteLight = false;
var hasDash = false;
var swordLevel = 0, bowLevel = 0, arrowType = "normal";

var armorId = "vacío", armorLevel = 0;
var permanentUpgrades = { vitality: 0, strength: 0 };

var hiddenCollectibles = { eclipse: false, root: false, crown: false };
var hiddenCollectibleData = [
  { id: "eclipse", room: 2, x: 2360, y: 420 },
  { id: "root", room: 6, x: 5480, y: 620 },
  { id: "crown", room: 10, x: 8580, y: 1050 }
];

var twoPlayerMode = false;
var inventoryOpen = false, mapOpen = false, inventoryPage = 0, inventorySelection = 0, inventoryHover = -1;
