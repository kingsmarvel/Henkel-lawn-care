/* =========================================================
   SHARED SCRIPT — Ward's Lawn Care prototype
   Used by every page. Handles: mobile menu toggle, sticky
   header shadow, animated stat counters, footer year.
   Page-specific behaviour (sliders, tabs, lightbox, form
   validation, FAQ accordion) stays in each page's own
   <script> block.
   ========================================================= */

/* --- Mobile menu toggle ------------------------------------ */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');
if (burger && nav){
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  }));
}

/* --- Sticky header shadow once the page scrolls ------------ */
const header = document.getElementById('siteHeader');
if (header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-stuck', window.scrollY > 10);
  });
}

/* --- Animated stat counters ---------------------------------
   Reads data-count for the target and optional data-suffix
   for a trailing character such as % or +. Runs once per
   element, when it scrolls into view.
   ----------------------------------------------------------- */
const counterEls = document.querySelectorAll('[data-count]');
if (counterEls.length){
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.max(1, Math.round(target / 40));
      const tick = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(tick); }
        el.textContent = current + suffix;
      }, 28);
      counterObserver.unobserve(el);
    });
  }, { threshold: .5 });
  counterEls.forEach(c => counterObserver.observe(c));
}

/* --- Footer year --------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
