import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//createApi nam omogućuje definiranje različitih endpointova među api komunikacijom--nista bez stackoverflowa
import apikey from "./config";
//headeri za api koji ukljucuju hosta i key
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": apikey,
};
//base url kripto api
const baseUrl = "https://coinranking1.p.rapidapi.com";
//šaljemo zahtjev s urlom i headerima
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi", //jedinstveni kljuc za povezivanje na store
  baseQuery: fetchBaseQuery({ baseUrl }),
  //endpoints od kojih tražimo različite rezultate s istim api-em
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoCoin: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoCoinQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
