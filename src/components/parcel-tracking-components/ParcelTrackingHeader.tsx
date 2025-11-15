/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Copy } from "lucide-react";


export default function ParcelTrackingHeader({ parcel }: any) {
    const copyTrackingId = () => {
        navigator.clipboard.writeText(parcel.trackingId);
        toast.success("Tracking ID copied!");
    };
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    FastDrop
                </h1>
                <p className="text-sm text-muted-foreground">
                    Order ID: {parcel._id.slice(-8)} | Order Date:{" "}
                    {format(new Date(parcel.createdAt), "dd MMM yyyy")}
                </p>
            </div>
            <Button variant="outline" size="sm" onClick={copyTrackingId}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
            </Button>
        </div>
    )
}
