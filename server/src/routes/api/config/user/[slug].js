import { PrismaClient } from '@prisma/client'

const get = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    const prisma = new PrismaClient()
    let user
    async function main() {
        user = await prisma.user.findFirst({
            where: {id: slug}
        })
    }
    main()
        .catch((e) => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
            res.end(JSON.stringify(user))
        })
}

const post = async (req, res, next) => {
    const { slug } = req.params
    const data = req.body
    const prisma = new PrismaClient()
    if (data) {
        let user
        async function main() {
            user = await prisma.user.create({
                data: {
                    id: slug,
                    notificationEmail: data.email
                }
            })
        }
        main()
            .catch((e) => {
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
                res.end(JSON.stringify(user))
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
        let user
        async function main() {
            user = await prisma.user.update({
                where: {id: slug},
                data: {
                    notificationEmail: data.email
                }
            })
        }
        main()
            .catch((e) => {
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
                res.end(JSON.stringify(user))
            })
	} else {
		next()
	}
}

export {get, post, put}