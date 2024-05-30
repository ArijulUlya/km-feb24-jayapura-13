document.addEventListener('DOMContentLoaded', function () {
    fetch('quantity.json')
        .then(response => response.json())
        .then(data => {
            renderQuantityChart(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderQuantityChart(data) {
        var years = data.map(item => item.Year);
        var quantities = data.map(item => parseFloat(item.Total_Quantity));

        var ctx = document.getElementById('quantityChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Quantity per Year',
                    data: quantities,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
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
