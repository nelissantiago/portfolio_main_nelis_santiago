import { NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../lib/prisma";

  async function Pool(req: NextApiRequest, res: NextApiResponse) {
    const { name, avatar, title, emailAccount, description } = req.body

    try {
      await prisma.pool.create({
          data: {
              name: name,
              avatar: avatar,
              title: title,
              emailAccount: emailAccount,
              description: description,
          }
       })
    } catch {
       res.status(200).redirect('/')
    }

    return res.status(200).redirect('/')
}

export default Pool