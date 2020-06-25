let landing = document.getElementById('landing');
let power = 6;

window.addEventListener('scroll', function(e){
  let scrollPos = window.scrollY;
  landing.style.backgroundSize = 100 + (scrollPos / power) + "%";
})
