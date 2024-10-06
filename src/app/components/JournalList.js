"use client";

import React from 'react';
import EntryCard from './EntryCard';



const JournalList = ({ entries = [], onEdit, onDelete, lastActiveEntryRef, showArchived }) => {
  const filteredEntries = showArchived
  ? entries.filter(entry => entry.archived)
  : entries.filter(entry => !entry.archived);

  const activeEntries = entries.filter(entry => !entry.archived);

  if (filteredEntries.length === 0) {
    return <p>{showArchived ? 'No archived Tasks.' : 'No Tasks available.'}</p>
  }

  // if (!Array.isArray(entries) || activeEntries.length === 0) {
  //   return <p>No Tasks available.</p>;
  // }
  
    return (
    <div>
      {filteredEntries.map((entry, index) => (
        <EntryCard
          key={entry.id} // Use a unique identifier here
          entry={entry}
          onEdit={() => onEdit(entry)}
          onDelete={() => onDelete(entry.id)}
          ref={!showArchived && index === filteredEntries.length - 1 ? lastActiveEntryRef : null}
        />
      ))}
    </div>
  );
};

export default JournalList;
