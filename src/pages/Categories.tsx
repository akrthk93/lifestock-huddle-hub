
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, MoreHorizontal, Package, Plus, Search, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock categories data
const categoriesData = [
  { id: 1, name: "Pantry", itemCount: 18, color: "#84cc16" },
  { id: 2, name: "Refrigerator", itemCount: 15, color: "#0ea5e9" },
  { id: 3, name: "Freezer", itemCount: 12, color: "#4f46e5" },
  { id: 4, name: "Household", itemCount: 8, color: "#ec4899" },
  { id: 5, name: "Office Supplies", itemCount: 11, color: "#f59e0b" },
  { id: 6, name: "Garage", itemCount: 5, color: "#64748b" },
  { id: 7, name: "Electronics", itemCount: 7, color: "#6366f1" },
  { id: 8, name: "Tools", itemCount: 3, color: "#d97706" },
];

const Colors = [
  { name: "Green", value: "#84cc16" },
  { name: "Blue", value: "#0ea5e9" },
  { name: "Purple", value: "#4f46e5" },
  { name: "Pink", value: "#ec4899" },
  { name: "Yellow", value: "#f59e0b" },
  { name: "Gray", value: "#64748b" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Orange", value: "#d97706" },
  { name: "Red", value: "#ef4444" },
  { name: "Teal", value: "#14b8a6" },
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(categoriesData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(Colors[0].value);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (editingCategory) {
      // Update existing category
      toast.success(`Category "${newCategoryName}" updated`);
    } else {
      // Add new category
      toast.success(`Category "${newCategoryName}" added`);
    }
    
    setNewCategoryName("");
    setSelectedColor(Colors[0].value);
    setEditingCategory(null);
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setSelectedColor(category.color);
    setIsAddDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    toast.success("Category deleted");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Organize your inventory with categories
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory 
                  ? "Update your category details" 
                  : "Create a new category to organize your inventory"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="categoryName" className="text-sm font-medium">
                  Category Name
                </label>
                <Input
                  id="categoryName"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {Colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.value && (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setEditingCategory(null);
                setNewCategoryName("");
                setSelectedColor(Colors[0].value);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>
                {editingCategory ? "Save Changes" : "Add Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Categories</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No categories found
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="group rounded-lg border bg-card transition-all hover:shadow-md"
                >
                  <div className="p-6 flex flex-col items-center text-center relative">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Package 
                        className="h-8 w-8"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.itemCount} items
                    </p>
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
