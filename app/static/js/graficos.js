window.onload = function () {
  const grafico1 = document.getElementById("chartContainer1").getContext("2d");
  const grafico2 = document.getElementById("chartContainer2").getContext("2d");

  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });

  const config1 = {
    type: "bar",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: `Total de Vendas - ${mesAtual}`,
          data: [1200, 1900, 2200, 2800],
          backgroundColor: [
            "rgba(54, 162, 235, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(0, 128, 255, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(0, 128, 255, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      plugins: {
        title: {
          display: true,
          text: `Total de Vendas - ${mesAtual}`,
          font: {
            size: 18,
          },
        },
        legend: {
          labels: {
            font: {
              size: 16,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#1f3b73",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "rgba(31, 59, 115, 0.6)", // linhas de grade azuladas
          },
        },
        x: {
          ticks: {
            color: "#1f3b73",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "rgba(31, 59, 115, 0.6)", // linhas de grade azuladas
          },
        },
      },
    },
  };

  const config2 = {
    type: "bar",
    data: {
      labels: ["Em estoque", "Baixo estoque", "Não esta em estoque"],
      datasets: [
        {
          label: `Total de produtos em estoque`,
          data: [1200, 1900, 3000],
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(0, 128, 255, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(0, 128, 255, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      plugins: {
        title: {
          display: true,
          text: `Total de vendas mensais - ${mesAtual}`,
          font: {
            size: 18,
          },
        },
        legend: {
          labels: {
            font: {
              size: 16,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#1f3b73",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "rgba(31, 59, 115, 0.6)", // linhas de grade azuladas
          },
        },
        x: {
          ticks: {
            color: "#1f3b73",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "rgba(31, 59, 115, 0.6)", // linhas de grade azuladas
          },
        },
      },
    },
  };

  new Chart(grafico1, config1);
  new Chart(grafico2, config2);
};
