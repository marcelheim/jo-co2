<script context="module">
    export async function preload(page, session) {
        const { slug } = page.params;

        const res = await this.fetch(`api/sensordata/${slug}`);
        const sensordata = await res.json();
        
        /* let tempValues = []
        let co2Values = []
        let humidityValues = []
        let chartLabels = [] */

        //Key ist der Zeitstempel
        for (var key in sensordata) {
            if (sensordata.hasOwnProperty(key)) {

                //Hier Daten in verständliches Format für Chart.js umwandeln

                /* var date = new Date(key);
                chartLabels.push(date.toUTCString())
                co2Values.push(sensordata[key].co2)
                humidityValues.push(sensordata[key].humidity)
                tempValues.push(sensordata[key].temperature) */
            }
        }

        
        return { slug };
    }
</script>

<script>
    export let slug
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };
    
    Chart.register(...registerables);

    /* let tempValues = [20, 10, 5, 2, 20, 30, 45];
    let co2Values = [22, 12, 3, 4, 10, 40, 20];
    let humidityValues = [30, 43, 23, 3, 34, 55, 30];
    
    let chartLabels = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli'];

    let chartCanvasTemp, chartCanvasCO2, chartCanvasHumidity;
 */
    onMount(async (promise) => {










        /* var ctx = chartCanvasTemp.getContext('2d');
        var chartTemp = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Temperatur',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: tempValues
                },]
            },   
        });

        ctx = chartCanvasCO2.getContext('2d');
        var chartCO2 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                {
                    label: 'CO2',
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(0, 99, 132)',
                    data: co2Values
                },]
            },   
        });

        ctx = chartCanvasHumidity.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 25, 0, 300);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.35, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const options = {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [
                {
                    label: "Humidity",
                    fill: true,
                    backgroundColor: gradient,
                    pointBackgroundColor: colors.purple.default,
                    borderColor: colors.purple.default,
                    data: humidityValues,
                    lineTension: 0.2,
                    borderWidth: 2,
                    pointRadius: 3
                }
                ]
            },
            options: {
                layout: {
                padding: 10
                },
                responsive: true,
                legend: {
                display: false
                },

                scales: {
                xAxes: [
                    {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        padding: 10,
                        autoSkip: false,
                        maxRotation: 15,
                        minRotation: 15
                    }
                    }
                ],
                yAxes: [
                    {
                    scaleLabel: {
                        display: true,
                        labelString: "Weight in KG",
                        padding: 10
                    },
                    gridLines: {
                        display: true,
                        color: colors.indigo.quarter
                    },
                    ticks: {
                        beginAtZero: false,
                        max: 63,
                        min: 57,
                        padding: 10
                    }
                    }
                ]
                }
            }
        };
        var chartHumidity = new Chart(ctx, options); */
    });
           
</script>

<div class="flex justify-center m-16">
    <div class="chart-container w-2/3 m-16">
        <canvas bind:this={chartCanvasTemp} id="my-chart"></canvas>
    </div>
    <div class="chart-container w-2/3 m-16">
        <canvas bind:this={chartCanvasCO2} id="my-chart"></canvas>
    </div>
</div>

<div class="flex justify-center m-16">
    <div class="chart-container w-2/3">
        <canvas bind:this={chartCanvasHumidity} id="my-chart"></canvas>
    </div>
</div>

