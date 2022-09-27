import type { GetStaticProps } from "next";
import { ThemeProvider } from "next-themes";
import { prisma } from '../lib/prisma'
import { Main } from "../components/main"
import { Footer } from "../components/footer"
import { useEffect } from "react";
import { Header } from "../components/header";
import { INewAccount } from "../@types/interfaces";

import Aos from 'aos'
import 'aos/dist/aos.css'

interface HomeProps {
  newaccount: INewAccount[];
}


export default function Home({ newaccount }: HomeProps) {
  useEffect(( ) => {
    Aos.init({duration: 1000})
  })


  return (
    <>
        <div>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <Main />
          <Footer />
        </ThemeProvider>
    </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const newaccount = await prisma.newaccount.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });


  const AccountMaping = newaccount.map((account) => ({
    ...account.tags.map(tag => tag.tag.name)
  }));

  return {
    props: {
      account: AccountMaping,
    },

    revalidate: 86400,
  };
};

