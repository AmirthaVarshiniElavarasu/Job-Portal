'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Group,
  Button,
  Image,
  Paper,
  TextInput,
  Select,
  RangeSlider,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

/* ------------------------- Navbar + SearchBar ------------------------- */
export default function Navbar({ onCreateJobClick, onFilter }) {
  const theme = useMantineTheme();

  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [0, 0],
  });
  const [salaryRange, setSalaryRange] = useState([0, 0]);

  /* Format salary display */
  const formatSalary = (value) => {
    if (!value || isNaN(value)) return '0';
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `${Math.round(value / 1000)}k`;
    return value.toString();
  };


  /* Handle auto-search */
  const handleAutoSearch = async () => {
    try {
      const params = {
        title: filters.title || '',
        location: filters.location || '',
        jobType: filters.jobType || '',
        minSalary: filters.salaryRange[0] || '',
        maxSalary: filters.salaryRange[1] || '',
      };

      console.log('Searching with:', params);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/search`,
        { params }
      );

      if (onFilter) onFilter(response.data.data);
      console.log('Jobs fetched:', response.data.count);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  /* Fetch salary range on mount */
  useEffect(() => {
    const fetchSalaryRange = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/salary-range`
        );
        const { minSalary, maxSalary } = response.data.data;

        const min = Number(minSalary) || 10000;
        const max = Number(maxSalary) || 200000;

        setSalaryRange([min, max]);
        setFilters((prev) => ({ ...prev, salaryRange: [min, max] }));
        handleAutoSearch(); // Initial job load
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

  /*  Debounced search updates */
  useEffect(() => {
    const debounce = setTimeout(() => {
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
    <Box>
      {/* ------------------- Top Navbar ------------------- */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 16,
        }}
      >
        <Paper
          withBorder
          shadow="sm"
          radius={122}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #FCFCFC',
            boxShadow: '0 0 20px rgba(127, 127, 127, 0.15)',
            width: 890,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Group style={{ flex: 1, justifyContent: 'space-between' }}>
            <Image
              src="/company_logos/cyberminds.png"
              alt="logo"
              w={50}
              h={50}
              radius="md"
            />
            <Button className='navbar_button'>
              Home
            </Button>
            <Button className='navbar_button'>
              Find Jobs
            </Button>
            <Button className='navbar_button' >
              Find Talents
            </Button>
            <Button className='navbar_button'>
              About Us
            </Button>
            <Button className='navbar_button'>
              Testimonials
            </Button>
            <Button className='create-job'
              radius={30}
              fw={600}
              fz="sm"
              variant="gradient"
              gradient={{ from: '#A128FF', to: '#6100AD', deg: 90 }}
              px={24}
              py={8}
              onClick={onCreateJobClick}
              styles={{ label: { color: '#FFF' } }}
            >
              Create Job
            </Button>
          </Group>
        </Paper>
      </Box>

      {/* ------------------- Search Bar ------------------- */}
      <Box
        maw={1800}
        mx="auto"
        mt="lg"
        p="md"
        style={{

          height: '80px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          boxShadow: '0px 08px 10px rgba(0, 0, 0, 0.1)',

        }}
      >
        <Group
          justify="center"
          wrap="nowrap"
          gap="md"
          style={{ width: '90%', alignItems: 'center' }}
        >
          {/* Job Title Search */}
          <TextInput
            variant="unstyled"
            placeholder="  Search by Job Title, Role"
            leftSection={<IconSearch size={20} />}
            value={filters.title}
            onChange={(e) =>
              setFilters({ ...filters, title: e.target.value })
            }
            radius="xl"
            size="md"
            fw={500}
            style={{ flex: 1 }}
          />

          {/* Divider */}
          <Box
            style={{
              width: '0px',
              height: '34px',
              borderLeft: `2px solid ${theme.colors.gray[5]}`,
              opacity: 0.7,
            }}
          />

          {/* Location */}
          <Select
            variant="unstyled"
            placeholder="  Preferred Location"
            data={[
              'Chennai',
              'Bangalore',
              'Hyderabad',
              'Delhi',
              'Remote',
            ]}
            value={filters.location}
            leftSection={<svg width="18" height="18" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7808 19.7005L11.1906 19.2377L11.7808 19.7005ZM6.21921 19.7005L5.62903 20.1633L6.21921 19.7005ZM9 22.0055V21.2555V22.0055ZM16.25 9.6087C16.25 10.8352 15.6104 12.4764 14.6037 14.256C13.6137 16.0063 12.3342 17.7794 11.1906 19.2377L12.371 20.1633C13.5371 18.6762 14.8672 16.837 15.9094 14.9945C16.9349 13.1814 17.75 11.2494 17.75 9.6087H16.25ZM6.80938 19.2377C5.66578 17.7794 4.38628 16.0063 3.39625 14.256C2.38962 12.4764 1.75 10.8352 1.75 9.6087H0.25C0.25 11.2494 1.06511 13.1814 2.09064 14.9945C3.13277 16.837 4.46288 18.6762 5.62903 20.1633L6.80938 19.2377ZM1.75 9.6087C1.75 5.21571 5.04678 1.75 9 1.75V0.25C4.11666 0.25 0.25 4.49277 0.25 9.6087H1.75ZM9 1.75C12.9532 1.75 16.25 5.21571 16.25 9.6087H17.75C17.75 4.49277 13.8833 0.25 9 0.25V1.75ZM11.1906 19.2377C10.5717 20.027 10.1641 20.5426 9.79918 20.8741C9.46635 21.1764 9.24418 21.2555 9 21.2555V22.7555C9.72906 22.7555 10.2948 22.4504 10.8078 21.9844C11.2886 21.5476 11.7849 20.9107 12.371 20.1633L11.1906 19.2377ZM5.62903 20.1633C6.21511 20.9107 6.71136 21.5476 7.19224 21.9844C7.70524 22.4504 8.27094 22.7555 9 22.7555V21.2555C8.75582 21.2555 8.53365 21.1764 8.20082 20.8741C7.83587 20.5426 7.42834 20.027 6.80938 19.2377L5.62903 20.1633ZM5.25 10C5.25 12.0711 6.92893 13.75 9 13.75V12.25C7.75736 12.25 6.75 11.2426 6.75 10H5.25ZM9 13.75C11.0711 13.75 12.75 12.0711 12.75 10H11.25C11.25 11.2426 10.2426 12.25 9 12.25V13.75ZM12.75 10C12.75 7.92893 11.0711 6.25 9 6.25V7.75C10.2426 7.75 11.25 8.75736 11.25 10H12.75ZM9 6.25C6.92893 6.25 5.25 7.92893 5.25 10H6.75C6.75 8.75736 7.75736 7.75 9 7.75V6.25Z" fill="#686868" />
            </svg>
            }
            onChange={(value) =>
              setFilters({ ...filters, location: value })
            }
            radius="xl"
            size="md"
            fw={500}
            style={{ flex: 1 }}
          />

          {/* Divider */}
          <Box
            style={{
              width: '0px',
              height: '34px',
              borderLeft: `2px solid ${theme.colors.gray[5]}`,
              opacity: 0.7,
            }}
          />

          {/* Job Type */}
          <Select
            variant="unstyled"
            placeholder="   Job Type"
            data={['Full-time', 'Part-time', 'Contract', 'Internship']}
            leftSection={<svg width="18" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 17C13 14.7909 10.3137 13 7 13C3.68629 13 1 14.7909 1 17M14.8281 3.17188C15.1996 3.54331 15.4942 3.98427 15.6952 4.46957C15.8962 4.95487 15.9999 5.47533 15.9999 6.00062C15.9999 6.52591 15.8963 7.04497 15.6953 7.53027C15.4943 8.01558 15.1996 8.45705 14.8281 8.82848M17 1C17.6566 1.65661 18.1775 2.43612 18.5328 3.29402C18.8882 4.15192 19.0718 5.07127 19.0718 5.99985C19.0718 6.92844 18.8886 7.84815 18.5332 8.70605C18.1778 9.56396 17.6566 10.3435 17 11.0001M7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6C11 8.20914 9.20914 10 7 10Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            }
            value={filters.jobType}
            onChange={(value) =>
              setFilters({ ...filters, jobType: value })
            }
            radius="xl"
            size="md"
            fw={500}
            style={{ flex: 1, }}
          />

          {/* Divider */}
          <Box
            style={{
              width: '0px',
              height: '34px',
              borderLeft: `2px solid ${theme.colors.gray[5]}`,
              opacity: 0.7,
            }}
          />

          {/* Salary Range */}
          <div style={{ flex: 1 }}>
            <Group justify="space-between" mb={4}>
              <Text size="lg" fw={600}>
                Salary Per Month
              </Text>
              <Text fw={500} color="dimmed">
                ₹{formatSalary(Math.round(filters.salaryRange[0] / 12))} – ₹
                {formatSalary(Math.round(filters.salaryRange[1] / 12))}
              </Text>
            </Group>

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
                root: { maxWidth: 320 }, // limits width for balance
                track: { height: 3 },
                bar: { height: 3 },
                thumb: {
                  width: 14,
                  height: 14,
                  border: '4px solid black',
                  backgroundColor: '#fff',
                },
              }}
            />
          </div>

        </Group>
      </Box>
    </Box>
  );
}
