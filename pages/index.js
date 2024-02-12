import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helper/api-util";
import Head from "next/head";

export default function HomePage({ featureEve }) {
  return (
    <>
      <Head>
        <title>Next JS Events</title>
        <meta
          name="description"
          content="Find a lot of great event that allow you to evolve"
        />
      </Head>
      <EventList events={featureEve} />
    </>
  );
}

export async function getStaticProps() {
  const featureEve = await getFeaturedEvents();

  return {
    props: {
      featureEve,
    },
    revalidate: 1800, // half hour
  };
}
