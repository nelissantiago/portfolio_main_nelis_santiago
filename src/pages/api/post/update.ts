import { NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { roles, email } = req.body

    const session = await unstable_getServerSession(
        req,
        res,
        authOptions
    )


    try {
     const response = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                roles: roles
            },
            select: {
                name: true,
                roles: true,
                email: true,
            }
        })

        res.status(200).json(response)

    } catch {
        const user = await prisma.user.findMany({
            select: {
                roles: true
            }
        })
        if(email === '') {
            res.status(200).json({error: 'Email Invalido'})
        } else {
            res.status(200).redirect('/')
        }
    }
}