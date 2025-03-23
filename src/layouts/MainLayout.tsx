
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationsPanel from "@/components/NotificationsPanel";
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transition } from "@/components/Transition";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center px-4 justify-between">
          {isMobile && <MobileHeader />}
          
          <div className="flex items-center gap-2">
            {!isMobile && <SidebarTrigger />}
            <h1 className="text-xl font-semibold hidden md:block">LifeStock</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Transition
            show={notificationsOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-10"
            onClick={() => setNotificationsOpen(false)}
          />
          
          <div 
            className={cn(
              "fixed right-4 top-[4.5rem] w-96 max-h-[calc(100vh-6rem)] overflow-auto z-20 transition-all duration-300",
              notificationsOpen 
                ? "translate-x-0 opacity-100" 
                : "translate-x-[120%] opacity-0 pointer-events-none"
            )}
          >
            <NotificationsPanel />
          </div>
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
