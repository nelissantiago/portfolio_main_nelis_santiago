import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body

    try {
      
        const poooldelete = await prisma.pool.delete({
            where: {
                userpoolId: id
            },
            select: {
                avatar: true,
                description: true,
                createdAt: true,
                nota: true,
                title: true,
            }
        })
        
        res.status(200).json({Deleted: poooldelete})

    } catch {
        if(id) {
            res.status(200).json({error: 'You already made a review'})
        } else {
            res.status(200).redirect('/')
        }
    }
}