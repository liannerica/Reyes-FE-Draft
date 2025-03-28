import { useState } from "react";
import {
  BadgeCheck,
  Clock,
  X,
  AlertTriangle,
  ArrowUpDown,
  DollarSign,
  Calendar,
  Tag,
  User,
  FileText,
  Image,
} from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuctionItem } from "@/lib/types";
import { auctionItems } from "@/lib/data";
import MainLayout from "@/components/Layout/MainLayout";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/custom-badge";

const AuctionApprovals = () => {
  const [itemsData, setItemsData] = useState<AuctionItem[]>(auctionItems);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Helper function to map application status to StatusBadge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "rejected";
      case "pending":
        return "pending";
      case "sold":
        return "warning";
      default:
        return "default";
    }
  };

  const handleViewDetails = (item: AuctionItem) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleApprove = (item: AuctionItem) => {
    setItemsData(
      itemsData.map((i) =>
        i.id === item.id ? { ...i, status: "approved" } : i
      )
    );

    toast.success(`${item.name} has been approved for auction`);
    setIsViewDialogOpen(false);
  };

  const handleReject = (item: AuctionItem) => {
    setItemsData(
      itemsData.map((i) =>
        i.id === item.id ? { ...i, status: "rejected" } : i
      )
    );

    toast.success(`${item.name} has been rejected from auction`);
    setIsViewDialogOpen(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      id: "name",
      header: "Item",
      cell: (row: AuctionItem) => (
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
            <div className="text-sm text-muted-foreground">{row.category}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "price",
      header: "Starting Bid",
      cell: (row: AuctionItem) => (
        <div className="font-medium">${row.startingBid.toLocaleString()}</div>
      ),
      sortable: true,
    },
    {
      id: "sellerName",
      header: "Seller",
      cell: (row: AuctionItem) => (
        <div className="text-sm">{row.sellerName}</div>
      ),
      sortable: true,
    },
    {
      id: "createdAt",
      header: "Submitted",
      cell: (row: AuctionItem) => (
        <div className="text-sm">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: AuctionItem) => {
        let icon;

        switch (row.status) {
          case "approved":
            icon = <BadgeCheck className="h-4 w-4 mr-1 text-success" />;
            break;
          case "rejected":
            icon = <X className="h-4 w-4 mr-1" />;
            break;
          case "pending":
            icon = <Clock className="h-4 w-4 mr-1 text-muted-foreground" />;
            break;
          case "sold":
            icon = <AlertTriangle className="h-4 w-4 mr-1 text-warning" />;
            break;
        }

        return (
          <div className="flex items-center">
            <StatusBadge
              variant={getStatusVariant(row.status)}
              className="gap-1"
            >
              {icon}
              {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            </StatusBadge>
          </div>
        );
      },
      sortable: true,
    },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Auction Approvals</h1>
        <p className="text-muted-foreground">
          Review and approve items for auction
        </p>
      </div>

      <Card className="shadow-soft">
        <DataTable
          columns={columns}
          data={itemsData}
          onView={handleViewDetails}
          searchPlaceholder="Search items..."
        />
      </Card>

      {/* View Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Auction Item Review</DialogTitle>
            <DialogDescription>
              Review the item details for auction approval.
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              {selectedItem.imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                <StatusBadge
                  variant={getStatusVariant(selectedItem.status)}
                  className="capitalize"
                >
                  {selectedItem.status.charAt(0).toUpperCase() +
                    selectedItem.status.slice(1)}
                </StatusBadge>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start">
                  <Image className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Item Details
                    </Label>
                    <p className="font-medium">{selectedItem.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Tag className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Category</Label>
                    <p className="font-medium">{selectedItem.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">
                        Starting Bid
                      </Label>
                      <p className="font-medium">
                        ${selectedItem.startingBid.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ArrowUpDown className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">
                        Current Bid
                      </Label>
                      <p className="font-medium">
                        {selectedItem.currentBid
                          ? `$${selectedItem.currentBid.toLocaleString()}`
                          : "No bids yet"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">
                        Auction Start
                      </Label>
                      <p className="font-medium">
                        {formatDate(selectedItem.auctionStart)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">
                        Auction End
                      </Label>
                      <p className="font-medium">
                        {formatDate(selectedItem.auctionEnd)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Seller</Label>
                    <p className="font-medium">{selectedItem.sellerName}</p>
                    <p className="text-sm text-muted-foreground">
                      Seller ID: {selectedItem.sellerId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Submission Details
                    </Label>
                    <p className="text-sm">
                      Submitted on{" "}
                      {new Date(selectedItem.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      This item has been reviewed and verified for authenticity.
                      {selectedItem.status === "pending"
                        ? " Awaiting final approval for auction."
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedItem?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedItem)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedItem)}
                  className="gap-1"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {selectedItem?.status !== "pending" && (
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AuctionApprovals;
