import { gql, useQuery } from "@apollo/client"
import { SideBar } from "../../components/ListContent";
import type { GetStaticProps } from "next";
import { prisma } from '../../lib/prisma'


const GET_LESSON_BY_GRAPH = gql`
    query GetLessons {
      contents(orderBy: publishedAt_ASC, stage: PUBLISHED) {
        id
        title
        titlecontent
        descriptioncontent
        slug
        image
      }
    }
`

interface Props {
    contents: {
        id: string;
        title: string;
        titlecontent: string;
        descriptioncontent: string;
        slug: string;
        image: string;
    }[]
}

export default function Teste() {

    const { data } = useQuery<Props>(GET_LESSON_BY_GRAPH)

    console.log(data)
    return (
        <>
        <SideBar />
        </>
    )
}