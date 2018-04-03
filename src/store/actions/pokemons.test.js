// @flow
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as myactions from './pokemons'
import expect from 'expect'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('async actions index pokemons', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should execute fetch data', () => {
    fetchMock.get('*', { body: { pokemons: ['do something'], count: 255 } })
    const store = mockStore({})

    store.dispatch(myactions.getPokemons(20, 20))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(myactions.requestPokemons(20))
        expect(actions[1]).toEqual(myactions.receivePokemons(255, undefined))
      })
  })

  it('should execute fetch error', () => {
    fetchMock.get('*', { body: { message: 'do something' }, status: 403 })
    const store = mockStore({})
    
    store.dispatch(myactions.getPokemons(20, 20))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(myactions.requestPokemons(20))
        expect(actions[1]).toEqual(myactions.errorPokemons('Bad response from server'))
      })
  })
})
