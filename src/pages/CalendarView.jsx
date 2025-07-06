import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getFromLocalStorage } from "../utils/storage";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const raw = getFromLocalStorage("incidents") || [];

    const formatted = raw.map((item) => ({
      id: item.id,
      title: `${item.title} (${item.status || "Pending"})`,
      start: new Date(item.appointmentDate),
      end: new Date(item.appointmentDate),
      allDay: false,
    }));

    setEvents(formatted);
  }, []);

  return (
    <div style={{ height: "600px", padding: "1rem" }}>
      <h2 className="text-2xl font-semibold mb-4">Appointments Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
