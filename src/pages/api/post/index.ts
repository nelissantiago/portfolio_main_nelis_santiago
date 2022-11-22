import { NextApiRequest, NextApiResponse} from 'next'
import { avaliacoesProps } from '../../../@types/interfaces';
import { prisma } from "../../../lib/prisma";

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'


type Props = avaliacoesProps


export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { 
        title,
        nota,
        description,
        createdAt,
    } = req.body

    const session = await unstable_getServerSession(
        req,
        res,
        authOptions
    )

    try {
        const pool = await prisma.pool.create({
            data: {
                avatar: session.user.image,
                title: title,
                nota: nota,
                description: description,
                createdAt: createdAt,
                userpool: {
                    connect: {
                        email: session.user.email,
                    }
                }
            },
            select: {
                title: true,
                nota: true,
                description: true,
                createdAt: true,
                avatar: true,
            }
        })

        res.status(201).json(pool)
        
    } catch {
        if(title && nota && description && createdAt) {
            res.status(200).json({error: 'You already made a review'})
        } else {
            res.status(200).redirect('/')
        }
    }
}
