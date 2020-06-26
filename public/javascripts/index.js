let landing = document.getElementById('landing');
let power = 6;

window.addEventListener('scroll', function(e){
  let scrollPos = window.scrollY;
  landing.style.backgroundSize = 100 + (scrollPos / power) + "%";
})

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    center: true,
    items:1,
    loop:true,
    autoplay:true,
    dots: true,
    autoplayTimeout:4000,
    autoplayHoverPause:false
  });
});
