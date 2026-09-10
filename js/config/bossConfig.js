var bossUniqueItems = { guardian: false, queen_larva: false, abyssal_knight: false, dragon: false };

var bossProjectiles = [];
var doorTransition = false;
var bossDeathEffects = [];
var bossArenaState = { guardian: false, queen_larva: false, abyssal_knight: false, dragon: false };
var bossAbilities = { guardian: false, queen_larva: false, abyssal_knight: false, dragon: false };
var bossZonesUnlocked = { guardian: false, queen_larva: false, abyssal_knight: false, dragon: false };
var bossVictory = { active: false, timer: 0, type: "", reward: "", ability: "", zone: "" };
var bossIntroTimer = 0;
var bossDoorSoundRoom = -1;
var bossDialogueSeen = {};
var bossDialogueLines = [];
var bossDialogueIndex = 0;
var dialogueMode = "boss";
var currentHouse = null;
var interiorSelection = 0;
var interiorInspecting = false;
var interiorPlayer = { x: 400, y: 420, vx: 0, vy: 0, onGround: true };
var interiorMoveLeft = false, interiorMoveRight = false, interiorJump = false;

var bossDiaryInfo = {
  guardian: { name: "Guardián de la Cueva", desc: "Protector ancestral de la primera arena. Su fuerza domina las profundidades." },
  queen_larva: { name: "Reina Larva", desc: "Soberana de la colonia. Sus ataques convierten la arena en un nido mortal." },
  abyssal_knight: { name: "Caballero Abismal", desc: "Guerrero final del abismo, capaz de cambiar de fase durante el combate." }
  ,dragon: { name: "Dragón del Vacío", desc: "Una bestia ancestral que protege el último santuario." }
};
