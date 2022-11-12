import { NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../lib/prisma";

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { name, avatar, title, emailAccount, description, CreatedAt} = req.body

    try {
    const pool = await prisma.pool.create({
          data: {
              name: name,
              avatar: avatar,
              title: title,
              emailAccount: emailAccount,
              description: description,
              createdAt: CreatedAt
          }
       })

       res.json(pool)
       
    } catch {
       res.status(200).redirect('/')
    }
}
