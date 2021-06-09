import { match } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, LocationState, Location } from 'history'

export type User = {
    id: number
    name: string
    created_at: string
}

export type Game = {
    id?: number
    timestamp?: number
    title?: string
}

export interface MatchProps extends match {}
export interface HistoryProps extends History<LocationState> {}
export interface LocationProps extends Location {
    state: any
}
