import * as db from '../../../lib/influxdb'

const post = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    if (data) {
        db.write(slug, data)
		res.end('Ok')
	} else {
		next()
	}
}

const get = async (req, res, next) => {
    const { slug } = req.params
    if (true) {
        await db.read(slug)
		res.end();
	} else {
		next()
	}
}

export {post, get}