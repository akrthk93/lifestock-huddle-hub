
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Plus, 
  ShoppingCart, 
  Tag, 
  Trash, 
  RefreshCw,
  Archive 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data
const shoppingItems = [
  { 
    id: 1, 
    name: "Milk", 
    quantity: 2, 
    unit: "gallon", 
    category: "Refrigerator", 
    isChecked: false, 
    isLowStock: true,
    notes: "Get organic if available"
  },
  { 
    id: 2, 
    name: "Bread", 
    quantity: 1, 
    unit: "loaf", 
    category: "Pantry", 
    isChecked: false, 
    isLowStock: true,
    notes: null
  },
  { 
    id: 3, 
    name: "Eggs", 
    quantity: 1, 
    unit: "dozen", 
    category: "Refrigerator", 
    isChecked: false, 
    isLowStock: false,
    notes: "Free-range preferred"
  },
  { 
    id: 4, 
    name: "Rice", 
    quantity: 1, 
    unit: "kg", 
    category: "Pantry", 
    isChecked: false, 
    isLowStock: true,
    notes: null
  },
  { 
    id: 5, 
    name: "Paper Towels", 
    quantity: 2, 
    unit: "rolls", 
    category: "Household", 
    isChecked: false, 
    isLowStock: false,
    notes: null
  },
];

const completedItems = [
  { 
    id: 101, 
    name: "Yogurt", 
    quantity: 4, 
    unit: "cups", 
    category: "Refrigerator", 
    purchaseDate: "2023-12-01",
    notes: null
  },
  { 
    id: 102, 
    name: "Cereal", 
    quantity: 1, 
    unit: "box", 
    category: "Pantry", 
    purchaseDate: "2023-12-01",
    notes: null
  },
  { 
    id: 103, 
    name: "Cleaning Spray", 
    quantity: 1, 
    unit: "bottle", 
    category: "Household", 
    purchaseDate: "2023-11-25",
    notes: "Got the eco-friendly one"
  },
];

// Mock categories
const categories = [
  "Pantry",
  "Refrigerator",
  "Freezer",
  "Household",
  "Office Supplies",
];

const ShoppingList = () => {
  const [items, setItems] = useState(shoppingItems);
  const [activeTab, setActiveTab] = useState("current");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pieces",
    category: "",
    notes: ""
  });

  const handleCheckItem = (itemId: number) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
    ));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast.error("Item name cannot be empty");
      return;
    }
    
    toast.success(`${newItem.name} added to shopping list`);
    setIsAddDialogOpen(false);
    setNewItem({
      name: "",
      quantity: 1,
      unit: "pieces",
      category: "",
      notes: ""
    });
  };

  const handleAddToInventory = () => {
    const checkedItems = items.filter(item => item.isChecked);
    if (checkedItems.length === 0) {
      toast.error("No items selected");
      return;
    }
    
    toast.success(`${checkedItems.length} items added to inventory`);
    // In a real app, we would remove the checked items and add them to inventory
    setItems(items.filter(item => !item.isChecked));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shopping List</h2>
          <p className="text-muted-foreground">
            Plan your shopping and restock your inventory
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add to Shopping List</DialogTitle>
                <DialogDescription>
                  Add a new item to your shopping list
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="itemName" className="text-sm font-medium">
                    Item Name
                  </label>
                  <Input
                    id="itemName"
                    placeholder="Enter item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="unit" className="text-sm font-medium">
                      Unit
                    </label>
                    <Select 
                      value={newItem.unit}
                      onValueChange={(value) => setNewItem({...newItem, unit: value})}
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="g">Grams</SelectItem>
                        <SelectItem value="lb">Pounds</SelectItem>
                        <SelectItem value="oz">Ounces</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                        <SelectItem value="ml">Milliliters</SelectItem>
                        <SelectItem value="gallon">Gallons</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                        <SelectItem value="cans">Cans</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                        <SelectItem value="packs">Packs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select 
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({...newItem, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </label>
                  <Input
                    id="notes"
                    placeholder="Add notes or specifications"
                    value={newItem.notes}
                    onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>
                  Add to List
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline"
            onClick={handleAddToInventory}
            disabled={!items.some(item => item.isChecked)}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Add to Inventory
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="current" className="flex-1">
            Current List ({items.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Completed History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-0">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Shopping List</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                  <p>Your shopping list is empty</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add an Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-all",
                        item.isChecked 
                          ? "bg-muted/50 text-muted-foreground" 
                          : "bg-card hover:bg-accent/5"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          checked={item.isChecked}
                          onCheckedChange={() => handleCheckItem(item.id)}
                          id={`item-${item.id}`}
                        />
                        <div>
                          <label 
                            htmlFor={`item-${item.id}`}
                            className={cn(
                              "text-base font-medium cursor-pointer",
                              item.isChecked && "line-through"
                            )}
                          >
                            {item.name}
                          </label>
                          <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <span>{item.quantity} {item.unit}</span>
                            <Badge variant="outline" className="bg-secondary/50">
                              {item.category}
                            </Badge>
                            {item.isLowStock && (
                              <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-300/20">
                                Low Stock
                              </Badge>
                            )}
                          </div>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-1 italic">
                              Note: {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Shopping History</CardTitle>
                <Button variant="outline" size="sm">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {completedItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No shopping history yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>December 1, 2023</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {completedItems.slice(0, 2).map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Check className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-base font-medium">
                              {item.name}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <span>{item.quantity} {item.unit}</span>
                              <Badge variant="outline" className="bg-secondary/50">
                                {item.category}
                              </Badge>
                            </div>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                Note: {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>November 25, 2023</span>
                  </div>
                  
                  <div className="space-y-3">
                    {completedItems.slice(2).map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Check className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-base font-medium">
                              {item.name}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <span>{item.quantity} {item.unit}</span>
                              <Badge variant="outline" className="bg-secondary/50">
                                {item.category}
                              </Badge>
                            </div>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                Note: {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShoppingList;
