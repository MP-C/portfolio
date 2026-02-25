/**
 * download.js — Quel Pain
 * Generates a downloadable text version of the menu.
 * No external dependencies. Sanitized string output only.
 */

(function () {
  'use strict';

  var MENU_TEXT = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║                        QUEL PAIN                            ║',
    '║          Sandwicherie Artisanale — Bruxelles                ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    'Bd du Jardin Botanique 37, 1000 Bruxelles',
    'Tél : 02 522 36 89',
    'Horaires : Lun–Ven 08h00–15h00 | Sam–Dim : Fermé',
    '',
    '══════════════════════════════════════════════════════════════',
    '  SANDWICHS FROIDS',
    '══════════════════════════════════════════════════════════════',
    '',
    '  Le Classique Quel Pain                              9,50 €',
    '  Jambon fumé artisanal, beurre de baratte, cornichons maison,',
    '  baguette tradition',
    '',
    '  Saumon & Avocat                                    12,00 €',
    '  Saumon gravlax, avocat, cream cheese citronné, aneth, pain de seigle',
    '',
    '  Végétarien Printanier  [VÉGÉTARIEN]                10,00 €',
    '  Houmous artisanal, légumes grillés, feta AOC, herbes fraîches, ciabatta',
    '',
    '  Poulet Rôti Maison                                 11,50 €',
    '  Blanc de poulet fermier, mayonnaise au basilic, tomates séchées, roquette',
    '',
    '  Le Caprese Élégant                                 11,00 €',
    '  Burrata crémeuse, tomates cœur de bœuf, basilic génois, huile d\'olive vierge, focaccia',
    '',
    '  Club Gourmet                                       13,50 €',
    '  Dinde rôtie, bacon fumé, œuf dur, avocat, pain brioché grillé',
    '',
    '══════════════════════════════════════════════════════════════',
    '  SANDWICHS CHAUDS',
    '══════════════════════════════════════════════════════════════',
    '',
    '  Croque Quel Pain                                   11,00 €',
    '  Jambon fermier, Comté 18 mois, béchamel maison, pain de mie brioché',
    '',
    '  Panini Méditerranéen                               10,50 €',
    '  Chorizo ibérique, poivrons confits, chèvre frais, tapenade d\'olive noire',
    '',
    '  Burger Bœuf Artisanal                              15,00 €',
    '  Steak haché 180g, cheddar affiné, oignons caramélisés, sauce maison, brioche artisanale',
    '',
    '  Wrap Falafel  [VÉGÉTARIEN]                         10,00 €',
    '  Falafels maison, tzatziki, taboulé, pickles de légumes, galette de blé complet',
    '',
    '══════════════════════════════════════════════════════════════',
    '  SALADES',
    '══════════════════════════════════════════════════════════════',
    '',
    '  Salade César Revisitée                             10,50 €',
    '  Romaine, parmesan en copeaux, croûtons maison, vinaigrette césar artisanale',
    '',
    '  Bowl Quinoa & Légumes  [VEGAN]                     12,00 €',
    '  Quinoa tricolore, légumes de saison rôtis, tahini citronné, graines de courge',
    '',
    '  Salade Niçoise Gastronomique                       13,00 €',
    '  Thon albacore, œufs de caille, haricots verts extra-fins, olives, vinaigrette maison',
    '',
    '  Burrata & Figues                                   14,00 €',
    '  Burrata fraîche, figues de saison, miel artisanal, roquette, noix torréfiées',
    '',
    '══════════════════════════════════════════════════════════════',
    '  BOISSONS',
    '══════════════════════════════════════════════════════════════',
    '',
    '  Eaux Pétillantes / Plates                           2,50 €',
    '  Jus pressés du jour                                 4,50 €',
    '  Café de spécialité                                  3,00 €',
    '  Thés & Infusions premium                            3,50 €',
    '',
    '══════════════════════════════════════════════════════════════',
    '  COMMANDES',
    '══════════════════════════════════════════════════════════════',
    '',
    '  Heure limite déjeuner  : 11h00',
    '  Heure limite petit-dej : 9h00 (veille)',
    '  Tél : 02 522 36 89',
    '  Email : commandes@quelpain.be',
    '',
    '══════════════════════════════════════════════════════════════',
    '  Carte mise à jour chaque saison.',
    '  Informez-nous de vos allergies ou intolérances alimentaires.',
    '══════════════════════════════════════════════════════════════',
    ''
  ].join('\n');

  function downloadMenu() {
    try {
      var blob = new Blob([MENU_TEXT], { type: 'text/plain;charset=utf-8' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href     = url;
      a.download = 'Quel-Pain-Carte.txt';
      a.setAttribute('aria-hidden', 'true');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur lors du téléchargement :', err);
    }
  }

  function init() {
    var btn = document.getElementById('download-btn');
    if (btn) {
      btn.addEventListener('click', downloadMenu);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
}());
