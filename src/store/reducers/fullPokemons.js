// @flow
import {
  REQUEST_FULL_POKEMON, RECEIVE_FULL_POKEMON,
  ERROR_FULL_POKEMON
} from '../actions/fullPokemon'

import type { Action } from '../actions/types'

export type State = {
  +[key: string]: Object;
}
// interface State { +readOnly: number | string }
export const defaultState: State = {}

const fullPokemons = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case REQUEST_FULL_POKEMON:
      let new_state = {...state}
      new_state[action.payload.name] = {isFetch: true, name: action.payload.name}
      return {
        ...new_state
      }
    case RECEIVE_FULL_POKEMON:
      let new_state2 = {...state}
      new_state2[action.payload.pokemon.name] = {...action.payload.pokemon, isFetch: false}
      return new_state2
    case ERROR_FULL_POKEMON:
      let new_state3 = {...state}
      new_state3[action.payload.name] = {...new_state3[action.payload.name], isError: true}
      return new_state3
    default:
      return state
  }
}

export default fullPokemons
