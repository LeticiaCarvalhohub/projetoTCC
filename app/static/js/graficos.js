window.onload = function () {
  const grafico1 = document.getElementById("chartContainer1").getContext("2d");
  const grafico2 = document.getElementById("chartContainer2").getContext("2d");

  const dados = [];

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();

  const config1 = {
    type: "bar",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Total de Vendas Mensais (R$)",
          data: [1200, 1900, 3000, 2500, 2200, 2800],
          backgroundColor: "rgba(41, 141, 208, 0.6)",
          borderColor: "rgba(123, 202, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const config2 = {
    type: "bar",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Vendas (R$)",
          data: [1200, 1900, 3000, 2500, 2200, 2800],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(grafico1, config1);
  new Chart(grafico2, config2);
};
