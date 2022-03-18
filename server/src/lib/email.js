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
                user: true,
                dataClient: true
            }
        })

        for(let i= 0; i < client.length; i++){
            let thresholds = JSON.parse(client[i].thresholds)
            if(client[i].enabled && ((thresholds.co2 && thresholds.co2 != 0 && thresholds.co2 <= data.co2.value) || 
                (thresholds.humidity && thresholds.humidity != 0 && thresholds.humidity <= data.humidity.value) || 
                (thresholds.temperature && thresholds.temperature != 0 && thresholds.temperature <= data.temperature.value))) 
                send(client[i].user.notificationEmail, dataClientId, client[i].dataClient.name, data, thresholds);
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

const send = async (email, dataClientId, dataClientName, data, thresholds) => {

    const dynamicTemplateData = []

    for(var key in data){
        if(data.hasOwnProperty(key) && thresholds.hasOwnProperty(key)){
            dynamicTemplateData.push({
                type: key,
                value: Math.round(data[key].value * 100 + Number.EPSILON) / 100,
                threshold: thresholds[key] == 0 ? '-' : Math.round(thresholds[key] * 100 + Number.EPSILON) / 100,
                unit: data[key].unit,
                alert: thresholds[key] != 0 ? data[key].value > thresholds[key] : false
            })
        }
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: {
            email: 'jo@carbondioxide.ml',
            name: 'Jo-CO₂'
        },
        templateId: 'd-d7ff631347e44855b676ca0ae1246b2d',
        dynamicTemplateData: {
            id: dataClientId,
            name: dataClientName,
            data: dynamicTemplateData
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log(`Email sent to ${email}`)
        })
        .catch((error) => {
            console.error(error)
        })
}

export {checkAndSend}