import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KanbanBoard.css'; // Import the CSS file

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setTickets([]);
      });
  }, []);

  const groupTickets = () => {
    if (!Array.isArray(tickets)) return {};

    const grouped = {};
    tickets.forEach(ticket => {
      const key = ticket[groupBy] || 'Ungrouped';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });
    return grouped;
  };

  const renderGroupedTickets = () => {
    const grouped = groupTickets();

    return Object.keys(grouped).map((group, index) => (
      <div key={index} className="group">
        <h2>{group}</h2>
        {grouped[group]
          .sort((a, b) => (orderBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)))
          .map((ticket) => (
            <div
              key={ticket.id}
              className={`ticket ${
                ticket.priority === 'high' ? 'high-priority' :
                ticket.priority === 'medium' ? 'medium-priority' : 'low-priority'
              }`}
            >
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              {/* Additional ticket details here if needed */}
            </div>
          ))}
      </div>
    ));
  };

  return (
    <div>
      <div>
        <button onClick={() => setGroupBy('status')}>Group by Status</button>
        <button onClick={() => setGroupBy('user')}>Group by User</button>
        <button onClick={() => setGroupBy('priority')}>Group by Priority</button>
        <button onClick={() => setOrderBy('priority')}>Order by Priority</button>
        <button onClick={() => setOrderBy('title')}>Order by Title</button>
      </div>
      <div className="kanban-board">
        {renderGroupedTickets()}
      </div>
    </div>
  );
};

export default KanbanBoard;
