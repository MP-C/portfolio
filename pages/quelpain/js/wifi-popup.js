/**
 * popup.js — Quel Pain
 * Popup de bienvenue — s'affiche une fois par session, 1.2s après chargement.
 * Simple, fiable, sans dépendances externes.
 */

(function () {
  'use strict';

  var SESSION_KEY = 'qp_popup_seen';
  var SHOW_DELAY  = 1200;

  var CSS = [
    '.qp-backdrop {',
    '  position: fixed; inset: 0; z-index: 900;',
    '  background: rgba(26,26,20,.5);',
    '  backdrop-filter: blur(3px);',
    '  -webkit-backdrop-filter: blur(3px);',
    '  opacity: 0; transition: opacity .35s ease; pointer-events: none;',
    '}',
    '.qp-backdrop.visible { opacity: 1; pointer-events: auto; }',
    '.qp-popup {',
    '  position: fixed; bottom: 2rem; right: 2rem; z-index: 901;',
    '  width: min(400px, calc(100vw - 2rem));',
    '  background: #FAF7F2; border-left: 3px solid #B8975A;',
    '  box-shadow: 0 20px 60px rgba(0,0,0,.2);',
    '  opacity: 0; transform: translateY(20px);',
    '  transition: opacity .4s ease, transform .4s ease; pointer-events: none;',
    '}',
    '.qp-popup.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }',
    '.qp-popup__inner { padding: 1.8rem 2rem 1.5rem; }',
    '.qp-popup__close {',
    '  position: absolute; top: .7rem; right: .7rem;',
    '  background: none; border: none; cursor: pointer;',
    '  color: #8A8478; padding: .35rem; line-height: 1; border-radius: 2px; transition: color .2s;',
    '}',
    '.qp-popup__close:hover { color: #1A1A14; }',
    '.qp-popup__close:focus-visible { outline: 3px solid #B8975A; outline-offset: 2px; }',
    '.qp-popup__icon { font-size: 1.6rem; display: block; margin-bottom: .5rem; }',
    '.qp-popup__label { font-size: .6rem; letter-spacing: .28em; text-transform: uppercase; color: #B8975A; display: block; margin-bottom: .4rem; }',
    '.qp-popup__title { font-family: Georgia,serif; font-size: 1.3rem; font-weight: 300; line-height: 1.2; color: #4A5240; margin-bottom: .6rem; }',
    '.qp-popup__title em { font-style: italic; color: #B8975A; }',
    '.qp-popup__body { font-size: .85rem; line-height: 1.75; color: #8A8478; margin-bottom: 1.2rem; }',
    '.qp-popup__body strong { color: #4A5240; }',
    '.qp-popup__actions { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: .9rem; }',
    '.qp-popup__btn { display: inline-block; font-size: .68rem; letter-spacing: .15em; text-transform: uppercase; text-decoration: none; padding: .5rem 1.1rem; border: 1px solid transparent; transition: background .25s, color .25s; }',
    '.qp-popup__btn:focus-visible { outline: 3px solid #B8975A; outline-offset: 2px; }',
    '.qp-popup__btn--primary { background: #4A5240; color: #F5F0E8; border-color: #4A5240; }',
    '.qp-popup__btn--primary:hover { background: #B8975A; border-color: #B8975A; color: #1A1A14; }',
    '.qp-popup__btn--secondary { border-color: #4A5240; color: #4A5240; }',
    '.qp-popup__btn--secondary:hover { background: #4A5240; color: #F5F0E8; }',
    '.qp-popup__hours { font-size: .75rem; color: #8A8478; border-top: 1px solid rgba(74,82,64,.1); padding-top: .7rem; }',
    '@media (max-width: 480px) { .qp-popup { bottom:0; right:0; left:0; width:100%; border-left:none; border-top:3px solid #B8975A; } }'
  ].join('\n');

  function injectCSS() {
    if (document.getElementById('qp-popup-css')) return;
    var s = document.createElement('style');
    s.id = 'qp-popup-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function show() {
    injectCSS();
    var wrap = document.createElement('div');
    wrap.id = 'qp-wrap';
    wrap.innerHTML =
      '<div class="qp-backdrop" id="qp-backdrop"></div>' +
      '<div class="qp-popup" role="dialog" aria-modal="true" aria-labelledby="qp-title" id="qp-popup">' +
        '<button class="qp-popup__close" id="qp-close" type="button" aria-label="Fermer">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        '<div class="qp-popup__inner">' +
          '<span class="qp-popup__icon" aria-hidden="true">🍞</span>' +
          '<span class="qp-popup__label">Bienvenue</span>' +
          '<h2 class="qp-popup__title" id="qp-title">Bienvenue chez <em>Quel Pain</em></h2>' +
          '<p class="qp-popup__body">Sandwichs artisanaux, salades fraîches et café de spécialité. Commandez avant <strong>11h00</strong> pour garantir votre déjeuner.</p>' +
          '<div class="qp-popup__actions">' +
            '<a href="#menu" class="qp-popup__btn qp-popup__btn--primary" id="qp-menu-link">Voir le menu</a>' +
            '<a href="tel:+3225223689" class="qp-popup__btn qp-popup__btn--secondary">02 522 36 89</a>' +
          '</div>' +
          '<p class="qp-popup__hours">Lun\u2013Ven\u00a0: <strong>08h00\u201315h00</strong> &nbsp;\u00b7&nbsp; Sam &amp; Dim\u00a0: Ferm\u00e9</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    var backdrop = document.getElementById('qp-backdrop');
    var popup    = document.getElementById('qp-popup');
    var closeBtn = document.getElementById('qp-close');
    var menuLink = document.getElementById('qp-menu-link');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        backdrop.classList.add('visible');
        popup.classList.add('visible');
      });
    });

    function close() {
      backdrop.classList.remove('visible');
      popup.classList.remove('visible');
      setTimeout(function () {
        var w = document.getElementById('qp-wrap');
        if (w && w.parentNode) w.parentNode.removeChild(w);
      }, 400);
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch(e) {}
    }

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    if (menuLink) menuLink.addEventListener('click', close);
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
    });
  }

  function init() {
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch(e) {}
    setTimeout(show, SHOW_DELAY);
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { registerSW(); init(); });
  } else {
    registerSW(); init();
  }

}());