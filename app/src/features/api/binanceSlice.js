import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = 'https://testnet.binance.vision'


export const binanceSlice = createApi({

  reducerPath: 'binance',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getDayTicker: builder.query({
      query: (symbols) => ({
        url: `https://api.binance.com/api/v3/ticker/price`,
        params: symbols.join(',')
      }),
    }),
  })
})

// Export the auto-generated hooks for the endpoints
export const {
  useGetDayTickerQuery,
} = binanceSlice