import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface SymptomAppHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function SymptomAppHeader({
  title,
  currentStep,
  totalSteps,
  onBack,
}: SymptomAppHeaderProps) {
  return (
    <header className="relative flex h-[70px] w-full shrink-0 items-center border-b border-[#D1D5DB] bg-white px-8">
      <IconButton
        type="button"
        onClick={onBack}
        aria-label="뒤로"
        size="small"
        sx={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', p: 0.5 }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16, color: 'grey.900' }} />
      </IconButton>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          mx: 'auto',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '-0.05em',
          color: 'grey.900',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.25,
          height: 22,
          px: 1.25,
          borderRadius: '11px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          typography: 'caption',
          fontWeight: 500,
        }}
      >
        <Typography component="span" sx={{ fontSize: 12, letterSpacing: '0.02em' }}>
          STEP
        </Typography>
        <Typography component="span" sx={{ fontSize: 12, fontWeight: 700 }}>
          {currentStep}
        </Typography>
        <Typography component="span" sx={{ fontSize: 12, fontWeight: 700 }}>
          /
        </Typography>
        <Typography component="span" sx={{ fontSize: 12, fontWeight: 700 }}>
          {totalSteps}
        </Typography>
      </Box>
    </header>
  );
}
