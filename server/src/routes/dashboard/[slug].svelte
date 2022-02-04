<script context="module">
    export async function preload(page, session) {
        const { slug } = page.params;

        const res = await this.fetch(`api/sensordata/${slug}`);
        const sensordata = await res.json();

        let tempValues = [];
        let co2Values = [];
        let humidityValues = [];
        //console.log(sensordata)

        //Key ist der Zeitstempel
        for (var key in sensordata) {
            if (sensordata.hasOwnProperty(key)) {
                //Hier Daten in verständliches Format für Chart.js umwandeln
                var date = new Date(key);
                tempValues.push({ x: date.toLocaleString(), y: sensordata[key].temperature });
                co2Values.push({ x: date.toLocaleString(), y: sensordata[key].co2 });
                humidityValues.push({ x: date.toLocaleString(), y: sensordata[key].humidity });
            }
        }

        return { slug, tempValues, co2Values, humidityValues };
    }
</script>

<script>
    export let slug, tempValues, co2Values, humidityValues;
    import { Chart, registerables } from "chart.js";
    //import annotationPlugin from 'chartjs-plugin-annotation';
    import "chartjs-adapter-moment";
    import { onMount } from "svelte";
    import InPlaceEdit from "../../components/InPlaceEdit.svelte";
    let sensorname = "Sensor 1"

    Chart.register(...registerables);


    let chartCanvasTemp, chartCanvasCO2, chartCanvasHumidity;

    onMount(async (promise) => {
        const colors = {
            purple: {
                default: "rgba(149, 76, 233, 1)",
                half: "rgba(149, 76, 233, 0.5)",
                quarter: "rgba(149, 76, 233, 0.25)",
                zero: "rgba(149, 76, 233, 0.25)",
            },
            blue: {
                default: "rgba(73, 112, 233, 1)",
                half: "rgba(73, 112, 233, 0.5)",
                quarter: "rgba(73, 112, 233, 0.25)",
                zero: "rgba(73, 112, 233, 0.25)",
            },
            green: {
                default: "rgba(5, 185, 23, 1)",
                half: "rgba(5, 185, 23, 0.5)",
                quarter: "rgba(5, 185, 23, 0.25)",
                zero: "rgba(5, 185, 23, 0.10)",
            },
            indigo: {
                default: "rgba(80, 102, 120, 1)",
                quarter: "rgba(80, 102, 120, 0.25)",
            },
        };

        var options = {
                layout: {
                    padding: 10,
                },
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            type: "timeseries",
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 15,
                                minRotation: 15,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                padding: 10,
                            },
                            gridLines: {
                                display: true,
                                color: colors.indigo.quarter,
                            },
                        },
                    ],
                },
                plugins: {
                    autocolors: false,
                    annotation: {
                        annotations: [{
                            line1: {
                            type: 'line',
                            scaleID: 'y-axis-0',
                            yMin: 15.000,
                            yMax: 15.000,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                            }
                        }]
                    },
                },
            };

        var ctx = chartCanvasTemp.getContext("2d");
        let gradient = ctx.createLinearGradient(0, 25, 0, 300);
        gradient.addColorStop(0, colors.green.half);
        gradient.addColorStop(0.35, colors.green.quarter);
        gradient.addColorStop(1, colors.green.zero);

        var chartTemp = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Temperatur in °C",
                        fill: true,
                        backgroundColor: gradient,
                        pointBackgroundColor: colors.green.default,
                        borderColor: colors.green.default,
                        data: tempValues,
                        lineTension: 0.2,
                        borderWidth: 2,
                        pointRadius: 3,
                    },
                ],
            },
        });

        gradient = ctx.createLinearGradient(0, 25, 0, 300);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.35, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        ctx = chartCanvasCO2.getContext("2d");
        var chartCO2 = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "CO2 (ppm)",
                        fill: true,
                        backgroundColor: gradient,
                        pointBackgroundColor: colors.purple.default,
                        borderColor: colors.purple.default,
                        data: co2Values,
                        lineTension: 0.2,
                        borderWidth: 2,
                        pointRadius: 3,
                    },
                ],
            },
            options: {
                layout: {
                    padding: 10,
                },
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 15,
                                minRotation: 15,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                padding: 10,
                            },
                            gridLines: {
                                display: true,
                                color: colors.indigo.quarter,
                            },
                        },
                    ],
                },
            },
        });

        gradient = ctx.createLinearGradient(0, 25, 0, 300);
        gradient.addColorStop(0, colors.blue.half);
        gradient.addColorStop(0.35, colors.blue.quarter);
        gradient.addColorStop(1, colors.blue.zero);

        ctx = chartCanvasHumidity.getContext("2d");
        var chartHumidity = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Humidity in %",
                        fill: true,
                        backgroundColor: gradient,
                        pointBackgroundColor: colors.blue.default,
                        borderColor: colors.blue.default,
                        data: humidityValues,
                        lineTension: 0.2,
                        borderWidth: 2,
                        pointRadius: 3,
                    },
                ],
            },
            options: {
                layout: {
                    padding: 10,
                },
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 15,
                                minRotation: 15,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                padding: 10,
                            },
                            gridLines: {
                                display: true,
                                color: colors.indigo.quarter,
                            },
                        },
                    ],
                },
            },
        });
    });

</script>

<div class="flex justify-center m-12">
   <div class="self-center w-full max-w-sm">
        <div class="flex justify-center mb-6">
            <h1 class="text-3xl font-bold">
                <InPlaceEdit bind:value={sensorname}/>
            </h1>
        </div>
            
        <div class="flex justify-center mb-6">
            <label class="text-gray-500 font-bold">
                <input class="mr-2 leading-tight" type="checkbox">
                <span class="text-sm">
                Send E-Mail
                </span>
            </label>
        </div>
    </div>
</div>


<div class="flex justify-center m-12">
    <div class="chart-container w-2/3 m-4">
        <canvas bind:this={chartCanvasTemp} id="my-chart" />
    </div>
    <form class="self-center w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Threshold
                </label>
            </div>
            <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="0">
            </div>
        </div>
    </form>
</div>

<div class="flex justify-center m-12">
    <div class="chart-container w-2/3 m-4">
        <canvas bind:this={chartCanvasCO2} id="my-chart" />
    </div>
    <form class="self-center w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Threshold
                </label>
            </div>
            <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="0">
            </div>
        </div>
    </form>
</div>

<div class="flex justify-center m-12">
    <div class="chart-container w-2/3 m-4">
        <canvas bind:this={chartCanvasHumidity} id="my-chart" />
    </div>
    <form class="self-center w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Threshold
                </label>
            </div>
            <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="0">
            </div>
        </div>
    </form>
</div>