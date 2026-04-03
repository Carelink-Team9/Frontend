import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { symptomTheme } from '../../theme/symptomTheme';

/** 비로그인 시 `/` 진입 화면 (Figma 4:1185, 토큰은 기존 TEST 파일과 동일 계열). */
export default function WelcomeGateScreen() {
  const { i18n, t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language.split('-')[0] ?? 'ko');

  const handleLangChange = (value: string) => {
    setLang(value);
    i18n.changeLanguage(value);
  };

  const handleLogin = () => {
    login();
    navigate('/', { replace: true });
  };

  return (
    <ThemeProvider theme={symptomTheme}>
      <div className="flex min-h-svh w-full justify-center bg-[#F3F4F6]">
        <div className="flex min-h-svh w-full max-w-[402px] flex-col bg-white shadow-xl">
          <div className="flex flex-1 flex-col items-center px-8 pt-16 pb-10">
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
            <Typography
              component="h1"
              sx={{
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: '-0.04em',
                color: 'text.primary',
                textAlign: 'center',
                mb: 2,
              }}
            >
              주변 병원을
              <br />
              빠르게 찾아보세요
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'text.secondary',
                textAlign: 'center',
                lineHeight: 1.55,
                mb: 4,
              }}
            >
              로그인하면 내 위치 기준
              <br />
              가까운 병원 정보를 확인할 수 있어요.
            </Typography>
            <FormControl size="small" fullWidth sx={{ maxWidth: 260, mb: 'auto' }}>
              <InputLabel id="welcome-lang-label">{t('language')}</InputLabel>
              <Select
                labelId="welcome-lang-label"
                label={t('language')}
                value={lang}
                onChange={(e) => handleLangChange(e.target.value as string)}
              >
                <MenuItem value="ko">한국어</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Tiếng Việt</MenuItem>
                <MenuItem value="uz">O&apos;zbek</MenuItem>
                <MenuItem value="zh">中文</MenuItem>
                <MenuItem value="th">ภาษาไทย</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                mt: 6,
                py: 1.75,
                borderRadius: '12px',
                fontSize: 16,
                boxShadow: '0 4px 14px rgba(41, 109, 255, 0.35)',
              }}
            >
              로그인하고 시작하기
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
