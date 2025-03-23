
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Moon, 
  Sun, 
  Laptop, 
  User, 
  Home, 
  LogOut,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Demo User",
    email: "demo@example.com",
  });
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    lowStock: true,
    expirations: true,
    invitations: true,
    shoppingReminders: true,
    emailNotifications: false,
  });
  
  // Mock display settings
  const [displaySettings, setDisplaySettings] = useState({
    defaultScreen: "dashboard",
  });
  
  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully");
  };
  
  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
    toast.success(`${setting} notifications ${notificationSettings[setting] ? "disabled" : "enabled"}`);
  };
  
  const handleUpdateDisplaySettings = () => {
    toast.success("Display settings updated");
  };
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display">
            Display
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleUpdateProfile}>
                Save Changes
              </Button>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid gap-2">
                  <label htmlFor="currentPassword" className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <Button variant="outline">
                  Change Password
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Account deletion is permanent and cannot be undone
                </p>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/10 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when items are running low
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStock}
                    onCheckedChange={() => handleToggleNotification("lowStock")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Expiration Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when items are about to expire
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.expirations}
                    onCheckedChange={() => handleToggleNotification("expirations")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Household Invitations</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you're invited to a household
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.invitations}
                    onCheckedChange={() => handleToggleNotification("invitations")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Shopping Reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        Get reminders about your shopping list
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.shoppingReminders}
                    onCheckedChange={() => handleToggleNotification("shoppingReminders")}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleToggleNotification("emailNotifications")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize your display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-6 w-6" />
                    <span>Light</span>
                  </Button>
                  
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-6 w-6" />
                    <span>Dark</span>
                  </Button>
                  
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-6 w-6" />
                    <span>System</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Screen</h3>
                <p className="text-sm text-muted-foreground">
                  Choose which screen to show when you open the app
                </p>
                
                <Select
                  value={displaySettings.defaultScreen}
                  onValueChange={(value) => setDisplaySettings({...displaySettings, defaultScreen: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select default screen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="shopping-list">Shopping List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleUpdateDisplaySettings}>
                Save Display Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Session</CardTitle>
              <CardDescription>
                Manage your login sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">Active Session</h4>
                  <p className="text-sm text-muted-foreground">
                    You are currently logged in
                  </p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
