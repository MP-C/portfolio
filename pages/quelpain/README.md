# QUEL PAIN — Site Web

## Structure du projet

```
quelpain/
├── index.html              ← Page principale (HTML sémantique, accessible)
├── .htaccess               ← Sécurité & performance Apache
├── nginx.conf              ← Config Nginx (alternative Apache)
├── README.md               ← Ce fichier
│
├── css/
│   ├── reset.css           ← Normalisation navigateurs
│   ├── tokens.css          ← Variables CSS (couleurs, typo, espacement)
│   ├── layout.css          ← Structure globale (nav, hero, grilles, sections)
│   ├── components.css      ← Composants UI (boutons, cartes, onglets, footer)
│   ├── animations.css      ← Keyframes et classes d'animation
│   └── responsive.css      ← Breakpoints mobile, tablette, print
│
├── js/
│   ├── tabs.js             ← Onglets accessibles (WAI-ARIA)
│   ├── nav.js              ← Navigation responsive + menu mobile
│   ├── download.js         ← Téléchargement de la carte
│   └── utils.js            ← IntersectionObserver, année copyright
│
└── assets/
    ├── images/             ← Mettre ici les photos (WebP recommandé)
    └── icons/              ← Favicon et icônes SVG
```

## Checklist avant mise en ligne

- [ ] Remplacer les zones de photos placeholder par de vraies images
- [ ] Mettre à jour les liens Facebook / Instagram avec les vraies URLs
- [ ] Remplacer `contact@quelpain.be` et `commandes@quelpain.be` par les vraies adresses
- [ ] Ajouter un favicon (`assets/icons/favicon.ico`, `favicon.svg`)
- [ ] Activer HSTS dans `.htaccess` après vérification HTTPS
- [ ] Mettre à jour le lien canonical dans `<head>`
- [ ] Créer les pages `/mentions-legales`, `/confidentialite`, `/cgv`
- [ ] Tester avec: https://validator.w3.org et https://wave.webaim.org

## Sécurité

- Content Security Policy (CSP) active
- X-Frame-Options DENY (protection clickjacking)
- X-Content-Type-Options nosniff
- HTTPS forcé via redirection 301
- Pas de scripts tiers non maîtrisés
- Pas de formulaires sans protection CSRF
- Aucun accès aux fichiers cachés

## Accessibilité (WCAG 2.1 AA)

- Skip link "Aller au contenu principal"
- Landmark roles (header, main, footer, nav)
- Tous les boutons ont des aria-label
- Onglets conformes WAI-ARIA (navigation clavier complète)
- Images décoratives avec aria-hidden="true"
- Tableaux d'horaires avec scope="row"
- Contraste couleur vérifié (ratio ≥ 4.5:1)
- Respect de prefers-reduced-motion
- Focus visible pour navigation clavier
