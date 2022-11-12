import type { GetStaticProps, GetServerSideProps  } from "next";
import { ThemeProvider } from "next-themes";
import { prisma } from '../lib/prisma'
import { Main } from "../components/main"
import { Footer } from "../components/footer"
import { useEffect } from "react";
import { Header } from "../components/header";

import Aos from 'aos'
import 'aos/dist/aos.css'
import { avaliacoesProps } from "../@types/interfaces";
interface Props {
  counts: {
    avaliacoescount: number
    count: number
  }
  avaliacoes: avaliacoesProps[],
}

export default function Home(props: Props) {
  useEffect(( ) => {
    Aos.init({duration: 1000})
  })


  return (
    <>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <Main counts={props.counts} pool={props.avaliacoes} />
          <Footer />
        </ThemeProvider>
    </>
  )
}


export const getServerSideProps: GetServerSideProps  = async () => {
  const avaliacoescount = await prisma.pool.count()
  const avaliacoes = await prisma.pool.findMany()  
  const count = await prisma.account.count()
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
      counts: {
        avaliacoescount,
        count,
      },
      avaliacoes,
      AccountMaping,
    },
  };
};

