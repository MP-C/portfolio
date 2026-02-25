/**
 * utils.js — Quel Pain
 * Utility functions:
 * - Scroll reveal via IntersectionObserver
 * - Dynamic copyright year (fallback if nav.js not loaded)
 */

(function () {
  'use strict';

  /* ── Scroll reveal ── */
  function initReveal() {
    // Only if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Copyright year (safety net) ── */
  function initYear() {
    var yearEl = document.getElementById('year');
    if (yearEl && !yearEl.textContent) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initYear();
  });
}());
