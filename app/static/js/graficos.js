window.onload = function () {
  const grafico1 = document.getElementById("chartContainer1").getContext("2d");
  const grafico2 = document.getElementById("chartContainer2").getContext("2d");
  const grafico3 = document.getElementById("chartContainer3").getContext("2d");

  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });

  const config1 = {
    type: "bar",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
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
          text: `Total de Vendas Mensais - ${mesAtual}`,
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
            color: "rgba(31, 59, 115, 0.3)",
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
            color: "rgba(31, 59, 115, 0.3)",
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
          data: [1200, 1900, 3000],
          backgroundColor: [
            "rgba(97, 192, 75, 0.8)",
            "rgba(255, 247, 0, 0.8)",
            "rgba(255, 102, 102, 0.8)",
          ],
          borderColor: [
            "rgba(97, 192, 75, 1)",
            "rgba(255, 247, 0, 1)",
            "rgba(255, 102, 102, 1)",
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
          text: "Situação do estoque em relação ao itens",
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
            color: "rgba(31, 59, 115, 0.3)",
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
            color: "rgba(31, 59, 115, 0.3)",
          },
        },
      },
    },
  };

  const config3 = {
    type: "pie",
    data: {
      labels: ["Linhas", "Tecidos", "Produtos extras"],
      datasets: [
        {
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
          text: "Quantidade de itens no estoque",
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
        datalabels: {
          formatter: (valor, contexto) => {
            let dataset = contexto.chart.data.datasets[0].data;
            let total = dataset.reduce((a, b) => a + b, 0);
            let porcentagem = ((valor / total) * 100).toFixed(1) + "%";
            return porcentagem;
          },
          color: "#fff",
          font: {
            weight: "bold",
            size: 14,
          },
        },
      },
    },
  };

  new Chart(grafico1, config1);
  new Chart(grafico2, config2);
  new Chart(grafico3, config3);
};
