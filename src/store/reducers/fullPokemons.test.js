// @flow
import reducer, { defaultState } from './fullPokemons'
import * as actions from '../actions/fullPokemon'

describe('full pokemons reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'askdj', payload:{}})).toEqual(defaultState)
  })

  it('action REQUEST_FULL_POKEMON:', () => {
    const new_state = { '20': {"isFetch": true, "name": "20"}}
    expect(reducer(defaultState, actions.requestFullPokemon('20'))).toEqual(new_state)
  })

  it('action RECEIVE_FULL_POKEMON:', () => {
    const new_state = { '20': {"isFetch": false, "name": "20", tesst:'tesst'}}
    expect(reducer(defaultState, actions.receiveFullPokemon({name:'20', tesst:'tesst'}))).toEqual(new_state)
  })

  it('action ERROR_FULL_POKEMON:', () => {
    const old_state = { '20': {"isFetch": false, "name": "20"}}
    const new_state = { '20': {"isFetch": false, "name": "20", isError: true}}
    expect(reducer(old_state, actions.errorFullPokemon('20', 'e8989rror'))).toEqual(new_state)
  })

})
