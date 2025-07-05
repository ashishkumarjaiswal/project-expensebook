import nodemailer from 'nodemailer'

import { env } from '@/env'

const sendMail = async (options: { to: any; subject: any; html: any }) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: true,
            auth: {
                user: env.SMTP_MAIL,
                pass: env.SMTP_PASS
            }
        } as nodemailer.TransportOptions)

        const res = await mailTransporter.sendMail({
            from: env.SMTP_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.html
        })

        if (!res.accepted || !res.accepted.includes(options.to)) {
            throw new Error('Something went wrong while sending email')
        }

        return {
            success: true,
            message: 'Email sent successfully'
        }
    } catch (error) {
        const err = error as Error
        console.log({ error })
        return {
            success: false,
            message: err.message
        }
    }
}

export default sendMail
