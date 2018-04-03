// @flow
import reducer, { defaultState } from './pokemons'
import * as actions from '../actions/pokemons'

describe('pokemons reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'askdj', payload:{}})).toEqual(defaultState)
  })

  it('action REQUEST_POKEMONS:', () => {
    const new_state = { ...defaultState, config:{ ...defaultState.config, isFetch: true}}
    expect(reducer(defaultState, actions.requestPokemons(20))).toEqual(new_state)
  })

  it('action RECEIVE_POKEMONS:', () => {
    const new_state = { ...defaultState, config:{ ...defaultState.config, isFetch: false, count: 20}}
    expect(reducer(defaultState, actions.receivePokemons(20, []))).toEqual(new_state)
  })
  //
  it('action ERROR_POKEMONS:', () => {
    const new_state = { ...defaultState, config:{ ...defaultState.config, isError: true, error: 'e8989rror'}}
    expect(reducer(defaultState, actions.errorPokemons('e8989rror'))).toEqual(new_state)
  })

})
