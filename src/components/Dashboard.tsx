import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ChatSidebar } from './ChatSidebar';
import { ChatInterface, Message } from './ChatInterface';


interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

export function Dashboard() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleSendMessage = async (content: string) => {
    let chatId = currentChatId;
    
    // If no current chat, create one
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.slice(0, 50),
        messages: [],
        timestamp: new Date(),
      };
      setChats(prev => [newChat, ...prev]);
      chatId = newChat.id;
      setCurrentChatId(newChat.id);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setChats(prev => prev.map(chat => 
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? content.slice(0, 50) : chat.title,
          }
        : chat
    ));

    setIsLoading(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const isChartRequest = content.toLowerCase().includes('chart') || 
                            content.toLowerCase().includes('graph') || 
                            content.toLowerCase().includes('pie') || 
                            content.toLowerCase().includes('bar') ||
                            content.toLowerCase().includes('annual') ||
                            content.toLowerCase().includes('maintenance');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isChartRequest 
          ? '' 
          : generateResponse(content),
        hasCharts: isChartRequest,
        timestamp: new Date(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, assistantMessage] }
          : chat
      ));

      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('trend') || lowerPrompt.includes('pattern')) {
      return `Based on the SDM data analysis, I've identified the following trends:

• **Increasing Volume**: Incident volume has grown by 15% year-over-year
• **Seasonal Pattern**: Peak periods occur during Q4 (October-December)
• **Resolution Time**: Average resolution time improved from 4.2 to 3.8 hours
• **Category Shifts**: Hardware issues remain the dominant category at 35%
• **User Satisfaction**: Overall satisfaction score improved to 4.2/5.0

The upward trend in Q4 correlates with increased business activity and system updates during year-end operations.`;
    }
    
    if (lowerPrompt.includes('issue') || lowerPrompt.includes('problem')) {
      return `Here are the top issues identified in the SDM analysis:

**Top 5 Issues by Volume:**
1. Hardware Failures (35%) - Desktop computers and peripherals
2. Software Bugs (25%) - Application crashes and performance issues
3. Network Connectivity (20%) - VPN and wireless connection problems
4. User Account Issues (15%) - Password resets and access permissions
5. Other Requests (5%) - Miscellaneous support needs

**Recommendations:**
• Implement preventive maintenance for hardware
• Update software to latest stable versions
• Enhance network infrastructure monitoring
• Deploy self-service password reset portal`;
    }
    
    if (lowerPrompt.includes('resolution') || lowerPrompt.includes('report') || lowerPrompt.includes('performance')) {
      return `**SDM Resolution Performance Report**

**Key Metrics:**
• Total Incidents: 714 (Annual)
• Resolution Rate: 97.3%
• Average Resolution Time: 3.8 hours
• First Contact Resolution: 68%
• Customer Satisfaction: 4.2/5.0

**Performance Highlights:**
✓ Exceeded target resolution rate of 95%
✓ Improved average resolution time by 10%
✓ Maintained high customer satisfaction above 4.0
✓ Successfully handled 15% increase in incident volume

**Areas for Improvement:**
• Increase first contact resolution to 75%
• Reduce escalations by 5%
• Enhance knowledge base documentation`;
    }
    
    return `I'm here to help you with SDM (Service Desk Management) analytics and insights. I can provide information about:

• Incident trends and patterns
• Performance metrics and KPIs
• Category distributions
• Resolution statistics
• Custom reports and visualizations

Try asking me about charts, trends, issues, or performance reports!`;
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    createNewChat();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <ChatInterface
        messages={currentChat?.messages || []}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </Box>
  );
}