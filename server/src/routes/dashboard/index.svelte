<script>
	let sensors = [
		{ id: 1, data: {name: 'Wohnzimmer', temperature: 24, co2: 22, humidity: 22.3}},
		{ id: 2, data: {name: 'JK', temperature: 28, co2: 32, humidity: 12.2}},
		{ id: 3, data: {name: 'Schlafzimmer', temperature: 28, co2: 35, humidity: 10.2}}
	];
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
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
                    <div class="text-sm text-gray-900">{sensor.data.temperature} °C</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{sensor.data.co2} ppm</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{sensor.data.humidity} %</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="dashboard/{sensor.id}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
              {/each}
  
              <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>



