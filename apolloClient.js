import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-west-2.graphcms.com/v2/cl3vbha5mewq601xiahp4bynf/master",
  cache: new InMemoryCache(),
});

export default client;
