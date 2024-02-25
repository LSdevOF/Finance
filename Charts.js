document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('financialChart').getContext('2d');

    // Dati di esempio per il grafico
    const data = {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno'],
        datasets: [{
            label: 'Portfolio Valore',
            data: [5000, 6000, 5500, 7000, 6500, 8000],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        }, {
            label: 'Investimenti',
            data: [4000, 4500, 4800, 5500, 6000, 6500],
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
        }]
    };

    // Opzioni del grafico
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Creazione del grafico
    const financialChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // Aggiungi un evento al canvas per trascinare i dati
    ctx.canvas.addEventListener('mousedown', function(event) {
        const points = financialChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (points.length) {
            const index = points[0].index;
            const datasetIndex = points[0].datasetIndex;
            const dataset = financialChart.data.datasets[datasetIndex];
            const value = dataset.data[index];
            const rect = ctx.canvas.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            // Aggiorna i dati del grafico durante il trascinamento
            ctx.canvas.addEventListener('mousemove', moveHandler);
            ctx.canvas.addEventListener('mouseup', function() {
                ctx.canvas.removeEventListener('mousemove', moveHandler);
            });

            function moveHandler(event) {
                const offsetXNew = event.clientX - rect.left;
                const offsetYNew = event.clientY - rect.top;
                const deltaX = offsetXNew - offsetX;
                const deltaY = offsetYNew - offsetY;

                // Calcola il nuovo valore in base al movimento del mouse
                const newValue = financialChart.scales.y.getValueForPixel(offsetY - deltaY);
                
                // Aggiorna il valore del punto nel dataset
                dataset.data[index] = newValue;
                
                // Ridisegna il grafico
                financialChart.update();
            }
        }
    });
});
