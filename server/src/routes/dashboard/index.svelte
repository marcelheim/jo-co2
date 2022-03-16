<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`api/sensordata`);
        const sensordata = await res.json();

    let sensors = [];

    console.log(page)

    for (var key in sensordata) {
      if (sensordata.hasOwnProperty(key)) {

        const sensorConfig = await (await this.fetch(`api/config/client/${key}`)).json()
        let name = `Sensor ${key}`

        if(sensorConfig && sensorConfig.name) name = sensorConfig.name;

        sensors.push({
          id: key,
          data: {
            ...sensordata[key],
            name: name
          }
        })
      }
    }

    return { sensors };
  }
</script>

<script>
  export let sensors;
</script>

<div class="flex flex-col p-10">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-15 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperatur
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CO2
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Luftfeuchtigkeit
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
             {#each sensors as sensor}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap flex items-center">
                    <div class="text-sm font-medium text-gray-900">{sensor.id}</div>
                </td>
                
                <td class="px-15 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{sensor.data.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{Math.round(sensor.data.temperature * 100 + Number.EPSILON) / 100} °C</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{sensor.data.co2} ppm</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{Math.round(sensor.data.humidity * 100 + Number.EPSILON) / 100} %</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="dashboard/{sensor.id}" class="text-indigo-600 hover:text-indigo-900">Anzeigen</a>
                </td>
              </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>



