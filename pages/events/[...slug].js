import React from "react";
import client from "../../apolloClient";
import { gql } from "@apollo/client";

import Link from "next/link";

export default function EventsPage({ event }) {
  return (
    <div>
      <h1>{event.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: event.body.html }}></div>
      <p>{event.eventDate}</p>
      <p>
        Contact Name : <b>{event.contactName}</b> | Contact Number{" "}
        <b>{event.contactNumber}</b>
      </p>

      <Link href="/">
        <a className="btn">Link Back</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        events {
          slug
        }
      }
    `,
  });
  const { events } = data;
  const paths = events.map((event) => ({
    params: { slug: [event.slug] },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0];
  const { data } = await client.query({
    query: gql`
      query EventBySlug($slug: String!) {
        events(where: { slug: $slug }) {
          slug
          title
          body {
            html
          }
          eventDate
          contactName
          contactNumber
          contactEmail
        }
      }
    `,
    variables: { slug },
  });
  const { events } = data;
  const event = events[0];
  return { props: { event } };
}
