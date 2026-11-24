/* site.js — wspólne skrypty całej witryny: menu mobilne i pasek cookies. */

(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

(function(){
  try {
    var choice = localStorage.getItem('dtp_cookie_choice');
    var bar = document.getElementById('cookieBar');
    if (!choice && bar) {
      bar.style.display = 'flex';
    }
    function setChoice(v){
      try { localStorage.setItem('dtp_cookie_choice', v); } catch(e) {}
      if (bar) bar.style.display = 'none';
    }
    var acceptBtn = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) acceptBtn.addEventListener('click', function(){ setChoice('accepted'); });
    if (declineBtn) declineBtn.addEventListener('click', function(){ setChoice('declined'); });
  } catch(e) {}
})();
