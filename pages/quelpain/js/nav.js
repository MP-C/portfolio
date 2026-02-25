/**
 * nav.js — Quel Pain
 * - Scroll-based nav style change
 * - Mobile burger menu (accessible)
 * - Active section highlighting
 */

(function () {
  'use strict';

  var nav, burger, navLinks, lastScrollY;

  function init() {
    nav       = document.querySelector('.nav');
    burger    = document.querySelector('.nav__burger');
    navLinks  = document.querySelector('.nav__links');
    lastScrollY = window.scrollY;

    if (!nav) return;

    // Scroll effect
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile burger
    if (burger && navLinks) {
      burger.addEventListener('click', toggleMenu);

      // Close menu on link click (mobile)
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });

      // Close menu on outside click
      document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('nav__links--open') &&
            !nav.contains(e.target)) {
          closeMenu();
        }
      });

      // Close menu on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeMenu(); }
      });
    }

    // Set year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
  }

  function onScroll() {
    var scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScrollY = scrollY;
  }

  function toggleMenu() {
    var isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu de navigation');
    navLinks.classList.add('nav__links--open');
    // Move focus to first link
    var firstLink = navLinks.querySelector('a');
    if (firstLink) { firstLink.focus(); }
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    navLinks.classList.remove('nav__links--open');
  }

  document.addEventListener('DOMContentLoaded', init);
}());
