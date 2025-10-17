'use client';
import { Group, Button, Container, Image } from '@mantine/core';

export default function Navbar(){
    return(
        <div>
            <Container >
                <Group>
                <Group >
                   <Image src="/logo.png" alt="logo" width={40} height={40} radius="md"></Image>
                </Group>
                <Group>
                    <Button variant='subtle'>Home</Button>
                    <Button variant='subtle'>Find Jobs</Button>
                    <Button variant='subtle'>Find Talents</Button>
                    <Button variant='subtle'>About us</Button>
                    <Button variant='subtle'>Testimonials</Button>
                    <Button> Create Jobs</Button>
                </Group>
                </Group>
            </Container>
        </div>
    )
}