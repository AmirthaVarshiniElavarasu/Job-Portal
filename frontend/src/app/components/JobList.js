'use client';
import { useEffect, useState } from 'react';
import { Card, Text, Badge, Group, Button, Grid, Loader } from '@mantine/core';

export default function JobList({ jobs: filteredJobs = [] }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load all jobs initially
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        const data = await res.json();
        setJobs(data.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Update jobs when SearchBar sends filtered results
  useEffect(() => {
    if (filteredJobs && filteredJobs.length >= 0) {
      setJobs(filteredJobs);
    }
  }, [filteredJobs]);

  if (loading)
    return (
      <Loader
        size="xl"
        variant="bars"
        style={{ margin: '2rem auto', display: 'block' }}
      />
    );

  if (!jobs.length)
    return (
      <Text ta="center" mt="xl" c="dimmed">
        No jobs found
      </Text>
    );

  return (
    <Grid gutter="lg" p="md">
      {jobs.map((job) => (
        <Grid.Col key={job.id} span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{job.title}</Text>
              <Badge color="blue" variant="light">
                24h Ago
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {job.companyName} • {job.location}
            </Text>

            <Text size="sm" mt="xs" c="gray">
              💼 {job.jobType} | 💰 ₹{job.minSalary} - ₹{job.maxSalary}/mo
            </Text>

            <Text size="sm" mt="sm" lineClamp={2}>
              {job.description}
            </Text>

            <Button fullWidth mt="md" radius="md" color="blue">
              Apply Now
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
