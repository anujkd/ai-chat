import React from "react";
import { ChevronRight } from "lucide-react";

interface ChatHistoryItemProps {
  chat: {
    id: number;
    title: string;
    date: string;
  };
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ chat }) => {
  return (
    <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group flex justify-between items-center">
      <div>
        <p className="text-sm font-medium dark:text-gray-200">{chat.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</p>
      </div>
      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400" />
    </button>
  );
};

export default ChatHistoryItem;