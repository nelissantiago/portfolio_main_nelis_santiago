import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { prisma } from '../../lib/prisma'
import { DashBoard } from "../../components/dashboard/Home";
import { authOptions } from "../api/auth/[...nextauth]";
import { avaliacoesProps } from "../../@types/interfaces";

interface AccountProps {
  pool: avaliacoesProps,
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
} []
}

export default function Account(props: AccountProps) {
  return (
    <>
      <Head>
        <title>Dashboard - Inicio</title>
      </Head>
      <DashBoard pool={props.pool} pooluser={props.pooluser} />
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

  const { slug } = context.params as { slug: string };

  const slugdashboard = await prisma.slugCreate.findUnique({
    where: {
      slug,
    },
  });


  if (!slugdashboard) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }


  const pool = await prisma.pool.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      description: true,
      nota: true,
      avatar: true,
      createdAt: true,
      userpool: {
        select: {
          name: true,
          image: true,
          roles: true,
        }
      }
    }
  })
  
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

  return {
    props: {
      slugdashboard,
      pool: JSON.parse(JSON.stringify(pool)),
      pooluser: JSON.parse(JSON.stringify(userprofile)),
    },
  };
};

 /**
  * 
  *  
 const deletepool = await prisma.pool.delete({
  where: {
    userpoolId: userprofile[0].pool[0].userpoolId,
  },
  select: {
    title: true,
    nota: true,
    avatar: true,
    description: true,
    createdAt: true,
  }
 })

 console.log(deletepool, 'picanha')

  */

  /**
   * 
   *  const discord = await prisma.discord.create({
    data: {
      name: 'adadad',
      avatar: 'adadad',
      discord: 'adadad',
      mensagem: 'adadad',
      userpool: {
        connect: {
          email: session.user.email,
        }
      },
    }
  })

   const poolusers = await prisma.user.findMany({
    where: {
      name: session.user.name,
      email: session.user.email,
    },
    select: {
      name: true,
      email: true,
      pool: {
        select: {
          title: true,
          description: true,
          avatar: true,
          createdAt: true,
        },
      },
      discord: {
        select: {
          name: true,
          avatar: true,
          discord: true,
          mensagem: true,
        }
      }
    },
  })
   */