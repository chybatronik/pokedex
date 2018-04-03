// @flow
// import rp from 'request-promise-native'
import 'cross-fetch/polyfill'
import type { ThunkAction, Action } from './types'

export const REQUEST_FULL_POKEMON = 'REQUEST_FULL_POKEMON'
export const RECEIVE_FULL_POKEMON = 'RECEIVE_FULL_POKEMON'
export const ERROR_FULL_POKEMON = 'ERROR_FULL_POKEMON'

export const requestFullPokemon = ( name: string ): Action => ({
  type: REQUEST_FULL_POKEMON,
  payload: {
    name
  }
})

export const receiveFullPokemon = ( pokemon: Object ): Action => ({
  type: RECEIVE_FULL_POKEMON,
  payload: {
    pokemon
  }
})

export const errorFullPokemon = ( name: string , error: string): Action => ({
  type: ERROR_FULL_POKEMON,
  payload: {
    name,
    error
  }
})

export const getFullPokemon = ( name: string, url: string ): ThunkAction => (dispatch: Function) => {
  dispatch(requestFullPokemon(name))
  return fetch(url)
    .then(res => {
       if (res.status >= 400) {
         throw new Error("Bad response from server");
       }
       return res.json();
     })
    .then(data => {
      dispatch(receiveFullPokemon(data))
    })
    .catch(err => {
      dispatch(errorFullPokemon(name, err.message))
    })
}
