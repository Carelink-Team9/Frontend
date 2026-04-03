import CloseIcon from '@mui/icons-material/Close';
import { Chip, Stack } from '@mui/material';

interface SelectedSymptomChipsProps {
  selected: readonly string[];
  onRemove: (label: string) => void;
}

export default function SelectedSymptomChips({ selected, onRemove }: SelectedSymptomChipsProps) {
  return (
    <div className="px-8 pt-6">
      <h3 className="mb-3 text-left text-[18px] font-medium tracking-[-0.025em] text-black">
        선택한 증상
      </h3>
      <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 1.25 }}>
        {selected.map((label) => (
          <Chip
            key={label}
            label={label}
            onDelete={() => onRemove(label)}
            deleteIcon={<CloseIcon sx={{ fontSize: 14, color: 'common.white' }} />}
            sx={{
              height: 35,
              pl: '15px',
              pr: '10px',
              borderRadius: '20px',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              border: '1px solid',
              borderColor: 'primary.main',
              '& .MuiChip-label': {
                px: 0,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '-0.025em',
                lineHeight: 2.5,
              },
              '& .MuiChip-deleteIcon': {
                ml: 0.5,
                mr: 0,
              },
            }}
          />
        ))}
      </Stack>
    </div>
  );
}
