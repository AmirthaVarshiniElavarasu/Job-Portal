'use client';

import {
    Modal,
    TextInput,
    Select,
    Textarea,
    Group,
    Button,
    Text,
    Stack,
    Grid,
    NumberInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

export default function CreateJobModal({ opened, onClose }) {
    const [form, setForm] = useState({
        title: '',
        companyName: '',
        location: '',
        jobType: '',
        salaryRange: [100000, 1200000],
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
            deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
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
                onClose();
            } else {
                alert(data.message || 'Error creating job');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to backend.');
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            size="lg"
            title={<Text fw={600} size="lg">Create Job Opening</Text>}
            styles={{ title: { textAlign: 'center', width: '100%' } }}

            radius="md"
        >
            <Stack gap="md">
                <Grid gutter="md">
                    <Grid.Col span={6}>
                        <TextInput
                            label="Job Title"
                            placeholder="Full Stack Developer"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.currentTarget.value)}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            label="Company Name"
                            placeholder="Amazon, Microsoft, Swiggy"
                            value={form.companyName}
                            onChange={(e) => handleChange('companyName', e.currentTarget.value)}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Select
                            label="Location"
                            placeholder="Choose Preferred Location"
                            data={['Chennai', 'Bangalore', 'Hyderabad', 'Delhi', 'Remote']}
                            value={form.location}
                            onChange={(value) => handleChange('location', value || '')}
                            rightSection={<IconChevronDown size={16} />}
                            comboboxProps={{ withinPortal: false }}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Select
                            label="Job Type"
                            placeholder="Full Time"
                            data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                            value={form.jobType}
                            onChange={(value) => handleChange('jobType', value || '')}
                            rightSection={<IconChevronDown size={16} />}
                            comboboxProps={{ withinPortal: false }}
                            radius="md"
                        />
                    </Grid.Col>


                    <Grid.Col span={6}>
                        <Text fw={500} mb={5}>
                            Salary Range
                        </Text>
                        <Group grow>
                            <NumberInput
                                value={form.salaryRange[0]}
                                onChange={(val) =>
                                    handleChange('salaryRange', [Number(val) || 0, form.salaryRange[1]])
                                }
                                min={0}
                                max={form.salaryRange[1]}
                                thousandSeparator=","
                                placeholder="₹ 1,00,000"
                                leftSection="↓↑"
                                radius="md"
                            />

                            <NumberInput
                                value={form.salaryRange[1]}
                                onChange={(val) =>
                                    handleChange('salaryRange', [
                                        form.salaryRange[0],
                                        Number(val) || form.salaryRange[0],
                                    ])
                                }
                                min={form.salaryRange[0]}
                                thousandSeparator=","
                                placeholder="₹ 12,00,000"
                                leftSection="↓↑"
                                radius="md"
                            />
                        </Group>
                    </Grid.Col>


                    <Grid.Col span={6}>
                        <DateInput
                            label="Application Deadline"
                            placeholder="Select date"
                            value={form.deadline}
                            onChange={(date) => handleChange('deadline', date)}
                            radius="md"
                        />
                    </Grid.Col>
                </Grid>

                <Textarea
                    label="Job Description"
                    placeholder="Please share a description to let the candidate know more about the job role"
                    minRows={4}
                    autosize={false}
                    size="md"
                    styles={{ input: { minHeight: 150 } }}
                    value={form.description}
                    onChange={(e) => handleChange('description', e.currentTarget.value)}
                    radius="md"
                />

                <Group justify="space-between" mt="md">
                    <Button
                        variant="default"
                        onClick={() => handleSubmit('Draft')}
                        radius="md"
                    >
                        Save Draft »
                    </Button>
                    <Button
                        color="blue"
                        onClick={() => handleSubmit('Published')}
                        radius="md"

                    >
                        Publish »
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}