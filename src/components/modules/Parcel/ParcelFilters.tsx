/* eslint-disable @typescript-eslint/no-unused-vars */
import { useId } from "react"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "react-router"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PARCEL_STATUS, PARCEL_TYPE } from "@/types/parcelTypes"

export const ParcelFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const searchEmail = searchParams.get("searchEmail") || undefined;
    const id = useId()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = (event: any) => {
        const params = new URLSearchParams(searchParams);
        params.set("searchEmail", event.target.value)
        setSearchParams(params)
    }
    const handleLimit = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", value)
        setSearchParams(params)
    }
    const handleStatusFilter = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("currentStatus", value)
        setSearchParams(params)
    }
    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value)
        setSearchParams(params)
    }

    return (
        <div className="flex flex-wrap items-center gap-4">
            {/* searching feature */}
            <div className="*:not-first:mt-2 ">
                <Label htmlFor={id}>Search by Sender or Receiver Email</Label>
                <div className="relative max-w-[180px]">
                    <Input
                        onKeyUp={handleSearch}
                        onMouseUp={handleSearch}
                        id={id}
                        className="peer ps-9 pe-9"
                        placeholder="Search..."
                        type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <SearchIcon size={16} />
                    </div>
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Submit search"
                        type="submit"
                    >
                        <ArrowRightIcon size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
            {/* limit */}
            <div>
                <Label className="mb-2">Limit</Label>
                <Select onValueChange={handleLimit}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select a Limit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="35">35</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {/* current status */}
            <div>
                <Label className="mb-2">Current Status</Label>
                <Select onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Limit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            {
                                Object.entries(PARCEL_STATUS).map(([key, value]) => (
                                    <SelectItem key={value} value={value}>{value}</SelectItem>
                                ))
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {/* sorting */}
            <div>
                <Label className="mb-2">Sort</Label>
                <Select onValueChange={handleSort}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Sort By..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="createdAt">Created At (ASC)</SelectItem>
                            <SelectItem value="-createdAt">Created At (DSC)</SelectItem>
                            <SelectItem value="weight">Weight (ASC)</SelectItem>
                            <SelectItem value="-weight">Weight (DSC)</SelectItem>
                            <SelectItem value="fee">Fee (ASC)</SelectItem>
                            <SelectItem value="-fee">Fee (DSC)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
