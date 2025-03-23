
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Filter,
  Package,
  ShoppingCart,
  Trash,
  Tag,
  Printer,
  Download,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for history
const historyItems = [
  { 
    id: 1, 
    action: "added", 
    item: "Milk", 
    quantity: 2, 
    unit: "gallon", 
    category: "Refrigerator", 
    date: "2023-12-05T10:30:00Z",
    user: "John Doe"
  },
  { 
    id: 2, 
    action: "removed", 
    item: "Bread", 
    quantity: 1, 
    unit: "loaf", 
    category: "Pantry", 
    date: "2023-12-04T14:15:00Z",
    user: "Jane Smith"
  },
  { 
    id: 3, 
    action: "added", 
    item: "Paper Towels", 
    quantity: 4, 
    unit: "rolls", 
    category: "Household", 
    date: "2023-12-03T09:45:00Z",
    user: "John Doe"
  },
  { 
    id: 4, 
    action: "removed", 
    item: "Eggs", 
    quantity: 1, 
    unit: "dozen", 
    category: "Refrigerator", 
    date: "2023-12-02T16:20:00Z",
    user: "Jane Smith"
  },
  { 
    id: 5, 
    action: "expired", 
    item: "Yogurt", 
    quantity: 2, 
    unit: "cups", 
    category: "Refrigerator", 
    date: "2023-12-01T08:10:00Z",
    user: "System"
  },
  { 
    id: 6, 
    action: "added", 
    item: "Rice", 
    quantity: 1, 
    unit: "kg", 
    category: "Pantry", 
    date: "2023-11-30T11:50:00Z",
    user: "John Doe"
  },
  { 
    id: 7, 
    action: "added", 
    item: "Detergent", 
    quantity: 1, 
    unit: "bottle", 
    category: "Household", 
    date: "2023-11-29T13:25:00Z",
    user: "Jane Smith"
  },
  { 
    id: 8, 
    action: "removed", 
    item: "Apples", 
    quantity: 3, 
    unit: "pieces", 
    category: "Refrigerator", 
    date: "2023-11-28T17:40:00Z",
    user: "John Doe"
  },
];

// Mock data for consumption by category
const categoryConsumptionData = [
  { name: 'Refrigerator', value: 42 },
  { name: 'Pantry', value: 28 },
  { name: 'Household', value: 15 },
  { name: 'Freezer', value: 10 },
  { name: 'Office Supplies', value: 5 },
];

// Mock data for monthly activity
const monthlyActivityData = [
  { name: 'Jan', added: 12, removed: 8, expired: 2 },
  { name: 'Feb', added: 15, removed: 10, expired: 1 },
  { name: 'Mar', added: 18, removed: 12, expired: 3 },
  { name: 'Apr', added: 14, removed: 9, expired: 2 },
  { name: 'May', added: 16, removed: 11, expired: 1 },
  { name: 'Jun', added: 19, removed: 13, expired: 2 },
  { name: 'Jul', added: 22, removed: 15, expired: 3 },
  { name: 'Aug', added: 25, removed: 18, expired: 2 },
  { name: 'Sep', added: 20, removed: 16, expired: 1 },
  { name: 'Oct', added: 17, removed: 14, expired: 2 },
  { name: 'Nov', added: 23, removed: 17, expired: 4 },
  { name: 'Dec', added: 28, removed: 21, expired: 3 },
];

// Most used and wasted items data
const mostUsedItems = [
  { name: 'Milk', frequency: 24, category: 'Refrigerator' },
  { name: 'Bread', frequency: 18, category: 'Pantry' },
  { name: 'Eggs', frequency: 15, category: 'Refrigerator' },
  { name: 'Paper Towels', frequency: 12, category: 'Household' },
  { name: 'Rice', frequency: 8, category: 'Pantry' },
];

const mostWastedItems = [
  { name: 'Vegetables', frequency: 8, category: 'Refrigerator' },
  { name: 'Fruits', frequency: 6, category: 'Refrigerator' },
  { name: 'Bread', frequency: 4, category: 'Pantry' },
  { name: 'Yogurt', frequency: 4, category: 'Refrigerator' },
  { name: 'Milk', frequency: 3, category: 'Refrigerator' },
];

// Color scheme for charts
const COLORS = ['#4caf50', '#8d6e63', '#a5d6a7', '#3e2723', '#c8e6c9'];

