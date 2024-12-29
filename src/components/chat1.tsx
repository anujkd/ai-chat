import React, { useState, useRef, useEffect } from "react";
import { Menu, Plus, Paperclip, ImageIcon, Send, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// [Previous Sidebar and UserDropdown components remain the same...]
// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatHistory: Array<{ id: number; title: string; date: string }>;
  showAllHistory: boolean;
  setShowAllHistory: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  chatHistory,
  showAllHistory,
  setShowAllHistory,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Chat History</h2>
          <div className="space-y-2">
            {chatHistory.slice(0, showAllHistory ? undefined : 4).map((chat) => (
              <div
                key={chat.id}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              >
                <div className="text-sm font-medium dark:text-white">{chat.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</div>
              </div>
            ))}
          </div>
          {chatHistory.length > 4 && (
            <Button
              variant="ghost"
              className="mt-4 w-full text-sm dark:text-gray-300"
              onClick={() => setShowAllHistory(!showAllHistory)}
            >
              {showAllHistory ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

// UserDropdown Component
interface UserDropdownProps {
  toggleTheme: (theme: "light" | "dark") => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ toggleTheme }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <User className="h-5 w-5 dark:text-gray-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Main Chat Component
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = (selectedTheme: "light" | "dark") => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    setTheme(selectedTheme);
  };

  const chatHistory = [
    { id: 1, title: "Blog post writing tips", date: "2 hours ago" },
    { id: 2, title: "React component design", date: "5 hours ago" },
  ];

  const suggestions = ["Help me write a blog post", "Generate some code", "Explain a concept", "Analyze some data"];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsNewChat(false);

    try {
      // Make API call to your backend
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      // Add API response
      const apiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response, // Adjust based on your API response structure
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, apiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsNewChat(true);
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
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5 dark:text-gray-200" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleNewChat}
          >
            <Plus className="h-5 w-5 dark:text-gray-200" />
          </Button>

          <span className="text-xl font-semibold dark:text-white">ChatApp</span>
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
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 dark:text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
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
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Paperclip className="h-5 w-5 dark:text-gray-200" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <ImageIcon className="h-5 w-5 dark:text-gray-200" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5 dark:text-gray-200" />
              </Button>
            </div>
          </div>

          {isNewChat && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  className="rounded-full dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => setMessage(suggestion)}
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