import { create } from 'zustand'
import { INetworkPayload } from '../interfaces/network-payload';
import { IFakerData } from '../interfaces/faker-data';

const FAKER_API = `https://fakerapi.it/api/v1/images?_width=380`; // this can be moved to env however I will leave it here to make it easy to run

export const useFakerStore = create<{
    code: number,
    total: number,
    loading: boolean,
    data: IFakerData[],
    error: string | null,
    fetch: () => void
}>((set) => ({
  code: 404,
  total: 0,
  loading: true,
  data: [],
  error: null,
  fetch: async () => {
    try {
        const response = await fetch(FAKER_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const networkData: INetworkPayload = await response.json();
        set({
            loading: false,
            code: networkData.code,
            total: networkData.total,
            data: networkData.data
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        set({
            error: `Response from faker is not ok. please try again later.`, // general error
            loading: false
        })
    }
  },
}))