/* OD International — navigation and inquiry forms */
(function () {
  var doc = document;
  var zh = (doc.documentElement.lang || '').indexOf('zh') === 0;

  // Mobile menu
  var toggle = doc.querySelector('.menu-toggle');
  var nav = doc.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Services dropdown
  var groups = doc.querySelectorAll('.nav-group');
  function closeAll(except) {
    groups.forEach(function (g) {
      if (g !== except) {
        g.classList.remove('is-open');
        var b = g.querySelector('.nav-trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  }
  groups.forEach(function (g) {
    var btn = g.querySelector('.nav-trigger');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !g.classList.contains('is-open');
      closeAll(g);
      g.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  doc.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav-group')) closeAll();
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
      }
    }
  });

  // Preselect the service from ?service=
  var svc = new URLSearchParams(location.search).get('service');
  if (svc) {
    var sel = doc.querySelector('select[name="service"]');
    var opt = sel && sel.querySelector('option[value="' + svc.replace(/[^a-z-]/g, '') + '"]');
    if (opt) sel.value = opt.value;
  }

  // Inquiry forms (Formspree)
  var T = zh ? {
    sending: '正在發送…',
    failed: '查詢未能發送。請檢查網絡連線後再試，或直接電郵 info@odinter.com。'
  } : {
    sending: 'Sending your inquiry…',
    failed: 'Your inquiry didn’t send. Check your connection and try again, or email info@odinter.com.'
  };

  doc.querySelectorAll('form[data-inquiry]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return; // let the browser post normally
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (button) button.disabled = true;
      if (status) { status.classList.remove('is-error'); status.textContent = T.sending; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (res.ok) {
            var done = form.parentNode.querySelector('.form-done');
            form.hidden = true;
            if (done) { done.hidden = false; done.setAttribute('tabindex', '-1'); done.focus(); }
            if (window.gtag) { var s = form.querySelector('[name="service"]'); window.gtag('event', 'generate_lead', { form_location: location.pathname, service: s ? s.value : 'unknown' }); }
          } else {
            // Formspree rejected the background request (for example, a captcha is required):
            // hand over to a normal form post so Formspree can complete it on its own page.
            HTMLFormElement.prototype.submit.call(form);
          }
        })
        .catch(function () {
          if (status) { status.classList.add('is-error'); status.textContent = T.failed; }
          if (button) button.disabled = false;
        });
    });
  });
})();
