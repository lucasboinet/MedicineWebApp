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

$(document).ready(function(){
  $.ajax({
    url: "/api/suivi/income",
    method: "GET",
    success: function(data) {
      var totalMonthIncomeThisYear = [0,0,0,0,0,0,0,0,0,0,0,0];
      var totalMonthIncomeLastYear = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(var i = 0; i < data.length; i++) {
        var today = new Date(data[i].updated_at);
        switch(today.getMonth()){
          case 0:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[0] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[0] += data[i].montant;
            }
            break;
          case 1:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[1] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[1] += data[i].montant;
            }
            break;
          case 2:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[2] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[2] += data[i].montant;
            }
            break;
          case 3:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[3] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[3] += data[i].montant;
            }
            break;
          case 4:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[4] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[4] += data[i].montant;
            }
            break;
          case 5:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[5] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[5] += data[i].montant;
            }
            break;
          case 6:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[6] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[6] += data[i].montant;
            }
            break;
          case 7:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[7] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[7] += data[i].montant;
            }
            break;
          case 8:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[8] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[8] += data[i].montant;
            }
            break;
          case 9:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[9] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[9] += data[i].montant;
            }
            break;
          case 10:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[10] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[10] += data[i].montant;
            }
            break;
          case 11:
            if(today.getFullYear() == new Date().getFullYear()){
              totalMonthIncomeThisYear[11] += data[i].montant;
            }else {
              totalMonthIncomeLastYear[11] += data[i].montant;
            }
            break;
        }
      }
  var incomeCfg = {
      type: 'line',
      data: {
        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        datasets: [
          {
            label: 'This year (' + new Date().getFullYear()+')',
            data: totalMonthIncomeThisYear,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Last year (' + (new Date().getFullYear() - 1) +')',
            data: totalMonthIncomeLastYear,
            backgroundColor: 'rgba(29, 209, 161, 0.2)',
            borderColor: 'rgba(29, 209, 161, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
  var ctx = document.getElementsByClassName('incomeChart')[0].getContext('2d');
  var myChart = new Chart(ctx, incomeCfg);
  var ctx2 = document.getElementsByClassName('incomeChart')[1].getContext('2d');
  var myChart2 = new Chart(ctx2, incomeCfg);
    }
});

$.ajax({
  url: "/api/patient/gender",
  method: "GET",
  success: function(data) {
    var genderRep = [0,0];
    for(var i = 0; i < data.length; i++){
      switch(data[i].sexe){
        case 'F':
          genderRep[1] += 1;
          break;
        case 'H':
          genderRep[0] += 1;
          break;
      }
    }
    var genderCfg = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: genderRep,
            backgroundColor: [
              '#54a0ff',
              '#ff9ff3'
            ]
          }],
          labels: [
            'Men',
            'Women'
          ]
        },
        options: {
          legend: {
            position: 'top',
          },
          title: {
            display: false
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
  }
    var ctxg = document.getElementsByClassName('genderChart')[0].getContext('2d');
    var ctxg2 = document.getElementsByClassName('genderChart')[1].getContext('2d');
    var genderChart = new Chart(ctxg, genderCfg);
    var genderChart2 = new Chart(ctxg2, genderCfg);

}
});
});
