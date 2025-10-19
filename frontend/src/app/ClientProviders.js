'use client';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function ClientProviders({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        fontFamily: 'Satoshi, sans-serif',
      }}>
      <DatesProvider settings={{ locale: 'en' }}>
        {children}
      </DatesProvider>
    </MantineProvider>
  );
}
