// @flow
import rp from 'request-promise-native'
import { getFullPokemon } from './fullPokemon'

const URL = 'http://pokeapi.co/api/v2/pokemon'

export const REQUEST_POKEMONS = 'REQUEST_POKEMONS'
export const RECEIVE_POKEMONS = 'RECEIVE_POKEMONS'
export const ERROR_POKEMONS = 'ERROR_POKEMONS'

export const requestPokemons = (limit: number) => ({
  type: REQUEST_POKEMONS,
  limit: limit
})

export const receivePokemons = (count: number, pokemons: Array<Object>) => ({
  type: RECEIVE_POKEMONS,
  count,
  pokemons
})

export const errorPokemons = (error: any) => ({
  type: ERROR_POKEMONS,
  error
})

export const getPokemons = (offset: number = 20, limit: number = 20) => (dispatch: Function) => {
  dispatch(requestPokemons(limit))
  const option = {
    uri: URL + `/?limit=${limit}&offset=${offset}`,
    json: true,
    timeout: 20000
  }

  rp(option)
    .then(function (data) {
      dispatch(receivePokemons(data.count, data.results))
      data.results.forEach((item) => {
        dispatch(getFullPokemon(item.name, item.url))
      })
    })
    .catch(function (err) {
      dispatch(errorPokemons(err))
    })
}
