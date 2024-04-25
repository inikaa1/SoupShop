import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const adminEmails = ['flick.flixmine@gmail.com', 'inika10m@gmail.com', 'rubainatausif@gmail.com'];


export default NextAuth({
providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async session(session) {
            session.user.role = adminEmails.includes(session?.user?.email) ? 'admin' : 'user';
            return session;
        },
    },
})