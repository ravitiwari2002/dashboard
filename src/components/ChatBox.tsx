import React, { useState } from 'react';
import { Maximize2, RefreshCw, EyeOff, MoreVertical } from 'lucide-react';
export function ChatBox({
  id,
  model,
  onToggleVisibility
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // Different model icons based on the model name
  const getModelIcon = () => {
    if (model.includes('DeepSeek')) {
      return <span className="text-blue-400">◆</span>;
    } else if (model.includes('Perplexity')) {
      return <span className="text-teal-400">◈</span>;
    } else if (model.includes('Claude')) {
      return <span className="text-orange-400">◉</span>;
    }
    return <span className="text-gray-400">●</span>;
  };
  return <div className={`flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card 
        ${isExpanded ? 'fixed inset-0 z-20 m-0 md:m-2' : 'relative'}`}>
      <div className="flex items-center justify-between p-2.5 md:p-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          {getModelIcon()}
          <span className="text-sm md:text-base font-medium">{model}</span>
        </div>
        <div className="flex items-center">
          <button onClick={toggleExpand} className="p-1.5 md:p-2 hover:bg-muted rounded-md transition-colors" title={isExpanded ? 'Minimize' : 'Maximize'}>
            <Maximize2 size={isExpanded ? 18 : 16} />
          </button>
          <button className="p-1.5 md:p-2 hover:bg-muted rounded-md transition-colors" title="Switch model">
            <RefreshCw size={16} />
          </button>
          <button onClick={onToggleVisibility} className="p-1.5 md:p-2 hover:bg-muted rounded-md transition-colors" title="Hide chat">
            <EyeOff size={16} />
          </button>
          <button className="p-1.5 md:p-2 hover:bg-muted rounded-md transition-colors" title="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3 md:p-5 bg-[#0f0f0f]">
        <div className="flex flex-col gap-4">
          <div className="bg-card/10 p-3 md:p-4 rounded-lg">
            <p className="text-sm md:text-base text-muted-foreground">
              This is where chat messages would appear. The conversation history
              would be displayed here.
            </p>
          </div>
          {id === '2' && <div className="flex justify-center my-4 md:my-6">
              <button className="px-5 py-2.5 rounded-full bg-background border border-border text-sm md:text-base">
                Upgrade to unlock
              </button>
            </div>}
        </div>
      </div>
    </div>;
}