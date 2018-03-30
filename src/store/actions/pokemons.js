import rp from 'request-promise-native'
import { getFullPokemon } from './fullPokemon'

const URL = 'http://pokeapi.co/api/v2/pokemon'

export const REQUEST_POKEMONS = 'REQUEST_POKEMONS'
export const RECEIVE_POKEMONS = 'RECEIVE_POKEMONS'
export const ERROR_POKEMONS = 'ERROR_POKEMONS'

export const requestPokemons = limit => ({
  type: REQUEST_POKEMONS,
  limit: limit
})

export const receivePokemons = (count, pokemons) => ({
  type: RECEIVE_POKEMONS,
  count,
  pokemons
})

export const errorPokemons = (error) => ({
  type: ERROR_POKEMONS,
  error
})

export const getPokemons = (offset = 20, limit = 20) => dispatch => {
  dispatch(requestPokemons(limit))
  const option = {
    uri: URL + `/?limit=${limit}&offset=${offset}`,
    json: true,
    timeout: 20000
  }

  rp(option)
    .then(function (data) {
      dispatch(receivePokemons(data.count, data.results))
      console.log('data.results::', data.results)
      data.results.forEach((item) => {
        dispatch(getFullPokemon(item.name, item.url))
      })
    })
    .catch(function (err) {
      dispatch(errorPokemons(err))
    })
}
