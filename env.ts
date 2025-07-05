import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        DATABASE_URL: z.string().min(10),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        SMTP_HOST: z.string(),
        SMTP_PORT: z.string(),
        SMTP_MAIL: z.string(),
        SMTP_PASS: z.string()
    },
    client: {
        NEXT_PUBLIC_URL: z.string().url()
    },
    runtimeEnv: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_MAIL: process.env.SMTP_MAIL,
        SMTP_PASS: process.env.SMTP_PASS,

        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
    }
})
