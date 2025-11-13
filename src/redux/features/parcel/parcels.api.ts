import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/api.types";

export const parcelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcel/create-parcel",
                method: "POST",
                data: parcelInfo,
            }),
        }),

        getAllParcels: builder.query({
            query: (params) => ({
                url: "/parcel/all-parcel",
                method: "GET",
                params
            }),
            providesTags: ["PARCEL"]
        }),
        trackParcel: builder.query({
            query: (trackingId) => ({
                url: `/parcel/track/${trackingId}`,
                method: "GET",
            }),
        }),
        getSingleParcel: builder.query({
            query: (parcelId) => ({
                url: `/parcel/${parcelId}`,
                method: "GET"
            })
        }),
        updateParcelStatus: builder.mutation({
            query: ({ parcelId, ...body }) => ({
                url: `/parcel/update-status/${parcelId}`,
                method: "PATCH",
                data: body
            }),
            invalidatesTags: ["PARCEL"]
        }),
        cancelParcel: builder.mutation<TResponse<null>, string>({
            query: (params) => ({
                url: `/parcel/cancel/${params}`,
                method: "PATCH",

            }),
            invalidatesTags: ["PARCEL"]
        }),
        parcelAnalytics: builder.query({
            query: () => ({
                url: "/parcel/dashboard/analytics",
                method: "GET"
            })
        })
    }),
});

export const { useCreateParcelMutation, useGetAllParcelsQuery, useTrackParcelQuery, useGetSingleParcelQuery, useUpdateParcelStatusMutation, useCancelParcelMutation, useParcelAnalyticsQuery } = parcelsApi;