import { Button } from '@mui/material';

interface RecommendActionBarProps {
  disabled: boolean;
  onClick?: () => void;
}

export default function RecommendActionBar({ disabled, onClick }: RecommendActionBarProps) {
  return (
    <div className="mt-auto w-full rounded-t-[10px] bg-white px-8 pb-10 pt-5 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <Button
        fullWidth
        variant="contained"
        disabled={disabled}
        onClick={onClick}
        sx={{
          height: 60,
          borderRadius: '10px',
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: '-0.025em',
          boxShadow: 'none',
          bgcolor: disabled ? '#F9F9FB' : 'primary.main',
          color: disabled ? '#D1D5DB' : 'primary.contrastText',
          '&.Mui-disabled': {
            bgcolor: '#F9F9FB',
            color: '#D1D5DB',
          },
          '&:not(.Mui-disabled)': {
            boxShadow: '0 4px 10px rgba(41, 109, 255, 0.25)',
          },
        }}
      >
        진료과 추천 받기
      </Button>
    </div>
  );
}
