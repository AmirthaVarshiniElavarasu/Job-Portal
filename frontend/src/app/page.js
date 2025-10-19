'use client';
import { useState } from 'react';
import NavBar from './components/NavBar';
import JobList from './components/JobList';
import CreateJobModal from './components/CreateJobModal';

export default function Home() {
  const [jobs, setJobs] = useState([]); 
  const [opened, setOpened] = useState(false);

  const handleFilterResults = (data) => {
    console.log('Received jobs:', data);
    setJobs(data); 
  };

  return (
    <>
      <NavBar onCreateJobClick={() => setOpened(true)} onFilter={handleFilterResults} />

      <JobList jobs={jobs} /> 
      <CreateJobModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
