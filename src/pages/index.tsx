import type { GetStaticProps  } from "next";
import { ThemeProvider } from "next-themes";
import { prisma } from '../lib/prisma'
import { Main } from "../components/main"
import { Footer } from "../components/footer"
import { useEffect } from "react";
import { Header } from "../components/header";

import Aos from 'aos'
import 'aos/dist/aos.css'
import { UserPost } from "../@types/interfaces";
interface Props {
  counts: {
    avaliacoescount: number
    count: number
  }
  avaliacoes: {
    title: string
    nota: number
    description: string
    avatar: string
    createdAt: Date
    userpool: {
      name: string,
  }
  }[]
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
        }
      }
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