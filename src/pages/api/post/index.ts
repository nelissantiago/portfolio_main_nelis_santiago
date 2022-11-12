import { NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../lib/prisma";

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { name, avatar, title, emailAccount, description } = req.body

    try {
    const pool = await prisma.pool.create({
          data: {
              name: name,
              avatar: avatar,
              title: title,
              emailAccount: emailAccount,
              description: description,
          }
       })

        res.json(pool)
       
    } catch {
       res.status(200).redirect('/')
    }
}
