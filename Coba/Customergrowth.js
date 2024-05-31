// Ambil data dari file JSON lokal
fetch('customergrowth.json')
    .then(response => response.json())
    .then(data => {
        // Data JSON telah dimuat, sekarang buat chart
        const years = data.map(entry => entry.Year);
        const growthPercentage = data.map(entry => parseFloat(entry.Growth_Percentage));

        const ctx = document.getElementById('customerGrowthChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Growth Percentage',
                    data: growthPercentage,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    });
