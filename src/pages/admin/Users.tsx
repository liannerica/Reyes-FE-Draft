import { useState } from "react";
import {
  BadgeCheck,
  Clock,
  MoreHorizontal,
  Plus,
  UserPlus,
  X,
} from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { users } from "@/lib/data";
import MainLayout from "@/components/Layout/MainLayout";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/custom-badge";

const Users = () => {
  const [usersData, setUsersData] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm<User>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      role: "buyer",
      status: "active",
      createdAt: new Date(),
    },
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.reset({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      avatarUrl: user.avatarUrl,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsersData(usersData.filter((user) => user.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      toast.success(`${selectedUser.name} has been deleted`);
    }
  };

  const handleAddUser = () => {
    form.reset({
      id: "",
      name: "",
      email: "",
      role: "buyer",
      status: "active",
      createdAt: new Date(),
    });
    setIsAddDialogOpen(true);
  };

  const onSubmit = (data: User) => {
    if (isEditDialogOpen) {
      // Update existing user
      setUsersData(
        usersData.map((user) => (user.id === data.id ? { ...data } : user))
      );
      setIsEditDialogOpen(false);
      toast.success(`${data.name}'s profile has been updated`);
    } else {
      // Add new user
      const newUser = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        avatarUrl: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? "men" : "women"
        }/${Math.floor(Math.random() * 50)}.jpg`,
      };
      setUsersData([newUser, ...usersData]);
      setIsAddDialogOpen(false);
      toast.success(`${newUser.name} has been added successfully`);
    }
  };

  const columns = [
    {
      id: "name",
      header: "User",
      cell: (row: User) => (
        <div className="flex items-center">
          {row.avatarUrl ? (
            <img
              src={row.avatarUrl}
              alt={row.name}
              className="h-8 w-8 rounded-full mr-3"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-medium">
                {row.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "role",
      header: "Role",
      cell: (row: User) => (
        <StatusBadge variant={row.role}>
          {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
        </StatusBadge>
      ),
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: User) => {
        let icon;

        switch (row.status) {
          case "active":
            icon = <BadgeCheck className="h-4 w-4 mr-1 text-success" />;
            break;
          case "inactive":
            icon = <X className="h-4 w-4 mr-1 text-destructive" />;
            break;
          case "pending":
            icon = <Clock className="h-4 w-4 mr-1 text-muted-foreground" />;
            break;
        }

        return (
          <div className="flex items-center">
            <StatusBadge variant={row.status} className="gap-1">
              {icon}
              {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            </StatusBadge>
          </div>
        );
      },
      sortable: true,
    },
    {
      id: "createdAt",
      header: "Joined",
      cell: (row: User) => (
        <div className="text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage users and their permissions
          </p>
        </div>
      </div>

      <Card className="shadow-soft">
        <DataTable
          columns={columns}
          data={usersData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search users..."
        />
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user profile here.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                            <SelectItem value="buyer">Buyer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details of the new user.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                            <SelectItem value="buyer">Buyer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-3">
            {selectedUser?.avatarUrl && (
              <img
                src={selectedUser.avatarUrl}
                alt={selectedUser?.name}
                className="h-10 w-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedUser?.email}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Users;
