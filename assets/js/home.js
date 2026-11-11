/* OD International — homepage motion: scroll reveals and number count-up */
(function () {
  var d = document, root = d.documentElement;
  window.__hm = 1;
  if (!root.classList.contains('js-motion')) return;
  function each(sel, fn) { Array.prototype.forEach.call(d.querySelectorAll(sel), fn); }

  // Reveal elements as they scroll into view
  var io = new IntersectionObserver(function (entries) {
    var n = 0;
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target.__hmTarget || e.target;
      if (/hm-(sl|pop|grow)\b/.test(el.getAttribute('class') || '')) { el.style.animationDelay = (n * 90) + 'ms'; n++; }
      el.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  each('.hm-rv,.hm-rv2,.hm-rv3,.hm-sl,.hm-pop', function (el) { io.observe(el); });
  // Elements that start scaled or clipped to nothing are watched through their parent
  each('.hm-grow,.hm-wipe', function (el) { var p = el.parentElement; if (p) { p.__hmTarget = el; io.observe(p); } });

  // Count the headline figures up once
  var figs = d.getElementById('proof-figs');
  if (figs) {
    var nums = figs.querySelectorAll('[data-count]');
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.disconnect();
        var t0 = null, dur = 1800;
        function step(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur), k = 1 - Math.pow(1 - p, 3);
          Array.prototype.forEach.call(nums, function (el) {
            var to = +el.getAttribute('data-count'), from = +(el.getAttribute('data-from') || 0);
            el.textContent = Math.round(from + (to - from) * k);
          });
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    cio.observe(figs);
  }
})();
