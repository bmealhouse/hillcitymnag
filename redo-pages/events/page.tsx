import { Layout, Calendar } from "@/components";
import { createClient, prismic } from "@/prismicio";

export default async function Events() {
  const client = createClient();
  const [{ data: page }, events] = await Promise.all([
    client.getSingle("events"),
    client.getAllByType("event"),
  ]);

  return (
    <Layout>
      <h1 style={{ marginBottom: 0 }}>{prismic.asText(page.heading)}</h1>
      <Calendar
        events={events.map(({ data: event }) => ({
          title: prismic.asText(event.title).trim(),
          description: prismic.asHTML(event.description).trim(),
          start: prismic.asDate(event.date_time) ?? undefined,
          end: prismic.asDate(event.end_date_time) ?? undefined,
          ...(event.recurrence_frequency && {
            rrule: {
              freq: event.recurrence_frequency,
              dtstart: prismic.asDate(event.date_time) ?? undefined,
              until: prismic.asDate(event.recurrence_end_date) ?? undefined,
            },
          }),
        }))}
      />
    </Layout>
  );
}
