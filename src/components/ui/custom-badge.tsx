import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default"
  | "admin"
  | "active"
  | "pending"
  | "rejected"
  | "inactive"
  | "seller"
  | "buyer";

interface CustomBadgeProps {
  variant: StatusVariant;
  children: ReactNode;
  className?: string;
}

const statusColorMap: Record<StatusVariant, string> = {
  success: "bg-green-200 text-black",
  warning: "bg-orange-200 text-black",
  error: "bg-red-200 text-black",
  info: "bg-blue-200 text-black",
  default: "",
  admin: "bg-pink-200 text-black",
  active: "bg-green-200 text-black",
  pending: "bg-gray-200 text-black",
  rejected: "bg-rose-200 text-black",
  inactive: "bg-rose-200 text-black",
  seller: "bg-gray-200 text-black",
  buyer: "bg-gray-200 text-black",
};

export const StatusBadge = ({
  variant,
  children,
  className,
}: CustomBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-normal border",
        statusColorMap[variant],
        className
      )}
    >
      {children}
    </Badge>
  );
};
