import React from "react";
import { X, Search, Edit, Plus } from "lucide-react";
import ChatHistoryItem from "./ChatHistoryItem";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  chatHistory: { id: number; title: string; date: string }[];
  showAllHistory: boolean;
  setShowAllHistory: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, chatHistory, showAllHistory, setShowAllHistory }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-80 bg-gray-50 dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <div className="h-14 border-b dark:border-gray-700 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-gray-200 dark:hover:bg-gray-700">
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
            <ChatHistoryItem key={chat.id} chat={chat} />
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
  );
};

export default Sidebar;