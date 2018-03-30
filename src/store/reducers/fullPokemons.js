import {
  REQUEST_FULL_POKEMON, RECEIVE_FULL_POKEMON,
  ERROR_FULL_POKEMON
} from '../actions/fullPokemon'

const defaultState = {}

const fullPokemons = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_FULL_POKEMON:
      state[action.name] = {isFetch: true, name: action.name}
      return {
        ...state
      }
    case RECEIVE_FULL_POKEMON:
      state[action.pokemon.name] = {...action.pokemon, isFetch: false}
      return {
        ...state
      }
    case ERROR_FULL_POKEMON:
      state[action.name] = {isError: true}
      return {
        ...state
      }
    default:
      return state
  }
}

export default fullPokemons
