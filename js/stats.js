import { Chart } from "chart.js/auto";

(async function () {
  const data = [
    { month: "JAN", googleUsage: 3000, myCloudUsage: 10000 },
    { month: "FEB", googleUsage: 13000, myCloudUsage: 20000 },
    { month: "MAR", googleUsage: 16000, myCloudUsage: 23000 },
    { month: "APR", googleUsage: 19000, myCloudUsage: 14000 },
    { month: "MAY", googleUsage: 16000, myCloudUsage: 12000 },
    { month: "JUN", googleUsage: 7000, myCloudUsage: 10000 },
  ];

  function formatYAxisTick(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + "k";
    }
    return value;
  }

  var imgGoogle = new Image();
  imgGoogle.src = "/google-pattern.png";
  imgGoogle.onload = function () {
    const ctx = document.getElementById("stats").getContext("2d");
    var patternGoogle = ctx.createPattern(imgGoogle, "repeat-x");

    var imgMyCloud = new Image();
    imgMyCloud.src = "/mycloud-pattern.png";
    imgMyCloud.onload = function () {
      var patternMyCloud = ctx.createPattern(imgMyCloud, "repeat-x");

      const dataForChart = {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            label: "Google Cloud Storage",
            backgroundColor: patternGoogle,
            data: data.map((entry) => entry.googleUsage),
            maxBarThickness: 20,
            minBarLength: 10,
            box: [0, 1, 2, 3, 4, 5],
          },
          {
            label: "My Cloud Cloud Storage",
            backgroundColor: patternMyCloud,
            data: data.map((entry) => entry.myCloudUsage),
            maxBarThickness: 20,
            minBarLength: 10,
            box: [0, 1, 2, 3, 4, 5],
          },
        ],
      };

      const barTopImg = new Image();
      barTopImg.src = "/bar-top.png";

      const barAvatar = {
        id: "barAvatar",
        afterDatasetDraw: (chart, args, options) => {
          const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
            scales: { x, y },
          } = chart;

          ctx.save();

          const barHeight = chart.getDatasetMeta(0).data[1].height;

          dataForChart.datasets[0].box.forEach((datapoint) => {
            ctx.drawImage(
              barTopImg,
              chart.getDatasetMeta(0).data[datapoint].x - 11,
              chart.getDatasetMeta(0).data[datapoint].y - 2,
              22,
              22,
            );
          });

          dataForChart.datasets[1].box.forEach((datapoint) => {
            ctx.drawImage(
              barTopImg,
              chart.getDatasetMeta(1).data[datapoint].x - 11,
              chart.getDatasetMeta(1).data[datapoint].y - 2,
              22,
              22,
            );
          });
        },
      };

      const options = {
        responsive: true,
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false,
            },
            ticks: {
              color: "#808080",
              font: {
                size: 10,
                weight: 600,
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grace: "5%",
            grid: {
              display: false,
            },
            ticks: {
              callback: formatYAxisTick,
              color: "#808080",
              font: {
                size: 10,
                weight: 600,
              },
            },
            border: {
              display: false,
            },
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
            borderRadius: 5,
            borderSkipped: false,
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 10,
                weight: 600,
              },
            },
          },
        },
      };

      const myChart = new Chart(ctx, {
        type: "bar",
        data: dataForChart,
        options: options,
      });

      Chart.register({
        ...barAvatar,
      });
    };
  };
})();
