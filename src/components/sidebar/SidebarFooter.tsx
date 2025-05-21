
import React from "react";
import { LogOut } from "lucide-react";

const SidebarFooter: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <button 
        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
        onClick={() => console.log("Logout clicked")}
      >
        <LogOut className="h-4 w-4 mr-2" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SidebarFooter;
