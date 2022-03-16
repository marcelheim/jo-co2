import { PrismaClient } from '@prisma/client'
const sgMail = require('@sendgrid/mail')

const checkAndSend = async (dataClientId, data) => {
    const prisma = new PrismaClient()
    let client
    let checked = false
    async function main() {
        client = await prisma.emailNotification.findMany({
            where: {
                dataClientId: dataClientId,
            },
            include: {
                user: true
            }
        })

        for(let i= 0; i < client.length; i++){
            let thresholds = JSON.parse(client[i].thresholds)
            if(client[i].enabled && ((thresholds.co2 && thresholds.co2 != 0 && thresholds.co2 <= data.co2.value) || 
                (thresholds.humidity && thresholds.humidity != 0 && thresholds.humidity <= data.humidity.value) || 
                (thresholds.temperature && thresholds.temperature != 0 && thresholds.temperature <= data.temperature.value))) send(client[i].user.notificationEmail, dataClientId, data)
        }
    }
    await main()
        .catch((e) => {
            console.error(e)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}

const send = async (email, sensor, data) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: {
            email: 'jo@carbondioxide.ml',
            name: 'Jo CO2'
        },
        subject: `Sensor ${sensor} Warnung`,
        html: `<pre><code>${JSON.stringify(data)}</code></pre>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            //console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

export {checkAndSend}