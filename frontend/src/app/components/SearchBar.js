'use client';
import { useState } from 'react';
import {
  TextInput,
  Group,
  Select,
  RangeSlider,
  Button,
  Box,
  Text,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';

export default function SearchBar({ onFilter }) {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [50000, 80000],
  });

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Box
      maw={1400}
      mx="auto"
      mt="lg"
      p="md"
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Group
        justify="center"
        wrap="nowrap"
        gap="md"
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TextInput
        variant='unstyled'
          placeholder="Search by Job Title, Role"
          leftSection={<IconSearch size={18} />}
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        <Select
        variant='unstyled'
          placeholder="Preferred Location"
          data={['Chennai', 'Bangalore', 'Hyderabad', 'Delhi', 'Remote']}
          leftSection={<IconMapPin size={18} />}
          value={filters.location}
          onChange={(value) => setFilters({ ...filters, location: value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        <Select
        variant='unstyled'
          placeholder="Job Type"
          data={['Full-time', 'Part-time', 'Contract', 'Internship']}
          leftSection={<IconBriefcase size={18} />}
          value={filters.jobType}
          onChange={(value) => setFilters({ ...filters, jobType: value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        <div>
          <Text size="sm" fw={500} mb={4}>
            Salary Per Month
          </Text>
          <RangeSlider
            min={10000}
            max={200000}
            step={5000}
            value={filters.salaryRange}
            onChange={(value) => setFilters({ ...filters, salaryRange: value })}
            color="black"
            label={(val) => `₹${Math.round(val / 1000)}k`}
            radius="xl"
            size="sm"
            styles={{
              bar: { height: 6 },
              thumb: { width: 16, height: 16 },
            }}
          />
      </div>

        <Button
          color="blue"
          radius="xl"
          size="md"
          fw={600}
          style={{ minWidth: 120 }}
          onClick={handleFilter}
        >
          Apply Filters
        </Button>
      </Group>
    </Box>
  );
}
