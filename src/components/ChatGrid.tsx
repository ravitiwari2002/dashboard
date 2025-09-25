import React, { useEffect, useState } from 'react';
import { ChatBox } from './ChatBox';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function ChatGrid({
  chats,
  onToggleVisibility
}) {
  const [startIndex, setStartIndex] = useState(0);
  // Separate visible and collapsed chats
  const visibleChats = chats.filter(chat => !chat.isCollapsed);
  const collapsedChats = chats.filter(chat => chat.isCollapsed);
  // Updated breakpoints for responsive design
  const getMaxVisibleChats = () => {
    if (window.innerWidth >= 1440) return 3; // Large desktop
    if (window.innerWidth >= 1024) return 2; // Laptop and small desktop
    return 1; // Mobile and tablet
  };
  const [maxVisibleChats, setMaxVisibleChats] = useState(getMaxVisibleChats());
  // Update maxVisibleChats on window resize
  useEffect(() => {
    const handleResize = () => {
      const newMaxVisible = getMaxVisibleChats();
      setMaxVisibleChats(newMaxVisible);
      // Ensure startIndex is valid after resize
      if (startIndex > visibleChats.length - newMaxVisible) {
        setStartIndex(Math.max(0, visibleChats.length - newMaxVisible));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [startIndex, visibleChats.length]);
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + maxVisibleChats < visibleChats.length;
  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex(startIndex - 1);
    }
  };
  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex(startIndex + 1);
    }
  };
  return <div className="flex h-full">
      {/* Collapsed chats sidebar */}
      {collapsedChats.length > 0 && <div className="h-full border-r border-border p-1 bg-[#0f0f0f] flex flex-col gap-2">
          {collapsedChats.map(chat => <div key={chat.id} className="w-[50px] aspect-square border border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-card/30 transition-colors" onClick={() => onToggleVisibility(chat.id)}>
              {chat.model.includes('DeepSeek') && <span className="text-blue-400 text-xl">◆</span>}
              {chat.model.includes('Perplexity') && <span className="text-teal-400 text-xl">◈</span>}
              {chat.model.includes('Claude') && <span className="text-orange-400 text-xl">◉</span>}
            </div>)}
        </div>}
      {/* Main chat area */}
      <div className="relative flex-1 h-full p-2 md:p-3">
        <div className="flex h-full gap-2 md:gap-3">
          {visibleChats.slice(startIndex, startIndex + maxVisibleChats).map(chat => <div key={chat.id} className="flex-1 min-w-0" style={{
          maxWidth: `${100 / Math.min(maxVisibleChats, visibleChats.length)}%`
        }}>
                <ChatBox id={chat.id} model={chat.model} onToggleVisibility={() => onToggleVisibility(chat.id)} />
              </div>)}
          {visibleChats.length === 0 && <div className="flex items-center justify-center w-full h-full">
              <p className="text-muted-foreground text-center px-4">
                {collapsedChats.length > 0 ? 'Click on a chat icon on the left to expand it' : 'No active chats. Start a new chat from the sidebar.'}
              </p>
            </div>}
        </div>
        {/* Navigation arrows */}
        {visibleChats.length > maxVisibleChats && <>
            <button onClick={scrollLeft} disabled={!canScrollLeft} className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md z-10 ${canScrollLeft ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed'}`}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} disabled={!canScrollRight} className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md z-10 ${canScrollRight ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed'}`}>
              <ChevronRight size={20} />
            </button>
          </>}
      </div>
    </div>;
}