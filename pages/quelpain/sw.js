/**
 * sw.js — Quel Pain Service Worker
 * Gère le cache et affiche la page hors ligne quand il n'y a pas de connexion.
 *
 * Stratégie : Cache First pour assets statiques, Network First pour HTML.
 * La page offline.html est toujours disponible hors ligne.
 */

'use strict';

var CACHE_NAME    = 'quelpain-v1';
var OFFLINE_URL   = '/offline.html';

/* Fichiers mis en cache immédiatement à l'installation */
var PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/404.html',
  '/403.html',
  '/css/reset.css',
  '/css/tokens.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/tabs.js',
  '/js/nav.js',
  '/js/download.js',
  '/js/utils.js'
];

/* ── Installation : mise en cache des ressources essentielles ── */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

/* ── Activation : nettoyage des anciens caches ── */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

/* ── Fetch : intercepte les requêtes ── */
self.addEventListener('fetch', function (event) {
  /* Ignorer les requêtes non-GET */
  if (event.request.method !== 'GET') return;

  /* Ignorer les requêtes vers des domaines externes */
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      /* Si en cache : retourner depuis cache, mettre à jour en arrière-plan */
      if (cachedResponse) {
        /* Stale-while-revalidate pour assets statiques */
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(function () { return cachedResponse; });

        /* Pour HTML : attendre le réseau, utiliser cache si offline */
        if (event.request.headers.get('Accept') &&
            event.request.headers.get('Accept').indexOf('text/html') !== -1) {
          return fetch(event.request)
            .then(function (response) {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME).then(function (cache) {
                  cache.put(event.request, response.clone());
                });
              }
              return response;
            })
            .catch(function () {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        }

        return cachedResponse;
      }

      /* Pas en cache : réseau */
      return fetch(event.request)
        .then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var toCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, toCache);
          });
          return response;
        })
        .catch(function () {
          /* Hors ligne et pas en cache → page offline */
          if (event.request.headers.get('Accept') &&
              event.request.headers.get('Accept').indexOf('text/html') !== -1) {
            return caches.match(OFFLINE_URL);
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
    })
  );
});
