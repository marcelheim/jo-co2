import { InfluxDB } from '@influxdata/influxdb-client'

const get = async (req, res, next) => {
    if (true) {
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

        //|> filter(fn: (r) => r["0"] == "${slug}")

		const fluxQuery = `from(bucket: "${INFLUXDB_BUCKET}")
			|> range(start: -10m)
			|> filter(fn: (r) => r["_field"] == "value")`
	
		let data = {}
		
		const fluxObserver = {
			next(row, tableMeta) {
				const o = tableMeta.toObject(row)
				if(!data[o["0"]]) data[o["0"]] = {}
				data[o["0"]][o._measurement] = o._value
			},
			error(error) {
				console.error(error)
				res.end()
			},
			complete() {
				res.end(JSON.stringify(data))
			}
		}
	
		queryApi.queryRows(fluxQuery, fluxObserver)
	} else {
		next()
	}
}

export {get}