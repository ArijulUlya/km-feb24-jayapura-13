// document.querySelector('.menu-btn').addEventListener('click', () => document.querySelector('.main-menu').classList.toggle('show'));

document.addEventListener('DOMContentLoaded', () => {
    fetch('texas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            // Process data to extract the required information
            const salesPerYear = {};
            const quantityPerYear = {};
            const customerSales = {};
            const customerGrowth = {};
            const customerRetention = {};
            const aovPerSubCategory = {};

            data.forEach(order => {
                const year = new Date(order.Order_Date).getFullYear();
                const customerId = order.Customer_ID;

                // Sales Per Year
                if (!salesPerYear[year]) salesPerYear[year] = 0;
                salesPerYear[year] += parseFloat(order.Sales);

                // Quantity Per Year
                if (!quantityPerYear[year]) quantityPerYear[year] = 0;
                quantityPerYear[year] += parseFloat(order.Quantity);

                // Customer Sales
                if (!customerSales[customerId]) customerSales[customerId] = 0;
                customerSales[customerId] += parseFloat(order.Sales);

                // Customer Growth - count unique customers per year
                if (!customerGrowth[year]) customerGrowth[year] = new Set();
                customerGrowth[year].add(customerId);

                // Customer Retention - count repeated customers per year
                if (!customerRetention[year]) customerRetention[year] = 0;
                if (year > Math.min(...Object.keys(customerGrowth))) {
                    const previousYear = year - 1;
                    if (customerGrowth[previousYear] && customerGrowth[previousYear].has(customerId)) {
                        customerRetention[year]++;
                    }
                }

                // AOV (Average Order Value) Per Sub-Category
                const subCategory = order.Sub_Category;
                if (!aovPerSubCategory[subCategory]) aovPerSubCategory[subCategory] = { sales: 0, orders: 0 };
                aovPerSubCategory[subCategory].sales += parseFloat(order.Sales);
                aovPerSubCategory[subCategory].orders += 1;
            });

            // Convert Sets to counts for Customer Growth
            for (const year in customerGrowth) {
                customerGrowth[year] = customerGrowth[year].size;
            }

            // Prepare data for AOV Per Sub-Category
            for (const subCategory in aovPerSubCategory) {
                aovPerSubCategory[subCategory] = aovPerSubCategory[subCategory].sales / aovPerSubCategory[subCategory].orders;
            }

            // Function to create a chart
            const createChart = (ctxId, chartLabel, chartData, chartType = 'bar') => {
                const ctx = document.getElementById(ctxId).getContext('2d');
                new Chart(ctx, {
                    type: chartType,
                    data: {
                        labels: Object.keys(chartData),
                        datasets: [{
                            label: chartLabel,
                            data: Object.values(chartData),
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
            };

            // Create charts
            createChart('salesYear', 'Sales Per Year', salesPerYear);
            createChart('QuantityYear', 'Quantity Per Year', quantityPerYear);
            createChart('customerSales', 'Customer Sales', customerSales);
            createChart('customerGrowth', 'Customer Growth', customerGrowth);
            createChart('customerRetention', 'Customer Retention', customerRetention);
            createChart('aovSubcategory', 'AOV Per Sub-Category', aovPerSubCategory);
        })
        .catch(error => {
            console.error('Error loading or processing data:', error);
        });
});
