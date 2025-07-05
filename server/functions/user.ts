import { render } from '@react-email/render'
import crypto from 'crypto'
import validator from 'validator'

import { env } from '@/env'
import { prisma } from '@/lib/db'

import sendMail from '../emails/nodemailer'
import Reset_password from '../emails/Reset_password'
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

export const forgotPassword = async (emailOrMobile: string) => {
    try {
        if (!emailOrMobile) {
            throw new Error('Email or Mobile is required')
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: emailOrMobile
                    },
                    {
                        mobile: emailOrMobile
                    }
                ]
            }
        })

        if (!user) {
            throw new Error('User not found with this email or mobile number')
        }

        if (user.resetPasswordExpires <= Date.now()) {
            user.resetPasswordToken = crypto.randomBytes(32).toString('hex')
            user.resetPasswordExpires = Date.now() + 60 * 60 * 1000 // 1 hour
        }

        const emailHtml = render(
            Reset_password({
                userFirstname: user.name,
                resetPasswordLink: `${env.NEXT_PUBLIC_URL}/reset_password/?userId=${user.id}&token=${user.resetPasswordToken}`
            })
        )

        const mailRes = await sendMail({
            to: user.email,
            subject: 'Reset Password',
            html: emailHtml
        })

        if (!mailRes.success) {
            throw new Error(mailRes.message)
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetPasswordToken: user.resetPasswordToken,
                resetPasswordExpires: user.resetPasswordExpires
            }
        })

        return {
            success: true,
            message: 'Email sent successfully'
        }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message }
    }
}

export const resetPassword = async (userId: string, token: string, newPassword: string) => {
    try {
        if (!userId || !token || !newPassword) {
            throw new Error('All fields are required')
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: Date.now()
                }
            }
        })

        if (!user) {
            throw new Error('Invalid or expired token')
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: user.password,
                resetPasswordToken: user.resetPasswordToken,
                resetPasswordExpires: user.resetPasswordExpires
            }
        })

        return {
            success: true,
            message: 'Password reset successfully'
        }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message }
    }
}

export const updateUser = async (name: string, email: string, mobile: string) => {
    try {
        const currentUser = await getUser()

        if (!currentUser || !currentUser.data) {
            throw new Error('Session expired or user not found')
        }

        if (!name || !email || !mobile) {
            throw new Error('All fields are required')
        }

        if (!validator.isEmail(email)) {
            throw new Error('Invalid Email Address')
        }

        if (!validator.isMobilePhone(mobile, ['en-IN'])) {
            throw new Error('Invalid Mobile Number')
        }

        const user = await prisma.user.update({
            where: {
                id: currentUser.data.id
            },
            data: {
                name,
                email,
                mobile
            }
        })

        return {
            success: true,
            message: 'User updated successfully'
        }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message }
    }
}
