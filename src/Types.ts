/* eslint-disable camelcase */
import { match } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, LocationState, Location } from 'history'

declare global {
    interface String {
      capitalizeFirst(): string;
      capitalizeWords(): string;
    }
  }

if (typeof String.prototype.capitalizeFirst === 'undefined') {
  String.prototype.capitalizeFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
  }
}

if (typeof String.prototype.capitalizeWords === 'undefined') {
  String.prototype.capitalizeWords = function () {
    return this.split(' ').map((w) => w.capitalizeFirst()).join(' ')
  }
}

export type User = {
    id: number
    name: string
    created_at: string
}

export type Game = {
    id: number
    timestamp: string
    title: string
}

export interface MatchProps extends match {}
export interface HistoryProps extends History<LocationState> {}
export interface LocationProps extends Location {
    state: any
}