const History = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterAction, setFilterAction] = useState<string>("");
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar");

  // Filter history items based on selected filters
  const filteredHistoryItems = historyItems.filter((item) => {
    let match = true;
    
    if (filterDate) {
      const itemDate = new Date(item.date);
      match = match && (
        itemDate.getDate() === filterDate.getDate() &&
        itemDate.getMonth() === filterDate.getMonth() &&
        itemDate.getFullYear() === filterDate.getFullYear()
      );
    }
    
    if (filterCategory) {
      match = match && item.category === filterCategory;
    }
    
    if (filterAction) {
      match = match && item.action === filterAction;
    }
    
    return match;
  });

  const handleClearFilters = () => {
    setFilterDate(undefined);
    setFilterCategory("");
    setFilterAction("");
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'added':
        return 'bg-primary/20 text-primary border-primary/20';
      case 'removed':
        return 'bg-accent/20 text-accent border-accent/20';
      case 'expired':
        return 'bg-destructive/20 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">History & Insights</h2>
          <p className="text-muted-foreground">
            Track your inventory activities and discover usage patterns
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="history" className="flex-1">
            Activity History
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex-1">
            Usage Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Activity History</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 justify-start w-[180px]">
                        <Calendar className="mr-2 h-4 w-4" />
                        {filterDate ? format(filterDate, "PPP") : "Filter by date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filterDate}
                        onSelect={setFilterDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                      <SelectItem value="Pantry">Pantry</SelectItem>
                      <SelectItem value="Freezer">Freezer</SelectItem>
                      <SelectItem value="Household">Household</SelectItem>
                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterAction} onValueChange={setFilterAction}>
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Actions</SelectItem>
                      <SelectItem value="added">Added</SelectItem>
                      <SelectItem value="removed">Removed</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredHistoryItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                  <p>No history items match your filters</p>
                  <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Group items by date */}
                  {Array.from(new Set(filteredHistoryItems.map(item => 
                    new Date(item.date).toDateString()
                  ))).map(dateString => (
                    <div key={dateString} className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{format(new Date(dateString), "MMMM d, yyyy")}</span>
                      </div>
                      
                      <div className="space-y-3">
                        {filteredHistoryItems
                          .filter(item => new Date(item.date).toDateString() === dateString)
                          .map((item) => (
                            <div 
                              key={item.id} 
                              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <Badge variant="outline" className={getActionBadgeColor(item.action)}>
                                  {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                                </Badge>
                                <div>
                                  <div className="text-base font-medium">
                                    {item.item}
                                  </div>
                                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2">
                                    <span>{item.quantity} {item.unit}</span>
                                    <Badge variant="outline" className="bg-secondary/50">
                                      {item.category}
                                    </Badge>
                                    <span className="text-xs">
                                      {format(new Date(item.date), "h:mm a")} • {item.user}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0 space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant={chartType === "bar" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChartIcon className="mr-2 h-4 w-4" />
              Bar Chart
            </Button>
            <Button 
              variant={chartType === "pie" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="mr-2 h-4 w-4" />
              Pie Chart
            </Button>
            <Button 
              variant={chartType === "line" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line Chart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>
                  Inventory changes over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {chartType === "bar" && (
                    <ChartContainer
                      config={{
                        added: { label: 'Added', color: 'var(--primary)' },
                        removed: { label: 'Removed', color: 'var(--accent)' },
                        expired: { label: 'Expired', color: 'var(--destructive)' },
                      }}
                    >
                      <BarChart
                        data={monthlyActivityData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="added" name="Added" fill="var(--primary)" />
                        <Bar dataKey="removed" name="Removed" fill="var(--accent)" />
                        <Bar dataKey="expired" name="Expired" fill="var(--destructive)" />
                      </BarChart>
                    </ChartContainer>
                  )}
                  
                  {chartType === "line" && (
                    <ChartContainer
                      config={{
                        added: { label: 'Added', color: 'var(--primary)' },
                        removed: { label: 'Removed', color: 'var(--accent)' },
                        expired: { label: 'Expired', color: 'var(--destructive)' },
                      }}
                    >
                      <LineChart
                        data={monthlyActivityData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="added" name="Added" stroke="var(--primary)" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="removed" name="Removed" stroke="var(--accent)" />
                        <Line type="monotone" dataKey="expired" name="Expired" stroke="var(--destructive)" />
                      </LineChart>
                    </ChartContainer>
                  )}
                  
                  {chartType === "pie" && (
                    <ChartContainer
                      config={{
                        Refrigerator: { label: 'Refrigerator', color: '#4caf50' },
                        Pantry: { label: 'Pantry', color: '#8d6e63' },
                        Household: { label: 'Household', color: '#a5d6a7' },
                        Freezer: { label: 'Freezer', color: '#3e2723' },
                        'Office Supplies': { label: 'Office Supplies', color: '#c8e6c9' },
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={categoryConsumptionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryConsumptionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent nameKey="name" labelKey="value" />} />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Consumption by Category</CardTitle>
                <CardDescription>
                  Breakdown of inventory usage across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      Refrigerator: { label: 'Refrigerator', color: '#4caf50' },
                      Pantry: { label: 'Pantry', color: '#8d6e63' },
                      Household: { label: 'Household', color: '#a5d6a7' },
                      Freezer: { label: 'Freezer', color: '#3e2723' },
                      'Office Supplies': { label: 'Office Supplies', color: '#c8e6c9' },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={categoryConsumptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryConsumptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent nameKey="name" labelKey="value" />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Most Used Items</CardTitle>
                <CardDescription>
                  Items with highest consumption frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostUsedItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(item.frequency / mostUsedItems[0].frequency) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.frequency}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Most Wasted Items</CardTitle>
                <CardDescription>
                  Items that expired before use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostWastedItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10 text-destructive font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-destructive rounded-full" 
                            style={{ width: `${(item.frequency / mostWastedItems[0].frequency) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.frequency}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
