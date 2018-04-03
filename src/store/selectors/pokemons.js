// @flow
import { createSelector } from 'reselect'

import {
  SHOW_WAITING, SHOW_ONLY_LOADED
} from '../actions/filter'

// const getIndex = (state) => state.pokemons.index
const fullPokemons = (state) => state.fullPokemons
const filterActive = (state) => state.filters.filterActive

export const selectIndexPokemons = createSelector(
  [fullPokemons, filterActive],
  (fullPokemons, filterActive) => {
    if (filterActive === SHOW_WAITING) {
      return Object.keys(fullPokemons).filter((item) => {
        return fullPokemons[item] ? fullPokemons[item].isFetch : false
      }).map((item) => { return {...fullPokemons[item]} })
    }
    if (filterActive === SHOW_ONLY_LOADED) {
      return Object.keys(fullPokemons).filter((item) => {
        return fullPokemons[item] ? !fullPokemons[item].isFetch : true
      }).map((item) => { return {...fullPokemons[item]} })
    }
    return Object.keys(fullPokemons).map((item) => { return {...fullPokemons[item]} })
  }
)

const getFullPokemons = (state) => state.fullPokemons

export const countWaiting = createSelector(
  [getFullPokemons],
  (fullPokemons) => {
    return Object.keys(fullPokemons).filter((item) => {
      return fullPokemons[item].isFetch
    }).length
  }
)
