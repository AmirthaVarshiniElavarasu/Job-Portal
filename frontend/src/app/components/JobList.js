'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Grid,
  Loader,
  Image,
  Center,
} from '@mantine/core';

/* ----------------------- CompanyLogo Component ----------------------- */
function CompanyLogo({ companyName, size = 70 }) {
  const [logoSrc, setLogoSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!companyName) return;

    const cleanName = companyName.toLowerCase().replace(/\s+/g, '');
    const imagePath = `/company_logos/${cleanName}.png`;

    // Check if image exists in /public/company_logos
    fetch(imagePath)
      .then((res) => {
        if (res.ok) setLogoSrc(imagePath);
        else setLogoSrc('/default-logo.png'); // fallback
        setIsLoading(false);
      })
      .catch(() => {
        setLogoSrc('/default-logo.png'); // fallback
        setIsLoading(false);
      });
  }, [companyName]);

  if (isLoading) {
    return (
      <Center>
        <Loader size="xs" />
      </Center>
    );
  }

  return (
    <Image
      src={logoSrc}
      alt={`${companyName} logo`}
      width={size}
      height={size}
      radius={size}
      fit="contain"
    />
  );
}

/* ----------------------------- Main JobList ----------------------------- */
export default function JobList({ jobs: filteredJobs = [] }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all jobs initially
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

  // Update jobs when SearchBar sends filtered results
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
        <Grid.Col key={job.id} span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* -------- Logo (Top-Left Corner) -------- */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                // boxShadow: '0px .5px 12px rgba(0, 0, 0, 0.5)',
                background: 'transparent',
                radius:'10px'
              }}
            >
              <CompanyLogo  companyName={job.companyName} size={60} />
            </div>

            {/* -------- Badge (Top-Right Corner) -------- */}
            <Badge
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                textTransform: 'capitalize',
                backgroundColor: '#B0D9FF',
                color: '#000',
                height: 30,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              variant="light"
              radius={10}
            >
              24h Ago
            </Badge>

            {/* -------- Job Title + Details -------- */}
            <div style={{ marginTop: 80 }}> {/* push content below logo */}
              <Text size="xl" fw={600}>
                {job.title}
              </Text>
              <Text size="sm" c="dimmed" mt={4}>
                {job.companyName} • {job.location}
              </Text>

              {/* Job Info */}
              <Group gap="sm" mt="xs" align="center" wrap="nowrap">
                {/* Job Type */}
                <Group gap={4} align="center">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7 14.75C11.7 12.7618 9.28233 11.15 6.29999 11.15C3.31766 11.15 0.899994 12.7618 0.899994 14.75M15.3 12.05V9.35M15.3 9.35V6.65M15.3 9.35H12.6M15.3 9.35H18M6.29999 8.45C4.31177 8.45 2.69999 6.83822 2.69999 4.85C2.69999 2.86177 4.31177 1.25 6.29999 1.25C8.28822 1.25 9.89999 2.86177 9.89999 4.85C9.89999 6.83822 8.28822 8.45 6.29999 8.45Z"
                      stroke="#5A5A5A"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Text size="sm" c="gray">
                    {job.jobType}
                  </Text>
                </Group>

                {/* Location Type */}
                <Group gap={4} align="center">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.76364 16.3408H3.49091M3.49091 16.3408H12.1273M3.49091 16.3408V4.42274C3.49091 3.45538 3.49091 2.97133 3.67918 2.60185C3.84478 2.27684 4.10882 2.0128 4.43383 1.8472C4.80331 1.65894 5.28736 1.65894 6.25472 1.65894H9.36381C10.3312 1.65894 10.8142 1.65894 11.1837 1.8472C11.5087 2.0128 11.7736 2.27684 11.9392 2.60185C12.1273 2.97097 12.1273 3.45443 12.1273 4.4199V9.43166M12.1273 16.3408H17.3091M12.1273 16.3408V9.43166M17.3091 16.3408H19.0364M17.3091 16.3408V9.43166C17.3091 8.62686 17.309 8.22465 17.1775 7.90723C17.0022 7.484 16.6663 7.14754 16.243 6.97223C15.9256 6.84075 15.5228 6.84075 14.718 6.84075C13.9132 6.84075 13.5108 6.84075 13.1933 6.97223C12.7701 7.14754 12.4341 7.484 12.2588 7.90723C12.1273 8.22465 12.1273 8.62685 12.1273 9.43166M6.08182 7.70439H9.53637M6.08182 5.11348H9.53637"
                      stroke="#5A5A5A"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Text size="sm" c="gray">
                    {job.location === 'Remote' ? 'Remote' : 'Onsite'}
                  </Text>
                </Group>

                {/* Salary */}
                <Group gap={4} align="center">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.1728 10.0001L8.99096 15.4546L0.809143 10.0001M17.1728 13.6365L8.99096 19.091L0.809143 13.6365M17.1728 6.36373L8.99096 11.8183L0.809143 6.36373L8.99096 0.90918L17.1728 6.36373Z"
                      stroke="#5A5A5A"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Text size="sm" c="gray">
                    {Math.round(Number(job.minSalary) / 100000)} -{' '}
                    {Math.round(Number(job.maxSalary) / 100000)} LPA
                  </Text>
                </Group>
              </Group>

              {/* Description */}
              <Text size="sm" mt="sm" lineClamp={2}>
                {job.description}
              </Text>

              {/* Apply Button */}
              <Button fullWidth mt="md" radius="md" color="blue">
                Apply Now
              </Button>
            </div>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
