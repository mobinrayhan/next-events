export async function getAllEvents() {
  const res = await fetch(
    "https://next-js-f22cc-default-rtdb.firebaseio.com/events.json"
  );
  const allEvents = await res.json();
  return allEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  const featuredEvents = allEvents.filter((event) => event.isFeatured);

  return featuredEvents;
}

export async function getEventById(id) {
  const allEvent = await getAllEvents();
  const event = allEvent.find((eve) => eve.id === id);

  return event;
}
