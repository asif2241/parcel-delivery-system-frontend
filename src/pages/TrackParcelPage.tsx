// src/components/ParcelTrackingPage.tsx
import { format } from "date-fns";
import {
    Package,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTrackParcelQuery } from "@/redux/features/parcel/parcels.api";
import { useParams } from "react-router";
import { statusConfig } from "@/components/parcel-tracking-components/statusConfig";
import { TrackingSkeleton } from "@/components/parcel-tracking-components/trackingPageSkeleton";
import DeliveryAddress from "@/components/parcel-tracking-components/DeliveryAddress";
import { TimelineSection } from "@/components/parcel-tracking-components/ParcelTimeline";
import ParcelTrackingHeader from "@/components/parcel-tracking-components/ParcelTrackingHeader";
import { ParcelImage } from "@/components/parcel-tracking-components/ParcelImage";
import type { PARCEL_STATUS } from "@/types/parcelTypes";


/* ──────────────────────── Main Component ──────────────────────── */
export default function ParcelTrackingPage() {
    const { trackingId } = useParams<{ trackingId: string }>();
    const { data: parcelData, isLoading, error } = useTrackParcelQuery(trackingId!);

    /* ───── Loading ───── */
    if (isLoading) return <TrackingSkeleton />;

    /* ───── Error / Not found ───── */
    if (error || !parcelData?.data) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-red-600">
                            Parcel not found or invalid tracking ID.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const parcel = parcelData.data;
    const current = statusConfig[parcel.currentStatus as PARCEL_STATUS] ?? statusConfig.REQUESTED;





    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            {/* ───── Header ───── */}
            <Card>
                <CardHeader className="pb-3">
                    <ParcelTrackingHeader parcel={parcel}></ParcelTrackingHeader>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6">
                    {/* Carrier + Tracking ID + IMAGE */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-600 text-white p-2 rounded-md">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">FastDrop Express</p>
                                <p className="text-lg font-semibold">
                                    Tracking ID: {parcel.trackingId}
                                </p>
                            </div>
                        </div>

                        {/* ==== PARCEL IMAGE (top-right) ==== */}
                        <div className="flex justify-end">
                            <div className="w-48">
                                <ParcelImage src={parcel.image} alt="Parcel photo" />
                                <p className="text-xs text-muted-foreground text-center mt-1">
                                    Photo taken at pickup
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Current status */}
                    <div className="mb-6">
                        <h2 className={`text-2xl font-bold ${current.color}`}>
                            {current.label}
                        </h2>
                        {parcel.currentStatus === "OUT_FOR_DELIVERY" && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Expected Delivery Date:{" "}
                                {format(new Date(parcel.createdAt), "EEEE, dd MMM yyyy")}
                            </p>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-8">
                        <Progress value={current.progress} className="h-2" />
                    </div>

                    {/* ───── Timeline ───── */}
                    <TimelineSection
                        histories={[...parcel.statusHistory].reverse()}
                        currentStatus={parcel.currentStatus}
                    ></TimelineSection>
                </CardContent>
            </Card>
            {/* delivery address section */}
            <DeliveryAddress receiver={parcel.receiver}></DeliveryAddress>
        </div>
    );
}

<TrackingSkeleton></TrackingSkeleton>