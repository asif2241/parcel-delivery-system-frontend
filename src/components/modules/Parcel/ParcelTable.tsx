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


export default function ParcelTable() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEmail = searchParams.get("searchEmail") || undefined;
  const limit = searchParams.get("limit") || undefined;
  console.log(searchEmail);
  const { data } = useGetAllParcelsQuery({ searchEmail, limit })
  console.log(data);
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
                <TableCell className="text-center">{parcel.currentStatus}</TableCell>
                <TableCell className="text-center">{parcel.sender_email}</TableCell>
                <TableCell className="text-center">{parcel.fee}</TableCell>
                <TableCell className="text-center">{parcel.weight}</TableCell>
                <TableCell className="text-right">{"........"}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Table with sticky header
      </p>
    </div>
  )
}
