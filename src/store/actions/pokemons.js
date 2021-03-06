// @flow
// import rp from 'request-promise-native'
import 'cross-fetch/polyfill'
import { getFullPokemon } from './fullPokemon'
import type { ThunkAction, Action } from './types'

const URL = 'https://pokeapi.co/api/v2/pokemon'

export const REQUEST_POKEMONS = 'REQUEST_POKEMONS'
export const RECEIVE_POKEMONS = 'RECEIVE_POKEMONS'
export const ERROR_POKEMONS = 'ERROR_POKEMONS'

export const requestPokemons = ( limit: number ): Action => ({
  type: REQUEST_POKEMONS,
  payload: {
    limit: limit
  }
})

export const receivePokemons = (count: number, pokemons: ?Array<Object>): Action => ({
  type: RECEIVE_POKEMONS,
  payload: {
    count,
    pokemons
  }
})

export const errorPokemons = (error: string): Action => ({
  type: ERROR_POKEMONS,
  payload:{
    error
  }
})

export const getPokemons = (offset: number = 20, limit: number = 20): ThunkAction  => async (dispatch: Function) => {
  dispatch(requestPokemons(limit))

  const uri = URL + `/?limit=${limit}&offset=${offset}`
  try{
    const response = await fetch(uri)
    if (response.status >= 400) {
      throw new Error("Bad response from server")
    }
    const data = await response.json()
    dispatch(receivePokemons(data.count, data.results))
    data.results.forEach((item) => {
      dispatch(getFullPokemon(item.name, item.url))
    })
  }
  catch(err){
    dispatch(errorPokemons(err.message))
  }
}
