document.addEventListener('DOMContentLoaded', function () {
    fetch('texas.json')
        .then(response => response.json())
        .then(texas => {
            renderBarChart(texas);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderBarChart(texas) {
        var categories = {};

        // Membuat objek kategori dan menghitung profit per kategori
        texas.forEach(function (item) {
            // Pastikan bahwa item.Category dan item.Profit ada di dalam data
            if (item.Category && item.Profit) {
                if (!categories[item.Category]) {
                    categories[item.Category] = parseFloat(item.Profit);
                } else {
                    categories[item.Category] += parseFloat(item.Profit);
                }
            }
        });

        // Mengubah objek kategori menjadi array untuk digunakan dalam grafik
        var labels = Object.keys(categories);
        var data = Object.values(categories);

        // Membuat grafik
        var ctx = document.getElementById('barChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Profit per Category',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
