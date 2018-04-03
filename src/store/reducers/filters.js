// @flow
import {
  SHOW_WAITING, SHOW_ONLY_LOADED, SHOW_ALL
} from '../actions/filter'

export const defaultState = {
  filterActive: SHOW_ALL
}

const filters = (state: Object = defaultState, action: Object) => {
  switch (action.type) {
    case SHOW_ALL:
      return {
        ...state,
        filterActive: SHOW_ALL
      }
    case SHOW_ONLY_LOADED:
      return {
        ...state,
        filterActive: SHOW_ONLY_LOADED
      }
    case SHOW_WAITING:
      return {
        ...state,
        filterActive: SHOW_WAITING
      }
    default:
      return state
  }
}

export default filters
