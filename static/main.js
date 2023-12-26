var ctx = document.getElementById('myLineChart').getContext('2d');
var myLineChart;

function fetchDataAndUpdateChart() {
    fetch('/fetchdata')
        .then(response => response.json())
        .then(data => {
            var timeLabels = data.map(item => item.time);
            var dataCategory1 = data.map(item => item.sensor);
            var dataCategory2 = data.map(item => item.location);
            var dataCategory3 = data.map(item => item.pm);
            var dataCategory4 = data.map(item => item.situation);

            updateTable(data);
            updateChart(timeLabels, dataCategory1, dataCategory2, dataCategory3, dataCategory4);
        })
        .catch(error => console.error('Error:', error));
}

function updateTable(data) {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        var row = tbody.insertRow();
        var cellId = row.insertCell(0);
        var cellSensor = row.insertCell(1);
        var cellLocation = row.insertCell(2);
        var cellPM = row.insertCell(3);
        var cellSituation = row.insertCell(4);
        var cellTimestamp = row.insertCell(5);

        cellId.textContent = item.id;
        cellSensor.textContent = item.sensor;
        cellLocation.textContent = item.location;
        cellPM.textContent = item.pm;
        cellSituation.textContent = item.situation;
        cellTimestamp.textContent = item.time;
    });
}



function updateChart(timeLabels, dataCategory1, dataCategory2, dataCategory3, dataCategory4) {
    if (myLineChart) {
        myLineChart.destroy();
    }
    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: '#of sensor',
                data: dataCategory1,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }, {
                label: '#of location',
                data: dataCategory2,
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }, {
                label: '#of PM',
                data: dataCategory3,
                fill: false,
                borderColor: 'rgb(255, 206, 86)',
                tension: 0.1
            }, {
                label: '#of situation',
                data: dataCategory4,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 0,
                    suggestedMax: 7000
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}
fetchDataAndUpdateChart();
setInterval(fetchDataAndUpdateChart, 10000);