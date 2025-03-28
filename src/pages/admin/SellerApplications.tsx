import { useState } from "react";
import {
  BadgeCheck,
  Clock,
  X,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  CreditCard,
  FileText,
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
import { SellerApplication } from "@/lib/types";
import { sellerApplications, users } from "@/lib/data";
import MainLayout from "@/components/Layout/MainLayout";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/custom-badge";

const SellerApplications = () => {
  const [applicationsData, setApplicationsData] =
    useState<SellerApplication[]>(sellerApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<SellerApplication | null>(null);
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
      default:
        return "default";
    }
  };

  const handleViewDetails = (application: SellerApplication) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleApprove = (application: SellerApplication) => {
    // Update application status
    setApplicationsData(
      applicationsData.map((app) =>
        app.id === application.id ? { ...app, status: "approved" } : app
      )
    );

    // Also update the user's role to seller if they're in pending status
    const user = users.find((u) => u.id === application.userId);
    if (user && user.status === "pending") {
      user.status = "active";
      user.role = "seller";
    }

    toast.success(`${application.name}'s application has been approved`);
    setIsViewDialogOpen(false);
  };

  const handleReject = (application: SellerApplication) => {
    setApplicationsData(
      applicationsData.map((app) =>
        app.id === application.id ? { ...app, status: "rejected" } : app
      )
    );

    toast.success(`${application.name}'s application has been rejected`);
    setIsViewDialogOpen(false);
  };

  const columns = [
    {
      id: "name",
      header: "Applicant",
      cell: (row: SellerApplication) => (
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
      id: "businessName",
      header: "Business Name",
      cell: (row: SellerApplication) => (
        <div className="text-sm">{row.businessName || "N/A"}</div>
      ),
      sortable: true,
    },
    {
      id: "phone",
      header: "Phone",
      cell: (row: SellerApplication) => (
        <div className="text-sm">{row.phone}</div>
      ),
      sortable: true,
    },
    {
      id: "submittedAt",
      header: "Submitted",
      cell: (row: SellerApplication) => (
        <div className="text-sm">
          {new Date(row.submittedAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: SellerApplication) => {
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
        <h1 className="text-2xl font-bold tracking-tight">
          Seller Applications
        </h1>
        <p className="text-muted-foreground">
          Review and approve seller applications
        </p>
      </div>

      <Card className="shadow-soft">
        <DataTable
          columns={columns}
          data={applicationsData}
          onView={handleViewDetails}
          searchPlaceholder="Search applications..."
        />
      </Card>

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Seller Application</DialogTitle>
            <DialogDescription>
              Review the seller application details.
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div className="flex items-center">
                {selectedApplication.avatarUrl && (
                  <img
                    src={selectedApplication.avatarUrl}
                    alt={selectedApplication.name}
                    className="h-16 w-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedApplication.name}
                  </h3>
                  <p className="text-muted-foreground">
                    Applied on{" "}
                    {new Date(
                      selectedApplication.submittedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge
                  variant={getStatusVariant(selectedApplication.status)}
                  className="ml-auto capitalize"
                >
                  {selectedApplication.status}
                </StatusBadge>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Personal Information
                    </Label>
                    <p className="font-medium">{selectedApplication.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <Building className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Business Name
                    </Label>
                    <p className="font-medium">
                      {selectedApplication.businessName || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Business Address
                    </Label>
                    <p className="font-medium">
                      {selectedApplication.businessAddress || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Tax ID</Label>
                    <p className="font-medium">
                      {selectedApplication.taxId || "Not provided"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">
                      Additional Notes
                    </Label>
                    <p className="text-sm">
                      The applicant has provided all required documentation and
                      information for review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedApplication?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedApplication)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedApplication)}
                  className="gap-1"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {selectedApplication?.status !== "pending" && (
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default SellerApplications;