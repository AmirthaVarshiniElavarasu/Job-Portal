'use client';
import { useState } from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import CreateJobModal from './components/CreateJobModal';

export default function Home() {
  const [jobs, setJobs] = useState([]); // ✅ store job results, not filters
  const [opened, setOpened] = useState(false);

  const handleFilterResults = (data) => {
    console.log('🎯 Received jobs:', data);
    setJobs(data); // ✅ store job results here
  };

  return (
    <>
      <NavBar onCreateJobClick={() => setOpened(true)} />
      <SearchBar onFilter={handleFilterResults} /> {/* ✅ passes callback */}
      <JobList jobs={jobs} /> {/* ✅ pass jobs, not filters */}
      <CreateJobModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
