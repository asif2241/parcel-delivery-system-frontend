import { baseApi } from "@/redux/baseApi";

export const parcelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        getAllParcels: builder.query({
            query: (params) => ({
                url: "/parcel/all-parcel",
                method: "GET",
                params
            }),
            providesTags: ["PARCEL"]
        })
    }),
});

export const { useLoginMutation, useGetAllParcelsQuery } = parcelsApi;