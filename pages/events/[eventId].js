import EventContent from "@/components/event-details/event-content";
import EventLogistics from "@/components/event-details/event-logistics";
import EventSummary from "@/components/event-details/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/helper/api-util";
import Head from "next/head";

export default function EventDetailPage({ event }) {
  if (!event) {
    return <p className="center">Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics {...event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps({ params }) {
  const event = await getEventById(params.eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();

  const eventPath = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: eventPath,
    fallback: "blocking",
  };
}
