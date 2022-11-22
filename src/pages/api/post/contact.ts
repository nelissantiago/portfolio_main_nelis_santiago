import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

export default async function Pool(req: NextApiRequest, res: NextApiResponse) {
const { discord, mensagem } = req.body

try {
    const session = await unstable_getServerSession(
        req,
        res,
        authOptions
    )
    const discordContact = await prisma.discord.create({
      data: {
        avatar: session.user.image,
        name: session.user.name,
        discord: discord,
        mensagem: mensagem,
        userpool: {
          connect: {
            email: session.user.email,
          }
        }
      },
      select: {
        name: true,
        discord: true,
        avatar: true,
        mensagem: true,
      }
    })
    
      res.status(201).json(discordContact)

} catch {
  if(discord && mensagem) {
    res.status(200).json({error: 'You already made a review'})
  } else {
    res.status(200).redirect('/')
  }
}
}
