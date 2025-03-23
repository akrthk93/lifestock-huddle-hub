
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
import { 
  ChevronLeft, 
  Home, 
  MoreHorizontal, 
  Package, 
  Plus, 
  Settings, 
  ShoppingCart, 
  Tag, 
  Trash, 
  UserPlus, 
  Users,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// Mock data for household
const householdData = {
  id: 1,
  name: "My Home",
  role: "owner",
  members: [
    { id: 1, name: "You", email: "you@example.com", role: "owner", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active" },
    { id: 3, name: "Tom Wilson", email: "tom@example.com", role: "member", status: "active" },
  ],
  inventorySummary: [
    { category: "Pantry", itemCount: 18, lowStock: 2 },
    { category: "Refrigerator", itemCount: 15, lowStock: 3 },
    { category: "Freezer", itemCount: 9, lowStock: 0 },
  ],
  categories: 6,
  inventoryItems: 42,
  shoppingListItems: 5,
  lowStockItems: 5,
};

// Mock permissions data
const permissionsData = [
  { id: "inv_view", name: "View Inventory", description: "Can view all inventory items" },
  { id: "inv_add", name: "Add Items", description: "Can add new items to inventory" },
  { id: "inv_edit", name: "Edit Items", description: "Can edit existing inventory items" },
  { id: "inv_delete", name: "Delete Items", description: "Can delete inventory items" },
  { id: "cat_manage", name: "Manage Categories", description: "Can create, edit and delete categories" },
  { id: "shop_manage", name: "Manage Shopping List", description: "Can add and check off shopping list items" },
  { id: "member_invite", name: "Invite Members", description: "Can invite new members to the household" },
  { id: "member_remove", name: "Remove Members", description: "Can remove members from the household" },
  { id: "admin_settings", name: "Household Settings", description: "Can modify household settings" },
];

// Mock roles with their permissions
const rolesWithPermissions = {
  owner: permissionsData.map(p => p.id),
  admin: ["inv_view", "inv_add", "inv_edit", "inv_delete", "cat_manage", "shop_manage", "member_invite"],
  member: ["inv_view", "inv_add", "inv_edit", "shop_manage"],
};

const HouseholdDetail = () => {
  const { id } = useParams();
  const [household] = useState(householdData);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    
    // Validate email format
    if (!/\S+@\S+\.\S+/.test(inviteEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setInviteRole("member");
    setIsInviteDialogOpen(false);
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setIsEditMemberOpen(true);
  };

  const handleSaveMemberChanges = () => {
    toast.success(`Member role updated`);
    setIsEditMemberOpen(false);
    setSelectedMember(null);
  };

  const handleRemoveMember = (memberId: number) => {
    toast.success("Member removed from household");
  };

  const checkPermission = (role: string, permissionId: string) => {
    const rolePerms = rolesWithPermissions[role as keyof typeof rolesWithPermissions] || [];
    return rolePerms.includes(permissionId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/households" className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            {household.name}
          </h2>
          <p className="text-muted-foreground">
            Manage your household inventory and members
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-2xl grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="members">
            Members
          </TabsTrigger>
          <TabsTrigger value="permissions">
            Permissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary" />
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{household.inventoryItems}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Across {household.categories} categories
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/inventory">
                      View Inventory
                    </Link>
                  </Button>
                </div>
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
                <div className="text-3xl font-bold">{household.shoppingListItems}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Items to purchase
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/shopping-list">
                      View Shopping List
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{household.members.length}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Active household members
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setActiveTab("members")}
                  >
                    Manage Members
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
              <CardDescription>
                Items by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {household.inventorySummary.map((category) => (
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
                    <Progress value={category.itemCount * 2} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/categories">
                  <Button variant="outline" className="w-full">Manage Categories</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage household settings
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Manage</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <div className="text-sm font-medium">Household Name</div>
                    <div className="text-sm text-muted-foreground">{household.name}</div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <div className="text-sm font-medium">Default Categories</div>
                    <div className="text-sm text-muted-foreground">
                      {household.categories} categories configured
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Customize</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-destructive">Delete Household</div>
                    <div className="text-sm text-muted-foreground">
                      This action cannot be undone
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Household Members</CardTitle>
                  <CardDescription>
                    Manage members and their roles
                  </CardDescription>
                </div>
                
                <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Invite New Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your household
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Role
                        </label>
                        <Select
                          value={inviteRole}
                          onValueChange={setInviteRole}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {inviteRole === "admin" 
                            ? "Admins can manage inventory, categories, and invite members" 
                            : "Members can view and add items to inventory and shopping list"}
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleInviteMember}>
                        Send Invitation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {household.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="font-medium flex items-center gap-2">
                            {member.name}
                            {member.id === 1 && <Badge variant="outline">You</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              member.role === "owner" 
                                ? "default" 
                                : member.role === "admin" 
                                  ? "secondary" 
                                  : "outline"
                            }
                          >
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {member.id !== 1 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditMember(member)}>
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  Remove Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Member Role</DialogTitle>
                    <DialogDescription>
                      Update role and permissions for {selectedMember?.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="grid gap-2">
                      <label htmlFor="editRole" className="text-sm font-medium">
                        Role
                      </label>
                      <Select
                        defaultValue={selectedMember?.role}
                      >
                        <SelectTrigger id="editRole">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setIsEditMemberOpen(false);
                      setSelectedMember(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveMemberChanges}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="mt-0 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Manage permissions for different roles in your household
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Member</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionsData.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="font-medium">{permission.name}</div>
                        </TableCell>
                        <TableCell>{permission.description}</TableCell>
                        <TableCell>
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                        </TableCell>
                        <TableCell>
                          {checkPermission("admin", permission.id) ? (
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell>
                          {checkPermission("member", permission.id) ? (
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> The Owner role has all permissions and cannot be modified. You can 
                  customize Admin and Member roles to fit your household's needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HouseholdDetail;
