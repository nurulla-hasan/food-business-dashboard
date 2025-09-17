import { baseApi } from "../baseApi"

const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL MENU
        getAllMenu: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/dashboard/get-menus-list",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["MENU"],
        }),

        // ADD MENU
        addMenu: builder.mutation({
            query: (formData) => {
                return {
                    url: "/dashboard/create-menu",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["MENU"],
        }),

        // UPDATE MENU
        updateMenu: builder.mutation({
            query: ({id, data}) => ({
                url: `/dashboard/menu/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["MENU"],
        }),

        // DELETE MENU
        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `/dashboard/menu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MENU"],
        }),

    })
})

export const { useGetAllMenuQuery, useAddMenuMutation, useUpdateMenuMutation, useDeleteMenuMutation } = menuApi