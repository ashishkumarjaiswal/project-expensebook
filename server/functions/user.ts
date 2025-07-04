import { prisma } from '@/lib/db'

import { checkSession } from './common'

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            throw new Error('User already exists with this email')
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        if (!newUser) {
            throw new Error('Something went wrong while creating user')
        }

        return { success: true, message: 'User created successfully' }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message }
    }
}

export const getUser = async () => {
    try {
        const session = await checkSession()

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return { success: true, message: 'User fetched successfully', data: user }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message, data: undefined }
    }
}
