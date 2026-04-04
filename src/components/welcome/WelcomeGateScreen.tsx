import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { symptomTheme } from '../../theme/symptomTheme';

export default function WelcomeGateScreen() {
  const { i18n, t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language.split('-')[0] ?? 'ko');

  const handleLogin = async () => {
    await login(lang, '홍길동');
    navigate('/', { replace: true });
  };

  return (
    <ThemeProvider theme={symptomTheme}>
      <div className="flex min-h-svh w-full justify-center bg-[#F3F4F6]">
        <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">
          <div className="flex flex-1 flex-col items-center px-8 pb-10 pt-16">
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '32px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                boxShadow: '0 12px 40px rgba(41, 109, 255, 0.28)',
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 64, color: 'primary.contrastText' }} />
            </Box>
            <Typography component="h1" sx={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.04em', color: 'text.primary', textAlign: 'center', mb: 2 }}>
              {t('home.greeting')}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em', color: 'text.secondary', textAlign: 'center', lineHeight: 1.55, mb: 4 }}>
              {t('language.title')}
            </Typography>
            <FormControl size="small" fullWidth sx={{ maxWidth: 260, mb: 'auto' }}>
              <InputLabel id="welcome-lang-label">{t('language.subtitle')}</InputLabel>
              <Select labelId="welcome-lang-label" label={t('language.subtitle')} value={lang} onChange={(event) => void i18n.changeLanguage(event.target.value as string).then(() => setLang(event.target.value as string))}>
                <MenuItem value="ko">{t('language.ko')}</MenuItem>
                <MenuItem value="en">{t('language.en')}</MenuItem>
                <MenuItem value="vi">{t('language.vi')}</MenuItem>
                <MenuItem value="uz">{t('language.uz')}</MenuItem>
                <MenuItem value="zh">{t('language.zh')}</MenuItem>
                <MenuItem value="th">{t('language.th')}</MenuItem>
                <MenuItem value="ja">{t('language.ja')}</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" size="large" onClick={() => void handleLogin()} sx={{ mt: 6, py: 1.75, borderRadius: '12px', fontSize: 16, boxShadow: '0 4px 14px rgba(41, 109, 255, 0.35)' }}>
              {t('common.continue')}
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
