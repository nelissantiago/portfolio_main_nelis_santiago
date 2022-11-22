import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body
    try {
        const response = await prisma.discord.delete({
            where: {
                userpoolId: id
            },
            select: {
                avatar: true,
                name: true,
                discord: true,
                mensagem: true,
            }
        })

        res.status(200).json({Deleted: response})

    } catch {
        if(id) {
            res.status(200).json({error: 'You already made a review'})
        } else {
            res.status(200).redirect('/')
        }
    }
}