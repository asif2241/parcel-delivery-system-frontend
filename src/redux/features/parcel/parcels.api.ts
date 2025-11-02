import { baseApi } from "@/redux/baseApi";

export const parcelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // login: builder.mutation({
        //     query: (userInfo) => ({
        //         url: "/auth/login",
        //         method: "POST",
        //         data: userInfo,
        //     }),
        // }),
        getAllParcels: builder.query({
            query: (params) => ({
                url: "/parcel/all-parcel",
                method: "GET",
                params
            }),
            providesTags: ["PARCEL"]
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
        })
    }),
});

export const { useGetAllParcelsQuery, useGetSingleParcelQuery, useUpdateParcelStatusMutation } = parcelsApi;