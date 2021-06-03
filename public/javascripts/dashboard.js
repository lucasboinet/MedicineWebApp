const tab_btn = document.querySelectorAll(".tab_selector");
const tab = document.querySelectorAll(".tab");

for(let i = 0; i < tab_btn.length; i++){
  tab_btn[i].addEventListener('click', function(){
    for(let j = 0; j < tab.length; j++){
      tab[j].style.display = "none";
      tab_btn[j].classList.remove("active");
    }
    tab[i].style.display = "block";
    tab_btn[i].classList.add("active");
  })
}

const user_bar = document.querySelectorAll('.patient_item');
const user_d = document.querySelectorAll('.patient_details');

for (i = 0; i < user_bar.length; i++) {
  user_bar[i].addEventListener("click", function() {
    this.classList.toggle("opened");
    var panel = this.nextElementSibling;
    panel.classList.toggle("opened");
  });
}

const user_menu = document.getElementById('user_menu');
const user_text = document.getElementById('user_text');
var displayed = false;

user_text.addEventListener('click', function(){
  if(displayed){
    user_menu.style.opacity = "0";
    setTimeout(function(){
      user_menu.style.display = "none";
      displayed = false;
    },50)
  }else {
    user_menu.style.display = "flex";
    setTimeout(function(){
      user_menu.style.opacity = "1";
      displayed = true;
    },10)
  }
})
