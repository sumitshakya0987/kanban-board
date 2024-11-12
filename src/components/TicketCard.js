import React from 'react';

function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <span>Priority: {ticket.priority}</span>
    </div>
  );
}

export default TicketCard;
