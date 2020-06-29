/*$(document).ready(function(){
  $.ajax({
    url: "/api/suivi/income",
    method: "GET",
    success: function(data) {
      var totalMonthIncomeThisYear = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(var i = 0; i < data.length; i++) {
        var today = new Date(data[i].updated_at);

      }

  var ctx = document.getElementById('incomeChart').getContext('2d');
  var myChart = new Chart(ctx, {
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
      });
    }
});
});*/
