// JM Power Green — site scripts
(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('.dd > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // Back to top
  var top = document.querySelector('.to-top');
  window.addEventListener('scroll', function () {
    if (top) top.classList.toggle('show', window.scrollY > 500);
  });
  if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Product filter
  var btns = document.querySelectorAll('.filter button');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      btns.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.getAttribute('data-f');
      document.querySelectorAll('.product').forEach(function (p) {
        p.style.display = (f === 'all' || p.getAttribute('data-type') === f) ? '' : 'none';
      });
    });
  });

  // Form status message (?sent=1 / ?sent=0 after PHP redirect)
  var params = new URLSearchParams(window.location.search);
  var msg = document.querySelector('.form-msg');
  if (msg && params.has('sent')) {
    var hi = document.documentElement.lang === 'hi';
    if (params.get('sent') === '1') {
      msg.className = 'form-msg ok';
      msg.textContent = hi ? 'धन्यवाद! आपका संदेश भेज दिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।'
                           : 'Thank you! Your message has been sent. Our team will contact you shortly.';
    } else {
      msg.className = 'form-msg err';
      msg.textContent = hi ? 'माफ़ कीजिए, कुछ गड़बड़ हो गई। कृपया +91 89360 91188 पर कॉल या WhatsApp करें।'
                           : 'Sorry, something went wrong. Please call or WhatsApp us at +91 89360 91188.';
    }
    msg.scrollIntoView({ block: 'center' });
  }

  // Year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
