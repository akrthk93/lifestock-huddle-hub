
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-between w-full md:hidden">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Package className="h-5 w-5 text-primary" />
          <span>LifeStock</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
