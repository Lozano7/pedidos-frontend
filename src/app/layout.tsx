'use client';
import { StoreProvider } from '@/store/provider';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
