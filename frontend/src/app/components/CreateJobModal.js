'use client';
import {
  Modal,
  TextInput,
  Select,
  Textarea,
  Group,
  Button,
  RangeSlider,
  Text,
  Stack,
  Grid,
  Divider,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

export default function CreateJobModal({ opened, onClose }) {
  const [form, setForm] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryRange: [30000, 120000],
    deadline: null,
    description: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (status) => {
    const payload = {
      title: form.title,
      companyName: form.companyName,
      location: form.location,
      jobType: form.jobType,
      minSalary: form.salaryRange[0],
      maxSalary: form.salaryRange[1],
      description: form.description,
      status,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Job ${status === 'Draft' ? 'saved' : 'published'} successfully`);
        onClose(); // close modal
      } else {
        alert(data.message || 'Error creating job');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend.');
    }
  };

  const formatSalary = (value) => {
    if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
    if (value >= 1000) return Math.round(value / 1000) + 'K';
    return value.toString();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Job Opening" centered size="lg">
      <Stack>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              value={form.title}
              onChange={(e) => handleChange('title', e.currentTarget.value)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Company Name"
              placeholder="Amazon"
              value={form.companyName}
              onChange={(e) => handleChange('companyName', e.currentTarget.value)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              label="Location"
              placeholder="Select Location"
              data={['Chennai', 'Bangalore', 'Hyderabad', 'Delhi', 'Remote']}
              value={form.location}
              onChange={(value) => handleChange('location', value)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              label="Job Type"
              placeholder="Select Type"
              data={['Full-time', 'Part-time', 'Contract', 'Internship']}
              value={form.jobType}
              onChange={(value) => handleChange('jobType', value)}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mt="sm">
              Salary Range — ₹{formatSalary(form.salaryRange[0])} – ₹{formatSalary(form.salaryRange[1])}
            </Text>
            <RangeSlider
              value={form.salaryRange}
              onChange={(v) => handleChange('salaryRange', v)}
              min={10000}
              max={200000}
              step={5000}
              mt={5}
              label={(value) => `₹${formatSalary(value)}`}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <DateInput
              label="Application Deadline"
              placeholder="Select date"
              value={form.deadline}
              onChange={(date) => handleChange('deadline', date)}
            />
          </Grid.Col>
        </Grid>

        <Divider my="sm" />

        <Textarea
          label="Job Description"
          placeholder="Please share a description to let the candidate know more about the role"
          minRows={4}
          value={form.description}
          onChange={(e) => handleChange('description', e.currentTarget.value)}
        />

        <Group justify="space-between" mt="md">
          <Button variant="default" onClick={() => handleSubmit('Draft')} radius="md">
            Save Draft
          </Button>
          <Button color="blue" onClick={() => handleSubmit('Published')} radius="md">
            Publish »
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
