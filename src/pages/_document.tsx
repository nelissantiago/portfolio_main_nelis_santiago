import Document,  { Html, Head, Main, NextScript }  from "../../node_modules/next/document"

export default class MyDocument extends Document {
    render() {
        return (
            <>
            <Html lang="pt-br">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
                    <meta name="description" content="Olá, meu nome e nelis santiago sou desenvolvedor freelancer focado em front-end, desenvolvo de forma pratica e eficiente, cuidando em detalhes e seo" />
                    <title>
                        Nelis Santiago - Dev
                    </title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
            </>
        )
    }
}