import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  transition: 'background 0.3s ease',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 460,
  width: '100%',
  margin: '0 16px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 60px rgba(0, 0, 0, 0.5)'
    : '0 20px 60px rgba(0, 0, 0, 0.12)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(148, 163, 184, 0.2)'
    : '1px solid rgba(226, 232, 240, 1)',
}));

const GradientAvatar = styled(Avatar)({
  width: 64,
  height: 64,
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 700,
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  color: '#ffffff',
  padding: '12px 24px',
  fontSize: '15px',
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
  '&:hover': {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
  },
  '&:disabled': {
    opacity: 0.6,
  },
});

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <GradientBackground>
      <Container maxWidth="sm">
        <StyledCard>
          <CardContent sx={{ padding: '48px 40px !important' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <GradientAvatar sx={{ margin: '0 auto 24px' }}>
                <Sparkles size={32} color="white" />
              </GradientAvatar>
              <GradientText variant="h4" sx={{ mb: 1.5 }}>
                SDM GEN-AI Dashboard
              </GradientText>
              <Typography variant="body1" color="text.secondary">
                Sign in to access your AI-powered analytics
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                autoComplete="username"
                sx={{ mb: 2, '& .MuiInputBase-root': { height: '55px' } }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                autoComplete="current-password"
                sx={{ mb: 2, '& .MuiInputBase-root': { height: '55px' } }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <GradientButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In
              </GradientButton>

              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', textAlign: 'center' }}
              >
                Demo: Use any username and password to login
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </GradientBackground>
  );
}
