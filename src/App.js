import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupingSelector from './components/GroupingSelector';
import { fetchTickets } from './api';
import { GroupOptions, SortOptions } from './types';

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(GroupOptions.STATUS);
  const [sorting, setSorting] = useState(SortOptions.PRIORITY);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data);
    };
    getTickets();
  }, []);

  return (
    <div className="App">
      <GroupingSelector 
        grouping={grouping} 
        setGrouping={setGrouping} 
        sorting={sorting} 
        setSorting={setSorting} 
      />
      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;
