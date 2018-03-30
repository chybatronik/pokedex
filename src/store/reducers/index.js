import { combineReducers } from 'redux'
import pokemons from './pokemons'
import fullPokemons from './fullPokemons'

const rootReducer = combineReducers({
  pokemons,
  fullPokemons
})

export default rootReducer
