import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { prisma } from '../../lib/prisma'
import { DashBoard } from "../../components/dashboard/Home";
import { authOptions } from "../api/auth/[...nextauth]";
import { INewAccount } from "../../@types/interfaces";
import { ThemeProvider } from "next-themes";

interface AccountProps {
  newaccount: INewAccount;
}

export default function Account() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
      <DashBoard />
      </ThemeProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { slug } = context.params as { slug: string };

  const newaccount = await prisma.newaccount.findUnique({
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

  return {
    props: {
      newaccount,
    },
  };
};

