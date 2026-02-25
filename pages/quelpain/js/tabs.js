/**
 * tabs.js — Quel Pain
 * Tabs WAI-ARIA com navegação por teclado (Arrow, Home, End).
 * Expõe window.initTabs() para ser chamado por menu.js após render dinâmico.
 */

(function () {
  'use strict';

  function activateTab(tab, allTabs) {
    allTabs.forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.classList.remove('tab-btn--active');
    });
    tab.setAttribute('aria-selected', 'true');
    tab.removeAttribute('tabindex');
    tab.classList.add('tab-btn--active');

    var panelId = tab.getAttribute('aria-controls');
    document.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
      if (panel.id === panelId) {
        panel.removeAttribute('hidden');
        panel.classList.add('tab-panel--active');
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('tab-panel--active');
      }
    });
  }

  function handleKeydown(e, tab, allTabs) {
    var idx = allTabs.indexOf(tab);
    var next = idx;
    switch (e.key) {
      case 'ArrowLeft':  case 'ArrowUp':
        e.preventDefault();
        next = idx > 0 ? idx - 1 : allTabs.length - 1; break;
      case 'ArrowRight': case 'ArrowDown':
        e.preventDefault();
        next = idx < allTabs.length - 1 ? idx + 1 : 0; break;
      case 'Home': e.preventDefault(); next = 0; break;
      case 'End':  e.preventDefault(); next = allTabs.length - 1; break;
      default: return;
    }
    allTabs[next].focus();
    activateTab(allTabs[next], allTabs);
  }

  /* Exposta globalmente — chamada por menu.js após render */
  window.initTabs = function () {
    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
      var tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      tabs.forEach(function (tab) {
        /* Clonar para remover listeners antigos */
        var fresh = tab.cloneNode(true);
        tab.parentNode.replaceChild(fresh, tab);
        fresh.addEventListener('click',   function ()  { activateTab(fresh, tabs.map(function(t){ return t.parentNode ? fresh.parentNode.querySelector('#'+t.id) || t : t; })); });
      });
      /* Re-selecionar após clone */
      var freshTabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      freshTabs.forEach(function (tab) {
        tab.addEventListener('click',   function () { activateTab(tab, freshTabs); });
        tab.addEventListener('keydown', function (e) { handleKeydown(e, tab, freshTabs); });
      });
    });
  };

  document.addEventListener('DOMContentLoaded', window.initTabs);

}());