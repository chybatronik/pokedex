import {
  REQUEST_POKEMONS, RECEIVE_POKEMONS,
  ERROR_POKEMONS
} from '../actions/pokemons'

import {
  SHOW_WAITING, SHOW_ONLY_LOADED, SHOW_ALL
} from '../actions/filter'

const defaultState = {
  index: {},
  config: {
    offset: 0,
    limit: 20,
    count: 0,
    isFetch: false,
    isError: false,
    hasMore: true,
    filterActive: null
  }
}

const pokemons = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return {
        index: state.index,
        config: {
          ...state.config,
          filterActive: null
        }
      }
    case SHOW_ONLY_LOADED:
      return {
        index: state.index,
        config: {
          ...state.config,
          filterActive: SHOW_ONLY_LOADED
        }
      }
    case SHOW_WAITING:
      return {
        index: state.index,
        config: {
          ...state.config,
          filterActive: SHOW_WAITING
        }
      }
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
      action.pokemons.forEach((item) => {
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
          count: action.count,
          offset: state.config.offset + action.pokemons.length
        }
      }
    case ERROR_POKEMONS:
      return {
        index: state.index,
        config: {
          ...state.config,
          isFetch: false,
          isError: true,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default pokemons
