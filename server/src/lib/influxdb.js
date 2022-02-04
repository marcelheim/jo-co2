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
        .floatField('value', data.temperature.value)
        .stringField('unit', data.temperature.unit))
    if(data.humidity != null)  dataPoints.push(new Point('humidity')
        .floatField('value', data.humidity.value)
        .stringField('unit', data.humidity.unit))

    writeApi.writePoints(dataPoints)

    writeApi
        .close()
        .catch(e => {
            console.error(e)
        })
}
export {write}
