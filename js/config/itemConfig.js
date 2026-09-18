var azari = 0, eterium = 0, hasMap = false, hasBow = false, arrows = 0, bombs = 0, shopOpen = false, shopMenuOpen = false, shopId = 0, shopAnim = 0, shopConfirm = -1, shopGreeting = "", shopGreetingTimer = 0;
var shopPreviousX = 0, shopPreviousY = 0, shopExitCooldown = 0;
var shopVendorX = 680, shopVendorY = 445;
var heartFragments1 = 0, heartFragments2 = 0;
var heartFragmentsBought1 = 0, heartFragmentsBought2 = 0;
var hasAzariCharm = false, hasDoubleJump = false;
var hasAzariMagnet = false, hasAzariBag = false, azariBagLevel = 0, hasOldKey = false, keyReady = false, doorUnlocked = false, rewardAzariCollected = false, hasLantern = false, lanternLevel = 0, infiniteLight = false;
var hasDash = false;
var swordLevel = 0, bowLevel = 0, arrowType = "normal";
var hasEteriumSkill = false, eteriumSkillLevel = 0, eteriumSkillCooldown = 0;

var armorId = "vacío", armorLevel = 0;
var skinCatalog = [
  {id: "wanderer", name: "Caballero Errante", price: 15, body: "#777", head: "#aaa", cape: "#555"},
  {id: "castle_guard", name: "Guardia del Castillo", price: 25, body: "#4779b8", head: "#d9e4f2", cape: "#294b78"},
  {id: "scarlet_cape", name: "Capa Escarlata", price: 30, body: "#0aa", head: "#0cc", cape: "#d33"},
  {id: "forest_guardian", name: "Guardián del Bosque", price: 45, body: "#4b7a45", head: "#b58b52", cape: "#304f30"},
  {id: "dark_templar", name: "Templario Oscuro", price: 55, body: "#171722", head: "#722", cape: "#35151d"},
  {id: "gold_steel", name: "Acero Dorado", price: 65, body: "#b58a32", head: "#ffe38a", cape: "#79551b"},
  {id: "purple_specter", name: "Espectro Morado", price: 80, body: "#7650a8", head: "#d6a8ff", cape: "#42245f", alpha: 0.62},
  {id: "alchemy_knight", name: "Caballero de Alquimia", price: 90, body: "#a8683c", head: "#e3b46e", cape: "#5b3826"},
  {id: "underworld_lord", name: "Señor del Inframundo", price: 100, body: "#321b25", head: "#e85c37", cape: "#160b12"}
];
var ownedSkins = {}, equippedSkin = "";
var permanentUpgrades = { vitality: 0, strength: 0 };

var hiddenCollectibles = { eclipse: false, root: false, crown: false };
var hasBrokenLarvaSword = false;
var hiddenCollectibleData = [
  { id: "eclipse", room: 2, x: 2360, y: 420 },
  { id: "root", room: 6, x: 5480, y: 620 },
  { id: "crown", room: 10, x: 8580, y: 1050 }
];

var twoPlayerMode = false;
var inventoryOpen = false, mapOpen = false, mapFade = 0, mapClosing = false, inventoryPage = 0, inventorySelection = 0, inventoryHover = -1;
