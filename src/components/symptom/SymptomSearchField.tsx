import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

interface SymptomSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmitCustom?: (raw: string) => void;
}

export default function SymptomSearchField({
  value,
  onChange,
  onSubmitCustom,
}: SymptomSearchFieldProps) {
  return (
    <div className="w-full px-8">
      <h3 className="mb-3 text-left text-[18px] font-medium tracking-[-0.025em] text-black">
        증상 검색하기
      </h3>
      <p className="mb-3 text-left text-[14px] font-medium tracking-[-0.025em] text-[#6B7280]">
        증상을 검색하시거나 직접 추가해보세요.
      </p>
      <TextField
        fullWidth
        placeholder="증상 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmitCustom) {
            const q = value.trim();
            if (q) onSubmitCustom(q);
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500', fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: 52,
            borderRadius: '8px',
            bgcolor: '#F3F4F6',
            '& fieldset': { border: 'none' },
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)',
          },
          '& .MuiInputBase-input': {
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '-0.025em',
          },
        }}
      />
    </div>
  );
}
