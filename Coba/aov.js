document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from local JSON file
    fetch('aov.json')
        .then(response => response.json())
        .then(data => {
            renderBarChart(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderBarChart(data) {
        // Extracting labels and AOV values from the data
        var labels = data.map(item => item.Sub_Category);
        var aovValues = data.map(item => parseFloat(item.AOV));

        var ctx = document.getElementById('barChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Order Value (AOV)',
                    data: aovValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
