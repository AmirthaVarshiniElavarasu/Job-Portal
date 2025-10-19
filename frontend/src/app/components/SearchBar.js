'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextInput,
  Group,
  Select,
  RangeSlider,
  Box,
  Text,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';

export default function SearchBar({ onFilter }) {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [0, 0],
  });

  const [salaryRange, setSalaryRange] = useState([0, 0]);

  const formatSalary = (value) => {
    if (!value || isNaN(value)) return '0';
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `${Math.round(value / 1000)}k`;
    return value.toString();
  };

  // ✅ Fetch jobs from API
  const handleAutoSearch = async () => {
    try {
      const params = {
        title: filters.title || '',
        location: filters.location || '',
        jobType: filters.jobType || '',
        minSalary: filters.salaryRange[0] || '',
        maxSalary: filters.salaryRange[1] || '',
      };

      console.log('🔍 Searching with:', params);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/search`, {
        params,
      });

      if (onFilter) onFilter(response.data.data);
      console.log('✅ Jobs fetched:', response.data.count);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // ✅ Fetch salary range on mount
  useEffect(() => {
    const fetchSalaryRange = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/salary-range`);
        const { minSalary, maxSalary } = response.data.data;

        const min = Number(minSalary) || 10000;
        const max = Number(maxSalary) || 200000;

        setSalaryRange([min, max]);
        setFilters((prev) => ({
          ...prev,
          salaryRange: [min, max],
        }));

        handleAutoSearch(); // initial job load
      } catch (err) {
        console.error('Error loading salary range:', err);
        setSalaryRange([10000, 200000]);
        setFilters((prev) => ({
          ...prev,
          salaryRange: [10000, 200000],
        }));

        handleAutoSearch();
      }
    };

    fetchSalaryRange();
  }, []);

  // ✅ Auto-search when any filter changes (debounced)
  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('🔁 Triggering search...');
      handleAutoSearch();
    }, 400);

    return () => clearTimeout(debounce);
  }, [
    filters.title,
    filters.location,
    filters.jobType,
    filters.salaryRange[0],
    filters.salaryRange[1],
  ]);

  const [min, max] = salaryRange;
  if (isNaN(min) || isNaN(max)) return null;

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
        style={{ width: '100%', alignItems: 'center' }}
      >
        {/* 🔍 Job Title */}
        <TextInput
          variant="unstyled"
          placeholder="Search by Job Title, Role"
          leftSection={<IconSearch size={18} />}
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        {/* 📍 Location */}
        <Select
          variant="unstyled"
          placeholder="Preferred Location"
          data={['Chennai', 'Bangalore', 'Hyderabad', 'Delhi', 'Remote']}
          leftSection={<IconMapPin size={18} />}
          value={filters.location}
          onChange={(value) => setFilters({ ...filters, location: value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        {/* 💼 Job Type */}
        <Select
          variant="unstyled"
          placeholder="Job Type"
          data={['Full-time', 'Part-time', 'Contract', 'Internship']}
          leftSection={<IconBriefcase size={18} />}
          value={filters.jobType}
          onChange={(value) => setFilters({ ...filters, jobType: value })}
          radius="xl"
          size="md"
          style={{ flex: 1 }}
        />

        {/* 💰 Salary Range */}
        <div>
          <Text size="sm" fw={500} mb={4}>
            Salary Per Month ₹{formatSalary(filters.salaryRange[0])} – ₹{formatSalary(filters.salaryRange[1])}
          </Text>

          <RangeSlider
            min={min}
            max={max}
            step={1000}
            value={filters.salaryRange}
            onChange={(value) => setFilters({ ...filters, salaryRange: value })}
            color="black"
            radius="xl"
            size="sm"
            showLabelOnHover={false}
            styles={{
              bar: { height: 6 },
              thumb: { width: 16, height: 16 },
            }}
          />
        </div>
      </Group>
    </Box>
  );
}
