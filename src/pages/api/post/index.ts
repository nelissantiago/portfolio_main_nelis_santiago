import { NextApiRequest, NextApiResponse} from 'next'
import { avaliacoesProps } from '../../../@types/interfaces';
import { prisma } from "../../../lib/prisma";

type Props = avaliacoesProps

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { name, avatar, title, emailAccount, description, createdAt }: Props = req.body

    try {
    const pool = await prisma.pool.create({
          data: {
              name: name,
              avatar: avatar,
              title: title,
              emailAccount: emailAccount,
              description: description,
              createdAt: createdAt,
          },
       })

         res.status(200).json(pool) 

        
    } catch {
        
       const pool = await prisma.pool.findMany({
        select: {
            name: true,
            title: true,
            description: true,
        }
       })


       res.status(200).json(pool)
    }
}
