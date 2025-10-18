'use client';
import { Box, Group, Button, Image, Paper } from '@mantine/core';

export default function Navbar({ onCreateJobClick }) {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 16, // Figma top offset
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
          paddingLeft: 24, 
          paddingRight: 24,
        }}
      >
        
        <Group style={{ flex: 1, justifyContent: 'space-between' }} >
          <Image src="/logo.png" alt="logo" w={50} h={50} radius="md" />
          <Button variant="subtle" c="#333" fw={500} fz="sm">
            Home
          </Button>
          <Button variant="subtle" c="#333" fw={500} fz="sm">
            Find Jobs
          </Button>
          <Button variant="subtle" c="#333" fw={500} fz="sm">
            Find Talents
          </Button>
          <Button variant="subtle" c="#333" fw={500} fz="sm">
            About Us
          </Button>
          <Button variant="subtle" c="#333" fw={500} fz="sm">
            Testimonials
          </Button>
        <Button
          radius={30}
          fw={600}
          fz="sm"
          variant="gradient"
          gradient={{ from: '#A128FF', to: '#6100AD', deg: 90 }}
          px={24}
          py={8}
          onClick={onCreateJobClick}
          styles={{
            label: { color: '#FFF' },
          }}
        >
          Create Job
        </Button>
         </Group>
      </Paper>
    </Box>
  );
}
