import type { GetStaticProps  } from "next";
import { ThemeProvider } from "next-themes";
import { prisma } from '../lib/prisma'
import { Main } from "../components/main"
import { Footer } from "../components/footer"
import { useEffect } from "react";
import { Header } from "../components/header";

import Aos from 'aos'
import 'aos/dist/aos.css'
import { avaliacoesProps, UserPost } from "../@types/interfaces";
interface Props {
  counts: {
    avaliacoescount: number
    count: number
  }
  avaliacoes: avaliacoesProps[],
  userPool: UserPost[]
}

export default function Home(props: Props) {
  useEffect(( ) => {
    Aos.init({duration: 1000})
  })

  return (
    <>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <Main counts={props.counts} avaliacoes={props.avaliacoes}  />
          <Footer />
        </ThemeProvider>
    </>
  )
}


export const getStaticProps: GetStaticProps  = async () => {
  const avaliacoescount = await prisma.pool.count()
  const count = await prisma.account.count()
  const avaliacoes = await prisma.pool.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      userpool: {
        select: {
          name: true,
          email: true,
        }
      },
      title: true,
      description: true,
      avatar: true,
      createdAt: true,
      
    }
  })

  

  const newaccount = await prisma.slugCreate.findMany({
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
      AccountMaping,
      avaliacoes: JSON.parse(JSON.stringify(avaliacoes)),
    },
    revalidate: 5,
  };
};