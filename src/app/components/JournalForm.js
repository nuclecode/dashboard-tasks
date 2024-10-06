"use client";

import React, { useState, useEffect } from 'react';

const standardTasks = [
  "Create landing page",
  "Design homepage",
  "Set up responsive layout",
  "Implement SEO features",
  "Create contact form",
  "Add Google Analitics",
  "Optimize images",
  "Deploy website",
  "Set up SSL certificate",
  "Test website perfomance",
];


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
      // approvalDate: clientApproval ? new Date().toISOString() : approvalDate,
      approvalDate: clientApproval ? approvalDate : '',
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

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleClientApprovalChange = (e) => {
    const isApproved = e.target.checked;
    setClientApproval(isApproved);

    if (isApproved) {
      setApprovalDate(new Date().toISOString().split('T')[0]);
    } else {
      setApprovalDate('');
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task:
        <select value={task} onChange={handleTaskChange}>
          <option value="">Select a task</option>
          {standardTasks.map((standardTask, index) => (
            <option key={index} value={standardTask}>{standardTask}</option>
          ))}
        </select>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="or enter custom task"
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
          // onChange={(e) => {
          //   setClientApproval(e.target.checked);
          //   if (e.target.checked) setApprovalDate(new Date().toISOString());
          // }}
          onChange={handleClientApprovalChange}
        />
      </label>
      <label>
        Approval date:
        <input
          type="date"
          // value={approvalDate.split('T')[0]}
          // onChange={(e) => setApprovalDate(e.target.value)}
          value={approvalDate}
          onChange={(e) => setApprovalDate(e.target.value)}
          disabled={!clientApproval}
        />
      </label>
      <button type="submit">{ editEntry ? 'Update Record' : 'Add record' }</button>
    </form>
  );
};

export default JournalForm;
