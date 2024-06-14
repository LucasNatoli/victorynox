import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://localhost:4000";

function authHeader() {
  var token = sessionStorage.getItem("token");
  if (token) return { Authorization: "Bearer " + token };
  return {};
}

export const restApiSlice = createApi({
  reducerPath: "restApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["APIs", "Assets", "Klines"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/accounts/login",
        method: "POST",
        body: credential,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/accounts/register",
        method: "POST",
        body,
      }),
    }),

    getApis: builder.query({
      query: (_) => ({
        url: "/user/apis",
        headers: authHeader(),
      }),
      providesTags: ["APIs"],
    }),

    addApi: builder.mutation({
      query: (api) => ({
        url: "/user/apis",
        method: "POST",
        headers: authHeader(),
        body: api,
      }),
      invalidatesTags: ["APIs"],
    }),
/**
 * TODO: chequear el sentido de este objeto de dominio
 */
    getAssets: builder.query({
      query: (_) => ({
        url: "/user/assets",
        headers: authHeader(),
      }),
      providesTags: ["Assets"],
    }),

    getHistory: builder.query({
      query: () => ({
        url: `/history`,
        headers: authHeader(),
      }),
      providesTags: ["Klines"],
    }),

    getFavorites: builder.query({
      query: (_) => ({
        url: "/user/favorites",
        headers: authHeader(),
      }),
    }),
    getPortfolio: builder.query({
      query: (_) => ({
        url: "/portfolio",
        headers: authHeader(),
      }),
    }),
    getPairs: builder.query({
      query: (_) => ({
        url: "/service/pairs",
        headers: authHeader(),
      }),
    }),

    getTicker: builder.query({
      query: (symbols) => ({
        url: `/service/ticker?symbols=${JSON.stringify(symbols)}`,
        headers: authHeader(),
      }),
    }),

    importKlines: builder.mutation({
      query: ({
        interval,
        granularity,
        symbol,
        year,
        month,
        day,
        year2,
        month2,
        day2,
      }) => {
        var url = `/history/fetch/${interval}/${symbol}/${granularity}/${year}/${month}`;
        if (interval === "daily") url = `${url}/${day}`;
        if (year2) url = `${url}/${year2}/${month2}`;
        if (year2 && interval === "daily") url = `${url}/${day2}`;
        return {
          url,
          headers: authHeader(),
        };
      },
      invalidatesTags: ["Klines"],
    }),
  }),
});

// Export the auto-generated hooks for the endpoints
export const {
  useAddApiMutation,
  useImportKlinesMutation,
  useLoginMutation,
  useGetApisQuery,
  useGetAssetsQuery,
  useGetFavoritesQuery,
  useGetHistoryQuery,
  useGetPairsQuery,
  useRegisterMutation,
  useGetTickerQuery,
  useGetPortfolioQuery
} = restApiSlice;
