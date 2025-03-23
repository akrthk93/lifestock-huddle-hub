
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Package, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    description: "Milk is running low (1 remaining)",
    timestamp: "2 hours ago",
    type: "low-stock",
    read: false,
  },
  {
    id: 2,
    title: "Expiration Alert",
    description: "Yogurt expires in 2 days",
    timestamp: "4 hours ago",
    type: "expiration",
    read: false,
  },
  {
    id: 3,
    title: "Shopping List Reminder",
    description: "You have 5 items on your shopping list",
    timestamp: "Yesterday",
    type: "shopping",
    read: true,
  },
  {
    id: 4,
    title: "New Household Invitation",
    description: "Sarah invited you to join 'Beach House'",
    timestamp: "2 days ago",
    type: "invitation",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "low-stock":
      return <Package className="h-5 w-5 text-amber-500" />;
    case "expiration":
      return <Clock className="h-5 w-5 text-red-500" />;
    case "shopping":
      return <ShoppingCart className="h-5 w-5 text-primary" />;
    case "invitation":
      return <Package className="h-5 w-5 text-accent" />;
    default:
      return <Package className="h-5 w-5" />;
  }
};

const NotificationsPanel = () => {
  return (
    <Card className="shadow-lg glass-card animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <CardDescription>
          Stay updated with your inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No notifications at the moment
          </div>
        ) : (
          <div className="space-y-2 max-h-[calc(100vh-15rem)] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-3 rounded-lg flex gap-3 transition-all duration-200 hover:bg-muted/50",
                  notification.read ? "opacity-70" : "opacity-100"
                )}
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={cn(
                      "text-sm font-medium",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </h4>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Button variant="ghost" size="sm">Settings</Button>
        <Button variant="ghost" size="sm">Clear All</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsPanel;
