import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helper/api-util";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AllEventsPage({ allEvent }) {
  const { push } = useRouter();

  function findEventsHandler(eve) {
    const fullPath = `/events/${eve.year}/${eve.month}`;
    push(fullPath);
  }

  return (
    <>
      <Head>
        <title>Find all events</title>
        <meta name="description" content="All Events Page" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvent} />
    </>
  );
}

export async function getStaticProps() {
  const allEvent = await getAllEvents();

  return {
    props: {
      allEvent,
    },

    revalidate: 60,
  };
}
