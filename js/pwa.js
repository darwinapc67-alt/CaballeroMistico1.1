"use strict";

(function() {
  var installButton = document.getElementById("pwaInstallButton");
  var installHelp = document.getElementById("pwaInstallHelp");
  var deferredInstallPrompt = null;
  var userAgent = navigator.userAgent || "";
  var isIOS = /iPhone|iPad|iPod/i.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isMacSafari = /Macintosh/i.test(userAgent) &&
    /Safari/i.test(userAgent) && !/Chrome|Chromium|Edg/i.test(userAgent);

  function isInstalled() {
    return navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;
  }

  function showIOSHelp() {
    if (isInstalled() || (!isIOS && !isMacSafari)) return;
    installHelp.textContent = isIOS
      ? 'Para instalarlo, toca Compartir y selecciona “Añadir a pantalla de inicio”.'
      : 'En Safari, selecciona Archivo > Añadir al Dock para abrir el juego como una app.';
    installHelp.hidden = false;
  }

  function updateOfflineState() {
    document.body.classList.toggle("is-offline", !navigator.onLine);
  }

  updateOfflineState();
  window.addEventListener("online", updateOfflineState);
  window.addEventListener("offline", updateOfflineState);
  showIOSHelp();

  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
      .then(function(registration) {
        return registration.update().catch(function(error) {
          console.warn("No se pudo comprobar si hay una actualización PWA:", error);
        });
      })
      .catch(function(error) {
        console.error("No se pudo registrar el soporte offline de Caballero Místico:", error);
      });
  }

  window.addEventListener("beforeinstallprompt", function(event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    installHelp.hidden = true;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async function() {
    if (!deferredInstallPrompt) return;
    var installPrompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    installButton.hidden = true;
    try {
      await installPrompt.prompt();
      var choice = await installPrompt.userChoice;
      if (choice.outcome !== "accepted") showIOSHelp();
    } catch (error) {
      console.error("No se pudo iniciar la instalación de Caballero Místico:", error);
    }
  });

  window.addEventListener("appinstalled", function() {
    deferredInstallPrompt = null;
    installButton.hidden = true;
    installHelp.hidden = true;
  });

  var standaloneQuery = window.matchMedia("(display-mode: standalone)");
  var handleDisplayModeChange = function(event) {
    if (event.matches) {
      installButton.hidden = true;
      installHelp.hidden = true;
    } else {
      showIOSHelp();
    }
  };
  if (standaloneQuery.addEventListener) {
    standaloneQuery.addEventListener("change", handleDisplayModeChange);
  } else if (standaloneQuery.addListener) {
    standaloneQuery.addListener(handleDisplayModeChange);
  }
})();
