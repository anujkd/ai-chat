import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"; // Adjust path as needed
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { User, Sun, Moon } from "lucide-react";

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
      <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
        <DropdownMenuLabel className="dark:text-gray-200">My Account</DropdownMenuLabel>
        <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Profile</DropdownMenuItem>
        <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Settings</DropdownMenuItem>

        <DropdownMenuSeparator className="dark:border-gray-700" />

        <DropdownMenuLabel className="dark:text-gray-200">Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => toggleTheme("light")} className="flex items-center cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("dark")} className="flex items-center cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700">
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:border-gray-700" />
        <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;