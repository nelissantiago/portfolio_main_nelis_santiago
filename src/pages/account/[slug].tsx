import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { prisma } from '../../lib/prisma'
import { DashBoard } from "../../components/dashboard/Home";
import { authOptions } from "../api/auth/[...nextauth]";
import { avaliacoesProps } from "../../@types/interfaces";
import { ThemeProvider } from "next-themes";

interface AccountProps {
  pool: avaliacoesProps
}



export default function Account(props: AccountProps) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
      <DashBoard pool={props.pool} />
      </ThemeProvider>
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

  const newaccount = await prisma.slugCreate.findUnique({
    where: {
      slug,
    },
  });

  if (!newaccount) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const pool = await prisma.pool.findMany({
    select: {
      userpool: {
        select: {
          name: true,
          email: true,
        }
      },
    }
  })

  return {
    props: {
      newaccount,
      pool: JSON.parse(JSON.stringify(pool)),
    },
  };
};

