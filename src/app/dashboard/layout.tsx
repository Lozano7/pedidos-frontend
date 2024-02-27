'use client';
import { loginSuccess } from '@/store/features/authSlice';
import { JSONPayload } from '@/store/features/users/interfaces/user-response.interface';
import { useAppDispatch } from '@/store/hooks';
import { Box, Container, styled } from '@mui/material';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isValidateToken, setIsValidateToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('x-token');

    if (token) {
      const decodedToken: JSONPayload = jwt.decode(token) as JSONPayload;
      if (decodedToken.roles.length === 0) {
        setIsValidateToken(true);
      } else {
        const { sub, exp, iat, ...others } = decodedToken;
        dispatch(loginSuccess(others));
      }
    } else {
      setIsValidateToken(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // aqui redirigir a /
  if (isValidateToken) redirect('/');

  return (
    <MainWrapper className='mainwrapper'>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className='page-wrapper'>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
