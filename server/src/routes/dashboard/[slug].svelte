<script context="module">
    export async function preload(page, session) {
		const { slug } = page.params;
		return { slug };
	}
</script>

<script>
    export let slug
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    
    Chart.register(...registerables);

    let tempValues = [20, 10, 5, 2, 20, 30, 45];
    let co2Values = [22, 12, 3, 4, 10, 40, 20];
    let chartLabels = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli'];
    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        const ctx = chartCanvas.getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Temperatur',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: tempValues
                    },
                    {
                        label: 'CO2',
                        backgroundColor: 'rgb(0, 99, 132)',
                        borderColor: 'rgb(0, 99, 132)',
                        data: co2Values
                    },]
                },
            
        });
    });
</script>

<div class="flex justify-center">
    <div class="chart-container w-2/3">
        <canvas bind:this={chartCanvas} id="my-chart"></canvas>
    </div>
</div>