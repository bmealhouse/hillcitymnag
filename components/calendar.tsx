"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

type Props = {
  events: Array<{
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
  }>;
};

export function Calendar({ events }: Props) {
  return (
    <FullCalendar
      initialView="dayGridMonth"
      plugins={[rrulePlugin, dayGridPlugin]}
      height="auto"
      contentHeight="auto"
      events={events}
      eventBackgroundColor="#18371b"
      eventBorderColor="#18371b"
      eventDidMount={(info) => {
        const {
          title,
          start,
          end,
          _def: { recurringDef },
          extendedProps: { description },
        } = info.event;

        const date = start?.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        const startTime = start?.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });

        let endTime;
        if (end) {
          endTime = end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });
        } else if (recurringDef) {
          // Recurring events to don't keep track of the event end time.
          // We need to look up the event end time by title from the original
          // events config.
          const event = events.find((event) => event.title === title);
          if (event?.end) {
            endTime = new Date(event.end).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            });
          }
        }

        tippy(info.el, {
          content: `<h3>${info.event.title}</h3>${
            description ? `${description}<br/>` : ""
          }${`${date} @ ${startTime}${endTime ? ` - ${endTime}` : ""}`}`,
          allowHTML: true,
        });
      }}
    />
  );
}
