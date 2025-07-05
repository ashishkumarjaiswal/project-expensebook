'use server'

import { forgotPassword, getUser, resetPassword, signUp, updateUser } from '../functions/user'

export const signUpAction = async (name: string, email: string, password: string) => {
    return await signUp(name, email, password)
}

export const getUserAction = async () => {
    return await getUser()
}

export const forgotPasswordAction = async (emailOrMobile: string) => {
    return await forgotPassword(emailOrMobile)
}

export const resetPasswordAction = async (userId: string, token: string, newPassword: string) => {
    return await resetPassword(userId, token, newPassword)
}

export const updateUserAction = async (name: string, email: string, mobile: string) => {
    return await updateUser(name, email, mobile)
}
