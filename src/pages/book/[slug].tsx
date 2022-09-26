import { GetServerSideProps, NextPage } from "next";
import { newBook } from "../../@types/book";

interface boook {
    newBook: newBook;
}

export default function Slug() {
    return (
        <>
            <h2>Hello world</h2>
        </>
    )
}

const getServerSideProps: GetServerSideProps = async ({params}) => {
    const books = await params.id

    if(books) {
        params.id && Number(params.id)
    }

    return {
        props: {}
    }
}