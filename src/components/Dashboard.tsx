import React, { useEffect, useState, useRef } from 'react';
import { ThreadBar } from './ThreadBar';
import { ChatGrid } from './ChatGrid';
import { InputPrompt } from './InputPrompt';
import { Menu, X } from 'lucide-react';
export function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [activeChats, setActiveChats] = useState([{
    id: '1',
    title: 'Chat with DeepSeek',
    model: 'DeepSeek Chat',
    isVisible: true,
    isCollapsed: false
  }, {
    id: '2',
    title: 'Chat with Perplexity',
    model: 'Perplexity Sonar',
    isVisible: true,
    isCollapsed: false
  }, {
    id: '3',
    title: 'Chat with Claude',
    model: 'Claude 3 Haiku',
    isVisible: true,
    isCollapsed: false
  }]);
  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      // Automatically collapse sidebar on mobile
      if (isMobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
      // Auto-expand sidebar on desktop if it was collapsed
      if (!isMobile && sidebarCollapsed && !mobileMenuOpen) {
        setSidebarCollapsed(false);
      }
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [sidebarCollapsed, mobileMenuOpen]);
  // Handle click outside to close mobile sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);
  const toggleSidebar = () => {
    if (isMobileView) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };
  const toggleChatVisibility = chatId => {
    setActiveChats(prevChats => {
      return prevChats.map(chat => chat.id === chatId ? {
        ...chat,
        isCollapsed: !chat.isCollapsed
      } : chat);
    });
  };
  return <div className="flex flex-col md:flex-row h-screen w-full bg-background text-foreground">
      {/* Mobile header */}
      {isMobileView && <div className="flex items-center justify-between p-3 border-b border-border bg-[#0f0f0f] z-20">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="font-bold text-accent-foreground">AI</span>
            </div>
            <h1 className="ml-2 text-sm font-medium">AI Chat Dashboard</h1>
          </div>
          <button ref={menuButtonRef} onClick={toggleSidebar} className="p-2 rounded-md hover:bg-muted transition-colors">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>}
      {/* Sidebar */}
      <div ref={sidebarRef} className={`
          ${isMobileView ? `fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` : 'relative'}
        `}>
        <ThreadBar collapsed={sidebarCollapsed && !isMobileView} toggleSidebar={toggleSidebar} isMobileView={isMobileView} />
      </div>
      {/* Main content */}
      <div className={`flex flex-col flex-1 h-full overflow-hidden ${isMobileView ? 'pt-0' : ''}`}>
        <div className="flex-1 overflow-auto">
          <ChatGrid chats={activeChats} onToggleVisibility={toggleChatVisibility} />
        </div>
        <div className="p-3 md:p-4 border-t border-border">
          <InputPrompt />
        </div>
      </div>
    </div>;
}