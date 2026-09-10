function trackGameEvent(eventName, eventParams) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, eventParams || {});
}

function trackEarnVirtualCurrency(amount, source) {
  if (amount <= 0) return;
  trackGameEvent("earn_virtual_currency", {
    virtual_currency_name: "Azari",
    value: amount,
    source: source || "gameplay"
  });
}

function spendAzari(amount, item) {
  if (!Number.isFinite(amount) || amount <= 0 || azari < amount) return false;
  azari -= amount;
  trackGameEvent("spend_virtual_currency", {
    virtual_currency_name: "Azari",
    value: amount,
    item_name: item || "shop_item"
  });
  return true;
}
