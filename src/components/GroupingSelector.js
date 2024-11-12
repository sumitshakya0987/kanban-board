import React from 'react';
import { GroupOptions, SortOptions } from '../types';

function GroupingSelector({ grouping, setGrouping, sorting, setSorting }) {
  return (
    <div className="grouping-selector">
      <label>Group By:</label>
      <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
        <option value={GroupOptions.STATUS}>Status</option>
        <option value={GroupOptions.USER}>User</option>
        <option value={GroupOptions.PRIORITY}>Priority</option>
      </select>

      <label>Sort By:</label>
      <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        <option value={SortOptions.PRIORITY}>Priority</option>
        <option value={SortOptions.TITLE}>Title</option>
      </select>
    </div>
  );
}

export default GroupingSelector;
