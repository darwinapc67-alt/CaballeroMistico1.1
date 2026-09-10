var DEFAULT_WEAPON_ID = "mystic_sword";
var WEAPON_PROGRESSION = ["mystic_sword", "mystic_spear", "shadow_sword", "arcane_hammer", "void_scythe", "time_blade"];
var INFINITE_WEAPON_WAVES = [1, 3, 6, 10, 15, 21];
var unlockedWeapons = [DEFAULT_WEAPON_ID];
var WEAPON_CONFIG = {
  mystic_sword: { id: "mystic_sword", name: "Espada mística", shortName: "Espada mística", damage: 1, range: 48, cooldown: 22, swing: 12, color: "#e4e9f0", effect: "none" },
  mystic_spear: { id: "mystic_spear", name: "Lanza mística", shortName: "Lanza mística", damage: 0.9, range: 66, cooldown: 26, swing: 14, color: "#73d4cc", effect: "pierce" },
  shadow_sword: { id: "shadow_sword", name: "Espada sombría", shortName: "Espada sombría", damage: 1.2, range: 44, cooldown: 18, swing: 10, color: "#9b75d6", effect: "shadow" },
  arcane_hammer: { id: "arcane_hammer", name: "Martillo arcano", shortName: "Martillo arcano", damage: 1.45, range: 40, cooldown: 32, swing: 18, color: "#f0a05a", effect: "stun" },
  void_scythe: { id: "void_scythe", name: "Guadaña del vacío", shortName: "Guadaña del vacío", damage: 1.15, range: 74, cooldown: 29, swing: 16, color: "#7d69c9", effect: "pull" },
  time_blade: { id: "time_blade", name: "Hoja temporal", shortName: "Hoja temporal", damage: 1.3, range: 56, cooldown: 15, swing: 11, color: "#72d9ff", effect: "time" }
};
function getWeaponConfig(id) {
  return WEAPON_CONFIG[normalizeWeaponId(id)] || WEAPON_CONFIG[DEFAULT_WEAPON_ID];
}
function normalizeWeaponId(id) {
  return WEAPON_CONFIG[id] ? id : DEFAULT_WEAPON_ID;
}
function isWeaponUnlocked(id) {
  return unlockedWeapons.indexOf(normalizeWeaponId(id)) >= 0;
}
function unlockWeaponAt(index) {
  if (index < 0 || index >= WEAPON_PROGRESSION.length) return false;
  var changed = false;
  for (var i = 0; i <= index; i++) {
    if (unlockedWeapons.indexOf(WEAPON_PROGRESSION[i]) < 0) {
      unlockedWeapons.push(WEAPON_PROGRESSION[i]);
      changed = true;
    }
  }
  return changed;
}
function unlockWeaponsForRoom(roomIndex) {
  unlockWeaponAt(Math.min(WEAPON_PROGRESSION.length - 1, Math.floor(roomIndex / 5)));
}
function unlockWeaponsForInfiniteWave(wave) {
  var index = -1;
  for (var i = 0; i < INFINITE_WEAPON_WAVES.length; i++) {
    if (wave >= INFINITE_WEAPON_WAVES[i]) index = i;
  }
  return index >= 0 ? unlockWeaponAt(index) : false;
}
