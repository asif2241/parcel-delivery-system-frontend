
export interface IStatusLog {
    status: string,
    updatedBy: string,
    location?: string,
    notes?: string
}


export const PARCEL_STATUS = {
    REQUESTED: "REQUESTED",
    APPROVED: "APPROVED",
    PICKED: "PICKED",
    DISPATCHED: "DISPATCHED",
    IN_TRANSIT: "IN_TRANSIT",
    OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
    DELIVERED: "DELIVERED",
    RETURNED: "RETURNED",
    RESCHEDULE: "RESCHEDULE",
    CANCELLED: "CANCELLED"
} as const
export type PARCEL_STATUS = typeof PARCEL_STATUS[keyof typeof PARCEL_STATUS];


export const PARCEL_TYPE = {
    DOCUMENT: "DOCUMENT",
    SMALL_PACKAGE: "SMALL_PACKAGE",
    MEDIUM_PACKAGE: "MEDIUM_PACKAGE",
    LARGE_PACKAGE: "LARGE_PACKAGE",
    FRAGILE: "FRAGILE",
    PERISHABLE: "PERISHABLE",
    VALUABLE: "VALUABLE",
    OVERSIZED: "OVERSIZED",
    HAZARDOUS: "HAZARDOUS"
} as const
export type PARCEL_TYPE = typeof PARCEL_TYPE[keyof typeof PARCEL_TYPE];


export interface IParcel {
    _id?: string,
    trackingId: string,
    senderId: string,
    sender_email: string,
    receiver: {
        name: string,
        email: string,
        phone: string,
        address: string
    },
    parcelType: PARCEL_TYPE,
    weight: number,
    fee: number,
    image: string,
    currentStatus: PARCEL_STATUS
    statusHistory: IStatusLog[];
}
