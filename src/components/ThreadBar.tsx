import React from 'react';
import { PlusIcon, SearchIcon, Settings, MessageSquare, ChevronLeft, ChevronRight, MoreVertical, User, LogOut, X } from 'lucide-react';
export function ThreadBar({
  collapsed,
  toggleSidebar,
  isMobileView
}) {
  const recentChats = [{
    id: '1',
    title: 'How to optimize React performance'
  }, {
    id: '2',
    title: 'Explaining quantum computing'
  }, {
    id: '3',
    title: 'Creative writing prompts'
  }, {
    id: '4',
    title: 'TypeScript best practices'
  }];
  return <div className={`bg-[#0f0f0f] flex flex-col border-r border-border h-full transition-all duration-300 
        ${collapsed && !isMobileView ? 'w-[50px]' : isMobileView ? 'w-[280px]' : 'w-[220px]'}`}>
      <div className="flex justify-between items-center p-3 border-b border-border">
        {(!collapsed || isMobileView) && <h2 className="text-sm font-semibold">AI Chat Dashboard</h2>}
        {!isMobileView && <button onClick={toggleSidebar} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>}
        {isMobileView && <button onClick={toggleSidebar} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <X size={18} />
          </button>}
      </div>
      <div className="flex flex-col gap-1 p-2">
        <SidebarButton icon={<PlusIcon size={18} />} label="New Chat" collapsed={collapsed && !isMobileView} />
        <SidebarButton icon={<MessageSquare size={18} />} label="Temporary Chat" collapsed={collapsed && !isMobileView} />
        <SidebarButton icon={<Settings size={18} />} label="Set Default Models" collapsed={collapsed && !isMobileView} />
        <SidebarButton icon={<SearchIcon size={18} />} label="Search Chats" collapsed={collapsed && !isMobileView} />
      </div>
      {(!collapsed || isMobileView) && <div className="mt-4 px-3">
          <h3 className="text-xs text-muted-foreground font-medium mb-2">
            Recent Chats
          </h3>
          <div className="flex flex-col gap-1">
            {recentChats.map(chat => <ChatItem key={chat.id} title={chat.title} />)}
          </div>
        </div>}
      <div className="mt-auto border-t border-border p-2">
        <div className={`flex items-center ${!collapsed || isMobileView ? 'justify-between' : 'justify-center'} p-2 rounded-md hover:bg-muted transition-colors`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <User size={16} />
            </div>
            {(!collapsed || isMobileView) && <span className="text-sm font-medium">User</span>}
          </div>
          {(!collapsed || isMobileView) && <button className="p-1 rounded-md hover:bg-accent/50 transition-colors">
              <LogOut size={16} />
            </button>}
        </div>
      </div>
    </div>;
}
function SidebarButton({
  icon,
  label,
  collapsed
}) {
  return <button className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors text-sm w-full" title={collapsed ? label : undefined}>
      <span className="text-muted-foreground">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>;
}
function ChatItem({
  title
}) {
  return <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted group transition-colors">
      <span className="text-sm truncate">{title}</span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded-md hover:bg-accent transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>;
}