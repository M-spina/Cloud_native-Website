async function renderChart() {
    try {
        const response = await fetch('/statistics/show');
        const data = await response.json();

        updateTotalUsersChart(data.registrationData);
        updateCategoryEventsChart(data.categoryData);

        console.log(data.categoryData)

    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

function updateTotalUsersChart(registrationData) {
    const ctx = document.getElementById('totalUsersChart').getContext('2d');

    const canvas = document.getElementById('totalUsersChart');
    canvas.width = 600; 
    canvas.height = 200;

    registrationData.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));

    //const labels = registrationData.map(entry => entry.registrationDate);
    const labels = registrationData.map(entry => new Date(entry.registrationDate));
    const dataValues = registrationData.map(entry => entry.totalUsers);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Users',
                data: dataValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'quarter',
                        displayFormats: {
                            month: 'MMM yyyy', 
                            quarter: 'MMM yyyy', 
                            year: 'yyyy', 
                        },
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        precision: 0, // Set precision to 0 to display integers
                    },
                },
            },
        },
    });
}

function updateCategoryEventsChart(categoryData) {
    const ctx = document.getElementById('categoryEventsChart').getContext('2d');
  
    const canvas = document.getElementById('categoryEventsChart');
    canvas.width = 400;
    canvas.height = 400;
  
    const labels = categoryData.map(entry => entry.category);
    const dataValues = categoryData.map(entry => entry.count);
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
