document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from local JSON file
    fetch('salespercus.json')
        .then(response => response.json())
        .then(data => {
            // Aggregate total sales for each customer ID
            var aggregatedData = aggregateSales(data);
            // Sort the aggregated data based on total sales in descending order
            aggregatedData.sort((a, b) => b.totalSales - a.totalSales);
            // Select the top 5 entries
            var top5Data = aggregatedData.slice(0, 5);
            renderBarChart(top5Data);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to aggregate total sales for each customer ID
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
        // Convert aggregated data to array format
        return Object.keys(aggregatedData).map(customerID => ({
            Customer_ID: customerID,
            totalSales: aggregatedData[customerID]
        }));
    }

    function renderBarChart(data) {
        // Extracting customer IDs and total sales from the data
        var customerIDs = data.map(item => item.Customer_ID);
        var totalSales = data.map(item => item.totalSales);

        var ctx = document.getElementById('salesChart').getContext('2d');
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
