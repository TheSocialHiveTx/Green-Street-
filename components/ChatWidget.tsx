import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Welcome to Greenstreet Builders. Are you looking to buy a new home or sell a vacant lot?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
    if (isOpen) {
        scrollToBottom();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         chatSessionRef.current = createChatSession();
      }
      const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const modelMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: result.text 
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I apologize, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[500px] transition-all duration-300 ease-in-out">
          <div className="bg-greenstreet-800 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">Greenstreet Assistant</h3>
              <p className="text-greenstreet-200 text-xs">AI-Powered Support</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-greenstreet-200 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-greenstreet-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                  <Loader2 className="animate-spin text-greenstreet-600" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-greenstreet-500 focus:border-transparent text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-greenstreet-600 text-white rounded-full hover:bg-greenstreet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
          isOpen ? 'bg-gray-700 text-white rotate-90' : 'bg-greenstreet-600 text-white hover:bg-greenstreet-700'
        }`}
      >
        {!isOpen && <span className="text-sm font-medium pr-1 hidden sm:block">Need Help?</span>}
        <MessageSquare size={24} className={isOpen ? "-rotate-90" : ""} />
      </button>
    </div>
  );
};

export default ChatWidget;
