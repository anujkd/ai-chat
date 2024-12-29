import React, { useState } from "react";
import { Menu, Plus, Paperclip, ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Input } from "@/components/ui/input"; // Adjust path as needed
import Sidebar from "./Sidebar";
import UserDropdown from "./UserDropdown";

const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Explicitly type theme
  const [showAllHistory, setShowAllHistory] = useState(false);

  const toggleTheme = (selectedTheme: "light" | "dark") => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    setTheme(selectedTheme);
  };

  const chatHistory = [
    { id: 1, title: "Blog post writing tips", date: "2 hours ago" },
    { id: 2, title: "React component design", date: "5 hours ago" },
    { id: 3, title: "Data analysis help", date: "Yesterday" },
    { id: 4, title: "JavaScript debugging", date: "2 days ago" },
    { id: 5, title: "API integration discussion", date: "3 days ago" },
    { id: 6, title: "CSS Grid layout help", date: "4 days ago" },
    { id: 7, title: "Performance optimization", date: "5 days ago" },
    { id: 8, title: "Database design review", date: "1 week ago" },
  ];

  const suggestions = ["Help me write a blog post", "Generate some code", "Explain a concept", "Analyze some data"];

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200" data-theme={theme}> {/* Added data-theme attribute */}
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

          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <Plus className="h-5 w-5 dark:text-gray-200" />
          </Button>

          <span className="text-xl font-semibold dark:text-white">ChatApp</span>
        </div>

        <div className="flex items-center">
          <UserDropdown toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">What can I help with?</h2>

        <div className="relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Send className="h-5 w-5 dark:text-gray-200" />
            </Button>
          </div>
        </div>

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
      </main>
    </div>
  );
};

export default Chat;