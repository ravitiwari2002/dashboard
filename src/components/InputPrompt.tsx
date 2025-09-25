import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, Paperclip, Sparkles, Mic, Plus } from 'lucide-react';
export function InputPrompt() {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);
  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);
  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Submitted:', inputValue);
      setInputValue('');
    }
  };
  return <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end border border-border rounded-lg bg-card overflow-hidden">
        <button type="button" className="p-2 md:p-3 text-muted-foreground hover:text-foreground transition-colors" title="Add attachment">
          <Plus size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <textarea ref={textareaRef} value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Ask me anything..." className="w-full resize-none py-3 px-1 bg-transparent outline-none min-h-[24px] max-h-[200px] text-base" rows={1} />
        </div>
        <div className="flex items-center px-1 md:px-2">
          <button type="button" className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground transition-colors" title="Attach file">
            <Paperclip size={18} />
          </button>
          <button type="button" className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground transition-colors hidden md:block" title="Enhance prompt">
            <Sparkles size={18} />
          </button>
          <button type="button" className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground transition-colors" title="Voice input">
            <Mic size={18} />
          </button>
          <button type="submit" disabled={!inputValue.trim()} className={`p-2 rounded-md ${inputValue.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground bg-muted cursor-not-allowed'}`} title="Send message">
            <SendIcon size={18} />
          </button>
        </div>
      </div>
    </form>;
}