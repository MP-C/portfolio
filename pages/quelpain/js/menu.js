/**
 * menu.js — Quel Pain
 *
 * Lê assets/menu.json e constrói automaticamente:
 *   - os botões de tab
 *   - os painéis com os itens
 *
 * Para atualizar o menu → editar APENAS assets/menu.json
 * Não tocar neste ficheiro nem no HTML.
 *
 * Campos do JSON por item:
 *   categorie   : id da categoria (deve corresponder a categories[].id)
 *   nom         : nome do prato
 *   description : descrição curta
 *   prix        : preço ex: "9,50 €"
 *   badge       : texto do badge, ou null
 *   badge_type  : "gold" | "green" | null
 */

(function () {
  'use strict';

  var JSON_URL   = 'assets/menu.json';
  var TABLIST_ID = 'menu-tablist';
  var PANELS_ID  = 'menu-panels';

  /* Escapa caracteres HTML para evitar XSS */
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Constrói o HTML de um item */
  function renderItem(item) {
    var badge = '';
    if (item.badge) {
      var cls = item.badge_type === 'green' ? 'badge badge--green' : 'badge';
      badge = '<span class="' + cls + '">' + esc(item.badge) + '</span>';
    }
    return (
      '<li class="menu-item">' +
        '<div class="menu-item__info">' +
          '<h3 class="menu-item__name">' + esc(item.nom) + '</h3>' +
          '<p class="menu-item__desc">' + esc(item.description) + '</p>' +
          badge +
        '</div>' +
        '<span class="menu-item__price" aria-label="Prix : ' + esc(item.prix) + '">' +
          esc(item.prix) +
        '</span>' +
      '</li>'
    );
  }

  /* Injecta tabs + painéis no DOM */
  function render(data) {
    var tablist = document.getElementById(TABLIST_ID);
    var panels  = document.getElementById(PANELS_ID);
    if (!tablist || !panels) return;

    var cats  = data.categories || [];
    var items = data.items      || [];

    /* ── Tabs ── */
    tablist.innerHTML = cats.map(function (cat, i) {
      var active = i === 0;
      return (
        '<button' +
          ' class="tab-btn' + (active ? ' tab-btn--active' : '') + '"' +
          ' role="tab"' +
          ' aria-selected="' + active + '"' +
          ' aria-controls="panel-' + esc(cat.id) + '"' +
          ' id="tab-' + esc(cat.id) + '"' +
          ' type="button"' +
          (active ? '' : ' tabindex="-1"') +
        '>' +
          esc(cat.label) +
        '</button>'
      );
    }).join('');

    /* ── Painéis ── */
    panels.innerHTML = cats.map(function (cat, i) {
      var active   = i === 0;
      var filtered = items.filter(function (it) { return it.categorie === cat.id; });
      return (
        '<div' +
          ' class="tab-panel' + (active ? ' tab-panel--active' : '') + '"' +
          ' role="tabpanel"' +
          ' id="panel-' + esc(cat.id) + '"' +
          ' aria-labelledby="tab-' + esc(cat.id) + '"' +
          (active ? '' : ' hidden') +
        '>' +
          '<ul class="menu-grid" role="list">' +
            filtered.map(renderItem).join('') +
          '</ul>' +
        '</div>'
      );
    }).join('');

    /* Re-inicializar a lógica de tabs depois do render */
    if (typeof window.initTabs === 'function') {
      window.initTabs();
    }
  }

  /* Mensagem de erro se o JSON não carrega */
  function renderError() {
    var panels = document.getElementById(PANELS_ID);
    if (panels) {
      panels.innerHTML =
        '<p style="color:rgba(200,212,188,.5);padding:2rem;font-size:.9rem">' +
        'Menu temporairement indisponible. Contactez-nous au 02 522 36 89.' +
        '</p>';
    }
  }

  /* Ponto de entrada */
  function init() {
    fetch(JSON_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error('menu.js — impossible de charger le menu :', err);
        renderError();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());