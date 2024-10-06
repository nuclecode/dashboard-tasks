"use client";

import React, { useState, useEffect } from 'react';


const JournalForm = ({ addEntry, editEntry, setEditEntry }) => {
  const [id, setId] = useState(null);
  const [task, setTask] = useState('');
  const [customerConsent, setCustomerConsent] = useState(false);
  const [completionDate, setCompletionDate] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [clientApproval, setClientApproval] = useState(false);
  const [approvalDate, setApprovalDate] = useState('');
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    if (editEntry) {
      setId(editEntry.id);
      setTask(editEntry.task);
      setCustomerConsent(editEntry.customerConsent);
      setCompletionDate(editEntry.completionDate);
      setResultDescription(editEntry.resultDescription || editEntry.task);
      setClientApproval(editEntry.clientApproval);
      setApprovalDate(editEntry.approvalDate || '');
    } else {
      resetForm();
    }
  }, [editEntry]);

  const handleCompletionDateChange = (e) => {
    setCompletionDate(e.target.value);
    if (!resultDescription) {
      setResultDescription(task); // Копируем описание задания в результат
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newEntry = {
      id,
      task,
      customerConsent,
      completionDate,
      resultDescription,
      clientApproval,
      approvalDate: clientApproval ? new Date().toISOString() : approvalDate,
      archived,
    };
  
    addEntry(newEntry);
    resetForm();
  };


    // Сброс формы
    const resetForm = () => {
      setId(null);
      setTask('');
      setCustomerConsent(false);
      setCompletionDate('');
      setResultDescription('');
      setClientApproval(false);
      setApprovalDate('');
      setArchived(false);
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task:
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </label>
      <label>
        Customer consent:
        <input
          type="checkbox"
          checked={customerConsent}
          onChange={() => setCustomerConsent(!customerConsent)}
        />
      </label>
      <label>
        Date of completion:
        <input
          type="date"
          value={completionDate}
          onChange={handleCompletionDateChange}
        />
      </label>
      <label>
        Description of the result:
        <textarea 
          value={resultDescription}
          onChange={(e) => setResultDescription(e.target.value)}
        />
      </label>
      <label>
        Client Approval:
        <input 
          type="checkbox"
          checked={clientApproval}
          onChange={(e) => {
            setClientApproval(e.target.checked);
            if (e.target.checked) setApprovalDate(new Date().toISOString());
          }}
        />
      </label>
      <label>
        Approval date:
        <input
          type="date"
          value={approvalDate.split('T')[0]}
          onChange={(e) => setApprovalDate(e.target.value)}
        />
      </label>
      <button type="submit">{ editEntry ? 'Update Record' : 'Add record' }</button>
    </form>
  );
};

export default JournalForm;
