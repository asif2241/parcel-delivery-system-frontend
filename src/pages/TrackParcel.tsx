// src/components/ParcelTrackingPage.tsx
"use client";
import { format } from "date-fns";
import {
    Copy,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    RotateCw,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useTrackParcelQuery } from "@/redux/features/parcel/parcels.api";
import { useParams } from "react-router";
import type { PARCEL_STATUS } from "@/types/parcelTypes";

/* ──────────────────────── Types ──────────────────────── */

/* ──────────────────────── Status config ──────────────────────── */
type StatusConfig = Record<
    PARCEL_STATUS,
    {
        label: string;
        color: string;
        icon: React.ReactNode;
        progress: number;
    }
>;

const statusConfig: StatusConfig = {
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

/* ──────────────────────── Component ──────────────────────── */
export default function ParcelTrackingPage() {
    const { trackingId } = useParams();
    const { data: parcelData, isLoading, error } = useTrackParcelQuery(trackingId!);

    /* ───── Loading ───── */
    if (isLoading) return <TrackingSkeleton />;

    /* ───── Error / Not found ───── */
    if (error || !parcelData?.data) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-red-600">Parcel not found or invalid tracking ID.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const parcel = parcelData.data;
    const current = statusConfig[parcel.currentStatus] ?? statusConfig.REQUESTED;
    const history = [...parcel.statusHistory].reverse(); // newest first

    const copyTrackingId = () => {
        navigator.clipboard.writeText(parcel.trackingId);
        toast.success("Tracking ID copied!");
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            {/* ───── Header ───── */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">FastDrop</h1>
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
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    {/* Carrier */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-600 text-white p-2 rounded-md">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">FastDrop Express</p>
                            <p className="text-lg font-semibold">Tracking ID: {parcel.trackingId}</p>
                        </div>
                    </div>

                    {/* Current status */}
                    <div className="mb-6">
                        <h2 className={`text-2xl font-bold ${current.color}`}>{current.label}</h2>
                        {parcel.currentStatus === "OUT_FOR_DELIVERY" && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Expected Delivery Date: {/* replace with real data if available */}
                                {format(new Date(parcel.createdAt), "EEEE, dd MMM yyyy")}
                            </p>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-8">
                        <Progress value={current.progress} className="h-2" />
                    </div>

                    <p className="text-sm font-medium text-muted-foreground mb-4">
                        Shipment Progress
                    </p>

                    {/* ───── Timeline ───── */}
                    <div className="space-y-6">
                        {history.map((event, idx) => {
                            const cfg = statusConfig[event.status as PARCEL_STATUS] ?? statusConfig.REQUESTED;
                            const isCurrent = event.status === parcel.currentStatus;
                            const isCancelled = parcel.currentStatus === "CANCELLED";

                            return (
                                <div
                                    key={event._id}
                                    className={`flex gap-4 ${isCancelled && idx > 0 ? "opacity-50" : ""}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent ? "bg-primary text-white" : "bg-muted"
                                                }`}
                                        >
                                            {cfg.icon}
                                        </div>
                                        {idx < history.length - 1 && (
                                            <div className="w-0.5 h-16 bg-muted mt-2" />
                                        )}
                                    </div>

                                    <div className="flex-1 pb-8">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className={`font-medium ${isCurrent ? cfg.color : ""}`}>
                                                    {cfg.label}
                                                    {event.location && (
                                                        <span className="text-xs text-muted-foreground ml-2">
                                                            Location: {event.location}
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(new Date(event.createdAt), "h:mm a")}
                                                </p>
                                                {event.notes && (
                                                    <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                                                )}
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    by {event.updatedBy.name} ({event.updatedBy.role})
                                                </p>
                                            </div>
                                            <Badge
                                                variant={isCurrent ? "default" : "secondary"}
                                                className="ml-4"
                                            >
                                                {format(new Date(event.createdAt), "EEE, dd MMM")}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* ───── Delivery address ───── */}
            <Card>
                <CardHeader>
                    <h3 className="font-semibold">Delivery Address</h3>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1 text-sm">
                        <p className="font-medium">{parcel.receiver.name}</p>
                        <p className="text-muted-foreground">{parcel.receiver.address}</p>
                        <p className="text-muted-foreground">{parcel.receiver.phone}</p>
                        <p className="text-muted-foreground">{parcel.receiver.email}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/* ───── Skeleton (optional) ───── */
function TrackingSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-6 w-48 mb-6" />
                    <Skeleton className="h-2 w-full mb-8" />
                    <div className="space-y-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-64" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}