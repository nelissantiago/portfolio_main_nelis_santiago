import { ApolloClient, InMemoryCache } from "@apollo/client";

export const Client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/cl5sxafkf1tez01t869tbc2bm/master',
    cache: new InMemoryCache(),
})
