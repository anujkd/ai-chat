import React, { useState, useRef, useEffect } from "react";
import { Menu, Plus, Paperclip, ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "./Sidebar";
import UserDropdown from "./UserDropdown";

// Types
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface ChatHistory {
  id: number;
  title: string;
  date: string;
}

const LoadingIndicator = () => (
  <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-[80%]">
    <div className="flex gap-1">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300" />
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
  </div>
);

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory: ChatHistory[] = [
    { id: 1, title: "Previous Chat 1", date: "2 hours ago" },
    { id: 2, title: "Previous Chat 2", date: "5 hours ago" },
  ];

  const suggestions = [
    "Help me write a blog post",
    "Generate some code",
    "Explain a concept",
    "Analyze some data"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    createNewSession();
  }, []);

  const toggleTheme = (selectedTheme: "light" | "dark") => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    setTheme(selectedTheme);
  };

  const createNewSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/chat/session', {
        method: 'POST',
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages([]);
      setIsNewChat(true);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !sessionId) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsNewChat(false);

    try {
      const response = await fetch(`http://localhost:3000/api/chat/${sessionId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200" data-theme={theme}>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        chatHistory={chatHistory}
        showAllHistory={showAllHistory}
        setShowAllHistory={setShowAllHistory}
      />

      <header className="border-b px-4 h-14 flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => createNewSession()}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <span className="text-xl font-semibold">ChatApp</span>
        </div>

        <div className="flex items-center">
          <UserDropdown toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className={`flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col ${isNewChat ? 'justify-center' : ''}`}>
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 dark:text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <LoadingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className={`${isNewChat ? 'text-center' : ''}`}>
          {isNewChat && (
            <h2 className="text-2xl font-bold mb-4 dark:text-white">What can I help with?</h2>
          )}
          
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="pr-24 py-6 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
              disabled={isLoading}
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                disabled={isLoading}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                disabled={isLoading}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {isNewChat && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  onClick={() => setMessage(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;