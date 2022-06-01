import Head from "next/head";

import { gql } from "@apollo/client";
import client from "../apolloClient";

export default function Home({ events }) {
  console.log(events);
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>comunity events</h1>

      <ul>
        {events.map((event, i) => (
          <li key={i}>
            <a href={event.slug}>{event.title}</a>=
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data: events } = await client.query({
    query: gql`
      query {
        events {
          title
          slug
          description {
            raw
          }
          eventDate
        }
      }
    `,
  });
  console.log(events);
  return {
    props: {
      events,
    },
  };
}
