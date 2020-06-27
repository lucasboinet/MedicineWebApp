var tab_btn = document.querySelectorAll(".tab_selector");
var tab = document.querySelectorAll(".tab");

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
