import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Collapse, IconButton, Stack } from '@mui/material';
import type { SymptomCategory } from '../../data/symptomCategories';

interface QuickSymptomSectionProps {
  categories: readonly SymptomCategory[];
  expanded: boolean;
  onToggleExpanded: () => void;
  selected: ReadonlySet<string>;
  onToggleSymptom: (label: string) => void;
}

export default function QuickSymptomSection({
  categories,
  expanded,
  onToggleExpanded,
  selected,
  onToggleSymptom,
}: QuickSymptomSectionProps) {
  return (
    <div className="w-full">
      <div className="h-5 w-full bg-[#F9F9FB]" aria-hidden />
      <div className="flex items-center justify-between px-8 pt-6">
        <h3 className="text-[18px] font-medium tracking-[-0.025em] text-black">빠른 증상 선택</h3>
        <IconButton
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          aria-label={expanded ? '빠른 증상 선택 접기' : '빠른 증상 선택 펼치기'}
          size="small"
          sx={{ p: 0.25 }}
        >
          <ExpandMoreIcon
            sx={{
              color: 'primary.main',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </IconButton>
      </div>
      <Collapse in={expanded}>
        <div className="flex flex-col gap-5 px-8 pb-8 pt-4">
          {categories.map((cat, index) => (
            <div key={cat.id}>
              <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                useFlexGap
                sx={{ gap: 1.25, rowGap: 1.25 }}
              >
                <span className="min-w-[100px] shrink-0 text-left text-[14px] font-medium leading-[1.5] tracking-[-0.025em] text-black">
                  {cat.label}
                </span>
                <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 1, flex: 1 }}>
                  {cat.symptoms.map((sym) => {
                    const isOn = selected.has(sym);
                    return (
                      <Chip
                        key={sym}
                        label={sym}
                        variant={isOn ? 'filled' : 'outlined'}
                        onClick={() => onToggleSymptom(sym)}
                        clickable
                        sx={{
                          height: 35,
                          px: '10px',
                          borderRadius: '17.5px',
                          bgcolor: isOn ? 'primary.main' : 'common.white',
                          color: isOn ? 'primary.contrastText' : 'text.primary',
                          borderColor: 'grey.900',
                          '& .MuiChip-label': {
                            px: 0,
                            fontSize: 14,
                            fontWeight: 500,
                            letterSpacing: '-0.025em',
                            lineHeight: 2.5,
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Stack>
              {index < categories.length - 1 ? (
                <div className="mt-5 h-px w-full bg-[#E5E7EB]" />
              ) : null}
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}
