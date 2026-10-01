(function () {
  var bar = document.querySelector('.progress'), nav = document.getElementById('nav'), spot = document.querySelector('.spotlight');
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    nav.classList.toggle('scrolled', scrollY > 40);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('pointermove', function (e) {
    spot.style.setProperty('--mx', e.clientX + 'px');
    spot.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
  onScroll();
})();
