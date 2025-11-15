/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TimelineItemProps {
    history: any;
    isCurrent: boolean;
    isCancelled: boolean;
    showImage?: boolean;
    image?: string;
}

export function ParcelTimelineItem({
    history,
    isCurrent,
    isCancelled,
}: TimelineItemProps) {
    const cfg = {
        label: history.statusLabel,
        color: history.statusColor,
        icon: history.statusIcon,
    };

    return (
        <div className={`flex gap-4 ${isCancelled ? "opacity-50" : ""}`}>
            <div className="flex flex-col items-center">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent ? "bg-primary text-white" : "bg-muted"
                        }`}
                >
                    {cfg.icon}
                </div>
            </div>
            <div className="flex-1 pb-8">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className={`font-medium ${isCurrent ? cfg.color : ""}`}>
                            {cfg.label}
                            {history.location && (
                                <span className="text-xs text-muted-foreground ml-2">
                                    Location: {history.location}
                                </span>
                            )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(history.createdAt), "h:mm a")}
                        </p>
                        {history.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{history.notes}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            by {history.updatedBy?.name ?? "System"} ({history.updatedBy?.role ?? "N/A"})
                        </p>
                    </div>
                    <Badge variant={isCurrent ? "default" : "secondary"} className="ml-4">
                        {format(new Date(history.createdAt), "EEE, dd MMM")}
                    </Badge>
                </div>
            </div>
        </div>
    );
}