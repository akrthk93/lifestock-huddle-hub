
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Tag, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data
const inventoryStats = {
  totalItems: 64,
  lowStockItems: 7,
  expiringItems: 3,
  categories: 8,
  shoppingListItems: 5,
};

// Mock inventory summary data
const inventorySummary = [
  { category: "Pantry", itemCount: 18, lowStock: 2 },
  { category: "Refrigerator", itemCount: 15, lowStock: 3 },
  { category: "Freezer", itemCount: 12, lowStock: 0 },
  { category: "Household", itemCount: 8, lowStock: 1 },
  { category: "Office Supplies", itemCount: 11, lowStock: 1 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your inventory and activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryStats.totalItems}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across {inventoryStats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryStats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Items below reorder threshold
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryStats.expiringItems}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Items expiring within 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-accent" />
              Shopping List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryStats.shoppingListItems}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Items to purchase
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>
              Items by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventorySummary.map((category) => (
                <div key={category.category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-primary" />
                      <span>{category.category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.itemCount} items
                      {category.lowStock > 0 && (
                        <span className="ml-2 text-amber-500">
                          ({category.lowStock} low)
                        </span>
                      )}
                    </div>
                  </div>
                  <Progress value={category.itemCount * 3} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/inventory">
                <Button variant="outline" className="w-full">View All Inventory</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>
              Recent inventory changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Added 2 Milk (Gallon)</p>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">To Refrigerator category</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="bg-amber-500/10 p-2 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Added Rice to shopping list</p>
                    <span className="text-xs text-muted-foreground">5h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">2kg - Pantry category</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="bg-red-500/10 p-2 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Marked Yogurt as used</p>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Removed 1 from Refrigerator</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Tag className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Created new category</p>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Added 'Office Supplies'</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">View Full History</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
