import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Avatar,
  CircularProgress,
  Paper,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send, Sparkles } from 'lucide-react';
import { ChartResponse } from './ChartResponse';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hasCharts?: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  flex: 1,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '32px 16px',
  // Custom scrollbar styling
  scrollbarWidth: 'thin',
  scrollbarColor: theme.palette.mode === 'dark' 
    ? 'rgba(100, 116, 139, 0.3) rgba(30, 41, 59, 0.2)'
    : 'rgba(203, 213, 225, 0.5) rgba(241, 245, 249, 0.3)',
  // Webkit scrollbar (Chrome, Safari, Edge)
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(30, 41, 59, 0.2)' 
      : 'rgba(241, 245, 249, 0.3)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(100, 116, 139, 0.3)' 
      : 'rgba(203, 213, 225, 0.5)',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(100, 116, 139, 0.5)' 
        : 'rgba(203, 213, 225, 0.8)',
    },
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
  padding: '16px',
}));

const UserMessageBubble = styled(Box)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  color: 'white',
  borderRadius: 16,
  padding: '12px 20px',
  maxWidth: '85%',
  wordWrap: 'break-word',
});

const AssistantMessageContainer = styled(Box)({
  maxWidth: '85%',
});

const AssistantMessageBubble = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)' 
    : 'rgba(248, 250, 252, 0.9)',
  borderRadius: 16,
  padding: '16px 20px',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(148, 163, 184, 0.2)'
    : '1px solid rgba(226, 232, 240, 0.8)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
    : '0 4px 20px rgba(0, 0, 0, 0.06)',
}));

const GradientAvatar = styled(Avatar)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  width: 32,
  height: 32,
});

const WelcomeCard = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(148, 163, 184, 0.05)' 
      : 'rgba(226, 232, 240, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
}));

const SendButton = styled(IconButton)({
  borderRadius: 30,
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  color: 'white',
  '&:hover': {
    borderRadius: 30,
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  },
  '&:disabled': {
    opacity: 0.5,
    borderRadius: 30,
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  },
});

export function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <ChatContainer>
      {/* Messages Area */}
      <MessagesContainer ref={scrollRef}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {messages.length === 0 ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center'
              }}
            >
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mb: 3,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Sparkles size={40} />
              </Avatar>
              
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
                Welcome to SDM GEN-AI
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mb: 4 }}>
                Your intelligent assistant for Service Desk Management analytics and insights.
              </Typography>

              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                  gap: 2, 
                  maxWidth: 800 
                }}
              >
                <WelcomeCard
                  elevation={0}
                  onClick={() => onSendMessage('Give SDM PIE chart and bar graph for last annual maintenance')}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Annual Maintenance Report
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    View pie charts and bar graphs
                  </Typography>
                </WelcomeCard>

                <WelcomeCard
                  elevation={0}
                  onClick={() => onSendMessage('Show me incident trends')}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Incident Trends
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Analyze incident patterns
                  </Typography>
                </WelcomeCard>

                <WelcomeCard
                  elevation={0}
                  onClick={() => onSendMessage('What are the top issues?')}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Top Issues
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Identify common problems
                  </Typography>
                </WelcomeCard>

                <WelcomeCard
                  elevation={0}
                  onClick={() => onSendMessage('Generate resolution report')}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Resolution Report
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Review performance metrics
                  </Typography>
                </WelcomeCard>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' 
                  }}
                >
                  {message.role === 'user' ? (
                    <UserMessageBubble>
                      <Typography variant="body1">
                        {message.content}
                      </Typography>
                    </UserMessageBubble>
                  ) : (
                    <AssistantMessageContainer>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <GradientAvatar>
                          <Sparkles size={16} />
                        </GradientAvatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          SDM AI Assistant
                        </Typography>
                      </Box>
                      {message.hasCharts ? (
                        <ChartResponse />
                      ) : (
                        <AssistantMessageBubble>
                          <Typography 
                            variant="body1" 
                            sx={{ whiteSpace: 'pre-wrap' }}
                          >
                            {message.content}
                          </Typography>
                        </AssistantMessageBubble>
                      )}
                    </AssistantMessageContainer>
                  )}
                </Box>
              ))}
            </Box>
          )}
          
          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
              <GradientAvatar>
                <Sparkles size={16} />
              </GradientAvatar>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Analyzing your request...
              </Typography>
            </Box>
          )}
        </Box>
      </MessagesContainer>

      {/* Input Area */}
      <InputContainer>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ position: 'relative' }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about SDM analytics, reports, or incidents..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  paddingRight: '60px',
                },
              }}
            />
            <SendButton
              type="submit"
              disabled={!input.trim() || isLoading}
              sx={{
                position: 'absolute',
                right: 8,
                bottom: 8,
              }}
            >
              <Send size={18} />
            </SendButton>
          </Box>
          
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}
          >
            AI-powered insights for Service Desk Management
          </Typography>
        </Box>
      </InputContainer>
    </ChatContainer>
  );
}