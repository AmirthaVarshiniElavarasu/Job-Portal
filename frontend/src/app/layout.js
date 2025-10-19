import '@mantine/core/styles.css';
import './globals.css';
import ClientProviders from './ClientProviders';

export const metadata = {
  title: 'Job Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
