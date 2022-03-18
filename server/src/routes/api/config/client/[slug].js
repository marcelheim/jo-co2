import { PrismaClient } from '@prisma/client'

const get = async (req, res, next) => {
    const { slug } = req.params
    const prisma = new PrismaClient()
    let client
    async function main() {
        client = await prisma.dataClient.findFirst({
            where: {
                id: Number(slug)
            }
        })
    }
    main()
        .catch((e) => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
            res.end(JSON.stringify(client))
        })
}

const post = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    const prisma = new PrismaClient()
    if (data) {
        let client
        async function main() {
            client = await prisma.dataClient.create({
                data: {
                    id: Number(slug),
                    name: data.name
                }
            })
        }
        main()
            .catch((e) => {
                console.log(e)
            })
            .finally(async () => {
                await prisma.$disconnect()
                res.end(JSON.stringify(client))
            })
	} else {
		next()
	}
}

const put = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    const prisma = new PrismaClient()
    if (data) {
        let client
        async function main() {
            client = await prisma.dataClient.update({
                where: {id: Number(slug)},
                data: {
                    name: data.name
                }
            })
        }
        main()
            .catch((e) => {
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
                res.end(JSON.stringify(client))
            })
	} else {
		next()
	}
}

export {get, post, put}