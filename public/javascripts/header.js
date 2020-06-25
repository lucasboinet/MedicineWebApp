var menuBtn = document.getElementById("menu_icon");
var menu = document.getElementById("menu");
var deployed = false;

menuBtn.addEventListener('click', () => {
    if(deployed){
        menu.style.opacity = "0";
        menu.style.height = "0";
        menuBtn.style.transform = "rotateZ(0deg)";
    }else {
        menu.style.opacity = "1";
        menu.style.height = "calc(100% - 66px)";
        menuBtn.style.transform = "rotateZ(180deg)";
    }
    deployed = !deployed;
})