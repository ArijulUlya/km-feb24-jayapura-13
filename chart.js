// AOV
document.addEventListener('DOMContentLoaded', function () {
    fetch('aov.json')
        .then(response => response.json())
        .then(data => {
            renderaov(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderaov(data) {
        var labels = data.map(item => item.Sub_Category);
        var aovValues = data.map(item => parseFloat(item.AOV));

        var ctx = document.getElementById('aov').getContext('2d');
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

// CustomerGrowth
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


    // CustomerRetention
    document.addEventListener('DOMContentLoaded', function () {
        fetch('customerretention.json')
            .then(response => response.json())
            .then(data => {
                rendercustomerretention(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function rendercustomerretention(data) {
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
    
            var ctx = document.getElementById('customerretention').getContext('2d');
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

    
    // profit
    document.addEventListener('DOMContentLoaded', function () {
        fetch('texas.json')
            .then(response => response.json())
            .then(texas => {
                renderprofit(texas);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderprofit(texas) {
            var categories = {};
            texas.forEach(function (item) {
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
            var ctx = document.getElementById('profit').getContext('2d');
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

    
    // sales per customer
    document.addEventListener('DOMContentLoaded', function () {
        // Fetch data from local JSON file
        fetch('salespercus.json')
            .then(response => response.json())
            .then(data => {
                var aggregatedData = aggregateSales(data);
                aggregatedData.sort((a, b) => b.totalSales - a.totalSales);
                var top5Data = aggregatedData.slice(0, 5);
                renderBarChart(top5Data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function aggregateSales(data) {
            var aggregatedData = {};
            data.forEach(item => {
                var customerID = item.Customer_ID;
                var totalSales = parseFloat(item.Total_Sales);
                if (aggregatedData[customerID]) {
                    aggregatedData[customerID] += totalSales;
                } else {
                    aggregatedData[customerID] = totalSales;
                }
            });
            return Object.keys(aggregatedData).map(customerID => ({
                Customer_ID: customerID,
                totalSales: aggregatedData[customerID]
            }));
        }
    
        function renderBarChart(data) {
            var customerIDs = data.map(item => item.Customer_ID);
            var totalSales = data.map(item => item.totalSales);
    
            var ctx = document.getElementById('salespercustomer').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: customerIDs,
                    datasets: [{
                        label: 'Total Sales per Customer',
                        data: totalSales,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Sales'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Customer ID'
                            }
                        }
                    }
                }
            });
        }
    });

    // Quantity
    document.addEventListener('DOMContentLoaded', function () {
        fetch('quantity.json')
            .then(response => response.json())
            .then(data => {
                renderquantity(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderquantity(data) {
            var years = data.map(item => item.Year);
            var quantities = data.map(item => parseFloat(item.Total_Quantity));
    
            var ctx = document.getElementById('quantity').getContext('2d');
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
    

    // Scorecard
    document.addEventListener('DOMContentLoaded', function () {
        fetch('texas.json')
            .then(response => response.json())
            .then(data => {
                renderScoreCard(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderScoreCard(data) {
            var totalOrders = data.length;
            document.getElementById('total-orders').textContent = totalOrders;
        }
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        fetch('texas.json')
            .then(response => response.json())
            .then(data => {
                renderScoreCard(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderScoreCard(data) {
            var totalSales = data.reduce((acc, item) => acc + parseFloat(item.Sales), 0);
            document.getElementById('total-sales').textContent = totalSales.toFixed(2);
        }
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        fetch('texas.json')
            .then(response => response.json())
            .then(data => {
                renderScoreCard(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderScoreCard(data) {
            var totalProfit = data.reduce((acc, item) => acc + parseFloat(item.Profit), 0);
            document.getElementById('total-profit').textContent = totalProfit.toFixed(2);
        }
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        fetch('texas.json')
            .then(response => response.json())
            .then(data => {
                renderScoreCard(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    
        function renderScoreCard(data) {
            // Extract unique customer IDs
            var uniqueCustomerIDs = [...new Set(data.map(item => item.Customer_ID))];
            var totalUniqueCustomers = uniqueCustomerIDs.length;
            document.getElementById('total-unique-customers').textContent = totalUniqueCustomers;
        }
    });
    