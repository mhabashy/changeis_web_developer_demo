import { IFakerData } from "./faker-data"

export interface INetworkPayload {
    status: string,
    code: number,
    locale: string,
    seed: number | null,
    total: number
    data: IFakerData[]
}