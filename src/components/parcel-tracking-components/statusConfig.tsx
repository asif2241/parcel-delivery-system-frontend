import type { PARCEL_STATUS } from "@/types/parcelTypes";
import { Package, Truck, CheckCircle, XCircle, Clock, RotateCw } from "lucide-react";


/* ──────────────────────── Types ──────────────────────── */
type StatusConfig = Record<
    PARCEL_STATUS,
    {
        label: string;
        color: string;
        icon: React.ReactNode;
        progress: number;
    }
>;

/* ──────────────────────── Status config ──────────────────────── */
export const statusConfig: StatusConfig = {
    REQUESTED: {
        label: "Pickup Request Received",
        color: "text-blue-600",
        icon: <Package className="w-4 h-4" />,
        progress: 10,
    },
    APPROVED: {
        label: "Approved",
        color: "text-indigo-600",
        icon: <CheckCircle className="w-4 h-4" />,
        progress: 20,
    },
    PICKED: {
        label: "Picked Up",
        color: "text-orange-600",
        icon: <Truck className="w-4 h-4" />,
        progress: 30,
    },
    DISPATCHED: {
        label: "Dispatched",
        color: "text-purple-600",
        icon: <Truck className="w-4 h-4" />,
        progress: 45,
    },
    IN_TRANSIT: {
        label: "In Transit",
        color: "text-yellow-600",
        icon: <Truck className="w-4 h-4" />,
        progress: 60,
    },
    OUT_FOR_DELIVERY: {
        label: "Out for Delivery",
        color: "text-green-600",
        icon: <Truck className="w-4 h-4" />,
        progress: 85,
    },
    DELIVERED: {
        label: "Delivered",
        color: "text-green-600",
        icon: <CheckCircle className="w-4 h-4" />,
        progress: 100,
    },
    RETURNED: {
        label: "Returned",
        color: "text-red-600",
        icon: <RotateCw className="w-4 h-4" />,
        progress: 0,
    },
    RESCHEDULE: {
        label: "Rescheduled",
        color: "text-amber-600",
        icon: <Clock className="w-4 h-4" />,
        progress: 50,
    },
    CANCELLED: {
        label: "Cancelled",
        color: "text-red-600",
        icon: <XCircle className="w-4 h-4" />,
        progress: 0,
    },
};