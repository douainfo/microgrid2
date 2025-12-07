// === CHART SETUP ===
let voltageData = [];
let currentData = [];

let voltageChart = new Chart(document.getElementById("voltageChart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Voltage (V)',
      data: voltageData,
      borderColor: 'blue'
    }]
  }
});

let currentChart = new Chart(document.getElementById("currentChart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Current (A)',
      data: currentData,
      borderColor: 'red'
    }]
  }
});

// === LOAD DATA FROM API ===
async function load() {
    let r = await fetch("http://127.0.0.1:5000/api/latest_with_prediction");
    let d = await r.json();

    let t = document.getElementById("t");
    t.innerHTML = "<tr><th>V</th><th>I</th><th>P</th><th>F</th><th>SOC</th><th>Pred</th></tr>";

    d.forEach(x => {
        t.innerHTML += `<tr>
            <td>${x.voltage}</td>
            <td>${x.current}</td>
            <td>${x.power}</td>
            <td>${x.frequency}</td>
            <td>${x.soc_battery}</td>
            <td>${x.predicted_fault}</td>
        </tr>`;
    });

    // === UPDATE CHARTS ===
    let last = d[0];

    voltageChart.data.labels.push("");
    currentChart.data.labels.push("");

    voltageChart.data.datasets[0].data.push(last.voltage);
    currentChart.data.datasets[0].data.push(last.current);

    voltageChart.update();
    currentChart.update();
}

setInterval(load, 3000);
load();
