import * as db from '../../../lib/influxdb'
import * as email from '../../../lib/email'
import { InfluxDB } from '@influxdata/influxdb-client'

const post = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    if (data) {
		email.checkAndSend(Number(slug), data)
        db.write(slug, data)
		res.end('Ok')
	} else {
		next()
	}
}

const get = async (req, res, next) => {
    const { slug } = req.params
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
	
		const fluxQuery = `from(bucket: "${INFLUXDB_BUCKET}")
			|> range(start: -3h)
			|> filter(fn: (r) => r["0"] == "${slug}")
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

export {post, get}