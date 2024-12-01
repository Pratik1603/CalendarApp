import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CommunicationCalendar = ({ companies }) => {
  const events = companies.flatMap((company) =>
    company.communications.map((comm) => ({
      date: new Date(comm.date),
      label: `${company.name}: ${comm.type}`,
    }))
  );

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (event) => event.date.toDateString() === date.toDateString()
      );
      return event ? (
        <div className="bg-blue-100 rounded text-xs text-center">
          {event.label}
        </div>
      ) : null;
    }
  };

  return (
    <div className="rounded-lg shadow-lg">
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default CommunicationCalendar;
