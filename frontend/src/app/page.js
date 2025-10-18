'use client';
import { useState } from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import CreateJobModal from './components/CreateJobModal';

export default function Home() {
  const [filters, setFilters] = useState({});
   const [opened, setOpened] = useState(false);
  const handleFilter = (f) => {
    setFilters(f);
  };

  return (
    <>
      <NavBar />
      <SearchBar onFilter={handleFilter} />
      <JobList filters={filters} />
      <CreateJobModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
