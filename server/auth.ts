import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@/lib/db'

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                if (!email || !password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if (!user) {
                    throw new Error('User not found')
                }

                if (user && user.password === password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                } else {
                    throw new Error('Invalid password')
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        }
    },

    session: {
        strategy: 'jwt'
    }
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
