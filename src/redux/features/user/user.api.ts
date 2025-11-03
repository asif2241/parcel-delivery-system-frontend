import { baseApi } from "@/redux/baseApi";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params
            }),
            providesTags: ["USERS"]
        }),

    }),
});

export const { useGetAllUsersQuery } = usersApi;