import { useState } from "react";
import { BadgeCheck, Clock, PackagePlus, X, AlertTriangle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Item } from "@/lib/types";
import { items, users } from "@/lib/data";
import MainLayout from "@/components/Layout/MainLayout";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/custom-badge";
import { Badge } from "@/components/ui/badge";

const Items = () => {
  const [itemsData, setItemsData] = useState<Item[]>(items);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm<Item>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      price: 0,
      sellerId: "",
      sellerName: "",
      status: "pending",
      category: "",
      createdAt: new Date(),
    },
  });

  const handleViewDetails = (item: Item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    form.reset({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
      status: item.status,
      category: item.category,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setItemsData(itemsData.filter((item) => item.id !== selectedItem.id));
      setIsDeleteDialogOpen(false);
      toast.success(`Item deleted successfully`);
    }
  };

  const handleAddItem = () => {
    const sellers = users.filter(
      (user) => user.role === "seller" && user.status === "active"
    );
    if (sellers.length === 0) {
      toast.error("No active sellers found. Please add a seller first.");
      return;
    }

    const defaultSeller = sellers[0];

    form.reset({
      id: "",
      name: "",
      description: "",
      price: 0,
      sellerId: defaultSeller.id,
      sellerName: defaultSeller.name,
      status: "pending",
      category: "",
      createdAt: new Date(),
    });
    setIsAddDialogOpen(true);
  };

  const onSubmit = (data: Item) => {
    if (isEditDialogOpen) {
      // Update existing item
      setItemsData(
        itemsData.map((item) => (item.id === data.id ? { ...data } : item))
      );
      setIsEditDialogOpen(false);
      toast.success(`Item details updated successfully`);
    } else {
      // Add new item
      const newItem = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        imageUrl:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
      };
      setItemsData([newItem, ...itemsData]);
      setIsAddDialogOpen(false);
      toast.success(`New item added successfully`);
    }
  };

  const columns = [
    {
      id: "name",
      header: "Item",
      cell: (row: Item) => (
        <div className="flex items-center">
          {row.imageUrl ? (
            <div
              className="h-10 w-10 rounded-md bg-cover bg-center mr-3"
              style={{ backgroundImage: `url(${row.imageUrl})` }}
            />
          ) : (
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-medium">
                {row.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium truncate max-w-[200px]">{row.name}</div>
            <div className="text-sm text-muted-foreground">
              ID: {row.id.substring(0, 8)}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "price",
      header: "Price",
      cell: (row: Item) => (
        <div className="font-medium">${row.price.toLocaleString()}</div>
      ),
      sortable: true,
    },
    {
      id: "category",
      header: "Category",
      cell: (row: Item) => <Badge variant="outline">{row.category}</Badge>,
      sortable: true,
    },
    {
      id: "sellerName",
      header: "Seller",
      cell: (row: Item) => <div className="text-sm">{row.sellerName}</div>,
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: Item) => {
        let icon;

        // Map status to appropriate variant
        const statusVariantMap: Record<string, any> = {
          approved: "active",
          rejected: "rejected",
          pending: "pending",
          sold: "warning",
        };

        const variant = statusVariantMap[row.status] || "info";

        switch (row.status) {
          case "approved":
            icon = <BadgeCheck className="h-4 w-4 mr-1 text-success" />;
            break;
          case "rejected":
            icon = <X className="h-4 w-4 mr-1 text-destructive" />;
            break;
          case "pending":
            icon = <Clock className="h-4 w-4 mr-1 text-muted-foreground" />;
            break;
          case "sold":
            icon = <AlertTriangle className="h-4 w-4 mr-1 text-warning" />;
            break;
        }

        return (
          <StatusBadge variant={variant} className="gap-1">
            {icon}
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </StatusBadge>
        );
      },
      sortable: true,
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Items</h1>
          <p className="text-muted-foreground">Manage auction items</p>
        </div>
        <Button 
          onClick={handleAddItem} 
          className="gap-1 bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white"
        >
          <PackagePlus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card className="shadow-soft">
        <DataTable
          columns={columns}
          data={itemsData}
          onView={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Search items..."
        />
      </Card>

      {/* View Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              {selectedItem.imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Price</Label>
                  <p className="font-medium">
                    ${selectedItem.price.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="font-medium">{selectedItem.category}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">
                    {selectedItem.status}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Seller</Label>
                  <p className="font-medium">{selectedItem.sellerName}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Listed On</Label>
                  <p className="font-medium">
                    {new Date(selectedItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to the item details here.
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
                        <Input placeholder="Vintage Watch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the item..."
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Watches, Art, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sellerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const seller = users.find((u) => u.name === value);
                            if (seller) {
                              form.setValue("sellerId", seller.id);
                              field.onChange(value);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select seller" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users
                              .filter((user) => user.role === "seller")
                              .map((seller) => (
                                <SelectItem key={seller.id} value={seller.name}>
                                  {seller.name}
                                </SelectItem>
                              ))}
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
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
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

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Enter the details of the new item.
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
                        <Input placeholder="Vintage Watch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the item..."
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Watches, Art, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sellerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const seller = users.find((u) => u.name === value);
                            if (seller) {
                              form.setValue("sellerId", seller.id);
                              field.onChange(value);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select seller" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users
                              .filter((user) => user.role === "seller")
                              .map((seller) => (
                                <SelectItem key={seller.id} value={seller.name}>
                                  {seller.name}
                                </SelectItem>
                              ))}
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
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
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
                <Button type="submit">Create Item</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-3">
            {selectedItem?.imageUrl && (
              <div
                className="h-10 w-10 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedItem.imageUrl})` }}
              />
            )}
            <div>
              <p className="font-medium">{selectedItem?.name}</p>
              <p className="text-sm text-muted-foreground">
                ${selectedItem?.price?.toLocaleString()}
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

export default Items;