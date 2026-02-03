import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  TextField, 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  PanelLeft, 
  Plus, 
  Search, 
  MessageSquare, 
  LogOut, 
  Moon, 
  Sun,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const SidebarContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette?.mode === 'dark' ? '#1e293b' : '#f8fafc',
  borderRight: `1px solid ${theme.palette?.divider ?? '#e0e0e0'}`,
  transition: 'width 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
}));

const GradientAvatar = styled(Avatar)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  color: '#ffffff',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  },
});

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  borderRadius: 8,
  margin: '4px 8px',
  padding: '10px 12px',
  backgroundColor: isActive 
    ? theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(226, 232, 240, 0.8)'
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(148, 163, 184, 0.1)' 
      : 'rgba(226, 232, 240, 0.6)',
  },
}));

export function ChatSidebar({ 
  chats, 
  currentChatId, 
  onSelectChat, 
  onNewChat,
  isCollapsed,
  onToggleCollapse 
}: ChatSidebarProps) {
  const { logout, username } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarContainer sx={{ width: isCollapsed ? 64 : 320 }}>
      {/* Expanded Content */}
      <Box 
        sx={{ 
          opacity: isCollapsed ? 0 : 1, 
          pointerEvents: isCollapsed ? 'none' : 'auto',
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <GradientAvatar sx={{ width: 32, height: 32 }}>
                <Sparkles size={16} />
              </GradientAvatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                SDM AI
              </Typography>
            </Box>
            <IconButton onClick={onToggleCollapse} size="small">
              <PanelLeft size={20} />
            </IconButton>
          </Box>
          
          <GradientButton 
            fullWidth
            startIcon={<Plus size={18} />}
            onClick={onNewChat}
            sx={{ mb: 2 }}
          >
            New chat
          </GradientButton>

          <TextField
            fullWidth
            size="small"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider />

        {/* Chat History */}
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            py: 1,
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: (theme) => 
                theme.palette.mode === 'dark' 
                  ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.6) 100%)'
                  : 'linear-gradient(180deg, rgba(241, 245, 249, 0.6) 0%, rgba(226, 232, 240, 0.8) 100%)',
              borderRadius: '12px',
              margin: '6px',
              boxShadow: (theme) => 
                theme.palette.mode === 'dark'
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: (theme) => 
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
                  : 'linear-gradient(180deg, #6366f1 0%, #a855f7 50%, #f472b6 100%)',
              borderRadius: '12px',
              border: (theme) => 
                theme.palette.mode === 'dark'
                  ? '2px solid rgba(15, 23, 42, 0.7)'
                  : '2px solid rgba(241, 245, 249, 0.9)',
              boxShadow: (theme) => 
                theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 4px 12px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: (theme) => 
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)'
                  : 'linear-gradient(180deg, #4f46e5 0%, #9333ea 50%, #e11d48 100%)',
              boxShadow: (theme) => 
                theme.palette.mode === 'dark'
                  ? '0 6px 16px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  : '0 6px 16px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
              transform: 'scale(1.05)',
            },
            '&::-webkit-scrollbar-thumb:active': {
              transform: 'scale(0.95)',
              boxShadow: (theme) => 
                theme.palette.mode === 'dark'
                  ? '0 2px 8px rgba(59, 130, 246, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 2px 8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {chats.length === 0 ? (
            <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No chats yet. Start a new conversation!
              </Typography>
            </Box>
          ) : (() => {
            const filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase()));
            return filteredChats.length === 0 ? (
              <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No chats match your search.
                </Typography>
              </Box>
            ) : (
              <List sx={{ py: 0 }}>
                {filteredChats.map((chat) => (
                  <StyledListItemButton
                    key={chat.id}
                    isActive={currentChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <MessageSquare size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" noWrap>
                          {chat.title.length > 35 ? `${chat.title.substring(0, 35)}...` : chat.title}
                        </Typography>
                      }
                    />
                  </StyledListItemButton>
                ))}
              </List>
            );
          })()}
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ p: 1.5 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              p: 1.5, 
              borderRadius: 2,
              backgroundColor: theme === 'dark' 
                ? 'rgba(148, 163, 184, 0.1)' 
                : 'rgba(226, 232, 240, 0.6)',
              mb: 1.5
            }}
          >
            <GradientAvatar sx={{ width: 32, height: 32 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {username.charAt(0).toUpperCase()}
              </Typography>
            </GradientAvatar>
            <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }} noWrap>
              {username}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<LogOut size={16} />}
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Collapsed Content */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: 64, 
          height: '100%', 
          opacity: isCollapsed ? 1 : 0, 
          pointerEvents: isCollapsed ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '16px 0', 
          gap: '16px',
          backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc',
        }}
      >
        <IconButton onClick={onToggleCollapse} color="primary">
          <PanelLeft size={20} />
        </IconButton>
        <IconButton onClick={onNewChat} color="primary">
          <Plus size={20} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <IconButton onClick={toggleTheme} color="primary">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
        <GradientAvatar sx={{ width: 24, height: 24 }}>
          <Typography variant="caption" sx={{ fontSize: '10px', fontWeight: 600 }}>
            {username.charAt(0).toUpperCase()}
          </Typography>
        </GradientAvatar>
        <IconButton onClick={logout} color="primary">
          <LogOut size={20} />
        </IconButton>
      </Box>
    </SidebarContainer>
  );
}
