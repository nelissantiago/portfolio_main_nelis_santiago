import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from "next-auth/next";
import { HomeAdmin } from '../../components/dashboard/Admin/home';
import { prisma } from '../../lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]';

interface AccountProps {
  user: {
    name: string,
    email: string,
    id: string,
    roles: string
  }[]
    pooluser: {
      name: string,
      image: string,
      email: string,
      roles: string,
      pool: {
          title: string,
          nota: number,
          description: string,
          avatar: string,
          createdAt: Date,
          userpoolId: number,
      },
      discord: {
        id: string,
          name: string,
          avatar: string,
          discord: string,
          mensagem: string,
          userpoolId: number,
      },
  }[]
  }

  
export default function History(props: AccountProps) {
    console.log(props.user)
    return (
        <>
            {props.pooluser[0].roles === 'Admin' ? (
                <>
                <HomeAdmin user={props.user} />
                </>
            ) : "Somente Admin Pode Acessar Essa Pagina."}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    if(!session) {
        return {
            redirect: {
              destination: '/',
              permanent: false,
            }
          }
    }

    const userprofile = await prisma.user.findMany({
        where: {
          name: session.user.name,
          email: session.user.email,
        },
        select: {
          name: true,
          email: true,
          image: true,
          roles: true,
          pool: {
            select: {
              title: true,
              nota: true,
              description: true,
              avatar: true,
              createdAt: true,
              userpoolId: true,
            }
          },
          discord: {
            select: {
              id: true,
              name: true,
              avatar: true,
              discord: true,
              mensagem: true,
              userpoolId: true,
            }
          },
        }
       })

       const user = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          id: true,
          roles: true,
        }
       })

       if(userprofile[0].roles === 'Membro' || userprofile[0].roles === 'Comprador' ) {
        return {
            redirect: {
                destination: '/account/dashboard',
                permanent: false,
              }
        }
       }

    return {
        props: {
            pooluser: JSON.parse(JSON.stringify(userprofile)),
            user: JSON.parse(JSON.stringify(user))
        }
    }
}