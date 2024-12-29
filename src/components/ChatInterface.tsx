import React, { useState } from "react";
import { Menu, Plus, User, Paperclip, ImageIcon, Send, Sun, Moon, Search, Edit, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const toggleTheme = (selectedTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);
    setTheme(selectedTheme);
  };

  // Sample history data
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
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-gray-50 dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="h-14 border-b dark:border-gray-700 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 dark:text-gray-200" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
              <Search className="h-5 w-5 dark:text-gray-200" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
              <Edit className="h-5 w-5 dark:text-gray-200" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
            <Plus className="h-5 w-5 dark:text-gray-200" />
          </Button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent Chats</h3>
          <div className="space-y-2">
            {(showAllHistory ? chatHistory : chatHistory.slice(0, 5)).map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">{chat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</p>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400" />
              </button>
            ))}
          </div>
          {!showAllHistory && chatHistory.length > 5 && (
            <Button
              variant="ghost"
              className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowAllHistory(true)}
            >
              View all
            </Button>
          )}
        </div>
      </div>

      {/* Header */}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <User className="h-5 w-5 dark:text-gray-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="dark:text-gray-200">My Account</DropdownMenuLabel>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Profile</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Settings</DropdownMenuItem>

              <DropdownMenuSeparator className="dark:border-gray-700" />

              <DropdownMenuLabel className="dark:text-gray-200">Theme</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => toggleTheme("light")}
                className="flex items-center cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleTheme("dark")}
                className="flex items-center cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>

              <DropdownMenuSeparator className="dark:border-gray-700" />
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
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

export default ChatInterface;
