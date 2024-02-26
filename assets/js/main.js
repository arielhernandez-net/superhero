const API_KEY = "4905856019427443/"
const BASE_URL = "https://fixcors.site/https://www.superheroapi.com/api/"+API_KEY;
let chart;

window.onload = function() {
    chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      exportEnabled: false,
      animationEnabled: true,
      title: {
        text: "",
        fontSize: 24,
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}%",
        dataPoints: [],
      }],
    });
    chart.render();
  }

  function handleButtonClick(e) {
    e.preventDefault();
    
    const inputValue = $("#buscar").val();
    const numero = parseInt(inputValue);
    
    if (isNaN(numero)) {
        alert("Por favor, ingresa solo números.");
        return;
    }

    if (numero < 1 || numero > 731) {
        alert("Por favor, ingresa un número entre 1 y 731.");
    } else {

      $("#loader").removeAttr("hidden");
      
      $.ajax({
        type: "GET",
        url: BASE_URL + inputValue,
        success: function (result) {

          $("#main").hide();
          $("#results").removeAttr("hidden");
          $(".rounded-start").attr("src", result.image.url);
          $(".rounded-start").attr("alt", result.name);
          $(".card-title").html("<b>Nombre</b>: " + result.name);
          $(".card-text-1").html("<b>Conexiones</b>: " + result.connections["group-affiliation"]);
          $(".card-text-2").html("<b>Ocupacion</b>: " + result.work["occupation"]);
          $("#desc1").html("<b>1° Aparicion</b>: " + result.biography["first-appearance"]);
          $("#desc2").html("<b>Altura</b>: " + result.appearance["height"][1]);
          $("#desc3").html("<b>Peso</b>: " + result.appearance["weight"][1]);
          $("#desc4").html("<b>Publicado Por</b>: " + result.biography.publisher);
          $("#loader").hide();
  
          const aliases = result.biography.aliases;
            const aliasList = $("<ul></ul>");
            aliases.forEach(function(alias) {
              const listItem = $("<li></li>").text(alias);
              aliasList.append(listItem);
            });
            $("#aliases-container").html(aliasList);
  
            const powerstats = result.powerstats;
            const powerstatNames = Object.keys(powerstats);
            const powerstatValues = Object.values(powerstats);
            const dataPoints = powerstatNames.map((name, index) => ({ label: name, y: powerstatValues[index] }));
  
            chart.options.data[0].dataPoints = dataPoints;
            chart.options.title.text = "Estadísticas de poder de: " + result.name;
            chart.render();
        },
        error: function (result) {
          alert("Error");
        },
      });
    }
}

$("button").click(handleButtonClick);

  