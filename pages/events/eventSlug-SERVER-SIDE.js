import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getAllEvents } from "@/helper/api-util";

export default function FilterEventPage({
  filteredData,
  hasError,
  hasLoading,
  noEventFound,
  queryDate,
}) {
  if (hasLoading) {
    return <p className="center">Loading.......</p>;
  }

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid filter . Please Adjust Your Value</p>
        </ErrorAlert>
        <p className="center">
          <Button link="/events">Show all events</Button>
        </p>
      </>
    );
  }

  if (noEventFound) {
    return (
      <>
        <ErrorAlert>
          <p className="center">NO Events found for the chosen filter!</p>
        </ErrorAlert>
        <p className="center">
          <Button link="/events">Show all events</Button>
        </p>
      </>
    );
  }

  const date = new Date(queryDate.year, queryDate.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredData} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const allEvents = await getAllEvents();

  const filterValue = params.eventSlug;

  if (!filterValue || !allEvents) {
    return {
      props: { hasLoading: true },
    };
  }

  const filterYear = filterValue[0];
  const filterMonth = filterValue[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredData = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredData || filteredData.length === 0) {
    return {
      props: { noEventFound: true },
    };
  }

  return {
    props: {
      filteredData,
      queryDate: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
