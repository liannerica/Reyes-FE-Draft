import { Link, useLocation, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SellerNavbar from "@/components/SellerNavbar";
import { FileText, CheckCircle, AlertCircle, Clock, ArrowLeft, Download, ClipboardList } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TransactionPayment() {
  const { transactionId } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const itemName = queryParams.get("item") || "Unknown Item";
  const customerName = queryParams.get("customer") || "Unknown Customer";
  const amount = queryParams.get("amount") || "0";
  const status = queryParams.get("status") || "UNPAID";
  const transactionTime = queryParams.get("transactionTime");

  const formattedTransactionTime = transactionTime
    ? new Date(transactionTime).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  const amountLabel = status === "COMPLETED" ? "Amount Received" : "Total Amount Due";

  let transactionTimeMessage = "";
  let StatusIcon = Clock;
  let statusColor = "text-yellow-500";

  if (status === "COMPLETED") {
    transactionTimeMessage = `Payment completed on ${formattedTransactionTime}.`;
    StatusIcon = CheckCircle;
    statusColor = "text-green-600";
  } else if (status === "UNPAID") {
    transactionTimeMessage = `Payment not received. Order placed on ${formattedTransactionTime}.`;
    StatusIcon = Clock;
    statusColor = "text-yellow-500";
  } else if (status === "FAILED") {
    transactionTimeMessage = `Payment failed on ${formattedTransactionTime}.`;
    StatusIcon = AlertCircle;
    statusColor = "text-red-600";
  }

  return (
    <div className="flex flex-col gap-6">
      <SellerNavbar />
      
      <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
        <div className="mb-4">
          <Link
            to="/seller/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#5A3A31]/80 hover:text-[#5A3A31] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>

        <Card className="shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#AA8F66] to-[#8B6914] p-6 rounded-t-3xl">
            <h1 className="text-3xl font-extrabold text-white text-center tracking-wide">
              {itemName}
            </h1>
          </div>
          
          <CardContent className="p-8 bg-white space-y-6">
            {/* Transaction Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer & Amount Column */}
              <div className="space-y-4">
                <div className="bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-[#5A3A31]/70 mb-2">Customer Name</p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#AA8F66]/20 p-2 rounded-full">
                      <ClipboardList className="w-5 h-5 text-[#8B6914]" />
                    </div>
                    <p className="font-semibold text-[#5A3A31] text-lg">{customerName}</p>
                  </div>
                </div>

                <div className="bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-[#5A3A31]/70 mb-2">{amountLabel}</p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#AA8F66]/20 p-2 rounded-full">
                      <div className="text-[#8B6914] font-bold text-lg">$</div>
                    </div>
                    <p className="font-bold text-2xl text-[#8B6914]">{amount}</p>
                  </div>
                </div>
              </div>

              {/* Status & Payment Column */}
              <div className="space-y-4">
                <div className="bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-[#5A3A31]/70 mb-2">Payment Status</p>
                  <div className="flex items-center space-x-3">
                    <div className={`bg-${statusColor}/20 p-2 rounded-full`}>
                      <StatusIcon className={`w-6 h-6 ${statusColor}`} />
                    </div>
                    <p className={`font-semibold ${statusColor} text-lg`}>{status}</p>
                  </div>
                </div>

                <div className="bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-[#5A3A31]/70 mb-2">Mode of Payment</p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#AA8F66]/20 p-2 rounded-full">
                      <FileText className="w-6 h-6 text-[#8B6914]" />
                    </div>
                    <p className="font-semibold text-[#5A3A31] text-lg">InstaPay</p>
                  </div>
                </div>
              </div>
            </div>
                
            {/* Transaction Time Message */}
            {transactionTimeMessage && (
              <div className="bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 p-4 rounded-xl border border-[#AA8F66]/30">
                <p className="text-sm text-[#5A3A31]/80 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#8B6914]" />
                  {transactionTimeMessage}
                </p>
              </div>
            )}
                
            {/* Proof of Payment Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#5A3A31] mb-4">Proof of Payment</h3>
              <div className="w-full h-64 bg-[#AA8F66]/10 hover:bg-[#AA8F66]/20 border-2 border-dashed border-[#AA8F66]/50 rounded-xl flex items-center justify-center hover:border-[#8B6914] transition-all">
                <div className="text-center space-y-4">
                  <FileText className="w-12 h-12 mx-auto text-[#AA8F66]" />
                  <p className="text-[#5A3A31]/70">No proof of payment uploaded by customer</p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="mt-4 border-[#8B6914] text-[#8B6914] hover:bg-[#AA8F66]/10"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Transaction Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Transaction Report</DialogTitle>
                      </DialogHeader>
                      <div className="w-full h-[500px] bg-[#F5E6D3]/50 flex items-center justify-center rounded-lg">
                        <p className="text-[#5A3A31]">Transaction Report Preview</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
                
            {/* Download Full Details Button */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full border-[#8B6914] text-[#8B6914] hover:bg-[#AA8F66]/10 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" /> Download Full Transaction Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}