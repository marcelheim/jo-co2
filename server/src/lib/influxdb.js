import { InfluxDB, Point } from '@influxdata/influxdb-client'

const write = async (dataClientId, data) => {
    const {
        INFLUXDB_ORG,
        INFLUXDB_BUCKET,
        INFLUXDB_ADMIN_TOKEN,
        INFLUXDB_URL
    } = process.env

    const writeApi = new InfluxDB({
        url: INFLUXDB_URL,
        token: INFLUXDB_ADMIN_TOKEN
    }).getWriteApi(INFLUXDB_ORG, INFLUXDB_BUCKET, 's') 

    writeApi.useDefaultTags(dataClientId)

    const dataPoints = []

    if(data.co2 != null)  dataPoints.push(new Point('co2')
        .uintField('value', data.co2.value)
        .stringField('unit', data.co2.unit))
    if(data.temperature != null)  dataPoints.push(new Point('temperature')
        .uintField('value', data.temperature.value)
        .stringField('unit', data.temperature.unit))
    if(data.humidity != null)  dataPoints.push(new Point('humidity')
        .uintField('value', data.humidity.value)
        .stringField('unit', data.humidity.unit))

    writeApi.writePoints(dataPoints)

    writeApi
        .close()
        .catch(e => {
            console.error(e)
        })
}


const read = async (dataClientId) => {
    const {
        INFLUXDB_ORG,
        INFLUXDB_BUCKET,
        INFLUXDB_ADMIN_TOKEN,
        INFLUXDB_URL
    } = process.env

    const queryApi = new InfluxDB({
        url: INFLUXDB_URL,
        token: INFLUXDB_ADMIN_TOKEN
    }).getQueryApi(INFLUXDB_ORG)

    const fluxQuery = `from(bucket: "${INFLUXDB_BUCKET}")
        |> range(start: -3h)
        |> filter(fn: (r) => r["0"] == "${dataClientId}")
        |> filter(fn: (r) => r["_field"] == "value")`

    let data = {}

    const fluxObserver = {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            if(!data[o._time]) data[o._time] = {}
            data[o._time][o._measurement] = o._value
        },
        error(error) {
            console.error(error)
            console.log('\nFinished ERROR')
        },
        complete() {
            console.log('\nFinished SUCCESS')
            console.log(data)
        }
    }

    queryApi.queryRows(fluxQuery, fluxObserver)
}

export {read, write}
