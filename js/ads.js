var adRequestInProgress = false;

function requestRewardedAd(rewardType) {
  if (adRequestInProgress) return;
  if (!window.googletag || !GAM_AD_UNIT_PATH) {
    if (GAM_ENABLE_TEST_REWARDS) applyAdReward(rewardType);
    else showAdMessage("Anuncios no configurados todavía.");
    return;
  }
  adRequestInProgress = true;
  var slot = null;
  googletag.cmd.push(function() {
    slot = googletag.defineOutOfPageSlot(GAM_AD_UNIT_PATH, googletag.enums.OutOfPageFormat.REWARDED);
    if (!slot) {
      adRequestInProgress = false;
      showAdMessage("Este anuncio no está disponible.");
      return;
    }
    slot.addService(googletag.pubads());
    var granted = false;
    var onReady = function(event) {
      if (event.slot !== slot) return;
      event.makeRewardedVisible();
    };
    var onGranted = function(event) {
      if (event.slot !== slot || granted) return;
      granted = true;
      applyAdReward(rewardType);
    };
    var cleanup = function(event) {
      if (event.slot !== slot) return;
      googletag.pubads().removeEventListener("rewardedSlotReady", onReady);
      googletag.pubads().removeEventListener("rewardedSlotGranted", onGranted);
      googletag.pubads().removeEventListener("rewardedSlotClosed", cleanup);
      googletag.destroySlots([slot]);
      adRequestInProgress = false;
    };
    googletag.pubads().addEventListener("rewardedSlotReady", onReady);
    googletag.pubads().addEventListener("rewardedSlotGranted", onGranted);
    googletag.pubads().addEventListener("rewardedSlotClosed", cleanup);
    googletag.enableServices();
    googletag.display(slot);
  });
}

function applyAdReward(rewardType) {
  if (rewardType === "revive") {
    adRewardedRevive = true;
    showAdMessage("¡Puedes revivir una vez!");
  } else if (rewardType === "azari") {
    collectAzari(35);
    showAdMessage("+35 Azari");
  } else if (rewardType === "random") {
    var reward = Math.floor(Math.random() * 3);
    if (reward === 0) collectAzari(25);
    else if (reward === 1) player.hp = Math.min(player.maxHp, player.hp + 2);
    else arrows += 10;
    showAdMessage(reward === 0 ? "+25 Azari" : (reward === 1 ? "+2 Vida" : "+10 Flechas"));
  } else if (rewardType === "bonus") {
    adAzariBonusTimer = 60 * 30;
    showAdMessage("Bonus activo: Azari x2 durante 30 segundos");
  }
}

function showAdMessage(message) {
  adMessage = message;
  adMessageTimer = 180;
}
