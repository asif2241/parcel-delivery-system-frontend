import {
  Table,
  TableBody,
  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcels.api"
import type { IParcel } from "@/types/parcelTypes";
import { ParcelFilters } from "./ParcelFilters";
import { useSearchParams } from "react-router";
import { ParcelStatusBadge } from "./ParcelStatusBadge";
// import { Button } from "@/components/ui/button";
import { UpdateParcelStatus } from "../Admin/UpdateParcelStatus";
import PaginationComp from "@/components/Pagination";


export default function ParcelTable() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEmail = searchParams.get("searchEmail") || undefined;
  const limit = searchParams.get("limit") || undefined;
  const currentStatus = searchParams.get("currentStatus") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = searchParams.get("page") || "1"; // Default to page 1

  // console.log(searchEmail);
  const { data } = useGetAllParcelsQuery({ searchEmail, limit, currentStatus, sort, page })
  // console.log(data);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };


  return (
    <div>
      <ParcelFilters></ParcelFilters>
      <div className="[&>div]:max-h-[600px]">
        <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>ID</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Sender Email</TableHead>
              <TableHead className="text-center">Fee</TableHead>
              <TableHead className="text-center">Weight(KG)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((parcel: IParcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel._id}</TableCell>
                <TableCell className="text-center">
                  <ParcelStatusBadge status={parcel.currentStatus}></ParcelStatusBadge>
                </TableCell>
                <TableCell className="text-center">{parcel.sender_email}</TableCell>
                <TableCell className="text-center">{parcel.fee}</TableCell>
                <TableCell className="text-center">{parcel.weight}</TableCell>
                <TableCell className="text-right">
                  {/* <Button variant={"outline"}>Update Status</Button> */}
                  <UpdateParcelStatus id={parcel._id as string}></UpdateParcelStatus>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
      <div className="my-5">
        <PaginationComp currentPage={data?.meta?.page} totalPages={data?.meta?.totalPage} paginationItemsToDisplay={5} onPageChange={handlePageChange}></PaginationComp>
      </div>
    </div>
  )
}
