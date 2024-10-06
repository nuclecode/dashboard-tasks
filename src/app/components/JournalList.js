"use client";

import React from 'react';
import EntryCard from './EntryCard';



const JournalList = ({ entries = [], onEdit, onDelete }) => {
  const activeEntries = entries.filter(entry => !entry.archived);

  if (!Array.isArray(activeEntries) || activeEntries.length === 0) {
    return <p>No entries available.</p>;
  }
  
    return (
    <div>
      {activeEntries.map((entry) => (
        <EntryCard
          key={entry.id} // Use a unique identifier here
          entry={entry}
          onEdit={() => onEdit(entry)}
          onDelete={() => onDelete(entry.id)}
        />
      ))}
    </div>
  );
};

export default JournalList;
