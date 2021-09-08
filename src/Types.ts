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

export type Player = {
  id: number
  name: string
  createdAt: string
}

export type ExtraData = {
  concealed: boolean
  fourRedThrees: boolean
}

export type Score = {
  id: string
  name: string
  round_id: string
  score: number
  extraData: ExtraData
}

export type Round = {
  id: string
  dealer: string
  round_number: number
  scores: Score[]
}

export type Game = {
  id?: number
  timestamp: string
  title: string
  players: Player[],
  rounds: Round[]
  totalScores: {
    name: string
    total_score: number
    player_id: string
  }[]
}

export interface MatchProps extends match {}
export interface HistoryProps extends History<LocationState> {}
export interface LocationProps extends Location {
  state: any
}
