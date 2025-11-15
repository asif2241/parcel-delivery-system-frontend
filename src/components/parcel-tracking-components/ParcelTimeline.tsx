/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/parcel-tracking/TimelineSection.tsx

import { ParcelTimelineItem } from "./ParcelTimelineItem";

interface TimelineSectionProps {
    histories: any[];
    currentStatus: string;
    image?: string;
}

export function TimelineSection({
    histories,
    currentStatus,

}: TimelineSectionProps) {
    const isCancelled = currentStatus === "CANCELLED";

    return (
        <>
            <p className="text-sm font-medium text-muted-foreground mb-4">
                Shipment Progress
            </p>
            <div className="space-y-6">
                {histories.map((history, idx) => {
                    const isCurrent = history.status === currentStatus;

                    return (
                        <div key={history._id} className="relative">
                            <ParcelTimelineItem
                                history={history}
                                isCurrent={isCurrent}
                                isCancelled={isCancelled && idx > 0}

                            />
                            {idx < history.length - 1 && (
                                <div className="absolute left-4 top-12 w-0.5 h-16 bg-muted" />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}