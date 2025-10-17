'use client';

import { useState } from 'react';

import { Group,Container, TextInput, Select, RangeSlider, Text, Stack} from '@mantine/core';
import { IconMapPin, IconUser, IconSearch } from "@tabler/icons-react";
export default function SearchBar(){
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [salaryRange, setSalaryRange] = useState([30000,120000]);
    
    const handleSearch = () => {
        console.log ('Search Query:', query);
        console.log('Location:', location);
        console.log('Job Type:', jobType);
        console.log('Salary Range:', salaryRange);
    };
    function formatSalary(value) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'K';
        }
        return value.toString();
        }

    
    return <>
    <Container>
        <Stack>
            <Group>
                <IconSearch size={16} color="grey"/><TextInput placeholder="Search By Job Title, Role" value={query} onChange={(e) => setQuery(e.currentTarget.value)}/>
                <IconMapPin size={16} color="grey"/><Select placeholder="Preferred Location" data={['Full-time', 'Part-time', 'Contract', 'Internship']} value={location} onChange={setLocation}/>
                <IconUser size={16} color="grey" /><Select placeholder="Job type" data={['Chennai','Bangalore','Hyderabad','Delhi','Remote']} value={jobType} onChange={setJobType}/>
                
                    <Text>
                    Salary Per Month
                    
                     ₹{formatSalary(salaryRange[0])} – ₹{formatSalary(salaryRange[1])}
                </Text>
                <div style={{ flexGrow: 1 }}>
                    <RangeSlider
                        value={salaryRange}
                        onChange={setSalaryRange}
                        min={10000}
                        max={200000}
                        step={1000}
                        label={(value) => `₹${formatSalary(value)}`}/>
            </div>
            </Group>
        </Stack>
    </Container>
    
    
    </>
};