
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  AlertTriangle,
  ChevronDown,
  Clock,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Tag,
  Trash
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Milk",
    category: "Refrigerator",
    quantity: 1,
    unit: "gallon",
    expiryDate: "2023-12-25",
    reorderPoint: 1,
    lowStock: true,
    status: "ok"
  },
  {
    id: 2,
    name: "Rice",
    category: "Pantry",
    quantity: 3,
    unit: "kg",
    expiryDate: "2024-06-15",
    reorderPoint: 1,
    lowStock: false,
    status: "ok"
  },
  {
    id: 3,
    name: "Bread",
    category: "Pantry",
    quantity: 1,
    unit: "loaf",
    expiryDate: "2023-12-10",
    reorderPoint: 1,
    lowStock: false,
    status: "expiring"
  },
  {
    id: 4,
    name: "Eggs",
    category: "Refrigerator",
    quantity: 6,
    unit: "pieces",
    expiryDate: "2023-12-20",
    reorderPoint: 4,
    lowStock: false,
    status: "ok"
  },
  {
    id: 5,
    name: "Chicken Breast",
    category: "Freezer",
    quantity: 0.5,
    unit: "kg",
    expiryDate: "2024-01-15",
    reorderPoint: 0.5,
    lowStock: true,
    status: "ok"
  },
  {
    id: 6,
    name: "Paper Towels",
    category: "Household",
    quantity: 2,
    unit: "rolls",
    expiryDate: null,
    reorderPoint: 2,
    lowStock: false,
    status: "ok"
  },
  {
    id: 7,
    name: "Yogurt",
    category: "Refrigerator",
    quantity: 4,
    unit: "cups",
    expiryDate: "2023-12-08",
    reorderPoint: 2,
    lowStock: false,
    status: "expiring"
  },
  {
    id: 8,
    name: "Pasta",
    category: "Pantry",
    quantity: 3,
    unit: "boxes",
    expiryDate: "2024-08-15",
    reorderPoint: 1,
    lowStock: false,
    status: "ok"
  },
];

// Mock categories
const categories = [
  "All",
  "Pantry",
  "Refrigerator",
  "Freezer",
  "Household",
  "Office Supplies"
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Filter items
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" ? true : item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" 
      ? true 
      : selectedStatus === "low" 
        ? item.lowStock 
        : selectedStatus === "expiring" 
          ? item.status === "expiring" 
          : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddToShoppingList = (itemId: number) => {
    toast.success("Item added to shopping list");
  };

  const handleRestock = (itemId: number) => {
    toast.success("Item restocked");
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditing(true);
    setAddItemOpen(true);
  };

  const handleDelete = (itemId: number) => {
    toast.success("Item deleted");
  };

  const handleSaveItem = () => {
    if (isEditing) {
      toast.success("Item updated successfully");
    } else {
      toast.success("Item added successfully");
    }
    setAddItemOpen(false);
    setIsEditing(false);
    setSelectedItem(null);
  };

  const toggleSelectItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleBatchAction = (action: string) => {
    if (selectedItems.length === 0) return;
    
    switch (action) {
      case "restock":
        toast.success(`${selectedItems.length} items restocked`);
        break;
      case "shopping":
        toast.success(`${selectedItems.length} items added to shopping list`);
        break;
      case "delete":
        toast.success(`${selectedItems.length} items deleted`);
        break;
      default:
        break;
    }
    
    setSelectedItems([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Manage your inventory items
          </p>
        </div>
        
        <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Item" : "Add New Item"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your inventory item" 
                  : "Add a new item to your inventory"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Item Name
                </label>
                <Input 
                  id="name" 
                  placeholder="Enter item name" 
                  defaultValue={selectedItem?.name || ""}
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
                    min="0" 
                    step="0.1" 
                    placeholder="0" 
                    defaultValue={selectedItem?.quantity || ""}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="unit" className="text-sm font-medium">
                    Unit
                  </label>
                  <Select defaultValue={selectedItem?.unit || "pieces"}>
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
                <Select defaultValue={selectedItem?.category || ""}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="expiryDate" className="text-sm font-medium">
                    Expiry Date
                  </label>
                  <Input 
                    id="expiryDate" 
                    type="date" 
                    defaultValue={selectedItem?.expiryDate || ""}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="reorderPoint" className="text-sm font-medium">
                    Reorder Point
                  </label>
                  <Input 
                    id="reorderPoint" 
                    type="number" 
                    min="0" 
                    step="0.1" 
                    placeholder="0" 
                    defaultValue={selectedItem?.reorderPoint || ""}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setAddItemOpen(false);
                setIsEditing(false);
                setSelectedItem(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveItem}>
                {isEditing ? "Save Changes" : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Tag className="mr-2 h-4 w-4" />
                    {selectedCategory}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "cursor-pointer",
                        selectedCategory === category && "bg-primary/10 text-primary"
                      )}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setSelectedStatus("All")}
                    className={cn(
                      "cursor-pointer",
                      selectedStatus === "All" && "bg-primary/10 text-primary"
                    )}
                  >
                    All Items
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedStatus("low")}
                    className={cn(
                      "cursor-pointer",
                      selectedStatus === "low" && "bg-primary/10 text-primary"
                    )}
                  >
                    Low Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedStatus("expiring")}
                    className={cn(
                      "cursor-pointer",
                      selectedStatus === "expiring" && "bg-primary/10 text-primary"
                    )}
                  >
                    Expiring Soon
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedItems.length > 0 && (
            <div className="bg-muted/80 p-2 rounded-md mb-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{selectedItems.length}</span> items selected
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleBatchAction("restock")}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restock
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleBatchAction("shopping")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to List
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleBatchAction("delete")}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <div className="flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300"
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {searchQuery || selectedCategory !== "All" || selectedStatus !== "All"
                        ? "No items match your filters"
                        : "No items in inventory. Add some items to get started!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelectItem(item.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary/50">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={cn(
                            "font-medium",
                            item.lowStock && "text-amber-500"
                          )}>
                            {item.quantity} {item.unit}
                          </span>
                          {item.lowStock && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.status === "expiring" ? (
                          <div className="flex items-center">
                            <Clock className="mr-1.5 h-4 w-4 text-red-500" />
                            <span className="text-red-500">Expires soon</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRestock(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(item)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAddToShoppingList(item.id)}>
                                Add to Shopping List
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDelete(item.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
