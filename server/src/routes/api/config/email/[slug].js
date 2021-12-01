import { PrismaClient } from '@prisma/client'

const get = async (req, res, next) => {
    const { slug } = req.params
    const prisma = new PrismaClient()
    let client
    const data = req.body
    async function main() {
        client = await prisma.emailNotification.findFirst({
            where: {
                dataClientId: Number(slug),
                userId: data.userId
            }
        })
    }
    main()
        .catch((e) => {
            console.error(e)
        })
        .finally(async () => {
            await prisma.$disconnect()
            res.end(JSON.stringify(client))
        })
}

const post = async (req, res, next) => {
    const { slug, userId } = req.params
    const data = req.body
    const prisma = new PrismaClient()
    if (data) {
        let client
        async function main() {
            client = await prisma.emailNotification.create({
                data: {
                    dataClientId: Number(slug),
                    userId: data.userId,
                    thresholds: data.thresholds,
                    enabled: data.enabled
                }
            })
        }
        main()
            .catch((e) => {
                console.error(e)
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
            client = await prisma.emailNotification.updateMany({
                where: {
                    dataClientId: Number(slug),
                    userId: data.userId,
                },
                data: {
                    thresholds: data.thresholds,
                    enabled: data.enabled
                }
            })
        }
        main()
            .catch((e) => {
                console.error(e)
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