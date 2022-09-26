import type { GetStaticProps, NextPage } from "next";
import { ThemeProvider } from "next-themes";
import { INewAccount } from "../@types/challenges.interface";
import { prisma } from '../lib/prisma'

import { Main } from "../components/main"
import { Footer } from "../components/footer"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { Header } from "../components/header";
import { toast } from "react-toastify";



interface HomeProps {
  newaccount: INewAccount[];
}

const Home: NextPage<HomeProps> = () => {
  useEffect(( ) => {
    Aos.init({duration: 1000})
  })
  return (
    <div>
      
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

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


  const parsedChallenges = newaccount.map((account) => ({
    ...account,
    tags: [...account.tags.map(tag => tag.tag.name)]
  }));

  return {
    props: {
      challenges: parsedChallenges,
    },

    revalidate: 86400,
  };
};

export default Home;
