'use client';
import { useState } from 'react';
import { TextInput, Group, Select, RangeSlider, Button } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';

export default function SearchBar({ onFilter }) {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [20000, 100000],
  });

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Group justify="center" mt="md" gap="sm" wrap="wrap">
      <TextInput
        placeholder="Search by Job Title"
        leftSection={<IconSearch size={16} />}
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />

      <TextInput
        placeholder="Preferred Location"
        leftSection={<IconMapPin size={16} />}
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <Select
        placeholder="Job Type"
        data={['Full-Time', 'Part-Time', 'Contract', 'Internship']}
        leftSection={<IconBriefcase size={16} />}
        value={filters.jobType}
        onChange={(value) => setFilters({ ...filters, jobType: value })}
      />

      <RangeSlider
        min={10000}
        max={200000}
        step={5000}
        label={(val) => `₹${val}`}
        value={filters.salaryRange}
        onChange={(value) => setFilters({ ...filters, salaryRange: value })}
        style={{ width: 200 }}
      />

      <Button color="blue" onClick={handleFilter}>
        Apply Filters
      </Button>
    </Group>
  );
}
