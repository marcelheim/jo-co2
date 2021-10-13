import * as db from '../../../lib/influxdb'

const post = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    if (data) {
        db.post(slug, data)
		res.end('Ok')
	} else {
		next()
	}
}

export {post}