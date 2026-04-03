import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { symptomTheme } from '../../theme/symptomTheme';

interface AppPageShellProps {
  title: string;
  children: ReactNode;
  /** 기본: 이전 히스토리, 없으면 홈 */
  backTo?: string;
}

export default function AppPageShell({ title, children, backTo }: AppPageShellProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
      return;
    }
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <ThemeProvider theme={symptomTheme}>
      <div className="flex min-h-svh w-full flex-col bg-[#F3F4F6]">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center border-b border-[#D1D5DB] bg-white px-2">
          <IconButton type="button" aria-label="뒤로" onClick={handleBack} size="small" sx={{ p: 1 }}>
            <ArrowBackIosNewIcon sx={{ fontSize: 18, color: 'grey.900' }} />
          </IconButton>
          <Typography
            component="h1"
            sx={{
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: 'grey.900',
              pr: 5,
            }}
          >
            {title}
          </Typography>
        </header>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </ThemeProvider>
  );
}
