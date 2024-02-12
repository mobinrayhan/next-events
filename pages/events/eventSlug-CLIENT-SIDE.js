import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FilterEventPage() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    "https://next-js-f22cc-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  const filterValue = query.eventSlug;

  if (!filterValue || !data) {
    return <p className="center">Loading.......</p>;
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
    numMonth > 12 ||
    error
  ) {
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

  const filteredData = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredData || filteredData.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredData} />
    </>
  );
}
