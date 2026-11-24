/* blog.js — blog: przycisk Copy przy blokach kodu i pasek postępu czytania. */

(function(){
  var status = document.getElementById('copyStatus');
  function announce(msg){
    if(!status) return;
    status.textContent = '';
    window.setTimeout(function(){ status.textContent = msg; }, 20);
  }
  function fallbackCopy(text){
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    return ok;
  }
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var pre = document.getElementById(btn.getAttribute('data-target'));
      if(!pre) return;
      var text = pre.textContent;
      var original = btn.textContent;
      function done(ok){
        btn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
        announce(ok ? 'Copied to clipboard' : 'Could not copy automatically');
        window.setTimeout(function(){ btn.textContent = original; }, 2000);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ done(true); }, function(){ done(fallbackCopy(text)); });
      } else {
        done(fallbackCopy(text));
      }
    });
  });
})();

(function(){
  var bar = document.getElementById('progress');
  var article = document.getElementById('article');
  if(!bar || !article) return;
  var ticking = false;
  function update(){
    var rect = article.getBoundingClientRect();
    var total = article.offsetHeight - window.innerHeight * 0.6;
    var done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    bar.style.transform = 'scaleX(' + (total > 0 ? done / total : 0) + ')';
    ticking = false;
  }
  function onScroll(){
    if(!ticking){ ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

(function(){
  var btn = document.getElementById('copyLink');
  var status = document.getElementById('copyStatus');
  if(!btn) return;
  function fallback(text){
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    return ok;
  }
  btn.addEventListener('click', function(){
    var url = window.location.href.split('#')[0];
    var original = btn.textContent;
    function done(ok){
      btn.textContent = ok ? 'Link copied' : 'Press Ctrl+C';
      if(status){ status.textContent = ''; window.setTimeout(function(){ status.textContent = ok ? 'Link copied to clipboard' : 'Could not copy automatically'; }, 20); }
      window.setTimeout(function(){ btn.textContent = original; }, 2000);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){ done(true); }, function(){ done(fallback(url)); });
    } else { done(fallback(url)); }
  });
})();
