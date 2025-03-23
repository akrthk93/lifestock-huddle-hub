
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
import { 
  Home, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash, 
  Users,
  UserPlus, 
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock households data
const householdsData = [
  { 
    id: 1, 
    name: "My Home", 
    role: "owner", 
    members: 3, 
    inventoryItems: 42,
    lowStockItems: 5,
    categories: 6
  },
  { 
    id: 2, 
    name: "Beach House", 
    role: "admin", 
    members: 4, 
    inventoryItems: 18,
    lowStockItems: 2,
    categories: 4
  },
  { 
    id: 3, 
    name: "Office", 
    role: "member", 
    members: 8, 
    inventoryItems: 35,
    lowStockItems: 3,
    categories: 5
  },
];

const invitationsData = [
  { 
    id: 101, 
    name: "Cabin", 
    invitedBy: "John Smith",
    date: "2023-12-01"
  },
  { 
    id: 102, 
    name: "Restaurant Supply", 
    invitedBy: "Jane Doe",
    date: "2023-11-25"
  },
];

const Households = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [households, setHouseholds] = useState(householdsData);
  const [invitations, setInvitations] = useState(invitationsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newHouseholdName, setNewHouseholdName] = useState("");

  const filteredHouseholds = households.filter((household) =>
    household.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddHousehold = () => {
    if (!newHouseholdName.trim()) {
      toast.error("Household name cannot be empty");
      return;
    }
    
    toast.success(`Household "${newHouseholdName}" created`);
    setNewHouseholdName("");
    setIsAddDialogOpen(false);
  };

  const handleDeleteHousehold = (householdId: number) => {
    toast.success("Household deleted");
  };

  const handleLeaveHousehold = (householdId: number) => {
    toast.success("Left household");
  };

  const handleAcceptInvitation = (invitationId: number) => {
    toast.success("Invitation accepted");
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
  };

  const handleDeclineInvitation = (invitationId: number) => {
    toast.success("Invitation declined");
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Households</h2>
          <p className="text-muted-foreground">
            Manage your household inventories
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Household
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Household</DialogTitle>
              <DialogDescription>
                Create a new household to manage inventory with others
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="householdName" className="text-sm font-medium">
                  Household Name
                </label>
                <Input
                  id="householdName"
                  placeholder="Enter household name"
                  value={newHouseholdName}
                  onChange={(e) => setNewHouseholdName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setNewHouseholdName("");
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddHousehold}>
                Create Household
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {invitations.length > 0 && (
        <div className="bg-secondary/50 rounded-lg p-4 border">
          <h3 className="text-lg font-medium mb-4">Pending Invitations</h3>
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div 
                key={invitation.id} 
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-base font-medium">
                      {invitation.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Invited by {invitation.invitedBy} on {new Date(invitation.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAcceptInvitation(invitation.id)}
                  >
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeclineInvitation(invitation.id)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Your Households</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search households..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHouseholds.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No households found
              </div>
            ) : (
              filteredHouseholds.map((household) => (
                <div 
                  key={household.id} 
                  className="rounded-lg border bg-card transition-all hover:shadow-md"
                >
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <Link to={`/households/${household.id}`} className="text-xl font-medium hover:text-primary transition-colors">
                        {household.name}
                      </Link>
                      <Badge variant={household.role === "owner" ? "default" : 
                        household.role === "admin" ? "secondary" : "outline"}>
                        {household.role}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Inventory</div>
                        <div className="text-lg font-medium">{household.inventoryItems} items</div>
                        <div className="text-xs text-amber-500">
                          {household.lowStockItems} low stock
                        </div>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Members</div>
                        <div className="text-lg font-medium">{household.members}</div>
                        <div className="text-xs text-muted-foreground">
                          {household.categories} categories
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link to={`/households/${household.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/households/${household.id}`} className="flex cursor-default">
                              <Users className="mr-2 h-4 w-4" />
                              Manage Members
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Members
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {household.role !== "owner" ? (
                            <DropdownMenuItem 
                              onClick={() => handleLeaveHousehold(household.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Leave Household
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleDeleteHousehold(household.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Household
                            </DropdownMenuItem>
                          )}
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

export default Households;
