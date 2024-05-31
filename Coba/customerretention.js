document.addEventListener('DOMContentLoaded', function () {
    fetch('customerretention.json')
        .then(response => response.json())
        .then(data => {
            renderBarChart(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderBarChart(data) {
        var retentionData = {};

        data.forEach(function (item) {
            if (item.order_year && item.customer_type) {
                var year = item.order_year;
                var type = item.customer_type;

                if (!retentionData[year]) {
                    retentionData[year] = {};
                }

                if (!retentionData[year][type]) {
                    retentionData[year][type] = 1;
                } else {
                    retentionData[year][type]++;
                }
            }
        });

        var years = Object.keys(retentionData);
        var customerTypes = ['New Customer', 'Returning Customer']; // Define both customer types
        var typeCounts = {};

        customerTypes.forEach(function (type) {
            typeCounts[type] = years.map(function (year) {
                return retentionData[year][type] || 0;
            });
        });

        var ctx = document.getElementById('barChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: customerTypes.map(function (type) {
                    return {
                        label: type,
                        data: typeCounts[type],
                        backgroundColor: getRandomColor(),
                        borderColor: getRandomColor(),
                        borderWidth: 1
                    };
                })
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

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
