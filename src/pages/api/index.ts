import { NextApiRequest, NextApiResponse} from 'next'
import { prisma } from '../../lib/prisma'

const Pool =  async (req: NextApiRequest, res: NextApiResponse) => {
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


    res.status(200).json({ message: 'Pool created' })
}

export default Pool