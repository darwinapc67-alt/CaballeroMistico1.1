"use strict";

// Bump this value when publishing a new app-shell version.
const CACHE_NAME = "caballero-mistico-shell-v2";
const SHELL_FILES = [
  "index.html",
  "jugar/index.html",
  "style.css?v=15",
  "content.css?v=1",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "js/analytics.js?v=4",
  "como-jugar/index.html",
  "jefes/index.html",
  "enemigos/index.html",
  "bendiciones/index.html",
  "modo-infinito/index.html",
  "acerca-de/index.html",
  "contacto/index.html",
  "privacidad/index.html",
  "terminos/index.html",
  "js/config/gameConfig.js?v=257",
  "js/config/weaponConfig.js?v=5",
  "js/config/playerConfig.js?v=227",
  "js/config/itemConfig.js?v=230",
  "js/config/blessingConfig.js?v=225",
  "js/config/bossConfig.js?v=226",
  "js/config/roomConfig.js?v=237",
  "js/config/enemyConfig.js?v=227",
  "js/audio.js?v=11",
  "js/gameplay.js?v=264",
  "js/render/backgroundRenderer.js?v=207",
  "js/render/roomRenderer.js?v=206",
  "js/render/effectsRenderer.js?v=203",
  "js/render/enemyRenderer.js?v=206",
  "js/render/playerRenderer.js?v=220",
  "js/render.js?v=216",
  "js/render/uiRenderer.js?v=273",
  "js/input.js?v=247",
  "js/main.js?v=214",
  "js/pwa.js?v=1"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const resources = SHELL_FILES.map(path =>
      new Request(new URL(path, self.registration.scope).href, { cache: "reload" })
    );
    await cache.addAll(resources);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter(name => name.startsWith("caballero-mistico-shell-") && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          try {
            await cache.put(request, response.clone());
            const appEntry = new URL(self.registration.scope);
            if (requestUrl.pathname === appEntry.pathname) {
              await cache.put(new URL("index.html", self.registration.scope).href, response.clone());
            }
          } catch (error) {
            console.warn("No se pudo actualizar la copia offline de la página:", error);
          }
        }
        return response;
      } catch (error) {
        const cachedPage = await caches.match(request);
        if (cachedPage) return cachedPage;
        const appEntry = new URL(self.registration.scope);
        if (requestUrl.pathname.startsWith(appEntry.pathname)) {
          const relativePath = requestUrl.pathname.slice(appEntry.pathname.length).replace(/\/+$/, "");
          const cachedPath = !relativePath || relativePath.endsWith(".html")
            ? (relativePath || "index.html")
            : relativePath + "/index.html";
          const cachedDocument = await caches.match(new URL(cachedPath, appEntry).href);
          if (cachedDocument) return cachedDocument;
        }
        return Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cachedResource = await caches.match(request);
    if (cachedResource) return cachedResource;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        try {
          await cache.put(request, response.clone());
        } catch (error) {
          console.warn("No se pudo guardar un recurso para uso offline:", request.url, error);
        }
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
