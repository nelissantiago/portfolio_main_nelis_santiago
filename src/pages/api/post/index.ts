import { NextApiRequest, NextApiResponse} from 'next'
import { avaliacoesProps } from '../../../@types/interfaces';
import { prisma } from "../../../lib/prisma";

type Props = avaliacoesProps


export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { 
        title,
        description,
        avatar,
        createdAt,
        userpool,
    }: Props = req.body

    try {
    const pool = await prisma.pool.create({
          data: {
             title: title,
             description: description,
             avatar: avatar,
             createdAt: createdAt,
             userpool: {
                create: {
                    name: userpool.name,
                    email: userpool.email,
                }
             }
          },
          select: {
            title: true,
            description: true,
            avatar: true,
            createdAt: true,
            userpoolId: false,
            id: false,
            userpool: {
                select: {
                    name: true,
                    email: true,
                }
            }
          }
       })

         res.status(200).json(pool) 

        
    } catch {
        if(userpool ) {
            res.status(200).json({error: 'You already made a review'})
        } else {
            res.status(200).redirect('/')
        }
    }
}
