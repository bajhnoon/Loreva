(function () {
  var WA = '966532660059';

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Product filter
  var buttons = document.querySelectorAll('.filter');
  var products = document.querySelectorAll('.product');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      products.forEach(function (p) { p.hidden = !(f === 'all' || p.getAttribute('data-cat') === f); });
    });
  });

  // Per-product WhatsApp message
  products.forEach(function (p) {
    var name = p.querySelector('h3').textContent.trim();
    var link = p.querySelector('.product-link');
    if (link) link.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('مرحبًا لوريفا، أرغب في طلب: ' + name);
  });

  // Order form -> WhatsApp
  var form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = (d.get('name') || '').toString().trim();
      var phone = (d.get('phone') || '').toString().trim();
      if (!name || !phone) {
        (name ? form.phone : form.name).focus();
        return;
      }
      var text = 'طلب جديد من موقع لوريفا\n' +
        'الاسم: ' + name + '\n' +
        'الجوال: ' + phone + '\n' +
        'نوع الطلب: ' + d.get('type') + '\n' +
        'التفاصيل: ' + (d.get('msg') || '-');
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
