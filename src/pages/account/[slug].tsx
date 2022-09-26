import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { prisma } from '../../lib/prisma'
import { DashBoard } from "../../components/dashboard/Home";
import { INewAccount } from "../../@types/challenges.interface";
import { authOptions } from "../api/auth/[...nextauth]";

interface AccountProps {
  newaccount: INewAccount;
}


const Account: NextPage<AccountProps> = () => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashBoard />
    </div>
  );
};

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

export default Account;
