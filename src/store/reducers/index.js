// @flow
import { combineReducers } from 'redux'
import pokemons from './pokemons'
import fullPokemons from './fullPokemons'
import filters from './filters'

const rootReducer = combineReducers({
  pokemons,
  fullPokemons,
  filters
})

export default rootReducer
