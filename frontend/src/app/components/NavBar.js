'use client';
import { Group, Button, Container, Image } from '@mantine/core';

export default function Navbar({ onCreateJobClick }) {
  return (
    <div style={{ borderBottom: '1px solid #eee' }}>
      <Container py="sm">
        <Group justify="space-between" align="center">
       
          <Group>
            <Image src="/logo.png" alt="logo" width={40} height={40} radius="md" />
          </Group>

          <Group>
            <Button variant="subtle">Home</Button>
            <Button variant="subtle">Find Jobs</Button>
            <Button variant="subtle">Find Talents</Button>
            <Button variant="subtle">About us</Button>
            <Button variant="subtle">Testimonials</Button>

            
            <Button color="blue" radius="md" onClick={onCreateJobClick}>
              Create Job
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
