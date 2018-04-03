// @flow
import {
  REQUEST_POKEMONS, RECEIVE_POKEMONS,
  ERROR_POKEMONS
} from '../actions/pokemons'

import type { Action } from '../actions/types'

type State = {
  +index: Object,
  +config: {
    +offset: number,
    +limit: number,
    +count: number,
    +isFetch: boolean,
    +isError: boolean,
    +hasMore: boolean
  }
}

export const defaultState: State = {
  index: {},
  config: {
    offset: 0,
    limit: 20,
    count: 0,
    isFetch: false,
    isError: false,
    hasMore: true
  }
}

const pokemons = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case REQUEST_POKEMONS:
      return {
        index: state.index,
        config: {
          ...state.config,
          isFetch: true
        }
      }
    case RECEIVE_POKEMONS:
      let pokemons = {}
      action.payload.pokemons.forEach((item) => {
        pokemons[item.name] = {...item}
      })
      return {
        ...state,
        index: {
          ...state.index,
          ...pokemons
        },
        config: {
          ...state.config,
          isFetch: false,
          count: action.payload.count,
          offset: state.config.offset + action.payload.pokemons.length
        }
      }
    case ERROR_POKEMONS:
      return {
        index: state.index,
        config: {
          ...state.config,
          isFetch: false,
          isError: true,
          error: action.payload.error
        }
      }
    default:
      return state
  }
}

export default pokemons
