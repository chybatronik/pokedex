// @flow
import rp from 'request-promise-native'

export const REQUEST_FULL_POKEMON = 'REQUEST_FULL_POKEMON'
export const RECEIVE_FULL_POKEMON = 'RECEIVE_FULL_POKEMON'
export const ERROR_FULL_POKEMON = 'ERROR_FULL_POKEMON'

export const requestFullPokemon = name => ({
  type: REQUEST_FULL_POKEMON,
  name
})

export const receiveFullPokemon = (pokemon) => ({
  type: RECEIVE_FULL_POKEMON,
  pokemon
})

export const errorFullPokemon = (error) => ({
  type: ERROR_FULL_POKEMON,
  error
})

export const getFullPokemon = (name, url) => dispatch => {
  dispatch(requestFullPokemon(name))
  const option = {
    uri: url,
    json: true,
    timeout: 20000
  }
  rp(option)
    .then(function (data) {
      dispatch(receiveFullPokemon(data))
    })
    .catch(function (err) {
      dispatch(errorFullPokemon(err))
    })
}
