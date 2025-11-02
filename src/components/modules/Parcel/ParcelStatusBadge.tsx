import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PARCEL_STATUS } from "@/types/parcelTypes";

// Reusable status badge component (same as above)
export const ParcelStatusBadge = ({ status }: { status: PARCEL_STATUS }) => {
    const getStatusVariant = (status: PARCEL_STATUS) => {
        switch (status) {
            case PARCEL_STATUS.REQUESTED:
                return "secondary";
            case PARCEL_STATUS.APPROVED:
                return "default";
            case PARCEL_STATUS.PICKED:
                return "outline";
            case PARCEL_STATUS.DISPATCHED:
                return "secondary";
            case PARCEL_STATUS.IN_TRANSIT:
                return "default";
            case PARCEL_STATUS.OUT_FOR_DELIVERY:
                return "outline";
            case PARCEL_STATUS.DELIVERED:
                return "default";
            case PARCEL_STATUS.RETURNED:
                return "destructive";
            case PARCEL_STATUS.RESCHEDULE:
                return "outline";
            case PARCEL_STATUS.CANCELLED:
                return "destructive";
            default:
                return "outline";
        }
    };


    return (
        <Badge
            variant={getStatusVariant(status)}
            className={cn("capitalize whitespace-nowrap")}
        >
            {status}
        </Badge>
    );
};
