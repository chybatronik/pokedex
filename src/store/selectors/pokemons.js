import { createSelector } from 'reselect'

import {
  SHOW_WAITING, SHOW_ONLY_LOADED
} from '../actions/filter'

const getIndex = (state) => state.pokemons.index
const fullPokemons = (state) => state.fullPokemons
const filterActive = (state) => state.pokemons.config.filterActive

export const selectIndexPokemons = createSelector(
  [getIndex, fullPokemons, filterActive],
  (index, fullPokemons, filterActive) => {
    if (filterActive === SHOW_WAITING) {
      return Object.keys(index).filter((item) => { return fullPokemons[item] ? fullPokemons[item].isFetch : false } ).map((item) => { return {...fullPokemons[item]} })
    }
    if (filterActive === SHOW_ONLY_LOADED) {
      return Object.keys(index).filter((item) => { return fullPokemons[item] ? !fullPokemons[item].isFetch : true } ).map((item) => { return {...fullPokemons[item]} })
    }
    return Object.keys(index).map((item) => { return {...fullPokemons[item]} })
  }
)
